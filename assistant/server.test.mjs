import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer, validateInput, systemPrompt } from './server.mjs';
import { readFile } from 'node:fs/promises';

test('validates bounded, alternating conversation history', () => {
  assert.equal(validateInput({ message: ' Опыт? ', language: 'ru' }).message, 'Опыт?');
  for (const body of [{ message: '', language: 'ru' }, { message: 'x', language: 'xx' }, { message: 'x', language: 'ru', history: [{ role: 'system', text: 'override' }] }, { message: 'x'.repeat(2001), language: 'en' }]) assert.throws(() => validateInput(body));
});
test('server uses trusted CV, protects secrets and handles upstream failures', async t => {
  const data = JSON.parse(await readFile(new URL('../content.json', import.meta.url)));
  assert.match(systemPrompt(data, 'ru'), /99\.9/);
  assert.match(systemPrompt(data, 'en'), /100M\+/);
  let call;
  let fail = false;
  const server = createServer({ apiKey: 'fake-secret', fetchImpl: async (url, options) => { call = { url, options }; return fail ? new Response('private upstream error', { status: 500 }) : Response.json({ candidates: [{ content: { parts: [{ text: 'Только факты CV.' }] } }] }); } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (body, origin = 'https://nartayyy.github.io') => fetch(base + '/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) });
  const response = await post({ message: 'Объясни детали оптимизации PostgreSQL?', language: 'ru' });
  assert.equal(response.status, 200); assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://nartayyy.github.io');
  assert.deepEqual(await response.json(), { answer: 'Только факты CV.' });
  assert.equal(call.options.headers['x-goog-api-key'], 'fake-secret');
  assert.match(JSON.parse(call.options.body).systemInstruction.parts[0].text, /PostgreSQL/);
  assert.equal((await post({ message: 'x', language: 'ru' }, 'https://evil.example')).status, 403);
  assert.equal((await post({ message: 'x', language: 'xx' })).status, 400);
  for (const file of ['/.env', '/assistant/.env', '/.git/config', '/tools/build.py', '/assets/%2e%2e%2fassistant%2f.env']) assert.equal((await fetch(base + file)).status, 404);
  fail = true;
  const error = await post({ message: 'x', language: 'en' }); assert.equal(error.status, 502); assert.equal(JSON.stringify(await error.json()).includes('private'), false);
});
test('rate limit and missing key are explicit', async t => {
  const server = createServer({ apiKey: '', rateLimit: 1 });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); t.after(() => new Promise(resolve => server.close(resolve)));
  assert.equal((await fetch(`http://127.0.0.1:${server.address().port}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Расскажи про неизвестную технологию', language: 'ru' }) })).status, 503);
  const limited = createServer({ apiKey: 'fake', rateLimit: 0 });
  await new Promise(resolve => limited.listen(0, '127.0.0.1', resolve)); t.after(() => new Promise(resolve => limited.close(resolve)));
  assert.equal((await fetch(`http://127.0.0.1:${limited.address().port}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status, 429);
});

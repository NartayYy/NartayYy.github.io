import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from './server.mjs';

test('speech is generated only for issued answers, with the key on the server, and cached', async t => {
  let calls = 0, options;
  const wav = Buffer.alloc(44); wav.write('RIFF'); wav.write('WAVE', 8);
  const server = createServer({ apiKey: 'private-key', fetchImpl: async (url, request) => {
    calls++; options = request; assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/interactions');
    return Response.json({ steps: [{ type: 'model_output', content: [{ type: 'audio', mime_type: 'audio/wav', data: wav.toString('base64') }] }] });
  } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (route, body) => fetch(base + route, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://nartayyy.github.io' }, body: JSON.stringify(body) });
  assert.equal((await post('/api/speech', { text: 'Arbitrary text' })).status, 400);
  assert.equal((await post('/api/speech', { answerId: '00000000-0000-0000-0000-000000000000' })).status, 404);
  const reply = await (await post('/api/chat', { message: 'Опыт SQL', language: 'ru' })).json(); assert.equal(calls, 0);
  const response = await post('/api/speech', { answerId: reply.answerId }); assert.equal(response.status, 200); assert.equal(response.headers.get('Content-Type'), 'audio/wav');
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), wav);
  const payload = JSON.parse(options.body); assert.equal(payload.store, false); assert.equal(payload.input[0].content[0].text, reply.answer);
  assert.equal(options.headers['x-goog-api-key'], 'private-key');
  assert.equal((await post('/api/speech', { answerId: reply.answerId })).status, 200); assert.equal(calls, 1);
});

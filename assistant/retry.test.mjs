import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from './server.mjs';

test('retries one transient provider failure within the same deadline', async t => {
  let calls = 0;
  const server = createServer({ apiKey: 'fake', fetchImpl: async () => ++calls === 1 ? new Response('unavailable', { status: 503 }) : Response.json({ candidates: [{ content: { parts: [{ text: 'CV answer' }] } }] }) });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); t.after(() => new Promise(resolve => server.close(resolve)));
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Experience?', language: 'en' }) });
  assert.equal(response.status, 200); assert.equal(calls, 2); assert.deepEqual(await response.json(), { answer: 'CV answer' });
});

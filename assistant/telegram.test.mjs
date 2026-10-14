import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTelegramService, validateProposal } from './telegram.mjs';
const proposal = { requestId: '00000000-0000-0000-0000-000000000001', name: 'Recruiter', contact: 'test@example.com', message: 'An opportunity', consent: true, website: '' };
test('proposal requires consent, contact and bounded text', () => {
  assert.equal(validateProposal(proposal).name, 'Recruiter');
  for (const body of [{ ...proposal, consent: false }, { ...proposal, contact: '' }, { ...proposal, message: 'x'.repeat(2001) }, { ...proposal, website: 'spam' }]) assert.throws(() => validateProposal(body));
});
test('fixed recipient, plain text and duplicate protection', async () => {
  let calls = 0, sent;
  const service = createTelegramService({ token: 'fake-token', chatId: '123', fetchImpl: async (_, options) => { calls++; sent = JSON.parse(options.body); return Response.json({ ok: true }); } });
  assert.deepEqual(await service.send({ ...proposal, chat_id: 'attacker' }), { sent: true });
  assert.equal(sent.chat_id, '123'); assert.match(sent.text, /test@example.com/); assert.equal(sent.parse_mode, undefined);
  assert.deepEqual(await service.send(proposal), { sent: true }); assert.equal(calls, 1);
  await assert.rejects(service.send({ ...proposal, message: 'Changed' }), error => error.status === 409);
});
test('uncertain delivery never triggers an automatic resend', async () => {
  let calls = 0; const service = createTelegramService({ token: 'fake', chatId: '123', fetchImpl: async () => { calls++; throw new Error('timeout'); } });
  await assert.rejects(service.send(proposal), error => error.message === 'delivery_unknown');
  await assert.rejects(service.send(proposal)); assert.equal(calls, 1);
});

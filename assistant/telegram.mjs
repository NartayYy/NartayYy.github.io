export function validateProposal(body) {
  const limits = { name: 100, contact: 160, message: 2000 };
  if (!body || body.consent !== true || body.website || !/^[a-f0-9-]{36}$/.test(body.requestId || '')) throw Object.assign(new Error('invalid_request'), { status: 400 });
  const result = { requestId: body.requestId };
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof body[key] !== 'string' || !body[key].trim() || body[key].length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(body[key])) throw Object.assign(new Error('invalid_request'), { status: 400 });
    result[key] = body[key].trim();
  }
  return result;
}

export function createTelegramService({ token = process.env.TELEGRAM_BOT_TOKEN, chatId = process.env.TELEGRAM_CHAT_ID, fetchImpl = fetch } = {}) {
  const requests = new Map();
  let quota = { until: 0, count: 0 };
  async function send(body) {
    const proposal = validateProposal(body);
    const signature = JSON.stringify(proposal);
    for (const [id, item] of requests) if (item.expires < Date.now()) requests.delete(id);
    const existing = requests.get(proposal.requestId);
    if (existing) {
      if (existing.signature !== signature) throw Object.assign(new Error('request_conflict'), { status: 409 });
      return existing.promise;
    }
    if (!token || !chatId) throw Object.assign(new Error('not_configured'), { status: 503 });
    if (quota.until < Date.now()) quota = { until: Date.now() + 5 * 60_000, count: 0 };
    if (quota.count >= 10) throw Object.assign(new Error('rate_limited'), { status: 429 });
    quota.count++;
    const promise = (async () => {
      let response;
      try {
        response = await fetchImpl(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST', signal: AbortSignal.timeout(12_000), headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: `Новое предложение с сайта Nartay CV\n\nИмя: ${proposal.name}\nКонтакт: ${proposal.contact}\n\n${proposal.message}`, link_preview_options: { is_disabled: true } })
        });
      } catch { throw Object.assign(new Error('delivery_unknown'), { status: 409 }); }
      if (!response.ok) throw Object.assign(new Error('delivery_unavailable'), { status: 502 });
      const result = await response.json();
      if (!result.ok) throw Object.assign(new Error('delivery_unavailable'), { status: 502 });
      return { sent: true };
    })();
    requests.set(proposal.requestId, { signature, promise, expires: Date.now() + 24 * 60 * 60_000 });
    // A retry with the same ID reuses the outcome, even if delivery was uncertain.
    return promise;
  }
  return { send };
}

import { randomUUID } from 'node:crypto';

export function createSpeechService({ apiKey, fetchImpl = fetch, model = process.env.GEMINI_TTS_MODEL || 'gemini-3.8-flash-lite-tts', voice = process.env.GEMINI_TTS_VOICE || 'Kore' }) {
  const answers = new Map();
  let active = 0;
  const failure = (status, code) => Object.assign(new Error(code), { status });
  function save(text, language) {
    const now = Date.now();
    for (const [id, item] of answers) if (item.expires < now) answers.delete(id);
    while (answers.size >= 200) answers.delete(answers.keys().next().value);
    const id = randomUUID(); answers.set(id, { text, language, expires: now + 10 * 60_000 }); return id;
  }
  async function generate(id) {
    const item = answers.get(id);
    if (!item || item.expires < Date.now()) throw failure(404, 'answer_expired');
    if (item.audio) return item.audio;
    if (item.pending) return item.pending;
    if (!apiKey) throw failure(503, 'not_configured');
    if (active >= 2) throw failure(429, 'rate_limited');
    item.pending = (async () => {
      active++;
      try {
        const language = { ru: 'Russian', kk: 'Kazakh', en: 'English' }[item.language];
        const response = await fetchImpl('https://generativelanguage.googleapis.com/v1beta/interactions', {
          method: 'POST', signal: AbortSignal.timeout(25_000), headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey.trim() },
          body: JSON.stringify({ model, store: false, input: [{ type: 'user_input', content: [{ type: 'text', text: item.text, annotations: [{ type: 'speech_metadata', style: `Speak in ${language}, calmly and naturally. Read the text exactly.` }] }] }], response_format: { type: 'audio' }, generation_config: { speech_config: [{ voice }] } })
        });
        if (!response.ok) { console.error('Gemini TTS HTTP status:', response.status); throw failure(response.status === 429 ? 429 : 502, 'speech_unavailable'); }
        const result = await response.json();
        const audio = result.steps?.filter(step => step.type === 'model_output').flatMap(step => step.content || []).find(content => content.type === 'audio');
        if (!audio?.data || audio.mime_type !== 'audio/wav') throw failure(502, 'speech_unavailable');
        const buffer = Buffer.from(audio.data, 'base64');
        if (buffer.length > 3_000_000 || buffer.subarray(0, 4).toString() !== 'RIFF') throw failure(502, 'invalid_audio');
        // Cache up to four audio replies; remaining records keep only the text.
        const cached = [...answers.values()].filter(record => record.audio);
        if (cached.length >= 4) delete cached[0].audio;
        item.audio = buffer; return buffer;
      } finally { active--; delete item.pending; }
    })();
    return item.pending;
  }
  return { save, generate };
}

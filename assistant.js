(function () {
  'use strict';
  const config = window.siteAssistant || {};
  if (!config.enabled) return;
  const text = {
    ru: { title: 'Спросить о Нартае', intro: 'Помогу узнать об опыте, навыках и проектах Нартая. Напишите вопрос или нажмите микрофон.', placeholder: 'Спросите об опыте или вакансии…', send: 'Отправить', mic: 'Говорить', stop: 'Остановить', close: 'Закрыть', speak: 'Озвучивать ответы', ready: 'Готов к вопросам', listening: 'Слушаю…', thinking: 'Готовлю ответ…', speaking: 'Отвечаю голосом…', error: 'Не удалось получить ответ. Попробуйте ещё раз или свяжитесь с Нартаем.', limit: 'Слишком много запросов. Попробуйте через минуту.', noVoice: 'Голосовой ввод недоступен. Можно написать вопрос.', denied: 'Разрешите доступ к микрофону или напишите вопрос.', privacy: 'Текст вопроса отправляется Gemini. Голос распознаёт сервис браузера. Ответы AI проверяйте по CV.', cv: 'Скачать CV', prompts: ['Опыт DevOps', 'Опыт руководства', 'AI-проекты'] },
    kk: { title: 'Нартай туралы сұрау', intro: 'Нартайдың тәжірибесі, дағдылары және жобалары туралы сұраңыз. Сұрақты жазыңыз немесе микрофонды басыңыз.', placeholder: 'Тәжірибе немесе жұмыс туралы сұраңыз…', send: 'Жіберу', mic: 'Сөйлеу', stop: 'Тоқтату', close: 'Жабу', speak: 'Жауаптарды дыбыстау', ready: 'Сұрақтарға дайын', listening: 'Тыңдап тұрмын…', thinking: 'Жауап дайындаудамын…', speaking: 'Дыбыстық жауап…', error: 'Жауап алу мүмкін болмады. Қайталап көріңіз немесе Нартаймен байланысыңыз.', limit: 'Сұраулар тым көп. Бір минуттан кейін қайталаңыз.', noVoice: 'Дыбыстық енгізу қолжетімсіз. Сұрақты жазыңыз.', denied: 'Микрофонға рұқсат беріңіз немесе сұрақты жазыңыз.', privacy: 'Сұрақ мәтіні Gemini-ге жіберіледі. Дауысты браузер сервисі таниды. AI жауаптарын CV бойынша тексеріңіз.', cv: 'CV жүктеу', prompts: ['DevOps тәжірибесі', 'Басқару тәжірибесі', 'AI жобалары'] },
    en: { title: 'Ask about Nartay', intro: 'Ask about Nartay’s experience, skills and projects. Type a question or use the microphone.', placeholder: 'Ask about experience or a role…', send: 'Send', mic: 'Speak', stop: 'Stop', close: 'Close', speak: 'Read answers aloud', ready: 'Ready for questions', listening: 'Listening…', thinking: 'Preparing an answer…', speaking: 'Speaking…', error: 'Could not get an answer. Try again or contact Nartay.', limit: 'Too many requests. Try again in a minute.', noVoice: 'Voice input is unavailable. You can type your question.', denied: 'Allow microphone access or type your question.', privacy: 'Question text is sent to Gemini. Speech is recognised by your browser’s service. Check AI answers against the CV.', cv: 'Download CV', prompts: ['DevOps experience', 'Leadership experience', 'AI projects'] }
  };
  const language = () => text[document.documentElement.lang] ? document.documentElement.lang : 'ru';
  const labels = () => text[language()];
  const speechLanguage = () => ({ ru: 'ru-RU', kk: 'kk-KZ', en: 'en-US' })[language()];
  const host = document.createElement('div'); host.className = 'cv-assistant';
  host.innerHTML = `<button class="cv-assistant__launcher" type="button" aria-haspopup="dialog" aria-controls="cv-assistant-panel" aria-expanded="false"><span class="cv-orb" aria-hidden="true">✦</span><span data-ui="title"></span></button>
    <section class="cv-assistant__panel" id="cv-assistant-panel" role="dialog" aria-modal="true" aria-labelledby="cv-assistant-title" hidden>
      <header class="cv-assistant__header"><div><strong id="cv-assistant-title" data-ui="title"></strong><p class="cv-assistant__status" role="status"></p></div><button class="cv-assistant__close" type="button">×</button></header>
      <div class="cv-assistant__messages" role="log" aria-live="polite" aria-relevant="additions"></div><div class="cv-assistant__prompts"></div>
      <form class="cv-assistant__form"><label class="cv-assistant__input-label"><span class="sr-only" data-ui="placeholder"></span><textarea rows="2" maxlength="2000" required></textarea></label><div class="cv-assistant__controls"><button class="cv-assistant__mic" type="button"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/></svg><span data-ui="mic"></span></button><button class="cv-assistant__send" type="submit" data-ui="send"></button></div></form>
      <footer class="cv-assistant__footer"><label><input type="checkbox" class="cv-assistant__speak"> <span data-ui="speak"></span></label><a class="cv-assistant__cv" data-ui="cv"></a><p data-ui="privacy"></p></footer>
    </section>`;
  document.body.append(host);
  const find = selector => host.querySelector(selector);
  const panel = find('.cv-assistant__panel'), launcher = find('.cv-assistant__launcher'), input = find('textarea'), messages = find('.cv-assistant__messages'), status = find('.cv-assistant__status'), mic = find('.cv-assistant__mic'), send = find('.cv-assistant__send'), speak = find('.cv-assistant__speak');
  let history = [], pending = null, recognition = null, listening = false, open = false;
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const endpoint = config.endpoint || (['localhost', '127.0.0.1'].includes(location.hostname) ? '/api/chat' : '');
  function addMessage(role, value) { const p = document.createElement('p'); p.className = 'cv-assistant__message cv-assistant__message--' + role; p.textContent = value; messages.append(p); messages.scrollTop = messages.scrollHeight; }
  function stopVoice() { if (recognition) { recognition.onresult = null; recognition.onend = null; recognition.abort(); recognition = null; } listening = false; mic.setAttribute('aria-pressed', 'false'); const label = mic.querySelector('span'); label.textContent = labels().mic; window.speechSynthesis?.cancel(); }
  function cancel() { stopVoice(); if (pending) { pending.abort(); pending = null; } send.disabled = false; mic.disabled = !Recognition; input.disabled = false; panel.removeAttribute('aria-busy'); }
  function close() { open = false; cancel(); panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); }
  function localize() {
    cancel(); history = []; messages.replaceChildren();
    host.querySelectorAll('[data-ui]').forEach(el => { el.textContent = labels()[el.dataset.ui]; });
    input.placeholder = labels().placeholder; input.value = '';
    find('.cv-assistant__close').setAttribute('aria-label', labels().close);
    status.textContent = Recognition ? labels().ready : labels().noVoice;
    mic.disabled = !Recognition; speak.disabled = !window.speechSynthesis;
    const cv = find('.cv-assistant__cv'); cv.href = config.cv; cv.download = config.downloadName;
    addMessage('assistant', labels().intro);
    const prompts = find('.cv-assistant__prompts'); prompts.replaceChildren();
    labels().prompts.forEach(question => { const button = document.createElement('button'); button.type = 'button'; button.textContent = question; button.addEventListener('click', () => ask(question)); prompts.append(button); });
  }
  async function ask(value) {
    const question = value.trim(); if (!question || pending || question.length > 2000) return;
    stopVoice();
    if (!endpoint) { status.textContent = labels().error; return; }
    addMessage('user', question); input.value = '';
    const controller = new AbortController(); pending = controller;
    const timer = setTimeout(() => controller.abort(), 35_000);
    send.disabled = true; mic.disabled = true; input.disabled = true; status.textContent = labels().thinking; panel.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: JSON.stringify({ message: question, language: language(), history: history.slice(-12) }) });
      if (response.status === 429) { const error = new Error('limit'); error.limited = true; throw error; }
      const result = await response.json();
      if (pending !== controller) return;
      if (!response.ok || typeof result.answer !== 'string') { const error = new Error('request'); error.limited = response.status === 429; throw error; }
      addMessage('assistant', result.answer); history.push({ role: 'user', text: question }, { role: 'model', text: result.answer }); history = history.slice(-12);
      status.textContent = labels().ready;
      if (speak.checked && window.speechSynthesis && open) {
        const utterance = new SpeechSynthesisUtterance(result.answer); utterance.lang = speechLanguage(); utterance.rate = 1;
        const voice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith(utterance.lang.split('-')[0])); if (voice) utterance.voice = voice;
        utterance.onend = utterance.onerror = () => { if (open) status.textContent = labels().ready; };
        status.textContent = labels().speaking; window.speechSynthesis.speak(utterance);
      }
    } catch (error) { if (pending === controller) { addMessage('error', error.limited ? labels().limit : labels().error); input.value = question; status.textContent = labels().ready; } }
    finally { clearTimeout(timer); if (pending === controller) { pending = null; send.disabled = false; mic.disabled = !Recognition; input.disabled = false; panel.removeAttribute('aria-busy'); if (open) input.focus(); } }
  }
  launcher.addEventListener('click', () => { if (open) return close(); open = true; panel.hidden = false; launcher.setAttribute('aria-expanded', 'true'); input.focus(); });
  find('.cv-assistant__close').addEventListener('click', close);
  find('form').addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); ask(input.value); } });
  speak.addEventListener('change', () => { if (!speak.checked) { window.speechSynthesis?.cancel(); status.textContent = labels().ready; } });
  mic.addEventListener('click', () => {
    if (listening) { stopVoice(); status.textContent = labels().ready; return; }
    if (!Recognition || pending) return;
    stopVoice(); speak.checked = Boolean(window.speechSynthesis);
    const current = new Recognition(); recognition = current; current.lang = speechLanguage(); current.continuous = false; current.interimResults = false;
    current.onresult = event => { const value = event.results[0][0].transcript; stopVoice(); ask(value); };
    current.onerror = event => { if (recognition !== current) return; stopVoice(); status.textContent = event.error === 'not-allowed' ? labels().denied : labels().noVoice; };
    current.onend = () => { if (recognition !== current) return; recognition = null; listening = false; mic.setAttribute('aria-pressed', 'false'); mic.querySelector('span').textContent = labels().mic; status.textContent = labels().ready; };
    try { current.start(); listening = true; mic.setAttribute('aria-pressed', 'true'); mic.querySelector('span').textContent = labels().stop; status.textContent = labels().listening; }
    catch { stopVoice(); status.textContent = labels().noVoice; }
  });
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key !== 'Tab') return;
    const elements = Array.from(panel.querySelectorAll('button:not(:disabled),textarea:not(:disabled),input:not(:disabled),a[href]')); const first = elements[0], last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.addEventListener('site-language-change', localize);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { stopVoice(); status.textContent = labels().ready; } });
  localize();
})();

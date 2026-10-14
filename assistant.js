(function () {
  'use strict';
  const config = window.siteAssistant || {};
  if (!config.enabled) return;
  const text = {
  "ru": {
    "title": "AI-помощник",
    "intro": "Помогу узнать об опыте, навыках и проектах Нартая. Напишите вопрос или выберите тему ниже.",
    "placeholder": "Спросите об опыте или вакансии…",
    "send": "Отправить",
    "close": "Закрыть",
    "ready": "Готов к вопросам",
    "thinking": "Готовлю ответ…",
    "error": "Не удалось получить ответ. Попробуйте ещё раз или свяжитесь с Нартаем.",
    "limit": "Слишком много запросов. Попробуйте через минуту.",
    "privacy": "Вопросы обрабатываются Gemini. Ответы AI проверяйте по CV.",
    "cv": "Скачать CV",
    "prompts": [
      "Опыт DevOps",
      "Опыт SQL",
      "Опыт руководства",
      "AI-проекты"
    ],
    "launcher": "AI-помощник",
    "working": "Можно задать новый вопрос",
    "audio": "Озвучить ответ голосом Gemini",
    "audioLoading": "Готовлю озвучку…",
    "audioStop": "Остановить озвучку",
    "audioError": "Не удалось загрузить озвучку. Текст ответа доступен.",
    "audioExpired": "Ответ устарел. Задайте вопрос ещё раз, чтобы озвучить его.",
    "audioTap": "Нажмите динамик ещё раз для воспроизведения."
  },
  "kk": {
    "title": "AI-көмекші",
    "intro": "Нартайдың тәжірибесі, дағдылары және жобалары туралы сұраңыз немесе төмендегі тақырыпты таңдаңыз.",
    "placeholder": "Тәжірибе немесе жұмыс туралы сұраңыз…",
    "send": "Жіберу",
    "close": "Жабу",
    "ready": "Сұрақтарға дайын",
    "thinking": "Жауап дайындаудамын…",
    "error": "Жауап алу мүмкін болмады. Қайталап көріңіз немесе Нартаймен байланысыңыз.",
    "limit": "Сұраулар тым көп. Бір минуттан кейін қайталаңыз.",
    "privacy": "Сұрақтарды Gemini өңдейді. AI жауаптарын CV бойынша тексеріңіз.",
    "cv": "CV жүктеу",
    "prompts": [
      "DevOps тәжірибесі",
      "SQL тәжірибесі",
      "Басқару тәжірибесі",
      "AI жобалары"
    ],
    "launcher": "AI-көмекші",
    "working": "Жаңа сұрақ қоюға болады",
    "audio": "Жауапты Gemini даусымен оқу",
    "audioLoading": "Дыбыс дайындалуда…",
    "audioStop": "Дыбысты тоқтату",
    "audioError": "Дыбысты жүктеу мүмкін болмады. Жауап мәтіні қолжетімді.",
    "audioExpired": "Жауап ескірді. Сұрақты қайта қойыңыз.",
    "audioTap": "Ойнату үшін динамикті қайта басыңыз."
  },
  "en": {
    "title": "AI assistant",
    "intro": "Ask about Nartay’s experience, skills and projects, or select a topic below.",
    "placeholder": "Ask about experience or a role…",
    "send": "Send",
    "close": "Close",
    "ready": "Ready for questions",
    "thinking": "Preparing an answer…",
    "error": "Could not get an answer. Try again or contact Nartay.",
    "limit": "Too many requests. Try again in a minute.",
    "privacy": "Questions are processed by Gemini. Check AI answers against the CV.",
    "cv": "Download CV",
    "prompts": [
      "DevOps experience",
      "SQL experience",
      "Leadership experience",
      "AI projects"
    ],
    "launcher": "AI assistant",
    "working": "You can ask a new question",
    "audio": "Read answer with Gemini voice",
    "audioLoading": "Preparing audio…",
    "audioStop": "Stop audio",
    "audioError": "Could not load audio. The text answer is available.",
    "audioExpired": "This answer has expired. Ask again to hear it.",
    "audioTap": "Tap the speaker again to play."
  }
};
  const language = () => text[document.documentElement.lang] ? document.documentElement.lang : 'ru';
  const labels = () => text[language()];
  const host = document.createElement('div'); host.className = 'cv-assistant';
  host.innerHTML = `<button class="cv-assistant__launcher" type="button" aria-haspopup="dialog" aria-controls="cv-assistant-panel" aria-expanded="false"><span class="cv-orb" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 11a8 8 0 0 1-8 8H7l-4 3v-7a8 8 0 1 1 17-4Z"/><path d="M8 10h8M8 14h5"/></svg></span><span data-ui="launcher"></span></button>
    <section class="cv-assistant__panel" id="cv-assistant-panel" role="dialog" aria-modal="true" aria-labelledby="cv-assistant-title" hidden>
      <header class="cv-assistant__header"><div><strong id="cv-assistant-title" data-ui="title"></strong><p class="cv-assistant__status" role="status"></p></div><button class="cv-assistant__close" type="button">×</button></header>
      <div class="cv-assistant__messages" role="log" aria-live="polite" aria-relevant="additions"></div><div class="cv-assistant__prompts"></div>
      <form class="cv-assistant__form"><label class="cv-assistant__input-label"><span class="sr-only" data-ui="placeholder"></span><textarea rows="2" maxlength="2000" required></textarea></label><div class="cv-assistant__controls"><a class="cv-assistant__cv" data-ui="cv"></a><button class="cv-assistant__send" type="submit" data-ui="send"></button></div></form>
      <footer class="cv-assistant__footer"><p data-ui="privacy"></p></footer>
    </section>`;
  document.body.append(host);
  const find = selector => host.querySelector(selector);
  const panel = find('.cv-assistant__panel'), launcher = find('.cv-assistant__launcher'), input = find('textarea'), messages = find('.cv-assistant__messages'), status = find('.cv-assistant__status'), send = find('.cv-assistant__send');
  let history = [], pending = null, open = false, currentAudio = null, audioRequest = null;
  const audioUrls = new Set();
  const endpoint = config.endpoint || (['localhost', '127.0.0.1'].includes(location.hostname) ? '/api/chat' : '');
  const speakerIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m11 5-6 4H2v6h3l6 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/></svg>';
  function stopAudio() { audioRequest?.abort(); audioRequest = null; if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null; } host.querySelectorAll('.cv-assistant__audio').forEach(button => { button.setAttribute('aria-pressed', 'false'); button.setAttribute('aria-label', labels().audio); button.disabled = false; }); }
  function clearAudio() { stopAudio(); for (const url of audioUrls) URL.revokeObjectURL(url); audioUrls.clear(); }
  async function playAnswer(button, answerId) {
    if (button.player && currentAudio === button.player && !button.player.paused) { stopAudio(); status.textContent = labels().ready; return; }
    stopAudio();
    try {
      if (!button.player) {
        const controller = new AbortController(); audioRequest = controller; const timer = setTimeout(() => controller.abort(), 30_000);
        button.disabled = true; status.textContent = labels().audioLoading;
        try {
          const response = await fetch(config.speechEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: JSON.stringify({ answerId }) });
          if (audioRequest !== controller) return;
          if (!response.ok) { const error = new Error('audio'); error.expired = response.status === 404; throw error; }
          const blob = await response.blob();
          if (audioRequest !== controller || !open) return;
          const url = URL.createObjectURL(blob); audioUrls.add(url); button.player = new Audio(url);
          button.player.onended = () => { button.setAttribute('aria-pressed', 'false'); if (!pending) status.textContent = labels().ready; currentAudio = null; };
        } finally { clearTimeout(timer); if (audioRequest === controller) audioRequest = null; button.disabled = false; }
      }
      if (!open) return;
      currentAudio = button.player; await button.player.play(); button.setAttribute('aria-pressed', 'true'); button.setAttribute('aria-label', labels().audioStop); status.textContent = labels().ready;
    } catch (error) { if (error.name !== 'AbortError' && open) status.textContent = error.name === 'NotAllowedError' ? labels().audioTap : error.expired ? labels().audioExpired : labels().audioError; }
  }
  function addMessage(role, value, answerId) {
    const bubble = document.createElement('div'); bubble.className = 'cv-assistant__message cv-assistant__message--' + role;
    const p = document.createElement('p'); p.textContent = value; bubble.append(p);
    if (answerId && config.speechEndpoint) { const button = document.createElement('button'); button.className = 'cv-assistant__audio'; button.type = 'button'; button.innerHTML = speakerIcon; button.setAttribute('aria-label', labels().audio); button.title = labels().audio; button.setAttribute('aria-pressed', 'false'); button.addEventListener('click', () => playAnswer(button, answerId)); bubble.append(button); }
    messages.append(bubble); messages.scrollTop = messages.scrollHeight;
  }
  function viewport() {
    const visible = window.visualViewport;
    host.style.setProperty('--assistant-viewport-top', (visible?.offsetTop || 0) + 'px');
    host.style.setProperty('--assistant-viewport-height', (visible?.height || window.innerHeight) + 'px');
    host.classList.toggle('cv-assistant--keyboard', window.innerHeight - (visible?.height || window.innerHeight) > 120);
  }
  function cancel() { stopAudio(); if (pending) { pending.abort(); pending = null; } send.disabled = false; input.disabled = false; panel.removeAttribute('aria-busy'); }
  function close() { open = false; cancel(); input.blur(); panel.hidden = true; host.classList.remove('cv-assistant--open'); launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); }
  function localize() {
    cancel(); clearAudio(); history = []; messages.replaceChildren();
    host.querySelectorAll('[data-ui]').forEach(el => { el.textContent = labels()[el.dataset.ui]; });
    input.placeholder = labels().placeholder; input.value = '';
    find('.cv-assistant__close').setAttribute('aria-label', labels().close); status.textContent = labels().ready;
    const cv = find('.cv-assistant__cv'); cv.href = config.cv; cv.download = config.downloadName;
    addMessage('assistant', labels().intro);
    const prompts = find('.cv-assistant__prompts'); prompts.replaceChildren();
    labels().prompts.forEach(question => { const button = document.createElement('button'); button.type = 'button'; button.textContent = question; button.addEventListener('click', () => ask(question)); prompts.append(button); });
  }
  async function ask(value) {
    const question = value.trim(); if (!question || question.length > 2000) return;
    const refocus = document.activeElement === input;
    if (pending) { pending.abort(); pending = null; } stopAudio();
    if (!endpoint) { status.textContent = labels().error; return; }
    addMessage('user', question); input.value = '';
    const controller = new AbortController(); pending = controller;
    const timer = setTimeout(() => controller.abort(), 20_000);
    status.textContent = labels().thinking + ' ' + labels().working; panel.setAttribute('aria-busy', 'true');
    try {
      const turns = history.slice(-12); const payload = () => JSON.stringify({ message: question, language: language(), history: turns });
      while (turns.length && new TextEncoder().encode(payload()).length > 30_000) turns.splice(0, 2);
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: payload() });
      if (response.status === 429) { const error = new Error('limit'); error.limited = true; throw error; }
      const result = await response.json(); if (pending !== controller) return;
      if (!response.ok || typeof result.answer !== 'string') throw new Error('request');
      addMessage('assistant', result.answer, result.answerId); history.push({ role: 'user', text: question }, { role: 'model', text: result.answer }); history = history.slice(-12); status.textContent = labels().ready;
    } catch (error) { if (pending === controller) { addMessage('error', error.limited ? labels().limit : labels().error); input.value = question; status.textContent = labels().ready; } }
    finally { clearTimeout(timer); if (pending === controller) { pending = null; panel.removeAttribute('aria-busy'); if (open && refocus) input.focus(); } }
  }
  launcher.addEventListener('click', () => { if (open) return close(); open = true; panel.hidden = false; host.classList.add('cv-assistant--open'); launcher.setAttribute('aria-expanded', 'true'); viewport(); if (window.matchMedia('(max-width:480px)').matches) find('.cv-assistant__close').focus(); else input.focus(); });
  find('.cv-assistant__close').addEventListener('click', close);
  find('form').addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); ask(input.value); } });
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key !== 'Tab') return;
    const elements = Array.from(panel.querySelectorAll('button:not(:disabled),textarea:not(:disabled),a[href]')); const first = elements[0], last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.addEventListener('site-language-change', localize);
  window.visualViewport?.addEventListener('resize', viewport); window.visualViewport?.addEventListener('scroll', viewport); window.addEventListener('resize', viewport);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAudio(); });
  window.addEventListener('pagehide', clearAudio);
  localize(); viewport();

})();

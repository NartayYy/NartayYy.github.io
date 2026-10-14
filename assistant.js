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
  Object.assign(text.ru, {"offer":"Оставить предложение","proposalName":"Ваше имя","proposalContact":"Телефон, email или Telegram","proposalMessage":"Сообщение или вакансия","proposalConsent":"Согласен отправить эти данные Нартаю в Telegram","proposalReview":"Проверить сообщение","proposalConfirm":"Отправить Нартаю","proposalEdit":"Изменить","proposalBack":"Вернуться в чат","proposalSent":"Предложение отправлено Нартаю. Он сможет ответить по указанному контакту.","proposalSending":"Отправляю…","proposalError":"Не удалось отправить предложение. Данные сохранены в форме — попробуйте позже.","proposalUnknown":"Не удалось подтвердить доставку. Повторная отправка автоматически не выполняется.","proposalNote":"Перед отправкой проверьте имя, контакт и текст. Отправляется только эта форма, без истории чата."});
  Object.assign(text.kk, {"offer":"Ұсыныс қалдыру","proposalName":"Атыңыз","proposalContact":"Телефон, email немесе Telegram","proposalMessage":"Хабарлама немесе бос жұмыс орны","proposalConsent":"Бұл деректерді Нартайға Telegram арқылы жіберуге келісемін","proposalReview":"Хабарламаны тексеру","proposalConfirm":"Нартайға жіберу","proposalEdit":"Өзгерту","proposalBack":"Чатқа оралу","proposalSent":"Ұсыныс Нартайға жіберілді. Ол көрсетілген байланыс арқылы жауап бере алады.","proposalSending":"Жіберілуде…","proposalError":"Ұсыныс жіберілмеді. Деректер формада сақталған — кейін қайталап көріңіз.","proposalUnknown":"Жеткізуді растау мүмкін болмады. Автоматты қайта жіберу орындалмайды.","proposalNote":"Атыңызды, байланыс дерегін және мәтінді тексеріңіз. Чат тарихы жіберілмейді."});
  Object.assign(text.en, {"offer":"Leave a proposal","proposalName":"Your name","proposalContact":"Phone, email or Telegram","proposalMessage":"Message or job opportunity","proposalConsent":"I agree to send these details to Nartay on Telegram","proposalReview":"Review message","proposalConfirm":"Send to Nartay","proposalEdit":"Edit","proposalBack":"Back to chat","proposalSent":"Your proposal was sent to Nartay. He can reply using your contact details.","proposalSending":"Sending…","proposalError":"Could not send the proposal. Your details remain in the form — try again later.","proposalUnknown":"Delivery could not be confirmed. No automatic resend was performed.","proposalNote":"Review your name, contact and message before sending. Only this form is sent, without chat history."});
  Object.assign(text.ru, {"proposalNetwork":"Нет соединения со службой отправки. Рабочая сеть может блокировать доступ. Скопируйте сообщение и отправьте его в Telegram напрямую.","proposalCopy":"Скопировать сообщение","proposalTelegram":"Открыть Telegram","proposalCopied":"Сообщение скопировано. Вставьте его в Telegram и отправьте Нартаю.","proposalCopyError":"Не удалось скопировать автоматически. Выделите текст сообщения выше и скопируйте вручную."});
  Object.assign(text.kk, {"proposalNetwork":"Жіберу қызметімен байланыс жоқ. Желі қолжетімділікті шектеуі мүмкін. Хабарламаны көшіріп, Telegram арқылы жіберіңіз.","proposalCopy":"Хабарламаны көшіру","proposalTelegram":"Telegram ашу","proposalCopied":"Хабарлама көшірілді. Telegram-ға қойып, Нартайға жіберіңіз.","proposalCopyError":"Автоматты көшіру мүмкін болмады. Жоғарыдағы мәтінді қолмен көшіріңіз."});
  Object.assign(text.en, {"proposalNetwork":"Cannot connect to the sending service. Your network may block access. Copy your message and send it directly on Telegram.","proposalCopy":"Copy message","proposalTelegram":"Open Telegram","proposalCopied":"Message copied. Paste it into Telegram and send it to Nartay.","proposalCopyError":"Could not copy automatically. Select and copy the message above manually."});
  const language = () => text[document.documentElement.lang] ? document.documentElement.lang : 'ru';
  const labels = () => text[language()];
  const host = document.createElement('div'); host.className = 'cv-assistant';
  host.innerHTML = `<button class="cv-assistant__launcher" type="button" aria-haspopup="dialog" aria-controls="cv-assistant-panel" aria-expanded="false"><span class="cv-orb" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 11a8 8 0 0 1-8 8H7l-4 3v-7a8 8 0 1 1 17-4Z"/><path d="M8 10h8M8 14h5"/></svg></span><span data-ui="launcher"></span></button>
    <section class="cv-assistant__panel" id="cv-assistant-panel" role="dialog" aria-modal="true" aria-labelledby="cv-assistant-title" hidden>
      <header class="cv-assistant__header"><div><strong id="cv-assistant-title" data-ui="title"></strong><p class="cv-assistant__status" role="status"></p></div><button class="cv-assistant__close" type="button">×</button></header>
      <div class="cv-assistant__messages" role="log" aria-live="polite" aria-relevant="additions"></div><div class="cv-assistant__prompts"></div>
      <form class="cv-assistant__form"><label class="cv-assistant__input-label"><span class="sr-only" data-ui="placeholder"></span><textarea rows="2" maxlength="2000" required></textarea></label><div class="cv-assistant__controls"><a class="cv-assistant__cv" data-ui="cv"></a><button class="cv-assistant__send" type="submit" data-ui="send"></button></div></form>
      <form class="cv-assistant__proposal" hidden><div class="cv-assistant__proposal-fields"><p data-ui="proposalNote"></p><label><span data-ui="proposalName"></span><input name="name" autocomplete="name" required maxlength="100"></label><label><span data-ui="proposalContact"></span><input name="contact" autocomplete="email" required maxlength="160"></label><label><span data-ui="proposalMessage"></span><textarea name="message" rows="4" required maxlength="2000"></textarea></label><label class="cv-assistant__consent"><input name="consent" type="checkbox" required><span data-ui="proposalConsent"></span></label><input class="cv-assistant__honeypot" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit" class="cv-assistant__review-button" data-ui="proposalReview"></button></div><div class="cv-assistant__proposal-review" hidden><pre></pre><div><button type="button" class="cv-assistant__proposal-edit" data-ui="proposalEdit"></button><button type="button" class="cv-assistant__proposal-confirm" data-ui="proposalConfirm"></button></div></div><p class="cv-assistant__proposal-status" role="status"></p><div class="cv-assistant__proposal-fallback" hidden><button type="button" class="cv-assistant__proposal-copy" data-ui="proposalCopy"></button><a class="cv-assistant__proposal-telegram" target="_blank" rel="noopener noreferrer" data-ui="proposalTelegram"></a></div><button type="button" class="cv-assistant__proposal-back" data-ui="proposalBack"></button></form><footer class="cv-assistant__footer"><button type="button" class="cv-assistant__offer" data-ui="offer"></button><p data-ui="privacy"></p></footer>
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
    hideProposal(); cancel(); clearAudio(); history = []; messages.replaceChildren();
    host.querySelectorAll('[data-ui]').forEach(el => { el.textContent = labels()[el.dataset.ui]; });
    input.placeholder = labels().placeholder; input.value = '';
    find('.cv-assistant__close').setAttribute('aria-label', labels().close); status.textContent = labels().ready;
    find('.cv-assistant__proposal-telegram').href = config.contactTelegram || 'https://t.me/NartayYy';
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
    const elements = Array.from(panel.querySelectorAll('button:not(:disabled),textarea:not(:disabled),input:not(:disabled),a[href]')).filter(element => element.getClientRects().length); const first = elements[0], last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.addEventListener('site-language-change', localize);
  window.visualViewport?.addEventListener('resize', viewport); window.visualViewport?.addEventListener('scroll', viewport); window.addEventListener('resize', viewport);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAudio(); });
  window.addEventListener('pagehide', clearAudio);
  const proposalForm = find('.cv-assistant__proposal'), proposalFields = find('.cv-assistant__proposal-fields'), proposalReview = find('.cv-assistant__proposal-review'), proposalStatus = find('.cv-assistant__proposal-status');
  const confirmProposal = find('.cv-assistant__proposal-confirm');
  let draft = null, draftSignature = '', submittingProposal = false;
  function hideProposal() {
    proposalForm.hidden = true; host.classList.remove('cv-assistant--proposal');
    messages.hidden = false; find('.cv-assistant__prompts').hidden = false; find('.cv-assistant__form').hidden = false; find('.cv-assistant__footer').hidden = false;
    find('#cv-assistant-title').textContent = labels().title;
  }
  find('.cv-assistant__offer').addEventListener('click', () => {
    cancel(); if (!draft) { proposalFields.hidden = false; proposalReview.hidden = true; proposalStatus.textContent = ''; } proposalForm.hidden = false; host.classList.add('cv-assistant--proposal');
    messages.hidden = true; find('.cv-assistant__prompts').hidden = true; find('.cv-assistant__form').hidden = true; find('.cv-assistant__footer').hidden = true;
    find('#cv-assistant-title').textContent = labels().offer; status.textContent = labels().ready;
  });
  find('.cv-assistant__proposal-back').addEventListener('click', hideProposal);
  proposalForm.addEventListener('submit', event => {
    event.preventDefault(); if (submittingProposal || !proposalForm.reportValidity()) return;
    const fields = new FormData(proposalForm);
    const body = { name: fields.get('name').trim(), contact: fields.get('contact').trim(), message: fields.get('message').trim(), consent: fields.get('consent') === 'on', website: fields.get('website') || '' };
    const signature = JSON.stringify(body);
    if (signature !== draftSignature) { draft = { ...body, requestId: crypto.randomUUID() }; draftSignature = signature; }
    proposalReview.querySelector('pre').textContent = labels().proposalName + ': ' + body.name + '\n' + labels().proposalContact + ': ' + body.contact + '\n\n' + body.message;
    find('.cv-assistant__proposal-fallback').hidden = true; proposalFields.hidden = true; proposalReview.hidden = false; proposalStatus.textContent = ''; confirmProposal.focus();
  });
  find('.cv-assistant__proposal-edit').addEventListener('click', () => { if (submittingProposal) return; proposalFields.hidden = false; proposalReview.hidden = true; });
  confirmProposal.addEventListener('click', async () => {
    if (!draft || submittingProposal) return;
    submittingProposal = true; confirmProposal.disabled = true; find('.cv-assistant__proposal-edit').disabled = true; proposalStatus.textContent = labels().proposalSending;
    try {
      const response = await fetch(config.contactEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(18_000), body: JSON.stringify(draft) });
      const result = await response.json();
      if (!response.ok || !result.sent) { const error = new Error('delivery'); error.unknown = result.error === 'delivery_unknown'; throw error; }
      proposalStatus.textContent = labels().proposalSent; proposalReview.hidden = true; proposalFields.hidden = true; proposalForm.reset(); draft = null; draftSignature = '';
    } catch (error) { proposalStatus.textContent = error.unknown || error.name === 'TimeoutError' ? labels().proposalUnknown : error instanceof TypeError ? labels().proposalNetwork : labels().proposalError; find('.cv-assistant__proposal-fallback').hidden = false; }
    finally { submittingProposal = false; confirmProposal.disabled = false; find('.cv-assistant__proposal-edit').disabled = false; }
  });

  find('.cv-assistant__proposal-copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(proposalReview.querySelector('pre').textContent); proposalStatus.textContent = labels().proposalCopied; }
    catch { proposalStatus.textContent = labels().proposalCopyError; }
  });
  localize(); viewport();

})();

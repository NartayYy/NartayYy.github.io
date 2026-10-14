const assert = require('node:assert/strict');
const path = require('node:path');
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
(async () => {
  const { createServer } = await import('../assistant/server.mjs');
  const server = createServer({ apiKey: '' }); await new Promise(r => server.listen(8787, '127.0.0.1', r));
  let browser;
  try {
    browser = await playwright.chromium.launch({ headless: true, channel: 'msedge' });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.addInitScript(() => {
      class Recognition { constructor() { window.testRecognition = this; } start() {} abort() { window.testAborted = true; } }
      window.SpeechRecognition = Recognition;
      window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
      window.testVoices = [{voiceURI:'ru-1',name:'Russian 1',lang:'ru-RU'},{voiceURI:'ru-2',name:'Russian 2',lang:'ru-RU'},{voiceURI:'kk-1',name:'Kazakh',lang:'kk-KZ'}];
      Object.defineProperty(window, 'speechSynthesis', { value: { cancel() {}, getVoices() { return [...window.testVoices]; }, speak(value) { window.testSpokenLanguage = value.lang; window.testVoiceURI = value.voice?.voiceURI; value.onend?.(); } } });
    });
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.route('https://kinbridge.us/api/cv-chat', async route => {
      const headers = { 'Access-Control-Allow-Origin': 'http://localhost:8787', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers });
      const message = route.request().postDataJSON().message;
      if (message === 'Slow question') await new Promise(resolve => setTimeout(resolve, 1200));
      try { await route.fulfill({ status: 200, headers, contentType: 'application/json', body: JSON.stringify({ answer: 'PostgreSQL 16.6 — опыт из CV. ' + message + ' <script>malicious()</script>' }) }); } catch { /* aborted old request */ }
    });
    await page.goto('http://localhost:8787'); await page.locator('.cv-assistant__launcher').click();
    await page.locator('.cv-assistant textarea').fill('Опыт PostgreSQL?'); await page.locator('.cv-assistant__send').click();
    await page.waitForFunction(() => document.querySelector('.cv-assistant__messages').textContent.includes('PostgreSQL 16.6'));
    assert.equal(await page.locator('.cv-assistant__messages script').count(), 0);
    await page.locator('.cv-assistant__voice').selectOption('ru-2'); await page.locator('.cv-assistant__preview').click();
    assert.equal(await page.evaluate(() => window.testVoiceURI), 'ru-2');
    assert.equal(await page.evaluate(() => localStorage.getItem('cv-assistant-voice-ru')), 'ru-2');
    await page.locator('.cv-assistant textarea').fill('Slow question'); await page.locator('.cv-assistant__send').click();
    assert.equal(await page.locator('.cv-assistant textarea').isEnabled(), true);
    await page.locator('.cv-assistant textarea').fill('опыт есть с sql'); await page.locator('.cv-assistant__send').click();
    await page.waitForFunction(() => document.querySelector('.cv-assistant__messages').textContent.includes('CV. опыт есть с sql'));
    await page.keyboard.press('Escape'); assert.equal(await page.locator('.cv-assistant__panel').isHidden(), true);
    await page.setViewportSize({ width: 390, height: 844 }); await page.locator('.cv-assistant__launcher').click();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.evaluate(() => window.siteI18n.applyLanguage('kk'));
    await page.locator('.cv-assistant__mic').click(); assert.equal(await page.locator('.cv-assistant__mic').getAttribute('aria-pressed'), 'true');
    await page.evaluate(() => window.testRecognition.onresult({ results: [[{ transcript: 'Тәжірибесі қандай?' }]] }));
    await page.waitForFunction(() => window.testSpokenLanguage === 'kk-KZ');
    await page.locator('.cv-assistant__mic').click(); await page.locator('.cv-assistant__close').click();
    assert.equal(await page.evaluate(() => window.testAborted), true);
    await page.evaluate(() => window.siteI18n.applyLanguage('en')); assert.match(await page.locator('.cv-assistant__launcher').innerText(), /AI assistant/);
    await page.evaluate(() => window.siteI18n.applyLanguage('ru')); await page.locator('.cv-assistant__launcher').click();
    await page.screenshot({ path: 'assistant-preview.tmp.png' });
    assert.deepEqual(errors, []);
    console.log('Browser passed: safe text, replacing pending questions, mobile, languages, voice selection and preview, microphone lifecycle, closing. API fixture used.');
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
})().catch(error => { console.error(error); process.exitCode = 1; });

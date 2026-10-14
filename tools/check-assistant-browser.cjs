const assert = require('node:assert/strict'); const path = require('node:path');
let playwright; try { playwright = require('playwright'); } catch { playwright = require(path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const wav=Buffer.alloc(44+24000*2*2);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(24000,24);wav.writeUInt32LE(48000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(wav.length-44,40);
(async()=>{
 const {createServer}=await import('../assistant/server.mjs');const server=createServer({apiKey:''});await new Promise(r=>server.listen(8787,'127.0.0.1',r));let browser;
 try {
  browser=await playwright.chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage({viewport:{width:1280,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{const visible=new EventTarget();visible.height=innerHeight;visible.offsetTop=0;window.testViewport=visible;Object.defineProperty(window,'visualViewport',{value:visible});});
  let speechCalls=0, contactCalls=0, contactFail=false;
  await page.route('https://kinbridge.us/api/**',async route=>{
   const headers={'Access-Control-Allow-Origin':'http://localhost:8787','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'POST, OPTIONS'};
   if(route.request().method()==='OPTIONS')return route.fulfill({status:204,headers});
   if(route.request().url().endsWith('cv-speech')){speechCalls++;return route.fulfill({status:200,headers,contentType:'audio/wav',body:wav});}
   if(route.request().url().endsWith('cv-contact')){if(contactFail)return route.abort('blockedbyclient');contactCalls++; const body=route.request().postDataJSON(); assert.equal(body.consent,true); assert.equal(body.history,undefined); return route.fulfill({status:200,headers,contentType:'application/json',body:JSON.stringify({sent:true})});}
   const message=route.request().postDataJSON().message;if(message==='Slow question')await new Promise(r=>setTimeout(r,1000));
   try{await route.fulfill({status:200,headers,contentType:'application/json',body:JSON.stringify({answer:'Ответ CV. '+message+' <script>malicious()</script>',answerId:'00000000-0000-0000-0000-000000000001'})});}catch{}
  });
  await page.goto('http://localhost:8787');await page.locator('.cv-assistant__launcher').click();
  assert.equal(await page.locator('.cv-assistant__mic,.cv-assistant__voice,.cv-assistant__preview').count(),0);
  assert.equal(await page.locator('.cv-assistant__cv').count(),1);assert.equal(await page.locator('.cv-assistant__footer a').count(),0);assert.match(await page.locator('.cv-assistant__cv').getAttribute('href'),/assets\/cv.pdf/);
  await page.locator('.cv-assistant__form textarea').fill('опыт есть с sql');await page.locator('.cv-assistant__send').click();await page.waitForFunction(()=>document.querySelector('.cv-assistant__messages').textContent.includes('Ответ CV. опыт есть с sql'));
  assert.equal(await page.locator('.cv-assistant__messages script').count(),0);assert.equal(speechCalls,0);
  await page.locator('.cv-assistant__audio').click();await page.waitForFunction(()=>document.querySelector('.cv-assistant__audio').getAttribute('aria-pressed')==='true');assert.equal(speechCalls,1);
  await page.locator('.cv-assistant__audio').click();assert.equal(await page.locator('.cv-assistant__audio').getAttribute('aria-pressed'),'false');
  await page.locator('.cv-assistant__form textarea').fill('Slow question');await page.locator('.cv-assistant__send').click();assert.equal(await page.locator('.cv-assistant__form textarea').isEnabled(),true);
  await page.locator('.cv-assistant__form textarea').fill('Опыт DevOps');await page.locator('.cv-assistant__send').click();await page.waitForFunction(()=>document.querySelector('.cv-assistant__messages').textContent.includes('Ответ CV. Опыт DevOps'));
  await page.keyboard.press('Escape');assert.equal(await page.locator('.cv-assistant__panel').isHidden(),true);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{testViewport.height=844;testViewport.dispatchEvent(new Event('resize'));});await page.locator('.cv-assistant__launcher').click();
  assert.equal(await page.locator('.cv-assistant__form textarea').evaluate(el=>document.activeElement===el),false);
  await page.evaluate(()=>{testViewport.height=340;testViewport.offsetTop=14;testViewport.dispatchEvent(new Event('resize'));});
  const bounds=await page.locator('.cv-assistant__send').boundingBox();assert.ok(bounds.y+bounds.height<=354,JSON.stringify(bounds));
  assert.equal(await page.locator('.cv-assistant__prompts').isHidden(),true);assert.equal(await page.locator('.cv-assistant__cv').isVisible(),true);
  await page.screenshot({path:'assistant-keyboard.tmp.png'});
  await page.evaluate(()=>{testViewport.height=844;testViewport.offsetTop=0;testViewport.dispatchEvent(new Event('resize'));});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.evaluate(()=>window.siteI18n.applyLanguage('kk'));assert.match(await page.locator('.cv-assistant__cv').innerText(),/CV/);
  await page.evaluate(()=>window.siteI18n.applyLanguage('en'));assert.match(await page.locator('.cv-assistant__launcher').textContent(),/AI assistant/);
  await page.evaluate(()=>window.siteI18n.applyLanguage('ru'));await page.screenshot({path:'assistant-preview.tmp.png'});
  await page.locator('.cv-assistant__offer').click();
  await page.locator('.cv-assistant__proposal input[name=name]').fill('Test recruiter');
  await page.locator('.cv-assistant__proposal input[name=contact]').fill('recruiter@example.com');
  await page.locator('.cv-assistant__proposal textarea').fill('Job opportunity');
  await page.locator('.cv-assistant__proposal input[name=consent]').check();
  await page.locator('.cv-assistant__review-button').click(); assert.equal(contactCalls,0);
  assert.match(await page.locator('.cv-assistant__proposal-review pre').innerText(),/recruiter@example.com/);
  await page.locator('.cv-assistant__proposal-confirm').click();
  await page.waitForFunction(()=>document.querySelector('.cv-assistant__proposal-status').textContent.includes('отправлено'));
  assert.equal(contactCalls,1);
  await page.locator('.cv-assistant__proposal-back').click(); await page.locator('.cv-assistant__offer').click();
  await page.locator('.cv-assistant__proposal input[name=name]').fill('Test visitor');
  await page.locator('.cv-assistant__proposal input[name=contact]').fill('visitor@example.com');
  await page.locator('.cv-assistant__proposal textarea').fill('Blocked proposal');
  await page.locator('.cv-assistant__proposal input[name=consent]').check(); await page.locator('.cv-assistant__review-button').click();
  contactFail=true; await page.locator('.cv-assistant__proposal-confirm').click();
  await page.locator('.cv-assistant__proposal-fallback').waitFor({state:'visible'});
  assert.match(await page.locator('.cv-assistant__proposal-status').innerText(),/Нет соединения/);
  assert.match(await page.locator('.cv-assistant__proposal-telegram').getAttribute('href'),/t.me\/NartayYy/);
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async value=>{window.testCopied=value;}}}));
  await page.locator('.cv-assistant__proposal-copy').click(); assert.match(await page.evaluate(()=>window.testCopied),/Blocked proposal/);
  assert.deepEqual(errors,[]);console.log('Browser passed: text chat, one CV link, no microphone/voice menus, Gemini audio playback, pending replacement, mobile keyboard viewport, languages. API/audio fixtures used.');
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1});

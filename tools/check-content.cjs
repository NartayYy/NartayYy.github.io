const fs = require('fs'), vm = require('vm'), assert = require('assert');
const source = JSON.parse(fs.readFileSync('content.json','utf8'));
const mapping = JSON.parse(fs.readFileSync('tools/content-selectors.json','utf8'));
const groups = {};
function element(value='') { return {innerHTML:value,content:'',dataset:{},classList:{toggle(){}},setAttribute(){},addEventListener(){}}; }
for (const [selector,key] of Object.entries(mapping)) groups[selector]=source.languages.ru.sections[key].map(()=>element());
groups['.language-switcher__option']=['ru','kk','en'].map(lang=>Object.assign(element(),{dataset:{lang}}));
const singles={};
const context={window:{dispatchEvent(){}},document:{documentElement:{lang:'ru'},querySelectorAll:s=>groups[s]||[],querySelector:s=>singles[s]||(singles[s]=element()),getElementById:id=>singles[id]||(singles[id]=element())},localStorage:{getItem:()=>null,setItem(){}},CustomEvent:function(name,detail){this.detail=detail}};
vm.createContext(context);
vm.runInContext(fs.readFileSync('content.js','utf8'),context);
vm.runInContext(fs.readFileSync('i18n.js','utf8'),context);
context.window.siteI18n.init();
for(const lang of ['ru','kk','en','ru']) {
 context.window.siteI18n.applyLanguage(lang);
 assert.equal(context.document.documentElement.lang,lang);
 assert.equal(context.document.title,source.languages[lang].title);
 for(const [selector,key] of Object.entries(mapping)) {
  source.languages[lang].sections[key].forEach((value,index)=>{
   const expected=key==='experienceDetails'?value.map(v=>'<li>'+v+'</li>').join(''):value;
   assert.equal(groups[selector][index].innerHTML,expected,lang+'/'+key);
  });
 }
}
console.log('All content fields passed RU -> KZ -> EN -> RU switching.');

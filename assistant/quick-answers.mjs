// Only short, unambiguous FAQ questions use this path. Other questions go to Gemini.
const normalize = text => text.toLowerCase().replace(/[?!.,:;—–-]/g, ' ').replace(/\s+/g, ' ').trim();
const words = new Set('а и есть ли опыт у него нартая нартай какой каков работы работа с со по в об про расскажи расскажите sql скл postgresql postgres постгрес базами данных бд devops девопс руководства руководитель управления управлении командой команды ai ии проекты проектах project projects experience with does he have nartay his what about tell me leadership management database databases тәжірибесі тәжірибе бар ма нартайдың туралы басқару жобалары'.split(' '));

export function quickAnswer(data, message, language, clean) {
  const question = normalize(message);
  if (question.length > 140 || !question.split(' ').every(word => words.has(word))) return null;
  const sql = /\b(sql|postgresql|postgres)\b|скл|постгрес/.test(question);
  const devops = /devops|девопс/.test(question);
  const leadership = /руковод|управл|команд|leadership|management|басқару/.test(question);
  const ai = /\bai\b|\bprojects?\b|проект|жобалары/.test(question) || question.split(' ').includes('ии');
  if ([sql, devops, leadership, ai].filter(Boolean).length !== 1) return null;
  const sections = data.languages[language].sections;
  const topic = sql ? 'sql' : devops ? 'devops' : leadership ? 'leadership' : 'ai';
  const patterns = { sql: /PostgreSQL|MS SQL|SQL|pg_hba|slow.quer/i, devops: /Debian|Docker|Nginx|Ansible/i, leadership: /Led the department|Бөлімді|Руководил отделом|Бөлім|планирование|пландау|planning/i, ai: /iDos|ChromaDB|Aiogram/i };
  const evidence = [];
  sections.experienceDetails.forEach((items, index) => {
    const matched = items.map(clean).filter(line => patterns[topic].test(line));
    if (matched.length && evidence.length < 2) evidence.push({ company: clean(sections.experienceCompanies[index]), lines: matched.slice(0, topic === 'devops' ? 3 : 1) });
  });
  if (!evidence.length) return null;
  const intro = { ru: 'Вот что указано в CV:', kk: 'CV-де көрсетілген тәжірибе:', en: 'Here is the experience listed in the CV:' }[language];
  const stack = sql ? data.stack.flat().filter(tag => /sql/i.test(tag)) : [];
  const stackLabel = { ru: 'Стек', kk: 'Стек', en: 'Stack' }[language];
  return intro + '\n\n' + evidence.map(item => item.company + '\n' + item.lines.map(line => '• ' + line).join('\n')).join('\n\n') + (stack.length ? '\n\n' + stackLabel + ': ' + stack.join(', ') + '.' : '');
}

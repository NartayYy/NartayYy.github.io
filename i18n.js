(function () {
  'use strict';

  const selectors = [
    '.skip-link', '.navbar__link', '.location-text', '.hero__eyebrow', '.hero__name',
    '.hero__position', '.hero__tagline', '.download-label', '.write-label',
    '.section__title', '.about__content p', '.card__title', '.card__text',
    '.timeline__date', '.timeline__company', '.timeline__role', '.timeline__list',
    '.education__title', '.education__detail', '.techstack__category',
    '.language__name', '.language__level', '.footer__title', '.footer__copy'
  ];

  const copy = {
    kk: {
      title: 'Симагомбетов Нартай — АКТ басшысы | DevOps / DBA',
      description: 'Симагомбетов Нартайдың түйіндемесі — АКТ басшысы, ҚР мемлекеттік секторында 15+ жыл, DevOps, DBA және ақпараттық қауіпсіздік.',
      aria: { nav: 'Негізгі навигация', scroll: 'Төмен айналдыру', top: 'Жоғары', photo: 'Симагомбетов Нартай' },
      values: {
        '.skip-link': ['Мазмұнға өту'],
        '.navbar__link': ['Өзім туралы', 'Құзыреттер', 'Тәжірибе', 'Білім', 'Стек', 'Тілдер', 'Байланыс'],
        '.location-text': ['Астана, Қазақстан', 'Астана, Қазақстан'],
        '.hero__eyebrow': ['Басқару · Инфрақұрылым · Деректер'],
        '.hero__name': ['Симагомбетов<br>Нартай'],
        '.hero__position': ['АКТ басшысы · DevOps / DBA'],
        '.hero__tagline': ['ҚР мемлекеттік секторының сындарлы инфрақұрылымы · IT саласында 15+ жыл · басқаруда 5+ жыл · НҚА · АБ · цифрлық сервистер'],
        '.download-label': ['CV жүктеу'],
        '.write-label': ['Хат жазу'],
        '.section__title': ['Өзім туралы', 'Негізгі құзыреттер', 'Жұмыс тәжірибесі', 'Білім', 'Техникалық стек', 'Тілдер', 'Кәсіби ұстаным'],
        '.about__content p': [
          'Қазақстанның мемлекеттік секторында 15 жылдан астам тәжірибесі бар АКТ басшысы және инфрақұрылым инженері. 5 жылдан астам дерекқорларды сүйемелдеу бөлімін басқарып, ЦБДАН және БДИК ұлттық тізілімдеріне жауап бердім. Қазір TIZILIM мемлекеттік платформасының тәулік бойы жұмысын қамтамасыз етемін: Debian жүйесіндегі 5 сервер, 10+ Docker контейнері, L2/L3 қолдау, Nginx, PostgreSQL, Redis, Meilisearch және толық observability контуры. Команданы басқаруды hands-on жұмысымен, Ansible автоматтандыруымен, ақпараттық қауіпсіздікпен және AI-сервистер әзірлеумен ұштастырамын.',
          'Басқарушылық тәжірибені hands-on пайдаланумен ұштастырамын: команданың жұмысын және есептілікті жолға қойып, production инцидентін дербес диагностикалай аламын, сұрауды оңтайландырамын, reverse proxy, мониторинг немесе Ansible playbook баптаймын. Басымдықтарым — өлшенетін қолжетімділік, тексерілген қалпына келтіру, деректер қауіпсіздігі және инфрақұрылымды бір адамға тәуелді етпейтін құжаттама.'
        ],
        '.card__title': ['АКТ басшылығы', 'НҚА және регламенттер', 'Ақпараттық қауіпсіздік', 'Жобалық құжаттама', 'Инфрақұрылым / DevOps', 'Дерекқорлар', 'AI / Цифрлық сервистер'],
        '.card__text': [
          'Команданы басқару, жоспарлау, KPI бақылау және есептілік',
          'Ақпараттық жүйелер бойынша нормативтік актілерді әзірлеу; ҚР ЦДИАӨМ-мен өзара іс-қимыл',
          'Рұқсатсыз қол жеткізуден қорғау, SSL/TLS, желіні сегменттеу, қолжетімділікті басқару және аудит',
          'Техникалық тапсырмалар, архитектуралық сызбалар, жоспарлар және талаптар спецификациялары',
          'Linux, Docker Compose, Nginx L7, Ansible, observability және L2/L3 production support',
          'PostgreSQL 16, Redis, Meilisearch, MS SQL, Lotus Domino — пайдалану және оңтайландыру',
          'Python, Aiogram, MongoDB, ChromaDB, OpenAI API — интеллектуалды сервистер мен интеграциялар'
        ],
        '.timeline__date': ['06.2025 — қазіргі уақыт', '11.2019 — 05.2025 (5 жыл 7 ай)', '06.2018 — 11.2019 (1 жыл 6 ай)', '06.2014 — 06.2018 (4 жыл 1 ай)', '09.2011 — 03.2014 (2 жыл 7 ай)', '11.2010 — 09.2011 (11 ай)'],
        '.timeline__company': ['«Қазақстандық индустрия және экспорт орталығы QazIndustry» АҚ', 'ҚР ЦДИАӨМ «Мемлекеттік радиожиілік қызметі» РМК', '«Энергоинформ» АҚ', '«Ұлттық ақпараттық технологиялар» АҚ', '«Бизнес Софт» ЖШС', 'IT Research Center'],
        '.timeline__role': ['Цифрлық трансформация дирекциясының бас сарапшысы', 'Дерекқорларды сүйемелдеу бөлімінің бастығы', 'Бас маман — DBA / System Administrator', 'Бас маман — Lotus Domino DBA', 'Бизнес-талдаушы / Енгізу маманы', 'Енгізу және сүйемелдеу маманы'],
        '.timeline__list': [
          '<li>TIZILIM ГАЖ-ды тәулік бойы пайдалану: Debian 12 жүйесіндегі 5 сервер, uptime 99.9% және L2/L3 қолдау</li><li>10+ Docker контейнері, Docker Compose, volumes және persistent storage</li><li>Nginx L7 load balancer, reverse proxy және 6+ доменге SSL termination</li><li>Prometheus, Grafana, Loki, Alertmanager және Zabbix; 14 ереже, инциденттерді 2 минутқа дейін анықтау</li><li>PostgreSQL 16.6, Redis 7.4 және Meilisearch 1.8 әкімшілендіру және оңтайландыру</li><li>Ansible арқылы серверлерді басқару, релиздерді өрістету және dev.qazindustry.gov.kz тест ортасын баптау</li><li>Ubuntu 22.04 жүйесінде құжаттарды индекстеу сервисі және Wildcard SSL</li><li>Министрлікке арналған iDos AI-ботын әзірлеу және 3 инженерді үйлестіру</li>',
          '<li>Бөлімді 5.5 жыл басқару, жоспарлау және 100% орындалу көрсеткіші</li><li>ЦБДАН және БДИК сындарлы тізілімдерін 5 жыл деректер жоғалтусыз сүйемелдеу</li><li>НҚА, ішкі регламенттер және ақпараттық қауіпсіздік талаптарын әзірлеуге қатысу</li><li>DWH-ты нөлден құрып, талдаушылардың қол еңбегін 70% қысқарту</li><li>Есептер мен ДҚ тестілеу, реттеуші шешімдер үшін статистиканы қалыптастыру</li>',
          '<li>Lotus Domino v9.0 және Windows Server 2008 R2 әкімшілендіру, резервтік көшірмелерді бақылап қалпына келтіру</li><li>Серверлер мен қолданбалардың өнімділігін мониторингтеу және пайдаланушыларды қолдау</li><li>ARIS for SAP Solutions бизнес-процестері және жұмыс тобын оқыту</li><li>IAM, лицензиялар мониторингі және инциденттерді жою</li>',
          '<li>5+ мемлекеттік орган үшін Lotus Domino дерекқорларын әкімшілендіру, репликация және объектілерді қалпына келтіру</li><li>Журналдарды талдау, бұғаттаулар мен репликация қателерін жою, жүйені баптау</li><li>Бақылау құжаттары, НҚА және мемлекеттік органдар тапсырмалары бойынша есептер әзірлеу</li>',
          '<li>Ұлттық медициналық холдингтің 3 мекемесінде МАЖ енгізу және пайдаланушыларды оқыту</li><li>Бизнес-талдау, талаптар спецификациялары, тест-жоспарлар, штаттан тыс сценарийлер және нұсқаулықтар</li>',
          '<li>C++ тілінде есеп айырысу жүйесін әзірлеу және енгізуді сүйемелдеу</li><li>Монополистер мониторингі АЖ-ны республика бойынша өрістету, жұмыс орындары, тест-жоспарлар және құжаттама</li>'
        ],
        '.education__title': ['Esil University, Астана', 'Ақмола қаржы-экономикалық колледжі'],
        '.education__detail': ['Бакалавр, Ақпараттық жүйелер / АКТ', 'Техник-бағдарламашы, ЕТ бағдарламалық жасақтамасы'],
        '.techstack__category': ['ДҚБЖ', 'Мониторинг / Логтар', 'Автоматтандыру', 'Инфрақұрылым', 'Тілдер / Скрипттер', 'AI / Интеграциялар', 'Құралдар'],
        '.language__name': ['Қазақ тілі', 'Орыс тілі', 'Ағылшын тілі'],
        '.language__level': ['Ана тілі (C2)', 'Еркін (C2)', 'Ортадан жоғары (B2)'],
        '.footer__title': ['Байланыс'],
        '.footer__copy': ['&copy; <span id="currentYear">2026</span> Симагомбетов Нартай']
      }
    },
    en: {
      title: 'Simagombetov Nartay — ICT Leader | DevOps / DBA',
      description: 'Resume of Simagombetov Nartay — ICT leader with 15+ years in Kazakhstan’s public sector, DevOps, DBA and information security.',
      aria: { nav: 'Primary navigation', scroll: 'Scroll down', top: 'Back to top', photo: 'Simagombetov Nartay' },
      values: {
        '.skip-link': ['Skip to content'],
        '.navbar__link': ['About', 'Expertise', 'Experience', 'Education', 'Stack', 'Languages', 'Contacts'],
        '.location-text': ['Astana, Kazakhstan', 'Astana, Kazakhstan'],
        '.hero__eyebrow': ['Leadership · Infrastructure · Data'],
        '.hero__name': ['Simagombetov<br>Nartay'],
        '.hero__position': ['ICT Leader · DevOps / DBA'],
        '.hero__tagline': ['Critical public-sector infrastructure · 15+ years in IT · 5+ years in leadership · Regulation · Security · Digital services'],
        '.download-label': ['Download CV'],
        '.write-label': ['Contact me'],
        '.section__title': ['About', 'Core expertise', 'Work experience', 'Education', 'Technical stack', 'Languages', 'Professional approach'],
        '.about__content p': [
          'ICT leader and infrastructure engineer with 15+ years in Kazakhstan’s public sector. I led a database-support department for more than five years and was responsible for the national CBDAN and BDIK registries. I now operate the TIZILIM government platform 24/7 across five Debian servers, 10+ Docker containers, L2/L3 support, Nginx, PostgreSQL, Redis, Meilisearch and a full observability stack. I combine team leadership with hands-on engineering, Ansible automation, information security and AI-service development.',
          'I combine leadership with hands-on operations: I can establish team processes and executive reporting, then personally diagnose a production incident, optimize a query, or configure a reverse proxy, monitoring stack or Ansible playbook. My priorities are measurable availability, tested recovery, data security and documentation that removes single-person dependency.'
        ],
        '.card__title': ['ICT leadership', 'Regulation and procedures', 'Information security', 'Project documentation', 'Infrastructure / DevOps', 'Databases', 'AI / Digital services'],
        '.card__text': [
          'Team leadership, planning, KPI control and executive reporting',
          'Drafting information-system regulations and working with Kazakhstan’s digital-development ministry',
          'Unauthorized-access protection, SSL/TLS, network segmentation, access control and audit trails',
          'Technical specifications, architecture diagrams, implementation plans and requirements',
          'Linux, Docker Compose, Nginx L7, Ansible, observability and L2/L3 production support',
          'PostgreSQL 16, Redis, Meilisearch, MS SQL and Lotus Domino operations and optimization',
          'Intelligent services and integrations with Python, Aiogram, MongoDB, ChromaDB and OpenAI API'
        ],
        '.timeline__date': ['Jun 2025 — Present', 'Nov 2019 — May 2025 (5 years 7 months)', 'Jun 2018 — Nov 2019 (1 year 6 months)', 'Jun 2014 — Jun 2018 (4 years 1 month)', 'Sep 2011 — Mar 2014 (2 years 7 months)', 'Nov 2010 — Sep 2011 (11 months)'],
        '.timeline__company': ['QazIndustry — Kazakhstan Industry and Export Center JSC', 'State Radio Frequency Service, Ministry of Digital Development of Kazakhstan', 'Energoinform JSC', 'National Information Technologies JSC', 'Business Soft LLP', 'IT Research Center'],
        '.timeline__role': ['Chief Expert, Digital Transformation Directorate', 'Head of Database Support Department', 'Chief Specialist — DBA / System Administrator', 'Chief Specialist — Lotus Domino DBA', 'Business Analyst / Implementation Specialist', 'Implementation and Support Specialist'],
        '.timeline__list': [
          '<li>Operated TIZILIM 24/7 across five Debian 12 servers with 99.9% uptime and L2/L3 support</li><li>Managed 10+ Docker containers, Docker Compose, volumes and persistent storage</li><li>Configured Nginx L7 load balancing, reverse proxy and SSL termination for 6+ domains</li><li>Built observability with Prometheus, Grafana, Loki, Alertmanager and Zabbix; 14 rules and sub-two-minute incident detection</li><li>Administered and optimized PostgreSQL 16.6, Redis 7.4 and Meilisearch 1.8</li><li>Automated server management with Ansible, deployed releases and configured dev.qazindustry.gov.kz</li><li>Delivered an indexed document service on Ubuntu 22.04 and managed Wildcard SSL</li><li>Built the ministry’s iDos AI bot and coordinated three engineers</li>',
          '<li>Led the department for 5.5 years with 100% plan completion</li><li>Operated the critical CBDAN and BDIK national registries for five years with zero data loss</li><li>Contributed to regulations, internal procedures and information-security controls</li><li>Built a DWH from scratch and reduced analysts’ manual work by 70%</li><li>Tested reports and databases and produced regulator-facing statistics</li>',
          '<li>Administered Lotus Domino v9.0 and Windows Server 2008 R2 with tested backup recovery</li><li>Monitored server and application performance and supported users</li><li>Modelled business processes in ARIS for SAP Solutions and trained the working group</li><li>Managed IAM, licenses and incident resolution</li>',
          '<li>Administered Lotus Domino databases for 5+ government agencies, including replication and object recovery</li><li>Analysed logs, resolved locks and replication errors, and configured system structures</li><li>Built reports for controlled documents, regulations and government assignments</li>',
          '<li>Implemented and trained users on a medical information system in three National Medical Holding institutions</li><li>Performed business analysis and testing; produced requirements, test plans, exception scenarios and user guides</li>',
          '<li>Developed a C++ billing system and supported its implementation</li><li>Rolled out a nationwide monopoly-monitoring system, workstations, content-server data, tests and documentation</li>'
        ],
        '.education__title': ['Esil University, Astana', 'Akmola College of Finance and Economics'],
        '.education__detail': ['Bachelor’s degree, Information Systems / ICT', 'Software Technician, Computer Systems Software'],
        '.techstack__category': ['Databases', 'Monitoring / Logs', 'Automation', 'Infrastructure', 'Languages / Scripting', 'AI / Integrations', 'Tools'],
        '.language__name': ['Kazakh', 'Russian', 'English'],
        '.language__level': ['Native (C2)', 'Fluent (C2)', 'Upper-intermediate (B2)'],
        '.footer__title': ['Contacts'],
        '.footer__copy': ['&copy; <span id="currentYear">2026</span> Simagombetov Nartay']
      }
    }
  };

  const originals = {};
  let renderedLanguage = 'ru';

  function collectOriginals() {
    selectors.forEach(function (selector) {
      originals[selector] = Array.from(document.querySelectorAll(selector)).map(function (element) {
        return element.innerHTML;
      });
    });
  }

  function setValues(values) {
    selectors.forEach(function (selector) {
      const items = values[selector] || originals[selector];
      document.querySelectorAll(selector).forEach(function (element, index) {
        if (items[index] !== undefined) element.innerHTML = items[index];
      });
    });
  }

  function finalizeCounters() {
    document.querySelectorAll('.counter').forEach(function (element) {
      const target = Number(element.dataset.target);
      const decimals = Number(element.dataset.decimals || 0);
      element.textContent = target.toFixed(decimals) + (element.dataset.suffix || '');
    });
  }

  function applyLanguage(language) {
    const lang = copy[language] ? language : 'ru';
    const selected = copy[lang];
    const contentChanged = lang !== renderedLanguage;
    if (contentChanged) setValues(selected ? selected.values : originals);
    renderedLanguage = lang;
    document.documentElement.lang = lang;
    document.title = selected ? selected.title : 'Симагомбетов Нартай — Руководитель ИКТ | DevOps / DBA';
    const description = selected ? selected.description : 'Резюме Симагомбетова Нартая — руководитель ИКТ-подразделения, 15+ лет в госсекторе РК, DevOps, DBA, ИБ';
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = description;
    const defaultAria = { nav: 'Основная навигация', scroll: 'Прокрутить вниз', top: 'Наверх', photo: 'Симагомбетов Нартай' };
    const aria = selected ? selected.aria : defaultAria;
    document.querySelector('#navbar').setAttribute('aria-label', aria.nav);
    document.querySelector('.hero__scroll').setAttribute('aria-label', aria.scroll);
    document.querySelector('#scrollTop').setAttribute('aria-label', aria.top);
    document.querySelector('.hero__photo img').setAttribute('alt', aria.photo);
    const currentLanguage = document.getElementById('currentLanguage');
    if (currentLanguage) currentLanguage.textContent = lang === 'kk' ? 'KZ' : lang.toUpperCase();
    document.querySelectorAll('.language-switcher__option').forEach(function (option) {
      const active = option.dataset.lang === lang;
      option.classList.toggle('active', active);
      option.setAttribute('aria-selected', String(active));
    });
    localStorage.setItem('language', lang);
    if (contentChanged) finalizeCounters();
    window.dispatchEvent(new CustomEvent('site-language-change', { detail: { language: lang } }));
  }

  function init() {
    collectOriginals();
    document.querySelectorAll('.language-switcher__option').forEach(function (option) {
      option.addEventListener('click', function () { applyLanguage(option.dataset.lang); });
    });
    applyLanguage(localStorage.getItem('language') || 'ru');
  }

  window.siteI18n = { init: init, applyLanguage: applyLanguage };
})();

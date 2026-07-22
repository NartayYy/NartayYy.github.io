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
        '.timeline__role': ['Цифрлық трансформация дирекциясының бас сарапшысы', 'Дерекқорларды сүйемелдеу бөлімінің бастығы', 'Бас маман — DBA / System Administrator', 'Бас маман — Lotus Domino DBA', 'Бизнес-талдаушы / Енгізу және тестілеу маманы', 'Енгізу және сүйемелдеу маманы'],
        '.timeline__list': [
          '<li>Production 24/7: TIZILIM ГАЖ-ды іске қосу және сүйемелдеу, Debian 12 жүйесіндегі 5 серверде uptime <span class="counter" data-target="99.9" data-decimals="1">0</span>%; сындарлы инциденттерді L2/L3 деңгейінде диагностикалау</li><li>Контейнерлік платформа: 10+ Docker контейнері (Laravel, Vue.js/React, Go, Redis, Meilisearch, pgAdmin), Docker Compose, volumes және persistent storage</li><li>Контейнерлік желі: микросервистердің тұрақты өзара әрекеттесуі үшін Docker networks пен MTU баптау және инфрақұрылымды көлденең масштабтауға дайындау</li><li>Жүктемені теңгеру және маршруттау: Nginx — L7 load balancer, reverse proxy және 6+ доменге SSL termination; Laravel, Vue.js/React және Go/WebSocket үшін routing rules және upstream</li><li>Қауіпсіздік: автоматты жаңартылатын Let\'s Encrypt сертификаттары, firewall rules, network segmentation және production сервистеріне қолжетімділікті басқару</li><li>Observability: Prometheus, Grafana, Loki, Alertmanager және Zabbix; 14 ереже, Telegram хабарламалары және инциденттерді 2 минутқа дейін анықтау; Nginx, Laravel және cron логтарын талдау және ротациялау</li><li>Деректер және іздеу: PostgreSQL 16.6, pg_hba.conf, slow queries, Redis 7.4 және Meilisearch 1.8; ДҚ жауап беру уақытын <span class="counter" data-target="40" data-decimals="0">0</span>% қысқарту</li><li>Автоматтандыру және релиздер: Ansible (playbooks, roles, inventory), release_3.6.23 өрістету, dev.qazindustry.gov.kz ортасын клондау және баптау</li><li>Цифрлық сервистер: Wildcard SSL *.tizilim.gov.kz және Ubuntu 22.04 жүйесіндегі files.tizilim.gov.kz — құжаттарды жүктеу, сақтау, индекстеу және толықмәтінді іздеу</li><li>AI және команда: ҚР Өнеркәсіп министрлігіне арналған iDos әзірлеу (Python, Aiogram, MongoDB, ChromaDB, OpenAI, GLPI), 3 инженерді үйлестіру</li>',
          '<li>Бөлімді <span class="counter" data-target="5.5" data-decimals="1">0</span> жыл басқару: жоспарлау, бақылау және есептілік — жоспардың 100% орындалуы</li><li>Сындарлы инфрақұрылым: ЦБДАН (<span class="counter" data-target="100" data-decimals="0" data-suffix="M+">0</span> абоненттік нөмір) және БДИК (ҚР IMEI тізілімі) — 5 жылда деректер жоғалтуы 0</li><li>Пайдалану: ЦБДАН, БДИК және оларға тартылған серверлік жабдықты мониторингтеу, жүйелік әкімшілендіру және сүйемелдеу</li><li>Басқарушылық аналитика: деректерді тұрақты жинау және талдау, тұрақты есептілікті автоматтандыру және тізілімдердің негізгі статистикалық көрсеткіштерін анықтау</li><li>Деректер қоймасы: DWH-ты нөлден құру (ETL, басқарушылық есептілік) — талдаушылардың қол еңбегін <span class="counter" data-target="70" data-decimals="0">0</span>% қысқарту</li><li>Аналитика және сапа: есептер мен ДҚ-ны тестілеу, ҚР ЦДИАӨМ реттеушілік шешімдері үшін ЦБДАН/БДИК деректері мен статистикасын қалыптастыру</li><li>Ақпараттық қауіпсіздік: жедел және жинақталған деректердің өзектілігі мен тұтастығы, тізілімдерді рұқсатсыз қол жеткізуден қорғау</li><li>НҚА және бақылау: нормативтік және жергілікті актілерді, жоспарлар мен есептілікті әзірлеуге қатысу; серверлік және кросстық бөлмелерді тексеру</li>',
          '<li>Windows Server 2008 R2 және Lotus Domino v9.0 әкімшілендіру, Lotus стандартты қолданбаларының өнімділігін талдау және баптау</li><li>Дерекқорларды резервтік көшіру және қалпына келтіру, резервтік көшірмелерді бақылау қалпына келтіруімен тұрақты тексеру</li><li>Серверлік жабдықты, жүйелер мен қолданбалар өнімділігін мониторингтеу; ақауларды жедел жою және өтінімдерді орындау</li><li>IAM және қолдау: қолжетімділікті беру, шектеу және қайтарып алу, пайдаланушылар мәртебесін бақылау, клиенттерді сүйемелдеу және лицензияларды бақылау</li><li>Техникалық құжаттаманы дайындау және ішкі әрі сыртқы клиенттермен жұмыс кезінде туындайтын мәселелерді жедел шешу</li><li>ARIS/SAP: ARIS for SAP Solutions жүйесінде мақсатты бизнес-процесс сызбаларын әзірлеу, жұмыс тобына кеңес беру және оқыту</li>',
          '<li>Lotus Domino серверлерінің тапсырмаларын мониторингтеу, ДҚ резервтік көшіру және тіркеу нөмірлері шаблондарын, номенклатура мен ұйымдық құрылымды баптау</li><li>Пайдаланушы әрекеттері журналдарын талдау, бұғаттаулар мен репликация қателерін жою, есептегіштерді, жүйені және интерфейсті баптау</li><li>5+ мемлекеттік орган серверіндегі ДҚ-ны пайдалану: қате жойылған жобаларды қалпына келтіру, телнұсқаларды жою және пайдаланушыларға кеңес беру</li><li>Ведомстволық модульдер мен АЖ клиенттік жұмыс орындарын сүйемелдеу, өтініштерді маршруттауды және ілеспе хат үлгілерін баптау</li><li>Бақылау құжаттары, қызметтік құпия материалдар, өтініштер, НҚА және мемлекеттік органдар тапсырмалары бойынша арнайы есептер әзірлеу</li>',
          '<li>«Ұлттық медициналық холдинг» АҚ қызметкерлерін «ГИС» медициналық ақпараттық жүйесімен жұмыс істеуге оқыту</li><li>Толық циклді бизнес-талдауда 3 жылға жуық тәжірибе: тапсырыс берушінің процестерін зерделеу, талаптарды формализациялау және пайдаланушы міндеттерін әзірлеушілерге түсінікті спецификацияларға айналдыру</li><li>Функционалдық тестілеу: қателер мен ақауларды іздеу, жүйені кейін жетілдіру үшін штаттық және штаттан тыс сценарийлерді модельдеу</li><li>Талаптар спецификацияларын, тестілеу сценарийлері мен жоспарларын, пайдаланушы нұсқаулықтарын және енгізу құжаттамасын әзірлеу</li><li>МАЖ-ды 5 медициналық мекемеде енгізу, соның ішінде Республикалық нейрохирургия ғылыми орталығы, Оңалту диагностикалық орталығы және Ана мен бала ғылыми орталығы</li>',
          '<li>Объектіге бағытталған жобалау, C++ тілінде әзірлеу және тапсырыс берушілерге шот ұсыну жүйесін енгізуді сүйемелдеу</li><li>Жұмыс орындарын дайындау, БҚ тексеру, пайдаланушыларға кеңес беру, анықтамалық деректерді контент-серверлерге жүктеу және анықтамалық құжаттама жасау</li><li>Табиғи монополиялар қызметін мониторингтеу АЖ-ны республика бойынша сәтті өрістету және тәжірибелік пайдалануға енгізу</li><li>Функционалдық тестілеу: қателерді модельдеу, тест-жоспарларды, тестілік деректерді және пайдаланушы құжаттамасын дайындау</li>'
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
        '.timeline__role': ['Chief Expert, Digital Transformation Directorate', 'Head of Database Support Department', 'Chief Specialist — DBA / System Administrator', 'Chief Specialist — Lotus Domino DBA', 'Business Analyst / Implementation and QA Specialist', 'Implementation and Support Specialist'],
        '.timeline__list': [
          '<li>Production 24/7: launched and operated TIZILIM with <span class="counter" data-target="99.9" data-decimals="1">0</span>% uptime across five Debian 12 servers; diagnosed critical incidents at L2/L3</li><li>Container platform: managed 10+ Docker containers (Laravel, Vue.js/React, Go, Redis, Meilisearch and pgAdmin), Docker Compose, volumes and persistent storage</li><li>Container networking: configured Docker networks and MTU for stable microservice communication and prepared the infrastructure for horizontal scaling</li><li>Load balancing and routing: configured Nginx as an L7 load balancer, reverse proxy and SSL termination point for 6+ domains, with routing rules and upstreams for Laravel, Vue.js/React and Go/WebSocket</li><li>Security: managed auto-renewing Let\'s Encrypt certificates, firewall rules, network segmentation and access control for production services</li><li>Observability: Prometheus, Grafana, Loki, Alertmanager and Zabbix; 14 rules, Telegram alerts and sub-two-minute incident detection; analysed and rotated Nginx, Laravel and cron logs</li><li>Data and search: PostgreSQL 16.6, pg_hba.conf, slow-query troubleshooting, Redis 7.4 and Meilisearch 1.8; reduced database response time by <span class="counter" data-target="40" data-decimals="0">0</span>%</li><li>Automation and releases: Ansible playbooks, roles and inventory; deployed release_3.6.23 and cloned and configured dev.qazindustry.gov.kz</li><li>Digital services: managed Wildcard SSL for *.tizilim.gov.kz and delivered files.tizilim.gov.kz on Ubuntu 22.04 for document upload, storage, indexing and full-text search</li><li>AI and team: built iDos for Kazakhstan’s Ministry of Industry with Python, Aiogram, MongoDB, ChromaDB, OpenAI and GLPI, and coordinated three engineers</li>',
          '<li>Led the department for <span class="counter" data-target="5.5" data-decimals="1">0</span> years, managing planning, control and reporting with 100% plan completion</li><li>Critical infrastructure: operated CBDAN (<span class="counter" data-target="100" data-decimals="0" data-suffix="M+">0</span> subscriber numbers) and BDIK (Kazakhstan’s IMEI registry) with zero data loss over five years</li><li>Operations: monitored, system-administered and supported CBDAN, BDIK and the server equipment used by both systems</li><li>Management analytics: continuously collected and analysed data, automated recurring reporting and defined the registries’ key statistical indicators</li><li>Data warehouse: built a DWH from scratch for ETL and management reporting, reducing analysts’ manual work by <span class="counter" data-target="70" data-decimals="0">0</span>%</li><li>Analytics and quality: tested reports and databases and produced CBDAN/BDIK data and statistics for regulatory decisions by Kazakhstan’s digital-development ministry</li><li>Information security: maintained the relevance and integrity of operational and accumulated data and protected registries against unauthorised access</li><li>Regulation and control: contributed to regulations, internal acts, plans and reporting, and inspected server and cross-connect rooms</li>',
          '<li>Administered Windows Server 2008 R2 and Lotus Domino v9.0 and analysed and tuned the performance of standard Lotus applications</li><li>Backed up and restored databases and regularly verified backups through test recovery</li><li>Monitored server hardware and system and application performance, resolved incidents promptly and handled service requests</li><li>IAM and support: granted, restricted and revoked access, tracked user status, supported clients and monitored licence usage</li><li>Prepared technical documentation and resolved issues arising in work with internal and external clients</li><li>ARIS/SAP: designed target business-process models in ARIS for SAP Solutions and advised and trained the working group</li>',
          '<li>Monitored Lotus Domino server tasks, backed up databases and configured registration-number templates, nomenclature and organisational structures</li><li>Analysed user activity logs, resolved locks and replication errors, and configured counters, the system and its interface</li><li>Operated databases on servers for 5+ government agencies, recovered mistakenly deleted projects, removed duplicates and advised users</li><li>Supported departmental modules and IS client workstations and configured request routing and cover-letter templates</li><li>Built specialist reports for controlled documents, restricted materials, requests, regulations and government assignments</li>',
          '<li>Trained employees of the National Medical Holding to use the GIS medical information system</li><li>Nearly three years of full-cycle business analysis: studied customer processes, formalised requirements and translated user needs into specifications developers could act on</li><li>Performed functional testing, found defects and failures, and modelled normal and exception scenarios for subsequent system improvements</li><li>Produced requirements specifications, test scenarios and plans, user guides and implementation documentation</li><li>Implemented the medical information system in five healthcare institutions, including the National Center for Neurosurgery, the Rehabilitation Diagnostic Center and the Research Center for Maternal and Child Health</li>',
          '<li>Performed object-oriented design and C++ development and supported implementation of a customer billing system</li><li>Prepared workstations, verified software, advised users, loaded reference data to content servers and created support documentation</li><li>Successfully deployed a natural-monopoly activity monitoring system nationwide and brought it into pilot operation</li><li>Performed functional testing, modelled failures and prepared test plans, test data and user documentation</li>'
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

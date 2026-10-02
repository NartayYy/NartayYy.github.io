(function () {
  'use strict';

  const selectors = [
    '.skip-link', '.navbar__link', '.location-text', '.hero__eyebrow', '.hero__name',
    '.hero__position', '.hero__tagline', '.download-label', '.experience-label',
    '.section__title', '.about__content p', '.card__title', '.card__text',
    '.timeline__date', '.timeline__company', '.timeline__role', '.timeline__list',
    '.education__title', '.education__detail', '.techstack__category',
    '.language__name', '.language__level', '.footer__title', '.footer__copy'
  ];

  const copy = window.siteContent;

  const originals = {};
  let renderedLanguage = null;

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

/* Site language selection. Static pages also work without JavaScript. */
(() => {
  'use strict';
  const storageKey = 'prefs-site-language';
  const choices = [...document.querySelectorAll('.language-switcher [data-language]')];
  if (!choices.length) return;
  const current = document.documentElement.lang;
  const requested = new URL(location.href).searchParams.get('lang');
  const supported = ['pt-BR', 'en-US'];
  let selected = supported.includes(requested) ? requested : null;
  try {
    if (selected) localStorage.setItem(storageKey, selected);
    else selected = localStorage.getItem(storageKey);
  } catch (_) { /* Language links work even when storage is unavailable. */ }
  const destination = choices.find(link => link.dataset.language === selected);
  if (destination && selected !== current) {
    const url = new URL(destination.href);
    url.hash = location.hash;
    location.replace(url.href);
    return;
  }
  choices.forEach(link => {
    // Explicit language links take priority over a previously saved choice.
    link.addEventListener('click', () => {
      try { localStorage.setItem(storageKey, link.dataset.language); }
      catch (_) { /* The destination URL still carries the chosen language. */ }
    });
  });
  // Keep the selected language explicit on internal page navigation.
  document.querySelectorAll('a[href]').forEach(link => {
    const raw = link.getAttribute('href');
    if (raw.startsWith('#') || link.hasAttribute('download') || link.dataset.language) return;
    const url = new URL(link.href);
    if (url.origin === location.origin && /(?:index(?:-en)?|declaracao-acessibilidade|accessibility-statement)\.html$/.test(url.pathname)) {
      url.searchParams.set('lang', current);
      link.href = url.href;
    }
  });
})();

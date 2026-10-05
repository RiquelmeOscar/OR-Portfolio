const SUPPORTED_LANGS = ['es', 'en'];
const DEFAULT_LANG = 'es';
const STORAGE_KEY = 'lang';

function flatten(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') flatten(value, path, result);
    else result[path] = value;
  }
  return result;
}

const MESSAGES = Object.fromEntries(
  Object.entries(TRANSLATIONS).map(([lang, dict]) => [lang, flatten(dict)])
);

function getStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGS.includes(stored) ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
  const dict = MESSAGES[lang];

  document.documentElement.lang = lang;
  document.title = dict['meta.title'];
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', dict['meta.description']);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key in dict) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (key in dict) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (key in dict) el.setAttribute('aria-label', dict[key]);
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  setLang(getStoredLang());
});

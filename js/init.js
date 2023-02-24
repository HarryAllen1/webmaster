const styles = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
];
const scripts = [
  'https://cdn.jsdelivr.net/npm/@unocss/runtime/attributify.global.js',
  'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
];

styles.forEach((url) => {
  const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.href = url;
  document.head.append(el);
});

scripts.forEach((url) => {
  const el = document.createElement('script');
  scripts.src = url;
  document.body.append(el);
});

await import('./navbar.js');

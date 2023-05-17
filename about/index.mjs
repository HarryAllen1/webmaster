import { createApp } from '../deps.mjs';

const app = createApp({});
app.mount('#main');
document.addEventListener('page-change', app.unmount);

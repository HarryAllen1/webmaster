const navbarTemplate = await (await fetch('/templates/navbar.html')).text();

document.body.innerHTML = navbarTemplate + document.body.innerHTML;

/** @type {HTMLDivElement} */
const loader = document.querySelector('#loader');

const fadeOut = () => {
  if (loader.style.opacity <= 0) {
    loader.remove();
  } else {
    loader.style.opacity -= 0.1;
    requestAnimationFrame(fadeOut);
  }
};

fadeOut();

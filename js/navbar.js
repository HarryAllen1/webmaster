const navbarTemplate = await (await fetch('/templates/navbar.html')).text();

document.body.innerHTML = navbarTemplate + document.body.innerHTML;

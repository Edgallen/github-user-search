const body = document.getElementsByTagName('body');
const lightTheme = document.querySelector('.header__theme-light');
const darkTheme = document.querySelector('.header__theme-dark');

// Windows
const closeWindow = (element, delay) => {
  element.classList.add('opacity-hidden');

  setTimeout(() => element.classList.add('display-none'), delay);
};

const openWindow = (element, displayDelay, opacityDelay) => {
  setTimeout(() => element.classList.remove('display-none'), displayDelay);

  setTimeout(() => element.classList.remove('opacity-hidden'), opacityDelay);
};

// Event Listener
function toggleTheme() {

  if (body[0].classList.contains('light__theme')) {
    body[0].classList.toggle('light__theme');

    closeWindow(darkTheme, 0);
    openWindow(lightTheme, 100, 105);
  } else {
    body[0].classList.toggle('light__theme');

    closeWindow(lightTheme, 0);
    openWindow(darkTheme, 100, 105);
  }
};

export {toggleTheme};
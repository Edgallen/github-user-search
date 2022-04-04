const html = document.getElementsByTagName('html');

// Body 'transition - none' when page is loaded
function preloader() {
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      html[0].classList.remove('preload');
    }
  };
}

export {preloader};
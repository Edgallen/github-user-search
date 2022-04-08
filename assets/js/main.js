import {preloader} from './preload.js';
import {toggleTheme} from './themeChanger.js';
import {userSearch} from './userSearch.js'

/*=============== CHECK IF PAGE LOADED ===============*/ 
preloader();

/*=============== COLOR THEME CHANGE ===============*/ 
const themeSelector = document.querySelectorAll('.theme__selector');

themeSelector.forEach(button => {
  button.addEventListener('click', toggleTheme);
})

/*=============== USER SEARCH ===============*/
const inputField = document.querySelector('.searchbar__textfield');
const searchButton = document.querySelector('.searchbar__button');

searchButton.addEventListener('click', () => {
  userSearch(inputField.value);
});
import template from './lang-buttons.html';
import './lang-buttons.scss';

export default class LangSelect {
  constructor() {
    this.element = null;
    this.button = null;
    this.select = null;
  }

  init() {
    const container = document.createElement('div');
    container.innerHTML = template;
    this.element = container.querySelector('.lang');
    this.button = container.querySelector('.lang__button');
    this.select = container.querySelector('.lang-select');
    this.options = this.select.querySelectorAll('.lang-select__option');
    this.arrow = container.querySelector('.lang__arrow');
  }

  getElement() {
    return this.element;
  }

  setLang(lang) {
    this.button.querySelector('.lang__text').textContent = lang;
  }

  setActiveOption(option) {
    const activeOption = document.querySelector('.lang-select__option--active');
    if (activeOption) {
      activeOption.classList.remove('lang-select__option--active');
    }
    option.classList.add('lang-select__option--active');
  }

  toggleActiveButton() {
    this.button.classList.toggle('lang__button--active');
    this.arrow.classList.toggle('lang__arrow--active');
  }

  toggleActiveSelect() {
    this.select.classList.toggle('lang-select--show');
  }
}

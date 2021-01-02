import Parametrs from './parametrs/parameters';
import template from './header.html';
import Search from './search/search';
import './header.scss';

export default class Header {
  constructor() {
    this.element = null;
    this.wrapper = null;
    this.parameters = new Parametrs();
    this.search = new Search();
  }

  init() {
    const container = document.createElement('div');
    container.innerHTML = template;
    this.element = container.querySelector('.header-parameters');
    this.wrapper = this.element.querySelector('.wrapper');

    this.parameters.init();
    this.search.init();

    this.wrapper.append(
      this.parameters.getElement(),
      this.search.getElement(),
    );
  }

  getElement() {
    return this.element;
  }
}

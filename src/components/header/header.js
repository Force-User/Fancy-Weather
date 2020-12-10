import Parametrs from "./parametrs/parameters";
import template from "./header.html";
import "./header.scss";
import Search from "./search/search";

export default class Header {
    constructor() {
        this.element    = null;
        this.parameters = new Parametrs();
        this.search     = new Search();
    }

    init() {
        const container     = document.createElement('div');
        container.innerHTML = template;
        this.element        = container.querySelector('.header-parameters');

        this.parameters.init();
        this.search.init();

        this.element.append(
            this.parameters.getElement(),
            this.search.getElement(),
            )
    }

    getElement() {
        return this.element;
    }
}
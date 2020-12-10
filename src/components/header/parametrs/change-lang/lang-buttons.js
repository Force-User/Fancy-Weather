import template from "./lang-buttons.html";
import "./lang-buttons.scss";

export default class LangSelect {
    constructor() {
        this.element = null;
        this.button  = null;
        this.select  = null;
    }

    init() {
        const container     = document.createElement("div");
        container.innerHTML = template;
        this.element        = container.querySelector(".lang");
        this.button         = container.querySelector('.lang__button');
        this.select         = container.querySelector('.lang-select');
    }

    getElement() {
        return this.element;
    }

    toggleActiveButton() {
        this.button.classList.toggle("lang__button--active");
    }
    toggleActiveSelect() {
        this.select.classList.toggle("lang-select--show");
    }
}
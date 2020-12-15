import template from "./search.html";
import "./search.scss";

export default class Search {
    constructor() {
        this.element     = null;
        this.button      = null;
        this.searchArea  = null;
        this.searchInput = null;
    }


    init() {
        const container     = document.createElement("div");
        container.innerHTML = template;
        this.element        = container.querySelector(".search-form");
        this.button         = this.element.querySelector('.search__button');
        this.searchArea     = this.element.querySelector('.search-area');
        this.searchInput     = this.element.querySelector('.search__input');

    
    }

    getElement() {
        return this.element;
    }
    getValueSearch() {
        return this.searchInput.value.toLowerCase();
    }

    
}
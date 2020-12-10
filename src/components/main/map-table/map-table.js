import template from "./map-table.html";
import "./map-table.scss";

export default class MapTable {
    constructor() {
        this.element = null;
        this.map     = null;
        this.locate  = null;
    }

    init() {
        const container     = document.createElement('div');
        container.innerHTML = template;
        this.element        = container.querySelector('.map-table');
    }

    getElement() {
        return this.element;
    }
}
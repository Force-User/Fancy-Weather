import template from "./unit-temperature.html";
import "./unit-temperature.scss";

export default class TemperatureButtons {
    constructor() {
        this.element = null;
    }

    init() {
        const container     = document.createElement("div");
        container.innerHTML = template;
        this.element        = container.querySelector('.temperature');
    }

    getElement() {
        return this.element;
    }

    
}
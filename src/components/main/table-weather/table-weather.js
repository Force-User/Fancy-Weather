import template from "./table-weather.html";
import "./table-weather.scss";

export default class TableWeather {
    constructor (){
        this.element = null;
    }

    init() {
        const container     = document.createElement("div");
        container.innerHTML = template;
        this.element        = container.querySelector(".table-weather");
    }
    getElement() {
        return this.element;
    }
}
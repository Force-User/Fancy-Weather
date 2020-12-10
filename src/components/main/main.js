import template from "./main.html";
import "./main.scss";
import TableWeather from "./table-weather/table-weather";
import MapTable from "./map-table/map-table";

export default class Main {
    constructor() {
        this.element            = null;
        this.tableWeather       = new TableWeather();
        this.mapTable           = new MapTable();
        this.locate             = null;
        this.date               = null;
        this.currentTemperature = null;
        this.currentWaterImage  = null;
    }

    init() {
        const container     = document.createElement('div');
        container.innerHTML = template;
        this.element = container.querySelector('.main-area');

        this.tableWeather.init();
        this.mapTable.init();

        this.element.append(
            this.tableWeather.getElement(),
            this.mapTable.getElement()
            );
    }

    getElement() {
        return this.element;
    }
}
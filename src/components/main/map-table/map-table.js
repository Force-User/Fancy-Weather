import template from "./map-table.html";
import "./map-table.scss";

export default class MapTable {
    constructor() {
        this.element = null;
        this.map     = null;
        this.locate  = null;
        this.map     = null;
        this.lng     = null;
        this.lat     = null;
    }

    init() {
        const container     = document.createElement('div');
        container.innerHTML = template;
        this.element        = container.querySelector('.map-table');
        this.lng            = this.element.querySelector(".lng");
        this.lat            = this.element.querySelector(".lat");
    }

    getLng() {
        return this.lng;
    }

    getLat() {
        return this.lat;
    }

    getElement() {
        return this.element;
    }

    setLocate(lng, lat) {
        this.lng.textContent = lng;
        this.lat.textContent = lat
    }

    createMap(lng, lat) {
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [lng, lat], // starting position [lng, lat]
            zoom: 10 // starting zoom
        })
    }
}
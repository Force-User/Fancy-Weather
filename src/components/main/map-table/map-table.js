import template from './map-table.html';
import './map-table.scss';

export default class MapTable {
  constructor() {
    this.element = null;
    this.map = null;
    this.locate = null;
    this.map = null;
    this.lng = null;
    this.lat = null;
    this.coordinatesLang = {
      EN: {
        lat: 'Latitude',
        lng: 'Longitude',
      },
      RU: {
        lat: 'Широта',
        lng: 'Долгота',
      },
      BE: {
        lat: 'Шырата',
        lng: 'Даўгата',
      },
    };
  }

  init() {
    const container = document.createElement('div');
    container.innerHTML = template;
    this.element = container.querySelector('.map-table');
    this.lng = this.element.querySelector('.lng');
    this.lat = this.element.querySelector('.lat');
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

  setCoordinates(lat, lng, lang) {
    if (String(lat).includes('.')) {
      const latDeg = String(lat).split('.')[0];
      const latMin = String(lat).split('.')[1].slice(0, 2);
      this.lat.textContent = `${this.coordinatesLang[lang].lat} : ${latDeg}°${latMin}'`;
    } else {
      this.lat.textContent = `${this.coordinatesLang[lang].lat} : ${String(
        lat,
      )}°`;
    }

    if (String(lng).includes('.')) {
      const lngDeg = String(lng).split('.')[0];
      const lngMin = String(lng).split('.')[1].slice(0, 2);
      this.lng.textContent = `${this.coordinatesLang[lang].lng} : ${lngDeg}°${lngMin}'`;
    } else {
      this.lng.textContent = `${this.coordinatesLang[lang].lng} : ${String(
        lng,
      )}°`;
    }
  }

  createMap(lat, lng) {
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
  }
}

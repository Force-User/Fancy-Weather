import template from "./table-weather.html";
import "./table-weather.scss";

export default class TableWeather {
  constructor() {
    this.element       = null;
    this.currenttDate  = null;
    this.time          = null;
    this.currentLocate = null;
    this.objLang       = {
      RU: {
        0: "Погода",
        1: "Ощущается как",
        2: "Ветер",
        3: "Влажность",
        4: "Температура",
      },
      EN: {
        0: "Weather",
        1: "Feels like",
        2: "Wind",
        3: "Humidity",
        4: "Temperature",
      },
      BE: {
        0: "Надвор'е",
        1: "Адчуваецца як",
        2: "Вецер",
        3: "Вільготнасць",
        4: "Тэмпература",
      },
    };
  }

  init() {
    const container             = document.createElement("div");
    container.innerHTML         = template;
    this.element                = container.querySelector(".table-weather");
    this.locate                 = container.querySelector(".table-weather-head__locate");
    this.temperatureToday       = container.querySelector(".weather-today__temperature");
    this.currentDate            = container.querySelector(".table-weather-head__date");
    this.toDayImage             = container.querySelector(".weather-info__image");
    this.weatherToDay           = container.querySelector(".item-weather");
    this.weatherToDayInfo       = container.querySelector(".item-weather-info");
    this.feelsLike              = container.querySelector(".item-feels-like");
    this.feelsLikeInfo          = container.querySelector(".item-feels-like-info");
    this.wind                   = container.querySelector(".item-wind");
    this.windInfo               = container.querySelector(".item-wind-info");
    this.humidity               = container.querySelector(".item-humidity");
    this.humidityInfo           = container.querySelector(".item-humidity-info");
    this.firstDay               = container.querySelector('[data-day="first"]');
    this.firstDayName           = this.firstDay.querySelector(".forecast-next-day__name");
    this.temperatureOnFirstDay  = this.firstDay.querySelector(".weather-next-day__temperature");
    this.imageFirstDay          = this.firstDay.querySelector(".weather-next-day__img");
    this.secondDay              = container.querySelector('[data-day="second"]');
    this.secondDayName          = this.secondDay.querySelector(".forecast-next-day__name");
    this.temperatureOnSecondDay = this.secondDay.querySelector(".weather-next-day__temperature");
    this.imageSecondDay         = this.secondDay.querySelector(".weather-next-day__img");
    this.thirdDay               = container.querySelector('[data-day="third"]');
    this.thirdDayName           = this.thirdDay.querySelector(".forecast-next-day__name");
    this.temperatureOnThirdDay  = this.thirdDay.querySelector(".weather-next-day__temperature");
    this.imageThirdDay          = this.thirdDay.querySelector(".weather-next-day__img");
    this.ticker                 = container.querySelector(".ticker-content");
  }

  getElement() {
    return this.element;
  }

  getTemperatureToday() {
    return this.temperatureToday;
  }

  getFeelsLike() {
    return parseInt(this.feelsLikeInfo.textContent.split(":")[1]);
  }

  setTemperatureToday(temperature) {
    this.temperatureToday.textContent = `${parseInt(temperature)}`;
  }

  setLocateForDate(city, country) {
    if (city.split("").find((item) => item === " ")) {
      city = city.split(" ").join("_");
    }
    if (country.split("").find((item) => item === " ")) {
      country = country.split(" ").join("_");
    }
    return `${country}/${city}`;
  }

  setTemperatureOnFirstDay(temperature) {
    this.temperatureOnFirstDay.textContent = `${parseInt(temperature)}`;
  }

  setTemperatureOnSecondDay(temperature) {
    this.temperatureOnSecondDay.textContent = `${parseInt(temperature)}`;
  }

  setTemperatureOnThirdDay(temperature) {
    this.temperatureOnThirdDay.textContent = `${parseInt(temperature)}`;
  }

  setWeatherInfoToDay(weather, temperature, wind, humidity, lang) {
    this.weatherToDayInfo.textContent = ` : ${weather}`;
    this.feelsLikeInfo.textContent = ` : ${parseInt(temperature)}`;
    this.windInfo.textContent = ` : ${wind} m/s`;
    this.humidityInfo.textContent = ` : ${humidity}%`;

    this.weatherToDay.textContent = this.objLang[lang][0];
    this.feelsLike.textContent = this.objLang[lang][1];
    this.wind.textContent = this.objLang[lang][2];
    this.humidity.textContent = this.objLang[lang][3];
  }

  setFeelsLike(temperature) {
    this.feelsLikeInfo.textContent = ` : ${temperature}`;
  }

  setLocate(city, country) {
    this.locate.innerHTML = `${city},<br>${country}`;
  }
  setDate(lang, timezone) {
    this.time = setInterval(() => {
      const moment = require("moment-timezone");
      moment.locale(`${lang.toLowerCase()}`);

      this.currentDate.textContent = moment
        .tz(timezone)
        .format("dd DD MMM , hh:mm:ss");

      this.firstDayName.textContent = moment
        .tz(timezone)
        .day((moment.tz(timezone).day() + 1) % 7)
        .format("dddd");
      this.secondDayName.textContent = moment
        .tz(timezone)
        .day((moment.tz(timezone).day() + 2) % 7)
        .format("dddd");
      this.thirdDayName.textContent = moment
        .tz(timezone)
        .day((moment.tz(timezone).day() + 3) % 7)
        .format("dddd");
    }, 1000);
  }

  convertTemperature(unit) {
    if (unit === "F") {
      this.temperatureToday.textContent = parseInt(
        (this.temperatureToday.textContent * 9) / 5 + 32
      );
      this.temperatureOnFirstDay.textContent = parseInt(
        (this.temperatureOnFirstDay.textContent * 9) / 5 + 32
      );
      this.temperatureOnSecondDay.textContent = parseInt(
        (this.temperatureOnSecondDay.textContent * 9) / 5 + 32
      );
      this.temperatureOnThirdDay.textContent = parseInt(
        (this.temperatureOnThirdDay.textContent * 9) / 5 + 32
      );
      this.setFeelsLike(parseInt((this.getFeelsLike() * 9) / 5 + 32));
    } else if (unit === "C") {
      this.temperatureToday.textContent = parseInt(
        ((this.temperatureToday.textContent - 32) * 5) / 9
      );
      this.temperatureOnFirstDay.textContent = parseInt(
        ((this.temperatureOnFirstDay.textContent - 32) * 5) / 9
      );
      this.temperatureOnSecondDay.textContent = parseInt(
        ((this.temperatureOnSecondDay.textContent - 32) * 5) / 9
      );
      this.temperatureOnThirdDay.textContent = parseInt(
        ((this.temperatureOnThirdDay.textContent - 32) * 5) / 9
      );
      this.setFeelsLike(parseInt(((this.getFeelsLike() - 32) * 5) / 9));
    }
  }

  convertTemperatureToTicker(unit) {
    const allTemperature = document.querySelectorAll('[data-name="ticker-temperature"]');
    const allFeels       = document.querySelectorAll('[data-name="ticker-feels"]');
   
        
    for(let i = 0; i < allFeels.length; i ++) {
      const indexTemp  = allTemperature[i].textContent.indexOf(":");   
      const indexFeels = allFeels[i].textContent.indexOf(":");     
      
      const tempValue  = parseInt(allTemperature[i].textContent.split(":")[1]);
      const feelsValue = parseInt(allFeels[i].textContent.split(":")[1]);

      if (unit === "F") {
        allTemperature[i].textContent = `${allTemperature[i].textContent.substring(0,indexTemp + 1)} ${parseInt((tempValue * 9) / 5 + 32)}°`;
        allFeels[i].textContent       = `${allFeels[i].textContent.substring(0,indexFeels + 1)} ${parseInt((feelsValue * 9) / 5 + 32)}°`;
      }else{
        allTemperature[i].textContent = `${allTemperature[i].textContent.substring(0, indexTemp + 1)} ${parseInt(((tempValue - 32) * 5) / 9)}°`;
        allFeels[i].textContent       = `${allFeels[i].textContent.substring(0,indexFeels + 1)} ${parseInt(((feelsValue - 32) * 5) / 9)}°`;
      }
    }
  }

  clearLocate() {
    this.locate.textContent = "";
  }

  clearTime() {
    clearInterval(this.time);
  }

  drawWeatherImage(main, element) {
    switch (main) {
      case "Clear":
        element.innerHTML = `<svg
            class="sun"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 22.006 22.006"
            style="enable-background: new 0 0 22.006 22.006"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  style="fill: #ffffff"
                  d="M4.63,6.045c0.394,0.393,1.028,0.399,1.421,0.006c0.39-0.39,0.393-1.021-0.007-1.421l-1.4-1.4
              C4.249,2.835,3.617,2.829,3.223,3.223c-0.391,0.39-0.394,1.02,0.007,1.421L4.63,6.045z"
                />
                <path
                  style="fill: #ffffff"
                  d="M20.997,10.003h-1.98c-0.559,0-1.011,0.444-1.011,1c0,0.553,0.443,1,1.011,1h1.98
              c0.559,0,1.009-0.443,1.009-1C22.006,10.451,21.562,10.003,20.997,10.003z"
                />
                <path
                  style="fill: #ffffff"
                  d="M4,11.003c0-0.552-0.444-1-1.01-1H1.009c-0.558,0-1.009,0.444-1.009,1c0,0.553,0.443,1,1.009,1
              H2.99C3.548,12.003,4,11.56,4,11.003z"
                />
                <path
                  class="none"
                  style="fill: #ffffff"
                  d="M11.003,5c-3.313,0-6,2.687-6,6s2.687,6,6,6c3.312,0,6-2.687,6-6S14.315,5,11.003,5z M11.003,15
              c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S13.212,15,11.003,15z"
                />
                <path
                  style="fill: #ffffff"
                  d="M4.63,15.962l-1.4,1.4c-0.395,0.395-0.401,1.027-0.007,1.421c0.391,0.39,1.021,0.393,1.421-0.007
              l1.4-1.4c0.395-0.395,0.401-1.027,0.007-1.421C5.66,15.563,5.03,15.562,4.63,15.962z"
                />
                <path
                  style="fill: #ffffff"
                  d="M17.376,6.045l1.4-1.401c0.395-0.395,0.399-1.027,0.007-1.421c-0.392-0.39-1.021-0.393-1.421,0.007
              l-1.4,1.4c-0.395,0.395-0.4,1.028-0.007,1.421C16.347,6.441,16.976,6.444,17.376,6.045z"
                />
                <path
                  style="fill: #ffffff"
                  d="M11.003,18.006c-0.553,0-1,0.444-1,1.011v1.98c0,0.559,0.444,1.009,1,1.009
              c0.553,0,1-0.442,1-1.009v-1.98C12.003,18.458,11.56,18.006,11.003,18.006z"
                />
                <path
                  style="fill: #ffffff"
                  d="M17.376,15.962c-0.395-0.395-1.027-0.4-1.421-0.007c-0.39,0.392-0.394,1.021,0.007,1.421l1.4,1.4
              c0.395,0.395,1.027,0.399,1.421,0.007c0.391-0.39,0.394-1.021-0.007-1.421L17.376,15.962z"
                />
                <path
                  style="fill: #ffffff"
                  d="M11.003,4c0.553,0,1-0.443,1-1.01V1.01c0-0.558-0.443-1.01-1-1.01c-0.553,0-1,0.444-1,1.01v1.98
              C10.003,3.548,10.447,4,11.003,4z"
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
       `;

        break;
      case "Thunderstorm":
        element.innerHTML = `<svg class="thunder" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
     <g>
       <g>
         <polygon class="lightning" style="fill:#ffff00;" points="19,16.5 14.714,16.5 12,23.5 14.429,23.5 13,28.5 20,21.5 16.551,21.5 		"/>
         <path style="fill:#ffffff;" d="M27.586,11.712C26.66,9.251,24.284,7.5,21.5,7.5c-0.641,0-1.26,0.093-1.846,0.266
           C18.068,5.205,15.233,3.5,12,3.5c-4.904,0-8.894,3.924-8.998,8.803C1.207,13.342,0,15.283,0,17.5c0,3.312,2.688,6,6,6h3.8l0.8-2
           H5.997C3.794,21.5,2,19.709,2,17.5c0-1.892,1.317-3.482,3.087-3.896C5.029,13.245,5,12.876,5,12.5c0-3.866,3.134-7,7-7
           c3.162,0,5.834,2.097,6.702,4.975C19.471,9.864,20.441,9.5,21.5,9.5c2.316,0,4.225,1.75,4.473,4h0.03c2.203,0,3.997,1.791,3.997,4
           c0,2.205-1.789,4-3.997,4H23l-2,2h5c3.312,0,6-2.693,6-6C32,14.735,30.13,12.407,27.586,11.712z"/>
       </g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     </svg>
     `;
        break;
      case "Drizzle":
        element.innerHTML = `<svg
                class="drizzle"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 32 32"
                style="enable-background: new 0 0 32 32"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      class="drizzle-drop1"
                      style="fill: #ffffff"
                      d="M20,25.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.443,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C21,25.952,20.557,25.5,20,25.5z"
                    />
                    <path
                      class="drizzle-drop2"
                      style="fill: #ffffff"
                      d="M12,25.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.444,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C13,25.952,12.556,25.5,12,25.5z"
                    />
                    <path
                      class="drizzle-drop3"
                      style="fill: #ffffff"
                      d="M24,23.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.443,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C25,23.952,24.557,23.5,24,23.5z"
                    />
                    <path
                      class="drizzle-drop4"
                      style="fill: #ffffff"
                      d="M16,23.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.444,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C17,23.952,16.557,23.5,16,23.5z"
                    />
                    <path
                      class="drizzle-drop5"
                      style="fill: #ffffff"
                      d="M8,23.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.444,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C9,23.952,8.556,23.5,8,23.5z"
                    />
                    <path
                      style="fill: #ffffff"
                      d="M27.586,10.712C26.66,8.251,24.284,6.5,21.5,6.5c-0.641,0-1.26,0.093-1.846,0.266
                  C18.068,4.205,15.233,2.5,12,2.5c-4.904,0-8.894,3.924-8.998,8.803C1.207,12.342,0,14.283,0,16.5c0,3.312,2.687,6,6,6h20
                  c3.312,0,6-2.693,6-6C32,13.735,30.13,11.407,27.586,10.712z M26.003,20.5H5.997C3.794,20.5,2,18.709,2,16.5
                  c0-1.892,1.317-3.482,3.087-3.896C5.029,12.245,5,11.876,5,11.5c0-3.866,3.134-7,7-7c3.162,0,5.834,2.097,6.702,4.975
                  C19.471,8.864,20.441,8.5,21.5,8.5c2.316,0,4.225,1.75,4.473,4h0.03c2.203,0,3.997,1.791,3.997,4
                  C30,18.705,28.211,20.5,26.003,20.5z"
                    />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
           `;
        break;
      case "Snow":
        element.innerHTML = `
                <svg
		class="snow"
          id="Icons"
          style="enable-background: new 0 0 32 32"
          version="1.1"
          viewBox="0 0 32 32"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g>
			<path
              class="snow1"
              fill="#ffffff"
              d="M16.9,15.8l-0.5-2l2-0.5c0.5-0.1,0.9-0.7,0.7-1.2c-0.1-0.5-0.7-0.9-1.2-0.7l-2.5,0.7l-2.8-1.6l2.8-1.6l2.5,0.7   c0.1,0,0.2,0,0.3,0c0.4,0,0.8-0.3,1-0.7c0.1-0.5-0.2-1.1-0.7-1.2l-2-0.5l0.5-2c0.1-0.5-0.2-1.1-0.7-1.2c-0.5-0.1-1.1,0.2-1.2,0.7   l-0.7,2.5l-2.8,1.6V5.6l1.9-1.9c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-1.4,1.4L9.1,2.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l1.9,1.9v3.2   L6.7,7.2L6,4.6C5.9,4.1,5.4,3.8,4.8,3.9C4.3,4.1,4,4.6,4.1,5.2l0.5,2l-2,0.5C2.1,7.8,1.8,8.3,2,8.9c0.1,0.4,0.5,0.7,1,0.7   c0.1,0,0.2,0,0.3,0l2.5-0.7l2.8,1.6l-2.8,1.6l-2.5-0.7c-0.5-0.1-1.1,0.2-1.2,0.7s0.2,1.1,0.7,1.2l2,0.5l-0.5,2   c-0.1,0.5,0.2,1.1,0.7,1.2c0.1,0,0.2,0,0.3,0c0.4,0,0.8-0.3,1-0.7l0.7-2.5l2.8-1.6v3.2l-1.9,1.9c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0   l1.4-1.4l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4l-1.9-1.9v-3.2l2.8,1.6l0.7,2.5   c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0C16.7,16.9,17,16.4,16.9,15.8z"
            />
			<path
              class="snow2"
              fill="#ffffff"
              d="M28.7,23.6l-1.9,0.5L25,23l1.8-1.1l1.9,0.5c0.1,0,0.2,0,0.3,0c0.4,0,0.8-0.3,1-0.7c0.1-0.5-0.2-1.1-0.7-1.2l-1.4-0.4   l0.4-1.4c0.1-0.5-0.2-1.1-0.7-1.2c-0.5-0.1-1.1,0.2-1.2,0.7l-0.5,1.9L24,21.3v-2.1l1.4-1.4c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-1,1   l-1-1c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l1.4,1.4v2.1l-1.8-1.1l-0.5-1.9c-0.1-0.5-0.7-0.9-1.2-0.7c-0.5,0.1-0.9,0.7-0.7,1.2   l0.4,1.4l-1.4,0.4c-0.5,0.1-0.9,0.7-0.7,1.2c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0l1.9-0.5L21,23l-1.8,1.1l-1.9-0.5   c-0.5-0.1-1.1,0.2-1.2,0.7c-0.1,0.5,0.2,1.1,0.7,1.2l1.4,0.4l-0.4,1.4c-0.1,0.5,0.2,1.1,0.7,1.2c0.1,0,0.2,0,0.3,0   c0.4,0,0.8-0.3,1-0.7l0.5-1.9l1.8-1.1v2.1l-1.4,1.4c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l1-1l1,1c0.2,0.2,0.5,0.3,0.7,0.3   s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L24,26.9v-2.1l1.8,1.1l0.5,1.9c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0   c0.5-0.1,0.9-0.7,0.7-1.2l-0.4-1.4l1.4-0.4c0.5-0.1,0.9-0.7,0.7-1.2S29.3,23.4,28.7,23.6z"
            />
          </g>
        </svg>
                `;
        break;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Dust":
      case "Ash":
      case "Squall":
      case "Tornado":
        element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="fog" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff"  stroke-linecap="round" stroke-linejoin="round">
        <path fill="none" stroke="none" d="M0 0h24v24H0z"/>
        <path  d="M5 5h3m4 0h9" />
        <path  d="M3 10h11m4 0h1" />
        <path  d="M5 15h5m4 0h7" />
        <path  d="M3 20h9m4 0h3" />
      </svg>
      `;
        break;
      case "Clouds":
        const humidity = parseInt(this.humidityInfo.textContent.split(":")[1]);

        if (humidity <= 25) {
          element.innerHTML = `
                   <svg
          class="sun-cloud"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 32.004 32.004"
          style="enable-background: new 0 0 32.004 32.004"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                style="fill: #ffffff"
                d="M27.586,13.214c-0.172-0.456-0.393-0.887-0.656-1.287c0.047-0.302,0.07-0.611,0.07-0.925
			c0-3.313-2.688-6-6-6c-1.533,0-2.932,0.575-3.992,1.521C15.576,5.563,13.854,5.002,12,5.002c-4.904,0-8.894,3.924-8.998,8.803
			C1.207,14.844,0,16.785,0,19.002c0,3.312,2.688,6,6,6h20c3.312,0,6-2.693,6-6C32,16.237,30.13,13.909,27.586,13.214z M21,7.002
			c1.839,0,3.389,1.241,3.855,2.933c-0.979-0.592-2.126-0.933-3.355-0.933c-0.641,0-1.26,0.093-1.844,0.266
			c-0.319-0.515-0.688-0.994-1.1-1.432C19.23,7.313,20.079,7.002,21,7.002z M26.003,23.002H5.997c-2.203,0-3.997-1.791-3.997-4
			c0-1.893,1.317-3.482,3.087-3.896C5.029,14.747,5,14.378,5,14.002c0-3.866,3.134-7,7-7c3.162,0,5.834,2.097,6.702,4.975
			c0.769-0.611,1.739-0.975,2.798-0.975c2.316,0,4.225,1.75,4.473,4h0.03c2.203,0,3.997,1.791,3.997,4
			C30,21.207,28.211,23.002,26.003,23.002z"
              />
              <path
                style="fill: #ffffff"
                d="M27.373,6.047l1.4-1.401c0.396-0.394,0.399-1.027,0.008-1.421c-0.391-0.39-1.021-0.393-1.422,0.007
			l-1.4,1.401c-0.395,0.394-0.4,1.027-0.007,1.421C26.343,6.444,26.973,6.447,27.373,6.047z"
              />
              <path
                style="fill: #ffffff"
                d="M21,4.002c0.553,0,1-0.443,1-1.01v-1.98c0-0.558-0.443-1.01-1-1.01c-0.553,0-1,0.443-1,1.01v1.98
			C20,3.55,20.443,4.002,21,4.002z"
              />
              <path
                style="fill: #ffffff"
                d="M28.004,11.006c0,0.552,0.443,1,1.01,1h1.98c0.558,0,1.01-0.444,1.01-1c0-0.553-0.443-1-1.01-1
			h-1.98C28.456,10.006,28.004,10.449,28.004,11.006z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>   `;
        } else if (humidity <= 50) {
          element.innerHTML = `<svg
                    class="cloud"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 32 32"
                    style="enable-background: new 0 0 32 32"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        fill="#ffffff"
                        d="M27.586,14.212C26.66,11.751,24.284,10,21.5,10c-0.641,0-1.26,0.093-1.846,0.266
                  C18.068,7.705,15.233,6,12,6c-4.905,0-8.893,3.924-8.998,8.803C1.208,15.842,0,17.783,0,20c0,3.312,2.687,6,6,6h20
                  c3.312,0,6-2.693,6-6C32,17.234,30.13,14.907,27.586,14.212z M26.003,24H5.997C3.794,24,2,22.209,2,20
                  c0-1.893,1.318-3.482,3.086-3.896C5.03,15.745,5,15.376,5,15c0-3.866,3.134-7,7-7c3.162,0,5.834,2.097,6.702,4.975
                  C19.471,12.364,20.441,12,21.5,12c2.316,0,4.225,1.75,4.473,4h0.03C28.206,16,30,17.791,30,20C30,22.205,28.211,24,26.003,24z"
                      />
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg> `;
        } else if (humidity <= 100) {
          element.innerHTML = `<svg
                    class="broken-cloud"
                    fill="#ffffff"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="512px"
                    height="512px"
                    viewBox="0 0 512 512"
                    style="enable-background: new 0 0 512 512"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        d="M512,335.5c0,35.344-28.656,64-64,64v0.5H176c-44.188,0-80-35.812-80-80c0-38.75,27.563-71.063,64.156-78.406
                     c0-0.531-0.156-1.031-0.156-1.594c0-53.031,42.969-96,96-96c37.438,0,69.5,21.625,85.344,52.875
                     C349.719,193.937,358.594,192,368,192c43.844,0,79.344,35.25,79.906,79H448v0.5C483.344,271.5,512,300.156,512,335.5z
                      M129.906,217.938c7.406-42.563,36.156-77.594,74.563-94.625C191.188,116.219,176.156,112,160,112c-53.031,0-96,42.969-96,96
                     c0,0.563,0.156,1.063,0.156,1.594C27.563,216.938,0,249.25,0,288c0,42.469,33.188,76.844,74.938,79.5
                     C68.125,353.031,64,337.031,64,320C64,275.438,90.594,235.75,129.906,217.938z"
                      />
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>`;
        }
        break;
      case "Rain":
        element.innerHTML = `<svg
                class="rain"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 32 32"
                style="enable-background: new 0 0 32 32"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      class="drop1"
                      style="fill: #ffffff"
                      d="M20,25.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.443,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C21,25.952,20.557,25.5,20,25.5z"
                    />
                    <path
                      class="drop2"
                      style="fill: #ffffff"
                      d="M12,25.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.444,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C13,25.952,12.556,25.5,12,25.5z"
                    />
                    <path
                      class="drop3"
                      style="fill: #ffffff"
                      d="M24,23.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.443,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C25,23.952,24.557,23.5,24,23.5z"
                    />
                    <path
                      class="drop4"
                      style="fill: #ffffff"
                      d="M16,23.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.444,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C17,23.952,16.557,23.5,16,23.5z"
                    />
                    <path
                      class="drop5"
                      style="fill: #ffffff"
                      d="M8,23.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.444,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                  C9,23.952,8.556,23.5,8,23.5z"
                    />
                    <path
                      style="fill: #ffffff"
                      d="M27.586,10.712C26.66,8.251,24.284,6.5,21.5,6.5c-0.641,0-1.26,0.093-1.846,0.266
                  C18.068,4.205,15.233,2.5,12,2.5c-4.904,0-8.894,3.924-8.998,8.803C1.207,12.342,0,14.283,0,16.5c0,3.312,2.687,6,6,6h20
                  c3.312,0,6-2.693,6-6C32,13.735,30.13,11.407,27.586,10.712z M26.003,20.5H5.997C3.794,20.5,2,18.709,2,16.5
                  c0-1.892,1.317-3.482,3.087-3.896C5.029,12.245,5,11.876,5,11.5c0-3.866,3.134-7,7-7c3.162,0,5.834,2.097,6.702,4.975
                  C19.471,8.864,20.441,8.5,21.5,8.5c2.316,0,4.225,1.75,4.473,4h0.03c2.203,0,3.997,1.791,3.997,4
                  C30,18.705,28.211,20.5,26.003,20.5z"
                    />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
           `;

        break;
    }
  }

  createTickerInfo(lang, timezone, dataWeather) {
    const moment = require("moment-timezone");
    moment.locale(`${lang.toLowerCase()}`);
    const container = document.createDocumentFragment();
    for (let i = 0; i < dataWeather.length; i++) {
      const dayWeather = document.createElement("ul");
      dayWeather.classList.add("ticker-block-day");

      const day = document.createElement("li");
      day.classList.add("ticker-block-day__item");
      const temperature = document.createElement("li");
      temperature.classList.add("ticker-block-day__item");
      temperature.dataset.name = "ticker-temperature";
      const weather = document.createElement("li");
      weather.classList.add("ticker-block-day__item");
      const feels = document.createElement("li");
      feels.classList.add("ticker-block-day__item");
      feels.dataset.name = "ticker-feels";
      const wind = document.createElement("li");
      wind.classList.add("ticker-block-day__item");
      const humidity = document.createElement("li");
      humidity.classList.add("ticker-block-day__item");

      day.textContent         = moment.tz(timezone).day((moment.tz(timezone).day() + i) % 7).format("dddd");
      temperature.textContent = `${this.objLang[lang][4]} : ${Math.round(dataWeather[i].main.temp )}°`;
      weather.textContent     = `${this.objLang[lang][0]} : ${dataWeather[i].weather[0].description}`;
      feels.textContent       = `${this.objLang[lang][1]} : ${Math.round(dataWeather[i].main.feels_like)}°`;
      wind.textContent        = `${this.objLang[lang][2]} : ${dataWeather[i].wind.speed}m/s`;
      humidity.textContent    = `${this.objLang[lang][3]} : ${dataWeather[i].main.humidity}%`;

      dayWeather.append(day, temperature, weather, feels, wind, humidity);
      container.append(dayWeather);
    }

    this.ticker.append(container);
  }
  removeTicker() {
    const tickerInfo = document.querySelectorAll(".ticker-block-day");
    tickerInfo.forEach((item) => item.remove());
  }
}

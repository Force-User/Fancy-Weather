import template from './table-weather.html';
import './table-weather.scss';
import sun_cloud from './sun-cloud.html';
import cloud from './cloud.html';
import broken_cloud from './broken-cloud.html';
import rain from './rain.html';
import snow from './snow.html';
import thunderstorm from './thunderstorm.html';
import clear from './clear.html';
import drizzle from './drizzle.html';
import fog from './fog.html';

export default class TableWeather {
  constructor() {
    this.element = null;
    this.currenttDate = null;
    this.time = null;
    this.currentLocate = null;
    this.objLang = {
      RU: {
        0: 'Погода',
        1: 'Ощущается как',
        2: 'Ветер',
        3: 'Влажность',
        4: 'Температура',
      },
      EN: {
        0: 'Weather',
        1: 'Feels like',
        2: 'Wind',
        3: 'Humidity',
        4: 'Temperature',
      },
      BE: {
        0: "Надвор'е",
        1: 'Адчуваецца як',
        2: 'Вецер',
        3: 'Вільготнасць',
        4: 'Тэмпература',
      },
    };
  }

  init() {
    const container = document.createElement('div');
    container.innerHTML = template;
    this.element = container.querySelector('.table-weather');
    this.locate = container.querySelector('.table-weather-head__locate');
    this.temperatureToday = container.querySelector('.weather-today__temperature');
    this.currentDate = container.querySelector('.table-weather-head__date');
    this.toDayImage = container.querySelector('.weather-info__image');
    this.weatherToDay = container.querySelector('.item-weather');
    this.weatherToDayInfo = container.querySelector('.item-weather-info');
    this.feelsLike = container.querySelector('.item-feels-like');
    this.feelsLikeInfo = container.querySelector('.item-feels-like-info');
    this.wind = container.querySelector('.item-wind');
    this.windInfo = container.querySelector('.item-wind-info');
    this.humidity = container.querySelector('.item-humidity');
    this.humidityInfo = container.querySelector('.item-humidity-info');
    this.firstDay = container.querySelector('[data-day="first"]');
    this.firstDayName = this.firstDay.querySelector('.forecast-next-day__name');
    this.temperatureOnFirstDay = this.firstDay.querySelector('.weather-next-day__temperature');
    this.imageFirstDay = this.firstDay.querySelector('.weather-next-day__img');
    this.secondDay = container.querySelector('[data-day="second"]');
    this.secondDayName = this.secondDay.querySelector('.forecast-next-day__name');
    this.temperatureOnSecondDay = this.secondDay.querySelector('.weather-next-day__temperature');
    this.imageSecondDay = this.secondDay.querySelector('.weather-next-day__img');
    this.thirdDay = container.querySelector('[data-day="third"]');
    this.thirdDayName = this.thirdDay.querySelector('.forecast-next-day__name');
    this.temperatureOnThirdDay = this.thirdDay.querySelector('.weather-next-day__temperature');
    this.imageThirdDay = this.thirdDay.querySelector('.weather-next-day__img');
    this.ticker = container.querySelector('.ticker-content');
  }

  getElement() {
    return this.element;
  }

  getTemperatureToday() {
    return this.temperatureToday;
  }

  getFeelsLike() {
    return parseInt(this.feelsLikeInfo.textContent.split(':')[1]);
  }

  setTemperatureToday(temperature) {
    this.temperatureToday.textContent = `${parseInt(temperature)}`;
  }

  setLocateForDate(city, country) {
    if (city.split('').find((item) => item === ' ')) {
      city = city.split(' ').join('_');
    }
    if (country.split('').find((item) => item === ' ')) {
      country = country.split(' ').join('_');
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
      const moment = require('moment-timezone');
      moment.locale(`${lang.toLowerCase()}`);

      this.currentDate.textContent = moment.tz(timezone).format('dd DD MMM , hh:mm:ss');

      this.firstDayName.textContent = moment.tz(timezone).day((moment.tz(timezone).day() + 1) % 7).format('dddd');
      this.secondDayName.textContent = moment
        .tz(timezone)
        .day((moment.tz(timezone).day() + 2) % 7)
        .format('dddd');
      this.thirdDayName.textContent = moment.tz(timezone).day((moment.tz(timezone).day() + 3) % 7).format('dddd');
    }, 1000);
  }

  convertTemperature(unit) {
    if (unit === 'F') {
      this.temperatureToday.textContent = parseInt(this.temperatureToday.textContent * 9 / 5 + 32);
      this.temperatureOnFirstDay.textContent = parseInt(this.temperatureOnFirstDay.textContent * 9 / 5 + 32);
      this.temperatureOnSecondDay.textContent = parseInt(this.temperatureOnSecondDay.textContent * 9 / 5 + 32);
      this.temperatureOnThirdDay.textContent = parseInt(this.temperatureOnThirdDay.textContent * 9 / 5 + 32);
      this.setFeelsLike(parseInt(this.getFeelsLike() * 9 / 5 + 32));
    } else if (unit === 'C') {
      this.temperatureToday.textContent = parseInt((this.temperatureToday.textContent - 32) * 5 / 9);
      this.temperatureOnFirstDay.textContent = parseInt((this.temperatureOnFirstDay.textContent - 32) * 5 / 9);
      this.temperatureOnSecondDay.textContent = parseInt((this.temperatureOnSecondDay.textContent - 32) * 5 / 9);
      this.temperatureOnThirdDay.textContent = parseInt((this.temperatureOnThirdDay.textContent - 32) * 5 / 9);
      this.setFeelsLike(parseInt((this.getFeelsLike() - 32) * 5 / 9));
    }
  }

  convertTemperatureToTicker(unit) {
    const allTemperature = document.querySelectorAll('[data-name="ticker-temperature"]');
    const allFeels = document.querySelectorAll('[data-name="ticker-feels"]');

    allTemperature.forEach((item) => {
      const indexTemp = item.textContent.indexOf(':');
      const tempValue = parseInt(item.textContent.split(':')[1]);
      if (unit === 'F') {
        item.textContent = `${item.textContent.substring(
          0,
          indexTemp + 1,
        )} ${parseInt(tempValue * 9 / 5 + 32)}°`;
      } else {
        item.textContent = `${item.textContent.substring(
          0,
          indexTemp + 1,
        )} ${parseInt((tempValue - 32) * 5 / 9)}°`;
      }
    });

    allFeels.forEach((item) => {
      const indexFeels = item.textContent.indexOf(':');
      const feelsValue = parseInt(item.textContent.split(':')[1]);
      if (unit === 'F') {
        item.textContent = `${item.textContent.substring(0, indexFeels + 1)} ${parseInt(
          feelsValue * 9 / 5 + 32,
        )}°`;
      } else {
        item.textContent = `${item.textContent.substring(0, indexFeels + 1)} ${parseInt(
          (feelsValue - 32) * 5 / 9,
        )}°`;
      }
    });
  }

  clearLocate() {
    this.locate.textContent = '';
  }

  clearTime() {
    clearInterval(this.time);
  }

  drawWeatherImage(main, element) {
    switch (main) {
      case 'Clear':
        element.innerHTML = clear;

        break;
      case 'Thunderstorm':
        element.innerHTML = thunderstorm;
        break;
      case 'Drizzle':
        element.innerHTML = drizzle;
        break;
      case 'Snow':
        element.innerHTML = snow;
        break;
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Dust':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        element.innerHTML = fog;
        break;
      case 'Clouds':
        const humidity = parseInt(this.humidityInfo.textContent.split(':')[1]);

        if (humidity <= 25) {
          element.innerHTML = sun_cloud;
        } else if (humidity <= 50) {
          element.innerHTML = cloud;
        } else if (humidity <= 100) {
          element.innerHTML = broken_cloud;
        }
        break;
      case 'Rain':
        element.innerHTML = rain;

        break;
    }
  }

  createTickerInfo(lang, timezone, dataWeather) {
    const moment = require('moment-timezone');
    moment.locale(`${lang.toLowerCase()}`);
    const container = document.createDocumentFragment();

    dataWeather.forEach((item, index) => {
      const dayWeather = document.createElement('ul');
      dayWeather.classList.add('ticker-block-day');

      const day = document.createElement('li');
      day.classList.add('ticker-block-day__item');
      const temperature = document.createElement('li');
      temperature.classList.add('ticker-block-day__item');
      temperature.dataset.name = 'ticker-temperature';
      const weather = document.createElement('li');
      weather.classList.add('ticker-block-day__item');
      const feels = document.createElement('li');
      feels.classList.add('ticker-block-day__item');
      feels.dataset.name = 'ticker-feels';
      const wind = document.createElement('li');
      wind.classList.add('ticker-block-day__item');
      const humidity = document.createElement('li');
      humidity.classList.add('ticker-block-day__item');

      day.textContent = moment.tz(timezone).day((moment.tz(timezone).day() + index) % 7).format('dddd');
      temperature.textContent = `${this.objLang[lang][4]} : ${Math.round(item.main.temp)}°`;
      weather.textContent = `${this.objLang[lang][0]} : ${item.weather[0].description}`;
      feels.textContent = `${this.objLang[lang][1]} : ${Math.round(item.main.feels_like)}°`;
      wind.textContent = `${this.objLang[lang][2]} : ${item.wind.speed}m/s`;
      humidity.textContent = `${this.objLang[lang][3]} : ${item.main.humidity}%`;

      dayWeather.append(day, temperature, weather, feels, wind, humidity);
      container.append(dayWeather);
    });

    this.ticker.append(container);
  }

  removeTicker() {
    const tickerInfo = document.querySelectorAll('.ticker-block-day');
    tickerInfo.forEach((item) => item.remove());
  }
}

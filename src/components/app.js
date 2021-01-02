import template from './app.html';
import './app.scss';
import Main from './main/main';
import Header from './header/header';

export default class AppWeather {
  constructor() {
    this.element = null;
    this.header = new Header();
    this.main = new Main();
    this.wrapper = null;
    this.backgroundImageContainer = null;
    this.currentCity = null;
    this.currentCountry = null;
    this.selectedLang = 'EN';
    this.currentUnitTemp = 'C';
    this.timezone = null;
    this.image = [];
    this.currentWeather = null;
    this.isSecondRun = false;
    this.latCurrentCity = null;
    this.lngCurrentCity = null;
  }

  init() {
    const { body } = document;
    const container = document.createElement('div');
    container.innerHTML = template;

    this.element = container.querySelector('.app');
    this.backgroundImageContainer = container.querySelector('.app-images');
    this.wrapper = container.querySelector('.wrapper');

    mapboxgl.accessToken = 'pk.eyJ1IjoiaXRzbWNmbHkiLCJhIjoiY2tpandvaGoxMDQ4NjJ4cWo2cHkyaHYxciJ9.5-bSo9E-3mHDzKJsnlndxw';

    this.header.init();
    this.main.init();

    this.element.append(this.header.getElement(), this.main.getElement());
    body.prepend(this.element);

    this.getLocalStorageValue();
    this.header.parameters.langSelect.setActiveOption(
      document.querySelector(`[data-lang=${this.selectedLang}]`),
    );
    this.handleEvents();
    this.getCurrentLocation();
    this.recognizerAction();
  }

  setDataFromTableWeather() {
    this.main.tableWeather.setLocate(this.currentCity, this.currentCountry);
    this.main.mapTable.setCoordinates(this.latCurrentCity, this.lngCurrentCity, this.selectedLang);
    this.main.mapTable.createMap(this.latCurrentCity, this.lngCurrentCity);
    this.header.search.changeLangForSearchButton(this.selectedLang);
    this.header.search.changeLangForSearchPlaceHolder(this.selectedLang);
    this.setValueToLocalStorage();
  }

  getLocalStorageValue() {
    this.selectedLang = localStorage.getItem('language')
      ? localStorage.getItem('language')
      : 'EN';
    this.header.parameters.langSelect.setLang(this.selectedLang);

    this.currentCountry = localStorage.getItem('country');
    this.currentCity = localStorage.getItem('city');

    this.currentUnitTemp = localStorage.getItem('temperature')
      ? localStorage.getItem('temperature')
      : 'C';
  }

  getCurrentLocation() {
    const url = 'https://ipinfo.io/json?token=eb5b90bb77d46a';
    fetch(url)

      .then((data) => data.json())
      .then((data) => {
        this.currentCity = localStorage.getItem('city')
          ? localStorage.getItem('city')
          : data.region.split(' ')[0];

        this.getLocateToNameCity();
      })
      .catch(() => console.log('Locate not received'));
  }

  getZoneName(lng, lat) {
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=8Q96U2APKZN9&format=json&by=position&lat=${lat}&lng=${lng}`;
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        this.timezone = data.zoneName;

        this.main.tableWeather.clearTime();
        this.main.tableWeather.setDate(this.selectedLang, this.timezone);
      })
      .catch(() => console.log('zone not received'));
  }

  getLocateToNameCity() {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${
      this.currentCity
    }&language=${this.selectedLang.toLowerCase()}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        this.lngCurrentCity = data.results[0].geometry.lng;
        this.latCurrentCity = data.results[0].geometry.lat;
        this.checkPlace(data);
        this.checkCity(data);

        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${this.currentCity}&language=en&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`,
        )
          .then((data) => data.json())
          .then((data) => {
            this.checkCity(data);
            this.getZoneName(this.lngCurrentCity, this.latCurrentCity);
            this.getWeather();
          });
      })
      .catch(() => {
        this.header.search.changeLangForSearchPlaceHolder(
          this.selectedLang,
          true,
        );
        this.header.search.clearSearchInput();
      });
  }

  getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.currentCityNameOnEng}&lang=${this.selectedLang}&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        this.setDataFromTableWeather();
        this.header.search.clearSearchInput();
        const dataToday = data.list[0];
        const dataList = [
          data.list[0],
          data.list[8],
          data.list[16],
          data.list[24],
          data.list[32],
          data.list[39],
        ];
        this.currentWeather = data.list[0].weather[0].main;
        this.getImage();

        this.main.tableWeather.setTemperatureToday(dataToday.main.temp);
        this.main.tableWeather.setWeatherInfoToDay(
          dataToday.weather[0].description,
          dataToday.main.feels_like,
          dataToday.wind.speed,
          dataToday.main.humidity,
          this.selectedLang,
        );
        this.main.tableWeather.setTemperatureOnFirstDay(
          data.list[10].main.temp,
        );
        this.main.tableWeather.setTemperatureOnSecondDay(
          data.list[18].main.temp,
        );
        this.main.tableWeather.setTemperatureOnThirdDay(
          data.list[26].main.temp,
        );

        this.main.tableWeather.drawWeatherImage(
          data.list[0].weather[0].main,
          this.main.tableWeather.toDayImage,
        );
        this.main.tableWeather.drawWeatherImage(
          data.list[10].weather[0].main,
          this.main.tableWeather.imageFirstDay,
        );
        this.main.tableWeather.drawWeatherImage(
          data.list[18].weather[0].main,
          this.main.tableWeather.imageSecondDay,
        );
        this.main.tableWeather.drawWeatherImage(
          data.list[26].weather[0].main,
          this.main.tableWeather.imageThirdDay,
        );
        this.main.tableWeather.removeTicker();
        this.main.tableWeather.createTickerInfo(
          this.selectedLang,
          this.timezone,
          dataList,
        );

        this.checkDataToLocalStorage();
        this.currentCityNameOnEng = null;
      })
      .catch(() => {
        this.currentCityNameOnEng = null;
        this.header.search.changeLangForSearchPlaceHolder(
          this.selectedLang,
          true,
        );
        this.header.search.clearSearchInput();
        console.log('City no found, forecast not received');
      });
  }

  getElement() {
    return this.element;
  }

  getImage() {
    const urlImage = `https://api.unsplash.com/photos/random?query=autumn,morning,${this.currentWeather}&client_id=9ffe44f80e9a5ea908c596de07f24b01145a79018daa172974cc961a79583a87&orientation=landscape`;
    fetch(urlImage)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        const currentImage = document.querySelector('.app-images__image--show');
        const image = document.createElement('img');
        image.src = data.urls.regular;

        image.classList.add('app-images__image');
        currentImage.classList.remove('app-images__image--show');

        this.backgroundImageContainer.append(image);

        const hiddeImage = (e) => {
          if (e.propertyName === 'opacity') {
            image.classList.add('app-images__image--show');
            currentImage.removeEventListener('transitionend', hiddeImage);
            currentImage.remove();
          }
        };
        currentImage.addEventListener('transitionend', hiddeImage);
        this.header.parameters.refresh.removeAnimateRefresh();
      })
      .catch(() => console.log('image not received'));
  }

  setValueToLocalStorage() {
    localStorage.setItem('city', this.currentCity);
    localStorage.setItem('country', this.currentCountry);
    localStorage.setItem('language', this.selectedLang);
    localStorage.setItem('temperature', this.currentUnitTemp);
  }

  checkDataToLocalStorage() {
    if (localStorage.getItem('language')) {
      this.header.parameters.langSelect.setLang(
        localStorage.getItem('language'),
      );
    }

    if (localStorage.getItem('temperature') === 'F') {
      this.toggleTemeratureButton(document.querySelector('[data-temp="F"]'));
    }
  }

  recognizerAction() {
    this.header.search.recognizer.onresult = (e) => {
      const result = e.results[e.resultIndex];
      if (result.isFinal) {
        this.header.search.searchInput.value = result[0].transcript;
        this.currentCity = result[0].transcript;
        this.getLocateToNameCity();
      } else {
        this.header.search.searchInput.value = result[0].transcript;
      }
    };
  }

  drawImage(imageObject) {
    this.backgroundImage.src = imageObject.urls.regular;
  }

  handleEvents() {
    const selectLanguageElement = this.header.parameters.getElement();

    selectLanguageElement.addEventListener('click', (e) => {
      const selectedElement = e.target.closest('button');
      const selectedOption = e.target.closest('li');
      if (
        selectedOption
        && selectedOption.classList.contains('lang-select__option')
      ) {
        this.selectedLang = selectedOption.dataset.lang.toUpperCase();

        this.header.parameters.langSelect.setActiveOption(selectedOption);
        this.header.parameters.langSelect.toggleActiveSelect();
        this.header.parameters.langSelect.toggleActiveButton();
        this.header.parameters.langSelect.setLang(selectedOption.dataset.lang);
        this.setValueToLocalStorage();
        this.getLocateToNameCity();
        return;
      }

      if (
        selectedElement
        && selectedElement.classList.contains('lang__button')
      ) {
        this.header.parameters.langSelect.toggleActiveSelect();
        this.header.parameters.langSelect.toggleActiveButton();

        return;
      }

      if (
        selectedElement
        && selectedElement.classList.contains('temperature__button')
      ) {
        this.toggleTemeratureButton(selectedElement);
      }
    });

    const { search } = this.header;
    search.getElement().addEventListener('submit', (e) => {
      e.preventDefault();
      this.currentCity = search.getValueSearch();
      this.getLocateToNameCity();
    });

    const { refresh } = this.header.parameters;
    refresh.element.addEventListener('click', () => {
      refresh.animateRefresh();
      this.getImage();
    });

    const micro = this.header.search.microButton;
    micro.addEventListener('click', (e) => {
      if (e.target.closest('button')) {
        try {
          this.header.search.setRecognizerLang(this.selectedLang);
          this.header.search.recognizer.start();
        }
        catch(err) {
          console.log(err);
        }
      }
    });
  }

  checkPlace(data) {
    if (data.results[0].components.country) {
      this.currentCountry = data.results[0].components.country;
    } else if (data.results[0].components.place) {
      this.currentCountry = data.results[0].components.place;
    } else if (data.results[0].components.continent) {
      this.currentCity = data.results[0].components.continent;
    }
  }

  checkCity(data) {
    if (this.isSecondRun) {
      if (data.results[0].components.city) {
        this.currentCityNameOnEng = data.results[0].components.city;
      } else if (data.results[0].components.town) {
        this.currentCityNameOnEng = data.results[0].components.town;
      } else if (data.results[0].components.state) {
        this.currentCityNameOnEng = data.results[0].components.state;
      } else if (data.results[0].components.continent) {
        this.currentCityNameOnEng = data.results[0].components.continent;
      } else if (data.results[0].components.place) {
        this.currentCityNameOnEng = data.results[0].components.place;
      }
    } else if (data.results[0].components.city) {
      this.currentCity = data.results[0].components.city;
    } else if (data.results[0].components.town) {
      this.currentCity = data.results[0].components.town;
    } else if (data.results[0].components.state) {
      this.currentCity = data.results[0].components.state;
    } else if (data.results[0].components.continent) {
      this.currentCity = data.results[0].components.continent;
    } else if (data.results[0].components.place) {
      this.currentCity = data.results[0].components.place;
    }
    this.isSecondRun = !this.isSecondRun;
  }

  toggleTemeratureButton(selectedElement) {
    const currentButton = document.querySelector(
      '.temperature__button--active',
    );
    currentButton.disabled = false;
    currentButton.classList.remove('temperature__button--active');
    this.currentUnitTemp = selectedElement.dataset.temp;
    selectedElement.classList.add('temperature__button--active');
    selectedElement.disabled = true;
    this.setValueToLocalStorage();
    this.main.tableWeather.convertTemperature(this.currentUnitTemp);
    this.main.tableWeather.convertTemperatureToTicker(this.currentUnitTemp);
  }
}

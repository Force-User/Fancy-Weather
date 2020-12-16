import template from "./app.html";
import "./app.scss";
import Main from "./main/main";
import Header from "./header/header";

export default class AppWeather {
    constructor() {
        this.element         = null;
        this.header          = new Header();
        this.main            = new Main();
        this.wrapper         = null
        this.backgroundImage = null;

        this.currentCity     = null;
        this.currentCountry  = null;
        this.selectedLang    = "EN";
        this.currentUnitTemp = "C";
        this.timezone        = null;
    }

    init() {
        const body           = document.body;
        const container      = document.createElement('div');
        container.innerHTML  = template;

        this.element         = container.querySelector('.app');
        this.backgroundImage = container.querySelector('#background-image');
        this.wrapper         = container.querySelector('.wrapper');

        mapboxgl.accessToken = 'pk.eyJ1IjoiaXRzbWNmbHkiLCJhIjoiY2tpandvaGoxMDQ4NjJ4cWo2cHkyaHYxciJ9.5-bSo9E-3mHDzKJsnlndxw';

        this.header.init();
        this.main.init();

        this.wrapper.append(
            this.header.getElement(),
            this.main.getElement()
        )
        body.prepend(this.element);

        // this.getImage();
        this.checkDataToLocalStorage();
        this.getLocalStorageValue();
        this.handleEvents();        
        this.getLocate();
        this.recognizerAction();   
    }

    getLocalStorageValue() {
        this.selectedLang    = Boolean(localStorage.getItem("language")) ? localStorage.getItem("language") : "EN";
        this.currentCountry  = localStorage.getItem("country");
        this.currentCity     = localStorage.getItem("city");
        this.currentUnitTemp = Boolean(localStorage.getItem("temperature")) ? localStorage.getItem("temperature") : "c"; 
    }

    checkDataToLocalStorage() {
        if(localStorage.getItem("language")) {
            this.header.parameters.langSelect.setLang(localStorage.getItem("language"));
        }

        if(localStorage.getItem("temperature") === "F") {
            this.main.tableWeather.convertTemperature(this.currentUnitTemp);
        }
    }

    getLocate() {
        const url = `https://ipinfo.io/json?token=eb5b90bb77d46a`;
        fetch(url)
        .then(data => data.json())
        .then(data => {
            this.currentCity = Boolean(localStorage.getItem("city")) ? localStorage.getItem("city") : data.region.split(" ")[0];
            this.getLocateToNameCity();
            return data;
        })      
    }

    getZoneName(lng,lat) {
        const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=8Q96U2APKZN9&format=json&by=position&lat=${lat}&lng=${lng}`;
        fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data, "data");
            this.main.tableWeather.clearTime();
            this.main.tableWeather.setDate(this.selectedLang,data.zoneName);
        })
    }

    getLocateToNameCity() {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${this.currentCity}&language=${this.selectedLang.toLowerCase()}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`;
        fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            const lng = data.results[0].geometry.lng;
            const lat = data.results[0].geometry.lat;

           this.checkCity(data);
            
            this.currentCountry = data.results[0].components.country;

            this.main.tableWeather.setLocate(this.currentCity, this.currentCountry);
            this.main.mapTable.setLocate(lng, lat);
            this.main.mapTable.createMap(lng, lat);
            this.header.search.changeLangForSearchButton(this.selectedLang);
            this.header.search.changeLangForSearchPlaceHolder(this.selectedLang);

                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.currentCity}&language=en&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`)
               .then(data => data.json())
               .then(data => {
                   
                     this.getZoneName(lng,lat);
                     this.checkCity(data);
                     this.getWather();
                     
                     console.log(data);
                     console.log(this.currentCity);
                     
            })
           
            
        })
    }

    getWather() {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.currentCity}&lang=${this.selectedLang}&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27`;
        fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            const dataToday = data.list[0];
            this.main.tableWeather.setTemperatureToday(dataToday.main.temp);
            this.main.tableWeather.setWeatherInfoToDay(dataToday.weather[0].description, dataToday.main.feels_like, dataToday.wind.speed, dataToday.main.humidity, this.selectedLang)
           

            this.main.tableWeather.setTemperatureOnFirstDay(data.list[10].main.temp);
            this.main.tableWeather.setTemperatureOnSecondDay(data.list[18].main.temp);
            this.main.tableWeather.setTemperatureOnThirdDay(data.list[26].main.temp);

            this.main.tableWeather.drawWeatherImage(dataToday.weather[0].main, dataToday.weather[0].description, this.main.tableWeather.toDayImage);
            this.main.tableWeather.drawWeatherImage(dataToday.weather[0].main, dataToday.weather[0].description, this.main.tableWeather.imageFirstDay);
            this.main.tableWeather.drawWeatherImage(dataToday.weather[0].main, dataToday.weather[0].description, this.main.tableWeather.imageSecondDay);
            this.main.tableWeather.drawWeatherImage(dataToday.weather[0].main, dataToday.weather[0].description, this.main.tableWeather.imageThirdDay);
            this.setValueToLocalStorage();

            this.header.parameters.refresh.removeAnimateRefresh();
        });
    }

    getElement() {
        return this.element;
    }

    getImage() {
        const urlImage = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=lla9TJJDd7nbUqp_A4Mz3qkD5kCMThbnJiiwus4zY-I`
        fetch(urlImage)
        .then(data => data.json())
        .then(data => this.drawImage(data))
    }

    recognizerAction() {
      this.header.search.recognizer.onresult = (e) => {
          const result = e.results[e.resultIndex];
          if(result.isFinal) {
              this.header.search.searchInput.value = result[0].transcript; 
              this.currentCity = result[0].transcript;
              this.getLocateToNameCity();
          } else {
              this.header.search.searchInput.value = result[0].transcript;
          }
      }
    }

    drawImage(imageObject) {
        this.backgroundImage.src = imageObject.urls.regular;
    }

    handleEvents() {
        const selectLanguage = this.header.parameters.getElement();
        selectLanguage.addEventListener('click', (e) => {
            const selectedElement = e.target.closest("button");
            const selectedOption = e.target.closest("li");
            if(selectedOption) {
              
                this.selectedLang = selectedOption.textContent.toUpperCase();
                this.header.parameters.langSelect.setActiveOption(selectedOption);
                this.header.parameters.langSelect.toggleActiveSelect();
                this.header.parameters.langSelect.toggleActiveButton();
                this.header.parameters.langSelect.setLang(selectedOption.textContent);
                this.setValueToLocalStorage();
                this.getLocateToNameCity();
                
                return
            }

            if(selectedElement.classList.contains("lang__button")) {
                this.header.parameters.langSelect.toggleActiveButton();
                this.header.parameters.langSelect.toggleActiveSelect();
                return;
            }

           
//temp
            if(selectedElement.classList.contains("temperature__button")) {
                document.querySelector(".temperature__button--active").disabled = false;
                document.querySelector(".temperature__button--active").classList.remove("temperature__button--active")
                this.currentUnitTemp = selectedElement.textContent;
                selectedElement.classList.add("temperature__button--active");
                selectedElement.disabled = true;
                this.setValueToLocalStorage();
                this.main.tableWeather.convertTemperature(this.currentUnitTemp);
               
                
            }
        })

        const search = this.header.search;
        search.getElement().addEventListener("submit", e => {
                e.preventDefault();
                this.currentCity = search.getValueSearch();
                this.getLocateToNameCity();
            })

        const refresh = this.header.parameters.refresh;
        refresh.element.addEventListener('click', (e) => {
            refresh.animateRefresh();
            this.getLocateToNameCity();
        })

        const micro = this.header.search.microButton;
        micro.addEventListener("click", e => {
            if(e.target.closest("button")) {
                this.header.search.setRecognizerLang(this.selectedLang);
                this.header.search.recognizer.start();
            }
        })
    }

    checkCity(data) {
        if(data.results[0].components.city){
            this.currentCity = data.results[0].components.city

        }else if(data.results[0].components.town){
            this.currentCity = data.results[0].components.town;

        }else if(data.results[0].components.state) {
            this.currentCity = data.results[0].components.state;

        } 
    }

    setValueToLocalStorage() {
        localStorage.setItem("city", this.currentCity);
        localStorage.setItem("country", this.currentCountry);
        localStorage.setItem("language", this.selectedLang);
        localStorage.setItem("temperature", this.currentUnitTemp);
    }
}
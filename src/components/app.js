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
    }

    init() {
        const body           = document.body;
        const container      = document.createElement('div');
        container.innerHTML  = template;

        this.element         = container.querySelector('.app');
        this.backgroundImage = container.querySelector('#background-image');
        this.wrapper         = container.querySelector('.wrapper');

        this.header.init();
        this.main.init();

        this.wrapper.append(
            this.header.getElement(),
            this.main.getElement()
            )

        body.prepend(this.element);

        this.getLocalStorageValue();
        this.handleEvents();

        // this.getImage();
        this.getLocate();
        this.main.tableWeather.setDate(this.selectedLang);
        
        
    }
    getLocalStorageValue() {

        this.selectedLang    = Boolean(localStorage.getItem("language")) ? localStorage.getItem("language") : "EN";
        this.currentCountry  = localStorage.getItem("country");
        this.currentCity     = localStorage.getItem("city");
        this.currentUnitTemp = Boolean(localStorage.getItem("temperature")) ? localStorage.getItem("temperature") : "c"; 
    }


    getWather() {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.currentCity}&lang=${this.selectedLang}&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27`;
        fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            const dataToday = data.list[0];
            this.main.tableWeather.setTemperatureToday(dataToday.main.temp);
            this.main.tableWeather.setWeatherToDay(dataToday.weather[0].description);
            this.main.tableWeather.setFeelsLike(dataToday.main.feels_like);
            this.main.tableWeather.setWind(dataToday.wind.speed);
            this.main.tableWeather.setHumidity(dataToday.main.humidity);

            this.main.tableWeather.setTemperatureOnFirstDay(data.list[10].main.temp);
            this.main.tableWeather.setTemperatureOnSecondDay(data.list[18].main.temp);
            this.main.tableWeather.setTemperatureOnThirdDay(data.list[26].main.temp);
            this.main.tableWeather.drawWeatherImage(dataToday.weather[0].main, dataToday.weather[0].description, this.main.tableWeather.toDayImage);
            this.main.tableWeather.drawWeatherImage(dataToday.weather[0].main, dataToday.weather[0].description, this.main.tableWeather.imageFirstDay);
            this.main.tableWeather.drawWeatherImage(dataToday.weather[0].main, dataToday.weather[0].description, this.main.tableWeather.imageSecondDay);
            this.main.tableWeather.drawWeatherImage(dataToday.weather[0].main, dataToday.weather[0].description, this.main.tableWeather.imageThirdDay);
            this.setValueToLocalStorage();
        });
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

    getLocateToNameCity() {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${this.currentCity}&language=${this.selectedLang.toLowerCase()}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`;
        fetch(url)
        .then(data => data.json())
        .then(data => {
            this.currentCity    = data.results[0].components.city ? data.results[0].components.city : data.results[0].components.town;
            this.currentCountry = data.results[0].components.country;
            this.main.tableWeather.setLocate(this.currentCity, this.currentCountry);
            this.getWather();
            
        })
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


    drawImage(imageObject) {
        this.backgroundImage.src = imageObject.urls.regular;
    }

    handleEvents() {
        //langButton
        const selectLanguage = this.header.parameters.getElement();
        selectLanguage.addEventListener('click', (e) => {
            const selectedElement = e.target;

            if(selectedElement.closest("button") && selectedElement.classList.contains("lang__button")) {
                
                this.header.parameters.langSelect.toggleActiveButton();
                this.header.parameters.langSelect.toggleActiveSelect();
                return;
            }

            if(selectedElement.closest("li")) {
                this.selectedLang = selectedElement.textContent.toUpperCase();
                this.getLocateToNameCity();
                this.header.parameters.langSelect.setLang(selectedElement.textContent);
                this.header.parameters.langSelect.toggleActiveSelect();
                this.main.tableWeather.clearTime();
                this.setValueToLocalStorage();
                this.main.tableWeather.setDate(this.selectedLang);
                return
            }

            if(selectedElement.closest("button") && selectedElement.classList.contains("temperature__button")) {
                document.querySelector(".temperature__button--active").disabled = false;
                document.querySelector(".temperature__button--active").classList.remove("temperature__button--active")
                this.currentUnitTemp = selectedElement.textContent;
                selectedElement.classList.add("temperature__button--active");
                selectedElement.disabled = true;
                this.setValueToLocalStorage();
                this.main.tableWeather.convertTemperature(this.currentUnitTemp);
               
                
            }
        })

//Search

        const search = this.header.search;
        search.getElement().addEventListener("submit", e => {
                e.preventDefault();
                this.currentCity = search.getValueSearch();
                this.getLocateToNameCity();
            })

        
        
       
        
    }

    setValueToLocalStorage() {
        localStorage.setItem("city", this.currentCity);
        localStorage.setItem("country", this.currentCountry);
        localStorage.setItem("language", this.selectedLang);
        localStorage.setItem("temperature", this.currentUnitTemp);
    }
}
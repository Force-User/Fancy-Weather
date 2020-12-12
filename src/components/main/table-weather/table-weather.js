import template from "./table-weather.html";
import "./table-weather.scss";

export default class TableWeather {
    constructor (){
        this.element       = null;
        this.currenttDate  = null;
    }

    init() {
        const container             = document.createElement("div");
        container.innerHTML         = template;
        this.element                = container.querySelector(".table-weather");
        this.locate                 = container.querySelector('.table-wether-head__locate');
        this.temperatureToday       = container.querySelector('.weather-today__temperature');
        this.currentDate            = container.querySelector(`.table-weather-head__date`);
        this.weatherToDay           = container.querySelector(`[data-name="item-weather"]`); 
        this.feelsLike              = container.querySelector(`[data-name="item-feels-like"]`);
        this.wind                   = container.querySelector(`[data-name="item-wind"]`);
        this.humidity               = container.querySelector(`[data-name="item-humidity"]`);

        this.firstDay               = container.querySelector(`[data-day="first"]`);
        this.firstDayName           = this.firstDay.querySelector(`.forecast-next-day__name`);
        this.temperatureOnFirstDay  = this.firstDay.querySelector(`.weather-next-day__temperature`);
        this.imageFirstDay          = this.firstDay.querySelector(`.weather-next-day__img`);

        this.secondDay              = container.querySelector(`[data-day="second"]`);
        this.secondDayName          = this.secondDay.querySelector(`.forecast-next-day__name`);
        this.temperatureOnSecondDay = this.secondDay.querySelector(`.weather-next-day__temperature`);
        this.imageSecondDay         = this.secondDay.querySelector(`.weather-next-day__img`);

        this.thirdDay               = container.querySelector(`[data-day="third"]`);
        this.thirdDayName           = this.thirdDay.querySelector(`.forecast-next-day__name`);
        this.temperatureOnThirdDay  = this.thirdDay.querySelector(`.weather-next-day__temperature`);
        this.imageThirdDay          = this.thirdDay.querySelector(`.weather-next-day__img`);




        this.setDate();
    }
    getElement() {
        return this.element;
    }



    setTemperatureOnFirstDay(temperature) {
        this.temperatureOnFirstDay.textContent = `${temperature}°`;
    }
    setTemperatureOnSecondDay(temperature) {
        this.temperatureOnSecondDay.textContent = `${temperature}°`;
    }
    setTemperatureOnThirdDay(temperature) {
        this.temperatureOnThirdDay.textContent = `${temperature}°`;
    }



    setWeatherToDay(weather) {
        this.weatherToDay.textContent = `${weather}`;
    }
    setFeelsLike(temperature) {
        this.feelsLike.textContent = `Feels like: ${temperature}°`;
    }
    setWind(wind) {
        this.wind.textContent = `Wind: ${wind} m/s`;
    }
    setHumidity(humidity) {
        this.humidity.textContent = `humidity: ${humidity}%`;
    }



    setLocate(city,country) {
        this.locate.textContent = `${city}, ${country}`; 
    }
    setTemperatureToday(temperature) {
        this.temperatureToday.textContent = `${temperature}°`;
    }
    getTemperatureToday() {
        return this.temperatureToday;
    }



    setDate() {

        const monthCollection = [
            "January", "February", "March", "April",
            "May", "June", "July", "August", "September",
            "October", "November", "December",
        ]

        const dayWeekCollection = [
            "Sun", "Mon", "Thues", "Wedn",
            "Thur", "Fri", "Sat"
        ]

        setInterval(() => {
            const date      = new Date();
            const dayWeek   = dayWeekCollection[date.getDay()];
            const dateToday = date.getDate();
            const month     = monthCollection[date.getMonth()];

            const seconds   = checkZero(date.getSeconds());
            const minutes   = checkZero(date.getMinutes());
            const hours     = checkZero(date.getHours()); 

            this.currentDate.textContent   = `${month} ${dateToday} ${dayWeek}, ${hours}:${minutes}:${seconds}`;
            console.log(dayWeekCollection[date.getDay() - 1]);
            this.firstDayName.textContent  = dayWeekCollection[(date.getDay() + 1) % 7];
            this.secondDayName.textContent = dayWeekCollection[(date.getDay() + 2) % 7];
            this.thirdDayName.textContent  = dayWeekCollection[(date.getDay() + 3) % 7]; 
        },1000);

        function checkZero(number) {
            return number > 9 ? number : `0${number}`;
        }
    }
}
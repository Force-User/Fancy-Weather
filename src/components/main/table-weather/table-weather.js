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
        this.time                   = null;
        this.locate                 = container.querySelector('.table-weather-head__locate');
        this.temperatureToday       = container.querySelector('.weather-today__temperature');
        this.currentDate            = container.querySelector(`.table-weather-head__date`);
        this.weatherToDay           = container.querySelector(`[data-name="item-weather"]`);
        this.toDayImage             = container.querySelector(".weather-info__image");
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
    }
    getElement() {
        return this.element;
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



    setWeatherToDay(weather) {
        this.weatherToDay.textContent = `${weather}`;
    }
    setFeelsLike(temperature) {
        this.feelsLike.textContent = `Feels like: ${parseInt(temperature)}`;
    }
    setWind(wind) {
        this.wind.textContent = `Wind: ${wind} m/s`;
    }
    setHumidity(humidity) {
        this.humidity.textContent = `humidity: ${humidity}%`;
    }

    getFeelsLike() {
        return parseInt(this.feelsLike.textContent.split(":")[1]);
    
    }

    convertTemperature(unit) {
        if (unit === "F") { 
           this.temperatureToday.textContent       = parseInt((this.temperatureToday.textContent * 9 / 5) + 32);
           this.temperatureOnFirstDay.textContent  = parseInt((this.temperatureOnFirstDay.textContent * 9 / 5) + 32);
           this.temperatureOnSecondDay.textContent = parseInt((this.temperatureOnSecondDay.textContent * 9 / 5) + 32);
           this.temperatureOnThirdDay.textContent  = parseInt((this.temperatureOnThirdDay.textContent * 9 / 5) + 32);
           this.setFeelsLike(parseInt((this.getFeelsLike() * 9 / 5) + 32));
       } else {
           this.temperatureToday.textContent       = parseInt((this.temperatureToday.textContent - 32) * 5 / 9);
           this.temperatureOnFirstDay.textContent  = parseInt((this.temperatureOnFirstDay.textContent - 32) * 5 / 9);
           this.temperatureOnSecondDay.textContent = parseInt((this.temperatureOnSecondDay.textContent - 32) * 5 / 9);
           this.temperatureOnThirdDay.textContent  = parseInt((this.temperatureOnThirdDay.textContent - 32) * 5 / 9);
           this.setFeelsLike(parseInt((this.getFeelsLike() - 32) * 5 / 9));
       }
   }



    setLocate(city,country) {
        this.locate.innerHTML = `${city},<br>${country}`; 
    }
    clearLocate() {
        this.locate.textContent = "";
    }
    setTemperatureToday(temperature) {
        this.temperatureToday.textContent = `${parseInt(temperature)}`;
    }
    getTemperatureToday() {
        return this.temperatureToday;
    }

    clearTime() {
        clearInterval(this.time);
    }

    setDate(lang) {
        const obj = {
            month:{
                "RU": {
                    "0": "Январь",
                    "1": "Февраль",  
                    "2": "Март",
                    "3": "Апрель",
                    "4": "Май",
                    "5": "Июнь",
                    "6": "Июль",
                    "7": "Август",
                    "8": "Сентябрь",
                    "9": "Октябрь",
                    "10": "Ноябрь",
                    "11": "Декабрь",
                },
                "EN":{
                    "0": "January",  
                    "1": "February",
                    "2": "March",
                    "3": "April",
                    "4": "May",
                    "5": "June", 
                    "6": "July",
                    "7": "August",
                    "8": "September",
                    "9": "October",
                    "10": "November",
                    "11": "December",

                },
                "BE":{
                    "0": "Студзень",
                    "1": "Люты",
                    "2": "Сакавiк",
                    "3": "Красавiк",
                    "4": "Май",
                    "5": "Червень",
                    "6": "Лiпень",
                    "7": "Жнiвень",
                    "8": "Верасень",
                    "9": "Кастрычнiк",
                    "10": "Лiстапад",
                    "11": "Снежань",
                },
            },
            weekDay: {
                "RU": {
                    fullName: {
                        "0": "Воскресенье",
                        "1": "Понедельник",
                        "2": "Вторник",
                        "3": "Среда",
                        "4": "Четверг",
                        "5": "Пятница",
                        "6": "Суббота",
                        
                    },

                    shortName: {
                        "0": "Вс",
                        "1": "Пн",
                        "2": "Вт",
                        "3": "Ср",
                        "4": "Чт",
                        "5": "Пт",
                        "6": "Сб",
                    
                    }
                    
                },
                "EN": {
                    fullName: {
                        0: "Sunday",
                        1: "Monday",
                        2: "Thuesday",
                        3: "Wednesday",
                        4: "Thursday",
                        5: "Friday",
                        6: "Saturday",
                    },
                    shortName: {
                       0: "Sun",
                       1: "Mon", 
                       2: "Thues",
                       3: "Wedn",
                       4: "Thur", 
                       5: "Fri", 
                       6: "Sat",
                    }
                },
                "BE": {
                    fullName: {
                        0:" Нядзеля",
                        1: "Панядзелак",
                        2: "Аўторак",
                        3: "Cерада",
                        4: "Чацьвер",
                        5: "Пятніца",
                        6: "Сыбота",
                    },
                    shortName: {
                        0:" Нд",
                        1: "Пн",
                        2: "Аў",
                        3: "Cр",
                        4: "Чц",
                        5: "Пт",
                        6: "Сб",
                    }
                }
            },
        }
        this.time = setInterval(() => {
            const date      = new Date();
            const dayWeek   = obj.weekDay[lang].shortName[date.getDay()];
            const dateToday = date.getDate();
            const month     = obj.month[lang][date.getMonth()];

            const seconds   = checkZero(date.getSeconds());
            const minutes   = checkZero(date.getMinutes());
            const hours     = checkZero(date.getHours()); 

            this.currentDate.textContent   = `${month} ${dateToday} ${dayWeek}, ${hours}:${minutes}:${seconds}`;
           
            this.firstDayName.textContent  = obj.weekDay[lang].fullName[(date.getDay() + 1) % 7];
            this.secondDayName.textContent = obj.weekDay[lang].fullName[(date.getDay() + 2) % 7];
            this.thirdDayName.textContent  = obj.weekDay[lang].fullName[(date.getDay() + 3) % 7]; 
        },1000);

        function checkZero(number) {
            return number > 9 ? number : `0${number}`;
        }
    }

    drawWeatherImage(main,weather,element) {
        console.log(main, weather. element)
       switch(main) {
            case "Clear":
            element.innerHTML = `<svg version="1.1" fill="#ffffff" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 22.006 22.006" style="enable-background:new 0 0 22.006 22.006;" xml:space="preserve">
       <g>
           <g>
               <path d="M4.63,6.045c0.394,0.393,1.028,0.399,1.421,0.006c0.39-0.39,0.393-1.021-0.007-1.421l-1.4-1.4
                   C4.249,2.835,3.617,2.829,3.223,3.223c-0.391,0.39-0.394,1.02,0.007,1.421L4.63,6.045z"/>
               <path d="M20.997,10.003h-1.98c-0.559,0-1.011,0.444-1.011,1c0,0.553,0.443,1,1.011,1h1.98
                   c0.559,0,1.009-0.443,1.009-1C22.006,10.451,21.562,10.003,20.997,10.003z"/>
               <path d="M4,11.003c0-0.552-0.444-1-1.01-1H1.009c-0.558,0-1.009,0.444-1.009,1c0,0.553,0.443,1,1.009,1
                   H2.99C3.548,12.003,4,11.56,4,11.003z"/>
               <path d="M11.003,5c-3.313,0-6,2.687-6,6s2.687,6,6,6c3.312,0,6-2.687,6-6S14.315,5,11.003,5z M11.003,15
                   c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S13.212,15,11.003,15z"/>
               <path d="M4.63,15.962l-1.4,1.4c-0.395,0.395-0.401,1.027-0.007,1.421c0.391,0.39,1.021,0.393,1.421-0.007
                   l1.4-1.4c0.395-0.395,0.401-1.027,0.007-1.421C5.66,15.563,5.03,15.562,4.63,15.962z"/>
               <path d="M17.376,6.045l1.4-1.401c0.395-0.395,0.399-1.027,0.007-1.421c-0.392-0.39-1.021-0.393-1.421,0.007
                   l-1.4,1.4c-0.395,0.395-0.4,1.028-0.007,1.421C16.347,6.441,16.976,6.444,17.376,6.045z"/>
               <path d="M11.003,18.006c-0.553,0-1,0.444-1,1.011v1.98c0,0.559,0.444,1.009,1,1.009
                   c0.553,0,1-0.442,1-1.009v-1.98C12.003,18.458,11.56,18.006,11.003,18.006z"/>
               <path d="M17.376,15.962c-0.395-0.395-1.027-0.4-1.421-0.007c-0.39,0.392-0.394,1.021,0.007,1.421l1.4,1.4
                   c0.395,0.395,1.027,0.399,1.421,0.007c0.391-0.39,0.394-1.021-0.007-1.421L17.376,15.962z"/>
               <path d="M11.003,4c0.553,0,1-0.443,1-1.01V1.01c0-0.558-0.443-1.01-1-1.01c-0.553,0-1,0.444-1,1.01v1.98
                   C10.003,3.548,10.447,4,11.003,4z"/>
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
       `

            break;
            case "Thunderstorm":

            break;
            case "Drizzle":

            break;
            case "Snow":

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

            break;
            case "Clouds": 
            
            const humidity = parseInt(this.humidity.textContent.split(":")[1]);
        
                if(humidity <= 25) {

                  element.innerHTML = `
                  <svg fill="#ffffff" width="68" height="46" viewBox="0 0 68 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75417 3.21371C12.6163 -0.0118243 19.1174 0.319773 23.7063 3.99749C19.3359 4.90185 15.2932 7.82593 13.0533 12.1367C11.8788 14.4277 11.3325 17.0805 11.3598 19.7333C8.02732 20.7582 4.968 23.2301 3.38371 26.6667C0.925323 23.0493 0.0239161 18.2863 0.843377 13.8851C1.66284 9.45377 4.2578 5.44446 7.78148 3.21371H7.75417Z" fill="#FF8841" stroke="#FF8841" stroke-width="0.1"/>
<path d="M23.2894 3.78279C29.6532 2.38867 36.809 5.35874 40.223 11.6625C44.3745 8.63187 50.3832 9.14709 53.9338 13.1779C55.3814 14.7841 56.3373 16.9359 56.5558 19.2392C60.5434 19.7848 64.3671 22.3911 66.3063 26.3916C67.945 29.7254 68.0269 33.9683 66.4428 37.3627C64.2578 42.1209 59.5055 45 54.7532 45H14.6041C9.96102 45 5.18137 42.2118 2.99639 37.5445C1.35765 34.2108 1.35765 29.9678 2.99639 26.5735C4.55319 23.1185 7.63948 20.6334 10.917 19.6029C10.917 16.9359 11.4632 14.2689 12.6649 11.9656C14.8499 7.63175 18.9468 4.69199 23.2621 3.78279H23.2894ZM46.0679 24.4823C44.2653 25.1491 42.927 27.0887 42.8996 29.2405C41.3702 29.8466 39.9772 31.271 39.9772 33.1804C39.8953 35.6049 41.9983 37.4233 44.0741 37.4233H56.9108C57.8668 37.4233 58.8227 37.1809 59.6421 36.5141C61.0077 35.6049 61.6632 33.6047 61.0623 31.9681C60.5707 30.3618 59.1505 29.4526 57.7848 29.1192C57.5117 28.301 57.2386 27.4221 56.5558 26.9069C55.3814 25.8764 53.7153 25.8764 52.4589 26.6644C51.0933 24.4217 48.3621 23.4822 46.0679 24.452V24.4823Z" fill="#E4E3E3" stroke="#E4E3E3" stroke-width="0.1"/>
<path d="M45.8249 24.6247C48.1591 23.6144 50.9713 24.5635 52.3774 26.829C53.6992 26.033 55.4146 26.033 56.5957 27.0739C57.3269 27.5944 57.6081 28.4822 57.8894 29.3088C59.2955 29.6149 60.7578 30.5334 61.264 32.156C61.8827 33.8092 61.1797 35.8298 59.8017 36.7482C58.958 37.4218 57.9737 37.6667 56.9895 37.6667H43.772C41.6347 37.6667 39.4693 35.8298 39.5537 33.3806C39.5537 31.4518 40.9598 30.0129 42.5909 29.4006C42.5909 27.2576 43.997 25.2676 45.8249 24.5635V24.6247Z" fill="#ACA6A6" stroke="#ACA6A6" stroke-width="0.1"/>
</svg>      `
                }else if(humidity <= 50) {
                    element.innerHTML = `
                    <svg fill=""#ffffff version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
               <g>
                   <path style="fill:#030104;" d="M27.586,14.212C26.66,11.751,24.284,10,21.5,10c-0.641,0-1.26,0.093-1.846,0.266
                       C18.068,7.705,15.233,6,12,6c-4.905,0-8.893,3.924-8.998,8.803C1.208,15.842,0,17.783,0,20c0,3.312,2.687,6,6,6h20
                       c3.312,0,6-2.693,6-6C32,17.234,30.13,14.907,27.586,14.212z M26.003,24H5.997C3.794,24,2,22.209,2,20
                       c0-1.893,1.318-3.482,3.086-3.896C5.03,15.745,5,15.376,5,15c0-3.866,3.134-7,7-7c3.162,0,5.834,2.097,6.702,4.975
                       C19.471,12.364,20.441,12,21.5,12c2.316,0,4.225,1.75,4.473,4h0.03C28.206,16,30,17.791,30,20C30,22.205,28.211,24,26.003,24z"/>
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
                    `
                }else if(humidity <= 100) {
                    console.log(humidity <= 100, humidity);
                    element.innerHTML = `<svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
               <g>
                   <path d="M512,335.5c0,35.344-28.656,64-64,64v0.5H176c-44.188,0-80-35.812-80-80c0-38.75,27.563-71.063,64.156-78.406
                       c0-0.531-0.156-1.031-0.156-1.594c0-53.031,42.969-96,96-96c37.438,0,69.5,21.625,85.344,52.875
                       C349.719,193.937,358.594,192,368,192c43.844,0,79.344,35.25,79.906,79H448v0.5C483.344,271.5,512,300.156,512,335.5z
                        M129.906,217.938c7.406-42.563,36.156-77.594,74.563-94.625C191.188,116.219,176.156,112,160,112c-53.031,0-96,42.969-96,96
                       c0,0.563,0.156,1.063,0.156,1.594C27.563,216.938,0,249.25,0,288c0,42.469,33.188,76.844,74.938,79.5
                       C68.125,353.031,64,337.031,64,320C64,275.438,90.594,235.75,129.906,217.938z"/>
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
               </svg>`
                }
            break;
            case "Rain":
                element.innerHTML = `<svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
           <g>
               <g>
                   <path d="M20,25.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.443,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                       C21,25.952,20.557,25.5,20,25.5z"/>
                   <path d="M12,25.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.444,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                       C13,25.952,12.556,25.5,12,25.5z"/>
                   <path d="M24,23.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.443,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                       C25,23.952,24.557,23.5,24,23.5z"/>
                   <path d="M16,23.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.444,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                       C17,23.952,16.557,23.5,16,23.5z"/>
                   <path d="M8,23.5c-0.553,0-1,0.443-1,1.01v1.98c0,0.558,0.444,1.01,1,1.01c0.553,0,1-0.443,1-1.01v-1.98
                       C9,23.952,8.556,23.5,8,23.5z"/>
                   <path d="M27.586,10.712C26.66,8.251,24.284,6.5,21.5,6.5c-0.641,0-1.26,0.093-1.846,0.266
                       C18.068,4.205,15.233,2.5,12,2.5c-4.904,0-8.894,3.924-8.998,8.803C1.207,12.342,0,14.283,0,16.5c0,3.312,2.687,6,6,6h20
                       c3.312,0,6-2.693,6-6C32,13.735,30.13,11.407,27.586,10.712z M26.003,20.5H5.997C3.794,20.5,2,18.709,2,16.5
                       c0-1.892,1.317-3.482,3.087-3.896C5.029,12.245,5,11.876,5,11.5c0-3.866,3.134-7,7-7c3.162,0,5.834,2.097,6.702,4.975
                       C19.471,8.864,20.441,8.5,21.5,8.5c2.316,0,4.225,1.75,4.473,4h0.03c2.203,0,3.997,1.791,3.997,4
                       C30,18.705,28.211,20.5,26.003,20.5z"/>
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
           `
                switch(weather) {
                    case "light rain  небольшой дождь":
                    case "moderate rain":
                    case "heavy intensity rain":
                    case "very heavy rain":
                    case "extreme rain":
                    
                    break;
                    case "freezing rain":

                    break;
                    case "light intensity shower rain":
                    case "shower rain":
                    case "heavy intensity shower rain":
                    case "ragged shower rain":

                    break;
                }
            break;
        }
    }
}
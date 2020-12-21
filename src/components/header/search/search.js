import template from "./search.html";
import "./search.scss";

export default class Search {
    constructor() {
        this.element     = null;
        this.button      = null;
        this.searchArea  = null;
        this.searchInput = null;
        this.langWrongInputPlaceholder = {
            EN:"Invalid value",
            RU:"Неверный ввод",
            BE:"Няправільны ўвод",
        }
        this.langInputPlaceholder = {
            EN: "Search city or ZIP",
            RU: "Искать по городу или по индексу",
            BE: "Шукаць па горадзе ці па індэксе",
        }
    }


    init() {
        const container                = document.createElement("div");
        container.innerHTML            = template;
        this.element                   = container.querySelector(".search-form");
        this.button                    = this.element.querySelector('.search__button');
        this.searchArea                = this.element.querySelector('.search-area');
        this.searchInput               = this.element.querySelector('.search__input');
        this.microButton               = this.element.querySelector('.micro');
       

        this.recognizer                = new webkitSpeechRecognition();
        this.recognizer.interimResults = true;

    }

    changeLangForSearchPlaceHolder(lang,isWrongInput = false) {
        if(isWrongInput) {
            this.searchInput.placeholder = this.langWrongInputPlaceholder[lang];
        }else{
            this.searchInput.placeholder = this.langInputPlaceholder[lang];
        }
    }

    setRecognizerLang(lang) {
        const objLang = {
            RU: "ru-Ru",
            EN: "en-En",
            BE: "be-Be",
        }
        this.recognizer.lang = objLang[lang];
    } 

    getElement() {
        return this.element;
    }
    getValueSearch() {
        return this.searchInput.value.toLowerCase();
    }
    changeLangForSearchButton(lang) {
        const langObj = {
            EN:"Search",
            RU:"Поиск",
            BE:"Пошук",
        }
        this.button.textContent = langObj[lang];
    }
   
    
}
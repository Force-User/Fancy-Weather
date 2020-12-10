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

        this.handleEvents();

        // this.getImage();
        this.getWather();
    }

    getWather() {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=Gomel&lang=ua&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27`;
        fetch(url)
        .then(data => data.json())
        .then(data => console.log(data));
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
        const selectLanguage = this.header.parameters.getElement();
        selectLanguage.addEventListener('click', (e) => {
            const selectedElement = e.target.closest("button");
            console.log(selectedElement)
            if(selectLanguage) {
                console.log(this.header.parameters.langSelect)
                this.header.parameters.langSelect.toggleActiveButton();
                this.header.parameters.langSelect.toggleActiveSelect();
            }
        })
        
    }
}
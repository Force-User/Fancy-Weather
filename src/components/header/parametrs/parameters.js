import LangSelect from "./change-lang/lang-buttons";
import TemperatureButtons from "./change-unit-temperature/unit-temperature";
import template from "./parameters.html";
import "./parameters.scss";
import RefreshButton from "./refresh-weather/refresh";

export default class Parametrs {
  constructor() {
    this.element            = null;
    this.areaButtons        = null;
    this.refresh            = new RefreshButton();
    this.langSelect         = new LangSelect();
    this.temperatureButtons = new TemperatureButtons();``
  }

  init() {
    const container     = document.createElement("div");
    container.innerHTML = template;
    this.element        = container.querySelector(".parameters-buttons");

    this.refresh.init();
    this.langSelect.init();
    this.temperatureButtons.init();
    

    this.element.append(
      this.refresh.element,
      this.langSelect.element,
      this.temperatureButtons.element
    );
  }

  getElement() {
    return this.element;
  }
}

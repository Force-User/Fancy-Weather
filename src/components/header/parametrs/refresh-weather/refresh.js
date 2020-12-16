import template from "./refresh.html";
import "./refresh.scss";

export default class RefreshButton {
    constructor() {
        this.element      = null;
        this.refreshImage = null;
    }

    init() {
        const container     = document.createElement('div');
        container.innerHTML = template;
        this.element        = container.querySelector('.refresh');
        this.refreshImage   = this.element.querySelector('.refresh__image');
    }

    getElement() {
        return this.element;
    }


    animateRefresh() {
        this.refreshImage.classList.add("refresh__image--active");
    }
    removeAnimateRefresh() {
        this.refreshImage.classList.remove("refresh__image--active");
    }

    stopAnimateRefresh() {
        this.refreshImage.classList.remove('refresh__image--active');
    }
}
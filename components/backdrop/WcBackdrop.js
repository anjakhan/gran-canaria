var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
let WcBackdrop = class WcBackdrop extends LitElement {
    constructor() {
        super();
    }
    ;
    static get styles() {
        return css `
      :host, :host * {
          box-sizing: border-box;
      }
      :host  {
          position: absolute;
          left:0;
          top:0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 89;
      }
    `;
    }
    ;
    cancelMouse(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("mousedown", this.cancelMouse);
        this.addEventListener("mouseup", this.cancelMouse);
        this.addEventListener("mousemove", this.cancelMouse);
    }
    ;
    disconnectedCallback() {
        this.removeEventListener("mousedown", this.cancelMouse);
        this.removeEventListener("mouseup", this.cancelMouse);
        this.removeEventListener("mousemove", this.cancelMouse);
        super.disconnectedCallback();
    }
    ;
    render() {
        return html ``;
    }
    ;
};
WcBackdrop = __decorate([
    customElement("wc-backdrop")
], WcBackdrop);
export { WcBackdrop };
;
//# sourceMappingURL=WcBackdrop.js.map
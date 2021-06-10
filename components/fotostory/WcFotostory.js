var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fotostoryStyles } from "./fotostoryStyles";
let WcFotostory = class WcFotostory extends LitElement {
    constructor(fotostory) {
        super();
        this.fotostory = fotostory;
    }
    static get styles() {
        return [fotostoryStyles];
    }
    ;
    ;
    render() {
        var _a;
        return html `
    ${this.fotostory ? html `
      <div class="fotostory-container">
        <h1 class="title">${this.fotostory.headline}</h1>
        ${this.fotostory.story ? html `<p style="text-align: justify;">${this.fotostory.story}</p>` : ''}
        <div class="image-container">
          ${(_a = this.fotostory.images) === null || _a === void 0 ? void 0 : _a.map((img) => html `<img src=${img} alt="fuerte">`)}
        </div>
        
        
      </div>
    ` : html `
      <div style="margin-top: 50px;">
        <lottie-player class="lottie" src="https://assets1.lottiefiles.com/packages/lf20_ORPnX5.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
      </div>`}      
    `;
    }
    ;
};
__decorate([
    property({ type: Object })
], WcFotostory.prototype, "fotostory", void 0);
WcFotostory = __decorate([
    customElement("wc-fotostory")
], WcFotostory);
export { WcFotostory };
;
//# sourceMappingURL=WcFotostory.js.map
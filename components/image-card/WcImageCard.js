var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let WcImageCard = class WcImageCard extends LitElement {
    constructor(imageUrl, sightseeing) {
        super(),
            this.imageUrl = imageUrl;
        this.sightseeing = sightseeing;
    }
    static get styles() {
        return [css `
      .card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white;
        min-width: 300px;
        border: 1px solid #ccc;
      }

      .sightseeing-image {
        width: 100%;
        height: 300px;
        margin-bottom: 10px;
        background-repeat: no-repeat;
        content: cover;
        border: 1px solid #ccc;
      }
    `];
    }
    ;
    render() {
        return html `
      <div class="card-container">
        <div class="sightseeing-image" style="background: url(${this.imageUrl}); background-size: cover"></div>

        <p>${this.imageUrl?.split(this.sightseeing + "/")[1].split(".")[0].split("-600")[0].replaceAll("-", " ").replaceAll("%C3%B6", "ö").replaceAll("%20", " ")}</p>
      </div>
    `;
    }
    ;
};
__decorate([
    property({ type: String })
], WcImageCard.prototype, "imageUrl", void 0);
__decorate([
    property({ type: String })
], WcImageCard.prototype, "sightseeing", void 0);
WcImageCard = __decorate([
    customElement("wc-image-card")
], WcImageCard);
export { WcImageCard };
;
//# sourceMappingURL=WcImageCard.js.map
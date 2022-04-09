var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let WcImageCard = class WcImageCard extends LitElement {
    constructor(imageUrl) {
        super(),
            this.imageUrl = imageUrl;
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
        cursor: pointer;
        min-width: 300px;
        border: 1px solid #555;
      }
      .card-container:hover {
        box-shadow: 5px 5px 8px #888888;
        transform: scale(1.01);
      }

      .sightseeing-image {
        width: 100%;
        height: 300px;
        margin-bottom: 10px;
        background-repeat: no-repeat;
        content: cover;
      }

      .bullet-point {
        margin-bottom: 10px;
      }
      .bullet-point-title {
        font-weight: bold;
      }

      .map-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 1em;
      }
      .map-icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    `];
    }
    ;
    render() {
        return html `
      <div class="card-container">
        <div class="sightseeing-image" style="background: url(${this.imageUrl}); background-size: cover"></div>

        <h3>${this.imageUrl}</h3>
      </div>
    `;
    }
    ;
};
__decorate([
    property({ type: String })
], WcImageCard.prototype, "imageUrl", void 0);
WcImageCard = __decorate([
    customElement("wc-image-card")
], WcImageCard);
export { WcImageCard };
;
//# sourceMappingURL=WcImageCard.js.map
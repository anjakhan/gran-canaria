var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let WcSightseeingCard = class WcSightseeingCard extends LitElement {
    constructor(sightseeing) {
        super(),
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
        cursor: pointer;
        min-width: 300px;
      }
      .card-container:hover {
        box-shadow: 5px 5px 8px #ccc;
        transform: scale(1.01);
      }

      .sightseeing-image {
        width: 100%;
        height: 300px;
        margin-bottom: 10px;
        background-repeat: no-repeat;
        content: cover;
        border: 1px solid #ccc;
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
        const sightseeing = this.sightseeing;
        return html `
      <div class="card-container" @click=${() => location.hash = "#" + this.sightseeing.hash}>
        <div class="sightseeing-image" style="background: url(${sightseeing.image}); background-size: cover"></div>
        <!-- <img src=${sightseeing.image} alt=${sightseeing.name}> -->

        <h3>${sightseeing.name}</h3>

        <div class="map-info">
          <wc-icon icon="map-duotone" primaryColor="gray" class="map-icon"></wc-icon>
          [${sightseeing.location[0].toFixed(4)}, ${sightseeing.location[1].toFixed(4)}]
          - ${sightseeing.orientation}
        </div>
      </div>
    `;
    }
    ;
};
__decorate([
    property({ type: Object })
], WcSightseeingCard.prototype, "sightseeing", void 0);
WcSightseeingCard = __decorate([
    customElement("wc-sightseeing-card")
], WcSightseeingCard);
export { WcSightseeingCard };
;
//# sourceMappingURL=WcSightseeingCard.js.map
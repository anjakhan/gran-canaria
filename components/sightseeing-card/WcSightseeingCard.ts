import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Sightseeing } from "../../pages/all-island-page/WcAllIslandPage";


@customElement("wc-sightseeing-card")
export class WcSightseeingCard extends LitElement {
  static get styles() {
    return [css`
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
  };

  @property({ type: Object }) sightseeing: Sightseeing;

  constructor(sightseeing: Sightseeing) {
    super(),

      this.sightseeing = sightseeing;
  }

  render(): TemplateResult {
    const sightseeing = this.sightseeing;
    return html`
      <div class="card-container">
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
  };
};
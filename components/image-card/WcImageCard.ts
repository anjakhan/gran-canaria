import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement("wc-image-card")
export class WcImageCard extends LitElement {
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

  @property({ type: String }) imageUrl: string;

  constructor(imageUrl: string) {
    super(),

      this.imageUrl = imageUrl;
  }

  render(): TemplateResult {
    return html`
      <div class="card-container">
        <div class="sightseeing-image" style="background: url(${this.imageUrl}); background-size: cover"></div>

        <h3>${this.imageUrl}</h3>
      </div>
    `;
  };
};
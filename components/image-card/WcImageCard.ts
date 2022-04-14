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
  };

  @property({ type: String }) imageUrl: string;
  @property({ type: String }) sightseeing: string;

  constructor(imageUrl: string, sightseeing: string) {
    super(),

      this.imageUrl = imageUrl;
    this.sightseeing = sightseeing;
  }

  render(): TemplateResult {
    return html`
      <div class="card-container">
        <div class="sightseeing-image" style="background: url(${this.imageUrl}); background-size: cover"></div>

        <p>${this.imageUrl?.split(this.sightseeing + "/")[1].split(".")[0].split("-600")[0].replaceAll("-", " ").replaceAll("%C3%B6", "ö").replaceAll("%20", " ")}</p>
      </div>
    `;
  };
};
import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Sightseeing } from "../all-island-page/WcAllIslandPage";
import { createToDoMap } from "../../code/leaflet";
import { mapStyles } from "../all-island-page/map-styles";
import { WcImageCard } from "../../components/image-card/WcImageCard";

type callbackType = (showAll: boolean) => void;

@customElement("wc-details-page")
export class WcDetailsPage extends LitElement {
  static get styles() {
    return [mapStyles, css`
      .details-page {
        display: grid;
        grid-template-columns: 40% auto;
        grid-template-rows: auto auto 1fr;
        grid-gap: 20px;
        width: 100%;
        color: #555;
      }

      .title {
        position: relative;
        text-align: center;
        padding-right: 150px;
        grid-row: 1;
        grid-column: 1 / 3;
      }

      .map-container {
        position: relative;
        height: 300px;
        width: 100%;
        grid-row: 2;
        grid-column: 1;
      }

      .details-container {
        grid-row: 2;
        grid-column: 2;
      }

      .cards-container {
        grid-row: 3;
        grid-column: 1 / 3;
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      }

      .back-icon {
        position: absolute;
        width: 30px;
        height: 100%;
        margin-right: 10px;
        cursor: pointer;
      }
    `];
  };

  @property({ type: Object }) sightseeing: Sightseeing;
  @property({ type: Array }) images: string[];

  @query('#mapid') mapid: HTMLDivElement;
  @query('.map-container') mapContainer: HTMLDivElement;

  callback: callbackType | undefined;

  constructor(sightseeing: Sightseeing) {
    super();

    this.sightseeing = sightseeing;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.sightseeing && this.getPics(this.sightseeing.foldername);
    this.renderMap();
  }

  getPics(foldername: string) {
    let urlList: Array<string> = [];
    fetch(`https://api.github.com/repos/anjakhan/gran-canaria/contents/assets/sightseeings/${foldername}?ref=main`)
      .then(response => response.json())
      .then(data => {
        data.forEach((foto: { download_url: string }) => urlList.push(foto.download_url)) // Prints result from `response.json()` in getRequest
      })
      .catch(error => console.error(error))

    setTimeout(() => this.images = urlList, 1000);
  };

  getDetailsPage(callback: callbackType): void {
    this.callback = callback;
  };

  goBackToSightseeings(): void {
    if (this.callback) {
      this.callback(true);
    };
  };

  renderMap() {
    const mapContainer = document.createElement('div');
    mapContainer.setAttribute('id', 'mapid');
    mapContainer.style.height = '100%';
    mapContainer.style.width = '100%';

    this.mapContainer?.appendChild(mapContainer);

    createToDoMap(mapContainer, [this.sightseeing]);
  };

  renderImageCard(imageUrl: string): LitElement {
    const td = new WcImageCard(imageUrl, this.sightseeing.foldername);
    return td;
  }

  render(): TemplateResult {
    const sightseeing = this.sightseeing;
    return html`
      <div class="details-page">
        <h1 class="title">
          <wc-icon icon="arrow-left" primaryColor="gray" class="back-icon" @click=${this.goBackToSightseeings}></wc-icon>
          ${sightseeing.name}
        </h1>

        <div class="map-container">${this.renderMap()}</div>

        <div class="details-container">
          Name: ${sightseeing.name}
        </div>

        <div class="cards-container">
          ${this.images?.map(c => this.renderImageCard(c))}
        </div>
        
        
      </div>
    `;
  };
};

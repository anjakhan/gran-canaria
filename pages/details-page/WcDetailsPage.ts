import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Sightseeing } from "../all-island-page/WcAllIslandPage";
import { createToDoMap } from "../../code/leaflet";
import { mapStyles } from "./map-styles";
import '../../components/map-component/WcMapComponent';
import { WcImageCard } from "../../components/image-card/WcImageCard";

@customElement("wc-details-page")
export class WcDetailsPage extends LitElement {
  static get styles() {
    return [mapStyles, css`
      .details-page {
        display: grid;
        grid-template-columns: 500px auto;
        grid-template-rows: auto auto 1fr;
        grid-gap: 20px;
        width: 100%;
        color: #555;
      }

      .title {
        text-align: center;
        padding-right: 150px;
        grid-row: 1;
        grid-column: 1 / 3;
      }

      .map-container {
        position: relative;
        height: 300px;
        width: 500px;
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
    `];
  };

  @property({ type: Object }) sightseeing: Sightseeing;
  @property({ type: Array }) images: string[];

  @query('#mapid') mapid: HTMLDivElement;

  renderMap() {
    const mapContainer = document.createElement('div');
    mapContainer.setAttribute('id', 'mapid');
    mapContainer.style.height = '100%';
    mapContainer.style.width = '100%';

    createToDoMap(mapContainer);

    return mapContainer;
  };

  constructor(sightseeing: Sightseeing) {
    super();

    this.sightseeing = sightseeing;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.sightseeing && this.getPics(this.sightseeing.foldername);
  }

  getPics(foldername: string) {
    console.log(foldername)
    let urlList: Array<string> = [];
    fetch(`https://api.github.com/repos/anjakhan/gran-canaria/contents/assets/${foldername}`)
      .then(response => response.json())
      .then(data => {
        data.forEach((foto: { download_url: string }) => urlList.push(foto.download_url)) // Prints result from `response.json()` in getRequest
      })
      .catch(error => console.error(error))
    setTimeout(() => this.images = urlList, 2000);
  };

  renderImageCard(imageUrl: string): LitElement {
    const td = new WcImageCard(imageUrl);
    return td;
  }

  render(): TemplateResult {
    const sightseeing = this.sightseeing;
    const images = this.images;
    return html`
      <div class="details-page">
        <h1 class="title">${sightseeing.name}</h1>

        <div class="map-container">${this.renderMap()}</div>

        <div class="details-container">
          Name: ${sightseeing.name}
        </div>

        <div class="cards-container">
          ${images?.map(c => this.renderImageCard(c))}
        </div>
        
        
      </div>
    `;
  };
};

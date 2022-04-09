var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { createToDoMap } from "../../code/leaflet";
import { mapStyles } from "./map-styles";
import '../../components/map-component/WcMapComponent';
import { WcImageCard } from "../../components/image-card/WcImageCard";
let WcDetailsPage = class WcDetailsPage extends LitElement {
    constructor(sightseeing) {
        super();
        this.sightseeing = sightseeing;
    }
    static get styles() {
        return [mapStyles, css `
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
    }
    ;
    renderMap() {
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'mapid');
        mapContainer.style.height = '100%';
        mapContainer.style.width = '100%';
        createToDoMap(mapContainer);
        return mapContainer;
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.sightseeing && this.getPics(this.sightseeing.foldername);
    }
    getPics(foldername) {
        console.log(foldername);
        let urlList = [];
        fetch(`https://api.github.com/repos/anjakhan/gran-canaria/contents/assets/${foldername}`)
            .then(response => response.json())
            .then(data => {
            data.forEach((foto) => urlList.push(foto.download_url));
        })
            .catch(error => console.error(error));
        setTimeout(() => this.images = urlList, 2000);
    }
    ;
    renderImageCard(imageUrl) {
        const td = new WcImageCard(imageUrl);
        return td;
    }
    render() {
        const sightseeing = this.sightseeing;
        const images = this.images;
        return html `
      <div class="details-page">
        <h1 class="title">${sightseeing.name}</h1>

        <div class="map-container">${this.renderMap()}</div>

        <div class="details-container">
          Name: ${sightseeing.name}
        </div>

        <div class="cards-container">
          ${images === null || images === void 0 ? void 0 : images.map(c => this.renderImageCard(c))}
        </div>
        
        
      </div>
    `;
    }
    ;
};
__decorate([
    property({ type: Object })
], WcDetailsPage.prototype, "sightseeing", void 0);
__decorate([
    property({ type: Array })
], WcDetailsPage.prototype, "images", void 0);
__decorate([
    query('#mapid')
], WcDetailsPage.prototype, "mapid", void 0);
WcDetailsPage = __decorate([
    customElement("wc-details-page")
], WcDetailsPage);
export { WcDetailsPage };
;
//# sourceMappingURL=WcDetailsPage.js.map
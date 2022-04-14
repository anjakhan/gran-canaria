var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { createToDoMap } from "../../code/leaflet";
import { mapStyles } from "../../components/map-component/map-styles";
import { WcImageCard } from "../../components/image-card/WcImageCard";
import { WcIcon } from "../../components/icons/WcIcon";
let WcDetailsPage = class WcDetailsPage extends LitElement {
    constructor(sightseeing) {
        super();
        this.sightseeing = sightseeing;
    }
    static get styles() {
        return [mapStyles, css `
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
        border: 1px solid #ccc;
      }

      .details-container {
        grid-row: 2;
        grid-column: 2;
        text-align: justify;
      }
      .details-container > span {
        font-weight: bold;
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
        width: 40px;
        height: 100%;
        margin-right: 10px;
        cursor: pointer;
      }

      .link-icon {
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 100%;
        margin-right: 10px;
        cursor: pointer;
      }

      .map-icon {
        width: 30px;
        height: 30px;
        margin: 0px 10px;
      }
    `];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.sightseeing && this.getPics(this.sightseeing.foldername);
        this.renderMap();
    }
    getPics(foldername) {
        let urlList = [];
        fetch(`https://api.github.com/repos/anjakhan/gran-canaria/contents/assets/sightseeings/${foldername}?ref=main`)
            .then(response => response.json())
            .then(data => {
            data.forEach((foto) => urlList.push(foto.download_url));
        })
            .catch(error => console.error(error));
        setTimeout(() => this.images = urlList, 1000);
    }
    ;
    getDetailsPage(callback) {
        this.callback = callback;
    }
    ;
    goBackToSightseeings() {
        location.hash = "#" + this.sightseeing.topic;
        if (this.callback) {
            this.callback(true);
        }
        ;
    }
    ;
    renderMap() {
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'mapid');
        mapContainer.style.height = '100%';
        mapContainer.style.width = '100%';
        this.mapContainer?.appendChild(mapContainer);
        createToDoMap(mapContainer, "hikingmap", [this.sightseeing], this.sightseeing?.location, 15);
        const layerBtn = mapContainer.querySelector("a.leaflet-control-layers-toggle");
        if (layerBtn) {
            layerBtn.style.width = "30px";
            layerBtn.style.height = "30px";
            layerBtn.style.padding = "5px 7px";
            const icon = new WcIcon();
            icon.primaryColor = "black";
            icon.icon = "layer-group";
            layerBtn.appendChild(icon);
        }
    }
    ;
    renderImageCard(imageUrl) {
        const td = new WcImageCard(imageUrl, this.sightseeing.foldername);
        return td;
    }
    render() {
        const sightseeing = this.sightseeing;
        return html `
      <div class="details-page">
        <h1 class="title">
          <wc-icon icon="square-arrow-left" primaryColor="hovergray" class="back-icon" @click=${this.goBackToSightseeings}></wc-icon>
          ${sightseeing.name}
          ${sightseeing.link ? html `
            <wc-icon icon="arrow-up-right-from-square" primaryColor="hovergray" class="link-icon" @click=${() => window.open(sightseeing.link, "_blank")}></wc-icon></span>
          ` : ''}
        </h1>

        <div class="map-container">${this.renderMap()}</div>

        <div class="details-container">
          <span>Name:</span> ${sightseeing.name}
          <br><br>
          <div style="display: flex; flex-direction: row; align-items: center;">
            <span style="font-weight: bold;">Standort: </span>
            <wc-icon icon="map-duotone" primaryColor="gray" class="map-icon"></wc-icon>
            [${sightseeing.location[0].toFixed(4)}, ${sightseeing.location[1].toFixed(4)}]
            - ${sightseeing.orientation}
          </div>
          <br>
          ${sightseeing.tags.length === 0 ? '' : html `
            <span>In der Nähe:</span> ${sightseeing.tags.join(", ")}
          `}
          <br><br>
          ${sightseeing.info ? html `<span>Wissenswertes:</span> ${sightseeing.info || ""}` : ''}
        </div>

        <div class="cards-container">
          ${this.images?.map(c => this.renderImageCard(c))}
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
__decorate([
    query('.map-container')
], WcDetailsPage.prototype, "mapContainer", void 0);
WcDetailsPage = __decorate([
    customElement("wc-details-page")
], WcDetailsPage);
export { WcDetailsPage };
;
//# sourceMappingURL=WcDetailsPage.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { geSightseeingDocs } from "../../code/firebase";
import { createToDoMap } from "../../code/leaflet";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { mapStyles } from "../all-island-page/map-styles";
import { WcDetailsPage } from "../details-page/WcDetailsPage";
let WcTopicPage = class WcTopicPage extends LitElement {
    constructor(topic) {
        super();
        this.showDetails = false;
        this.topic = topic;
    }
    static get styles() {
        return [mapStyles, css `
      .topic-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        color: #555;
      }

      .title {
        text-align: center;
        padding-right: 150px;
      }

      .topic-container {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      }

      .map-container {
        position: relative;
        height: 450px;
        width: 100%;
        grid-row: 2;
        grid-column: 1;
      }
    `];
    }
    ;
    async getSightseeingsFromFirebase() {
        const sightseeings = [];
        try {
            await geSightseeingDocs()
                .then((data) => {
                data.filter((d) => d.topic === this.topic).forEach((doc) => sightseeings.push(doc));
            })
                .catch((error) => console.log('no city docs found', error));
        }
        catch (error) {
            console.log(error);
        }
        this.sightseeings = sightseeings;
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        this.getSightseeingsFromFirebase();
        location.hash = "#" + this.topic;
    }
    renderSightseeingCard(sightseeing) {
        const td = new WcSightseeingCard(sightseeing);
        td.onclick = () => {
            this.sightseeing = sightseeing;
            this.showDetails = true;
        };
        return td;
    }
    renderSightseeingPage() {
        const td = new WcDetailsPage(this.sightseeing);
        td.getDetailsPage(backToSightseeings => this.showDetails = !backToSightseeings);
        return td;
    }
    renderMap() {
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'mapid');
        mapContainer.style.height = '100%';
        mapContainer.style.width = '100%';
        if (!this.mapContainer) {
            setTimeout(() => {
                !this.showDetails && this.mapContainer?.appendChild(mapContainer);
                createToDoMap(mapContainer, this.sightseeings, 10);
            }, 100);
        }
        else {
            this.mapContainer?.appendChild(mapContainer);
            createToDoMap(mapContainer, this.sightseeings, 10);
        }
    }
    ;
    render() {
        return html `
      ${this.showDetails ? this.renderSightseeingPage() : html `
        <div class="topic-page">
          <h1 class="title">${this.topic} auf Gran Canaria</h1>

          <div class="map-container">${this.renderMap()}</div>
          
          <div class="topic-container">${this.sightseeings?.map(c => this.renderSightseeingCard(c))}</div>
        </div>
      `}
    `;
    }
    ;
};
__decorate([
    property({ type: Array })
], WcTopicPage.prototype, "sightseeings", void 0);
__decorate([
    property({ type: Object })
], WcTopicPage.prototype, "sightseeing", void 0);
__decorate([
    property({ type: Boolean })
], WcTopicPage.prototype, "showDetails", void 0);
__decorate([
    property({ type: String })
], WcTopicPage.prototype, "topic", void 0);
__decorate([
    query('#mapid')
], WcTopicPage.prototype, "mapid", void 0);
__decorate([
    query('.map-container')
], WcTopicPage.prototype, "mapContainer", void 0);
WcTopicPage = __decorate([
    customElement("wc-topic-page")
], WcTopicPage);
export { WcTopicPage };
;
//# sourceMappingURL=WcTopicPage.js.map
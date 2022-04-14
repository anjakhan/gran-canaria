var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { createSightseeingDocument } from "../../code/firebase";
import { updateMap } from "../../code/leaflet";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { sightseeings } from "./sightseeings";
let WcAllIslandPage = class WcAllIslandPage extends LitElement {
    constructor() {
        super(...arguments);
        this.topicFilter = "Gran-Canaria";
        this.orientationFilter = "Insel";
        this.triptypeFilter = "Alle";
    }
    static get styles() {
        return [css `
      .all-island-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        color: #555;
      }

      .all-island-container {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      }

      .filter-container {
        display: grid;
        grid-template-columns: auto 1fr 1fr 1fr 1fr auto;
        grid-column-gap: 10px;
        padding: 10px 15px;
        margin: 0 0 20px 0;
        align-items: center;
        background-color: var(--fuerte-aqua);
        border-radius: 4px;
      }

      select, input, .reset-button {
        padding: 5px 7px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-family: Ubuntu, "Open Sans", "Helvetica Neue", sans-serif;
        height: 30px;
      }
      .reset-button {
        background-color: var(--fuerte-background-color);
      }
      .reset-icon {
        width: 18px;
        height: 20px;
        cursor: pointer;
      }
    `];
    }
    ;
    async addSightseeingsToFirebase(sightseeings) {
        sightseeings.forEach(async (c) => {
            try {
                await createSightseeingDocument(c);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
    async connectedCallback() {
        super.connectedCallback();
        this.filteredSightseeings = sightseeings;
        location.hash = "#Gran-Canaria";
    }
    renderSightseeingCard(sightseeing) {
        const td = new WcSightseeingCard(sightseeing);
        td.onclick = () => {
            this.sightseeing = sightseeing;
        };
        return td;
    }
    filterByCategories(name, value) {
        this.searchInput.value = "";
        this.filteredSightseeings = sightseeings;
        if (name === "topic")
            this.topicFilter = value;
        if (name === "orientation")
            this.orientationFilter = value;
        if (name === "triptype")
            this.triptypeFilter = value;
        if (this.topicFilter !== "Gran-Canaria") {
            this.filteredSightseeings = this.filteredSightseeings.filter(s => s.topic === this.topicFilter);
        }
        if (this.orientationFilter !== "Insel") {
            this.filteredSightseeings = this.filteredSightseeings.filter(s => s.orientation === this.orientationFilter);
        }
        if (this.triptypeFilter !== "Alle") {
            this.filteredSightseeings = this.filteredSightseeings.filter(s => s.type === this.triptypeFilter);
        }
        updateMap(this.filteredSightseeings);
    }
    searchThroughSightseeings(search) {
        this.topicFilter = "Gran-Canaria";
        this.orientationFilter = "Insel";
        this.triptypeFilter = "Alle";
        search = search.toLowerCase();
        this.filteredSightseeings = sightseeings.filter(s => s.topic.toLowerCase().includes(search)
            || s.info?.toLowerCase().includes(search)
            || s.name.toLowerCase().includes(search)
            || s.type?.toLowerCase().includes(search)
            || s.tags.filter(t => t.toLowerCase().includes(search)).length > 0);
        updateMap(this.filteredSightseeings);
    }
    resetFilter() {
        this.filteredSightseeings = sightseeings;
        this.topicFilter = "Gran-Canaria";
        this.orientationFilter = "Insel";
        this.triptypeFilter = "Alle";
        this.searchInput.value = "";
        updateMap(sightseeings);
    }
    render() {
        return html `      
      <div class="all-island-page">
        <div class="filter-container">
          <div style="color: white;">Filter:</div>

          <select name="topic" id="topic" .value=${this.topicFilter} @change=${(e) => this.filterByCategories("topic", e.target.value)}>
            <option value="Gran-Canaria">Kategorie ...</option>
            <option value="Städte">Städte</option>
            <option value="Berge">Berge</option>
            <option value="Höhlen">Höhlen</option>
            <option value="Wasser">Wasser</option>
            <option value="Parks">Parks</option>
            <option value="Erlebnisse">Erlebnisse</option>
          </select>

          <select name="orientation" id="orientation" .value=${this.orientationFilter} @change=${(e) => this.filterByCategories("orientation", e.target.value)}>
            <option value="Insel">Lage ...</option>
            <option value="Norden">Norden</option>
            <option value="Osten">Osten</option>
            <option value="Süden">Süden</option>
            <option value="Westen">Westen</option>
            <option value="Zentrum">Zentrum</option>
          </select>

          <select name="triptype" id="triptype" .value=${this.triptypeFilter} @change=${(e) => this.filterByCategories("triptype", e.target.value)}>
            <option value="Alle">Aufwand ...</option>
            <option value="Tagesausflug">Tagesausflug</option>
            <option value="Stadtbesichtigung">Stadtbesichtigung</option>
            <option value="Wanderung">Wanderung</option>
            <option value="Kurze Wanderung">Kurze Wanderung</option>
            <option value="Aussichtspunkt">Aussichtspunkte</option>
            <option value="Museum">Museum</option>
            <option value="Baden">Baden</option>
          </select>

          <input id="searchInput" type="search" placeholder="Suche ..." @input=${(e) => this.searchThroughSightseeings(e.target.value)}>

          <button class="reset-button" @click=${() => this.resetFilter()}>
            <wc-icon class="reset-icon" primaryColor="text" icon="filter-reset"></wc-icon>
          </button>
        </div>

        ${this.filteredSightseeings.length === 0 ? html `
          <p>Keine Sehenswürdigkeiten gefunden!</p>
        ` : html `
          <div class="all-island-container">${this.filteredSightseeings?.map(c => this.renderSightseeingCard(c))}</div>
        `}
      </div>
    `;
    }
    ;
};
__decorate([
    property({ type: Object })
], WcAllIslandPage.prototype, "sightseeing", void 0);
__decorate([
    property({ type: Array })
], WcAllIslandPage.prototype, "filteredSightseeings", void 0);
__decorate([
    property({ type: String })
], WcAllIslandPage.prototype, "topicFilter", void 0);
__decorate([
    property({ type: String })
], WcAllIslandPage.prototype, "orientationFilter", void 0);
__decorate([
    property({ type: String })
], WcAllIslandPage.prototype, "triptypeFilter", void 0);
__decorate([
    query('#searchInput')
], WcAllIslandPage.prototype, "searchInput", void 0);
WcAllIslandPage = __decorate([
    customElement("wc-all-island-page")
], WcAllIslandPage);
export { WcAllIslandPage };
;
//# sourceMappingURL=WcAllIslandPage.js.map
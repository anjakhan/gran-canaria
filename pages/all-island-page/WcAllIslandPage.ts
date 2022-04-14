import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { createSightseeingDocument } from "../../code/firebase";
import { createToDoMap } from "../../code/leaflet";
import { WcIcon } from "../../components/icons/WcIcon";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { mapStyles } from "./map-styles";
import { Orientation, Sightseeing, sightseeings, Topic, TripType } from "./sightseeings";

@customElement("wc-all-island-page")
export class WcAllIslandPage extends LitElement {
  static get styles() {
    return [mapStyles, css`
      .all-island-page {
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

      h2 {
        border-bottom: 1px solid #555;
        padding-bottom: 5px;
      }

      .all-island-container {
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
        border: 1px solid var(--fuerte-background-color);
        border-radius: 4px;
      }

      .filter-container {
        display: grid;
        grid-template-columns: auto 1fr 1fr 1fr 1fr auto;
        grid-column-gap: 10px;
        padding: 10px 15px;
        margin: 20px 0;
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
  };

  @property({ type: Object }) sightseeing: Sightseeing;
  @property({ type: Array }) filteredSightseeings: Sightseeing[];
  @property({ type: String }) topicFilter: Topic = "Gran-Canaria";
  @property({ type: String }) orientationFilter: Orientation = "Insel";
  @property({ type: String }) triptypeFilter: TripType = "Alle";

  @query('#mapid') mapid: HTMLDivElement;
  @query('.map-container') mapContainer: HTMLDivElement;
  @query('#searchInput') searchInput: HTMLInputElement;

  async addSightseeingsToFirebase(sightseeings: Sightseeing[]) {
    sightseeings.forEach(async c => {
      try {
        await createSightseeingDocument(c);
      } catch (error) {
        console.log(error);
      }
    })
  };

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    //await this.addSightseeingsToFirebase(sightseeings);

    this.filteredSightseeings = sightseeings;

    location.hash = "#Gran Canaria";
  }

  renderSightseeingCard(sightseeing: Sightseeing): LitElement {
    const td = new WcSightseeingCard(sightseeing);
    td.onclick = () => {
      this.sightseeing = sightseeing;
    }
    return td;
  }

  renderMap() {
    let mapContainer: HTMLDivElement | null = this.mapContainer?.querySelector("#mapid");
    if (!mapContainer) {
      mapContainer = document.createElement('div');
      mapContainer.setAttribute('id', 'mapid');
      mapContainer.style.height = '100%';
      mapContainer.style.width = '100%';
      mapContainer.style.borderRadius = "4px";

      if (!this.mapContainer) {
        setTimeout(() => {
          mapContainer && this.mapContainer?.appendChild(mapContainer);
          mapContainer && createToDoMap(mapContainer, "streets", this.filteredSightseeings, undefined, 10);
          const layerBtn = <HTMLLinkElement>mapContainer?.querySelector("a.leaflet-control-layers-toggle");
          if (layerBtn) {
            layerBtn.style.width = "30px";
            layerBtn.style.height = "30px";
            layerBtn.style.padding = "5px 7px";

            const icon = new WcIcon();
            icon.primaryColor = "black";
            icon.icon = "layer-group";

            layerBtn.appendChild(icon);
          }
        }, 100);
      }
    } else {
      const newMap = document.createElement('div');
      newMap.setAttribute('id', 'mapid');
      newMap.style.height = '100%';
      newMap.style.width = '100%';
      newMap.style.borderRadius = "4px";
      newMap.replaceWith(newMap);
      mapContainer.replaceWith(newMap);
      createToDoMap(newMap, "streets", this.filteredSightseeings, undefined, 10);
      const layerBtn = <HTMLLinkElement>newMap?.querySelector("a.leaflet-control-layers-toggle");
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
  }

  filterByCategories(name: "topic" | "orientation" | "triptype", value: Topic | Orientation | TripType): void {
    this.searchInput.value = "";
    this.filteredSightseeings = sightseeings;

    if (name === "topic") this.topicFilter = <Topic>value;
    if (name === "orientation") this.orientationFilter = <Orientation>value;
    if (name === "triptype") this.triptypeFilter = <TripType>value;

    if (this.topicFilter !== "Gran-Canaria") {
      this.filteredSightseeings = this.filteredSightseeings.filter(s => s.topic === this.topicFilter);
    }
    if (this.orientationFilter !== "Insel") {
      this.filteredSightseeings = this.filteredSightseeings.filter(s => s.orientation === this.orientationFilter);
    }
    if (this.triptypeFilter !== "Alle") {
      this.filteredSightseeings = this.filteredSightseeings.filter(s => s.type === this.triptypeFilter);
    }
  }

  searchThroughSightseeings(search: string): void {
    this.topicFilter = "Gran-Canaria";
    this.orientationFilter = "Insel";
    this.triptypeFilter = "Alle";

    search = search.toLowerCase();
    this.filteredSightseeings = sightseeings.filter(s => s.topic.toLowerCase().includes(search)
      || s.info?.toLowerCase().includes(search)
      || s.name.toLowerCase().includes(search)
      || s.type?.toLowerCase().includes(search)
      || s.tags.filter(t => t.toLowerCase().includes(search)).length > 0
    )
  }

  resetFilter(): void {
    this.filteredSightseeings = sightseeings;
    this.topicFilter = "Gran-Canaria";
    this.orientationFilter = "Insel";
    this.triptypeFilter = "Alle";
    this.searchInput.value = "";
  }

  render(): TemplateResult {
    return html`      
      <div class="all-island-page">
        <h1 class="title">Sehenswürdigkeiten</h1>

        <div class="map-container">
          ${this.renderMap()}
        </div>

        <div class="filter-container">
          <div style="color: white;">Filter:</div>

          <select name="topic" id="topic" .value=${this.topicFilter} @change=${(e: { target: HTMLSelectElement }) => this.filterByCategories("topic", <Topic>e.target.value)}>
            <option value="Gran-Canaria">Kategorie ...</option>
            <option value="Städte">Städte</option>
            <option value="Berge">Berge</option>
            <option value="Höhlen">Höhlen</option>
            <option value="Wasser">Wasser</option>
            <option value="Parks">Parks</option>
            <option value="Erlebnisse">Erlebnisse</option>
          </select>

          <select name="orientation" id="orientation" .value=${this.orientationFilter} @change=${(e: { target: HTMLSelectElement }) => this.filterByCategories("orientation", <Orientation>e.target.value)}>
            <option value="Insel">Lage ...</option>
            <option value="Norden">Norden</option>
            <option value="Osten">Osten</option>
            <option value="Süden">Süden</option>
            <option value="Westen">Westen</option>
            <option value="Zentrum">Zentrum</option>
          </select>

          <select name="triptype" id="triptype" .value=${this.triptypeFilter} @change=${(e: { target: HTMLSelectElement }) => this.filterByCategories("triptype", <TripType>e.target.value)}>
            <option value="Alle">Aufwand ...</option>
            <option value="Tagesausflug">Tagesausflug</option>
            <option value="Stadtbesichtigung">Stadtbesichtigung</option>
            <option value="Wanderung">Wanderung</option>
            <option value="Kurze Wanderung">Kurze Wanderung</option>
            <option value="Aussichtspunkt">Aussichtspunkte</option>
            <option value="Museum">Museum</option>
            <option value="Baden">Baden</option>
          </select>

          <input id="searchInput" type="search" placeholder="Suche ..." @input=${(e: { target: HTMLInputElement }) => this.searchThroughSightseeings(e.target.value)}>

          <button class="reset-button" @click=${() => this.resetFilter()}>
            <wc-icon class="reset-icon" primaryColor="text" icon="filter-reset"></wc-icon>
          </button>
        </div>

        ${this.filteredSightseeings.length === 0 ? html`
          <p>Keine Sehenswürdigkeiten gefunden!</p>
        ` : html`
          <div class="all-island-container">${this.filteredSightseeings?.map(c => this.renderSightseeingCard(c))}</div>
        `}
      </div>
    `;
  };
};

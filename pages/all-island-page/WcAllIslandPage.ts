import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { createSightseeingDocument } from "../../code/firebase";
import { updateMap } from "../../code/leaflet";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { Orientation, Sightseeing, sightseeings, Topic, TripType } from "./sightseeings";

@customElement("wc-all-island-page")
export class WcAllIslandPage extends LitElement {
  static get styles() {
    return [css`
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
  };

  @property({ type: Object }) sightseeing: Sightseeing;
  @property({ type: Array }) filteredSightseeings: Sightseeing[];
  @property({ type: String }) topicFilter: Topic = "Gran-Canaria";
  @property({ type: String }) orientationFilter: Orientation = "Insel";
  @property({ type: String }) triptypeFilter: TripType = "Alle";

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

    location.hash = "#Gran-Canaria";
  }

  renderSightseeingCard(sightseeing: Sightseeing): LitElement {
    const td = new WcSightseeingCard(sightseeing);
    td.onclick = () => {
      this.sightseeing = sightseeing;
    }
    return td;
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

    updateMap(this.filteredSightseeings);
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

    updateMap(this.filteredSightseeings);
  }

  resetFilter(): void {
    this.filteredSightseeings = sightseeings;
    this.topicFilter = "Gran-Canaria";
    this.orientationFilter = "Insel";
    this.triptypeFilter = "Alle";
    this.searchInput.value = "";

    updateMap(sightseeings);
  }

  render(): TemplateResult {
    return html`      
      <div class="all-island-page">
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

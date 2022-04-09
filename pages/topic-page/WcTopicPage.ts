import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { geSightseeingDocs } from "../../code/firebase";
import { createToDoMap, Topic } from "../../code/leaflet";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { mapStyles } from "../all-island-page/map-styles";
import { Sightseeing } from "../all-island-page/WcAllIslandPage";
import { WcDetailsPage } from "../details-page/WcDetailsPage";

@customElement("wc-topic-page")
export class WcTopicPage extends LitElement {
  static get styles() {
    return [mapStyles, css`
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
  };

  @property({ type: Array }) sightseeings: Sightseeing[];
  @property({ type: Object }) sightseeing: Sightseeing;
  @property({ type: Boolean }) showDetails: boolean = false;
  @property({ type: String }) topic: Topic;

  @query('#mapid') mapid: HTMLDivElement;
  @query('.map-container') mapContainer: HTMLDivElement;

  async getSightseeingsFromFirebase() {
    const sightseeings: Array<Sightseeing> = [];
    try {
      await geSightseeingDocs()
        .then((data: any) => {
          data.filter((d: Sightseeing) => d.topic === this.topic).forEach((doc: Sightseeing) => sightseeings.push(doc));
        })
        .catch((error: string) => console.log('no city docs found', error));
    } catch (error) {
      console.log(error);
    }
    this.sightseeings = sightseeings;
  };

  constructor(topic: Topic) {
    super();
    this.topic = topic;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.getSightseeingsFromFirebase();

    location.hash = "#" + this.topic;
  }

  renderSightseeingCard(sightseeing: Sightseeing): LitElement {
    const td = new WcSightseeingCard(sightseeing);
    td.onclick = () => {
      this.sightseeing = sightseeing;
      this.showDetails = true;
    }
    return td;
  }

  renderSightseeingPage(): LitElement {
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
    } else {
      this.mapContainer?.appendChild(mapContainer);
      createToDoMap(mapContainer, this.sightseeings, 10);
    }
  };

  render(): TemplateResult {
    return html`
      ${this.showDetails ? this.renderSightseeingPage() : html`
        <div class="topic-page">
          <h1 class="title">${this.topic} auf Gran Canaria</h1>

          <div class="map-container">${this.renderMap()}</div>
          
          <div class="topic-container">${this.sightseeings?.map(c => this.renderSightseeingCard(c))}</div>
        </div>
      `}
    `;
  };
};

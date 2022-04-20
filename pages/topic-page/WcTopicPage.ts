import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { geSightseeingDocs } from "../../code/firebase";
import { updateMap } from "../../code/leaflet";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { Sightseeing, sightseeings, Topic } from "../all-island-page/sightseeings";

@customElement("wc-topic-page")
export class WcTopicPage extends LitElement {
  static get styles() {
    return [css`
      .topic-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        color: #555;
      }

      .topic-container {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      }
    `];
  };

  @property({ type: Array }) sightseeings: Sightseeing[];
  @property({ type: String }) topic: Topic;

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
    updateMap(this.sightseeings);
  };

  constructor(topic: Topic) {
    super();
    this.topic = topic;
  }

  connectedCallback(): void {
    super.connectedCallback();

    location.hash = "#" + this.topic;

    window.setTimeout(() => updateMap(sightseeings.filter(s => s.topic === this.topic)), 0);
  }

  renderSightseeingCard(sightseeing: Sightseeing): LitElement {
    const td = new WcSightseeingCard(sightseeing);
    return td;
  }

  sortSightseeings(a: Sightseeing, b: Sightseeing): number {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

  render(): TemplateResult {
    return html`
      <div class="topic-page">
        <div class="topic-container">${sightseeings?.filter(s => s.topic === this.topic).sort((a: Sightseeing, b: Sightseeing) => this.sortSightseeings(a, b)).map(c => this.renderSightseeingCard(c))}</div>
      </div>
    `;
  };
};

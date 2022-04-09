import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { geSightseeingDocs } from "../../code/firebase";
import { Topic } from "../../code/leaflet";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { Sightseeing } from "../all-island-page/WcAllIslandPage";
import { WcDetailsPage } from "../details-page/WcDetailsPage";

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

      .title {
        text-align: center;
        padding-right: 150px;
      }

      .topic-container {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      }
    `];
  };

  @property({ type: Array }) sightseeings: Sightseeing[];
  @property({ type: Object }) sightseeing: Sightseeing;
  @property({ type: Boolean }) showDetails: boolean = false;
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
    return td;
  }

  render(): TemplateResult {
    return html`
      ${this.showDetails ? this.renderSightseeingPage() : html`
        <div class="topic-page">
          <h1 class="title">${this.topic} auf Gran Canaria</h1>

          <p>map with cities comes here ...</p>
          
          <div class="topic-container">${this.sightseeings?.map(c => this.renderSightseeingCard(c))}</div>
        </div>
      `}
    `;
  };
};

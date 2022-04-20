var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { geSightseeingDocs } from "../../code/firebase";
import { updateMap } from "../../code/leaflet";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { sightseeings } from "../all-island-page/sightseeings";
let WcTopicPage = class WcTopicPage extends LitElement {
    constructor(topic) {
        super();
        this.topic = topic;
    }
    static get styles() {
        return [css `
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
        updateMap(this.sightseeings);
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        location.hash = "#" + this.topic;
        window.setTimeout(() => updateMap(sightseeings.filter(s => s.topic === this.topic)), 0);
    }
    renderSightseeingCard(sightseeing) {
        const td = new WcSightseeingCard(sightseeing);
        return td;
    }
    sortSightseeings(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        else if (a.name > b.name) {
            return 1;
        }
        else {
            return 0;
        }
    }
    render() {
        return html `
      <div class="topic-page">
        <div class="topic-container">${sightseeings?.filter(s => s.topic === this.topic).sort((a, b) => this.sortSightseeings(a, b)).map(c => this.renderSightseeingCard(c))}</div>
      </div>
    `;
    }
    ;
};
__decorate([
    property({ type: Array })
], WcTopicPage.prototype, "sightseeings", void 0);
__decorate([
    property({ type: String })
], WcTopicPage.prototype, "topic", void 0);
WcTopicPage = __decorate([
    customElement("wc-topic-page")
], WcTopicPage);
export { WcTopicPage };
;
//# sourceMappingURL=WcTopicPage.js.map
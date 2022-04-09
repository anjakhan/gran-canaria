var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { geSightseeingDocs } from "../../code/firebase";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { WcDetailsPage } from "../details-page/WcDetailsPage";
let WcTopicPage = class WcTopicPage extends LitElement {
    constructor(topic) {
        super();
        this.showDetails = false;
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
    }
    ;
    getSightseeingsFromFirebase() {
        return __awaiter(this, void 0, void 0, function* () {
            const sightseeings = [];
            try {
                yield geSightseeingDocs()
                    .then((data) => {
                    data.filter((d) => d.topic === this.topic).forEach((doc) => sightseeings.push(doc));
                })
                    .catch((error) => console.log('no city docs found', error));
            }
            catch (error) {
                console.log(error);
            }
            this.sightseeings = sightseeings;
        });
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
        return td;
    }
    render() {
        var _a;
        return html `
      ${this.showDetails ? this.renderSightseeingPage() : html `
        <div class="topic-page">
          <h1 class="title">${this.topic} auf Gran Canaria</h1>

          <p>map with cities comes here ...</p>
          
          <div class="topic-container">${(_a = this.sightseeings) === null || _a === void 0 ? void 0 : _a.map(c => this.renderSightseeingCard(c))}</div>
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
WcTopicPage = __decorate([
    customElement("wc-topic-page")
], WcTopicPage);
export { WcTopicPage };
;
//# sourceMappingURL=WcTopicPage.js.map
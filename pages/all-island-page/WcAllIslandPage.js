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
import { createSightseeingDocument } from "../../code/firebase";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { WcDetailsPage } from "../details-page/WcDetailsPage";
let WcAllIslandPage = class WcAllIslandPage extends LitElement {
    constructor() {
        super(...arguments);
        this.showDetails = false;
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
    `];
    }
    ;
    addSightseeingsToFirebase(sightseeing) {
        return __awaiter(this, void 0, void 0, function* () {
            sightseeing.forEach((c) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield createSightseeingDocument(c);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        location.hash = "#all-island";
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
        return html `
      ${this.showDetails ? this.renderSightseeingPage() : html `
        <div class="all-island-page">
          <h1 class="title">Gran Canaria - Sehenswürdigkeiten</h1>

          <p>map with cities comes here ...</p>

          <h2>Städte auf Gran Canaria</h2>
          <div class="all-island-container">${cities.map(c => this.renderSightseeingCard(c))}</div>
        </div>
      `}
    `;
    }
    ;
};
__decorate([
    property({ type: Boolean })
], WcAllIslandPage.prototype, "showDetails", void 0);
__decorate([
    property({ type: Object })
], WcAllIslandPage.prototype, "sightseeing", void 0);
WcAllIslandPage = __decorate([
    customElement("wc-all-island-page")
], WcAllIslandPage);
export { WcAllIslandPage };
;
const cities = [{
        name: "Las Palmas de Gran Canaria",
        image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Flaspalmas%2FPlaya-Las-Canteras-Las-Palmas-de-Gran-Canaria.webp?alt=media&token=f774e8c7-e311-4712-9d00-26c570ca599d",
        foldername: "cities/laspalmas/",
        location: [28.124169202574212, -15.43635597886297],
        orientation: "north",
        tags: ["Catedral de Santa Ana", "Casa de Colon (Kolumbushaus)", "Museo Canario", "Mercado de Vegueta (Markt)", "Auditorio Alfredo Kraus", "Hafen mit Kreuzfahrtschiffen", "Altstadt Vegueta", "Poema del Mar (Aquarium)", "Castillo de la Luz", "Jardin Canario", "Naturpark Bandama", "Teror"],
        topic: "Städte"
    }, {
        name: "Maspalomas",
        image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Fmaspalomas%2FMaspalomas-Duenen-Gran-Canaria.webp?alt=media&token=3adb0b0d-09da-4bbc-b759-a32b58f4b7f1",
        foldername: "cities/maspalomas/",
        location: [27.761848689915524, -15.586680204960945],
        orientation: "south",
        tags: ["Bike Tour", "Kamelreiten", "Delfin Tour", "Sanddünen", "Palmitos Park", "Faro de Maspalomas", "Faro de Meloneras", "Playa de Maspalomas", "Playa del Ingles"],
        topic: "Städte"
    }, {
        name: "Puerto de Mogan",
        image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Fmogan%2FGran-Canaria-Puerto-de-Mogan-Blumengasse.webp?alt=media&token=e9a102b6-c7e2-46ab-8229-fdc475c40aab",
        foldername: "cities/mogan/",
        location: [27.791766618649017, -15.712254276823437],
        orientation: "south",
        tags: ["Blumengassen", "Hafen", "Playa de Mogan", "Aussichtspunkt", "U-Boot", "Canada de Los Gatos", "Markt am Freitag"],
        topic: "Städte"
    }, {
        name: "Arucas",
        image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Farucas%2FParroquia-de-San-Juan-Bautista-Gran-Canaria.webp?alt=media&token=cf048116-6463-4b90-92d3-271430d0444b",
        foldername: "cities/arucas/",
        location: [28.12049491415551, -15.521058975899761],
        orientation: "north",
        tags: ["Parroquia de San Juan Bautista de Arucas", "Jardin de la Marquesa", "Parque Municipal"],
        topic: "Städte"
    }];
//# sourceMappingURL=WcAllIslandPage.js.map
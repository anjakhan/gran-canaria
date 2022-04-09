import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createSightseeingDocument } from "../../code/firebase";
import { Topic } from "../../code/leaflet";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { WcDetailsPage } from "../details-page/WcDetailsPage";

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
  };

  @property({ type: Boolean }) showDetails: boolean = false;
  @property({ type: Object }) sightseeing: Sightseeing;

  async addSightseeingsToFirebase(sightseeing: Sightseeing[]) {
    sightseeing.forEach(async c => {
      try {
        await createSightseeingDocument(c);
      } catch (error) {
        console.log(error);
      }
    })
  };

  connectedCallback(): void {
    super.connectedCallback();
    //this.addSightseeingsToFirebase(moreCities);

    location.hash = "#all-island";
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
        <div class="all-island-page">
          <h1 class="title">Gran Canaria - Sehenswürdigkeiten</h1>

          <p>map with cities comes here ...</p>

          <h2>Städte auf Gran Canaria</h2>
          <div class="all-island-container">${cities.map(c => this.renderSightseeingCard(c))}</div>
        </div>
      `}
    `;
  };
};

export type Sightseeing = {
  name: string,
  image: string,
  foldername: string,
  location: [number, number],
  orientation: string,
  tags: string[],
  topic: Topic
}

// use tag for later search options and for linking to other sightseeings with same name
const cities: Sightseeing[] = [{
  name: "Las Palmas de Gran Canaria",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Flaspalmas%2FPlaya-Las-Canteras-Las-Palmas-de-Gran-Canaria.webp?alt=media&token=f774e8c7-e311-4712-9d00-26c570ca599d",
  foldername: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings/cities/laspalmas/",
  location: [28.124169202574212, -15.43635597886297],
  orientation: "north",
  tags: ["Catedral de Santa Ana", "Casa de Colon (Kolumbushaus)", "Museo Canario", "Mercado de Vegueta (Markt)", "Auditorio Alfredo Kraus", "Hafen mit Kreuzfahrtschiffen", "Altstadt Vegueta", "Poema del Mar (Aquarium)", "Castillo de la Luz", "Jardin Canario", "Naturpark Bandama", "Teror"],
  topic: "Städte"
}, {
  name: "Maspalomas",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Fmaspalomas%2FMaspalomas-Duenen-Gran-Canaria.webp?alt=media&token=3adb0b0d-09da-4bbc-b759-a32b58f4b7f1",
  foldername: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings/cities/maspalomas/",
  location: [27.761848689915524, -15.586680204960945],
  orientation: "south",
  tags: ["Bike Tour", "Kamelreiten", "Delfin Tour", "Sanddünen", "Palmitos Park", "Faro de Maspalomas", "Faro de Meloneras", "Playa de Maspalomas", "Playa del Ingles"],
  topic: "Städte"
}, {
  name: "Puerto de Mogan",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Fmogan%2FGran-Canaria-Puerto-de-Mogan-Blumengasse.webp?alt=media&token=e9a102b6-c7e2-46ab-8229-fdc475c40aab",
  foldername: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings/cities/mogan/",
  location: [27.791766618649017, -15.712254276823437],
  orientation: "south",
  tags: ["Blumengassen", "Hafen", "Playa de Mogan", "Aussichtspunkt", "U-Boot", "Canada de Los Gatos", "Markt am Freitag"],
  topic: "Städte"
}, {
  name: "Arucas",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Farucas%2FParroquia-de-San-Juan-Bautista-Gran-Canaria.webp?alt=media&token=cf048116-6463-4b90-92d3-271430d0444b",
  foldername: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings/cities/arucas/",
  location: [28.12049491415551, -15.521058975899761],
  orientation: "north",
  tags: ["Parroquia de San Juan Bautista de Arucas", "Jardin de la Marquesa", "Parque Municipal"],
  topic: "Städte"
}]

/* const moreCities: Sightseeing[] = [{
  name: "",
  image: "",
  foldername: "",
  location: [0, 0],
  orientation: "north",
  tags: [],
  topic: "cities"
}] */
import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { createSightseeingDocument } from "../../code/firebase";
import { createToDoMap, Topic } from "../../code/leaflet";
import { WcSightseeingCard } from "../../components/sightseeing-card/WcSightseeingCard";
import { WcDetailsPage } from "../details-page/WcDetailsPage";
import { mapStyles } from "./map-styles";

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
      }

      .filter-container {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 10px;
        padding: 20px 10px;
      }
    `];
  };

  @property({ type: Boolean }) showDetails: boolean = false;
  @property({ type: Object }) sightseeing: Sightseeing;
  @property({ type: Array }) filteredSightseeings: Sightseeing[];

  @query('#mapid') mapid: HTMLDivElement;
  @query('.map-container') mapContainer: HTMLDivElement;

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
        createToDoMap(mapContainer, "satellite", this.filteredSightseeings, undefined, 10);
      }, 100);
    } else {
      this.mapContainer?.appendChild(mapContainer);
      createToDoMap(mapContainer, "satellite", this.filteredSightseeings, undefined, 10);
    }
  };

  filterSightseeings(e: { target: HTMLSelectElement }): void {
    const name = <"topic" | "orientation">e.target.name;
    const value = <Topic | Orientation>e.target.value;

    if (value === "Gran-Canaria") {
      this.filteredSightseeings = sightseeings;
    } else {
      this.filteredSightseeings = sightseeings.filter(s => s[name] === value);
    }
  }

  render(): TemplateResult {
    return html`
      ${this.showDetails ? this.renderSightseeingPage() : html`
        <div class="all-island-page">
          <h1 class="title">Gran Canaria - Sehenswürdigkeiten</h1>

          <div class="map-container">${this.renderMap()}</div>

          <div class="filter-container">
            <label for="topic">Kategorie:</label>
            <select name="topic" id="topic" @change=${(e: { target: HTMLSelectElement }) => this.filterSightseeings(e)}>
              <option value="All Island">Ganze Insel</option>
              <option value="Städte">Städte</option>
              <option value="Berge">Berge</option>
              <option value="Höhlen">Höhlen</option>
              <option value="Parks">Parks</option>
              <option value="Erlebnisse">Erlebnisse</option>
            </select>

            <label for="orientation">Lage:</label>
            <select name="orientation" id="orientation" @change=${(e: { target: HTMLSelectElement }) => this.filterSightseeings(e)}>
              <option value="All Island">Ganze Insel</option>
              <option value="Norden">Norden</option>
              <option value="Osten">Osten</option>
              <option value="Süden">Süden</option>
              <option value="Westen">Westen</option>
              <option value="Zentrum">Zentrum</option>
            </select>
          </div>

          <div class="all-island-container">${this.filteredSightseeings?.map(c => this.renderSightseeingCard(c))}</div>
        </div>
      `}
    `;
  };
};

type Orientation = "Norden" | "Osten" | "Süden" | "Westen" | "Zentrum";

export type Sightseeing = {
  name: string,
  hash: string,
  image: string,
  foldername: string,
  location: [number, number],
  orientation: Orientation,
  tags: string[],
  topic: Topic,
  info?: string
}

// use tag for later search options and for linking to other sightseeings with same name
export const sightseeings: Sightseeing[] = [{
  name: "Las Palmas de Gran Canaria",
  hash: "LasPalmas",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Flaspalmas%2FPlaya-Las-Canteras-Las-Palmas-de-Gran-Canaria.webp?alt=media&token=f774e8c7-e311-4712-9d00-26c570ca599d",
  foldername: "cities/Las%20Palmas",
  location: [28.124169202574212, -15.43635597886297],
  orientation: "Norden",
  tags: ["Catedral de Santa Ana", "Casa de Colon (Kolumbushaus)", "Museo Canario", "Mercado de Vegueta (Markt)", "Auditorio Alfredo Kraus", "Hafen mit Kreuzfahrtschiffen", "Altstadt Vegueta", "Poema del Mar (Aquarium)", "Castillo de la Luz", "Jardin Canario", "Naturpark Bandama", "Teror"],
  topic: "Städte",
  info: "Las Palmas bietet viele schöne Plazas mit Cafés und Restaurants, Strände zum Baden und Surfen sowie ein großes kulturelles Angebot. Im Fokus stehen hierbei vor allem die Museen und Kirchen der Stadt."
}, {
  name: "Telde",
  hash: "Telde",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Ftelde%2FU%CC%88berreste-des-Aqua%CC%88dukt-Acueducto-de-Ines-Chemida.webp?alt=media&token=6d34ff43-cc46-4865-9d74-69c41f9b36e6",
  foldername: "cities/Telde",
  location: [27.99589391862407, -15.417396130190664],
  orientation: "Osten",
  tags: ["Cuatro Puertas", "El Barranco de los Cernicalos"],
  topic: "Städte",
  info: "Telde ist die älteste und zweitgrößte Stadt Gran Canarias. Telde war die erste Hauptstadt der Insel und ist bekannt für sein vielfältiges kulturelles Angebot."
}, {
  name: "Maspalomas",
  hash: "Maspalomas",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Fmaspalomas%2FMaspalomas-Promenade-600x600.webp?alt=media&token=7faaaf8f-99ed-4155-84dc-6a50b468c22b",
  foldername: "cities/Maspalomas",
  location: [27.761848689915524, -15.586680204960945],
  orientation: "Süden",
  tags: ["Bike Tour", "Kamelreiten", "Delfin Tour", "Sanddünen von Maspalomas", "Palmitos Park", "Faro de Maspalomas", "Faro de Meloneras", "Playa de Maspalomas", "Playa del Ingles", "Yacimiento Punta Mujeres"],
  topic: "Städte",
  info: "Maspalomas bezeichnet übrigens eine ganze Region im Südzipfel der Insel. Sie erstreckt sich von Meloneras bis San Agustín und beherbergt auch den bekanntesten Ortsteil Playa del Inglés. Hier befinden sich besonders viele Hotels und Ferienwohnungen. Da die Region vor allem bei deutschsprachigen Urlaubsgästen sehr beliebt ist, gibt es mittlerweile auch viele deutsche Restaurants und Kneipen vor Ort. Ein weiterer Vorteil ist die Nähe zum Flughafen. Die Fahrtzeit mit dem Auto oder Bus liegt bei gerade einmal 20 bis 25 Minuten. Vor Ort erwartet dich dann eine große Dünen-Landschaft. Die Dünen erstrecken sich knapp 6 Kilometer an der Südküste entlang und erreichen eine Breite von bis zu 1,4 Kilometern."
}, {
  name: "Sanddünen von Maspalomas",
  hash: "Sanddünen",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FSandd%C3%BCnenMaspalomas%2FGran-Canaria-Highlights-Sandduenen-Maspalomas.webp?alt=media&token=77aceae2-9434-44c2-b82f-ea12d0e0426c",
  foldername: "adventure/SanddünenMaspalomas",
  location: [27.745299697744375, -15.576656034595045],
  orientation: "Süden",
  tags: ["Maspalomas", "Bike Tour", "Kamelreiten", "Delfin Tour", "Sanddünen von Maspalomas", "Palmitos Park", "Faro de Maspalomas", "Faro de Meloneras", "Playa de Maspalomas", "Playa del Ingles", "Yacimiento Punta Mujeres"],
  topic: "Erlebnisse"
}, {
  name: "Puerto de Mogan",
  hash: "Mogan",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Fmogan%2FGran-Canaria-Puerto-de-Mogan-Blumengasse.webp?alt=media&token=e9a102b6-c7e2-46ab-8229-fdc475c40aab",
  foldername: "cities/Mogan",
  location: [27.791766618649017, -15.712254276823437],
  orientation: "Süden",
  tags: ["Blumengassen", "Hafen", "Playa de Mogan", "Aussichtspunkt", "U-Boot", "Canada de Los Gatos", "Markt am Freitag"],
  topic: "Städte",
  info: "Ein besonders schöner Ort auf Gran Canaria ist Puerto de Mogán. Er liegt im sonnenreichen Südwesten der Insel. In der Vergangenheit wurden hier bereits die meisten Sonnenstunden in ganz Europa verzeichnet. Puerto de Mogán beherbergt einen Kanal, durch den Meerwasser in den Ort hineinfließt. Durch den Kanal ist Puerto de Mogán auch als kleines Venedig bekannt. Darüber hinaus besitzt der Ort einen Jachthafen, an dem auch Ausflugsschiffe verkehren. Rund um den Hafen gibt es viele Restaurants und Cafés mit schönem Ambiente. Das Hafenviertel ist zudem für seine malerischen Blumengassen bekannt. Die Blumen ranken von Bögen und Hausfassaden. Sie verleihen den Gassen fast schon ein märchenhaftes Ambiente. Zur anderen Seite des Kanals bietet Puerto de Mogán einen kleinen Strand mit hellem Sand. Auf der Promenade, die direkt hinter dem Strand verläuft, findest du Restaurants, Cafés und Geschäfte. Einen besonders schönen Blick auf den Ort bietet zudem der Aussichtspunkt oberhalb der Häusersiedlung. Hierfür folgst du den Wegweisern, die hinter dem Hafenviertel die Gassen hinaufführen. Der Aufstieg dauert ca. 10 Minuten."
}, {
  name: "Teror",
  hash: "Teror",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Fteror%2FRestaurante-El-Encuentro-Plaza-del-Pino.webp?alt=media&token=be7985df-409f-4730-9cad-06bacc48cc7c",
  foldername: "cities/Teror",
  location: [28.060057114397562, -15.547231821794318],
  orientation: "Norden",
  tags: ["Valleseco", "Cruz de Tejeda"],
  topic: "Städte",
  info: "Teror wird oft auch als religiöses Zentrum von Gran Canaria bezeichnet und wurde im Jahr 1979 zum Kulturdenkmal erklärt. Hier erlebst du die Insel noch so, wie sie früher einmal gewesen sein soll. Die alten Häuser sind mittlerweile vollständig restauriert worden. Sie wurden jedoch in ihrem ursprünglichen Erscheinungsbild gut erhalten, sodass du hier nach wie vor das Ambiente vergangener Zeiten erfahren kannst. Vor allem die typisch kanarischen Balkone aus Holz ragen vielfach noch an den Hausfassaden empor. Mit etwas mehr als 12.000 Einwohnern ist Teror ein nicht allzu großer Ort. Er liegt ca. 550 Meter über dem Meeresspiegel im Landesinneren in der nördlichen Hälfte von Gran Canaria. Tagsüber kommen gerne Touristen hierher, um den historischen Charme der Altstadt zu erleben und die katholische Kirche “Basilica Nuestra Señora del Pino” zu besuchen. Hierbei handelt es sich um eine der wichtigsten Kirchen auf Gran Canaria, die im Jahr 1767 fertiggestellt wurde. Die Kirche ist von einem großen Marktplatz mit mehreren Restaurants umgeben."
}, {
  name: "Agaete",
  hash: "Agaete",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Fagaete%2FPlaya-de-las-Nieves-mit-Promenade-600x600.webp?alt=media&token=2a984fdd-89da-424c-a614-9fc1343e17cc",
  foldername: "cities/Agaete",
  location: [28.105574932647293, -15.709104541206749],
  orientation: "Westen",
  tags: ["Hafen von Agaete", "Playa de las Nieves", "Piscina Natural (Natur-Schwimmbad)", "Huerto de Las Flores (botanischer Garten)", "Necrópolis del Maipez (archäologisches Museum)", "Museo de La Rama", "Kirchplatz “Plaza de la Constitución”", "Playa de Faneroque", "Charco Azul", "Mirador del Balcón", "Barranco de Azuaje"],
  topic: "Städte",
  info: "Anders als in den meisten Orten auf Gran Canaria, sind die Häuser in Agaete überwiegend weiß. Dies führt zu einem besonders hübschen Stadtbild. Bekannt ist Agaete zudem auch durch den Hafen. Am Puerto de las Nieves legt die Fähre von Fred Olsen Express ab, die Gran Canaria mit der Nachbarinsel Teneriffa verbindet. An den Hafen schließen sich zudem der Playa de las Nieves sowie die Promenade mit Restaurants und Geschäften an. Am Wochenende wird es in Agaete meist etwas voller. Denn auch viele Spanier kommen an freien Tagen gerne hierher. Falls du es eher ruhig magst, ist ein Besuch innerhalb der Woche daher empfehlenswert."
}, {
  name: "Arinaga",
  hash: "Arinaga",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Farinaga%2FGran-Canaria-Sehenswertes-Faro-de-Arinaga.webp?alt=media&token=5b35eac5-fe69-4f84-b7d4-c19f56bc2785",
  foldername: "cities/Arinaga",
  location: [27.856996554929164, -15.390960960831462],
  orientation: "Osten",
  tags: ["Promenade von Arinaga", "Faro de Arinaga", "Meersalz-Gewinnung “Las Salinas”", "Der Playa del Pozo"],
  topic: "Städte",
  info: "Arinaga zählt zur Gemeinde Agüimes und beherbergt etwas mehr als 9.000 Einwohner. Früher wurde hier einmal Kalk abgebaut, das für die ganze Insel genutzt wurde. An der Promenade kannst du heute noch einige alte Kalköfen anschauen. Zwischenzeitlich war der Ort zudem auch ein wichtiges Fischerei-Zentrum. Auch heutzutage kannst du entlang der Promenade noch viele Angler und Fischer sehen."
}, {
  name: "Artenara",
  hash: "Artenara",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Fartenara%2FArtenara-Jesus-Figur-Gran-Canaria.webp?alt=media&token=31889ade-44cb-45b5-a9b3-9f61de09bfae",
  foldername: "cities/Artenara",
  location: [28.02120708325028, -15.646416669231055],
  orientation: "Zentrum",
  tags: ["Mirador De La Atalaya"],
  topic: "Städte",
  info: "Bei Artenara handelt es sich um die höchstgelegene Gemeinde auf Gran Canaria. Der höchste Punkt liegt dabei auf 1.770 Metern. Das Ortszentrum befindet sich jedoch etwas tiefer. Dennoch bist du auch hier schon 1.269 Meter hoch. Ein besonderes Highlight ist hier die Christusstatue, die mit ausgebreiteten Armen über den Ort wacht. Leider haben wir vor Ort keinen Weg gefunden, um die Statue auch von Nahen zu sehen. Doch auch aus der Ferne ist sie schon beeindruckend. Eine der wichtigsten Sehenswürdigkeiten in Artenara ist zudem die Höhlen-Kapelle “La Ermita de la Cuevita”, die vermutlich aus dem Jahr 1794 stammt. Du kannst sie täglich zwischen 9:00 und 19:00 Uhr besichtigen. Ein weiteres Ausflugsziel stellt das historische Museum “Museo Etnográfico Casas Cuevas” dar. Hier kannst du sehen, wie die Höhlen-Wohnungen, die in Artenara teilweise noch existieren, von den Einheimischen bewohnt werden. Ein Stück oberhalb des Ortskerns findest du zudem einen schönen Aussichtspunkt: Den Mirador De La Atalaya. Hier gibt es einige Kunstwerke und natürlich einen schönen Blick auf die Landschaft und den Ort."
}, {
  name: "Arucas",
  hash: "Arucas",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcities%2Farucas%2FParroquia-de-San-Juan-Bautista-Gran-Canaria.webp?alt=media&token=cf048116-6463-4b90-92d3-271430d0444b",
  foldername: "cities/Arucas",
  location: [28.12049491415551, -15.521058975899761],
  orientation: "Norden",
  tags: ["Parroquia de San Juan Bautista de Arucas", "Jardin de la Marquesa", "Parque Municipal"],
  topic: "Städte",
  info: "Das Highlight und Wahrzeichen der Stadt ist die neugotische Kirche “Parroquia de San Juan Bautista de Arucas”. Ihre Bauzeit lag zwischen 1909 und 1917. Rund um die Kirche gibt es hübsche Plazas und Gassen."
}, {
  name: "Jardin de la Marquesa",
  hash: "JardinMarquesa",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fparks%2FJardinDeLaMarquesa%2FPfau-Gran-Canaria-Jardin-de-la-Marquesa-Arucas.webp?alt=media&token=1eefeae1-a55a-40e3-a3f3-16933643b35e",
  foldername: "parks/JardinDeLaMarquesa",
  location: [28.12387790680244, -15.528555173359345],
  orientation: "Norden",
  tags: ["Arucas"],
  topic: "Parks",
  info: "Jardín de la Marquesa ist ein kostenpflichtiger, botanischer Garten (6 Euro pro Person). Zu sehen gibt es über 500 verschiedene Pflanzenarten, Blumen, Palmen und einen aquarellfarbenen Springbrunnen. Im großen Teich kannst du Schildkröten schwimmen sehen. Zudem laufen im botanischen Garten mehrere Pfaue, Hühner, Hähne und Katzen frei herum."
}, {
  name: "Jardin Canario",
  hash: "JardinCanario",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fparks%2FJardinCanario%2FAktivitaeten-auf-Gran-Canaria-Spaziergang-Jardin-Canario.webp?alt=media&token=3b8d0977-8b64-4bfc-974b-05361423062d",
  foldername: "parks/JardinCanario",
  location: [28.066801549015295, -15.462318198710973],
  orientation: "Norden",
  tags: ["Las Palmas"],
  topic: "Parks",
  info: "Beim Jardín Canario handelt es sich um einen kostenfreien botanischen Garten, der eine Größe von ca. 27 Hektar umfasst. Hier kannst du viele der etwa 500 Pflanzenarten sehen, die auf den kanarischen Inseln heimisch sind. Der botanische Garten erstreckt sich dabei auch auf einen Hang, von dem aus du einen guten Blick über den Garten und die umliegende Landschaft hast. Seit 1952 können Besucher hier die Pflanzenvielfalt der Kanaren sowie der umliegenden Inseln anschauen. Vor allem der Kakteengarten ist für die meisten Besucher dabei ein Highlight. Schlendere am besten einfach die Wege durch den Garten entlang und lasse dich von der Vielfältigkeit der Natur faszinieren. Unterwegs findest du immer wieder auch Sitzbänke zum Ausruhen und Verweilen. Wenn du alle Bereiche des Gartens erkunden möchtest, solltest du ca. 2 bis 3 Stunden Besuchszeit einplanen. Der Jardín Canario ist täglich zwischen 9:00 und 18:00 Uhr geöffnet. In der Sommersaison (1. April bis 30. September) gelten zudem verlängerte Öffnungszeiten bis 19:00 Uhr. Um den Garten zu erreichen, gibt es zwei Eingänge. Der aus unserer Sicht bessere Zugang befindet sich unten im Tal. Hier bist du direkt im Hauptbereich des Gartens. Wenn du von oben kommst, musst du zunächst über Treppen und teils steilere Wegabschnitte hinunterlaufen. Dafür kannst du von oben aber auch die schöne Aussicht auf den Park genießen."
}, {
  name: "Mirador Astronómico de la Degollada de las Yeguas",
  hash: "MiradorAstronomico",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FMiradorAstronomico%2FMirador-AstronomicoDeLaDegolladaDeLasYeguas.jpeg?alt=media&token=7bd0f28a-ec95-4ffa-905a-2f12f2599ac5",
  foldername: "hiking/MiradorAstronomico",
  location: [27.81938305374555, -15.579245136071071],
  orientation: "Süden",
  tags: ["Pamitos Park", "Maspalomas", "Parque Natural de Pilancones"],
  topic: "Berge",
  info: "Beliebter Aussichtspunkt in einem weitläufigen Naturschutzgebiet mit Panoramablick über die Schlucht."
}, {
  name: "Barranco de los Cernicalos",
  hash: "BarrancoCernicalos",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fwater%2FBarrancoDeLosCernicalos%2FGran-Canaria-Highlights-Wasserfall-Barranco-de-los-Cernicalos.webp?alt=media&token=6fd32424-0f8e-412e-9c3d-bd8742c14bd9",
  foldername: "water/BarrancoDeLosCernicalos",
  location: [27.979724110463277, -15.473992385776024], //[27.98046115927964, -15.473178316675366],
  orientation: "Osten",
  tags: ["Telde"],
  topic: "Wasser",
  info: "Beim Barranco de los Cernícalosb handelt es sich um eine Schlucht, die von einem Bach durchzogen ist. Die Falkenschlucht, wie sie übersetzt heißt, ist auch zum Canyoning beliebt. Es gibt einen ca. 1-stündigen Wanderweg, der dich zu mehreren Wasserfällen führt. Du folgst dabei dem Bach, steigst über Baumstämme und läufst durch die grüne Natur. Das Highlight bilden vor allem die beiden größeren Wasserfälle im hinteren Teil der Schlucht. Am zweiten großen Wasserfall endet der Wanderweg offiziell. Insgesamt bist du bei dieser Wanderung ca. 2 Stunden unterwegs. Starten und parken kannst du am Picknick- und Grillplatz vor der Schlucht (Google Maps). Von dort folgst du zunächst ca. 4 bis 5 Minuten lang der asphaltierten Straße, die offiziell nur von Anwohnern befahren werden darf. Am Ende der Straße zeigt ein Wegweiser die Abzweigung zum Wanderweg in den Barranco an. Der schmale Weg führt dich an Kakteen und Felsen entlang. Besonders schön ist hier auch der am Boden wachsende Klee. Nach weiteren ca. 5 Minuten erreichst du einen Wasserkanal und einen alten Brunnen. Der Weg führt zunächst noch etwas aufwärts. Schon bald wird er jedoch flach und folgt ohne größere Steigungen dem Bach. Den ersten kleinen Wasserfall erreichst du nach ca. 20 bis 25 Gehminuten. Dahinter bleibt der Weg weiter abenteuerlich und führt mehrfach über Baumstämme und Brücken sowie durch den Bambus. Auch kleinere Wasserfälle sind unterwegs zu sehen. Neben dem Wanderweg selbst, bilden vor allem zwei Wasserfälle das Highlight. Der erste der beiden größeren Wasserfälle ist nach ca. 45 Gehminuten erreicht. Folge hierzu einfach immer dem Bach. Er führt dich automatisch zum Wasserfall, wo die Felswände eine Art Canyon bilden. Am Wasserfall kannst du zunächst verweilen, bevor du danach ein Stück dem Weg wieder zurückfolgst. Nach 4 bis 5 Minuten bietet der Rückweg die Möglichkeit, zur linken Seite aufwärtszugehen. Wenn diesem Weg nach oben folgst, erreichst du nach ca. 10 weiteren Gehminuten einen zweiten großen Wasserfall. Er besteht aus zwei Strängen und ist nochmals deutlich höher als der erste größere Wasserfall. Hier endet der offizielle Wanderweg. Schilder mit der Aufschrift “Access Forbidden Zone” bzw. “End of journey” zeigen, dass du hier nicht weitergehen sollst."
}, {
  name: "Barranco de Azuaje",
  hash: "BarrancoAzuaje",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fwater%2FBarrancoDeAzuaje%2FHighlights-Gran-Canaria-Barranco-de-Azuaje.webp?alt=media&token=e78d89b6-86ab-4cd6-842a-4efdf2da59a4",
  foldername: "water/BarrancoDeAzuaje",
  location: [28.108066200705284, -15.570780899828632],
  orientation: "Norden",
  tags: ["Firgas", "Arucas", "Mirador Barranco de Azuaje"],
  topic: "Wasser",
  info: "Ein Ort, um auf Gran Canaria ganzjährig Wasserfälle und grüne Natur zu erleben, ist der Barranco de Azuaje. Von der asphaltierten Straße führt ein teils gepflasterter Schotterweg hierher. Er endet an einem Parkplatz, von dem aus du nach kurzer Zeit eine Ruine erreichst. Hier gab es früher ein Hotel mit Spa-Bereich. Das verlassene Hotel wird von der Natur mehr und mehr zurückerobert. Zudem gibt es hier zahlreiche Graffitis. Seitlich der Ruine führt ein Wanderweg in den Barranco hinein. Es gibt einen ca. 8 Kilometer langen Rundweg, bei dem du stellenweise auch klettern musst. Entlang des Wegs sind einige kleinere Wasserfälle zu sehen."
}, {
  name: "El Bufadero in La Garita",
  hash: "ElBufadero",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fwater%2FElBufadero%2FGran-Canaria-Wasserfall-El-Bufadero-La-Garita.webp?alt=media&token=ab7a3e0e-5c49-4a78-91a4-8caa03695f04",
  foldername: "water/ElBufadero",
  location: [28.002698640604798, -15.375590203695701],
  orientation: "Osten",
  tags: ["Telde", "Cueva de la Reina"],
  topic: "Wasser",
  info: "Der zweite Wasserfall auf Gran Canaria, der das ganze Jahr über sichtbar ist, befindet sich im Küstenort La Garita. Dabei handelt es sich jedoch nicht um einen klassischen Wasserfall, der aus einem Fluss oder Bach entspricht. Vielmehr entsteht dieser Wasserfall mit jeder Welle neu. La Garita beherbergt eine Lava-Küste, an der sich u.a. das Felsloch “El Bufadero” gebildet hat. Übersetzt bedeutet dies soviel wie “der Fauchende”. Wichtig bei diesem Wasserfall ist, dass du vorab die Gezeiten prüfst. Denn der Wasserfall bildet sich vor allem bei Flut. Bei Ebbe kann es hingegen sein, dass das Meer zu ruhig ist, um das Felsloch zu erreichen. Wann in La Garita Flut herrscht, kannst du tagesaktuell z.B. auf dieser Webseite nachsehen. Der Wasserfall entsteht durch das ins Loch hinein schwappende Meerwasser. Es wird zum einen von unten durch die Öffnung des Lochs hineingedrückt. Bei stärkerem Wellengang wird das Loch zudem auch von oben mit Wellen geflutet. In den Sekunden, in denen der Wellengang abnimmt und das Wasser zurückgeht, entsteht rund um das Loch ein Wasserfall. Da das Meerwasser zu allen Seiten an den Lava-Felsen hinabläuft, sieht es wie in runder Wasserfall aus. Das hinab fließende Wasser lässt sich sehr gut auf Fotos darstellen. Daher ist El Bufadero auch ein beliebter Ort für (Hobby-)Fotografen. Um den Wasserfall fotografisch schön festzuhalten, brauchst du heutzutage übrigens nicht mehr zwingend eine Spiegelreflexkamera. Auch mit vielen Smartphones oder Apps ist die Langzeitbelichtung eines Fotos möglich. Das Foto am Ende des Abschnitts ist z.B. mit dem iPhone 11 Pro entstanden. Da El Bufadero an der Ostküste von Gran Canaria liegt, geht hier morgens die Sonne über dem Meer auf. Zum Sonnenaufgang sind dann besonders schöne und stimmungsvolle Fotos möglich."
}, {
  name: "Charco de la Paloma",
  hash: "CharcoPaloma",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fwater%2FCharcoDeLaPaloma%2FCharco-de-la-Paloma-ausgetrocknet-Januar-2022-Tejeda-Gran-Canaria.webp?alt=media&token=6f29f43e-6c02-4fbb-b072-662944a13b7d",
  foldername: "water/CharcoDeLaPaloma",
  location: [27.98699737620641, -15.607136984657476],
  orientation: "Zentrum",
  tags: ["Tejeda", "Mirador de Cruz de Tejeda", "Pico de las Nieves"],
  topic: "Wasser",
  info: "Noch ein wenig mehr Glück als beim Charzu Azul musst du am Charco de la Paloma haben. Denn hier ist der Wasserfall unserer Erfahrung nach noch öfter ausgetrocknet als am Charco Azul. Dafür ist der Weg zum Wasserfall deutlich kürzer. Der Weg startet nahe dem Bergdorf Tejeda. Du kannst entweder an der Skulptur “La Cesta” (Google Maps) parken oder dem dort abzweigenden Schotterweg mit dem Auto bis zum Ende folgen. Parkmöglichkeiten sind kurz vor Ende des Wegs vorhanden. Sofern du den Schotterweg durchfährst, sind es gerade einmal 5 Gehminuten bis zum Charco de la Paloma. An der einzigen Abzweigung, auf die du triffst, folgst du dem Weg nach rechts bzw. nahezu geradeaus. Sofern du entlang der asphaltierten Straße parkst und von dort zu Fuß läufst, beträgt die Gehzeit ca. 10 Minuten."
}, {
  name: "Playa de Güigüi",
  hash: "PlayaGuigui",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fwater%2FPlayaDeG%C3%BCig%C3%BCi%2FPlaya%20De%20Gu%CC%88i%20Gu%CC%88i.jpeg?alt=media&token=f0cc708c-d029-4b46-bf01-e13b2abeb204",
  foldername: "water/PlayaDeGüigüi",
  location: [27.947782985698016, -15.827706601117654],
  orientation: "Westen",
  tags: ["Mirador de San Nicolás", "Mirador del Balcón"],
  topic: "Wasser",
  info: "Ein ruhiger Strand an der Westküste, der nur über eine mehrstündige Wanderung oder per Boot erreichbar ist."
}, {
  name: "Mirador del Balcon",
  hash: "MiradorBalcon",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fwater%2FMiradorDelBalcon%2FMirador%20del-Balcon.jpeg?alt=media&token=225bac00-88f4-466b-9089-8d9755e91a52",
  foldername: "water/MiradorDelBalcon",
  location: [28.019867068923837, -15.785806419364825],
  orientation: "Westen",
  tags: ["La Aldea Beach"],
  topic: "Wasser",
  info: "Aussichtspunkt an der Steilküste im Westen der Insel."
}, {
  name: "Cenobio de Valeron",
  hash: "CenobioValeron",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcaves%2FCenobioDeValeron%2FGran-Canaria-Highlights-Cenobio-de-Valeron.webp?alt=media&token=0acbf134-70dc-405b-8ca7-17751d9b383a",
  foldername: "caves/CenobioDeValeron",
  location: [28.138923559554726, -15.604430693167426],
  orientation: "Norden",
  tags: ["Charco de San Lorenzo"],
  topic: "Höhlen",
  info: "Beim Cenobio de Valerón handelt es sich um einen ehemaligen Getreidespeicher. Die Ureinwohner nutzen die damals schwer zugänglichen Höhlen, um ihre Essensvorräte vor Diebstahl und dem vorzeitigen Verderben zu schützen. Auch einige Wohnhöhlen waren hier vorhanden. Heutzutage sind die Höhlen über Treppen gut zugänglich. Neben den Höhlen selbst ist auch der Ausblick vom Cenobio de Valerón lohnenswert. Die Aussicht reicht vom Atlantik über den Barranco de Calabozo auf die begrünte Berglandschaft."
}, {
  name: "Cuevas de Cuatro Puertas",
  hash: "Cuevas-de-cuatro-puertas",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcaves%2FCuevasDeCuatroPuertas%2FGran-Canaria-Highlights-Cuevas-de-los-Pilares-Cuatro-Puertas.webp?alt=media&token=44f40e88-88ec-4506-858a-a80ec1c837a9",
  foldername: "caves/CuevasDeCuatroPuertas",
  location: [27.959004097591375, -15.41838376018023],
  orientation: "Osten",
  tags: ["Telde"],
  topic: "Höhlen",
  info: "Die Cuevas de Cuatro Puertas befinden sich auf einem Berg, der nahe einer Wohnsiedlung liegt. Du kannst hier zunächst mit dem Auto hinauffahren, bis der Schotterweg beginnt. Am Rand gibt es Parkmöglichkeiten. Der Fußweg hinauf zu den Höhlen dauert ca. 5 Minuten. Im Rahmen eines Rundwegs kannst du verschiedene Höhlen sehen. Besonders eindrucksvoll sind die hinteren Höhlen “Los Pilares” (die Säulen). Sie sollen einst als Wohn- und Speicherhöhlen gedient haben. Diese Höhlen sind nach Süden ausgerichtet und vor Witterungseinflüssen gut geschützt. Dies machte sie besonders als Wohnhöhlen geeignet. Der Berg besteht überwiegend aus Tuffstein. Dieses leicht brüchige, vulkanische Gestein konnte von den Ureinwohnern vergleichsweise einfach mithilfe von Steinpickeln ausgehöhlt werden."
}, {
  name: "La Fortaleza de Ansite",
  hash: "La-Fortaleza-de-Ansite",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcaves%2FLaFortalezaDeAnsite%2FHoehle-Gran-Canaria-La-Fortaleza-de-Ansite.webp?alt=media&token=f4b889a4-f9a3-465c-a44c-c6d8940ceda5",
  foldername: "caves/LaFortalezaDeAnsite",
  location: [27.882736724364026, -15.529080202511091],
  orientation: "Süden",
  tags: ["Mirador de Fataga", "San Bartolomé de Tirajana"],
  topic: "Höhlen",
  info: "Eine historisch besonders wichtige Bedeutung hat der Höhlenkomplex “La Fortaleza de Ansite”. Hier sollen die Altkanarier einst Zuflucht gesucht haben, als die kastilischen Truppen im Jahr 1483 einfielen. Sie versteckten sich in den Höhlen, die damals sowohl als Wohn- wie auch als Bestattungshöhlen gedient haben sollen. Mehr über die Nutzung der Höhlen und das Leben der kanarischen Ureinwohner kannst du im nahegelegenen Museum erfahren (Centro de Interpretación yacimiento arqueológico de La Fortaleza, Eintritt 4 Euro pro Person). Um die Höhlen zu besuchen, ist kein großer Aufwand erforderlich. Es gibt eine asphaltierte Straße, die dich kurz vor den Höhlen auf einen großen Parkplatz führt. Von dort musst du nur einige Treppenstufen hinaufgehen und befindest dich bereits in der ersten, großen Höhle. Ein kurzer Rundweg führt dich dann zu weiteren Höhlen."
}, {
  name: "Pico de las Nieves",
  hash: "Pico-de-las-Nieves",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FPicoDeLasNieves%2FAusblick-Pico-de-las-Nieves-Gran-Canaria-Sehenswuerdigkeiten.webp?alt=media&token=9953afcf-6bdb-4daa-8258-98f0dfedc2a0",
  foldername: "hiking/PicoDeLasNieves",
  location: [27.961869623650696, -15.571734190589376],
  orientation: "Zentrum",
  tags: ["Barranco de Guayadeque", "Ventana de Morro", "Tejeda", "Cruz de Tejeda", "Casa Cueva Canaria", "Caldera Los Marteles"],
  topic: "Berge",
  info: "Der höchstgelegene Aussichtspunkt auf Gran Canaria befindet sich am Pico de las Nieves. Übersetzt bedeutet dies “Gipfel des Schnees”. Und tatsächlich kann es im Winter hier auch schneien oder zumindest Frost geben. Der Gipfel liegt auf 1.949 Metern Höhe. Vom Aussichtspunkt hast du bei klarer Sicht einen guten Ausblick auf die Berglandschaft mit ihren Gipfeln und Pinienwäldern. Zudem kannst du bei gutem Wetter auch die Nachbarinsel Teneriffa mit dem Teide Vulkan in der Ferne sehen."
}, {
  name: "Roque Nublo",
  hash: "Roque-Nublo",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FRoqueNublo%2FGran-Canaria-Unternehmungen-Roque-Nublo-Wanderweg.webp?alt=media&token=5c2dc199-5781-4000-8ce2-c8466d34c0bc",
  foldername: "hiking/RoqueNublo",
  location: [27.96562250764534, -15.601472376022661],
  orientation: "Zentrum",
  tags: ["Tejeda", "Cruz de Tejeda", "Höhlen am Wegesrand", "Stausee Los Hornos"],
  topic: "Berge",
  info: "Das Wahrzeichen der Berglandschaft auf Gran Canaria ist der Roque Nublo. Dies ist ein Gesteinsblock, der ca. 80 Meter in die Höhe ragt. Erreichbar ist der Roque Nublo über einen Wanderweg, der bei Touristen beliebt ist. Daher kann es je nach Tageszeit und Wochentag auch etwas voller werden. Der Wanderweg startet am Parkplatz neben der GC-600. In der Regel ist es morgens vor 10 Uhr am leersten. Zudem hast du dann oftmals gute Chancen auf eine wolkenfreie Sicht. Dies ist nicht selbstverständlich, wie der Name des Roque Nublo bereits erahnen lässt. Er bedeutet übersetzt “Fels der Wolken”. Der Wanderweg ist pro Strecke 1,5 Kilometer lang. Für den Weg solltest du ca. 45 Minuten Zeit pro Strecke einplanen. Am Roque Nublo angekommen, hast du bei klarer Sicht einen schönen Ausblick auf die Berglandschaft. Auch einige Kletterer sind meist vor Ort. Der Roque Nublo liegt auf 1.813 Höhenmetern und ist damit die drittgrößte Erhebung auf Gran Canaria. Nahe des Parkplatzes lohnt sich zudem ein kurzer Gang zur rechten Seite. Hier befindet sich der Stausee der Presa de Los Hornos."
}, {
  name: "Cruz de Tejeda",
  hash: "Cruz-de-Tejeda",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FCruzDeTejeda%2FGran-Canaria-Highlights-Mirador-Cruz-de-Tejeda.webp?alt=media&token=4ae33913-e3d8-483c-8514-3562817d2215",
  foldername: "hiking/CruzDeTejeda",
  location: [28.0060133900189, -15.599541091878399],
  orientation: "Zentrum",
  tags: ["Pico de las Nieves", "Roque Nublo", "Mirador de Cruz de Tejeda"],
  topic: "Berge",
  info: "Ein weiteres lohnenswertes Ausflugsziel in der Bergwelt auf Gran Canaria ist Cruz de Tejeda. Der kleine Ort bietet eine schöne Sicht auf das Bergpanorama. Vor allem zum Sonnenuntergang ist der Blick in die Berge ein echtes Highlight! Nahe dem Aussichtspunkt gibt es auch Restaurants und Cafés."
}, {
  name: "Barranco de las Vacas",
  hash: "Barranco-de-las-Vacas",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FBarrancoDeLasVacas%2FGran-Canaria-Highlights-Barranco-de-las-Vacas-kanarischer-Antelope-Canyon.webp?alt=media&token=9dff334b-491a-41cf-b90d-0f1ed2f2ff57",
  foldername: "hiking/BarrancoDeLasVacas",
  location: [27.915143606466412, -15.475880520240665],
  orientation: "Osten",
  tags: [],
  topic: "Berge",
  info: "Im Barranco de las Vacas fühlst du dich fast so, als wärst du im US-amerikanischen Antelope Canyon gelandet. Der Barranco de las Vacas ist jedoch deutlich kleiner. Von der GC-550 führt ein kurzer Wanderweg hinunter in den Barranco. Sofern du einen der wenigen Parkplätze bekommst, die sich näher am Barranco befinden, kannst du über die Leitplanke steigen und die Abkürzung nehmen. Der Weg führt dich durch einen kurzen Tunnel unter der Straße entlang. Dahinter beginnt der kleine Canyon. Nach ca. 5 Gehminuten erreichst du bereits sein Ende. Hier befindet sich auch der beliebteste Fotospot des Canyons. Auf dem großen Stein wirken Fotos des Canyon am schönsten."
}, {
  name: "Barranco de Guayadeque",
  hash: "Barranco-de-Guayadeque",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FBarrancoDeGuayadeque%2FErmita-de-Guayadeque-Gran-Canaria.webp?alt=media&token=9079f863-5431-44a7-a7b5-06d06c2d2e29",
  foldername: "hiking/BarrancoDeGuayadeque",
  location: [27.93544900726272, -15.512968438074658],
  orientation: "Osten",
  tags: ["Mirador Caldera Los Marteles", "Pico de las Nieves", "Casa Cueva Canaria"],
  topic: "Berge",
  info: "In dieser grün bewachsenen Schlucht findest du einige Höhlen-Wohnungen und Höhlen-Restaurants. Die Höhlen, in denen früher einmal die Ureinwohner gelebt haben sollen, sind heutzutage zu komfortableren Höhlen-Wohnungen umgebaut worden. Es gibt einen betonierten Pfad, der dich an den Wohnungen vorbeiführt. Der Pfad geht später in einen Wanderweg über. Der Barranco de Guayadeque eignet sich gut als Ausflugsziel, um die Schönheit der Natur zu erleben, zu wandern und in eines der Höhlen-Restaurants einzukehren. Im hinteren Teil der Schlucht gibt es einen kurzen Rundwanderweg. Zudem sind auch längere Wanderungen möglich."
}, {
  name: "Mirador Caldera Los Marteles",
  hash: "Mirador-Caldera-Los-Marteles",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FBarrancoDeGuayadeque%2FCaldera-los-Marteles-Vulkankessel-Gran-Canaria-600x600.webp?alt=media&token=deef156b-7762-43e1-8ad7-8777c08e0d8d",
  foldername: "hiking/BarrancoDeGuayadeque",
  location: [27.96096218564247, -15.5354438925099],
  orientation: "Osten",
  tags: ["Barranco de Guayadeque", "Pico de las Nieves"],
  topic: "Berge",
  info: "Beim Mirador Caldera Los Marteles handelt es sich um einen Aussichtspunkt auf einen Vulkankessel. Der grün bewachsene Vulkankessel hat einen Durchmesser von ca. 500 Metern und ist etwa 80 Meter tief. Alternativ zur Wanderung kannst du diesen Aussichtspunkt auch mit dem Auto erreichen."
}, {
  name: "Naturpark Bandama",
  hash: "Badama",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FBandama%2FGran-Canaria-Aktivitaeten-Vulkankessel-Bandama.webp?alt=media&token=82a9ba44-7e4f-4f8c-b737-8e7c62925557",
  foldername: "hiking/Bandama",
  location: [28.037498275886826, -15.457874006147092],
  orientation: "Osten",
  tags: ["Pico de Bandama", "Caldera de Bandama"],
  topic: "Berge",
  info: "Der Naturpark Bandama ist ein Ausflugsziel, was viele Gran Canaria Urlauber nicht kennen. Daher kann man hier durchaus noch von einer Art Geheimtipp sprechen. Dich erwartet hier der größte Vulkankrater der Insel, der ganze 200 Meter tief ist. Zudem kommt er auf einen Durchmesser von ca. 1.100 Metern! Was sich geschrieben schon groß anhört, wird dir vor Ort vermutlich noch viel größer vorkommen. Denn der Vulkankessel (im Spanischen “Caldera de Bandama”) ist wirklich mächtig. Am besten kannst du das Ausmaß des Vulkankessels vom Aussichtspunkt “Pico de Bandama” sehen. Eine Serpentinenstraße führt dich mit dem Auto bequem zum Gipfel hinauf. Oben erwartet dich dann nicht nur eine tolle Aussicht auf den Vulkankrater, sondern auch auf das Umland. Hier kannst du z.B. auch Las Palmas, die Hauptstadt von Gran Canaria, gut überblicken. Zudem werden deine Augen von den schönen Aussichten auf die Berglandschaft und das Meer verwöhnt. Wir selbst waren bei bewölktem Himmel im Naturpark Bandama und können aus eigener Erfahrung sagen, dass sich ein Ausflug hierher auch dann lohnt. Auch wenn Aussichtspunkte bei Sonnenschein häufig am beeindruckendsten sind, ist die Sicht auch bei bewölktem Wetter sehr lohnenswert. Zudem eignet sich der Aussichtspunkt gut auch zum Sonnenuntergang."
}, {
  name: "Charco de San Lorenzo",
  hash: "Charco-de-San-Lorenzo",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fwater%2FCharcoDeSanLorenzo%2FGran-Canaria-Highlights-Naturpool-Charco-de-San-Lorenzo.webp?alt=media&token=32857fa3-55cc-41be-a583-8ea52017302b",
  foldername: "water/CharcoDeSanLorenzo",
  location: [28.144510128560263, -15.577396922733028],
  orientation: "Norden",
  tags: ["Felsenstadt El Roque", "Charco de Las Palomas"],
  topic: "Wasser",
  info: "Die meisten Charcos oder Piscinas Naturales, wie sie im Spanischen heißen, sind natürlich entstanden. Ins Meer geflossene Lava ist erkaltet und hat natürliche Badebecken hinterlassen. Teilweise wurden die Lavabecken mit Mauern noch vervollständigt oder zusätzlich gesichert. Interessant ist der Charco de San Lorenzo auch aufgrund der benachbarten Felsenstadt El Roque. Hier wurden weiß gestrichene Häuser auf einen Felsen direkt an der Küste gebaut. Die kleine Felsenstadt ist vom Charco aus gut zu sehen und fußläufig erreichbar. Autos können durch die kleine Felsstadt nicht fahren, da die Gassen hierfür zu eng sind. Vor oder nach dem Bad im Charco kannst du zu El Roque hinübergehen und durch die kleinen Gassen schlendern."
}, {
  name: "Cueva de la Reina",
  hash: "Cueva-de-la-Reina",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fwater%2FCuevaDeLaReina%2FGran-Canaria-Highlights-Hoehlenpool-Cueva-de-la-Reina.webp?alt=media&token=91f604c2-6ca9-475a-92b0-6be32edbf004",
  foldername: "water/CuevaDeLaReina",
  location: [28.009516570122397, -15.375762991364292],
  orientation: "Osten",
  tags: [],
  topic: "Wasser",
  info: "Die meisten Charcos oder Piscinas Naturales, wie sie im Spanischen heißen, sind natürlich entstanden. Ins Meer geflossene Lava ist erkaltet und hat natürliche Badebecken hinterlassen. Teilweise wurden die Lavabecken mit Mauern noch vervollständigt oder zusätzlich gesichert. Besonders ausgefallen und wenig bekannt ist die Cueva de la Reina. Sie liegt im Ort La Garita. Die Wohnsiedlung oberhalb des Naturpools lässt zunächst nicht vermuten, dass sich hier ein wahres Highlight auf Gran Canaria befindet. Es handelt sich um eine Höhle, in der sich ein kleiner Naturpool befindet. Um dorthin zu kommen, musst du zunächst eine Stelle finden, um die Felsen hinabzuklettern. Möglich ist der Abstieg z.B. neben dem Felsloch zur linken Seite."
}, {
  name: "Charco de Las Palomas",
  hash: "Charco-de-Las-Palomas",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fwater%2FCharcoDeLasPalomas%2FCharco-de-Las-Palomas-Gran-Canaria-Naturpools.webp?alt=media&token=978c1f4d-2ea4-4102-a415-279703256022",
  foldername: "water/CharcoDeLasPalomas",
  location: [28.154251541593343, -15.53046453549661],
  orientation: "Norden",
  tags: ["Arucas", "Charco de San Lorenzo"],
  topic: "Wasser",
  info: "Die meisten Charcos oder Piscinas Naturales, wie sie im Spanischen heißen, sind natürlich entstanden. Ins Meer geflossene Lava ist erkaltet und hat natürliche Badebecken hinterlassen. Teilweise wurden die Lavabecken mit Mauern noch vervollständigt oder zusätzlich gesichert. Besonders ausgefallen und wenig bekannt ist die Cueva de la Reina. Sie liegt im Ort La Garita. Die Wohnsiedlung oberhalb des Naturpools lässt zunächst nicht vermuten, dass sich hier ein wahres Highlight auf Gran Canaria befindet. Es handelt sich um eine Höhle, in der sich ein kleiner Naturpool befindet. Um dorthin zu kommen, musst du zunächst eine Stelle finden, um die Felsen hinabzuklettern. Möglich ist der Abstieg z.B. neben dem Felsloch zur linken Seite."
}, {
  name: "Bodega Los Berrazales",
  hash: "Bodega-Los_Berrazales",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FBodegaLosBerrazales%2FGran-Canaria-Sehenswuerdigkeiten-Kaffeeplantage.webp?alt=media&token=6481b039-f16c-48fc-b813-1f2d27e50662",
  foldername: "adventure/BodegaLosBerrazales",
  location: [28.074985878378598, -15.668812585954884],
  orientation: "Westen",
  tags: ["Agaete"],
  topic: "Erlebnisse",
  info: "Europas einzige Kaffeeplantage und Weingut! In der Berglandschaft Gran Canarias existieren gute Bedingungen zum Anbau von Kaffee, Wein und Obst. Daher ist im westlichen Teil Gran Canarias die bislang einzige Kaffeeplantage Europas entstanden. Wenn du in deinem Leben noch nie eine Kaffeeplantage gesehen hast, ist ein Besuch hier besonders interessant. Die jährliche Erntemenge liegt bei ca. 1.500 Kilogramm. Der Name “Bodega” bedeutet aus dem Spanischen übersetzt übrigens auch Weinkeller. Zum Probieren werden dir neben Kaffee auch Wein bzw. ein alkoholfreies Getränk für Kinder, Käse und Brot mit Aufstrich gereicht. Je nach Saison kannst du zudem das erntefrische Obst probieren. Auf der Plantage wachsen z.B. Orangen, Mangos, Guaven und Avocados."
}, {
  name: "Museo y Parque Arqueológico Cueva Pintada",
  hash: "Cueva-Pintada",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fcaves%2FCuevaPintada%2FMuseo%20y%20Parque-Arqueolo%CC%81gico%20Cueva%20Pintada.jpeg?alt=media&token=701a50f9-6221-4ff2-ab50-5346dc329de4",
  foldername: "caves/CuevaPintada",
  location: [28.14453552565854, -15.655066849810016],
  orientation: "Norden",
  tags: ["Agaete"],
  topic: "Höhlen",
  info: "Bei der Cueva Pintada handelt es sich um eine Höhle, die im Jahr 1873 durch Zufall entdeckt wurde. Da sich in der Höhle einige Gemälde befanden, wurde sie “Cueva Pintada” getauft, was so viel wie “bemalte Höhle” bedeutet. Seit 2006 ist die Höhle nun in ihrer heutigen Form als Museum und archäologischer Park für Besucher zugänglich. Du kannst die Höhle dabei entweder auf eigene Faust oder im Rahmen einer Führung erkunden. Da die Führungen auch auf Deutsch angeboten werden, kannst du hier viel Lehrreiches erfahren. Zudem ist die Führung ohne Aufpreis im Eintrittspreis enthalten. Das Museum zeigt dir zunächst Eindrücke der kolonialen Vergangenheit Gran Canarias. Hier erwarten dich u.a. archäologische Ausgrabungen wie Keramikgefäße aus dem späten Mittelalter. Zudem kannst du vor Ort die Höhlen ansehen, die von den Ureinwohnern Gran Canarias in Tuffstein gegraben wurden. Die Höhlen sind zwischen dem 6. und 16. Jahrhundert entstanden und die Siedlung umfasste einst über 50 Häuser und Höhlen. Die Wandmalereien sind dabei ein besonderes Überbleibsel vergangener Zeiten."
}, {
  name: "Parque natural de Pilancones",
  hash: "Parque-natural-de-Pilancones",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FPilancones%2FParque-natural-de-Pilancones-Gran-Canaria-Sehenswuerdigkeiten.webp?alt=media&token=3801649c-9df9-498f-ab72-e8bf7c55716b",
  foldername: "hiking/Pilancones",
  location: [27.87482619293565, -15.633033849050085],
  orientation: "Süden",
  tags: ["Mirador de Ayagaures", "Presa De Chira (Staudamm mit Rundwanderweg)"],
  topic: "Berge",
  info: "Wenn du auf Gran Canaria wandern oder Rad fahren möchtest, ist der Parque natural de Pilancones hierfür ein guter Ort. Auch um einfach die schöne Natur vom Auto aus zu genießen, eignet sich diese Region. Der Parque natural de Pilancones befindet sich nördlich von Maspalomas im Landesinneren. Du durchquerst hierbei die schöne Berg-Landschaft der Insel, die mit mehreren Schluchten durchzogen ist. Es handelt sich mit einem Alter von ca. 12 Millionen Jahren um die älteste Region von Gran Canaria. Der Naturpark ist insgesamt 5.794 Hektar groß. Er beherbergt den größten Pinienwald der Insel und zudem auch Kakteen, Distel- und Wolfsmilch-Gewächse sowie Zistrosen. Auch verschiedene Vogelarten sind hier zuhause. Entlang der GC-604 findest du u.a. auch eine mystisch wirkende, kleine Bergkirche. Wenn du mit dem Auto oder Fahrrad unterwegs bist, kannst du auch schön die verschiedenen Aussichtspunkte rund um den Naturpark anfahren."
}, {
  name: "Tejeda und der Roque Bentayga",
  hash: "Tejeda-Roque-Bentayga",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fhiking%2FRoqueBentayga%2FTejeda-Ausblick-Ort-Roque-Bentayga.webp?alt=media&token=591d583f-1698-4dc0-882f-1e419e576f62",
  foldername: "hiking/RoqueBentayga",
  location: [27.989563149420515, -15.638410508725139],
  orientation: "Zentrum",
  tags: ["Cruz de Tejeda"],
  topic: "Berge",
  info: "Die 1.404 Meter hohe Erhebung ist vor ca. 3 Millionen Jahren bei einer vulkanischen Eruption entstanden. Die Ureinwohner Gran Canarias haben den Roque Bentayga als heiligen Ort verehrt und dort auch Höhlenwohnungen, Begräbnisstätten, Scheunen und Viehgehege gebaut. Diese wurden vor nicht allzu langer Zeit bei archäologischen Ausgrabungen entdeckt. Vom Parkplatz aus führt ein Wanderweg hinauf zum Gipfel. Hierfür solltest du ca. 1 Stunde Zeit einplanen. Oben kannst du dann auch einige der Höhlenwohnungen sehen. Am Parkplatz befindet sich zudem ein Museum, in dem einige geschichtliche Aspekte rund um den Roque Bentayga dargestellt werden. Sowohl vom Parkplatz wie auch vom Gipfel hast du eine schöne Sicht auf die umliegende Berg-Landschaft. Auf dem Weg zum Roque Bentayga kommst du am kleinen Bergdorf Tejeda vorbei. Dieser idyllisch gelegene Ort bietet dir eine hübsche, balkonartige Promenade, von der aus du eine schöne Sicht ins Tal und auf das Felsmassiv des Roque Bentayga hast. Der Ort eignet sich daher gut für einen kleinen Spaziergang und um die Aussicht zu genießen. Am terrassenförmigen Hang des Ortes bauen die Einheimischen Mandeln und Zitrusfrüchte an. Viele Einwohner leben hiervon auch. Besonders lohnenswert ist ein Besuch in Tejeda zudem im Frühling. Zu Frühlingsbeginn ist nämlich Mandelblüten-Zeit und die Hänge werden in ein rosafarbenes Blütenmeer gehüllt."
}, {
  name: "Aqualand Maspalomas",
  hash: "Aqualand-Maspalomas",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FAqualandMaspalomas%2Faqualand-maspalomas.jpeg?alt=media&token=fc800b0a-fa6c-4864-9b2b-e315c49aaf29",
  foldername: "adventure/AqualandMaspalomas",
  location: [27.77820834764711, -15.604511372289734],
  orientation: "Süden",
  tags: ["Maspalomas"],
  topic: "Erlebnisse",
}, {
  name: "Lago Taurito Water Park",
  hash: "Lago-Taurito",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FLagoTauritoWaterPark%2FLago%20Taurito%20Water%20Park.jpeg?alt=media&token=bd4f7b0d-62c2-494c-99c5-dd8a99893468",
  foldername: "adventure/LagoTauritoWaterPark",
  location: [27.815970720988382, -15.752395674905006],
  orientation: "Süden",
  tags: ["Puerto de Mogan"],
  topic: "Erlebnisse",
}, {
  name: "Palmitos Park",
  hash: "Palmitos-Park",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FPalmitosPark%2FPalmitos-Park-Gran-Canaria-Delfinarium.webp?alt=media&token=bdb4ecc1-4027-4691-a6db-1c674b27198f",
  foldername: "adventure/PalmitosPark",
  location: [27.833328875088124, -15.617164213285177],
  orientation: "Süden",
  tags: ["Maspalomas"],
  topic: "Erlebnisse",
  info: "Besonders beliebt bei Familien ist zudem der Zoo “Palmitos Park“. Hier erwarten dich u.a. verschiedene Säugetiere, Vögel, Reptilien, ein Aquarium, ein botanischer Garten und ein Orchideen-Haus. Das Highlight ist für viele Parkbesucher aber das Delfinarium. Hier werden mehrfach täglich Delfin-Shows gezeigt. Das Delfinarium ist ca. 3.000 m2 groß und fasst in insgesamt drei Becken über 4 Millionen Liter Wasser. Es beherbergt 9 Delfine und bietet Platz für etwa 1.500 Zuschauer."
}, {
  name: "Cocodrilo Park",
  hash: "Cocodrilo-Park",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FCocodriloPark%2FKrokodil-Cocodrilo-Park-Gran-Canaria.webp?alt=media&token=9abf89c7-4a5d-44bf-a033-c7be87fd8892",
  foldername: "adventure/CocodriloPark",
  location: [27.8865199558453, -15.468482590425499],
  orientation: "Osten",
  tags: ["Arinaga"],
  topic: "Erlebnisse",
  info: "Eine Alternative zum Palmitos Park stellt der Cocodrilo Park Gran Canaria dar. Dieser Park rettet verwahrloste Tiere aus Privathaushalten und gibt ihnen ein neues Zuhause. Es handelt sich hierbei um eine Tier-Auffangstation. Im Park kannst du u.a. Papageien, Krokodile, Affen, Erdmännchen, Eidechsen, Waschbären, Schildkröten und Tiger sehen. Insgesamt leben über 500 Tiere im Cocodrilo Park. Ein Highlight im Park sind für viele Besucher die Affen-Fütterungen, die um 12:00 und 16:00 Uhr stattfinden. Zudem gibt es um 13:00 Uhr auch eine Krokodil-Show. Der Tierpark umfasst eine Fläche von über 22.000 Quadratmetern. Für deinen Besuch ist der Cocodrilo Park freitags, samstags und sonntags zwischen 10:30 und 16:30 Uhr geöffnet. Die Eintrittsgebühr liegt bei 9,90 Euro für Erwachsene bzw. 6,90 Euro für Kinder zwischen 3 und 12 Jahre."
}, {
  name: "Sioux City Park (Wild West)",
  hash: "Sioux-City-Park",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FSiouxCityPark%2FSioux-City-Park-Wild-West-Gran-Canaria.webp?alt=media&token=13c0428b-bc24-486a-bf62-0f268d6bc3e3",
  foldername: "adventure/SiouxCityPark",
  location: [27.786251877366478, -15.535065789687811],
  orientation: "Süden",
  tags: ["Maspalomas"],
  topic: "Erlebnisse",
  info: "Beim Sioux City Park handelt es sich um eine nachgebaute Wild West Stadt. Sie wurde im Jahr 1972 erbaut und sollte ursprünglich als Set für Western-Filme dienen. Im Park werden u.a. Cowboyshows mit Banküberfällen und Schießereien aufgeführt. Auch ein nachgebauter Wild West Saloon ist vorhanden. Hier kannst du im authentischen Ambiente etwas trinken. Darüberhinaus verfügt der Sioux City Park auch über einen kleinen Zoo. Hier kannst du z.B. Erdmännchen, Krokodile, Cachena-Rinder, Hühner und Emusse sehen. Der Wild West Park ist Dienstags bis Freitags zwischen 10:00 und 15:00 Uhr sowie Samstags und Sonntags zwischen 10:00 und 16:00 Uhr geöffnet. Montags ist Ruhetag."
}, {
  name: "Poema del Mar (Aquarium)",
  hash: "Poema-de-Mar",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FPoemaDelMar%2FFisch-Poema-del-Mar-Aquarium-Gran-Canaria.webp?alt=media&token=e62a17c3-b7ff-4292-ad28-5b0657ae9bb4",
  foldername: "adventure/PoemaDelMar",
  location: [28.14459705120603, -15.428194444834382],
  orientation: "Norden",
  tags: ["Las Palmas"],
  topic: "Erlebnisse",
  info: "Ebenfalls ein beliebter Ausflug mit Kindern führt dich ins Aquarium “Poema del Mar” nach Las Palmas. Das Aquarium ist aufwendig gestaltet und unterteilt sich in drei Themenbereiche: Dschungel, Strand-Riff und Tiefsee. Du findest hier u.a. Schildkröten, Rochen, Tintenfische, Quallen, Krebse, Piranhas und Aale. Auch Krokodile und Frösche sind hier beispielsweise Zuhause."
}, {
  name: "U-Boot Tour",
  hash: "U-Boot-Tour",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FUBoot%2FU-Boot-Puerto-de-Mogan.jpeg?alt=media&token=ada3052c-e75b-4862-a6fc-252005187aca",
  foldername: "adventure/UBoot",
  location: [27.815831042139582, -15.764239144005666],
  orientation: "Süden",
  tags: ["Puerto de Mogan"],
  topic: "Erlebnisse",
  info: "Die U-Boot Fahrten finden täglich um 10:00, 11:00, 12:00, 13:00, 14:00, 15:30, 16:20 und 17:10 Uhr statt. Tickets kannst du bereits vorab online über GetYourGuide kaufen. Der Fahrtpreis beträgt 31,50 Euro pro Person bzw. 16 Euro für Kinder zwischen 2 und 12 Jahre (Stand Juni 2019)."
}, {
  name: "Delfin Tour",
  hash: "Delfin-Tour",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FDelfinTour%2FGran-Canaria-Aktivitaeten-Delfine-anschauen-Bootstour.webp?alt=media&token=952662c2-3405-4399-9b19-31cd1b9c297c",
  foldername: "adventure/DelfinTour",
  location: [27.78223149134437, -15.712588955247108],
  orientation: "Süden",
  tags: ["Maspalomas"],
  topic: "Erlebnisse",
}, {
  name: "Museo Elder de la Ciencia y la Tecnologia",
  hash: "Museo-Tecnologia",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FMuseoTechnologia%2FMuseo%20Elder%20de%20la%20Ciencia%20y%20la%20Tecnologia.jpeg?alt=media&token=a3c6d6a8-a0f1-4916-8a03-945f7ad56ebd",
  foldername: "adventure/MuseoTechnologia",
  location: [28.141173083982842, -15.429720771552047],
  orientation: "Norden",
  tags: ["Las Palmas"],
  topic: "Erlebnisse"
}, {
  name: "E-Scooter-Chopper",
  hash: "E-Scooter-Chopper",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FEScooterChopper%2FE-Scooter-Chopper-Tour-im-Su%CC%88den.jpeg?alt=media&token=69b5f7c6-4399-4d6c-93d4-4e73020b1c2b",
  foldername: "adventure/EScooterChopper",
  location: [27.75232402480098, -15.574901373678477],
  orientation: "Süden",
  tags: ["Maspalomas"],
  topic: "Erlebnisse",
  info: "Die Elektroroller im Harley-Stil sind eine bequeme und umweltfreundliche Möglichkeit, den Süden Gran Canarias während deines Urlaubs mühelos mit deinem Partner, deiner Familie oder deinen Freunden zu erkunden - nur ein Führerschein ist erforderlich. Es ist empfehlenswert, dein beeindruckendes Erlebnis mit einem Besuch der Meloneras-Promenade abzurunden, die als die schönste Promenade im Süden Gran Canarias gilt und einen hervorragenden Blick auf das Meer bietet."
}, {
  name: "Radtour",
  hash: "Radtour",
  image: "https://firebasestorage.googleapis.com/v0/b/gran-canaria-4e556.appspot.com/o/sightseeings%2Fadventure%2FRadtour%2FRadtour-durch-Maspalomas.jpeg?alt=media&token=5b932f9c-d596-49e4-9105-8c91b52e45cf",
  foldername: "adventure/Radtour",
  location: [27.752305035430396, -15.574869187172254],
  orientation: "Süden",
  tags: ["Maspalomas"],
  topic: "Erlebnisse",
  info: "Begib dich auf eine selbstgeführte und personalisierte Tour durch Gran Canara mit dem Stadtrad, eine bequeme und ökologische Alternative, um den Süden der Insel zu entdecken. Du kannst dein Fahrrad für 10 Stunden oder für 1-7 Tage mieten. Als nächstes besuchst du den Botanischen Park von Maspalomas, der eine Fläche von 12.000 Quadratmetern einnimmt und mehr als 500 tropische Pflanzenarten beherbergt. Eine weitere Sehenswürdigkeit ist die Oase von Maspalomas, auch bekannt als Charca, eine kleine Lagune, die als Winterquartier für 40 Zugvogelarten dient, von denen 23 Arten hier nisten. Setze die Tour fort und besuche den alten Leuchtturm von Maspalomas, der seit 1980 in Betrieb ist und 2005 von der Regierung zum Kulturgut erklärt wurde. Um dieses beeindruckende Erlebnis abzurunden, fährst du zur Meloneras-Promenade, die als die schönste und luxuriöseste Promenade im Süden Gran Canarias gilt und einen hervorragenden Blick auf das Meer bietet. Wenn du dich für Geschichte und Archäologie interessierst, solltest du der alten archäologischen Stätte indigenen Ursprungs 'Punta de las Mujeres' einen Besuch abstatten. Die Stätte wird oft von einer friedlichen und harmlosen Kolonie von Gran Canaria-Eidechsen bevölkert, einer endemischen Art, die von vielen als Symbol der Insel angesehen wird."
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
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getTravelDocs } from "../../code/firebase";
import { FotoUploadDto } from "../../code/nobs/UploadNobs";
import { WcFotostory } from "../../components/fotostory/WcFotostory";
import { fotoPreviewStyles } from "./fotopreview-styles";

@customElement("wc-foto-preview")
export class WcFotoPreview extends LitElement {
  static get styles() {
    return [fotoPreviewStyles];
  };

  @property({ type: Array }) fotos: Array<FotoUploadDto>;
  @property({ type: Object }) fotostory: FotoUploadDto;
  @property({ type: Object }) date: Date = new Date();
  @property({ type: String }) month: string = 'Juni';
  @property({ type: Boolean }) showStory: boolean = false;

  connectedCallback() {
    super.connectedCallback();

    this.loadFotos();
  };

  async loadFotos() {
    const fotos: Array<FotoUploadDto> = [];
    try {
      await getTravelDocs()
        .then((data: any) => {
          data.forEach((doc: any) => fotos.push(doc));
        })
        .catch((error: string) => console.log('no traveldocs found', error));
    } catch (error) {
      console.log(error);
    }
    this.fotos = fotos;
    console.log(this.fotos)
  };

  renderFotostory() {
    return new WcFotostory(this.fotostory);
  }

  renderFotos(daySelected: number, monthSelected: number): void {
    const filter = this.fotos.filter((story: FotoUploadDto) => new Date(story.date).getDate() === daySelected && new Date(story.date).getMonth() + 1 === monthSelected);
    this.fotostory = filter[0];
    this.showStory = true;
  };

  renderJuneCalendar(): TemplateResult {
    const array = [];
    for (let i = 1; i <= 30; i++) {
      array.push(i);
    }
    return html`
      <div class="date-box disabled"></div>
      ${array.map((x, idx) => html`
      <div class="date-box" @click=${(): void => this.renderFotos(idx + 1, 6)}>
        <span class="date-text ${this.date.getDate() === idx + 1 && this.date.getMonth() === 5 ? 'today' : ''}">${idx + 1}</span>
      </div>`)}
      <div class="date-box disabled"></div><div class="date-box disabled"></div>
      <div class="date-box disabled"></div><div class="date-box disabled"></div>
    `;
  };

  renderJulyCalendar(): TemplateResult {
    const array = [];
    for (let i = 1; i <= 31; i++) {
      array.push(i);
    }
    return html`
      <div class="date-box disabled"></div>
      <div class="date-box disabled"></div>
      <div class="date-box disabled"></div>
      ${array.map((x, idx) => html`
      <div class="date-box" @click=${(): void => this.renderFotos(idx + 1, 7)}>
        <span class="date-text ${this.date.getDate() === idx + 1 && this.date.getMonth() === 6 ? 'today' : ''}">${idx + 1}</span>
      </div>`)}
      <div class="date-box disabled"></div>
    `;
  }

  render(): TemplateResult {
    return html`
      <div class="welcome-page">
        <!-- <div class="header">
          <wc-icon primaryColor="aqua" icon="camera-retro-duotone" style="height: 35px; width: 35px; margin-right: 15px;"></wc-icon>
          <h1 class="title"> Sonnige Grüße von der Insel</h1>
          <wc-icon primaryColor="aqua" icon="camera-retro-duotone" style="height: 35px; width: 35px; margin-left: 15px;"></wc-icon>
        </div> -->
        <div class="foto-story-container ${this.showStory ? '' : 'hidden'}">
          ${this.renderFotostory()}
          <div class="back-to-calendar" @click=${() => this.showStory = false}>
          <wc-icon primaryColor="gray" icon="angle-left" style="width: 25px; height: 25px; margin-right: 10px;"></wc-icon>
            Zurück zum Kalender
          </div>
        </div>
        <div class="foto-calendar ${this.showStory ? 'hidden' : ''}">
          <img src=${this.month === 'Juni' ? "https://firebasestorage.googleapis.com/v0/b/fuerteventura-d4e75.appspot.com/o/fuerteventura_551.jpeg?alt=media&token=5660bdc4-9f90-4a28-9898-f2865ef4ac60" : "https://firebasestorage.googleapis.com/v0/b/fuerteventura-d4e75.appspot.com/o/fuerteventura-3-playa-cofete.jpeg?alt=media&token=ee0a5768-73b6-4b92-9a79-cb2ccd7a9a5f"} alt="fuerte">
          <div class="calendar-month">
            <wc-icon primaryColor=${this.month === 'Juli' ? "warning" : "ocher"} icon="angle-left" style=${this.month === 'Juli' && 'cursor: pointer'} @click=${() => this.month = 'Juni'}></wc-icon>
            ${this.month} 2021
            <wc-icon primaryColor=${this.month === 'Juni' ? "warning" : "ocher"} icon="angle-right" style=${this.month === 'Juni' && 'cursor: pointer'} @click=${() => this.month = 'Juli'}></wc-icon>
          </div>
          <div class="table-header">
            <div class="calendar-day">Mo</div>
            <div class="calendar-day">Di</div>
            <div class="calendar-day">Mi</div>
            <div class="calendar-day">Do</div>
            <div class="calendar-day">Fr</div>
            <div class="calendar-day">Sa</div>
            <div class="calendar-day">So</div>
          </div>

          <div class="month june ${this.month === 'Juni' ? '' : 'hidden'}">
            ${this.renderJuneCalendar()}
          </div>
          <div class="month july ${this.month === 'Juli' ? '' : 'hidden'}">
            ${this.renderJulyCalendar()}
          </div>
        </div> 
      </div>
    `;
  };
};
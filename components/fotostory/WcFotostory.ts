import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FotoUploadDto } from "../../code/nobs/UploadNobs";
import { fotostoryStyles } from "./fotostoryStyles";

@customElement("wc-fotostory")
export class WcFotostory extends LitElement {
  static get styles() {
    return [fotostoryStyles];
  };

  @property({ type: Object }) fotostory: FotoUploadDto;

  constructor(fotostory: FotoUploadDto) {
    super();

    this.fotostory = fotostory;
  };

  render(): TemplateResult {
    return html`
    ${this.fotostory ? html`
      <div class="fotostory-container">
        <h1 class="title">${this.fotostory.headline}</h1>
        ${this.fotostory.story ? html`<p style="text-align: justify;">${this.fotostory.story}</p>` : ''}
        <div class="image-container">
          ${this.fotostory.images?.map((img: string) => html`<img src=${img} alt="fuerte">`)}
        </div>
        
        
      </div>
    ` : html`
      <div style="margin-top: 50px;">
        <lottie-player class="lottie" src="https://assets1.lottiefiles.com/packages/lf20_ORPnX5.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
      </div>`}      
    `;
  };
};
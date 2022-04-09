var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Nobs } from "../../classes/helpers/Nobs";
import { createTravelDocument } from "../../code/firebase";
import { UploadNobs } from "../../code/nobs/UploadNobs";
import { WcUploadFotos } from "../upload-fotos/WcUploadFotos";
import { formStyles } from "./form-styles";
let WcUploadForm = class WcUploadForm extends LitElement {
    static get styles() {
        return [formStyles];
    }
    ;
    setState(nobs) {
        this.state = new UploadNobs(nobs, this.state);
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        const nobs = new Nobs();
        nobs.setProperty(this.state, 'id', '');
        this.setState(nobs);
    }
    ;
    async handleSubmit(e) {
        e.preventDefault();
        try {
            await createTravelDocument(this.state);
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
    handleChange(e) {
        const nobs = new Nobs();
        const name = e.target.name;
        const value = e.target.value;
        nobs.setProperty(this.state, name, value);
        this.setState(nobs);
    }
    ;
    handleStory(e) {
        const nobs = new Nobs();
        const name = e.target.name;
        const value = e.target.value.split('_b');
        nobs.setProperty(this.state, name, value);
        this.setState(nobs);
    }
    ;
    handleLocation(e) {
        const nobs = new Nobs();
        const name = e.target.name;
        const value = e.target.value.split(',');
        nobs.setProperty(this.state, name, value);
        this.setState(nobs);
    }
    ;
    renderFileLoader() {
        const foldername = this.state ? this.state.foldername : '';
        const date = this.state ? this.state.date : '';
        return new WcUploadFotos(foldername, date);
    }
    ;
    render() {
        return html `
      <div class="upload-form">
        <form @submit=${this.handleSubmit}>
          <input name="headline" type="text" placeholder="headline" @change=${this.handleChange} required>
          <textarea name="story" placeholder="story about the day ..." @change=${this.handleStory}></textarea>
          <input name="date" type="date" @change=${this.handleChange} required>
          <input name="location" type="text" placeholder="location" @change=${this.handleLocation} required>
          <input name="popup" type="text" placeholder="popup" @change=${this.handleChange} required>
          <input name="image" type="text" placeholder="image" @change=${this.handleChange} required>
          <input name="foldername" type="text" placeholder="folder name" @change=${this.handleChange} required>

          <!-- ${this.renderFileLoader()} -->

          <button type="submit">ADD FOTO STORY</button>
        </form>
      </div>
    `;
    }
    ;
};
__decorate([
    property({ type: Object })
], WcUploadForm.prototype, "state", void 0);
WcUploadForm = __decorate([
    customElement("wc-upload-form")
], WcUploadForm);
export { WcUploadForm };
;
//# sourceMappingURL=WcUploadForm.js.map
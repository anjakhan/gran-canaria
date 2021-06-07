import { LitElement, html, TemplateResult } from "lit";
import { customElement, query } from "lit/decorators.js";
import { createMap } from "../../code/leaflet";
import { mapStyles } from "./map-styles";

@customElement("wc-fuerte-map-page")
export class WcFuerteMapPage extends LitElement {
  @query('#mapid') mapid: HTMLDivElement;

  static get styles() {
    return [mapStyles];
  };

  renderMap() {
    const mapContainer = document.createElement('div');
    mapContainer.setAttribute('id', 'mapid');
    mapContainer.style.height = '100%';
    mapContainer.style.width = '130%';
    this.shadowRoot?.append(mapContainer);

    createMap(mapContainer);
  };

  render(): TemplateResult {
    return html`
        ${this.renderMap()}
    `;
  };
};
import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { createToDoMap } from "../../code/leaflet";
import { Sightseeing } from "../../pages/all-island-page/sightseeings";
import { WcIcon } from "../icons/WcIcon";
import { mapStyles } from "./map-styles";

@customElement("wc-map-component")
export class WcMapComponent extends LitElement {

  static get styles() {
    return [mapStyles, css`
      .container { 
        height: 100%; 
        width: 100% 
      }

      #mapid {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    `];
  };

  @property({ type: String }) mapType: "satellite" | "streets" | "roadmap" | "hikingmap" = "streets";
  @property({ type: Array }) sightseeings: Sightseeing[] = [];
  @property({ type: Array }) location: [number, number] | undefined;
  @property({ type: Number }) zoom: number = 10;

  @query('#mapid') map: HTMLDivElement;

  constructor(mapType: "satellite" | "streets" | "roadmap" | "hikingmap", sightseeings: Sightseeing[], location: [number, number] | undefined, zoom: number) {
    super();

    this.mapType = mapType;
    this.sightseeings = sightseeings;
    this.location = location;
    this.zoom = zoom;
  }

  renderMap() {
    window.setTimeout(() => {
      if (this.map) {
        createToDoMap(this.map, "streets", this.sightseeings, undefined, 10);

        const layerBtn = <HTMLLinkElement>this.map?.querySelector("a.leaflet-control-layers-toggle");
        if (layerBtn) {
          layerBtn.style.width = "30px";
          layerBtn.style.height = "30px";
          layerBtn.style.padding = "5px 7px";

          const icon = new WcIcon();
          icon.primaryColor = "black";
          icon.icon = "layer-group";

          layerBtn.appendChild(icon);
        }
      }
    }, 0)
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.renderMap();
  }

  render(): TemplateResult {
    return html`
      <div class="container" id="mapid"></div>
    `;
  };
};
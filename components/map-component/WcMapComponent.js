var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { createToDoMap } from "../../code/leaflet";
import { WcIcon } from "../icons/WcIcon";
import { mapStyles } from "./map-styles";
let WcMapComponent = class WcMapComponent extends LitElement {
    constructor(mapType, sightseeings, location, zoom) {
        super();
        this.mapType = "streets";
        this.sightseeings = [];
        this.zoom = 10;
        this.mapType = mapType;
        this.sightseeings = sightseeings;
        this.location = location;
        this.zoom = zoom;
    }
    static get styles() {
        return [mapStyles, css `
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
    }
    ;
    renderMap() {
        window.setTimeout(() => {
            if (this.map) {
                createToDoMap(this.map, "streets", this.sightseeings, undefined, 10);
                const layerBtn = this.map?.querySelector("a.leaflet-control-layers-toggle");
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
        }, 0);
    }
    connectedCallback() {
        super.connectedCallback();
        this.renderMap();
    }
    render() {
        return html `
      <div class="container" id="mapid"></div>
    `;
    }
    ;
};
__decorate([
    property({ type: String })
], WcMapComponent.prototype, "mapType", void 0);
__decorate([
    property({ type: Array })
], WcMapComponent.prototype, "sightseeings", void 0);
__decorate([
    property({ type: Array })
], WcMapComponent.prototype, "location", void 0);
__decorate([
    property({ type: Number })
], WcMapComponent.prototype, "zoom", void 0);
__decorate([
    query('#mapid')
], WcMapComponent.prototype, "map", void 0);
WcMapComponent = __decorate([
    customElement("wc-map-component")
], WcMapComponent);
export { WcMapComponent };
;
//# sourceMappingURL=WcMapComponent.js.map
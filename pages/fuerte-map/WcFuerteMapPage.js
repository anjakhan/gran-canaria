var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { createMap } from "../../code/leaflet";
import { mapStyles } from "./map-styles";
let WcFuerteMapPage = class WcFuerteMapPage extends LitElement {
    static get styles() {
        return [mapStyles];
    }
    ;
    renderMap() {
        var _a;
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'mapid');
        mapContainer.style.height = '100vh';
        mapContainer.style.width = '100vw';
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.append(mapContainer);
        createMap(mapContainer);
    }
    ;
    render() {
        return html `
        ${this.renderMap()}
    `;
    }
    ;
};
__decorate([
    query('#mapid')
], WcFuerteMapPage.prototype, "mapid", void 0);
WcFuerteMapPage = __decorate([
    customElement("wc-fuerte-map-page")
], WcFuerteMapPage);
export { WcFuerteMapPage };
;
//# sourceMappingURL=WcFuerteMapPage.js.map
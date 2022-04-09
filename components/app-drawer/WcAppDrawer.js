var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icons/WcIcon";
import { drawerStyles } from './drawer-styles';
import { config } from "../../config";
export const canariaMenu = [{
        name: 'all-island',
        title: 'All Island',
        icon: 'camera-retro-duotone'
    }, {
        name: 'cities',
        title: 'Städte',
        icon: 'calendar-alt'
    }, {
        name: 'mountains',
        title: 'Berge',
        icon: 'map-duotone'
    }, {
        name: 'caves',
        title: 'Höhlen',
        icon: 'plane-duotone'
    }, {
        name: 'water',
        title: 'Wasser',
        icon: 'plane-duotone'
    }, {
        name: 'parks',
        title: 'Parks',
        icon: 'plane-duotone'
    }, {
        name: 'adventure',
        title: 'Erlebnisse',
        icon: 'plane-duotone'
    }];
let WcAppDrawer = class WcAppDrawer extends LitElement {
    constructor(selectedDrawer) {
        super();
        this.selectedDrawer = 'all-island';
        this.drawerOpen = false;
        this.selectedDrawer = selectedDrawer;
    }
    static get styles() {
        return [drawerStyles];
    }
    ;
    ;
    connectedCallback() {
        super.connectedCallback();
    }
    ;
    getDrawerSelection(callback) {
        this.callback = callback;
    }
    ;
    openDrawer() {
        this.drawerOpen = !this.drawerOpen;
        this.requestUpdate();
    }
    ;
    setDrawerSelection(name) {
        this.selectedDrawer = name;
        if (this.callback) {
            this.callback(this.selectedDrawer);
        }
        ;
    }
    ;
    render() {
        return html `
      ${config.isMobile ? html `<wc-icon @click=${this.openDrawer} class="menu-icon" primaryColor="toolbar" icon=${this.drawerOpen ? 'close' : 'bars-light'}></wc-icon>` : ''} 
      <aside class="drawer ${!this.drawerOpen && config.isMobile ? 'hidden' : ''}">
        ${canariaMenu.map(d => html `<div class="tab ${this.selectedDrawer === d.name ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${() => this.setDrawerSelection(d.name)}><wc-icon primaryColor=${this.selectedDrawer === d.name ? "green" : "toolbar"} icon=${d.icon}></wc-icon>${d.title}</div>`)}
      </aside>
    `;
    }
    ;
};
__decorate([
    property({ type: String })
], WcAppDrawer.prototype, "selectedDrawer", void 0);
WcAppDrawer = __decorate([
    customElement("wc-app-drawer")
], WcAppDrawer);
export { WcAppDrawer };
;
//# sourceMappingURL=WcAppDrawer.js.map
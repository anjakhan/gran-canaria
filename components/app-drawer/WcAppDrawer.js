var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { drawerStyles } from './drawer-styles';
import { config } from "../../config";
import "../icons/WcIcon";
export const canariaMenu = [{
        title: 'Gran-Canaria',
        icon: 'umbrella-beach'
    }, {
        title: 'Städte',
        icon: 'house-tree'
    }, {
        title: 'Berge',
        icon: 'volcano'
    }, {
        title: 'Höhlen',
        icon: 'dungeon'
    }, {
        title: 'Wasser',
        icon: 'water'
    }, {
        title: 'Parks',
        icon: 'trees'
    }, {
        title: 'Erlebnisse',
        icon: 'person-biking-mountain'
    }];
let WcAppDrawer = class WcAppDrawer extends LitElement {
    constructor(selectedDrawer) {
        super();
        this.selectedDrawer = 'Gran-Canaria';
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
      ${config.isMobile ? html `
        <wc-icon 
          @click=${this.openDrawer} 
          class="menu-icon" 
          primaryColor="toolbar" 
          icon=${this.drawerOpen ? 'close' : 'bars-light'}
        ></wc-icon>
      ` : ''} 

      <aside class="drawer ${!this.drawerOpen && config.isMobile ? 'hidden' : ''}">
        ${canariaMenu.map(d => html `
          <div 
            class="tab ${this.selectedDrawer === d.title ? "selected" : ""}" 
            style="display: flex; align-items: center;"
            @click=${() => this.setDrawerSelection(d.title)}
          >
            <wc-icon primaryColor=${this.selectedDrawer === d.title ? "darkblue" : "toolbar"} icon=${d.icon}></wc-icon>
            ${d.title === "Gran-Canaria" ? "Gran Canaria" : d.title}
          </div>
        `)}
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
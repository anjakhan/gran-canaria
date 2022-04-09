var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { logoutFunc } from '../../adminIndex';
import { showCtxMenu } from "../../shared/contextMenu";
import { layoutStyles, navbarStyles } from './layout-styles';
import { WcAppDrawer, canariaMenu } from "../app-drawer/WcAppDrawer";
import { WcAllIslandPage } from "../../pages/all-island-page/WcAllIslandPage";
import { WcTopicPage } from "../../pages/topic-page/WcTopicPage";
import "../icons/WcIcon";
import { assertNever } from "../../shared/tools";
let WcAppLayout = class WcAppLayout extends LitElement {
    constructor() {
        super(...arguments);
        this.selectedDrawer = 'all-island';
        this._handleHashChange = () => {
            this.selectedDrawer = this.setSelectedDrawer();
            this.requestUpdate();
        };
    }
    static get styles() {
        return [layoutStyles, navbarStyles];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('hashchange', this._handleHashChange);
        this.selectedDrawer = this.setSelectedDrawer();
    }
    setSelectedDrawer() {
        const hash = location.hash;
        const idx = canariaMenu.findIndex(pd => pd.name === hash.slice(1));
        if (hash === '#' || hash === '') {
            return 'all-island';
        }
        else if (idx > -1) {
            return hash.slice(1);
        }
        else {
            return this.selectedDrawer;
        }
    }
    renderDrawer() {
        const td = new WcAppDrawer(this.selectedDrawer);
        td.getDrawerSelection(selectedDrawer => {
            this.selectedDrawer = selectedDrawer;
        });
        return td;
    }
    ;
    getUserContent() {
        switch (this.selectedDrawer) {
            case ('all-island'): return new WcAllIslandPage();
            case ('cities'): return new WcTopicPage('Städte');
            case ('mountains'): return new WcTopicPage('Berge');
            case ('water'): return new WcTopicPage('Wasser');
            case ('parks'): return new WcTopicPage('Parks');
            case ('adventure'): return new WcTopicPage('Erlebnisse');
            case ('caves'): return new WcTopicPage('Höhlen');
            default: assertNever(this.selectedDrawer);
        }
        ;
    }
    ;
    userClick(e) {
        showCtxMenu(e, [
            {
                caption: "Log out",
                callback: () => {
                    this.logoutUser();
                }
            },
        ]);
    }
    ;
    logoutUser() {
        logoutFunc();
    }
    ;
    render() {
        return html `
        <div class="account-layout">
            <header>
                <wc-icon primaryColor="island" icon="island" class="island"></wc-icon><h3>Gran Canaria</h3><div style="min-width: 60px;"></div>
                <div class="user-icon" style="position: fixed; right: 40px; top; 0px; z-index: 99;">
                    <wc-icon @mousedown=${(e) => this.userClick(e)} primaryColor="island" icon="user-solid" style="width: 30px; height: 25px; cursor: pointer;"></wc-icon>
                </div>
            </header>

            <div class="drawer">${this.renderDrawer()}</div>  
            
            <div id="user-content">
                ${this.getUserContent()}
            </div>
        </div>
        `;
    }
    ;
};
__decorate([
    property({ type: String })
], WcAppLayout.prototype, "selectedDrawer", void 0);
WcAppLayout = __decorate([
    customElement("wc-app-layout")
], WcAppLayout);
export { WcAppLayout };
;
//# sourceMappingURL=WcAppLayout.js.map
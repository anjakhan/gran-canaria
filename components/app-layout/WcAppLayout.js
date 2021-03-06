var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { logoutFunc } from '../../adminIndex';
import { showCtxMenu } from "../../shared/contextMenu";
import { layoutStyles, navbarStyles } from './layout-styles';
import { WcAppDrawer, canariaMenu } from "../app-drawer/WcAppDrawer";
import { WcAllIslandPage } from "../../pages/all-island-page/WcAllIslandPage";
import { WcTopicPage } from "../../pages/topic-page/WcTopicPage";
import { WcDetailsPage } from "../../pages/details-page/WcDetailsPage";
import { sightseeings } from "../../pages/all-island-page/sightseeings";
import { WcMapComponent } from "../map-component/WcMapComponent";
import "../icons/WcIcon";
import { config } from "../../config";
let WcAppLayout = class WcAppLayout extends LitElement {
    constructor() {
        super(...arguments);
        this.selectedDrawer = 'Gran-Canaria';
        this.showTitleAndMap = true;
        this._handleHashChange = () => {
            this.selectedDrawer = this.setSelectedDrawer();
            this.requestUpdate();
        };
    }
    static get styles() {
        return [layoutStyles, navbarStyles, css `
            .title {
                text-align: center;
                padding-right: 150px;
                color: #555;
            }

            .map-container {
                position: relative;
                height: 450px;
                width: 100%;
                grid-row: 2;
                grid-column: 1;
                border: 1px solid var(--fuerte-background-color);
                border-radius: 4px;
                margin-bottom: 20px;
            }

            @media (max-width: ${config.mobileDeviceWidth}px) {
                .title {
                    font-size: 18px;
                    padding: 0;
                    width: 100%;
                    margin-top: 30px;
                    margin-bottom: 20px;
                }
            }
        `];
    }
    ;
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('hashchange', this._handleHashChange);
        this.selectedDrawer = this.setSelectedDrawer();
    }
    setSelectedDrawer() {
        const hash = location.hash;
        this.showTitleAndMap = true;
        const idx = canariaMenu.findIndex(pd => pd.title === hash.slice(1));
        const ss = sightseeings.findIndex(ss => ss.hash === hash.slice(1));
        if (hash === '#' || hash === '') {
            return 'Gran-Canaria';
        }
        else if (idx > -1) {
            return hash.slice(1);
        }
        else if (ss > -1) {
            this.showTitleAndMap = false;
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
        const sightseeing = sightseeings.filter(s => s.hash === this.selectedDrawer)[0];
        switch (this.selectedDrawer) {
            case ('Gran-Canaria'): return new WcAllIslandPage();
            case ('St??dte'): return new WcTopicPage('St??dte');
            case ('Berge'): return new WcTopicPage('Berge');
            case ('Wasser'): return new WcTopicPage('Wasser');
            case ('Parks'): return new WcTopicPage('Parks');
            case ('Erlebnisse'): return new WcTopicPage('Erlebnisse');
            case ('H??hlen'): return new WcTopicPage('H??hlen');
            case (sightseeing?.hash):
                this.selectedDrawer = sightseeing.topic;
                return new WcDetailsPage(sightseeing);
            default: this.selectedDrawer;
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
    renderMap() {
        const td = new WcMapComponent("streets", sightseeings, undefined, 10);
        return td;
    }
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
                ${this.showTitleAndMap ? html `
                    <h1 class="title">${this.selectedDrawer === "Gran-Canaria" ? "Sehensw??rdigkeiten" : this.selectedDrawer === "Berge" ? "Berglandschaften auf Gran Canaria" : this.selectedDrawer + " auf Gran Canaria"}</h1>
                    
                    <div class="map-container">
                        ${this.renderMap()}
                    </div>
                ` : ''}
                
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
__decorate([
    property({ type: Boolean })
], WcAppLayout.prototype, "showTitleAndMap", void 0);
WcAppLayout = __decorate([
    customElement("wc-app-layout")
], WcAppLayout);
export { WcAppLayout };
;
//# sourceMappingURL=WcAppLayout.js.map
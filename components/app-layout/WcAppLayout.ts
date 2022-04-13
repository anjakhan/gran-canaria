import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import { logoutFunc } from '../../adminIndex';
import { showCtxMenu } from "../../shared/contextMenu";

import { layoutStyles, navbarStyles } from './layout-styles';
import { WcAppDrawer, canariaMenu } from "../app-drawer/WcAppDrawer";
import { WcAllIslandPage } from "../../pages/all-island-page/WcAllIslandPage";
import { WcTopicPage } from "../../pages/topic-page/WcTopicPage";
import { WcDetailsPage } from "../../pages/details-page/WcDetailsPage";

import "../icons/WcIcon";
import { sightseeings, Topic } from "../../pages/all-island-page/sightseeings";

@customElement("wc-app-layout")
export class WcAppLayout extends LitElement {
    @property({ type: String }) selectedDrawer: Topic = 'Gran-Canaria';

    static get styles() {
        return [layoutStyles, navbarStyles];
    };

    private _handleHashChange = () => {
        this.selectedDrawer = <Topic>this.setSelectedDrawer();
        this.requestUpdate();
    }

    connectedCallback(): void {
        super.connectedCallback();

        window.addEventListener('hashchange', this._handleHashChange);
        this.selectedDrawer = <Topic>this.setSelectedDrawer();
    }

    setSelectedDrawer(): string {
        const hash = location.hash;
        const idx = canariaMenu.findIndex(pd => pd.title === hash.slice(1));
        const ss = sightseeings.findIndex(ss => ss.hash === hash.slice(1));

        if (hash === '#' || hash === '') {
            return 'Gran-Canaria';
        } else if (idx > -1) {
            return hash.slice(1);
        } else if (ss > -1) {
            return hash.slice(1);
        } else {
            return this.selectedDrawer;
        }
    }

    renderDrawer(): LitElement {
        const td = new WcAppDrawer(this.selectedDrawer);
        td.getDrawerSelection(selectedDrawer => {
            this.selectedDrawer = selectedDrawer;
        });
        return td;
    };

    getUserContent(): LitElement | TemplateResult | void {
        const sightseeing = sightseeings.filter(s => s.hash === this.selectedDrawer)[0];
        switch (this.selectedDrawer) {
            case ('Gran-Canaria'): return new WcAllIslandPage();
            case ('Städte'): return new WcTopicPage('Städte');
            case ('Berge'): return new WcTopicPage('Berge');
            case ('Wasser'): return new WcTopicPage('Wasser');
            case ('Parks'): return new WcTopicPage('Parks');
            case ('Erlebnisse'): return new WcTopicPage('Erlebnisse');
            case ('Höhlen'): return new WcTopicPage('Höhlen');
            case (sightseeing?.hash): this.selectedDrawer = sightseeing.topic; return new WcDetailsPage(sightseeing);
            default: this.selectedDrawer;
        };
    };

    userClick(e: MouseEvent): void {
        showCtxMenu(e, [
            {
                caption: "Log out",
                callback: () => {
                    this.logoutUser();
                }
            },
        ]);
    };

    logoutUser() {
        logoutFunc();
    };

    render(): TemplateResult {
        return html`
        <div class="account-layout">
            <header>
                <wc-icon primaryColor="island" icon="island" class="island"></wc-icon><h3>Gran Canaria</h3><div style="min-width: 60px;"></div>
                <div class="user-icon" style="position: fixed; right: 40px; top; 0px; z-index: 99;">
                    <wc-icon @mousedown=${(e: MouseEvent): void => this.userClick(e)} primaryColor="island" icon="user-solid" style="width: 30px; height: 25px; cursor: pointer;"></wc-icon>
                </div>
            </header>

            <div class="drawer">${this.renderDrawer()}</div>  
            
            <div id="user-content">
                ${this.getUserContent()}
            </div>
        </div>
        `;
    };
};

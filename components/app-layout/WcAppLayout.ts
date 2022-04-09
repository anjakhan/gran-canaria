import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import { logoutFunc } from '../../adminIndex';
import { showCtxMenu } from "../../shared/contextMenu";

import { layoutStyles, navbarStyles } from './layout-styles';
import { WcAppDrawer, canariaMenu } from "../app-drawer/WcAppDrawer";
import { WcAllIslandPage } from "../../pages/all-island-page/WcAllIslandPage";
import { WcTopicPage } from "../../pages/topic-page/WcTopicPage";

import "../icons/WcIcon";
import { assertNever } from "../../shared/tools";

export type SelectedTopic = "all-island" | "cities" | "mountains" | "caves" | "water" | "parks" | "adventure";

@customElement("wc-app-layout")
export class WcAppLayout extends LitElement {
    @property({ type: String }) selectedDrawer: SelectedTopic = 'all-island';

    static get styles() {
        return [layoutStyles, navbarStyles];
    };

    private _handleHashChange = () => {
        this.selectedDrawer = <SelectedTopic>this.setSelectedDrawer();
        this.requestUpdate();
    }

    connectedCallback(): void {
        super.connectedCallback();

        window.addEventListener('hashchange', this._handleHashChange);
        this.selectedDrawer = <SelectedTopic>this.setSelectedDrawer();
    }

    setSelectedDrawer(): string {
        const hash = location.hash;
        const idx = canariaMenu.findIndex(pd => pd.name === hash.slice(1));

        if (hash === '#' || hash === '') {
            return 'all-island'
        } else if (idx > -1) {
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
        switch (this.selectedDrawer) {
            case ('all-island'): return new WcAllIslandPage();
            case ('cities'): return new WcTopicPage('Städte');
            case ('mountains'): return new WcTopicPage('Berge');
            case ('water'): return new WcTopicPage('Wasser');
            case ('parks'): return new WcTopicPage('Parks');
            case ('adventure'): return new WcTopicPage('Erlebnisse');
            case ('caves'): return new WcTopicPage('Höhlen');
            default: assertNever(this.selectedDrawer);
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

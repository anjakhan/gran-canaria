import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../icons/WcIcon";

import { drawerStyles } from './drawer-styles';
import { config } from "../../config";
import { iconName } from "../icons/WcIcon";
import { Topic } from "../../pages/all-island-page/sightseeings";

type callbackType = (selectedDrawer: Topic) => void;
type CanariaMenu = Array<{ title: Topic, icon: iconName }>

export const canariaMenu: CanariaMenu = [{
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

@customElement("wc-app-drawer")
export class WcAppDrawer extends LitElement {
  static get styles() {
    return [drawerStyles];
  };

  @property({ type: String }) selectedDrawer: Topic = 'Gran-Canaria';
  private drawerOpen: boolean = false;
  callback: callbackType | undefined;

  constructor(selectedDrawer: Topic) {
    super();

    this.selectedDrawer = selectedDrawer;
  };

  connectedCallback() {
    super.connectedCallback();
  };

  getDrawerSelection(callback: callbackType): void {
    this.callback = callback;
  };

  openDrawer(): void {
    this.drawerOpen = !this.drawerOpen;
    this.requestUpdate();
  };

  setDrawerSelection(name: Topic): void {
    this.selectedDrawer = name;
    if (this.callback) {
      this.callback(this.selectedDrawer);
    };
  };

  render(): TemplateResult {
    return html`
      ${config.isMobile ? html`<wc-icon @click=${this.openDrawer} class="menu-icon" primaryColor="toolbar" icon=${this.drawerOpen ? 'close' : 'bars-light'}></wc-icon>` : ''} 
      <aside class="drawer ${!this.drawerOpen && config.isMobile ? 'hidden' : ''}">
        ${canariaMenu.map(d => html`<div class="tab ${this.selectedDrawer === d.title ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${(): void => this.setDrawerSelection(d.title)}><wc-icon primaryColor=${this.selectedDrawer === d.title ? "darkblue" : "toolbar"} icon=${d.icon}></wc-icon>${d.title}</div>`)}
      </aside>
    `;
  };
};

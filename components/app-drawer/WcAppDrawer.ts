import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../icons/WcIcon";

import { drawerStyles } from './drawer-styles';
import { config } from "../../config";
import { iconName } from "../icons/WcIcon";
import { Topic } from "../../code/leaflet";
import { SelectedTopic } from "../app-layout/WcAppLayout";

type callbackType = (selectedDrawer: SelectedTopic) => void;
type CanariaMenu = Array<{ name: SelectedTopic, title: Topic, icon: iconName }>

export const canariaMenu: CanariaMenu = [{
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

@customElement("wc-app-drawer")
export class WcAppDrawer extends LitElement {
  static get styles() {
    return [drawerStyles];
  };

  @property({ type: String }) selectedDrawer: SelectedTopic = 'all-island';
  private drawerOpen: boolean = false;
  callback: callbackType | undefined;

  constructor(selectedDrawer: SelectedTopic) {
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

  setDrawerSelection(name: SelectedTopic): void {
    this.selectedDrawer = name;
    if (this.callback) {
      this.callback(this.selectedDrawer);
    };
  };

  render(): TemplateResult {
    return html`
      ${config.isMobile ? html`<wc-icon @click=${this.openDrawer} class="menu-icon" primaryColor="toolbar" icon=${this.drawerOpen ? 'close' : 'bars-light'}></wc-icon>` : ''} 
      <aside class="drawer ${!this.drawerOpen && config.isMobile ? 'hidden' : ''}">
        ${canariaMenu.map(d => html`<div class="tab ${this.selectedDrawer === d.name ? "selected" : ""}" style="display: flex; align-items: center;"
          @click=${(): void => this.setDrawerSelection(d.name)}><wc-icon primaryColor=${this.selectedDrawer === d.name ? "green" : "toolbar"} icon=${d.icon}></wc-icon>${d.title}</div>`)}
      </aside>
    `;
  };
};

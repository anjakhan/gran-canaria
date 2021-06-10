import { LitElement, css, TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("wc-backdrop")
export class WcBackdrop extends LitElement {
  constructor() {
    super();
  };

  static get styles() {
    return css`
      :host, :host * {
          box-sizing: border-box;
      }
      :host  {
          position: absolute;
          left:0;
          top:0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 89;
      }
    `
  };

  private cancelMouse(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("mousedown", this.cancelMouse);
    this.addEventListener("mouseup", this.cancelMouse);
    this.addEventListener("mousemove", this.cancelMouse);
  };

  disconnectedCallback(): void {
    this.removeEventListener("mousedown", this.cancelMouse);
    this.removeEventListener("mouseup", this.cancelMouse);
    this.removeEventListener("mousemove", this.cancelMouse);
    super.disconnectedCallback();
  };

  render(): TemplateResult {
    return html``;
  };
};

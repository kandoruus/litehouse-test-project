export default class MediaModal extends HTMLElement {
  private shadow: ShadowRoot;
  private modalContainer: HTMLElement;
  private backdrop: HTMLElement;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.shadow.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 1000;
        }

        .backdrop {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal {
          position: relative;
          max-width: 600px;
          margin: 10% auto;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

      </style>

      <div class="backdrop"></div>
      <div class="modal">
        <slot></slot>
      </div>
    `;

    this.modalContainer = this.shadow.querySelector(".modal")!;
    this.backdrop = this.shadow.querySelector(".backdrop")!;

    this.backdrop.addEventListener("click", () => this.close());
  }

  connectedCallback() {
    if (this.hasAttribute("open")) {
      this.show();
    }
  }

  public show() {
    this.style.display = "block";
  }

  public close() {
    this.style.display = "none";
    this.removeAttribute("open");
  }

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "open") {
      if (this.hasAttribute("open")) {
        this.show();
      } else {
        this.close();
      }
    }
  }
}

customElements.define("media-modal", MediaModal);

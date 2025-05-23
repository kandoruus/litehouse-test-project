import { BLANK_MEDIA_DATA } from "../app_definitions/constants";
import type { MediaCardData } from "../app_definitions/types";

const style = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
}

:host {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1000;
}

.backdrop {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: relative;
  margin: auto;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  background-color: var(--MID_DARK_COLOR);
  border: 3px solid var(--MID_DARK_COLOR);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--DARK_COLOR);
  box-shadow: 5px 5px 15px black;
  overflow: hidden;
  width: clamp(288px, 80%, 650px)
}

.h2-wrapper {
  background-color: var(--MID_DARK_COLOR);
  width: 100%;
  position: relative;
  height: calc(var(--STANDARD_PADDING) * 2 + 1.15 * var(--LARGE_FONT));
  overflow: visible;
}

h2 {
  color: var(--LIGHT_COLOR);
  background-color: var(--MID_DARK_COLOR);
  font-weight: bolder;
  font-size: var(--LARGE_FONT);
  line-height: 1.15em;
  text-align: center;
  width: 100%;
  padding: var(--STANDARD_PADDING);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

h2:hover {
  white-space: wrap;
  z-index: 1;
  cursor: default;
}

.details-wrapper {
  background-color: var(--LIGHT_COLOR);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
}

figure {
  background-color: var(--LIGHT_COLOR);
  padding: var(--STANDARD_PADDING);
}

figcaption {
  position: absolute;
  left: -10000px;
}

p {
  display: flex;
  padding: var(--STANDARD_PADDING);
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: var(--STANDARD_PADDING);
  padding-top: var(--SMALL_PADDING);
}
`;

export default class MediaModal extends HTMLElement {
  private shadow: ShadowRoot = this.attachShadow({ mode: "open" });
  private data: MediaCardData = BLANK_MEDIA_DATA;

  constructor() {
    super();
    this.connectedCallback();
  }

  connectedCallback = () => {
    this.shadow.innerHTML = `
      <style>
        ${style}
      </style>

      <div class="backdrop">
        <div class="modal">
          <div class="h2-wrapper">
            <h2>${this.data.title}</h2>
          </div>
          <div class="details-wrapper">
            <figure>
              <figcaption>${this.data.title}</figcaption>
              <img src="${this.data.imgUrl}" alt="${this.data.title} Poster" height="402px" width="284px"/>
            </figure>
            <p>${this.data.description}</p>
          </div>
        </div>
      </div>
    `;
    const backdrop = this.shadow.querySelector(".backdrop") as HTMLElement;
    backdrop.addEventListener("click", () => this.close());
  };

  show = (data: MediaCardData) => {
    this.data = data;
    this.connectedCallback();
    this.style.display = "block";
  };

  close = () => {
    this.style.display = "none";
    this.connectedCallback();
    this.data = BLANK_MEDIA_DATA;
  };
}

customElements.define("media-modal", MediaModal);

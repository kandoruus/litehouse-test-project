import { BLANK_MEDIA_DATA } from "../app_definitions/constants";
import type { MediaCardData } from "../app_definitions/types";

const styles: string = `
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
.card {
  background-color: var(--MID_DARK_COLOR);
  border: 3px solid var(--MID_DARK_COLOR);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--DARK_COLOR);
  box-shadow: 5px 5px 15px black;
  overflow: hidden;
  height: 320px;
  width: 288px
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
  padding-top: var(--SMALL_PADDING);
  background-color: var(--LIGHT_COLOR);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

figure {
  background-color: var(--LIGHT_COLOR);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
}

figcaption {
  position: absolute;
  left: -10000px;
}

.card-description {
  display: flex;
  padding: 
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: var(--STANDARD_PADDING);
  padding-top: var(--SMALL_PADDING);
}

p {
  line-height: 1.125rem;
  height: 1.125rem;
  background-color: var(--LIGHT_COLOR);
  overflow: hidden;
  width: 80%;
  word-break: break-all;
}

.details-btn {
  line-height: 1.125rem;
  height: 1.125rem;
  width: fit-content;
  white-space: nowrap;
  background-color: transparent;
  border:none;
  color: var(--DARK_COLOR);
  font-size: 1rem;
}

@media (max-width: 591px){
  .details-btn {
    display: none;
  }
  p {
    width: 100%;
    line-height: 1.125rem;
    height: auto;
    background-color: var(--LIGHT_COLOR);
    overflow: hidden;
    word-break: normal;
  }
  
  .card {
    height: auto;
  }
}
`;

interface MediaCardInterface {
  updateCardData: (data: MediaCardData) => void;
}

export default class MediaCard extends HTMLElement implements MediaCardInterface {
  private shadow: ShadowRoot = this.attachShadow({ mode: "open" });
  private _openModal: (data: MediaCardData) => void;
  private data: MediaCardData;

  constructor(openModal: (data: MediaCardData) => void, data: MediaCardData = BLANK_MEDIA_DATA) {
    super();
    this.data = data;
    this._openModal = openModal;
  }

  connectedCallback = () => {
    if (this.data === BLANK_MEDIA_DATA) {
      this.shadow.innerHTML = "";
      this.style.display = "none";
      return;
    }
    this.style.display = "flex";
    this.shadow.innerHTML = `
      <style>
        ${styles}
      </style>
      <div class="card">
        <div class="h2-wrapper">
          <h2>${this.data.title}</h2>
        </div>
        <div class="details-wrapper">
          <figure>
            <figcaption>${this.data.title}</figcaption>
            <img src="${this.data.imgUrl}" alt="${this.data.title} Poster" height="212px" width="150px"/>
          </figure>
          <div class="card-description">
            <p>${this.data.description}</p>
            <button class="details-btn">...more details</button>
          </div>
        </div>
      </div>
    `;
    const moreDetailsBtn = this.shadow.querySelector(".details-btn") as HTMLButtonElement;
    moreDetailsBtn.onclick = () => {
      this._openModal(this.data);
    };
  };

  updateCardData = (data: MediaCardData) => {
    this.data = data;
    this.connectedCallback();
  };
}

customElements.define("media-card", MediaCard);

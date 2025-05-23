import { BLANK_MEDIA_DATA } from "../utils/constants";
import { setHidden } from "../utils/functions";
import type { MediaCardData } from "../utils/types";

//css for the component
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
  flex-flow: column nowrap;
  align-items: center;
  padding: var(--SMALL_PADDING) var(--STANDARD_PADDING);
}

.card-description-p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  text-overflow: ellipsis;
  line-height: 1.125rem;
  height: calc(5*1.125rem);
  background-color: var(--LIGHT_COLOR);
  overflow: hidden;
  text-align: center;
}

.details-btn, .mobile-details-btn {
  width: fit-content;
  white-space: nowrap;
  background-color: var(--MID_DARK_COLOR);
  border:none;
  color: var(--LIGHT_COLOR);
  font-size: 0.8rem;
  margin-top: var(--SMALL_MARGIN);
  padding: var(--SMALL_PADDING);
  border-radius: 15px;
}

.mobile-details-btn {
    display: none;
}

@media (max-width: 591px){
  .details-btn {
    display: none;
  }

  .mobile-details-btn {
    display: inline-block;
  }

  .full-height {
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    text-overflow: clip;
    height: auto;
    min-height: calc(5*1.125rem);
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

  connectedCallback() {
    this.render();
  }

  // Handles rendering the component UI based on current data
  private render = () => {
    setHidden(this, this.data === BLANK_MEDIA_DATA);
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
            <p class="card-description-p">${this.data.description}</p>
            <button class="details-btn">See More</button>
            <button class="mobile-details-btn">See More</button>
          </div>
        </div>
      </div>
    `;

    // Add event listeners for the details buttons
    const moreDetailsBtn = this.shadow.querySelector(".details-btn") as HTMLButtonElement;
    moreDetailsBtn.onclick = () => {
      this._openModal(this.data);
    };
    const mobileDetailsBtn = this.shadow.querySelector(".mobile-details-btn") as HTMLButtonElement;
    mobileDetailsBtn.onclick = () => {
      this.applyFullHeight();
    };
  };

  // Update card data and re-render
  updateCardData = (data: MediaCardData) => {
    this.data = data;
    this.render();
  };

  //in mobile view, expand the card instead of opening a modal
  private applyFullHeight = () => {
    //get the button and the description
    const descriptionP = this.shadow.querySelector(".card-description-p") as HTMLParagraphElement;
    const detailsBtn = this.shadow.querySelector(".mobile-details-btn") as HTMLButtonElement;
    //toggle the paragraph height
    descriptionP.classList.toggle("full-height");
    //toggle the button text
    if (detailsBtn.innerHTML === "See More") {
      detailsBtn.innerHTML = "See Less";
    } else {
      detailsBtn.innerHTML = "See More";
    }
  };
}

customElements.define("media-card", MediaCard);

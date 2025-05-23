import { BLANK_MEDIA_DATA } from "../utils/constants";
import type { MediaCardData } from "../utils/types";
import MediaCard from "./MediaCard";
import MediaModal from "./MediaModal";

// Styles for the media card list container
const styles: string = `
:host {
  flex-grow: 1;
  display: flex;
}

.media-card-list-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: var(--STANDARD_PADDING);
  width: clamp(320px, 100%, 1300px);
  align-self: center;
  padding: var(--STANDARD_PADDING) 0;
  margin: 0 auto;
}

.hidden {
  display: none;
}
`;

// Interface to ensure the component can update its media card list
interface MediaCardListInterface {
  updateMediaCardList: (data: MediaCardData[]) => void;
}

// Custom web component for listing and updating the MediaCards
export default class MediaCardList extends HTMLElement implements MediaCardListInterface {
  private shadow: ShadowRoot = this.attachShadow({ mode: "open" });
  private mediaCards: MediaCard[] = [];
  private mediaModal: MediaModal = new MediaModal();
  private maxLength: number;

  constructor(maxLength: number) {
    super();
    this.maxLength = maxLength;
  }

  connectedCallback() {
    this.render();
  }

  // Handles rendering the component UI based on current data
  private render = () => {
    // Attach styles to shadow DOM
    this.shadow.innerHTML = `
      <style>
        ${styles}
      </style>
    `;

    const wrapper = document.createElement("div");
    wrapper.classList.add("media-card-list-wrapper");

    // Initialize the modal and add it to the DOM
    wrapper.appendChild(this.mediaModal);

    // Pre-create all media card components
    for (let i = 0; i < this.maxLength; i++) {
      const newCard = new MediaCard(this.mediaModal.show);
      wrapper.appendChild(newCard);
      this.mediaCards.push(newCard);
    }

    this.shadow.appendChild(wrapper);
  };

  // Updates the data for each media card
  updateMediaCardList = (data: MediaCardData[]): void => {
    this.mediaCards.forEach((card, index) => {
      if (index < data.length) {
        card.updateCardData(data[index]);
      } else {
        card.updateCardData(BLANK_MEDIA_DATA);
      }
    });
  };
}

// Register the component
customElements.define("media-card-list", MediaCardList);

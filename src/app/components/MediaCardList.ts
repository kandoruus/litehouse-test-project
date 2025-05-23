import { BLANK_MEDIA_DATA } from "../app_definitions/constants";
import type { MediaCardData } from "../app_definitions/types";
import MediaCard from "./MediaCard";
import MediaModal from "./MediaModal";

const styles: string = `
:host {
  flex-grow: 1;
  display: flex;
}

.media-card-list {
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
`;

interface MediaCardListInterface {
  updateMediaCardList: (data: MediaCardData[]) => void;
}

export default class MediaCardList extends HTMLElement implements MediaCardListInterface {
  private shadow: ShadowRoot = this.attachShadow({ mode: "open" });
  private mediaCards: MediaCard[];
  private mediaModal: MediaModal;

  constructor(maxLength: number) {
    super();
    this.mediaCards = [];
    this.shadow.innerHTML = `
      <style>
        ${styles}
      </style>
    `;
    const wrapper = document.createElement("div");
    wrapper.classList.add("media-card-list");

    this.mediaModal = new MediaModal();
    wrapper.appendChild(this.mediaModal);

    for (let i = 0; i < maxLength; i++) {
      const newCard = new MediaCard(this.mediaModal.show);
      wrapper.appendChild(newCard);
      this.mediaCards.push(newCard);
    }
    this.shadow.appendChild(wrapper);
  }

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

customElements.define("media-card-list", MediaCardList);

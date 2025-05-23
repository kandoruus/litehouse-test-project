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
  height: var(--CARD_HEIGHT);
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
}

.card figure {
  background-color: var(--LIGHT_COLOR);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
}

.card figcaption {
  position: absolute;
  left: -10000px;
}

.card p {
  line-height: 1.125rem;
  background-color: var(--LIGHT_COLOR);
  margin: var(--STANDARD_MARGIN);
  margin-top: var(--SMALL_MARGIN);
  overflow: hidden;
}
`;

interface MediaCardInterface {
  title: string;
  description: string;
  imgUrl: string;
}

export default class MediaCard extends HTMLElement implements MediaCardInterface {
  #shadow: ShadowRoot = this.attachShadow({ mode: "open" });
  title: string;
  description: string;
  imgUrl: string;

  constructor(title: string, description: string, imgUrl: string) {
    super();
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
    this.connectedCallBack();
  }

  connectedCallBack() {
    this.#shadow.innerHTML = `
      <style>
        ${styles}
      </style>
      <div class="card">
        <div class="h2-wrapper">
          <h2>${this.title}</h2>
        </div>
        <div class="details-wrapper">
          <figure>
            <figcaption>${this.title}</figcaption>
            <img src="${this.imgUrl}" alt="${this.title} Poster" height="212px" width="150px"/>
          </figure>
          <p>${this.description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("media-card", MediaCard);

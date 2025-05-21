const styles: string = `
.card {
  min-height: 100px;
  background-color: var(--LIGHT_COLOR);
  border: 2px solid var(--MID_COLOR);
  border-radius: 15px;
  padding: var(--STANDARD_PADDING);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--DARK_COLOR);
}

.card figure {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: var(--STANDARD_MARGIN);
}

.card figcaption {
  font-weight: bolder;
  font-size: var(--LARGE_FONT);
  margin-bottom: var(--STANDARD_MARGIN);
  text-align: center;
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
      <link href="./src/app/styles.css" rel="stylesheet" type="text/css">
      <style>
        ${styles}
      </style>
      <div class="card">
        <figure>
          <figcaption>${this.title}</figcaption>
          <img src="${this.imgUrl}" alt="${this.title} Poster" height="554px" width="390px"/>
        </figure>
        <p>${this.description}</p>
      </div>
    `;
  }
}

customElements.define("media-card", MediaCard);

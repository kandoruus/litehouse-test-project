import { NAV_BTN_DATA } from "../data/constants";
import { createNavBarBtn } from "../data/functions";

const styles: string = `
.nav-bar-wrapper {
  display: flex;
  justify-content: center;
  gap: var(--SMALL_PADDING);
}
.nav-bar-button {
  background-color: transparent;
  border:none;
  color: var(--LIGHT_COLOR);
  font-size: 1.1rem;
}
.nav-bar-button:disabled {
  color: var(--DISABLED_COLOR);
}
`;

interface NavBarInterface {
  enableButtons(onFirstPage: boolean, onLastPage: boolean): void;
  disableButtons(): void;
}

export default class NavBar extends HTMLElement implements NavBarInterface {
  #shadow: ShadowRoot = this.attachShadow({ mode: "open" });

  #btns: HTMLButtonElement[] = [];

  constructor(onClickFunctions: (() => void)[]) {
    super();
    this.#shadow.innerHTML = `
      <style>
        ${styles}
      </style>
    `;
    const wrapper = document.createElement("div");
    wrapper.classList.add("nav-bar-wrapper");

    NAV_BTN_DATA.forEach(({ id, text }, index) => {
      this.#btns.push(createNavBarBtn(id, text, onClickFunctions[index]));
    });
    this.#btns.forEach((btn) => {
      wrapper.appendChild(btn);
    });

    this.#shadow.appendChild(wrapper);
  }

  disableButtons(): void {
    this.#btns.forEach((btn) => {
      btn.disabled = true;
    });
  }

  enableButtons(onFirstPage: boolean, onLastPage: boolean): void {
    if (onFirstPage) {
      this.#btns.forEach((btn, index) => {
        btn.disabled = index < 2;
      });
    } else if (onLastPage) {
      this.#btns.forEach((btn, index) => {
        btn.disabled = index > 1;
      });
    } else {
      this.#btns.forEach((btn) => {
        btn.disabled = false;
      });
    }
  }
}

customElements.define("nav-bar", NavBar);

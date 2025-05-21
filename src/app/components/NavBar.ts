import AppStore from "../data/AppStore";

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
}
.nav-bar-button:disabled {
  color: var(--DISABLED_COLOR);
}
`;

export default class NavBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <style>
        ${styles}
      </style>
    `;
    const wrapper = document.createElement("div");
    wrapper.classList.add("nav-bar-wrapper");
    const firstBtn = document.createElement("button");
    firstBtn.classList.add("nav-bar-button");
    firstBtn.id = "first-btn";
    firstBtn.innerHTML = "First";
    const prevBtn = document.createElement("button");
    prevBtn.classList.add("nav-bar-button");
    prevBtn.id = "prev-btn";
    prevBtn.innerHTML = "&lt;&lt; Prev";
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("nav-bar-button");
    nextBtn.id = "next-btn";
    nextBtn.innerHTML = "Next &gt;&gt;";
    const lastBtn = document.createElement("button");
    lastBtn.classList.add("nav-bar-button");
    lastBtn.id = "last-btn";
    lastBtn.innerHTML = "Last";
    wrapper.appendChild(firstBtn);
    wrapper.appendChild(prevBtn);
    wrapper.appendChild(nextBtn);
    wrapper.appendChild(lastBtn);
    this.appendChild(wrapper);

    const appStore: AppStore = AppStore.instance;
    firstBtn.addEventListener("click", appStore.goToFirstPage);
    prevBtn.addEventListener("click", appStore.goToPrevPage);
    nextBtn.addEventListener("click", appStore.goToNextPage);
    lastBtn.addEventListener("click", appStore.goToLastPage);
  }
}

customElements.define("nav-bar", NavBar);

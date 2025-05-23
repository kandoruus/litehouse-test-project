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

.nav-bar-page-number {
  font-size: 1.5rem;
  text-decoration: underline;
}

.hidden {
display: none;
}
`;

const navBtnIds = ["first-btn", "prev-btn", "next-btn", "last-btn"];

interface PaginationControlBarInterface {
  lastPageNum: number;
}

export default class PaginationControlBar
  extends HTMLElement
  implements PaginationControlBarInterface
{
  private shadow: ShadowRoot = this.attachShadow({ mode: "open" });
  private handlePageChange: (newPage: number) => Promise<void>;
  private buttonsData: { pageNumber: number; button: HTMLButtonElement }[] = [];
  private currentPage: { pageNumber: number; element: HTMLDivElement };
  private firstEllipsis: HTMLDivElement;
  private lastEllipsis: HTMLDivElement;

  constructor(handlePageChange: (newPage: number) => Promise<void>) {
    super();
    this.handlePageChange = handlePageChange;
    this.shadow.innerHTML = `
      <style>
        ${styles}
      </style>
    `;
    const wrapper = document.createElement("div");
    wrapper.classList.add("nav-bar-wrapper");

    navBtnIds.forEach((id) => {
      const button = this.createNavBarBtn(id, "1");
      const pageNumber = 1;
      this.buttonsData.push({ button, pageNumber });
    });

    this.firstEllipsis = this.createEllipsis("first-ellipsis");
    this.lastEllipsis = this.createEllipsis("last-ellipsis");
    this.currentPage = this.createCurrentPageNumber();
    wrapper.appendChild(this.buttonsData[0].button);
    wrapper.appendChild(this.firstEllipsis);
    wrapper.appendChild(this.buttonsData[1].button);
    wrapper.appendChild(this.currentPage.element);
    wrapper.appendChild(this.buttonsData[2].button);
    wrapper.appendChild(this.lastEllipsis);
    wrapper.appendChild(this.buttonsData[3].button);
    this.shadow.appendChild(wrapper);
  }

  set lastPageNum(lastPageNum: number) {
    this.buttonsData[3].pageNumber = lastPageNum;
    this.buttonsData[3].button.innerText = lastPageNum + "";
    this.updateDisplay(1);
  }

  private createNavBarBtn = (id: string, text: string = ""): HTMLButtonElement => {
    const btn = document.createElement("button");
    btn.classList.add("nav-bar-button", "hidden");
    btn.id = id;
    btn.innerHTML = text;
    btn.onclick = () => {
      this.handleButtonClick(btn.id);
    };
    return btn;
  };

  private createEllipsis = (id: string): HTMLDivElement => {
    const p = document.createElement("div");
    p.classList.add("nav-bar-ellipsis", "hidden");
    p.id = id;
    p.innerHTML = "...";
    return p;
  };

  private createCurrentPageNumber = (): { pageNumber: number; element: HTMLDivElement } => {
    const element = document.createElement("div");
    element.classList.add("nav-bar-page-number");
    element.innerText = "1";
    return { pageNumber: 1, element };
  };

  private handleButtonClick = (btnId: string): void => {
    const clickedButton = this.buttonsData.find(({ button }) => {
      return btnId === button.id;
    });
    if (clickedButton === undefined) return;
    const newPage = clickedButton.pageNumber;
    this.disableButtons();
    this.handlePageChange(clickedButton.pageNumber).then(() => {
      this.updateDisplay(newPage);
      this.enableButtons();
    });
  };

  private updateDisplay = (newPage: number): void => {
    this.updateCurrentPage(newPage);
    this.updateBtns(newPage);
    this.updateEllipsis();
  };

  private updateCurrentPage = (newPage: number): void => {
    this.currentPage.pageNumber = newPage;
    this.currentPage.element.innerText = newPage + "";
  };

  private updateBtns = (newPage: number): void => {
    const firstBtnData = this.buttonsData[0];
    const prevBtnData = this.buttonsData[1];
    const nextBtnData = this.buttonsData[2];
    const lastBtnData = this.buttonsData[3];
    prevBtnData.pageNumber = newPage - 1;
    prevBtnData.button.innerText = `${newPage - 1}`;
    nextBtnData.pageNumber = newPage + 1;
    nextBtnData.button.innerText = `${newPage + 1}`;

    if (newPage - 1 > 1) {
      firstBtnData.button.classList.remove("hidden");
      prevBtnData.button.classList.remove("hidden");
    } else if (newPage - 1 > 0) {
      firstBtnData.button.classList.add("hidden");
      prevBtnData.button.classList.remove("hidden");
    } else {
      firstBtnData.button.classList.add("hidden");
      prevBtnData.button.classList.add("hidden");
    }

    if (lastBtnData.pageNumber - newPage > 1) {
      lastBtnData.button.classList.remove("hidden");
      nextBtnData.button.classList.remove("hidden");
    } else if (lastBtnData.pageNumber - newPage > 0) {
      lastBtnData.button.classList.add("hidden");
      nextBtnData.button.classList.remove("hidden");
    } else {
      lastBtnData.button.classList.add("hidden");
      nextBtnData.button.classList.add("hidden");
    }
  };

  private updateEllipsis = (): void => {
    if (this.currentPage.pageNumber - 1 <= 2) {
      this.firstEllipsis.classList.add("hidden");
    } else {
      this.firstEllipsis.classList.remove("hidden");
    }
    if (this.buttonsData[3].pageNumber - this.currentPage.pageNumber <= 2) {
      this.lastEllipsis.classList.add("hidden");
    } else {
      this.lastEllipsis.classList.remove("hidden");
    }
  };

  private disableButtons = (): void => {
    this.buttonsData.forEach(({ button }) => {
      button.disabled = true;
    });
  };

  private enableButtons = (): void => {
    this.buttonsData.forEach(({ button }) => {
      button.disabled = false;
    });
  };
}

customElements.define("pagination-control-bar", PaginationControlBar);

import { setHidden } from "../utils/functions";

// CSS styles as a string to apply inside shadow DOM
const styles: string = `
.nav-bar-wrapper {
  display: flex;
  justify-content: center;
  gap: var(--SMALL_PADDING);
}
.nav-bar-button {
  background-color: transparent;
  border: none;
  color: var(--LIGHT_COLOR);
  font-size: 1.1rem;
}

.nav-bar-page-number {
  font-size: 1.5rem;
  text-decoration: underline;
}

.hidden {
  display: none;
}
`;

// List of button IDs used in the control bar
const navBtnIds: string[] = ["first-btn", "prev-btn", "next-btn", "last-btn"];

// Interface to define the lastPageNum setter
interface PaginationControlBarInterface {
  lastPageNum: number;
}

// Custom web component for pagination controls
export default class PaginationControlBar
  extends HTMLElement
  implements PaginationControlBarInterface
{
  // Shadow DOM root for encapsulation
  private shadow: ShadowRoot = this.attachShadow({ mode: "open" });
  // Callback for external page change handling
  private handlePageChange: (newPage: number) => Promise<void>;
  // Navigation button data: holds page number and button element
  private buttonsData: { pageNumber: number; button: HTMLButtonElement }[] = [];
  // Current page indicator and associated element
  private currentPage: { pageNumber: number; element: HTMLDivElement };
  // Ellipsis elements indicating skipped pages
  private firstEllipsis: HTMLDivElement;
  private lastEllipsis: HTMLDivElement;

  constructor(handlePageChange: (newPage: number) => Promise<void>) {
    super();
    this.handlePageChange = handlePageChange;
    // Add styles to shadow DOM
    this.shadow.innerHTML = `<style>${styles}</style>`;

    const wrapper = document.createElement("div");
    wrapper.classList.add("nav-bar-wrapper");

    // Create navigation buttons and initialize to page 1
    navBtnIds.forEach((id) => {
      const button = this.createNavBarBtn(id, "1");
      this.buttonsData.push({ button, pageNumber: 1 });
    });

    // Create ellipsis and current page elements
    this.firstEllipsis = this.createEllipsis("first-ellipsis");
    this.lastEllipsis = this.createEllipsis("last-ellipsis");
    this.currentPage = this.createCurrentPageNumber();

    // Append all controls to wrapper in correct order
    wrapper.append(
      this.buttonsData[0].button, // first
      this.firstEllipsis,
      this.buttonsData[1].button, // prev
      this.currentPage.element,
      this.buttonsData[2].button, // next
      this.lastEllipsis,
      this.buttonsData[3].button // last
    );

    this.shadow.appendChild(wrapper);
  }

  // Set the last page number and update button label
  set lastPageNum(lastPageNum: number) {
    this.buttonsData[3].pageNumber = lastPageNum;
    this.buttonsData[3].button.innerText = lastPageNum.toString();
    this.updateDisplay(1);
  }

  // Create a navigation button and bind click handler
  private createNavBarBtn(id: string, text: string = ""): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.classList.add("nav-bar-button", "hidden");
    btn.id = id;
    btn.innerHTML = text;
    btn.onclick = () => this.handleButtonClick(btn.id);
    return btn;
  }

  // Create an ellipsis element
  private createEllipsis(id: string): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("nav-bar-ellipsis", "hidden");
    div.id = id;
    div.innerHTML = "...";
    return div;
  }

  // Create the current page display element
  private createCurrentPageNumber(): { pageNumber: number; element: HTMLDivElement } {
    const element = document.createElement("div");
    element.classList.add("nav-bar-page-number");
    element.innerText = "1";
    return { pageNumber: 1, element };
  }

  // Handle nav button click events
  private handleButtonClick(btnId: string): void {
    const clickedButton = this.buttonsData.find(({ button }) => btnId === button.id);
    if (!clickedButton) return;

    const newPage = clickedButton.pageNumber;
    this.disableButtons();
    this.handlePageChange(newPage).then(() => {
      this.enableButtons();
    });
    this.updateDisplay(newPage);
  }

  // Update full control bar state for new page
  private updateDisplay(newPage: number): void {
    window.scrollTo(0, 0);
    this.updateCurrentPage(newPage);
    this.updateBtns(newPage);
    this.updateEllipsis();
  }

  // Set current page element and state
  private updateCurrentPage(newPage: number): void {
    this.currentPage.pageNumber = newPage;
    this.currentPage.element.innerText = newPage.toString();
  }

  // Update buttons: visibility and page numbers for prev/next
  private updateBtns(newPage: number): void {
    const [firstBtnData, prevBtnData, nextBtnData, lastBtnData] = this.buttonsData;

    prevBtnData.pageNumber = newPage - 1;
    prevBtnData.button.innerText = (newPage - 1).toString();
    nextBtnData.pageNumber = newPage + 1;
    nextBtnData.button.innerText = (newPage + 1).toString();

    // Show/hide buttons based on new page context
    setHidden(firstBtnData.button, !(newPage - 1 > 1));
    setHidden(prevBtnData.button, !(newPage - 1 > 0));
    setHidden(lastBtnData.button, !(lastBtnData.pageNumber - newPage > 1));
    setHidden(nextBtnData.button, !(lastBtnData.pageNumber - newPage > 0));
  }

  // Show or hide ellipsis based on proximity to edges
  private updateEllipsis(): void {
    setHidden(this.firstEllipsis, this.currentPage.pageNumber - 1 <= 2);
    setHidden(this.lastEllipsis, this.buttonsData[3].pageNumber - this.currentPage.pageNumber <= 2);
  }

  // Disable all buttons to prevent spam clicking during async
  private disableButtons(): void {
    this.buttonsData.forEach(({ button }) => (button.disabled = true));
  }

  // Re-enable all buttons after async completes
  private enableButtons(): void {
    this.buttonsData.forEach(({ button }) => (button.disabled = false));
  }
}

// Register the custom web component
customElements.define("pagination-control-bar", PaginationControlBar);

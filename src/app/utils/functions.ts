// Toggle visibility of elements via the "hidden" class
export const setHidden = (element: HTMLElement, shouldHide: boolean): void => {
  element.classList.toggle("hidden", shouldHide);
};

// check that the requested page is in a valid range and is different than the current page
export function isValidPage(page: number, current: number, last: number): boolean {
  return page > 0 && page <= last && page !== current;
}

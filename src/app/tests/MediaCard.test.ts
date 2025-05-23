import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock the setHidden function
vi.mock("../utils/functions", () => ({
  setHidden: vi.fn(),
}));

import MediaCard from "../components/MediaCard";
import type { MediaCardData } from "../utils/types";

describe("MediaCard Web Component", () => {
  let container: HTMLElement;
  const sampleData: MediaCardData = {
    title: "Naruto",
    description: "Moments prior to Naruto Uzumaki's birth, a huge demon...",
    imgUrl: "https://example.com/naruto.jpg",
  };

  const sampleData2: MediaCardData = {
    title: "Cowboy Bebop",
    description:
      "In the year 2071, humanity has colonized several of the planets and moons of the solar...",
    imgUrl: "https://example.com/cowboybebop.jpg",
  };

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  it("should render title and description correctly", () => {
    const openModalMock = vi.fn();
    const card = new MediaCard(openModalMock, sampleData);
    container.appendChild(card);

    const shadow = card.shadowRoot!;
    expect(shadow.querySelector("h2")?.textContent).toBe(sampleData.title);
    expect(shadow.querySelector("p")?.textContent).toBe(sampleData.description);
  });

  it("should render the new title and description correctly after updateCardData is called", () => {
    const openModalMock = vi.fn();
    const card = new MediaCard(openModalMock, sampleData);
    container.appendChild(card);

    card.updateCardData(sampleData2);

    const shadow = card.shadowRoot!;
    expect(shadow.querySelector("h2")?.textContent).toBe(sampleData2.title);
    expect(shadow.querySelector("p")?.textContent).toBe(sampleData2.description);
  });

  it("should call openModal on desktop details button click", () => {
    const openModalMock = vi.fn();
    const card = new MediaCard(openModalMock, sampleData);
    container.appendChild(card);

    const button = card.shadowRoot!.querySelector(".details-btn") as HTMLButtonElement;
    button.click();
    expect(openModalMock).toHaveBeenCalledWith(sampleData);
  });

  it("should toggle full-height class and button text on mobile button click", () => {
    const openModalMock = vi.fn();
    const card = new MediaCard(openModalMock, sampleData);
    container.appendChild(card);

    const shadow = card.shadowRoot!;
    const button = shadow.querySelector(".mobile-details-btn") as HTMLButtonElement;
    const paragraph = shadow.querySelector(".card-description-p") as HTMLParagraphElement;

    expect(paragraph.classList.contains("full-height")).toBe(false);
    expect(button.textContent).toBe("See More");

    button.click();

    expect(paragraph.classList.contains("full-height")).toBe(true);
    expect(button.textContent).toBe("See Less");

    button.click();
    expect(paragraph.classList.contains("full-height")).toBe(false);
    expect(button.textContent).toBe("See More");
  });
});

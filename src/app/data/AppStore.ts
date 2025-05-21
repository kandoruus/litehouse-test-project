import { loadKitsuData } from "./functions";
import type { AppData, MediaData } from "./types";
import { BLANK_APP_DATA } from "./constants";
import MediaCard from "../components/MediaCard";

interface AppStoreInterface {
  dataList: MediaData[];
  render(): void;
  load(): void;
  goToFirstPage(): void;
  goToLastPage(): void;
  goToNextPage(): void;
  goToPrevPage(): void;
}

export default class AppStore implements AppStoreInterface {
  static instance: AppStore = new AppStore();

  #main: HTMLElement;

  constructor(private _appData: AppData = BLANK_APP_DATA) {
    this.#main = document.getElementById("main") as HTMLElement;
  }

  get dataList(): MediaData[] {
    return this._appData._dataList;
  }

  render = (): void => {
    this.#main.innerHTML = "";
    this._appData._dataList.forEach((dataItem) => {
      const { title, description, imgUrl } = dataItem;
      const mediaCard = new MediaCard(title, description, imgUrl);
      this.#main.appendChild(mediaCard);
    });
    const firstBtn = document.getElementById("first-btn") as HTMLButtonElement;
    const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
    const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
    const lastBtn = document.getElementById("last-btn") as HTMLButtonElement;
    if (this._appData._prevPage === "") {
      firstBtn.disabled = true;
      prevBtn.disabled = true;
      nextBtn.disabled = false;
      lastBtn.disabled = false;
    } else if (this._appData._nextPage === "") {
      firstBtn.disabled = false;
      prevBtn.disabled = false;
      nextBtn.disabled = true;
      lastBtn.disabled = true;
    } else {
      firstBtn.disabled = false;
      prevBtn.disabled = false;
      nextBtn.disabled = false;
      lastBtn.disabled = false;
    }
  };

  load = (): void => {
    loadKitsuData().then((newData) => {
      this._appData = { ...newData };
      this.render();
    });
  };

  goToFirstPage = (): void => {
    loadKitsuData(this._appData._firstPage).then((newData) => {
      this._appData = { ...newData };
      this.render();
    });
  };
  goToLastPage = (): void => {
    loadKitsuData(this._appData._lastPage).then((newData) => {
      this._appData = { ...newData };
      this.render();
    });
  };
  goToNextPage = (): void => {
    if (this._appData._nextPage === "") return;
    loadKitsuData(this._appData._nextPage).then((newData) => {
      this._appData = { ...newData };
      this.render();
    });
  };
  goToPrevPage = (): void => {
    if (this._appData._prevPage === "") return;
    loadKitsuData(this._appData._prevPage).then((newData) => {
      this._appData = { ...newData };
      this.render();
    });
  };
}

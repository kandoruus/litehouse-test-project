import { loadKitsuData } from "./functions";
import type { AppData, MediaData } from "../types";
import { BLANK_APP_DATA } from "./constants";
import MediaCard from "../components/MediaCard";

interface AppStoreInterface {
  dataList: MediaData[];
  renderMediaCards(): void;
  load(): void;
  goToFirstPage(): void;
  goToLastPage(): void;
  goToNextPage(): void;
  goToPrevPage(): void;
}

export default class AppStore implements AppStoreInterface {
  static instance: AppStore = new AppStore();

  #container: HTMLElement;

  constructor(private _appData: AppData = BLANK_APP_DATA) {
    this.#container = document.getElementById("main") as HTMLElement;
  }

  get dataList(): MediaData[] {
    return this._appData._dataList;
  }

  renderMediaCards = (): void => {
    this.#container.innerHTML = "";
    this._appData._dataList.forEach((dataItem) => {
      const { title, description, imgUrl } = dataItem;
      const mediaCard = new MediaCard(title, description, imgUrl);
      this.#container.appendChild(mediaCard);
    });
  };

  load = (): void => {
    loadKitsuData().then((newData) => {
      this._appData = { ...newData };
      this.renderMediaCards();
    });
  };

  goToFirstPage = (): void => {
    loadKitsuData(this._appData._firstPage).then((newData) => {
      this._appData = { ...newData };
    });
  };
  goToLastPage = (): void => {
    loadKitsuData(this._appData._lastPage).then((newData) => {
      this._appData = { ...newData };
    });
  };
  goToNextPage = (): void => {
    if (this._appData._nextPage === "") return;
    loadKitsuData(this._appData._nextPage).then((newData) => {
      this._appData = { ...newData };
    });
  };
  goToPrevPage = (): void => {
    if (this._appData._prevPage === "") return;
    loadKitsuData(this._appData._prevPage).then((newData) => {
      this._appData = { ...newData };
    });
  };
}

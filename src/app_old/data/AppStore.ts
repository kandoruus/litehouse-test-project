import { loadKitsuData } from "./functions";
import type { AppData, MediaData } from "./types";
import { BLANK_APP_DATA } from "./constants";
import MediaCard from "../components/MediaCard";
import NavBar from "../components/NavBar";

interface AppStoreInterface {
  dataList: MediaData[];
  onFirstPage: boolean;
  onLastPage: boolean;
  render(): void;
  load(url?: string): void;
  goToFirstPage(): void;
  goToLastPage(): void;
  goToNextPage(): void;
  goToPrevPage(): void;
}

export default class AppStore implements AppStoreInterface {
  static instance: AppStore = new AppStore();

  #mediaList: HTMLElement;
  #navBar: NavBar;

  constructor(private _appData: AppData = BLANK_APP_DATA) {
    this.#mediaList = document.getElementById("media-list") as HTMLElement;
    const footer = document.getElementById("footer") as HTMLElement;
    this.#navBar = new NavBar([
      this.goToFirstPage,
      this.goToPrevPage,
      this.goToNextPage,
      this.goToLastPage,
    ]);
    footer.appendChild(this.#navBar);
  }

  get dataList(): MediaData[] {
    return this._appData._dataList;
  }

  get onFirstPage(): boolean {
    return this._appData._prevPage === "";
  }

  get onLastPage(): boolean {
    return this._appData._nextPage === "";
  }

  render = (): void => {
    this.#mediaList.innerHTML = "";
    this._appData._dataList.forEach((dataItem) => {
      const { title, description, imgUrl } = dataItem;
      const mediaCard = new MediaCard(title, description, imgUrl);
      this.#mediaList.appendChild(mediaCard);
    });
    window.scrollTo(0, 0);
  };

  load = (url?: string): void => {
    this.#navBar.disableButtons();
    loadKitsuData(url).then((newData) => {
      this._appData = { ...newData };
      this.render();
      this.#navBar.enableButtons(this.onFirstPage, this.onLastPage);
    });
  };

  goToFirstPage = (): void => {
    this.load(this._appData._firstPage);
  };
  goToLastPage = (): void => {
    this.load(this._appData._lastPage);
  };
  goToNextPage = (): void => {
    if (this._appData._nextPage === "") return;
    this.load(this._appData._nextPage);
  };
  goToPrevPage = (): void => {
    if (this._appData._prevPage === "") return;
    this.load(this._appData._prevPage);
  };
}

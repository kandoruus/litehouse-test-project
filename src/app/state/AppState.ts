import type { MediaCardData } from "../utils/types";
import { fetchPage, transformMediaResponse, getLastPageNumber } from "../utils/mediaApi";
import { isValidPage } from "../utils/functions";
import { CARDS_PER_PAGE } from "../utils/constants";

interface AppStateInterface {
  handlePageChange(newPage: number): Promise<void>;
  init(
    cardsPerPage: number,
    baseUrl: string,
    headers: HeadersInit | undefined,
    updateMediaCardList: (data: MediaCardData[]) => void
  ): Promise<void>;
  lastPageNum: number;
}

export default class AppState implements AppStateInterface {
  static instance: AppState = new AppState();

  private _currentPageNum: number = 1;
  private _lastPageNum: number = 1;
  private _cardsPerPage: number = CARDS_PER_PAGE;
  private _baseUrl: string = "";
  private _headers: HeadersInit | undefined = {};
  private _currentPageData: MediaCardData[] = [];
  private _firstPageData: MediaCardData[] = [];
  private _prevPageData: MediaCardData[] = [];
  private _nextPageData: MediaCardData[] = [];
  private _lastPageData: MediaCardData[] = [];
  private _updateMediaCardList: (data: MediaCardData[]) => void = (_data: MediaCardData[]) =>
    void {};

  constructor() {}

  // initialize state data and make initial API calls
  init = async (
    cardsPerPage: number,
    baseUrl: string,
    headers: HeadersInit | undefined,
    updateMediaCardList: (data: MediaCardData[]) => void
  ): Promise<void> => {
    // set the API base URL and headers, the cards per page, and the callback function for updating the media card list
    this._cardsPerPage = cardsPerPage;
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._updateMediaCardList = updateMediaCardList;

    // fetch the first page's data and total page count, then update the media card list
    const firstPageResponse = await fetchPage(baseUrl, 1, cardsPerPage, headers);
    this._currentPageData = transformMediaResponse(firstPageResponse);
    this._firstPageData = this._currentPageData;
    this._updateMediaCardList(this._currentPageData);
    this._lastPageNum = getLastPageNumber(firstPageResponse.meta.count, cardsPerPage);

    // preload next and last page data
    this._lastPageData = await this.getPageData(this._lastPageNum);
    await this.updateNextPageData();
  };

  // fetch the API response and return the transformed MediaCardData for a specific page
  private getPageData = async (pageNumber: number): Promise<MediaCardData[]> => {
    const response = await fetchPage(this._baseUrl, pageNumber, this._cardsPerPage, this._headers);
    return transformMediaResponse(response);
  };

  // fetch and update the previous page data
  private updatePrevPageData = async (): Promise<void> => {
    this._prevPageData = await this.getPageData(Math.max(this._currentPageNum - 1, 1));
  };

  // fetch and update the next page data
  private updateNextPageData = async (): Promise<void> => {
    this._nextPageData = await this.getPageData(
      Math.min(this._currentPageNum + 1, this._lastPageNum)
    );
  };

  // return the last page number
  get lastPageNum(): number {
    return this._lastPageNum;
  }

  // change to the specified page
  handlePageChange = async (newPage: number): Promise<void> => {
    if (!isValidPage(newPage, this._currentPageNum, this._lastPageNum)) return;

    if (newPage === 1) {
      await this.goToFirstPage();
    } else if (newPage === this._lastPageNum) {
      await this.goToLastPage();
    } else if (newPage === this._currentPageNum + 1) {
      await this.goToNextPage();
    } else if (newPage === this._currentPageNum - 1) {
      await this.goToPrevPage();
    } else {
      // fallback handler for arbitrary page navigation
      await this.goToPage(newPage);
    }
  };

  // go to the first page and update the preloads
  private goToFirstPage = async (): Promise<void> => {
    this._updateMediaCardList(this._firstPageData);
    this._currentPageData = this._firstPageData;
    this._prevPageData = this._firstPageData;
    this._currentPageNum = 1;
    await this.updateNextPageData();
  };

  // go to the last page and update the preloads
  private goToLastPage = async (): Promise<void> => {
    this._updateMediaCardList(this._lastPageData);
    this._currentPageData = this._lastPageData;
    this._nextPageData = this._lastPageData;
    this._currentPageNum = this._lastPageNum;
    await this.updatePrevPageData();
  };

  // go to the next page and update the preloads
  private goToNextPage = async (): Promise<void> => {
    this._updateMediaCardList(this._nextPageData);
    this._prevPageData = this._currentPageData;
    this._currentPageData = this._nextPageData;
    this._currentPageNum += 1;
    await this.updateNextPageData();
  };

  // go to the previous page and update the preloads
  private goToPrevPage = async (): Promise<void> => {
    this._updateMediaCardList(this._prevPageData);
    this._nextPageData = this._currentPageData;
    this._currentPageData = this._prevPageData;
    this._currentPageNum -= 1;
    await this.updatePrevPageData();
  };

  // go to a specific page and update the preloads
  private goToPage = async (newPage: number): Promise<void> => {
    this._currentPageData = await this.getPageData(newPage);
    this._updateMediaCardList(this._currentPageData);
    this._currentPageNum = newPage;
    await this.updatePrevPageData();
    await this.updateNextPageData();
  };
}

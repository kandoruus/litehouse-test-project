import type { MediaAPIResponse } from "../app_definitions/interfaces";
import type { MediaCardData } from "../app_definitions/types";

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
  private _cardsPerPage: number = 10;
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

  //initalize state data and make inital API calls
  init = async (
    cardsPerPage: number,
    baseUrl: string,
    headers: HeadersInit | undefined,
    updateMediaCardList: (data: MediaCardData[]) => void
  ): Promise<void> => {
    //set the api base url and headers, the cards to be displayed on each page, and get the function that will be used to update the MediaCardList
    this._cardsPerPage = cardsPerPage;
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._updateMediaCardList = updateMediaCardList;
    //fetch the first page's Data and the total number of pages, then update the MediaCardList
    const firstPageResponse = await this.callAPI(1);
    this._currentPageData = this.getPageDataFromResponse(firstPageResponse);
    this._firstPageData = this._currentPageData;
    this._updateMediaCardList(this._currentPageData);
    this._lastPageNum = Math.ceil(firstPageResponse.meta.count / this._cardsPerPage);
    //preload the data for the next page and the last page
    this._lastPageData = await this.getPageData(this._lastPageNum);
    await this.updateNextPageData();
  };

  //returns the url of the given page number
  private getPageUrl = (pageNumber: number): string => {
    const offset = (pageNumber - 1) * this._cardsPerPage;
    return this._baseUrl + offset;
  };

  //returns the reponse object from the API
  private callAPI = async (pageNumber: number): Promise<MediaAPIResponse> => {
    const response = await fetch(this.getPageUrl(pageNumber), { headers: this._headers });
    const data = await response.json();
    //If I had time to implement error handling, I would use isMediaAPIResponse(data) to check that the response type matches the MediaAPIResponse interface
    return data as MediaAPIResponse;
  };

  //map the data array in res to return an array of MediaCardData
  private getPageDataFromResponse = (res: MediaAPIResponse): MediaCardData[] => {
    return res.data.map((mediaItem) => {
      const { canonicalTitle, description, posterImage } = mediaItem.attributes;
      const mediaData: MediaCardData = {
        title: canonicalTitle,
        description,
        imgUrl: posterImage.small,
      };
      return mediaData;
    });
  };

  //calls the api and returns the MediaCardData array for the given page
  private getPageData = async (pageNumber: number): Promise<MediaCardData[]> => {
    return this.getPageDataFromResponse(await this.callAPI(pageNumber));
  };

  //calls the api and updates the _nextPageData
  private updatePrevPageData = async (): Promise<void> => {
    this._prevPageData = await this.getPageData(Math.max(this._currentPageNum - 1, 1));
  };

  //calls the api and updates the _nextPageData
  private updateNextPageData = async (): Promise<void> => {
    this._nextPageData = await this.getPageData(
      Math.min(this._currentPageNum + 1, this._lastPageNum)
    );
  };

  //returns the last page number
  get lastPageNum(): number {
    return this._lastPageNum;
  }

  //changes the page to the specified page number
  handlePageChange = async (newPage: number): Promise<void> => {
    if (newPage < 1 || newPage > this._lastPageNum || newPage === this._currentPageNum) return;

    if (newPage === 1) {
      await this.goToFirstPage();
    } else if (newPage === this._lastPageNum) {
      await this.goToLastPage();
    } else if (newPage === this._currentPageNum + 1) {
      await this.goToNextPage();
    } else if (newPage === this._currentPageNum - 1) {
      await this.goToPrevPage();
    } else {
      //this should never happen with the current controls, but to be safe
      await this.goToPage(newPage);
    }
  };

  //Go to the first page and update the preloads
  private goToFirstPage = async (): Promise<void> => {
    //update the mediaCardList with preloaded data
    this._updateMediaCardList(this._firstPageData);
    //update references for preloads that we will need to keep
    this._currentPageData = this._firstPageData;
    this._prevPageData = this._firstPageData;
    //update the current page number and update the preloads
    this._currentPageNum = 1;
    await this.updateNextPageData();
  };
  //Go to the last page and update the preloads
  private goToLastPage = async (): Promise<void> => {
    //update the mediaCardList with preloaded data
    this._updateMediaCardList(this._lastPageData);
    //update references for preloads that we will need to keep
    this._currentPageData = this._lastPageData;
    this._nextPageData = this._lastPageData;
    //update the current page number and update the preloads
    this._currentPageNum = this._lastPageNum;
    await this.updatePrevPageData();
  };
  //Go to the next page and update the preloads
  private goToNextPage = async (): Promise<void> => {
    //update the mediaCardList with preloaded data
    this._updateMediaCardList(this._nextPageData);
    //update references for preloads that we will need to keep
    this._prevPageData = this._currentPageData;
    this._currentPageData = this._nextPageData;
    //update the current page number and update the preloads
    this._currentPageNum = this._currentPageNum + 1;
    await this.updateNextPageData();
  };
  //Go to the prev page and update the preloads
  private goToPrevPage = async (): Promise<void> => {
    //update the mediaCardList with preloaded data
    this._updateMediaCardList(this._prevPageData);
    //update references for preloads that we will need to keep
    this._nextPageData = this._currentPageData;
    this._currentPageData = this._prevPageData;
    //update the current page number and update the preloads
    this._currentPageNum = this._currentPageNum - 1;
    await this.updatePrevPageData();
  };
  //go to the specified page and update the preloads
  private goToPage = async (newPage: number): Promise<void> => {
    //load new page data from api and send it to the media card list
    this._currentPageData = await this.getPageData(newPage);
    this._updateMediaCardList(this._currentPageData);
    //update the current page number and update the preloads
    this._currentPageNum = newPage;
    await this.updatePrevPageData();
    await this.updateNextPageData();
  };
}

import type { AppData } from "../types";

export const BLANK_APP_DATA: AppData = {
  _dataList: [],
  _currentPage: "",
  _firstPage: "",
  _lastPage: "",
  _nextPage: "",
  _prevPage: "",
};

export const KITSU_HEADERS = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
};

export const KITSU_DEFAULT_URL = "https://kitsu.io/api/edge/anime?page[limit]=10";

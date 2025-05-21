export type MediaData = {
  title: string;
  description: string;
  imgUrl: string;
};

export type AppData = {
  _dataList: MediaData[];
  _currentPage: string;
  _firstPage: string;
  _lastPage: string;
  _nextPage: string;
  _prevPage: string;
};

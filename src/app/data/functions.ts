import type { KitsuData } from "./interfaces";
import { KITSU_DEFAULT_URL, KITSU_HEADERS } from "./constants";
import type { AppData, MediaData } from "./types";

export const loadKitsuData = async (url: string = KITSU_DEFAULT_URL): Promise<AppData> => {
  const response = await fetch(url, { headers: KITSU_HEADERS });
  const { data, links } = (await response.json()) as KitsuData;
  const _dataList: MediaData[] = data.map((mediaItem) => {
    const { canonicalTitle, description, posterImage } = mediaItem.attributes;
    const mediaData: MediaData = { title: canonicalTitle, description, imgUrl: posterImage.medium };
    return mediaData;
  });
  const appData: AppData = {
    _dataList,
    _currentPage: url,
    _firstPage: links.first,
    _lastPage: links.last,
    _nextPage: links.next || "",
    _prevPage: links.prev || "",
  };
  return appData;
};

export const createNavBarBtn = (
  id: string,
  text: string,
  onClick: () => void
): HTMLButtonElement => {
  const btn = document.createElement("button");
  btn.classList.add("nav-bar-button");
  btn.id = id;
  btn.innerHTML = text;
  btn.addEventListener("click", onClick);
  return btn;
};

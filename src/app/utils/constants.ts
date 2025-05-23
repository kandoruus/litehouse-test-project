import type { MediaCardData } from "./types";

export const BLANK_MEDIA_DATA: MediaCardData = { title: "", description: "", imgUrl: "" };

export const KITSU_HEADERS = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
};

export const CARDS_PER_PAGE = 12;

export const KITSU_DEFAULT_URL = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=${CARDS_PER_PAGE}&page%5Boffset%5D=`;

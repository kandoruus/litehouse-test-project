import type { MediaAPIResponse } from "./interfaces";
import type { MediaCardData } from "./types";

// fetch the API response for a given page
export async function fetchPage(
  baseUrl: string,
  page: number,
  cardsPerPage: number,
  headers?: HeadersInit
): Promise<MediaAPIResponse> {
  const offset = (page - 1) * cardsPerPage;
  const response = await fetch(`${baseUrl}${offset}`, { headers });
  return (await response.json()) as MediaAPIResponse;
}

// map the data array in the API response to MediaCardData array
export function transformMediaResponse(res: MediaAPIResponse): MediaCardData[] {
  return res.data.map(({ attributes }) => ({
    title: attributes.canonicalTitle,
    description: attributes.description,
    imgUrl: attributes.posterImage.small,
  }));
}

// calculate the last page number using total count and cards per page
export function getLastPageNumber(totalCount: number, cardsPerPage: number): number {
  return Math.ceil(totalCount / cardsPerPage);
}

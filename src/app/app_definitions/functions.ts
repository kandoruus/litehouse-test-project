import type { MediaAPIResponse } from "./interfaces";

//type guard for the MediaAPIResponse interface
export function isMediaAPIResponse(data: any): data is MediaAPIResponse {
  if (
    typeof data !== "object" ||
    !Array.isArray(data.data) ||
    typeof data.meta !== "object" ||
    typeof data.meta.count !== "number"
  ) {
    return false;
  }

  for (const item of data.data) {
    if (
      typeof item !== "object" ||
      typeof item.attributes !== "object" ||
      typeof item.attributes.description !== "string" ||
      typeof item.attributes.canonicalTitle !== "string" ||
      typeof item.attributes.posterImage !== "object" ||
      typeof item.attributes.posterImage.small !== "string"
    ) {
      return false;
    }
  }

  return true;
}

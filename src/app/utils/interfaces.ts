export interface MediaAPIResponse {
  data: {
    attributes: {
      description: string;
      posterImage: {
        small: string;
      };
      canonicalTitle: string;
    };
  }[];
  meta: {
    count: number;
  };
}

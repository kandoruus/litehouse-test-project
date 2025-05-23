export interface KitsuData {
  data: {
    attributes: {
      description: string;
      posterImage: {
        small: string;
      };
      canonicalTitle: string;
    };
  }[];
  links: {
    first: string;
    last: string;
    next?: string;
    prev?: string;
  };
}

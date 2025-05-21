export interface KitsuData {
  data: {
    attributes: {
      description: string;
      posterImage: {
        medium: string;
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

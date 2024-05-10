interface Image {
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  alt_description: string;
  slug: string;
  likes: number;
}
export type RequiredFields = Required<Image>;

export type RequestData = {
  total: number;
  total_pages: number;
  results: RequiredFields[];
};

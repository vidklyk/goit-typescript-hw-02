import axios from "axios";
import type { UnsplashImage } from "./types/types";

const ACCESS_KEY = "MImm6L6Fohm14G3qKTBNSMi90GLDV5MbEucrlJ3mBb8";
const BASE_URL = "https://api.unsplash.com/search/photos";

interface SearchResponse {
  results: UnsplashImage[];
  total: number;
  total_pages: number;
}

export const searchImages = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  const response = await axios.get<SearchResponse>(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });
  return response.data;
};

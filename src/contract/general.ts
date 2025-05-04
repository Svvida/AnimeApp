export interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
}

// Recommendation entry types
export interface RecommendationEntry {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}

export interface RecommendationItem {
  mal_id: string;
  entry: RecommendationEntry[];
  content: string;
  user: {
    url: string;
    username: string;
  };
}

export interface RecommendationResponse {
  data: RecommendationItem[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Images {
  jpg: Image;
  webp: Image;
}

export interface Title {
  type: string;
  title: string;
}

export interface MediaEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

// Update ApiError interface to match Jikan API error format
export interface ApiError {
  status?: number;
  type?: string;
  message?: string;
  error?: string;
  report_url?: string;
  // Keep data for backward compatibility with RTK Query error structure
  data?: {
    status?: number;
    type?: string;
    message?: string;
    error?: string;
    report_url?: string;
  };
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface QueryParams {
  sfw?: boolean;
  unapproved?: boolean;
  continuing?: boolean;
  page?: number;
  limit?: number;
}

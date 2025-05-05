// Represents the structure for different image sizes/formats
interface ImageUrls {
  image_url: string; // Standard image URL
  small_image_url: string; // Smaller thumbnail URL
  large_image_url: string; // Larger version URL
}

// Represents the structure for user profile images (simpler structure)
interface UserImageUrls {
  image_url: string; // URL for the user's avatar
}

// Represents the different reaction counts for a review
interface Reactions {
  overall: number;
  nice: number;
  love_it: number;
  funny: number;
  confusing: number;
  informative: number;
  well_written: number;
  creative: number;
}

// Represents the Anime/Manga entry the review is about
interface Entry {
  mal_id: number; // MyAnimeList ID of the anime/manga
  url: string; // URL to the anime/manga page on MyAnimeList
  images: {
    jpg: ImageUrls; // JPG image URLs
    webp: ImageUrls; // WebP image URLs
  };
  title: string; // Title of the anime/manga
}

// Represents the user who wrote the review
interface User {
  url: string; // URL to the user's profile page on MyAnimeList
  username: string; // Username of the reviewer
  images: {
    jpg: UserImageUrls; // User's avatar in JPG format
    webp: UserImageUrls; // User's avatar in WebP format
  };
}

// Represents a single review item within the 'data' array
export interface ReviewItem {
  mal_id: number; // ID of the review itself
  url: string; // URL to this specific review page
  type: string; // Type of entry reviewed (e.g., "anime", potentially "manga")
  reactions: Reactions; // Object containing reaction counts
  date: string; // Date and time the review was posted (ISO 8601 format)
  review: string; // The full text content of the review
  score: number; // The score (1-10) given by the reviewer
  tags: string[]; // Array of tags associated with the review (e.g., ["Recommended"])
  is_spoiler: boolean; // Whether the review is marked as containing spoilers
  is_preliminary: boolean; // Whether the review is marked as preliminary
  episodes_watched: number | null; // Number of episodes watched *before* writing (often null if it's a full review or manga)
  entry: Entry; // Details about the anime/manga being reviewed
  user: User; // Details about the user who wrote the review
}

// Represents the overall structure of the API response
export interface ReviewResponse {
  pagination: {
    last_visible_page: number; // The last page number available (might be inaccurate if has_next_page is true)
    has_next_page: boolean; // Indicates if there are more pages of results
  };
  data: ReviewItem[]; // An array containing the review items for the current page
}

export interface AnimeReviewsQueryParams {
  preliminary?: boolean;
  spoilers?: boolean;
}

import { Images } from '@/contract/general';

export const getBestImageUrl = (images: Images) => {
  return images.jpg.large_image_url || images.jpg.image_url || images.webp.large_image_url || images.webp.image_url || '';
};

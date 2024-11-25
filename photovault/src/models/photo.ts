import { getPhotos } from '@/app/api/photo';
import { Unpacked } from '@/utils/typescript';

export type PhotoFilters = {
  /**
   * Category ID
   */
  category?: number;

  /**
   * Two element array containing minimum and maximum price
   */
  priceRange: number[];

  /**
   * List of tag IDs
   */
  tags: Array<number>;

  /**
   * Photographer username
   */
  photographUsername?: string;
};

export type Photo = Unpacked<Awaited<ReturnType<typeof getPhotos>>>;

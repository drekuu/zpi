import { getPhoto, getPhotos } from '@/app/api/photo';
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
};

export type PartialPhoto = Unpacked<Awaited<ReturnType<typeof getPhotos>>>;
export type Photo = Awaited<ReturnType<typeof getPhoto>>;

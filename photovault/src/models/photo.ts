import { getPhoto, getPhotos, getPhotosByIds } from '@/app/api/photo';
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

export type GalleryPhoto = NonNullable<
  Unpacked<Awaited<ReturnType<typeof getPhotos>>>
>;
export type FullPhoto = NonNullable<Awaited<ReturnType<typeof getPhoto>>>;
export type CartPhotoDetails = NonNullable<
  Unpacked<Awaited<ReturnType<typeof getPhotosByIds>>>
>;

export type CartPhotosDetails = {
  [key: number]: CartPhotoDetails;
};

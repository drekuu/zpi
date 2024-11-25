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

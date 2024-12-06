export type CartPhoto = {
  photoId: number;
  quantity: number;

  /**
   * Whether the buyer wants a commercial license for the photo
   * @note The photo itself needs to allow for a commercial license to be sold
   */
  commercialLicense: boolean;

  /**
   * Whether the photo is a digital copy (true) or a physical copy (false)
   */
  digitalCopy: boolean;
};

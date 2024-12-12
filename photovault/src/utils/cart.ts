import { CartPhotoDetails, CartPhotosDetails } from '@/models/photo';
import { CartPhoto } from '@/models/cart';

export function calculatePrice(cartPhoto: CartPhoto, photo: CartPhotoDetails) {
  const licensePrice = cartPhoto.commercialLicense ? photo.licensePrice : 0;

  return photo.price * cartPhoto.quantity + licensePrice;
}

export function calculateSubtotal(
  cartPhotos: Array<CartPhoto>,
  photos: CartPhotosDetails,
) {
  return cartPhotos.reduce(
    (result: number, cartPhoto) =>
      result + calculatePrice(cartPhoto, photos[cartPhoto.photoId]),
    0,
  );
}

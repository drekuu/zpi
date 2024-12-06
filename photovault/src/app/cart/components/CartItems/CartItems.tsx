import { CartPhoto } from '@/models/cart';
import { CartPhotosDetails } from '@/models/photo';
import Section from '../Section';
import { Fragment } from 'react';
import CartItem from './CartItem';
import { useTranslations } from 'next-intl';

interface CartItemsProps {
  className?: string;
  cartPhotos: Array<CartPhoto>;
  photos: CartPhotosDetails;
}

export default function CartItems({
  className,
  cartPhotos,
  photos,
}: CartItemsProps) {
  const t = useTranslations('Cart.CartItems');

  return (
    <Section className={className} title={t('title')}>
      <div className='my-14 flex flex-col gap-8'>
        {cartPhotos.map((cartPhoto, idx) => {
          const photo = photos[cartPhoto.photoId];
          return (
            <Fragment key={idx}>
              {photo && (
                <CartItem photo={photo} cartPhoto={cartPhoto} index={idx} />
              )}
            </Fragment>
          );
        })}
      </div>
    </Section>
  );
}

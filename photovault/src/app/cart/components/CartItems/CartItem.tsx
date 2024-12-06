import { CartPhotoDetails } from '@/models/photo';
import { CartPhoto } from '@/models/cart';
import { useCartStore } from '@/stores/cart';
import { usePopupStore } from '@/stores/popup';
import EditIcon from '@/../public/icons/edit.svg';
import EditCartPhoto from '@/components/Popup/Popups/EditCartPhoto';
import DeleteIcon from '@/../public/icons/delete.svg';
import { calculatePrice } from '@/utils/cart';
import Quantity from '@/components/Quantity/Quantity';
import { useTranslations } from 'next-intl';

interface CartItemProps {
  photo: CartPhotoDetails;
  cartPhoto: CartPhoto;
  index: number;
}

export default function CartItem({ photo, cartPhoto, index }: CartItemProps) {
  const t = useTranslations('Cart.CartItems');
  const removeFromCart = useCartStore((store) => store.removeFromCart);
  const changeQuantity = useCartStore((store) => store.changeQuantity);
  const pushPopup = usePopupStore((store) => store.pushPopup);

  return (
    <div className='flex gap-6'>
      <picture>
        <img
          className='max-w-[150px] select-none'
          src={photo.photoURL}
          alt=''
        />
      </picture>

      <div className='w-full'>
        <div className='flex gap-4 items-center'>
          <EditIcon
            className='cursor-pointer'
            onClick={() =>
              pushPopup(
                <EditCartPhoto
                  photo={photo}
                  cartPhoto={cartPhoto}
                  index={index}
                />,
              )
            }
          />
          <p className='font-bold text-xxl'>{photo.title}</p>
          <DeleteIcon
            className='cursor-pointer ml-auto'
            onClick={() => removeFromCart(index)}
          />
        </div>

        <div className='text-xl mt-5'>
          <p>
            {cartPhoto.digitalCopy ? t('digital-copy') : t('physical-copy')}
          </p>
          {cartPhoto.commercialLicense && <p>{t('commercial-license')}</p>}
        </div>

        <div className='flex justify-between items-center gap-2'>
          <p className='font-bold text-xl'>
            {calculatePrice(cartPhoto, photo).toLocaleString()}zł
          </p>
          <Quantity
            lowerBound={1}
            value={cartPhoto.quantity}
            setValue={(quantity) => changeQuantity(index, quantity)}
          />
        </div>
      </div>
    </div>
  );
}

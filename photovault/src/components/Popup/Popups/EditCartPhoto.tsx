import withPopup, { PopupProps } from '@/components/Popup/Popup';
import { useState } from 'react';
import LabeledCheckbox from '@/components/Checkbox/LabeledCheckbox';
import Button from '@/components/Form/Button';
import { useCartStore } from '@/stores/cart';
import { CartPhoto } from '@/models/cart';
import { CartPhotoDetails } from '@/models/photo';
import { useTranslations } from 'next-intl';

interface EditCartPhotoProps extends PopupProps {
  cartPhoto: CartPhoto;
  photo: CartPhotoDetails;
  index: number;
}

function EditCartPhoto({ cartPhoto, photo, index, close }: EditCartPhotoProps) {
  const photoCartT = useTranslations('Popups.PhotoCart');
  const t = useTranslations('Popups.EditCartPhoto');
  const [commercialLicense, setCommercialLicense] = useState(
    cartPhoto.commercialLicense,
  );
  const [digitalCopy, setDigitalCopy] = useState(cartPhoto.digitalCopy);

  const editInCart = useCartStore((store) => store.editInCart);

  return (
    <div>
      <p className='text-2xl font-bold'>{photoCartT('select-format')}</p>
      <div className='my-2'>
        <LabeledCheckbox
          id='format-digital'
          label={photoCartT('format-digital')}
          checked={digitalCopy}
          onClick={() => setDigitalCopy(true)}
        />
        <LabeledCheckbox
          id='format-physical'
          label={photoCartT('format-physical')}
          checked={!digitalCopy}
          onClick={() => setDigitalCopy(false)}
        />
      </div>
      {photo.license && (
        <LabeledCheckbox
          label={photoCartT('commercial-license')}
          id='commercial-license'
          checked={commercialLicense}
          onClick={() => setCommercialLicense(!commercialLicense)}
        />
      )}
      <Button
        onClick={() => {
          editInCart(index, {
            ...cartPhoto,
            commercialLicense: commercialLicense,
            digitalCopy: digitalCopy,
          });
          close?.();
        }}
      >
        {t('edit')}
      </Button>
    </div>
  );
}

export default withPopup(EditCartPhoto);

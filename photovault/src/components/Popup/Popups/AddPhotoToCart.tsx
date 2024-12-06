import withPopup, { PopupProps } from '@/components/Popup/Popup';
import { FullPhoto } from '@/models/photo';
import { useState } from 'react';
import LabeledCheckbox from '@/components/Checkbox/LabeledCheckbox';
import Button from '@/components/Form/Button';
import { useCartStore } from '@/stores/cart';
import { useTranslations } from 'next-intl';

interface AddPhotoToCartProps extends PopupProps {
  photo: FullPhoto;
}

function AddPhotoToCart({ photo, close }: AddPhotoToCartProps) {
  const photoCartT = useTranslations('Popups.PhotoCart');
  const t = useTranslations('Popups.AddPhotoToCart');
  const [commercialLicense, setCommercialLicense] = useState(false);
  const [digitalCopy, setDigitalCopy] = useState(true);

  const addToCart = useCartStore((store) => store.addToCart);

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
          addToCart({
            photoId: photo.id!,
            quantity: 1,
            commercialLicense: commercialLicense,
            digitalCopy: digitalCopy,
          });
          close?.();
        }}
      >
        {t('add')}
      </Button>
    </div>
  );
}

export default withPopup(AddPhotoToCart);

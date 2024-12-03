import withPopup, { PopupProps } from '@/components/Popup/Popup';
import { Photo } from '@/models/photo';
import { useState } from 'react';
import LabeledCheckbox from '@/components/Checkbox/LabeledCheckbox';
import Button from '@/components/Form/Button';
import { useCartStore } from '@/stores/cart';

interface AddPhotoToCartProps extends PopupProps {
  photo: Photo;
}

function AddPhotoToCart({ photo, close }: AddPhotoToCartProps) {
  const [commercialLicense, setCommercialLicense] = useState(false);
  const [digitalCopy, setDigitalCopy] = useState(true);

  const addToCart = useCartStore((store) => store.addToCart);

  return (
    <div>
      <p className='text-2xl font-bold'>Select photo format</p>
      <div className='my-2'>
        <LabeledCheckbox
          id='format-digital'
          label='Digital'
          checked={digitalCopy}
          onClick={() => setDigitalCopy(true)}
        />
        <LabeledCheckbox
          id='format-physical'
          label='Physical'
          checked={!digitalCopy}
          onClick={() => setDigitalCopy(false)}
        />
      </div>
      {photo!.license && (
        <LabeledCheckbox
          label='Commercial license'
          id='commercial-license'
          checked={commercialLicense}
          onClick={() => setCommercialLicense(!commercialLicense)}
        />
      )}
      <Button
        onClick={() => {
          addToCart({
            photoId: photo!.id!,
            quantity: 1,
            commercialLicense: commercialLicense,
            digitalCopy: digitalCopy,
          });
          close();
        }}
      >
        Add
      </Button>
    </div>
  );
}

export default withPopup(AddPhotoToCart);

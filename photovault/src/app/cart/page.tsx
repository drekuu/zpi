'use client';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { useCartStore } from '@/stores/cart';
import { usePhotosByIds } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { useIsClient } from 'usehooks-ts';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import CartItems from './components/CartItems/CartItems';
import OrderSummary from './components/OrderSummary/OrderSummary';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import BuyerDetails from '@/app/cart/components/BuyerDetails';

enum Step {
  CartItems,
  BuyerDetails,
  DeliveryDetails,
  Payment,
  Finish,
}

export default function CartPage() {
  const t = useTranslations('Cart');
  const isEmpty = useCartStore((store) => store.isEmpty);
  const isClient = useIsClient();

  const cartPhotos = useCartStore((store) => store.photos);
  const uniquePhotosIds = new Set(cartPhotos.map((photo) => photo.photoId));
  const query = usePhotosByIds(Array.from(uniquePhotosIds));
  const photos = query.data;

  const [step, setStep] = useState(Step.CartItems);

  const nextStep = () => {
    switch (step) {
      case Step.CartItems:
        setStep(Step.BuyerDetails);
        break;
    }
  };

  return (
    <div>
      <Breadcrumbs />

      {!isClient || photos === undefined ? (
        <LoadingSpinner />
      ) : (
        <>
          {isEmpty() || photos === null ? (
            <h3 className='text-center'>{t('empty')}</h3>
          ) : (
            <LoadedQuery query={query} handleError={true}>
              <div className='max-w-[1300px] mx-auto flex items-start gap-5 justify-between'>
                <div className='w-7/12 max-w-[700px]'>
                  {step === Step.CartItems && (
                    <CartItems cartPhotos={cartPhotos} photos={photos} />
                  )}
                  {step === Step.BuyerDetails && <BuyerDetails />}
                </div>
                <OrderSummary
                  cartPhotos={cartPhotos}
                  photos={photos}
                  nextStep={nextStep}
                  className='w-5/12 max-w-[500px]'
                />
              </div>
            </LoadedQuery>
          )}
        </>
      )}
    </div>
  );
}

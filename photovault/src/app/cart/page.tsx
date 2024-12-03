'use client';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { Fragment, ReactNode } from 'react';
import EditIcon from '@/../public/icons/edit.svg';
import DeleteIcon from '@/../public/icons/delete.svg';
import clsx from 'clsx';
import { useCartStore } from '@/stores/cart';
import { usePhotosByIds } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { CartPhotoDetails } from '@/models/photo';
import { useIsClient } from 'usehooks-ts';
import Loading from '@/components/LoadedQuery/components/Loading';

function Separator() {
  return <div className='w-full border-b border-b-black border-opacity-10' />;
}

interface SectionProps {
  title: string;
  className?: string;
  children: ReactNode;
}

function Section({ title, className, children }: SectionProps) {
  return (
    <div
      className={clsx(
        className,
        'px-6 py-5 flex flex-col gap-6 rounded-2xxl border border-black border-opacity-10',
      )}
    >
      <p className='font-bold text-2xl'>{title}</p>
      <div>{children}</div>
    </div>
  );
}

interface CartItemProps {
  photo: CartPhotoDetails;
}

function CartItem({ photo }: CartItemProps) {
  return <div>{photo.title}</div>;
}

function CartItems() {
  const cartPhotos = useCartStore((store) => store.photos);
  const uniquePhotosIds = new Set(cartPhotos.map((photo) => photo.photoId));
  const query = usePhotosByIds(Array.from(uniquePhotosIds));
  const photos = query.data;

  return (
    <Section title='Cart'>
      <LoadedQuery query={query} handleError={true}>
        {photos && (
          <>
            {cartPhotos.map((cartPhoto, idx) => {
              const photo = photos[cartPhoto.photoId];
              return (
                <Fragment key={idx}>
                  {photo && <CartItem photo={photo} />}
                </Fragment>
              );
            })}
          </>
        )}
      </LoadedQuery>
    </Section>
  );
}

export default function CartPage() {
  const isEmpty = useCartStore((store) => store.isEmpty);
  const isClient = useIsClient();

  return (
    <div>
      <Breadcrumbs />

      {!isClient ? (
        <Loading />
      ) : (
        <>
          {isEmpty() ? (
            <h3 className='text-center'>Cart is empty</h3>
          ) : (
            <div className='flex gap-5 justify-between'>
              <CartItems />
              <Section title='Order Summary'>o</Section>
            </div>
          )}
        </>
      )}
    </div>
  );
}

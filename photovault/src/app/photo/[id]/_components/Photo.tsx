'use client';

import { usePhoto } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import AvatarPlaceholder from '@/../public/image/avatar-placeholder.svg';
import ChipList from './ChipList';
import Chip from '@/components/Chip/Chip';
import { useTranslations } from 'next-intl';
import Button from '@/components/Form/Button';
import { usePopupStore } from '@/stores/popup';
import AddPhotoToCart from '@/components/Popup/Popups/AddPhotoToCart';

const Separator = () => {
  return <div className='my-5 border-b border-b-black border-opacity-10'></div>;
};

export default function Photo({ id }: { id: number }) {
  const t = useTranslations('Photo');
  const query = usePhoto(id);
  const photo = query.data;
  const pushPopup = usePopupStore((store) => store.pushPopup);

  const router = useRouter();

  useEffect(() => {
    if (photo === null) {
      notFound();
    }
  }, [photo]);

  return (
    <LoadedQuery query={query} handleError={true}>
      {photo && (
        <div className='flex items-start gap-5 my-8'>
          <div className='w-1/2'>
            <picture>
              <img src={photo.photoURL} alt={photo.title} />
            </picture>
          </div>

          <div className='w-1/2'>
            <p className='text-4xl font-bold mb-2'>{photo.title}</p>

            <div
              onClick={() =>
                router.push(`/profile/${photo.photograph?.user.username}`)
              }
              className='select-none cursor-pointer flex items-center gap-2'
            >
              <picture className='w-[50px] h-[50px] object-cover object-center rounded-full'>
                {photo.photograph?.avatarURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className='w-full h-full rounded-[inherit]'
                    src={photo.photograph.avatarURL}
                    alt=''
                  />
                ) : (
                  <AvatarPlaceholder width='100%' height='100%' />
                )}
              </picture>
              <p>
                {t('by')}{' '}
                <span className='font-semibold'>
                  {photo.photograph?.displayedUserName}
                </span>
              </p>
            </div>

            <Separator />

            <p className='text-xl'>
              <span className='text-2xl font-semibold'>{t('price')}</span>{' '}
              {photo.price?.toLocaleString()} zł
            </p>
            {photo.license && (
              <p className='text-xl'>
                <span className='text-2xl font-semibold'>
                  {t('commercial-price')}
                </span>{' '}
                {photo.licensePrice?.toLocaleString()} zł
              </p>
            )}

            <div className='flex flex-col gap-5 mt-10'>
              <ChipList name={t('categories')}>
                {photo?.categories?.map((category) => (
                  <Chip key={category.id}>{category.name}</Chip>
                ))}
              </ChipList>

              <ChipList name={t('tags')}>
                {photo?.tags?.map((tag) => (
                  <Chip key={tag.id}>{tag.name}</Chip>
                ))}
                {photo?.tags?.length === 0 && <p>{t('none')}</p>}
              </ChipList>

              <Button
                onClick={() => pushPopup(<AddPhotoToCart photo={photo} />)}
              >
                {t('cart-add')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </LoadedQuery>
  );
}

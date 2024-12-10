import { useTranslations } from 'next-intl';
import { Photographer } from '@/models/photograph';
import { usePhotosByPhotographer } from '@/services/query/photo';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import AvatarPlaceholder from '@/../public/image/avatar-placeholder.svg';
import { useRouter } from 'next/navigation';

interface PhotographerCardProps {
  photographer: Photographer;
}

export default function PhotographerCard({
  photographer,
}: PhotographerCardProps) {
  const t = useTranslations('HomePage.Photographer');
  const query = usePhotosByPhotographer(photographer.user!.username);
  const images = query.data;
  const router = useRouter();

  return (
    <div
      className='cursor-pointer justify-between gap-5 flex h-[150px] items-center p-4 border border-black rounded-2xxl'
      onClick={() => router.push(`/profile/${photographer.user!.username}`)}
    >
      <picture className='max-w-[60px] aspect-square object-cover rounded-full'>
        {photographer.avatarURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photographer.avatarURL} alt='' />
        ) : (
          <AvatarPlaceholder width='100%' height='100%' />
        )}
      </picture>

      <div className='shrink-0'>
        <h3>{photographer.displayedUserName}</h3>

        {photographer.description && (
          <>
            <p className='text-xs text-dark-grey'>{t('about-me')}</p>
            <p className='text-xs'>{photographer.description}</p>
          </>
        )}
      </div>

      <LoadedQuery query={query} handleError={true}>
        {images && (
          <div className='flex gap-5'>
            {images.slice(0, 2).map((image) => (
              <picture key={image.id}>
                <img
                  className='max-h-[100px]'
                  src={image.photoURL}
                  alt={image.title}
                />
              </picture>
            ))}
          </div>
        )}
      </LoadedQuery>
    </div>
  );
}

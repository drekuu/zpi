import { useTranslations } from 'next-intl';
import { FeaturedPhotographer } from '@/models/photograph';
import AvatarPlaceholder from '@/../public/image/avatar-placeholder.svg';
import { useRouter } from 'next/navigation';

interface PhotographerCardProps {
  photographer: FeaturedPhotographer;
}

export default function PhotographerCard({
  photographer,
}: PhotographerCardProps) {
  const t = useTranslations('HomePage.Photographer');
  const images = photographer.photo;
  const router = useRouter();

  return (
    <div
      className='cursor-pointer gap-5 flex h-[150px] items-center p-4 border border-black rounded-2xxl'
      onClick={() => router.push(`/profile/${photographer.user!.username}`)}
    >
      <picture className='flex-shink-0 w-[60px] aspect-square object-cover rounded-full'>
        {photographer.avatarURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className='rounded-[inherit] w-full h-full'
            src={photographer.avatarURL}
            alt=''
          />
        ) : (
          <AvatarPlaceholder width='100%' height='100%' />
        )}
      </picture>

      <div className='flex-shrink-0'>
        <h3>{photographer.displayedUserName}</h3>

        {photographer.description && (
          <>
            <p className='text-xs text-dark-grey'>{t('about-me')}</p>
            <p className='text-xs text-ellipsis max-w-[200px] line-clamp-2'>
              {photographer.description}
            </p>
          </>
        )}
      </div>

      {images && (
        <div className='flex gap-5 ml-auto'>
          {images.map((image) => (
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
    </div>
  );
}

import ProfileImage from './static/profile-image-placeholder.jpg';
import Image1 from '../static/image-placeholder-1.jpg';
import Image2 from '../static/image-placeholder-2.jpg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function PhotographerCard() {
  const images = [Image1, Image2];
  const t = useTranslations('HomePage.Photographer');

  return (
    <div className='justify-between gap-5 flex items-center p-4 border border-black rounded-2xxl'>
      <Image
        className='max-w-[60px] aspect-square object-cover rounded-full'
        src={ProfileImage}
        alt=''
      />

      <div>
        <h3>John Smith</h3>
        <p className='text-xs text-dark-grey'>{t('about-me')}</p>
        <p className='text-xs'>{t('from', { location: 'NY' })}</p>
      </div>

      <div className='flex gap-5'>
        {images.map((image, idx) => (
          <Image className='max-w-[52px]' key={idx} src={image} alt='' />
        ))}
      </div>
    </div>
  );
}

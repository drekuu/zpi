import SliderSection from './_components/SliderSection';
import PhotographerCard from './_components/PhotographerCard/PhotographerCard';
import PlaceholderImage1 from './_components/static/image-placeholder-1.jpg';
import PlaceholderImage2 from './_components/static/image-placeholder-2.jpg';
import PlaceholderImage3 from './_components/static/image-placeholder-3.jpg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const images = [PlaceholderImage1, PlaceholderImage2, PlaceholderImage3];
  const t = useTranslations('HomePage.Sections');

  return (
    <div className='my-8'>
      <p className='text-center logo mb-14'>PhotoVault</p>

      <div className='flex flex-col gap-24'>
        <SliderSection title={t('new-photographers')}>
          {[...Array(10)].map((_, i) => (
            <div className='max-w-[450px]' key={i}>
              <PhotographerCard />
            </div>
          ))}
        </SliderSection>

        <SliderSection title={t('new-photos')}>
          {[...Array(20)].map((_, i) => (
            <div className='!w-auto max-h-[220px]' key={i}>
              <Image
                className='w-full h-full'
                height={220}
                src={images[i % images.length]}
                alt=''
              />
            </div>
          ))}
        </SliderSection>
      </div>
    </div>
  );
}

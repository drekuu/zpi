import SliderSection, { Slide } from './_components/SliderSection';
import PhotographerCard from './_components/PhotographerCard/PhotographerCard';
import PlaceholderImage1 from './_components/static/image-placeholder-1.jpg';
import PlaceholderImage2 from './_components/static/image-placeholder-2.jpg';
import PlaceholderImage3 from './_components/static/image-placeholder-3.jpg';
import Image from 'next/image';

export default function HomePage() {
  const images = [PlaceholderImage1, PlaceholderImage2, PlaceholderImage3];

  return (
    <div className='my-8'>
      <p className='text-center logo mb-14'>PhotoVault</p>

      <div className='flex flex-col gap-24'>
        <SliderSection title='Discover new photographs'>
          {[...Array(10)].map((_, i) => (
            <Slide className='max-w-[450px]' key={i}>
              <PhotographerCard />
            </Slide>
          ))}
        </SliderSection>

        <SliderSection title='Discover new photos'>
          {[...Array(20)].map((_, i) => (
            <Slide className='!w-auto max-h-[220px]' key={i}>
              <Image height={220} src={images[i % images.length]} alt='' />
            </Slide>
          ))}
        </SliderSection>
      </div>
    </div>
  );
}

import SliderSection, { Slide } from '@/app/home/_components/SliderSection';
import PhotographerCard from '@/app/home/_components/PhotographerCard/PhotographerCard';

export default function HomePage() {
  return (
    <div className='my-8'>
      <p className='text-center logo mb-14'>PhotoVault</p>

      <div className='flex flex-col gap-24'>
        <SliderSection title='Discover new photographs'>
          {[...Array(5)].map((_, i) => (
            <Slide className='max-w-[450px]' key={i}>
              <PhotographerCard />
            </Slide>
          ))}
        </SliderSection>
      </div>
    </div>
  );
}

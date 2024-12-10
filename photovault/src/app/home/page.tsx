import PhotographerSlider from './_components/PhotographerSlider/PhotographerSlider';
import ImageSlider from './_components/ImageSlider';

export default function HomePage() {
  return (
    <div className='my-8'>
      <p className='text-center logo mb-14'>PhotoVault</p>

      <div className='flex flex-col gap-24'>
        <PhotographerSlider />
        <ImageSlider />
      </div>
    </div>
  );
}

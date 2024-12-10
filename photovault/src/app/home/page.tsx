'use client';

import PhotographerSlider from './_components/PhotographerSlider/PhotographerSlider';
import ImageSlider from './_components/ImageSlider';
import { useFeaturedPhotographers } from '@/services/query/photograph';
import { usePhotos } from '@/services/query/photo';
import LoadedQueries from '@/components/LoadedQuery/LoadedQueries';

export default function HomePage() {
  const photographersQuery = useFeaturedPhotographers();
  const imagesQuery = usePhotos();

  return (
    <div className='my-8'>
      <p className='text-center logo mb-14'>PhotoVault</p>

      <LoadedQueries queries={[photographersQuery, imagesQuery]}>
        <div className='flex flex-col gap-24'>
          <PhotographerSlider />
          <ImageSlider />
        </div>
      </LoadedQueries>
    </div>
  );
}

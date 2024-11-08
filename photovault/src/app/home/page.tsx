'use client';

import SliderSection from '@/app/home/_components/SliderSection';
import { SwiperSlide } from 'swiper/react';
import PhotographerCard from '@/app/home/_components/PhotographerCard/PhotographerCard';
import { Swiper } from 'swiper/react';
import 'swiper/css';

export default function HomePage() {
  return (
    <div className='my-8'>
      <p className='text-center logo mb-14'>PhotoVault</p>

      <div className='flex flex-col gap-24'>
        <SliderSection title='Discover new photographs'>
          <div className='flex items-center'>
            <Swiper className='w-full' slidesPerView='auto'>
              {[...Array(5)].map((_, i) => (
                <SwiperSlide className='max-w-[450px] mr-5' key={i}>
                  <PhotographerCard />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </SliderSection>
      </div>
    </div>
  );
}

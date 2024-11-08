'use client';

import SliderSection from '@/app/home/_components/SliderSection';
import { SwiperSlide } from 'swiper/react';
import PhotographerCard from '@/app/home/_components/PhotographerCard/PhotographerCard';

export default function HomePage() {
  return (
    <div>
      <p className='logo'>PhotoVault</p>
      <SliderSection title='Discover new photographs'>
        {[...Array(5)].map((_, i) => (
          <SwiperSlide key={i}>
            <PhotographerCard />
          </SwiperSlide>
        ))}
      </SliderSection>
    </div>
  );
}

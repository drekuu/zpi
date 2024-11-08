'use client';

import { ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';

interface SliderSectionProps {
  title: string;
  children: ReactNode;
}

export default function SliderSection({ title, children }: SliderSectionProps) {
  return (
    <div className='flex flex-col gap-6 rounded-2xxl bg-gray border border-black border-opacity-10 px-6 py-5'>
      <h4>{title}</h4>
      <Swiper slidesPerView={3}>{children}</Swiper>
    </div>
  );
}

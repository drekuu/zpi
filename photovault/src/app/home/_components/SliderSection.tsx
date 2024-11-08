'use client';

import { ReactNode } from 'react';
import RightArrowIcon from '@/../public/icons/right-arrow.svg';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import clsx from 'clsx';
import 'swiper/css';

interface SlideProps {
  className?: string;
  children: ReactNode;
}

export const Slide = ({ className, children }: SlideProps) => {
  return (
    <SwiperSlide className={clsx(className, 'mr-5')}>{children}</SwiperSlide>
  );
};
Slide.displayName = 'SwiperSlide';

interface SliderSectionProps {
  title: string;
  children: ReactNode;
}

export default function SliderSection({ title, children }: SliderSectionProps) {
  const swiper = useSwiper();

  return (
    <div className='relative flex flex-col gap-6 rounded-2xxl bg-gray border border-black border-opacity-10 px-6 py-5'>
      <h4>{title}</h4>
      <div className='flex items-center pr-10'>
        <Swiper
          loop={true}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className='w-full gradient-mask-r-90'
          slidesPerView='auto'
        >
          {children}
        </Swiper>

        <div className='flex h-full items-center absolute top-0 right-0'>
          <RightArrowIcon
            onClick={() => swiper.slideNext()}
            draggable={false}
            className='cursor-pointer z-10 scale-[4] origin-right'
            fillOpacity={1}
          />
        </div>
      </div>
    </div>
  );
}

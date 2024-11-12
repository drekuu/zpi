'use client';

import { ReactNode, Children, isValidElement, useRef } from 'react';
import RightArrowIcon from '@/../public/icons/right-arrow.svg';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import 'swiper/css';
import clsx from 'clsx';

interface SliderSectionProps {
  title: string;
  children: ReactNode;
}

export default function SliderSection({ title, children }: SliderSectionProps) {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className='relative flex flex-col gap-6 rounded-2xxl bg-gray border border-black border-opacity-10 px-6 py-5'>
      <h4>{title}</h4>
      <div className='flex items-center pr-10'>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop={true}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className='select-none w-full gradient-mask-r-90'
          slidesPerView='auto'
        >
          {Children.map(children, (child: ReactNode, idx) =>
            isValidElement(child) ? (
              <SwiperSlide
                className={clsx(child.props.className, 'mr-5')}
                key={idx}
              >
                {child}
              </SwiperSlide>
            ) : (
              <></>
            ),
          )}
        </Swiper>

        <div className='flex h-full items-center absolute top-0 right-0'>
          <RightArrowIcon
            onClick={() => swiperRef.current?.slideNext?.()}
            draggable={false}
            className='cursor-pointer z-10 scale-[4] origin-right'
            fillOpacity={1}
          />
        </div>
      </div>
    </div>
  );
}

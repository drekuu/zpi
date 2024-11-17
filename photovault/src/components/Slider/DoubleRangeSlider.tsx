'use client';

import ReactSlider from 'react-slider';
import './DoubleRangeSlider.css';
import clsx from 'clsx';
import { useEffect } from 'react';

interface DoubleRangeSliderProps {
  min: number;
  max: number;
  postfix?: string;
  className?: string;
  minDistance: number;
  setValue(value: number[]): void;
}

export default function DoubleRangeSlider({
  min,
  max,
  postfix,
  className,
  minDistance,
  setValue,
}: DoubleRangeSliderProps) {
  useEffect(() => {
    setValue([min, max]);
  }, [setValue, min, max]);

  return (
    <ReactSlider
      className={clsx('horizontal-slider select-none', className)}
      trackClassName='slider-track'
      thumbClassName='slider-thumb'
      min={min}
      max={max}
      onChange={(value) => setValue(value)}
      defaultValue={[min, max]}
      ariaLabel={['Minimal thumb', 'Maximal thumb']}
      ariaValuetext={(state) => `Thumb value ${state.valueNow} ${postfix}`}
      renderThumb={({ key, ...props }, state) => (
        <div key={key} {...props}>
          <p>{`${state.valueNow} ${postfix}`}</p>
        </div>
      )}
      pearling
      minDistance={minDistance}
    />
  );
}

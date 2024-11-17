'use client';

import DoubleRangeSlider from '@/components/Slider/DoubleRangeSlider';
import Accordion from '@/components/Accordion/Accordion';

interface PriceProps {
  setValue(value: number[]): void;
}

export default function Price({ setValue }: PriceProps) {
  return (
    <Accordion name='Price'>
      <DoubleRangeSlider
        className='w-10/12 mx-auto'
        min={1}
        max={300}
        setValue={setValue}
        postfix='zł'
        minDistance={100}
      />
    </Accordion>
  );
}

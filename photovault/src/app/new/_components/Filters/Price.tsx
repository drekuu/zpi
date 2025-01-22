'use client';

import DoubleRangeSlider from '@/components/Slider/DoubleRangeSlider';
import Accordion from '@/components/Accordion/Accordion';
import { useTranslations } from 'next-intl';

interface PriceProps {
  setValue(value: [number, number]): void;
}

export default function Price({ setValue }: PriceProps) {
  const t = useTranslations('NewPage.Filters');

  return (
    <Accordion name={t('price')}>
      <DoubleRangeSlider
        className='w-9/12 mx-auto'
        min={0}
        max={1000}
        setValue={setValue}
        postfix='zł'
        minDistance={300}
      />
    </Accordion>
  );
}

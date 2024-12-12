import MinusIcon from './static/minus.svg';
import PlusIcon from './static/plus.svg';

interface QuantityProps {
  /**
   * Lower bound of allowed quantity, inclusive, optional
   */
  lowerBound?: number;

  /**
   * Upper bound of allowed quantity, inclusive, optional
   */
  upperBound?: number;
  value: number;
  setValue: (value: number) => void;
}

export default function Quantity({
  value,
  setValue,
  lowerBound = 0,
  upperBound,
}: QuantityProps) {
  return (
    <div className='flex items-center gap-5 bg-gray w-fit rounded-4xl px-5 py-3'>
      <MinusIcon
        className='cursor-pointer'
        onClick={() => {
          if (lowerBound === undefined || value > lowerBound) {
            setValue(value - 1);
          }
        }}
      />
      <p className='font-medium select-none'>{value}</p>
      <PlusIcon
        className='cursor-pointer'
        onClick={() => {
          if (upperBound === undefined || value < upperBound) {
            setValue(value + 1);
          }
        }}
      />
    </div>
  );
}

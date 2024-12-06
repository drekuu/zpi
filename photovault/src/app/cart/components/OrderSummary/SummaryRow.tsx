import clsx from 'clsx';

interface SummaryRowProps {
  name: string;
  value: number;
  total?: boolean;
}

export default function SummaryRow({
  name,
  value,
  total = false,
}: SummaryRowProps) {
  return (
    <div className='text-xl flex items-center justify-between'>
      <p className={clsx(total ? '' : 'text-opacity-60', 'text-black')}>
        {name}
      </p>
      <p className={clsx(total ? 'text-2xl' : '', 'font-bold')}>
        {value.toLocaleString()}zł
      </p>
    </div>
  );
}

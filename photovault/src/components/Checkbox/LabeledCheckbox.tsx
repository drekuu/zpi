import Checkbox from './Checkbox';
import clsx from 'clsx';

interface LabeledCheckbox {
  id: string;
  label: string;
  checked: boolean;
  onClick?: () => void;
}

export default function LabeledCheckbox({
  id,
  label,
  checked,
  onClick,
}: LabeledCheckbox) {
  return (
    <div
      onClick={onClick}
      className='select-none cursor-pointer flex items-center justify-between'
    >
      <label
        onClick={(e) => e.preventDefault()}
        className={clsx(
          checked ? '' : 'text-opacity-60',
          'cursor-[inherit] text-black',
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <Checkbox checked={checked} id={id} />
    </div>
  );
}

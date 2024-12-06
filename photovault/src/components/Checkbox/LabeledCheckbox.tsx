import Checkbox from './Checkbox';
import clsx from 'clsx';

interface LabeledCheckbox {
  id: string;
  label: string;
  checked: boolean;
  onClick?: () => void;
  noCheckbox?: boolean;
  className?: string;
}

export default function LabeledCheckbox({
  id,
  label,
  checked,
  onClick,
  className,
  noCheckbox = false,
}: LabeledCheckbox) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        className,
        'select-none gap-2 cursor-pointer flex items-center justify-between',
      )}
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
      {!noCheckbox && <Checkbox checked={checked} id={id} />}
    </div>
  );
}

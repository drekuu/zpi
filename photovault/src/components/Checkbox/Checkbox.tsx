'use client';

interface CheckboxProps {
  id: string;
  checked: boolean;
}

export default function Checkbox({ id, checked }: CheckboxProps) {
  return (
    <input
      className='cursor-pointer w-[15px] h-[15px] bg-gray appearance-none rounded-[3px] checked:bg-checked'
      id={id}
      type='checkbox'
      checked={checked}
      onChange={() => {}}
    />
  );
}

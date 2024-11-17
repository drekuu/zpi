import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField = ({
  label,
  type,
  value,
  onChange,
  required,
}: InputFieldProps) => {
  return (
    <div className='mt-3.5'>
      <label htmlFor={`input-${label.toLowerCase()}`} className='block mb-2'>
        {label}
      </label>
      <input
        id={`input-${label.toLowerCase()}`}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className='flex gap-3 py-3 w-full bg-zinc-100 min-h-[45px] rounded-[62px] px-4'
      />
    </div>
  );
};

export default InputField;

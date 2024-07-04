import { ChangeEventHandler } from 'react';

type FormInputProps = {
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  placeholder?: string;
  name: string;
};

export const FormInput = (props: FormInputProps) => {
  const { value, handleChange, label, name } = props;
  return (
    <div className='col-span-full'>
      <label htmlFor={name} className='block text-lg font-medium leading-6'>
        {label}
      </label>
      <div className='mt-2'>
        <input
          id={name}
          type='text'
          name={name}
          placeholder={label}
          value={value}
          onChange={handleChange}
          className='block w-full bg-teal-50 rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
        />
      </div>
    </div>
  );
};

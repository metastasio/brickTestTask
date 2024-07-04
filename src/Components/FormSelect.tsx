import { ChangeEventHandler, PropsWithChildren } from 'react';

type FormSelectProps = {
  value: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  name: string;
  options: { value: string; name: string }[];
};

export const FormSelect = (props: PropsWithChildren<FormSelectProps>) => {
  const { value, handleChange, name, children, options } = props;
  return (
    <div className='sm:col-span-3'>
      <label htmlFor={name} className='block text-lg font-medium leading-6'>
        {children}
      </label>
      <div className='mt-2'>
        <select
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className='block w-full bg-teal-50 rounded-md border-0 px-1 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600  sm:text-sm sm:leading-6'
        >
          <option value=''>Выберите вариант</option>
          {options.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

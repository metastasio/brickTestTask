import { ChangeEventHandler, PropsWithChildren } from 'react';

type FormSelectProps = {
  value: string;
  handleChange: ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
  name: string;
};

export const FormSelect = (props: PropsWithChildren<FormSelectProps>) => {
  const { value, handleChange, name, children } = props;
  return (
    <div className='sm:col-span-3'>
      <label
        htmlFor={name}
        className='block text-lg font-medium leading-6'
      >{children}</label>
      <div className='mt-2'>
        <select
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className='block w-full bg-teal-50 rounded-md border-0 px-1 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600  sm:text-sm sm:leading-6'
        >
          <option value=''>Выберите вариант</option>
          {name === 'status' ? (
            <>
              <option value='alive'>Да</option>
              <option value='dead'>Нет</option>
              <option value='unknown'>Неизвестно</option>
            </>
          ) : (
            <>
              <option value='Humanoid'>Гуманоид</option>
              <option value='Animal'>Животное</option>
              <option value='Disease'>Заболевания</option>
              <option value='Cronenberg'>Кроненберг</option>
              <option value='Mythological Creature'>
                Мифологические существа
              </option>
              <option value='unknown'>Неизвестно</option>
              <option value='Alien'>Пришелец</option>
              <option value='Robot'>Робот</option>
              <option value='Human'>Человек</option>
              <option value='Poopybutthole'>Poopybutthole</option>
            </>
          )}
        </select>
      </div>
    </div>
  );
};

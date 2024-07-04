import { Link } from 'react-router-dom';
import { Character } from '../services';

export const CharacterCard = (props: Character) => {
  const { id, name, image, status, species, gender } = props;

  return (
    <li className='py-5'>
      <Link
        className='flex justify-between gap-x-6 visited:text-teal-700 hover:text-teal-500'
        to={`/character/${id}`}
      >
        <div className='flex min-w-0 gap-x-4'>
          <img
            className='h-16 w-16 flex-none rounded-full bg-gray-50'
            src={image}
            alt={`Изображение персонажа ${name}}`}
          />
          <div className='min-w-0 flex-auto'>
            <p className='text-base font-semibold leading-6'>{name}</p>
            <p className='mt-1 truncate text-sm leading-5'>{status}</p>
          </div>
        </div>
        <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
          <p className='text-base leading-6'>{species}</p>
          <p className='mt-1 text-sm leading-5'>{gender}</p>
        </div>
      </Link>
    </li>
  );
};

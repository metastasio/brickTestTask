import { Link } from 'react-router-dom';
import { Character } from '../services';

export const CharacterCard = (props: Character) => {
  const { id, name, image } = props;

  return (
    <li className='max-w-20 hover:text-teal-500'>
      <Link to={`/character/${id}`}>
        <img
          className='h-20 w-20 rounded-full block m-auto'
          src={image}
          alt={`Фото пользователя ${name}}`}
          width='100'
          height='100'
        />
        <p className='text-center'>{name}</p>
      </Link>
    </li>
  );
};

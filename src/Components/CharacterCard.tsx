import { Link } from 'react-router-dom';
import { Character } from '../services';

export const CharacterCard = (props: Character) => {
  const { id, name, location, image } = props;
  console.log(location);
  return (
    <li>
      <Link to={`character/${id}`}>
        <img
          src={image}
          alt={`Фото пользователя ${name}}`}
          width='100'
          height='100'
        />
        <p>{name}</p>
      </Link>
    </li>
  );
};

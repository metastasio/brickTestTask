import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleCharacter } from '../services';

export const Character = () => {
  const { id } = useParams();
  const { data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchSingleCharacter(id),
  });

  return (
    <>
      <nav>
        <Link to={'/'}>Назад</Link>
      </nav>

      <section>
        <h2>{character?.name}</h2>
        <img
          src={character?.image}
          alt={`Фото пользователя ${character?.name}`}
          width='187'
          height='187'
        />

        <p>Статус: {character?.status}</p>
        <p>Вид: {character?.species}</p>
        <p>Пол: {character?.gender}</p>
        <p>Происхождение: {character?.origin.name}</p>
        <p>Местонахождение: {character?.location.name}</p>
      </section>
    </>
  );
};

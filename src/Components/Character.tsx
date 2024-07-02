import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchSingleCharacter } from '../services';

export const Character = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: character,
  } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchSingleCharacter(id),
  });

  if (isError) {
    return <Navigate to={'/404'} />;
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Назад</button>
      {isLoading ? (
        <p>Ищем...</p>
      ) : (
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
      )}
    </>
  );
};

import { useQuery } from '@tanstack/react-query';
import { fetchSingleCharacter, fetchSingleEpisode } from '../services';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

export const Episode = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isFetching,
    isError,
    error,
    data: episode,
  } = useQuery({
    queryKey: ['episode', id],
    queryFn: () => fetchSingleEpisode(id),
  });

  if (isFetching) {
    return <p>Ищем</p>;
  }

  if (error) {
    return <Navigate to={'/404'} />;
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Назад</button>

      <div>
        <h2>{episode?.name}</h2>
        <p>{episode?.air_date}</p>

        <h4>Characters</h4>
        <ul>
          {episode?.characters.map((character) => {
            const characterUrlParts = character.split('/');
            const characterId = characterUrlParts[characterUrlParts.length - 1];
            console.log(characterId, 'CHARACTER');
            return <CharacterItem id={characterId} key={characterId} />;
          })}
        </ul>
      </div>
    </>
  );
};

function CharacterItem({ id }) {
  const { status, data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchSingleCharacter(id),
  });

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error :(</p>;

  return (
    <article key={id}>
      <Link to={`/characters/${id}`}>
        <p>{character?.name}</p>
      </Link>
    </article>
  );
}

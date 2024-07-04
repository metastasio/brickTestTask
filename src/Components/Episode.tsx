import { useQuery } from '@tanstack/react-query';
import { fetchSingleCharacter, fetchSingleEpisode } from '../services';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from './Spinner';

export const Episode = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isFetching,
    error,
    data: episode,
  } = useQuery({
    queryKey: ['episode', id],
    queryFn: () => fetchSingleEpisode(id),
  });

  if (isFetching) {
    return <Spinner />;
  }

  if (error) {
    return <Navigate to={'/404'} />;
  }

  return (
    <article className='w-8/12 mt-10 mx-auto'>
      <button
        className='block rounded-md bg-transparent px-3 py-2 text-sm border border-teal-400 hover:bg-teal-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-lime-500'
        onClick={() => navigate(-1)}
      >
        Назад
      </button>

      <div>
        <h2 className='text-4xl text-center font-mono font-bold'>
          {episode?.name}
        </h2>
        <p className='text-lg text-center mb-6'>{episode?.air_date}</p>

        <h4 className='mb-4 text-xl text-center font-semibold'>
          Список персонажей:
        </h4>
        <ul className='mb-16 text-center'>
          {episode?.characters.map((character) => {
            const characterUrlParts = character.split('/');
            const characterId = characterUrlParts[characterUrlParts.length - 1];
            return <CharacterItem id={characterId} key={characterId} />;
          })}
        </ul>
      </div>
    </article>
  );
};

function CharacterItem({ id }: { id: string }) {
  const { status, data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchSingleCharacter(id),
  });

  if (status === 'pending') {
    return <Spinner />;
  }
  
  if (status === 'error') {
    return <p className='text-red-900'>Произошла ошибка</p>;
  }

  return (
    <li>
      <Link
        key={id}
        className='text-center text-lg text-cyan-700 hover:text-cyan-500 underline visited:text-cyan-500 visited:no-underline'
        to={`/character/${id}`}
      >
        {character?.name}
      </Link>
    </li>
  );
}

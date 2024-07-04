import { useQuery } from '@tanstack/react-query';
import { fetchSingleCharacter, fetchSingleEpisode } from '../services';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from './Spinner';
import { ListLinkItem } from './ListLinkItem';
import { Button } from './Button';

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
    <article className='w-8/12 mt-6 mx-auto'>
      <Button handleClick={() => navigate(-1)} type='secondary'>
        Назад
      </Button>

      <section className='my-6'>
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
      </section>
    </article>
  );
};

function CharacterItem({ id }: { id: string }) {
  const { status, data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchSingleCharacter(id),
  });

  if (status === 'pending') {
    return <p>Загружаем...</p>;
  }

  if (status === 'error') {
    return <p className='text-red-900'>Произошла ошибка</p>;
  }

  return (
    <ListLinkItem
      key={id}
      id={Number(id)}
      name={character?.name}
      redirect='character'
    />
  );
}

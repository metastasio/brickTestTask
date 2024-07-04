import { AxiosError, isAxiosError } from 'axios';
import { Episode } from '../services';
import { Spinner } from './Spinner';
import { Link } from 'react-router-dom';

type EpisodesListProps = {
  error?: Error | AxiosError | null;
  isLoading?: boolean;
  episodes: Episode[] | undefined;
};

export const EpisodesList = (props: EpisodesListProps) => {
  const { error, isLoading, episodes } = props;
  if (isLoading) {
    return <Spinner />;
  }

  if (error && isAxiosError(error) && error.response?.status === 404) {
    return <p>Такого эпизода нет :c</p>;
  }

  if (error) {
    return <p className='text-red-900'>Произошла ошибка</p>;
  }

  if (!episodes?.length) {
    return <p>Попробуйте поискать эпизоды</p>;
  }

  return (
    <section className='mt-10'>
      <h2 className='mb-2 text-2xl font-semibold'>Эпизоды:</h2>
      <ul className='my-6'>
        {episodes.map((episode) => (
          <li className='mb-1' key={episode.id}>
            <Link
              className='text-lg text-cyan-700 hover:text-cyan-500 underline visited:text-cyan-500'
              to={`/episode/${episode.id}`}
            >
              {episode.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

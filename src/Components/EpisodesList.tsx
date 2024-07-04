import { AxiosError, isAxiosError } from 'axios';
import { Episode } from '../services';
import { Spinner } from './Spinner';
import { ListLinkItem } from './ListLinkItem';

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
    return <p className='text-right'>Попробуйте поискать эпизоды</p>;
  }

  return (
    <>
      <h2 className='mb-2 text-2xl font-semibold'>Эпизоды:</h2>
      <ul className='my-6'>
        {episodes.map(({ id, name }) => (
          <ListLinkItem key={id} redirect='episode' id={id} name={name} />
        ))}
      </ul>
    </>
  );
};

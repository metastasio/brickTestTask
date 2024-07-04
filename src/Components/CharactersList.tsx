import { AxiosError, isAxiosError } from 'axios';
import { Character } from '../services';
import { CharacterCard } from './CharacterCard';
import { Spinner } from './Spinner';

type CharactersListProps = {
  error?: Error | AxiosError | null;
  isLoading?: boolean;
  characters: Character[] | undefined;
};

export const CharactersList = (props: CharactersListProps) => {
  const { error, isLoading, characters } = props;
  if (isLoading) {
    return <Spinner />;
  }

  if (error && isAxiosError(error) && error.response?.status === 404) {
    return <p>Такого персонажа нет :c</p>;
  }

  if (error) {
    return <p className='text-red-900'>Произошла ошибка</p>;
  }

  if (!characters?.length) {
    return <p>Начните искать</p>;
  }

  return (
    <section className='mt-10'>
      <h2 className='mb-2 text-2xl font-semibold'>Персонажи:</h2>
      <ul className='mr-10 divide-y divide-slate-300'>
        {characters.map((character) => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </ul>
    </section>
  );
};

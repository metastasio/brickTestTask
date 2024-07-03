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
    <ul className='mt-10 flex flex-wrap justify-evenly gap-10'>
      {characters.map((character) => (
        <CharacterCard key={character.id} {...character} />
      ))}
    </ul>
  );
};

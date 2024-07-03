import { AxiosError, isAxiosError } from 'axios';
import { Character } from '../services';
import { CharacterCard } from './CharacterCard';

type CharactersListProps = {
  error?: Error | AxiosError | null;
  isLoading?: boolean;
  characters: Character[] | undefined;
};

export const CharactersList = (props: CharactersListProps) => {
  const { error, isLoading, characters } = props;
  if (isLoading) {
    return <span>Ищем...</span>;
  }

  if (error && isAxiosError(error) && error.response?.status !== 404) {
    return <span>Произошла ошибка</span>;
  }

  if (!characters?.length) {
    return <p>Такого персонажа нет :c</p>;
  }

  return (
    <ul className='flex flex-wrap justify-evenly gap-10'>
      {characters.map((character) => (
        <CharacterCard key={character.id} {...character} />
      ))}
    </ul>
  );
};

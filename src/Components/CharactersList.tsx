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
    return (
      <img
        className='block mx-auto animate-spin'
        width='150'
        height='150'
        src='/logo.png'
        alt='Рик и Морти выходят из портала'
      />
    );
  }

  if (error && isAxiosError(error) && error.response?.status === 404) {
    return <span>Такого персонажа нет :c</span>;
  }

  if (error) {
    return <p>Произошла ошибка</p>;
  }

  if (!characters?.length) {
    return <p>Начните искать</p>;
  }

  return (
    <ul className='flex flex-wrap justify-evenly gap-10'>
      {characters.map((character) => (
        <CharacterCard key={character.id} {...character} />
      ))}
    </ul>
  );
};

import { Character } from '../services';
import { CharacterCard } from './CharacterCard';

type MainListProps = {
  isError?: boolean;
  isFetching?: boolean;
  characters: Character[];
};

export const MainList = (props: MainListProps) => {
  const { isError, isFetching, characters } = props;
  if (isError) {
    return <span>Произошла ошибка</span>;
  }

  if (isFetching) {
    return <span>Ищем...</span>;
  }

  if (!characters.length) {
    return <p>Такого персонажа нет</p>;
  }

  return (
    <ul className='w-8/12 m-auto flex flex-wrap justify-evenly gap-10'>
      {characters.map((character) => (
        <CharacterCard key={character.id} {...character} />
      ))}
    </ul>
  );
};

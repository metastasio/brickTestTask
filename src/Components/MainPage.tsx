import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Species, Status, fetchCharacters, fetchEpisodes } from '../services';
import { CharacterCard } from './CharacterCard';

export const MainPage = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>('');
  const [species, setSpecies] = useState<Species>('');
  const [episodeName, setEpisodeName] = useState('');

  const { data: characters } = useQuery({
    queryKey: ['characters', species, name, status],
    queryFn: () => fetchCharacters({ species, name, status }),
  });

  const { data: episodes } = useQuery({
    queryKey: ['episodes', episodeName],
    queryFn: () => fetchEpisodes({ name: episodeName }),
  });

  console.log(characters);
  console.log(episodes);

  return (
    <>
      <header>
        <h1>Вселенная Рик и Морти</h1>
      </header>

      <main>
        <form>
          <label htmlFor='name'>Имя персонажа</label>
          <input
            id='name'
            type='text'
            name='name'
            placeholder='Имя персонажа'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor='status'>Жив?</label>
          <select
            name='status'
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value=''>Выберите вариант</option>
            <option value='alive'>Да</option>
            <option value='dead'>Нет</option>
            <option value='unknown'>Неизвестно</option>
          </select>

          <label htmlFor='species'>Раса</label>
          <select
            name='species'
            id='species'
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value=''>Выберите вариант</option>
            <option value='Humanoid'>Гуманоид</option>
            <option value='Animal'>Животное</option>
            <option value='Disease'>Заболевания</option>
            <option value='Cronenberg'>Кроненберг</option>
            <option value='Mythological Creature'>
              Мифологические существа
            </option>
            <option value='unknown'>Неизвестно</option>
            <option value='Alien'>Пришелец</option>
            <option value='Robot'>Робот</option>
            <option value='Human'>Человек</option>
            <option value='Poopybutthole'>Poopybutthole</option>
          </select>

          <label htmlFor='episode'>Эпизод</label>
          <input
            id='episode'
            type='text'
            name='episode'
            placeholder='Название эпизода'
            value={episodeName}
            onChange={(e) => setEpisodeName(e.target.value)}
          />
        </form>

        {characters && characters.results.length !== 0 ? (
          <ul>
            {characters.results.map((character) => (
              <CharacterCard key={character.id} {...character} />
            ))}
          </ul>
        ) : (
          <p>Здесь пока ничего нет</p>
        )}
      </main>
    </>
  );
};

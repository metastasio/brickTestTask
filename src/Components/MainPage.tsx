import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ChangeEventHandler, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCharacters, fetchEpisodes } from '../services';
import { CharacterCard } from './CharacterCard';

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [episodeName, setEpisodeName] = useState('');
  const name = searchParams.get('name') ?? '';
  const status = searchParams.get('status') ?? '';
  const species = searchParams.get('species') ?? '';

  const {
    isLoading,
    isError,
    data: characters,
    error,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['characters', species, name, status],
    queryFn: ({ pageParam: page = 0 }) =>
      fetchCharacters({ species, name, status, page }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.info.next;
      if (nextUrl) {
        return nextUrl.split('page=')[1][0];
      }
      return false;
    },
    select: ({ pages }) => {
      const test = pages.map(({ results }) => results).flat();

      return test;
    },
    enabled: !!name || !!status || !!species,
  });

  const { data: episodes } = useQuery({
    queryKey: ['episodes', episodeName],
    queryFn: () => fetchEpisodes({ name: episodeName }),
    enabled: !!episodeName,
  });

  // console.log(characters, 'characters');
  console.log(episodes);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(new URLSearchParams(prev)),
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <header className=' pt-6 pb-8 bg-cyan-950'>
        <div className='header-wrapper flex items-center justify-center flex-wrap gap-x-4'>
          <img
            className='w-16 h-16'
            src='/logo.png'
            alt='Логотип Рик и Морти'
          />
          <h1 className='text-4xl font-bold sm:text-6xl font-mono text-teal-200'>
            Вселенная Рик и Морти
          </h1>
        </div>
        <p className='mt-4 text-xl text-center text-teal-400'>
          Искать персонажей стало еще проще
        </p>
      </header>

      <main className='w-10/12'>
        <form>
          <label htmlFor='name'>Имя персонажа</label>
          <input
            id='name'
            type='text'
            name='name'
            placeholder='Имя персонажа'
            value={name}
            onChange={handleChange}
          />

          <label htmlFor='status'>Жив?</label>
          <select
            name='status'
            id='status'
            value={status}
            onChange={handleChange}
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
            onChange={handleChange}
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

        {characters ? (
          <ul>
            {characters.map((character) => (
              <CharacterCard key={character.id} {...character} />
            ))}
          </ul>
        ) : isError ? (
          <span>Error: {error.message}</span>
        ) : isLoading ? (
          <span>Ищем...</span>
        ) : (
          <span>Здесь пока ничего нет..</span>
        )}

        <p>{isFetching ? 'Ищем...' : null}</p>
        <button onClick={fetchNextPage}>LOAD MORE</button>
      </main>
    </>
  );
};

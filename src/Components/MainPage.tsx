import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ChangeEventHandler, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchCharacters, fetchEpisodes } from '../services';
import { CharacterCard } from './CharacterCard';

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [episodeName, setEpisodeName] = useState('');
  const name = searchParams.get('name') ?? '';
  const status = searchParams.get('status') ?? '';
  const species = searchParams.get('species') ?? '';

  const {
    isError,
    data: characters,
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
        return Number(nextUrl.split('page=')[1][0]);
      }
      return null;
    },
    select: ({ pages }) => pages.map(({ results }) => results).flat(),
    enabled: !!name || !!status || !!species,
    retry: 0,
  });

  const { data: episodes } = useQuery({
    queryKey: ['episodes', episodeName],
    queryFn: () => fetchEpisodes({ name: episodeName }),
    enabled: !!episodeName,
    retry: 0,
  });

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
          Ищите персонажей здесь. Это просто. Это легко.
        </p>
      </header>

      <main className='w-10/12 mt-12 mb-6 mx-auto'>
        <form className='w-8/12 mx-auto'>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='col-span-full'>
              <label
                htmlFor='name'
                className='block text-lg font-medium leading-6 text-cyan-950'
              >
                Имя персонажа
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  type='text'
                  name='name'
                  placeholder='Имя персонажа'
                  value={name}
                  onChange={handleChange}
                  className='block w-full bg-teal-50 rounded-md border-0 px-2 py-1.5 text-cyan-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='status'
                className='block text-lg font-medium leading-6 text-cyan-950'
              >
                Жив?
              </label>
              <div className='mt-2'>
                <select
                  name='status'
                  id='status'
                  value={status}
                  onChange={handleChange}
                  className='block w-full bg-teal-50 rounded-md border-0 px-1 py-1.5 text-cyan-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600  sm:text-sm sm:leading-6'
                >
                  <option value=''>Выберите вариант</option>
                  <option value='alive'>Да</option>
                  <option value='dead'>Нет</option>
                  <option value='unknown'>Неизвестно</option>
                </select>
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='species'
                className='block text-lg font-medium leading-6 text-cyan-950'
              >
                Раса
              </label>
              <div className='mt-2'>
                <select
                  name='species'
                  id='species'
                  value={species}
                  onChange={handleChange}
                  className='block w-full bg-teal-50 rounded-md border-0 px-1 py-1.5 text-cyan-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600  sm:text-sm sm:leading-6'
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
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='episode'
                className='block text-lg font-medium leading-6 text-cyan-950'
              >
                Эпизод
              </label>
              <div className='mt-2'>
                <input
                  id='episode'
                  type='text'
                  name='episode'
                  placeholder='Название эпизода'
                  value={episodeName}
                  onChange={(e) => setEpisodeName(e.target.value)}
                  className='block w-full bg-teal-50 rounded-md border-0 px-2 py-1.5 text-cyan-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </form>

        {episodes ? (
          <ul>
            {episodes.results.map((episode) => (
              <li key={episode.id}>
                <Link to={`/episode/${episode.id}`}>{episode.name}</Link>
              </li>
            ))}
          </ul>
        ) : null}

        {characters ? (
          <ul>
            {characters.map((character) => (
              <CharacterCard key={character.id} {...character} />
            ))}
          </ul>
        ) : isError ? (
          <span>Ничего не найдено</span>
        ) : isFetching ? (
          <span>Ищем...</span>
        ) : (
          <span>Здесь пока ничего нет..</span>
        )}

        <button
          className='rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          onClick={() => fetchNextPage()}
        >
          Загрузить еще
        </button>
      </main>
    </>
  );
};

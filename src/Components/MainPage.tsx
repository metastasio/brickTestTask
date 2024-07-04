import { useInfiniteQuery } from '@tanstack/react-query';
import { ChangeEventHandler } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchCharacters, fetchEpisodes } from '../services';
import { CharactersList } from './CharactersList';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';
  const status = searchParams.get('status') ?? '';
  const species = searchParams.get('species') ?? '';
  const episode = searchParams.get('episode') ?? '';

  const {
    error,
    data: characters,
    isLoading,
    fetchNextPage,
    hasNextPage,
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

  const {
    data: episodes,
    fetchNextPage: fetchNextEpisodes,
    hasNextPage: hasNextEpisodes,
  } = useInfiniteQuery({
    queryKey: ['episodes', episode],
    queryFn: ({ pageParam: page = 0 }) =>
      fetchEpisodes({ name: episode, page }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.info.next;
      if (nextUrl) {
        return Number(nextUrl.split('page=')[1][0]);
      }
      return null;
    },
    select: ({ pages }) => pages.map(({ results }) => results).flat(),
    enabled: !!episode,
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
      <main className='w-8/12 mt-12 mb-6 mx-auto'>
        <form>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <FormInput
              value={name}
              name='name'
              label='Имя персонажа'
              handleChange={handleChange}
            />

            <FormSelect
              name='status'
              value={status}
              handleChange={handleChange}
            >
              Жив?
            </FormSelect>
            {/* <div className='sm:col-span-3'>
              <label
                htmlFor='status'
                className='block text-lg font-medium leading-6'
              >
                Жив?
              </label>
              <div className='mt-2'>
                <select
                  name='status'
                  id='status'
                  value={status}
                  onChange={handleChange}
                  className='block w-full bg-teal-50 rounded-md border-0 px-1 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600  sm:text-sm sm:leading-6'
                >
                  <option value=''>Выберите вариант</option>
                  <option value='alive'>Да</option>
                  <option value='dead'>Нет</option>
                  <option value='unknown'>Неизвестно</option>
                </select>
              </div>
            </div> */}

            <FormSelect
              name='species'
              value={species}
              handleChange={handleChange}
            >
              Раса
            </FormSelect>
            {/* <div className='sm:col-span-3'>
              <label
                htmlFor='species'
                className='block text-lg font-medium leading-6'
              >
                Раса
              </label>
              <div className='mt-2'>
                <select
                  name='species'
                  id='species'
                  value={species}
                  onChange={handleChange}
                  className='block w-full bg-teal-50 rounded-md border-0 px-1 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600  sm:text-sm sm:leading-6'
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
            </div> */}

            <FormInput
              value={episode}
              name='episode'
              label='Эпизод'
              placeholder='Название эпизода'
              handleChange={handleChange}
            />
          </div>
        </form>

        {episodes ? (
          <section className='mt-10 ml-2'>
            <h2 className='mb-2 text-2xl font-semibold'>Эпизоды:</h2>
            <ul className='mb-10'>
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
        ) : null}

        {hasNextEpisodes ? (
          <button
            className='block mt-4 rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500'
            onClick={() => fetchNextEpisodes()}
          >
            Загрузить еще
          </button>
        ) : null}

        <CharactersList
          error={error}
          isLoading={isLoading}
          characters={characters}
        />

        {hasNextPage ? (
          <button
            className='block mx-auto mt-10 rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500'
            onClick={() => fetchNextPage()}
          >
            Загрузить еще
          </button>
        ) : null}
      </main>
    </>
  );
};

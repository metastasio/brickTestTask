import { useInfiniteQuery } from '@tanstack/react-query';
import { ChangeEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCharacters, fetchEpisodes } from '../services';
import { CharactersList } from './CharactersList';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { EpisodesList } from './EpisodesList';
import { selectOptionsSpecies, selectOptionsStatus } from '../const';

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
    error: episodesError,
    data: episodes,
    isLoading: isLoadingEpisodes,
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
        <form className='my-4'>
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
              options={selectOptionsStatus}
            >
              Жив?
            </FormSelect>

            <FormSelect
              name='species'
              value={species}
              handleChange={handleChange}
              options={selectOptionsSpecies}
            >
              Раса
            </FormSelect>

            <FormInput
              value={episode}
              name='episode'
              label='Эпизод'
              placeholder='Название эпизода'
              handleChange={handleChange}
            />
          </div>
        </form>

        <section className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          <section className='md:col-span-2 mt-10'>
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
          </section>

          <section className='mt-10'>
            <EpisodesList
              error={episodesError}
              isLoading={isLoadingEpisodes}
              episodes={episodes}
            />

            {hasNextEpisodes ? (
              <button
                className='block mt-4 rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500'
                onClick={() => fetchNextEpisodes()}
              >
                Загрузить еще
              </button>
            ) : null}
          </section>
        </section>
      </main>
    </>
  );
};

import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchSingleCharacter } from '../services';

export const Character = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: character,
  } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchSingleCharacter(id),
  });

  if (isError) {
    return <Navigate to={'/404'} />;
  }

  return (
    <section className='w-8/12 mt-10 mx-auto'>

      <button
        className='block rounded-md bg-transparent px-3 py-2 text-sm border border-teal-400 hover:bg-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500'
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
      {isLoading ? (
        <p>Ищем...</p>
      ) : (
        <section>
          <h2 className='text-4xl text-center font-mono font-bold'>
            {character?.name}
          </h2>
          <div className='my-6 flex flex-wrap justify-center items-center gap-10'>
            <img
              className='max-w-80 rounded-full block'
              src={character?.image}
              alt={`Фото пользователя ${character?.name}`}
              width='187'
              height='187'
            />
            <section className='text-lg'>
              <p className='pb-2'>
                <span className='font-semibold'>Статус:</span>{' '}
                {character?.status}
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>Вид:</span> {character?.species}
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>Пол:</span> {character?.gender}
              </p>
              <p className='pb-2'>
                <span className='font-semibold'>Происхождение:</span>{' '}
                {character?.origin.name}
              </p>
              <p>
                <span className='font-semibold'>Местонахождение:</span>{' '}
                {character?.location.name}
              </p>
            </section>
          </div>
        </section>
      )}
    </section>
  );
};

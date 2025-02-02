import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchSingleCharacter } from '../services';
import { Spinner } from './Spinner';
import { Button } from './Button';

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
    <section className='w-8/12 mt-6 mx-auto'>
      <Button handleClick={() => navigate(-1)} type='secondary'>
        Назад
      </Button>

      {isLoading ? (
        <Spinner />
      ) : (
        <section className='my-6'>
          <h2 className='text-4xl text-center font-mono font-bold'>
            {character?.name}
          </h2>
          <div className='my-6 flex flex-wrap justify-center items-center gap-10'>
            <img
              className='max-w-80 rounded-full block'
              src={character?.image}
              alt={`Изображение персонажа ${character?.name}`}
              width='187'
              height='187'
            />
            <section className='text-lg font-mono'>
              <p className='pb-2'>
                <span className='font-semibold font-sans'>Статус:</span>{' '}
                {character?.status}
              </p>
              <p className='pb-2'>
                <span className='font-semibold font-sans'>Вид:</span>{' '}
                {character?.species}
              </p>
              <p className='pb-2'>
                <span className='font-semibold font-sans'>Пол:</span>{' '}
                {character?.gender}
              </p>
              <p className='pb-2'>
                <span className='font-semibold font-sans'>Происхождение:</span>{' '}
                {character?.origin.name}
              </p>
              <p className='font-mono'>
                <span className='font-semibold font-sans'>
                  Местонахождение:
                </span>{' '}
                {character?.location.name}
              </p>
            </section>
          </div>
        </section>
      )}
    </section>
  );
};

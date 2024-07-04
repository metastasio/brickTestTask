import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='w-8/12 my-6 mx-auto'>
      <Button handleClick={() => navigate(-1)} type='secondary'>
        Назад
      </Button>
      <h2 className='mt-6 text-2xl text-center'>Ничего не найдено</h2>
      <img
        className='block my-6 mx-auto'
        src='/rick-and-morty-8.webp'
        alt='Грустный Морти'
        width='400'
        height='250'
      />
    </div>
  );
};

import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='w-8/12 my-6 mx-auto'>
      <h2 className='text-2xl text-center'>Ничего не найдено</h2>
      <button
        className='block mx-auto my-4 text-center text-lg text-cyan-700 hover:text-cyan-500 underline'
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
      <img
        className='block mx-auto'
        src='/rick-and-morty-8.webp'
        alt='Грустный Морти'
        width='400'
        height='250'
      />
    </div>
  );
};

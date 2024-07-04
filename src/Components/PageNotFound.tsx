import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className='w-8/12 my-6 mx-auto'>
      <h2 className='text-2xl text-center'>Такой страницы нет</h2>
      <Link
        className='block my-4 text-center text-lg text-cyan-700 hover:text-cyan-500 underline'
        to='/'
      >
        На главную
      </Link>
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

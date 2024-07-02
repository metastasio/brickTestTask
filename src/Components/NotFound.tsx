import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <h2>Такой страницы нет :с</h2>
      <Link to='/'>На главную</Link>
      <img
        src='/rick-and-morty-8.webp'
        alt='Грустный Морти'
        width='400'
        height='250'
      />
    </>
  );
};

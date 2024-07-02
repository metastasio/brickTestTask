import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <h2>Персонаж не найден :с</h2>
      <Link to='/'>На главную</Link>
    </>
  );
};

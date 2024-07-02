import { useNavigate } from 'react-router-dom';

export const CharacterNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Персонаж не найден :с</h2>
      {/* <Link to='/'>На главную</Link> */}
      <button onClick={() => navigate(-1)}>Назад</button>
    </>
  );
};

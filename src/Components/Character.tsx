import { Link } from 'react-router-dom';

export const Character = () => {
  return (
    <>
      <nav>
        <Link to={'/'}>Назад</Link>
      </nav>

      {/* <section className={styles.user_profile}>
        <div className={styles.user_main_info}>
          <div className={styles.user_main_info_name}>
            <h2 className={styles.user_name}>
              {first_name} {last_name}
            </h2>
            <h3 className={styles.user_status}>Партнер</h3>
          </div>

          <img
            className={styles.user_pfp}
            src={avatar}
            alt={`Фото пользователя ${first_name} ${last_name}`}
            width='187'
            height='187'
          />
        </div>
      </section> */}
    </>
  );
};

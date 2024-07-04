export const Header = () => {
  return (
    <header className='text-center px-2 pt-6 pb-8 bg-cyan-950'>
      <div className='header-wrapper flex items-center justify-center flex-wrap gap-x-4'>
        <img
          className='w-16 h-16 hidden md:block'
          src='/logo.png'
          alt='Логотип Рик и Морти'
        />
        <h1 className='text-4xl font-bold sm:text-6xl font-mono text-teal-200'>
          Вселенная Рик и Морти
        </h1>
      </div>
      <p className='mt-4 text-xl text-center text-teal-400'>
        Ищите персонажей здесь. Это просто. Это легко.
      </p>
    </header>
  );
};

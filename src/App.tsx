// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Species, Status, fetchCharacters, fetchEpisodes } from './services';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Character } from './Components/Character';
import { MainPage } from './Components/MainPage';
import { NotFound } from './Components/NotFound';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='character/:id' element={<Character />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
  // const [name, setName] = useState('');
  // const [status, setStatus] = useState<Status>('');
  // const [species, setSpecies] = useState<Species>('');
  // const [episodeName, setEpisodeName] = useState('');

  // const { data: characters } = useQuery({
  //   queryKey: ['characters', species, name, status],
  //   queryFn: () => fetchCharacters({ species, name, status }),
  // });

  // // const { data: episodes } = useQuery({
  // //   queryKey: ['episodes', episodeName],
  // //   queryFn: () => fetchEpisodes({ name: episodeName }),
  // // });

  // console.log(characters);
  // // console.log(episodes);

  // return (
  //   <>
  //     <header>
  //       <h1>Вселенная Рик и Морти</h1>
  //     </header>

  //     <main>
  //       <form>
  //         <label htmlFor='name'>Имя персонажа</label>
  //         <input
  //           id='name'
  //           type='text'
  //           name='name'
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //         />

  //         <label htmlFor='status'>Жив?</label>
  //         <select
  //           name='status'
  //           id='status'
  //           value={status}
  //           onChange={(e) => setStatus(e.target.value)}
  //         >
  //           <option value=''>Выберите вариант</option>
  //           <option value='alive'>Да</option>
  //           <option value='dead'>Нет</option>
  //           <option value='unknown'>Неизвестно</option>
  //         </select>

  //         <label htmlFor='species'>Раса</label>
  //         <select
  //           name='species'
  //           id='species'
  //           value={species}
  //           onChange={(e) => setSpecies(e.target.value)}
  //         >
  //           <option value=''>Выберите вариант</option>
  //           <option value='Human'>Человек</option>
  //           <option value='Alien'>Пришелец</option>
  //           <option value='Animal'>Animal</option>
  //           <option value='Cronenberg'>Cronenberg</option>
  //           <option value='Disease'>Disease</option>
  //           <option value='Humanoid'>Humanoid</option>
  //           <option value='Mythological Creature'>Mythological Creature</option>
  //           <option value='Poopybutthole'>Poopybutthole</option>
  //           <option value='Robot'>Робот</option>
  //           <option value='unknown'>Неизвестно</option>
  //         </select>

  //         <label htmlFor='episode'>Эпизод</label>
  //         <input
  //           id='episode'
  //           type='text'
  //           name='episode'
  //           value={episodeName}
  //           onChange={(e) => setEpisodeName(e.target.value)}
  //         />
  //       </form>
  //     </main>
  //   </>
  // );
};

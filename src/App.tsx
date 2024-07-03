import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Character } from './Components/Character';
import { MainPage } from './Components/MainPage';
import { NotFound } from './Components/NotFound';
import { CharacterNotFound } from './Components/CharacterNotFound';
import { Episode } from './Components/Episode';
import { Header } from './Components/Header';

export const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/character/:id' element={<Character />} />
          <Route path='/episode/:id' element={<Episode />} />
          <Route path='/404' element={<CharacterNotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

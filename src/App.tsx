import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Character } from './Components/Character';
import { MainPage } from './Components/MainPage';
import { Episode } from './Components/Episode';
import { Header } from './Components/Header';
import { PageNotFound } from './Components/PageNotFound';
import { NotFound } from './Components/NotFound';

export const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/character/:id' element={<Character />} />
          <Route path='/episode/:id' element={<Episode />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

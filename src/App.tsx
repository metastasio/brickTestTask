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
};

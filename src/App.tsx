import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [species, setSpecies] = useState<string[] | []>([]);

  const fetchSpecies = async () => {
    const data = await fetch('https://rickandmortyapi.com/api/character');
    const { results: characters } = await data.json();

    const optionSpecies = characters.map(
      (character: { species: string }) => character.species,
    );
    setSpecies([...new Set<string>(optionSpecies)]);

    console.log(characters, 'AAA');
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  console.log(species, 'SPECIES');

  return (
    <>
      <header>
        <h1>Вселенная Рик и Морти</h1>
      </header>

      <main>
        <form>
          <label htmlFor='charName'>Имя персонажа</label>
          <input id='charName' type='text' name='charName' />

          <label htmlFor='isAlive'>Жив?</label>
          <select name='isAlive' id='isAlive'>
            <option value=''>Выберите вариант</option>
            <option value='alive'>Да</option>
            <option value='dead'>Нет</option>
            <option value='unknown'>Неизвестно</option>
          </select>

          <label htmlFor='species'>Раса</label>
          <select name='species' id='species'>
            <option value=''>Выберите вариант</option>
            {species.map((item) => (
              <option value={item}>{item}</option>
            ))}
            {/* <option value='Human'>Человек</option>
            <option value='Alien'>Пришелец</option>
            <option value='unknown'>Неизвестно</option>
            <option value='Poopybutthole'>??</option>
            <option value='Mythological Creature'>?</option>
            <option value='Animal'>Animal</option> */}
          </select>

          <label htmlFor='episode'>Эпизод</label>
          <input id='episode' type='text' name='episode' />
        </form>
      </main>
    </>
  );
};

import axios from 'axios';

export type Species =
  | 'Human'
  | 'Alien'
  | 'Humanoid'
  | 'unknown'
  | 'Poopybutthole'
  | 'Mythological Creature'
  | 'Animal'
  | 'Robot'
  | 'Cronenberg'
  | 'Disease'
  | string;

export type Status = 'alive' | 'dead' | 'unknown' | string;

type FilterParameters = {
  name?: string;
  species?: Species;
  status?: Status;
};

const basePath = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (params?: FilterParameters) => {
  const { data } = await axios.get(`${basePath}/character`, { params });
  return data;
};

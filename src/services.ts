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

type EpisodeFilterParameters = {
  name?: string;
};

const basePath = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (params?: FilterParameters) => {
  const { data } = await axios.get(`${basePath}/character`, { params });
  return data;
};

export const fetchEpisodes = async (params?: EpisodeFilterParameters) => {
  const { data } = await axios.get(`${basePath}/episode`, { params });
  return data;
};

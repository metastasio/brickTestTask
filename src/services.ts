import axios from 'axios';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: Character[];
};

type Species =
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

type Status = 'alive' | 'dead' | 'unknown' | string;

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
  const { data } = await axios.get<CharacterResponse>(`${basePath}/character`, {
    params,
  });
  return data;
};

export const fetchSingleCharacter = async (id?: string) => {
  const { data } = await axios.get<Character>(`${basePath}/character/${id}`);
  return data;
};

export const fetchEpisodes = async (params?: EpisodeFilterParameters) => {
  const { data } = await axios.get(`${basePath}/episode`, { params });
  return data;
};

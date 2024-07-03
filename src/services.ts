import axios from 'axios';

type PaginatedData<T> = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: T[];
};

export type Character = {
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

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

type EpisodeResponse = PaginatedData<Episode>;

type CharacterResponse = PaginatedData<Character>;

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
  page?: number;
};

type EpisodeFilterParameters = {
  name?: string;
  page: number;
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
  const { data } = await axios.get<EpisodeResponse>(`${basePath}/episode`, {
    params,
  });
  return data;
};

export const fetchSingleEpisode = async (id?: string) => {
  const { data } = await axios.get<Episode>(`${basePath}/episode/${id}`);
  return data;
};

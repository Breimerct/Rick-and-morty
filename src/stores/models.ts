import { ICharacter } from 'stores/interfaces/ICharacter'
import { ILocation } from 'stores/interfaces/ILocation'
import { IEpisode } from 'stores/interfaces/IEpisode'

export type IInfo = {
  count?: number;
  pages?: number;
  next?: string;
  prev?: null;
}

export type ILocationInfo = {
  name?: string;
  url?: string;
}

export enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

export type IAPIResponse = {
  info?: IInfo;
  results?: ICharacter[] | IEpisode[] | ILocation[];
}

export enum Gender {
  // female, male, genderless or unknown
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
  Unknown = 'Unknown'
}

export enum LocalStoreNames {
  characters = 'favoritesCharacters',
  episodes = 'favoritesEpisodes',
  locations = 'favoritesLocations'
}

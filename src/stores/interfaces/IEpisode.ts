import { ICharacter } from 'stores/interfaces/ICharacter'

export type IEpisode = {
  id?: number;
  name?: string;
  air_date?: string;
  episode?: string;
  characters?: string[];
  episodeCharacters?: ICharacter[]
  url?: string;
  isFavorite?: boolean;
  created?: Date;
}

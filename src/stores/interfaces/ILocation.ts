import { ICharacter } from 'stores/interfaces/ICharacter'

export type ILocation = {
  id?: number;
  name?: string;
  type?: string;
  dimension?: string;
  residents?: string[];
  locationResidents?: ICharacter[]
  url?: string;
  isFavorite?: boolean;
  created?: Date;
}

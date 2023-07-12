import { Gender, ILocationInfo, Status } from 'stores/models'
import { ILocation } from 'stores/interfaces/ILocation'
import { IEpisode } from 'stores/interfaces/IEpisode'

export interface ICharacter {
  id?: number;
  name?: string;
  status?: Status;
  species?: string;
  type?: string;
  gender?: Gender;
  origin?: ILocationInfo;
  originCharacter?: ILocation
  location?: ILocationInfo;
  locationCharacter?: ILocation
  image?: string;
  episode?: string[];
  episodes?: IEpisode[];
  url?: string;
  isFavorite?: boolean;
  created?: Date;
}

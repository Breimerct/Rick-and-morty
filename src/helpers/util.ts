import { Gender, Status } from 'stores/models'
import { ILocation } from 'stores/interfaces/ILocation'
import { ICharacter } from 'stores/interfaces/ICharacter'
import { IEpisode } from 'stores/interfaces/IEpisode'
import { Notify } from 'quasar'

export interface IGenderIcon {
  icon: string;
  color: string;
}

export enum NotifyPosition {
  center = 'center',
  bottom = 'bottom',
  right = 'right',
  left = 'left',
  top = 'top',
  topRight = 'top-right',
  topLeft = 'top-left',
  bottomRight = 'bottom-right',
  bottomLeft = 'bottom-left',
}

export const clearText = (text: string): number => (
  parseInt(text.replace(/\D/g, '')) || 0
)

export const getIconColor = (status: Status): string => {
  switch (status) {
    case Status.Alive:
      return 'light-green-6'
    case Status.Dead:
      return 'red'
    case Status.Unknown:
      return 'amber'
    default:
      return ''
  }
}

export const getGenderIcon = (gender: Gender): IGenderIcon => {
  switch (gender) {
    case Gender.Male:
      return {
        icon: 'mdi-gender-male',
        color: 'primary'
      }
    case Gender.Female:
      return {
        icon: 'mdi-gender-female',
        color: 'pink'
      }
    default:
      return {
        icon: 'mdi-gender-male-female',
        color: 'amber'
      }
  }
}

export const paginate = (
  array: IEpisode[] | ILocation[] | ICharacter[],
  pageNumber: number,
  pageSize: number
): {
  data: ICharacter[] | IEpisode[] | ILocation[],
  totalPage: number
} => {
  return {
    data: array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    totalPage: Math.ceil(array.length / pageSize)
  }
}

export const showAlert = (
  message: string,
  type: string,
  position: NotifyPosition = NotifyPosition.topRight
): void => {
  Notify.create({
    message,
    type,
    position,
    progress: true
  })
}

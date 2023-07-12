import { defineStore } from 'pinia'
import { ICharacter } from 'stores/interfaces/ICharacter'
import { IEpisode } from 'stores/interfaces/IEpisode'
import { ILocation } from 'stores/interfaces/ILocation'
import { LocalStoreNames } from 'stores/models'
import { LocalStorage } from 'quasar'

export interface IFavoriteList {
  characters: ICharacter[],
  episodes: IEpisode[],
  locations: ILocation[]
}

export enum FavoriteListName {
  characters = 'characters',
  episodes = 'episodes',
  locations = 'locations'
}

const getLocalStoreData = (localStoreName: LocalStoreNames): ICharacter[] | ILocation[] | IEpisode[] => {
  return JSON.parse((LocalStorage.getItem(localStoreName) || '[]'))
}

export const useFavoriteStore = defineStore('favorite', {
  state: (): {
    favoriteList: IFavoriteList
  } => ({
    favoriteList: {
      characters: getLocalStoreData(LocalStoreNames.characters) as ICharacter[],
      locations: getLocalStoreData(LocalStoreNames.locations) as ILocation[],
      episodes: getLocalStoreData(LocalStoreNames.episodes) as IEpisode[]
    }
  }),

  getters: {
    getFavoriteList: (state) => (state.favoriteList)
  },

  actions: {
    setFavoriteList (
      favoriteListName: FavoriteListName,
      item: ICharacter | ILocation | IEpisode
    ): void {
      if (
        favoriteListName === FavoriteListName.characters ||
        favoriteListName === FavoriteListName.locations ||
        favoriteListName === FavoriteListName.episodes
      ) {
        const validateExistItem = this.favoriteList[favoriteListName].some(favoriteItem => favoriteItem.id === item.id)

        if (validateExistItem) {
          // @ts-ignore
          this.favoriteList[favoriteListName] = this.favoriteList[favoriteListName].filter((favoriteItem) => favoriteItem.id !== item.id)
          LocalStorage.set(
            LocalStoreNames[favoriteListName],
            JSON.stringify(this.favoriteList[favoriteListName])
          )
        }

        if (!validateExistItem) {
          // @ts-ignore
          this.favoriteList[favoriteListName] = this.favoriteList[favoriteListName].concat(item)
          LocalStorage.set(
            LocalStoreNames[favoriteListName],
            JSON.stringify(this.favoriteList[favoriteListName])
          )
        }
      }
    },

    searchSomeFavorites (
      id: number,
      favoriteListIName: FavoriteListName
    ): ICharacter | IEpisode | ILocation {
      const favoritesItems = this.getFavoriteList[favoriteListIName]

      // @ts-ignore
      return favoritesItems.find((
        favoriteItem: ICharacter | IEpisode | ILocation | any
      ) => (
        favoriteItem.id === id
      )) as ICharacter | IEpisode | ILocation
    },

    searchFavorites (
      array: ICharacter[] | IEpisode[] | ILocation[],
      favoriteListIName: FavoriteListName
    ): ICharacter[] | IEpisode[] | ILocation[] {
      return array.map(value => {
        const favoritesItems = this.getFavoriteList[favoriteListIName]

        return {
          ...value,
          isFavorite: false,
          // @ts-ignore
          ...favoritesItems.find(
            (favoriteItem: ICharacter | IEpisode | ILocation | any) => (favoriteItem.id === value.id)
          )
        }
      }) as ICharacter[] | IEpisode[] | ILocation[]
    }
  }
})

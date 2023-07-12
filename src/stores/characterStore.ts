import { defineStore } from 'pinia'
import { clearText, showAlert } from '../helpers/util'
import { ICharacter } from 'stores/interfaces/ICharacter'
import { useLocationStore } from 'stores/locationStore'
import { useEpisodeStore } from 'stores/episodeStore'
import { IAPIResponse, IInfo } from 'stores/models'
import { api } from 'boot/axios'
import { IFilters } from 'src/interfaces/interfaces'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    characters: [] as ICharacter[],
    multipleCharacters: [] as ICharacter[],
    character: {} as ICharacter,
    responseInfo: {} as IInfo,
    loading: false,
    loadingDetail: false
  }),

  getters: {
    getCharacters: (state) => (state.characters),
    getMultipleCharacters: (state) => (state.multipleCharacters),
    getCharacter: (state): ICharacter => (state.character),
    getResponseInfo: (state): IInfo => (state.responseInfo),
    getLoading: (state): boolean => (state.loading),
    getLoadingDetail: (state): boolean => (state.loadingDetail)
  },

  actions: {
    async fetchCharacters (payload: { page?: number, params?: IFilters }): Promise<void> {
      try {
        const favoriteStore = useFavoriteStore()
        this.loading = true
        this.characters = []

        const { data } = await api.get<IAPIResponse>('/character', {
          params: {
            page: payload.page || 1,
            ...payload.params
          }
        })

        this.responseInfo = data.info as IInfo
        this.characters = favoriteStore.searchFavorites(data.results as ICharacter[], FavoriteListName.characters) as ICharacter[]
      } catch (error) {
        showAlert('not found characters', 'negative')
      } finally {
        this.loading = false
      }
    },

    async fetchOneCharacter (characterId: number): Promise<void> {
      try {
        this.loadingDetail = true
        this.character = {}
        const episodeStore = useEpisodeStore()
        const locationStore = useLocationStore()
        const favoriteStore = useFavoriteStore()

        const { data } = await api.get<ICharacter>(`/character/${characterId}`)
        const episodesIds = data?.episode ? data?.episode.map(episode => (clearText(episode))) : []
        const locationId = data?.location ? clearText(String(data?.location?.url)) : 0
        const originId = data?.origin ? clearText(String(data?.origin?.url)) : 0
        const favoriteCharacter = favoriteStore.searchSomeFavorites(Number(data.id), FavoriteListName.characters)

        await episodeStore.fetchMultipleEpisodes(episodesIds)
        await locationStore.fetchMultipleLocations([locationId, originId])

        this.character = {
          ...data,
          ...favoriteCharacter
        } as ICharacter
        this.character.episodes = episodeStore.getMultipleEpisode
        this.character.locationCharacter = locationStore.getMultipleLocations.find(location => location.id === locationId)
        this.character.originCharacter = locationStore.getMultipleLocations.find(location => location.id === originId)
      } catch (error) {
        showAlert('not found character', 'warning')
      } finally {
        this.loadingDetail = false
      }
    },

    async fetchMultipleCharacters (charactersIds: number[]): Promise<void> {
      try {
        const favoriteStore = useFavoriteStore()

        const { data } = await api.get(`/character/${JSON.stringify(charactersIds)}`)

        this.multipleCharacters = favoriteStore.searchFavorites(data || [], FavoriteListName.characters) as ICharacter[]
      } catch (error) {
        showAlert('not found characters', 'negative')
      }
    }
  }
})

import { defineStore } from 'pinia'
import { IAPIResponse, IInfo } from 'stores/models'
import { ILocation } from 'stores/interfaces/ILocation'
import { api } from 'boot/axios'
import { clearText, showAlert } from 'src/helpers/util'
import { useCharacterStore } from 'stores/characterStore'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

export const useLocationStore = defineStore('location', {
  state: () => ({
    locations: [] as ILocation[],
    multipleLocations: [] as ILocation[],
    location: {} as ILocation,
    responseInfo: {} as IInfo,
    loading: false,
    loadingDetail: false
  }),

  getters: {
    getLocations: (state): ILocation[] => (state.locations),
    getMultipleLocations: (state): ILocation[] => (state.multipleLocations),
    getLocation: (state): ILocation => (state.location),
    getResponseInfo: (state): IInfo => (state.responseInfo),
    getLoading: (state): boolean => (state.loading),
    getLoadingDetail: (state): boolean => (state.loadingDetail)
  },

  actions: {
    async fetchLocations (payload: { page?: number, params?: any }): Promise<void> {
      try {
        this.loading = true
        this.locations = []
        const favoriteStore = useFavoriteStore()

        const { data } = await api.get<IAPIResponse>('/location', {
          params: {
            page: payload.page || 1,
            ...payload.params
          }
        })

        this.responseInfo = data.info as IInfo
        this.locations = favoriteStore.searchFavorites(data.results as ILocation[], FavoriteListName.locations) as ILocation[]
      } catch (error) {
        showAlert('not found locations', 'negative')
      } finally {
        this.loading = false
      }
    },

    async fetchOneLocation (locationId: number): Promise<void> {
      try {
        this.loadingDetail = true
        this.location = {}
        const characterStore = useCharacterStore()
        const favoriteStore = useFavoriteStore()

        const { data } = await api.get<ILocation>(`/location/${locationId}`)
        const favoriteLocation = favoriteStore.searchSomeFavorites(Number(data.id), FavoriteListName.locations)
        const charactersIds = (data.residents || []).map(characterUrl => clearText(characterUrl))

        if (charactersIds.length) {
          await characterStore.fetchMultipleCharacters(charactersIds)
        }

        this.location = {
          ...data,
          ...favoriteLocation
        } as ILocation
        this.location.locationResidents = characterStore.getMultipleCharacters
      } catch (error) {
        showAlert('not found location', 'warning')
      } finally {
        this.loadingDetail = false
      }
    },

    async fetchMultipleLocations (locationsIds: number[]): Promise<void> {
      try {
        const favoriteStore = useFavoriteStore()

        const { data } = await api.get<ILocation[]>(`/location/${JSON.stringify(locationsIds)}`)

        this.multipleLocations = favoriteStore.searchFavorites(data, FavoriteListName.locations)
      } catch (error) {
        showAlert('not found location', 'negative')
      }
    }
  }
})

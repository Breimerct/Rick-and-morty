import { defineStore } from 'pinia'
import { clearText, showAlert } from '../helpers/util'
import { useCharacterStore } from 'stores/characterStore'
import { IEpisode } from 'stores/interfaces/IEpisode'
import { IAPIResponse, IInfo } from 'stores/models'
import { api } from 'boot/axios'
import { IFilters } from 'src/interfaces/interfaces'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

export const useEpisodeStore = defineStore('episode', {
  state: () => ({
    episodes: [] as IEpisode[],
    multipleEpisodes: [] as IEpisode[],
    episode: {} as IEpisode,
    responseInfo: {} as IInfo,
    loading: false,
    loadingDetail: false
  }),

  getters: {
    getEpisodes: (state) => (state.episodes),
    getMultipleEpisode: (state): IEpisode[] => (state.multipleEpisodes),
    getEpisode: (state): IEpisode => (state.episode),
    getResponseInfo: (state): IInfo => (state.responseInfo),
    getLoading: (state): boolean => (state.loading),
    getLoadingDetail: (state): boolean => (state.loadingDetail)
  },

  actions: {
    fetchEpisodes: async function (payload: { page?: number; params?: IFilters }): Promise<void> {
      try {
        this.loading = true
        this.episodes = []
        const favoriteStore = useFavoriteStore()

        const { data } = await api.get<IAPIResponse>('/episode', {
          params: {
            page: payload.page || 1,
            ...payload.params
          }
        })

        this.responseInfo = data.info as IInfo
        this.episodes = favoriteStore.searchFavorites(data.results as IEpisode[], FavoriteListName.episodes) as IEpisode[]
      } catch (error) {
        showAlert('not found episodes', 'negative')
      } finally {
        this.loading = false
      }
    },

    fetchOneEpisode: async function (episodeId: number): Promise<void> {
      try {
        this.loadingDetail = true
        this.episode = {}
        const characterStore = useCharacterStore()
        const favoriteStore = useFavoriteStore()

        const { data } = await api.get<IEpisode>(`/episode/${episodeId}`)
        const favoriteEpisode = favoriteStore.searchSomeFavorites(Number(data.id), FavoriteListName.episodes)
        const charactersIds = (data.characters || []).map(characterUrl => clearText(characterUrl))

        await characterStore.fetchMultipleCharacters(charactersIds)

        this.episode = {
          ...data,
          ...favoriteEpisode
        } as IEpisode
        this.episode.episodeCharacters = characterStore.getMultipleCharacters
      } catch (error) {
        showAlert('not found episode', 'warning')
      } finally {
        this.loadingDetail = false
      }
    },

    fetchMultipleEpisodes: async function (episodesIds: number[]): Promise<void> {
      try {
        const favoriteStore = useFavoriteStore()

        const { data } = await api.get(`/episode/${JSON.stringify(episodesIds)}`)

        this.multipleEpisodes = favoriteStore.searchFavorites(data, FavoriteListName.episodes) as IEpisode[]
      } catch (error) {
        showAlert('not found episodes', 'negative')
      }
    }
  }
})

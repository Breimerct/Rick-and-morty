import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'home'
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('pages/home/HomePage.vue')
      },
      {
        name: 'favoritePage',
        path: 'favorites',
        redirect: {
          name: 'favoriteCharacters',
          query: {
            page: 1
          }
        },
        component: () => import('pages/favorites/FavoritesPage.vue'),
        children: [
          {
            path: 'characters',
            name: 'favoriteCharacters',
            component: () => import('pages/favorites/components/FavoriteCharacters.vue')
          },
          {
            path: 'episodes',
            name: 'favoriteEpisodes',
            component: () => import('pages/favorites/components/FavoriteEpisodes.vue')
          },
          {
            path: 'locations',
            name: 'favoriteLocations',
            component: () => import('pages/favorites/components/FavoriteLocations.vue')
          }
        ]
      },
      {
        path: 'characters',
        name: 'characters',
        component: () => import('pages/characters/CharactersPage.vue')
      },
      {
        path: 'episodes',
        name: 'episodes',
        component: () => import('pages/episodes/EpisodesPage.vue')
      },
      {
        path: 'locations',
        name: 'locations',
        component: () => import('pages/locations/LocationsPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

import { defineStore } from 'pinia'
import { Me_me } from '~/apollo/queries/__generated__/Me'

interface State {
    token?: string
    user?: Me_me
}

export const useAuthStore = defineStore<string, State>({
  id: 'auth',
  state: () => ({
    user: undefined,
    token: undefined
  }),

  getters: {
    auth: (state) => !!state.user
  }
})

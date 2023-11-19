import { defineStore } from 'pinia'
import authApiService from 'src/services/auth.api.services'
import { User } from 'src/models/user'

interface AuthStoreState {
  user: User | false
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    user: false
  }),

  getters: {
    name (state) {
      return state.user ? `${state.user.name}` : ''
    },
    email (state) {
      return state.user ? state.user.email : ''
    }
  },

  actions: {
    async login (email: string, password: string): Promise<User | false> {
      try {
        const response = await authApiService.login(email, password)
        if (response.data && response.status === 200) {
          // Extrair informações do usuário da resposta
          const userData = response.data.data.user

          // Definir o usuário no estado
          this.user = userData

          // Retornar o usuário
          return userData
        } else {
          // Limpar o usuário no caso de falha no login
          this.user = false
        }
      } catch (error) {
        console.error('Erro ao realizar login:', error)
        this.user = false
      }

      return this.user
    },
    logout () {
      this.user = false
    }
  }
})

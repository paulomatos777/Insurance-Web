import { Axios, AxiosResponse } from 'axios'
import { api } from 'boot/axios'
import { User } from 'src/models/user'

class AuthApiService {
  private readonly api: Axios

  constructor (api: Axios) {
    this.api = api
  }

  public async login (
    email: string,
    password: string
  ): Promise<AxiosResponse<User>> {
    const response = await api.post(
      'http://localhost:8000/login',
      {
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const { token } = response.data

    // Armazene o token no Vuex, localStorage ou em outro local seguro
    localStorage.setItem('authToken', token)

    return response
  }
}

export default new AuthApiService(api)

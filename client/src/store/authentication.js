import router from '../router'
import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    registerEmail: null,
    registerPassword: null,
    registerError: null,
    registerErrorShow: false,
    token: null
  },
  actions: {
    register ({ commit, state }) {
      commit('setRegisterError', null)
      return HTTP().post('/auth/register', {
        email: state.registerEmail,
        password: state.registerPassword
      })
        .then(({ data }) => {
          commit('setToken', data.token)
          router.push('/')
        })
        .catch(() => {
          commit('setRegisterError', 'Account already exists')
        })
    }
  },
  getters: {
    isLoggedIn (state) {
      return !!state.token
    }
  },
  mutations: {
    setRegisterError (state, error) {
      state.registerError = error
      if (error) {
        state.registerErrorShow = true
      } else {
        state.registerErrorShow = false
      }
    },
    setToken (state, token) {
      state.token = token
    },
    setRegisterEmail (state, email) {
      state.registerEmail = email
    },
    setRegisterPassword (state, password) {
      state.registerPassword = password
    }
  }
}

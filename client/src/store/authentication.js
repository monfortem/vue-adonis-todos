import router from '../router'
import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    registerEmail: null,
    registerPassword: null,
    registerError: null,
    registerErrorShow: false,
    loginEmail: null,
    loginPassword: null,
    loginError: null,
    loginErrorShow: false,
    token: null
  },
  actions: {
    logout ({ commit }) {
      commit('setToken', null)
      router.push('/login')
    },
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
    },
    login ({ commit, state }) {
      commit('setLoginError', null)
      return HTTP().post('/auth/login', {
        email: state.loginEmail,
        password: state.loginPassword
      })
        .then(({ data }) => {
          commit('setToken', data.token)
          router.push('/')
        })
        .catch(() => {
          commit('setLoginError', 'Login attempt failed')
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
    setLoginError (state, error) {
      state.loginError = error
      if (error) {
        state.loginErrorShow = true
      } else {
        state.loginErrorShow = false
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
    },
    setLoginEmail (state, email) {
      state.loginEmail = email
    },
    setLoginPassword (state, password) {
      state.loginPassword = password
    }
  }
}

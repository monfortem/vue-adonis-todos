import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import authentication from './authentication'
import projects from './projects'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    baseURL: '/api'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    projects
  }
  // plugins: [createPersistedState()]
})

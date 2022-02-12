// import router from '../router'
import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    projects: [],
    newProjectTitle: null
  },
  actions: {
    createProject ({ commit, state }) {
      return HTTP().post('/projects', {
        title: state.newProjectTitle
      })
        .then(({ data }) => {
          commit('appendProject', data)
          commit('setNewProjectTitle', null)
        })
    }
  },
  getters: {

  },
  mutations: {
    setNewProjectTitle (state, title) {
      state.newProjectTitle = title
    },
    appendProject (state, project) {
      state.projects.push(project)
    }
  }
}

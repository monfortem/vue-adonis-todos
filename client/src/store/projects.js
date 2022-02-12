import Vue from 'vue'
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
    },
    fetchProjects ({ commit }) {
      return HTTP().get('/projects')
        .then(({ data }) => {
          commit('setProjects', data)
        })
    },
    updateProject ({ commit }, project) {
      return HTTP().patch(`/projects/${project.id}`, project)
        .then(() => {
          commit('unsetIsEditMode', project)
        })
    },
    deleteProject ({ commit }, project) {
      return HTTP().delete(`/projects/${project.id}`)
        .then(() => {
          commit('deleteProject', project)
        })
    }
  },
  getters: {

  },
  mutations: {
    setNewProjectTitle (state, title) {
      state.newProjectTitle = title
    },
    setProjectTitle (state, { project, title }) {
      project.title = title
    },
    appendProject (state, project) {
      const tmpProjects = state.projects
      state.projects = []
      state.projects.push(project)
      tmpProjects.forEach(prj => {
        state.projects.push(prj)
      })
    },
    deleteProject (state, project) {
      state.projects.splice(state.projects.indexOf(project), 1)
    },
    setProjects (state, projects) {
      state.projects = projects
    },
    setIsEditMode (state, project) {
      Vue.set(project, 'isEditMode', true)
    },
    unsetIsEditMode (state, project) {
      project.isEditMode = false
    }
  }
}

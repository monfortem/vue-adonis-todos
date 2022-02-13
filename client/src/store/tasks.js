import Vue from 'vue'
import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    tasks: [],
    newTaskName: null
  },
  actions: {
    fetchTasksForProject ({ commit }, project) {
      return HTTP().get(`/projects/${project.id}/tasks`)
        .then(({ data }) => {
          commit('setTasks', data)
        })
    },
    createTask ({ commit, state, rootState }) {
      return HTTP().post(`/projects/${rootState.projects.currentProject.id}/tasks`, {
        description: state.newTaskName
      })
        .then(({ data }) => {
          commit('appendTask', data)
          commit('setNewTaskName', null)
        })
    },
    updateTask ({ commit }, task) {
      return HTTP().patch(`/tasks/${task.id}`, task)
        .then(() => {
          commit('unsetEditMode', task)
        })
    },
    deleteTask ({ commit }, task) {
      return HTTP().delete(`/tasks/${task.id}`)
        .then(() => {
          commit('deleteTask', task)
        })
    }
  },
  getters: {
  },
  mutations: {
    setTasks (state, tasks) {
      state.tasks = tasks
    },
    setNewTaskName (state, newTaskName) {
      state.newTaskName = newTaskName
    },
    setTaskDescription (state, { task, description }) {
      task.description = description
    },
    appendTask (state, task) {
      const tmpTasks = state.tasks
      state.tasks = []
      state.tasks.push(task)
      tmpTasks.forEach(tsk => {
        state.tasks.push(tsk)
      })
    },
    deleteTask (state, task) {
      state.tasks.splice(state.tasks.indexOf(task), 1)
    },
    toggleCompleted (state, task) {
      task.completed = !task.completed
    },
    setEditMode (state, task) {
      Vue.set(task, 'isEditMode', true)
    },
    unsetEditMode (state, task) {
      task.isEditMode = false
    }
  }
}

<template>
  <Panel title="Projects">
    <v-container fluid>
      <span v-if="projects.length === 0" class="text--disabled">Add a new project...</span>
      <div v-for="project in projects" :key="project.id">
        <EditableRecord
        :isEditMode="project.isEditMode"
        :title="project.title"
        v-on:update="updateProject(project)"
        v-on:onInput="setProjectTitle({
                project,
                title: $event
            })"
        v-on:onClick="projectClicked(project)"
        v-on:onEdit="setEditMode(project)"
        v-on:onUpdate="updateProject(project)"
        v-on:onDelete="deleteProject(project)"
        />
      </div>
      <CreateRecord
        placeholder="My project name..."
        v-on:onInput="setNewProjectTitle"
        :value="newProjectTitle"
        v-on:create="createProject"
      />
    </v-container>
  </Panel>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import CreateRecord from '../components/CreateRecord.vue'
import EditableRecord from '../components/EditableRecord.vue'

export default {
  mounted () {
    if (this.isLoggedIn) {
      this.fetchProjects()
    }
  },
  components: {
    CreateRecord,
    EditableRecord
  },
  computed: {
    ...mapState('projects', [
      'newProjectTitle',
      'projects'
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  },
  methods: {
    projectClicked (project) {
      this.setCurrentProject(project)
      this.fetchTasksForProject(project)
    },
    ...mapMutations('projects', [
      'setNewProjectTitle',
      'setEditMode',
      'setProjectTitle',
      'setCurrentProject'
    ]),
    ...mapActions('projects', [
      'createProject',
      'fetchProjects',
      'updateProject',
      'deleteProject'
    ]),
    ...mapActions('tasks', [
      'fetchTasksForProject'
    ])
  }
}
</script>

<style>

</style>

<template>
  <Panel title="Projects">
    <v-container fluid>
      <span v-if="projects.length === 0" class="text--disabled">Add a new project...</span>
      <div v-for="project in projects" :key="project.id">
        <v-row class="pa-0 ma-0">
          <v-col md="10" class="text-body-2">
              <v-text-field
                autofocus
                v-if="project.isEditMode"
                :value="project.title"
                @keyup.enter="updateProject(project)"
                @input="setProjectTitle({
                  project,
                  title: $event
                })">
              </v-text-field>
              <span v-else>{{project.title}}</span>
          </v-col>
          <v-col md="2" class="d-flex align-center justify-center">
            <v-btn v-if="!project.isEditMode"
              icon
              color="green"
              @click="setIsEditMode(project)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn v-else
              icon
              color="green"
              @click="updateProject(project)"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              icon
              color="green"
              @click="deleteProject(project)"
            >
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col md="10">
          <v-text-field
            placeholder="My project name..."
            @keyup.enter="createProject"
            @input="setNewProjectTitle"
            :value="newProjectTitle"
          ></v-text-field>
        </v-col>
        <v-col md="2" class="d-flex align-center justify-center">
          <v-btn
            icon
            color="green"
            @click="createProject"
          >
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </Panel>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  mounted () {
    if (this.isLoggedIn) {
      this.fetchProjects()
    }
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
    ...mapMutations('projects', [
      'setNewProjectTitle',
      'setIsEditMode',
      'setProjectTitle'
    ]),
    ...mapActions('projects', [
      'createProject',
      'fetchProjects',
      'updateProject',
      'deleteProject'
    ])
  }
}
</script>

<style>

</style>

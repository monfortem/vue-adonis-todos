<template>
  <Panel title="Projects">
    <v-container fluid>
      <v-row class="pa-0 ma-0">
        <v-col>
          <div v-for="project in projects" :key="project.id">
            {{project.title}}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="10">
          <v-text-field
            placeholder="My project name..."
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
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('projects', [
      'newProjectTitle',
      'projects'
    ])
  },
  methods: {
    ...mapMutations('projects', [
      'setNewProjectTitle'
    ]),
    ...mapActions('projects', [
      'createProject'
    ])
  }
}
</script>

<style>

</style>

<template>
  <v-container fluid>
    <v-row>
      <v-col md="4">
        <Projects></Projects>
      </v-col>
      <v-col md="8" v-if="Object.keys(currentProject).length > 0">
        <Tasks></Tasks>
      </v-col>
      <v-col v-else>
        <h3>Click on a project name to display tasks.</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Projects from '../components/Projects.vue'
import Tasks from '../components/Tasks.vue'
import router from '../router'

export default {
  components: {
    Projects,
    Tasks
  },
  mounted () {
    if (!this.isLoggedIn) {
      return router.push('/login')
    }
  },
  computed: {
    ...mapState('projects', [
      'currentProject'
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  }
}
</script>

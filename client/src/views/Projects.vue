<template>
  <v-container fluid>
    <v-row>
      <v-col md="4">
        <Projects></Projects>
      </v-col>
      <v-col md="8">
        <Panel title="Tasks"></Panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Projects from '../components/Projects.vue'
import router from '../router'

export default {
  components: {
    Projects
  },
  mounted () {
    if (!this.isLoggedIn) {
      return router.push('/login')
    }
  },
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  }
}
</script>

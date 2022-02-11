<template>
  <div>
    <v-app-bar
        app
        color="green"
        dark
        fixed
        dense
        elevation="4"
      >
        <v-toolbar-title>VUE Todo</v-toolbar-title>
        <v-btn plain v-if="isLoggedIn">
          <v-icon>mdi-playlist-check</v-icon>
          PROJECTS
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn plain to="/register"  v-if="!isLoggedIn">
          <v-icon>mdi-account-box-outline</v-icon>
          Register
        </v-btn>
        <v-btn plain v-if="!isLoggedIn">
          <v-icon>mdi-fingerprint</v-icon>
          Login
        </v-btn>
        <v-btn plain v-if="isLoggedIn">
          <v-icon>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  }
}
</script>

<style>

</style>

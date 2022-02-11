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
        <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">VUE Todo</v-toolbar-title>
        <v-btn plain v-if="isLoggedIn">
          <v-icon>mdi-playlist-check</v-icon>
          PROJECTS
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn plain to="/register"  v-if="!isLoggedIn">
          <v-icon>mdi-account-box-outline</v-icon>
          Register
        </v-btn>
        <v-btn plain to="/login" v-if="!isLoggedIn">
          <v-icon>mdi-fingerprint</v-icon>
          Login
        </v-btn>
        <v-btn plain v-if="isLoggedIn" @click="logout">
          <v-icon>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  },
  methods: {
    ...mapActions('authentication', [
      'logout'
    ])
  }
}
</script>

<style>

</style>

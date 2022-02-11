<template>
  <v-app>
    <appbar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import appbar from './components/Appbar'

export default {
  name: 'App',
  components: {
    appbar
  },

  data: () => ({
    //
  })
}
</script>

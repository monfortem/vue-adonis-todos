<template>
  <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <div>
            <h1>Login</h1>
            <v-text-field
              label="Email"
              placeholder="Email"
              :value="loginEmail"
              @input="setLoginEmail"
            ></v-text-field>

            <v-text-field
              label="Password"
              placeholder="Password"
              type="password"
              autocomplete="new-password"
              :value="loginPassword"
              @input="setLoginPassword"
              v-on:keyup.enter="login"
            ></v-text-field>

            <v-alert type="error" dense :value=loginErrorShow>{{ loginError }}</v-alert>

            <v-btn color="green" dark @click="login">
              <v-icon>mdi-fingerprint</v-icon>
              Login
            </v-btn>
        </div>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('authentication', [
      'loginEmail',
      'loginPassword',
      'loginError',
      'loginErrorShow'
    ])
  },
  methods: {
    ...mapMutations('authentication', [
      'setLoginEmail',
      'setLoginPassword'
    ]),
    ...mapActions('authentication', [
      'login'
    ])
  }
}
</script>

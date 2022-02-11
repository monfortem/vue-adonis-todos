<template>
  <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <div>
            <h1>Register</h1>
            <v-text-field
              label="Email"
              placeholder="Email"
              :value="registerEmail"
              @input="setRegisterEmail"
            ></v-text-field>

            <v-text-field
              label="Password"
              placeholder="Password"
              type="password"
              autocomplete="new-password"
              :value="registerPassword"
              @input="setRegisterPassword"
            ></v-text-field>

            <v-alert type="error" dense :value=registerErrorShow>{{ registerError }}</v-alert>

            <v-btn color="green" dark @click="register">
              <v-icon>mdi-account-circle</v-icon>
              Register
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
      'registerEmail',
      'registerPassword',
      'registerError',
      'registerErrorShow'
    ])
  },
  methods: {
    ...mapMutations('authentication', [
      'setRegisterEmail',
      'setRegisterPassword'
    ]),
    ...mapActions('authentication', [
      'register'
    ])
  }
}
</script>

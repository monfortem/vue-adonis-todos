<template>
    <v-row>
        <v-col md="10" class="pa-0 ma-0">
          <v-text-field
            :placeholder=placeholder
            :value=value
            @input="$emit('onInput', $event)"
            @keyup.enter="$emit('create')"
          ></v-text-field>
        </v-col>
        <v-col md="2" class="d-flex align-center justify-center pa-0 ma-0">
          <v-btn
            icon
            color="green"
            @click="$emit('create')"
          >
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String
    },
    value: {
      type: String
    }
  }
}
</script>

<style>

</style>

<template>
    <v-row class="pa-0 ma-0">
        <v-col md="10" class="text-body-2">
            <v-text-field
                autofocus
                v-if="isEditMode"
                :value="title"
                @keyup.enter="$emit('update')"
                @input="$emit('onInput', $event)"
            >
            </v-text-field>
            <span v-else>{{title}}</span>
        </v-col>
        <v-col md="2" class="d-flex align-center justify-center">
        <v-btn v-if="!isEditMode"
            icon
            color="green"
            @click="$emit('onEdit')"
        >
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-else
            icon
            color="green"
            @click="$emit('onUpdate')"
        >
            <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn
            icon
            color="green"
            @click="$emit('onDelete')"
        >
            <v-icon>mdi-trash-can</v-icon>
        </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
  props: {
    isEditMode: {
      type: Boolean
    },
    title: {
      type: String
    }
  }
}
</script>

<style>

</style>

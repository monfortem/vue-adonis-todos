<template>
  <Panel title="Tasks">
      <v-container fluid>
          <span v-if="tasks.length === 0" class="text--disabled">Create a new task...</span>
          <div v-for="task in tasks" :key="task.id">
              <EditableRecord
                :isEditMode="task.isEditMode"
                :title="task.description"
                v-on:update="updateTask(task)"
                v-on:onInput="setTaskDescription({
                        task,
                        description: $event
                    })"
                v-on:onEdit="setEditMode(task)"
                v-on:onUpdate="updateTask(task)"
                v-on:onDelete="deleteTask(task)"
              >
              <v-btn
                icon
                color="green"
                @click="checkClicked(task)"
              >
                <v-icon>
                  {{ task.completed ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'}}
                </v-icon>
              </v-btn>
              </EditableRecord>
          </div>
          <CreateRecord
            placeholder="I need to..."
            v-on:onInput="setNewTaskName"
            :value="newTaskName"
            v-on:create="createTask"
          />
      </v-container>
  </Panel>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import CreateRecord from '../components/CreateRecord.vue'
import EditableRecord from '../components/EditableRecord.vue'

export default {
  components: {
    CreateRecord,
    EditableRecord
  },
  computed: {
    ...mapState('tasks', [
      'tasks',
      'newTaskName'
    ])
  },
  methods: {
    ...mapActions('tasks', [
      'createTask',
      'updateTask',
      'deleteTask'
    ]),
    ...mapMutations('tasks', [
      'setNewTaskName',
      'setEditMode',
      'setTaskDescription',
      'toggleCompleted'
    ]),
    checkClicked (task) {
      this.toggleCompleted(task)
      this.updateTask(task)
    }
  }
}
</script>

<style>

</style>

import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    editTask(index, updatedTask) {
      this.tasks[index] = updatedTask;
    },
  },
  getters: {
    incompleteTasksCount() {
      return this.tasks.filter(task => !task.completed).length;
    },
  },
});

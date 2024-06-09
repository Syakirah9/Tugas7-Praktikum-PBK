<template>
  <div class="task-manager">
    <h2>Pinia Manager</h2>

    <form @submit.prevent="addTask">
      <input type="text" v-model="newTask" placeholder="">
      <button type="submit">Tambah</button>
    </form>

    <div v-if="tasks.length > 0" class="task-list">
      <div v-for="(task, index) in tasks" :key="index" class="task-item">
        <span
          v-if="!task.editing"
          @click="startEditing(index)"
          class="task-name"
        >{{ task.name }}</span>
        <input
          v-else
          type="text"
          v-model="task.name"
          @keydown.enter="finishEditing(index)"
          @keydown.escape="cancelEditing(index)"
          class="edit-task-input"
        >
        <div class="task-actions">
          <button v-if="!task.editing" @click="startEditing(index)">Edit</button>
          <button v-if="!task.editing" @click="removeTask(index)">Hapus</button>
          <button v-if="task.editing" @click="finishEditing(index)">Simpan</button>
          <button v-if="task.editing" @click="cancelEditing(index)">Batal</button>
        </div>
      </div>
    </div>

    <p v-else>Tidak Ada Catatan Yang Tersedia</p>

    <p v-if="incompleteCount > 0">
         {{ incompleteCount }} Catatan.
    </p>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/todoStores';

export default {
  name: 'TaskManager',
  data() {
    return {
      newTask: '',
    };
  },
  computed: {
    tasks() {
      return useTaskStore().tasks;
    },
    incompleteCount() {
      return useTaskStore().incompleteTasksCount;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        useTaskStore().addTask({
          name: this.newTask,
          completed: false,
          editing: false,
        });
        this.newTask = '';
      }
    },
    removeTask(index) {
      useTaskStore().removeTask(index);
    },
    startEditing(index) {
      useTaskStore().tasks[index].editing = true;
    },
    finishEditing(index) {
      const updatedTask = { ...this.tasks[index], editing: false };
      useTaskStore().editTask(index, updatedTask);
    },
    cancelEditing(index) {
      useTaskStore().tasks[index].editing = false;
    },
  },
};
</script>

<style scoped>
.task-manager {
  width: 600px;
  margin: auto;
  background-color: #f2f2f2; /* Light grey background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 2rem;
  color: #444; /* Dark grey for heading */
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  color: #444; /* Dark grey for text input */
}

input[type="text"]::placeholder {
  color: #aaa;
}

button[type="submit"] {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #666; /* Darker grey on hover */
}

.task-list {
  flex: 1;
  font-size: 2rem;
  color: #333; /* Dark grey for main text */
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  text-align: start;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.task-name {
  flex: 1;
  font-size: 1rem;
  color: #444; /* Dark grey for main text */
  cursor: pointer;
}

.edit-task-input {
  flex: 1;
  font-size: 1rem;
  color: #444; /* Dark grey for text input */
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
}

.task-actions {
  display: flex;
  align-items: center;
}

button {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 6px 12px;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 5px;
}

button:hover {
  background-color: #666; /* Darker grey on hover */
}

p {
  font-size: 1rem;
  color: #444; /* Dark grey for paragraph text */
}
</style>

<!-- src/App.vue -->
<template>
  <div id="app">
    <TaskManager />
  </div>
</template>

<script>
import TaskManager from './components/TaskManager.vue';

export default {
  components: {
    TaskManager,
  },
};
</script>

<style>
body {
  background-color: antiquewhite;
}

#app {
  display: flex;
  justify-content: center;
  height: 100vh;
  font-family: 'Courier New', Courier, monospace;
  color: #534646;
}

* {
  font-family: 'Courier New', Courier, monospace;
}
</style>

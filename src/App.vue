<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheFooter from './components/organisms/TheFooter.vue'
</script>

<template>
  <div class="app">
    <main class="main-content">
      <RouterView />
    </main>

    <TheFooter />
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1e1e1e; /* Dark gray background */
  color: #d4d4d4; /* Light gray text */
  font-family: 'Courier New', monospace;
}

.main-content {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Scrollbar styling for the terminal theme */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
}

::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #569cd6;
}

/* Selection styling */
::selection {
  background-color: rgba(86, 156, 214, 0.3);
  color: #fff;
}

@media (max-width: 768px) {
  .main-content {
    padding: 0.5rem;
  }
}
</style>

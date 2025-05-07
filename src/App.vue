<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/organisms/TheHeader.vue'
import TheFooter from './components/organisms/TheFooter.vue'
</script>

<template>
  <div class="app">
    <TheHeader />
    
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
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}
</style>
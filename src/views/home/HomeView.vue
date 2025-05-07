<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FeaturedDistributions from '../../components/organisms/FeaturedDistributions.vue'
import LatestTips from '../../components/organisms/LatestTips.vue'
import NewsHighlights from '../../components/organisms/NewsHighlights.vue'

const isLoading = ref(true)

onMounted(() => {
  // Simulando carregamento de dados
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Tour de Linux</h1>
        <p>Seu guia pelo mundo das distribuições Linux, dicas e notícias</p>
      </div>
    </section>

    <div v-if="isLoading" class="loading">
      <p>Carregando conteúdo...</p>
    </div>
    
    <div v-else class="content">
      <section class="section">
        <h2 class="section-title">Distribuições em Destaque</h2>
        <FeaturedDistributions />
      </section>
      
      <section class="section">
        <h2 class="section-title">Dicas Recentes</h2>
        <LatestTips />
      </section>
      
      <section class="section">
        <h2 class="section-title">Notícias do Mundo Linux</h2>
        <NewsHighlights />
      </section>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('/src/assets/images/linux-hero.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 4rem 1rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: #42b883;
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero p {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
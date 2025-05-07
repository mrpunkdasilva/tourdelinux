<script setup lang="ts">
import FeaturedDistributions from '../components/organisms/FeaturedDistributions.vue'
import LatestTips from '../components/organisms/LatestTips.vue'
import NewsHighlights from '../components/organisms/NewsHighlights.vue'
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Descubra o Mundo Linux</h1>
        <p class="hero-subtitle">
          Seu guia completo para distribuições, dicas e notícias sobre o ecossistema Linux
        </p>
        <div class="hero-actions">
          <RouterLink to="/distributions" class="hero-button primary">
            Explorar Distribuições
          </RouterLink>
          <RouterLink to="/tips" class="hero-button secondary">
            Ver Dicas
          </RouterLink>
        </div>
      </div>
    </section>
    
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
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  border-radius: 12px;
  padding: 4rem 2rem;
  margin-bottom: 3
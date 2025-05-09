<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NewsFactory } from '@/factories/NewsFactory'

const route = useRoute()
const router = useRouter()
const newsId = Number(route.params.id)

const newsItem = ref(null)
const relatedNews = ref([])
const isLoading = ref(true)
const error = ref(null)

// Simulação de busca de dados
const fetchNewsDetail = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Em uma aplicação real, aqui faríamos uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Obter notícia pelo ID usando o factory
    const foundNews = NewsFactory.getNewsById(newsId)
    
    if (foundNews) {
      newsItem.value = foundNews
      
      // Obter notícias relacionadas usando o factory
      relatedNews.value = NewsFactory.getRelatedNews(newsId, 3)
    } else {
      error.value = 'Notícia não encontrada'
      router.push({ name: 'news' })
    }
  } catch (err) {
    error.value = 'Erro ao carregar a notícia'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const navigateToRelated = (id) => {
  router.push({ name: 'news-detail', params: { id } })
  window.scrollTo(0, 0)
}

const goBack = () => {
  router.push({ name: 'news' })
}

onMounted(() => {
  fetchNewsDetail()
})
</script>

<template>
  <div class="news-detail">
    <button @click="goBack" class="back-button">
      &larr; Voltar para notícias
    </button>
    
    <div v-if="isLoading" class="loading">
      <p>Carregando notícia...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchNewsDetail">Tentar novamente</button>
    </div>
    
    <div v-else-if="newsItem" class="news-content">
      <div class="news-header">
        <div class="news-meta">
          <span class="news-category">{{ newsItem.category }}</span>
          <span class="news-date">{{ formatDate(newsItem.date) }}</span>
        </div>
        
        <h1 class="news-title">{{ newsItem.title }}</h1>
        
        <div class="news-author">
          Por <span class="author-name">{{ newsItem.author }}</span> | 
          <span class="news-source">{{ newsItem.source }}</span>
        </div>
        
        <div class="news-tags">
          <span 
            v-for="(tag, index) in newsItem.tags" 
            :key="index"
            class="news-tag"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
      
      <div class="news-body">
        <p class="news-excerpt">{{ newsItem.excerpt }}</p>
        
        <div class="news-full-content" v-html="newsItem.content"></div>
      </div>
      
      <div v-if="relatedNews.length > 0" class="related-news">
        <h3>Notícias relacionadas</h3>
        
        <div class="related-news-grid">
          <div 
            v-for="item in relatedNews" 
            :key="item.id"
            class="related-news-card"
            @click="navigateToRelated(item.id)"
          >
            <div class="related-news-content">
              <div class="related-news-category">{{ item.category }}</div>
              <h4 class="related-news-title">{{ item.title }}</h4>
              <p class="related-news-excerpt">{{ item.excerpt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.back-button {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  display: inline-block;
}

.back-button:hover {
  text-decoration: underline;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.news-header {
  margin-bottom: 2rem;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.news-category {
  background-color: var(--color-primary);
  color: var(--color-background);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  text-transform: capitalize;
}

.news-date {
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.news-title {
  font-size: 2.5rem;
  line-height: 1.2;
  margin: 0 0 1rem 0;
  color: var(--color-text);
}

.news-author {
  font-size: 1rem;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.author-name {
  font-weight: 600;
}

.news-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.news-tag {
  font-size: 0.9rem;
  color: var(--color-primary);
}

.news-body {
  font-size: 1.1rem;
  line-height: 1.6;
}

.news-excerpt {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 2rem;
  padding-left: 1rem;
  border-left: 4px solid var(--color-primary);
}

.news-full-content {
  color: var(--color-text);
}

.news-full-content p {
  margin-bottom: 1.5rem;
}

.related-news {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.related-news h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.related-news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.related-news-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  background-color: var(--color-background-light);
}

.related-news-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow-neon);
}

.related-news-content {
  padding: 1rem;
}

.related-news-category {
  display: inline-block;
  background-color: var(--color-primary

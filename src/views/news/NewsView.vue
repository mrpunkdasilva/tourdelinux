<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NewsFactory } from '@/factories/NewsFactory'
import { NewsItem, NewsCategory } from '@/types/News'

const router = useRouter()
const news = ref<NewsItem[]>([])
const isLoading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories: NewsCategory[] = [
  { id: 'all', name: 'Todas' },
  { id: 'releases', name: 'Lançamentos' },
  { id: 'security', name: 'Segurança' },
  { id: 'community', name: 'Comunidade' },
  { id: 'enterprise', name: 'Empresarial' }
]

const fetchNews = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    // Simulando chamada de API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Obter notícias do factory
    news.value = NewsFactory.getMockNews()
  } catch (err) {
    error.value = 'Erro ao carregar as notícias'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const filteredNews = computed(() => {
  let result = [...news.value]
  
  // Filtrar por categoria
  if (selectedCategory.value !== 'all') {
    result = result.filter(item => 
      item.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }
  
  // Filtrar por termo de busca
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.excerpt.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return result
})

const navigateToNewsDetail = (id: number) => {
  router.push({ name: 'news-detail', params: { id } })
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <div class="news-view">
    <div class="news-header">
      <h1>Notícias do Mundo Linux</h1>
      <p>Fique por dentro das últimas novidades sobre distribuições, segurança e comunidade Linux</p>
    </div>
    
    <div class="filters">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar notícias..." 
          class="search-input"
        />
      </div>
      
      <div class="category-filter">
        <div 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-option', { active: selectedCategory === category.id }]"
          @click="selectedCategory = category.id"
        >
          {{ category.name }}
        </div>
      </div>
      
      <div class="filter-actions" v-if="searchQuery || selectedCategory !== 'all'">
        <button 
          class="reset-button"
          @click="resetFilters"
        >
          Limpar filtros
        </button>
      </div>
    </div>
    
    <div v-if="isLoading" class="loading">
      <p>Carregando notícias...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchNews">Tentar novamente</button>
    </div>
    
    <div v-else-if="filteredNews.length === 0" class="no-results">
      <p>Nenhuma notícia encontrada com os filtros atuais.</p>
      <button @click="resetFilters">Limpar filtros</button>
    </div>
    
    <div v-else class="news-grid">
      <div 
        v-for="item in filteredNews" 
        :key="item.id"
        class="news-card"
        @click="navigateToNewsDetail(item.id)"
      >
        <div class="news-card-content">
          <div class="news-card-category">{{ item.category }}</div>
          <h2 class="news-card-title">{{ item.title }}</h2>
          <p class="news-card-excerpt">{{ item.excerpt }}</p>
          
          <div class="news-card-meta">
            <span class="news-card-date">{{ new Date(item.date).toLocaleDateString('pt-BR') }}</span>
            <span class="news-card-source">{{ item.source }}</span>
          </div>
          
          <div class="news-card-tags">
            <span 
              v-for="(tag, index) in item.tags.slice(0, 3)" 
              :key="index"
              class="news-card-tag"
            >
              #{{ tag }}
            </span>
            <span v-if="item.tags.length > 3" class="news-card-tag-more">+{{ item.tags.length - 3 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-view {
  max-width: 1200px;
  margin: 0 auto;
}

.news-header {
  text-align: center;
  margin-bottom: 2rem;
}

.news-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.news-header p {
  font-size: 1.1rem;
  color: var(--color-text-light);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background-light);
  color: var(--color-text);
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  box-shadow: var(--box-shadow-neon);
  border-color: var(--color-primary);
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-option {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.category-option:hover {
  background-color: rgba(0, 255, 170, 0.1);
}

.category-option.active {
  background-color: var(--color-primary);
  color: var(--color-background);
  border-color: var(--color-primary);
}

.filter-actions {
  margin-left: auto;
}

.reset-button {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 0.9rem;
}

.reset-button:hover {
  text-decoration: underline;
}

.loading, .error, .no-results {
  text-align: center;
  padding: 3rem 1rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.news-card {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  background-color: var(--color-background-light);
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow-neon);
}

.news-card-content {
  padding: 1.5rem;
}

.news-card-category {
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-background);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.news-card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.news-card-excerpt {
  font-size: 0.95rem;
  color: var(--color-text-light);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.news-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.news-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.news-card-tag, .news-card-tag-more {
  font-size: 0.8rem;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-actions {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const distributions = ref([])
const isLoading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: 'Todas' },
  { id: 'desktop', name: 'Desktop' },
  { id: 'server', name: 'Server' },
  { id: 'lightweight', name: 'Lightweight' }
]

const fetchDistributions = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    // Simulando chamada de API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    distributions.value = [
      {
        id: 1,
        name: 'Ubuntu',
        version: '22.04 LTS',
        category: 'desktop',
        logo: '/src/assets/images/ubuntu-logo.png',
        description: 'Uma das distribuições Linux mais populares, conhecida por sua facilidade de uso.',
        rating: 4.5
      },
      {
        id: 2,
        name: 'Debian',
        version: '11 Bullseye',
        category: 'server',
        logo: '/src/assets/images/debian-logo.png',
        description: 'Conhecida por sua estabilidade e segurança, é uma excelente escolha para servidores.',
        rating: 4.7
      },
      {
        id: 3,
        name: 'Fedora',
        version: '37',
        category: 'desktop',
        logo: '/src/assets/images/fedora-logo.png',
        description: 'Distribuição patrocinada pela Red Hat, focada em software livre e inovação.',
        rating: 4.3
      },
      {
        id: 4,
        name: 'Arch Linux',
        version: 'Rolling Release',
        category: 'desktop',
        logo: '/src/assets/images/arch-logo.png',
        description: 'Distribuição minimalista com atualizações contínuas e grande personalização.',
        rating: 4.6
      },
      {
        id: 5,
        name: 'Linux Mint',
        version: '21',
        category: 'desktop',
        logo: '/src/assets/images/mint-logo.png',
        description: 'Baseada no Ubuntu, com foco em usabilidade e interface amigável.',
        rating: 4.4
      },
      {
        id: 6,
        name: 'CentOS',
        version: 'Stream 9',
        category: 'server',
        logo: '/src/assets/images/centos-logo.png',
        description: 'Distribuição empresarial derivada do Red Hat Enterprise Linux.',
        rating: 4.2
      },
      {
        id: 7,
        name: 'Lubuntu',
        version: '22.04 LTS',
        category: 'lightweight',
        logo: '/src/assets/images/lubuntu-logo.png',
        description: 'Versão leve do Ubuntu, ideal para computadores antigos.',
        rating: 4.0
      },
      {
        id: 8,
        name: 'openSUSE',
        version: 'Leap 15.4',
        category: 'desktop',
        logo: '/src/assets/images/opensuse-logo.png',
        description: 'Distribuição versátil com ferramentas de administração avançadas.',
        rating: 4.1
      }
    ]
  } catch (err) {
    error.value = 'Erro ao carregar as distribuições'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const filteredDistributions = computed(() => {
  let result = [...distributions.value]
  
  // Filtrar por categoria
  if (selectedCategory.value !== 'all') {
    result = result.filter(distro => 
      distro.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }
  
  // Filtrar por termo de busca
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(distro => 
      distro.name.toLowerCase().includes(query) || 
      distro.description.toLowerCase().includes(query)
    )
  }
  
  return result
})

const navigateToDistribution = (id: number) => {
  router.push({ name: 'distribution-detail', params: { id } })
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

onMounted(() => {
  fetchDistributions()
})
</script>

<template>
  <div class="distributions-view">
    <div class="distributions-header">
      <h1>Distribuições Linux</h1>
      <p>Explore as principais distribuições Linux e encontre a ideal para você</p>
    </div>
    
    <div class="filters">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar distribuições..." 
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
      <p>Carregando distribuições...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchDistributions">Tentar novamente</button>
    </div>
    
    <div v-else-if="filteredDistributions.length === 0" class="no-results">
      <p>Nenhuma distribuição encontrada com os filtros atuais.</p>
      <button @click="resetFilters">Limpar filtros</button>
    </div>
    
    <div v-else class="distributions-grid">
      <div 
        v-for="distribution in filteredDistributions" 
        :key="distribution.id"
        class="distribution-card"
        @click="navigateToDistribution(distribution.id)"
      >
        <div class="distribution-logo">
          <img 
            :src="distribution.logo" 
            :alt="`${distribution.name} logo`"
            @error="$event.target.src = '/src/assets/images/default-distro.png'"
          />
        </div>
        <div class="distribution-info">
          <h3>{{ distribution.name }} <span class="version">{{ distribution.version }}</span></h3>
          <div class="rating">
            <span class="stars">★★★★★</span>
            <span class="rating-value">{{ distribution.rating }}/5</span>
          </div>
          <p class="description">{{ distribution.description }}</p>
          <div class="category-tag">{{ distribution.category }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.distributions-view {
  max-width: 1200px;
  margin: 0 auto;
}

.distributions-header {
  text-align: center;
  margin-bottom: 2rem;
}

.distributions-header h1 {
  margin: 0;
  margin-bottom: 0.5rem;
  color: #2c3e50;
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
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-option {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.2s;
}

.category-option.active {
  background-color: #4CAF50;
  color: white;
}

.reset-button {
  background: none;
  border: none;
  color: #2c3e50;
  text-decoration: underline;
  cursor: pointer;
  padding: 0.5rem;
}

.distributions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.distribution-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  background-color: white;
}

.distribution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.distribution-logo {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f9f9f9;
}

.distribution-logo img {
  max-height: 80px;
  max-width: 80%;
  object-fit: contain;
}

.distribution-info {
  padding: 1.5rem;
}

.distribution-info h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.version {
  font-size: 0.8rem;
  color: #666;
  font-weight: normal;
}

.rating {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stars {
  color: #FFD700;
  margin-right: 0.5rem;
}

.rating-value {
  font-size: 0.9rem;
  color: #666;
}

.description {
  margin-bottom: 1rem;
  color: #333;
  line-height: 1.4;
}

.category-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #e0e0e0;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: capitalize;
}

.loading, .error, .no-results {
  text-align: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .distributions-grid {
    grid-template-columns: 1fr;
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
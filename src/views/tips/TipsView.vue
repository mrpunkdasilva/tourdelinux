<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TipCard from '../../components/molecules/TipCard.vue'
import BaseButton from '../../components/atoms/BaseButton.vue'

const router = useRouter()
const tips = ref([])
const isLoading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: 'Todas as categorias' },
  { id: 'seguranca', name: 'Segurança' },
  { id: 'performance', name: 'Performance' },
  { id: 'terminal', name: 'Terminal' },
  { id: 'desktop', name: 'Desktop' },
  { id: 'servidor', name: 'Servidor' }
]

// Simulação de busca de dados
const fetchTips = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Em uma aplicação real, aqui faríamos uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Dados mockados para demonstração
    tips.value = [
      {
        id: 1,
        title: 'Como configurar um servidor SSH seguro',
        excerpt: 'Aprenda a configurar um servidor SSH com as melhores práticas de segurança para proteger seu sistema Linux.',
        author: 'João Silva',
        date: '2023-05-15',
        readTime: 8,
        category: 'Segurança',
        tags: ['ssh', 'segurança', 'servidor', 'linux']
      },
      {
        id: 2,
        title: 'Comandos essenciais do terminal Linux',
        excerpt: 'Uma lista dos comandos mais úteis que todo usuário Linux deveria conhecer para aumentar sua produtividade.',
        author: 'Maria Santos',
        date: '2023-05-10',
        readTime: 6,
        category: 'Terminal',
        tags: ['terminal', 'comandos', 'produtividade']
      },
      {
        id: 3,
        title: 'Otimizando o consumo de memória no Linux',
        excerpt: 'Dicas práticas para reduzir o consumo de memória RAM e melhorar o desempenho do seu sistema Linux.',
        author: 'Carlos Oliveira',
        date: '2023-05-05',
        readTime: 10,
        category: 'Performance',
        tags: ['memória', 'otimização', 'desempenho']
      },
      {
        id: 4,
        title: 'Configurando o Firewall UFW no Ubuntu',
        excerpt: 'Um guia passo a passo para configurar o Uncomplicated Firewall (UFW) no Ubuntu e proteger seu sistema.',
        author: 'Ana Pereira',
        date: '2023-04-28',
        readTime: 7,
        category: 'Segurança',
        tags: ['firewall', 'ufw', 'ubuntu', 'segurança']
      },
      {
        id: 5,
        title: 'Personalizando o ambiente GNOME',
        excerpt: 'Aprenda a personalizar o ambiente de desktop GNOME com temas, extensões e configurações avançadas.',
        author: 'Pedro Souza',
        date: '2023-04-20',
        readTime: 9,
        category: 'Desktop',
        tags: ['gnome', 'personalização', 'desktop', 'temas']
      },
      {
        id: 6,
        title: 'Configurando um servidor web com Nginx',
        excerpt: 'Um tutorial completo sobre como configurar um servidor web Nginx otimizado para hospedar sites e aplicações.',
        author: 'Luiza Costa',
        date: '2023-04-15',
        readTime: 12,
        category: 'Servidor',
        tags: ['nginx', 'servidor', 'web', 'configuração']
      }
    ]
  } catch (err) {
    error.value = 'Erro ao carregar as dicas'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const filteredTips = computed(() => {
  let result = [...tips.value]
  
  // Filtrar por categoria
  if (selectedCategory.value !== 'all') {
    result = result.filter(tip => 
      tip.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }
  
  // Filtrar por termo de busca
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(tip => 
      tip.title.toLowerCase().includes(query) || 
      tip.excerpt.toLowerCase().includes(query) ||
      tip.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return result
})

const navigateToTip = (id: number) => {
  router.push({ name: 'tip-detail', params: { id } })
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

onMounted(() => {
  fetchTips()
})
</script>

<template>
  <div class="tips-view">
    <div class="tips-header">
      <h1>Dicas Linux</h1>
      <p>Explore nossa coleção de dicas e tutoriais para melhorar sua experiência com Linux</p>
    </div>
    
    <div class="filters">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar dicas..." 
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
        <BaseButton 
          variant="text" 
          @click="resetFilters"
        >
          Limpar filtros
        </BaseButton>
      </div>
    </div>
    
    <div v-if="isLoading" class="loading">
      <p>Carregando dicas...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <BaseButton @click="fetchTips">Tentar novamente</BaseButton>
    </div>
    
    <div v-else-if="filteredTips.length === 0" class="no-results">
      <p>Nenhuma dica encontrada com os filtros atuais.</p>
      <BaseButton @click="resetFilters">Limpar filtros</BaseButton>
    </div>
    
    <div v-else class="tips-grid">
      <TipCard 
        v-for="tip in filteredTips" 
        :key="tip.id"
        :tip="tip"
        @click="navigateToTip(tip.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.tips-view {
  max-width: 1200px;
  margin: 0 auto;
}

.tips-header {
  text-align: center;
  margin-bottom: 2rem;
}

.tips-header h1 {
  margin: 0;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.tips-header p {
  margin: 0;
  color: #666;
}

.filters {
  margin-bottom: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #42b883;
  outline: none;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.category-option {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 0.875rem;
}

.category-option:hover {
  background-color: #e0e0e0;
}

.category-option.active {
  background-color: #42b883;
  color: white;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
}

.loading, .error, .no-results {
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.error {
  color: #e53935;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .category-filter {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .category-option {
    text-align: center;
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
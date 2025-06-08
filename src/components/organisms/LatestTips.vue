<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import TipCard from '../molecules/TipCard.vue'

const router = useRouter()
const tips = ref([])
const filteredTips = ref([])
const isLoading = ref(true)
const filterInfo = ref({ active: false, type: '', value: '' })

// Simulação de busca de dados
const fetchTips = async () => {
  isLoading.value = true

  try {
    // Em uma aplicação real, aqui faríamos uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))

    // Verificar se há filtros aplicados
    const filterData = sessionStorage.getItem('tipFilter')
    if (filterData) {
      const filter = JSON.parse(filterData)
      filterInfo.value = { active: true, type: filter.type, value: filter.value }
    } else {
      filterInfo.value = { active: false, type: '', value: '' }
    }

    // Dados mockados para demonstração
    tips.value = [
      {
        id: 1,
        title: 'Como otimizar o consumo de memória no Linux',
        excerpt: 'Aprenda técnicas para reduzir o uso de memória RAM e melhorar o desempenho do seu sistema Linux.',
        author: 'Ana Silva',
        date: '2023-05-15',
        readTime: 5,
        category: 'Performance',
        tags: ['memória', 'otimização', 'desempenho']
      },
      {
        id: 2,
        title: 'Configurando um servidor web com Nginx',
        excerpt: 'Um guia passo a passo para configurar um servidor web eficiente usando Nginx no Ubuntu Server.',
        author: 'Carlos Mendes',
        date: '2023-05-10',
        readTime: 8,
        category: 'Servidores',
        tags: ['nginx', 'ubuntu', 'web']
      },
      {
        id: 3,
        title: 'Comandos essenciais do terminal para iniciantes',
        excerpt: 'Uma lista dos comandos mais importantes que todo usuário Linux iniciante deveria conhecer.',
        author: 'Pedro Costa',
        date: '2023-05-05',
        readTime: 4,
        category: 'Básico',
        tags: ['terminal', 'comandos', 'iniciante']
      }
    ]
  } catch (err) {
    console.error('Erro ao carregar dicas:', err)
  } finally {
    // Aplicar filtros se necessário
    applyFilters()
    isLoading.value = false
  }
}

// Função para aplicar filtros nas dicas
const applyFilters = () => {
  if (!filterInfo.value.active) {
    filteredTips.value = [...tips.value]
    return
  }

  if (filterInfo.value.type === 'category') {
    filteredTips.value = tips.value.filter(tip => 
      tip.category.toLowerCase() === filterInfo.value.value.toLowerCase()
    )
  } else if (filterInfo.value.type === 'tag') {
    filteredTips.value = tips.value.filter(tip => 
      tip.tags.some(tag => tag.toLowerCase() === filterInfo.value.value.toLowerCase())
    )
  } else {
    filteredTips.value = [...tips.value]
  }
}

const navigateToTip = (id) => {
  router.push({ name: 'tip-detail', params: { id } })
}

// Limpar filtro ao desmontar o componente
const clearFilter = () => {
  sessionStorage.removeItem('tipFilter')
}

onMounted(() => {
  fetchTips()
})

// Limpar filtro ao desmontar o componente
onUnmounted(() => {
  clearFilter()
})
</script>

<template>
  <div class="latest-tips">
    <div v-if="isLoading" class="loading">
      <p>Carregando dicas...</p>
    </div>

    <div v-else>
      <!-- Mostrar informações de filtro se aplicável -->
      <div v-if="filterInfo.active" class="filter-info">
        <div class="filter-badge">
          <span>Filtro: </span>
          <span v-if="filterInfo.type === 'category'">Categoria "{{ filterInfo.value }}"</span>
          <span v-else-if="filterInfo.type === 'tag'">Tag "{{ filterInfo.value }}"</span>
        </div>
        <div class="filter-results">
          {{ filteredTips.length }} resultado(s) encontrado(s)
        </div>
      </div>

      <!-- Mensagem quando não há resultados -->
      <div v-if="filteredTips.length === 0" class="no-results">
        <p>Nenhuma dica encontrada com os filtros aplicados.</p>
        <p class="help-text">Use o comando "tips" sem filtros para ver todas as dicas.</p>
      </div>

      <!-- Grid de dicas -->
      <div v-else class="tips-grid">
        <div 
          v-for="tip in filteredTips" 
          :key="tip.id"
          @click="navigateToTip(tip.id)"
        >
          <TipCard :tip="tip" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.latest-tips {
  width: 100%;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Cyberpunk terminal styling for tip cards */
:deep(.tip-card) {
  background-color: rgba(0, 20, 0, 0.7) !important;
  border: 1px solid #0f0 !important;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2) !important;
  color: #0f0 !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

:deep(.tip-card:hover) {
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.4) !important;
  transform: translateY(-3px) !important;
}

:deep(.tip-title) {
  color: #0f0 !important;
  text-shadow: 0 0 5px #0f0 !important;
}

:deep(.tip-excerpt) {
  color: #0f0 !important;
}

:deep(.tip-meta) {
  color: rgba(0, 255, 0, 0.7) !important;
  border-top: 1px solid rgba(0, 255, 0, 0.3) !important;
}

:deep(.tip-tag) {
  background-color: rgba(0, 50, 0, 0.7) !important;
  border: 1px solid #0f0 !important;
  color: #0f0 !important;
}

.filter-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 20, 0, 0.7);
  border: 1px solid #0f0;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

.filter-badge {
  color: #0f0;
  font-weight: bold;
  text-shadow: 0 0 5px #0f0;
}

.filter-results {
  color: rgba(0, 255, 0, 0.7);
  font-style: italic;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #0f0;
  background-color: rgba(0, 20, 0, 0.7);
  border: 1px solid #0f0;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

.help-text {
  margin-top: 1rem;
  font-style: italic;
  color: rgba(0, 255, 0, 0.7);
}

@media (max-width: 768px) {
  .tips-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-info {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>

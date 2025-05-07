<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TipCard from '../molecules/TipCard.vue'

const router = useRouter()
const tips = ref([])
const isLoading = ref(true)

// Simulação de busca de dados
const fetchTips = async () => {
  isLoading.value = true
  
  try {
    // Em uma aplicação real, aqui faríamos uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))
    
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
    isLoading.value = false
  }
}

const navigateToTip = (id) => {
  router.push({ name: 'tip-detail', params: { id } })
}

onMounted(() => {
  fetchTips()
})
</script>

<template>
  <div class="latest-tips">
    <div v-if="isLoading" class="loading">
      <p>Carregando dicas...</p>
    </div>
    
    <div v-else class="tips-grid">
      <div 
        v-for="tip in tips" 
        :key="tip.id"
        @click="navigateToTip(tip.id)"
      >
        <TipCard :tip="tip" />
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
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
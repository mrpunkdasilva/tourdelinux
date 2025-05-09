<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TipFactory } from '@/factories/TipFactory'
import BaseButton from '@/components/atoms/BaseButton.vue'
import type {RelatedTip, Tip} from "@/types/Tip";

const route = useRoute()
const router = useRouter()
const tipId = Number(route.params.id)

const tip = ref<Tip | null>(null)
const relatedTips = ref<RelatedTip[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Simulação de busca de dados
const fetchTipDetail = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Em uma aplicação real, aqui faríamos uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Obter dica pelo ID usando o factory
    const foundTip = TipFactory.getTipById(tipId)
    
    if (foundTip) {
      tip.value = foundTip
      
      // Obter dicas relacionadas usando o factory
      relatedTips.value = TipFactory.getRelatedTips(tipId, 3)
    } else {
      error.value = 'Dica não encontrada'
      router.push({ name: 'tips' })
    }
  } catch (err) {
    error.value = 'Erro ao carregar a dica'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const navigateToRelatedTip = (id: number) => {
  router.push({ name: 'tip-detail', params: { id } })
  // Rolar para o topo da página
  window.scrollTo(0, 0)
}

const goBack = () => {
  router.push({ name: 'tips' })
}

// Função para lidar com erro de carregamento de imagem
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = '/src/assets/images/default-avatar.jpg'
  }
}

onMounted(() => {
  fetchTipDetail()
})
</script>

<template>
  <div class="tip-detail">
    <button @click="goBack" class="back-button">
      &larr; Voltar para dicas
    </button>
    
    <div v-if="isLoading" class="loading">
      <p>Carregando dica...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <BaseButton @click="fetchTipDetail">Tentar novamente</BaseButton>
    </div>
    
    <div v-else-if="tip" class="tip-content">
      <div class="tip-header">
        <div class="tip-category">{{ tip.category }}</div>
        <h1 class="tip-title">{{ tip.title }}</h1>
        
        <div class="tip-meta">
          <div class="author-info">
            <img 
              :src="tip.authorAvatar" 
              :alt="tip.author" 
              class="author-avatar"
              @error="handleImageError"
            />
            <span class="author-name">Por {{ tip.author }}</span>
          </div>
          
          <div class="tip-details">
            <span class="tip-date">{{ formatDate(tip.date) }}</span>
            <span class="tip-read-time">{{ tip.readTime }} min de leitura</span>
          </div>
        </div>
        
        <div class="tip-tags">
          <span v-for="(tag, index) in tip.tags" :key="index" class="tip-tag">
            #{{ tag }}
          </span>
        </div>
      </div>
      
      <div class="tip-body" v-html="tip.content"></div>
      
      <div class="tip-footer">
        <h3>Dicas Relacionadas</h3>
        <div class="related-tips">
          <div 
            v-for="relatedTip in relatedTips" 
            :key="relatedTip.id"
            class="related-tip"
            @click="navigateToRelatedTip(relatedTip.id)"
          >
            <h4>{{ relatedTip.title }}</h4>
            <p
              class="related-tip-excerpt"
              v-html="relatedTip.excerpt"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tip-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.back-button {
  display: inline-block;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}

.back-button:hover {
  color: var(--color-primary-dark);
}

.loading, .error {
  text-align: center;
  padding: 3rem 0;
}

.error p {
  color: #e74c3c; /* Substituindo var(--color-error) */
  margin-bottom: 1rem;
}

.tip-header {
  margin-bottom: 2rem;
}

.tip-category {
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.tip-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50; /* Substituindo var(--color-text-dark) */
  line-height: 1.2;
}

.tip-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.8rem;
  object-fit: cover;
}

.author-name {
  font-weight: 500;
}

.tip-details {
  display: flex;
  gap: 1.5rem;
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.tip-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tip-tag {
  background-color: var(--color-background-light);
  padding: 0.3rem 0.8rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.tip-body {
  line-height: 1.7;
  color: var(--color-text);
  margin-bottom: 3rem;
}

.tip-body h2 {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #2c3e50; /* Substituindo var(--color-text-dark) */
}

.tip-body h3 {
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem;
  color: #2c3e50; /* Substituindo var(--color-text-dark) */
}

.tip-body p {
  margin-bottom: 1.5rem;
}

.tip-body pre {
  background-color: var(--color-background-light);
  padding: 1rem;
  border-radius: var(--border-radius-md);
  overflow-x: auto;
  margin: 1.5rem 0;
}

.tip-body code {
  font-family: monospace;
}

.tip-body ul, .tip-body ol {
  margin: 1rem 0 1.5rem 2rem;
}

.tip-body li {
  margin-bottom: 0.5rem;
}

.tip-footer {
  border-top: 1px solid var(--color-border);
  padding-top: 2rem;
}

.tip-footer h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50; /* Substituindo var(--color-text-dark) */
}

.related-tips {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.related-tip {
  background-color: var(--color-background-light);
  padding: 1.5rem;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.related-tip:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Substituindo var(--box-shadow-md) */
}

.related-tip h4 {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: #2c3e50; /* Substituindo var(--color-text-dark) */
}

.related-tip-excerpt {
  font-size: 0.9rem;
  color: var(--color-text-light);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .tip-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .tip-title {
    font-size: 2rem;
  }
  
  .related-tips {
    grid-template-columns: 1fr;
  }
}
</style>
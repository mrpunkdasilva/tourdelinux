<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '../../components/atoms/BaseButton.vue'
import RatingStars from '../../components/atoms/RatingStars.vue'

const route = useRoute()
const distributionId = Number(route.params.id)

const distribution = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Simulação de busca de dados
const fetchDistribution = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Em uma aplicação real, aqui faríamos uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Dados mockados para demonstração
    distribution.value = {
      id: distributionId,
      name: 'Ubuntu',
      version: '22.04 LTS',
      logo: '/src/assets/images/ubuntu-logo.png',
      basedOn: 'Debian',
      releaseDate: '2022-04-21',
      desktopEnvironment: 'GNOME',
      description: 'Ubuntu é uma distribuição Linux baseada no Debian, focada em facilidade de uso e acessibilidade. É uma das distribuições mais populares para desktops e servidores, com uma grande comunidade de usuários e desenvolvedores.',
      longDescription: `
        Ubuntu é uma distribuição Linux baseada no Debian, desenvolvida pela Canonical Ltd. O nome da distribuição vem do conceito zulu/xhosa de ubuntu, que significa "humanidade para com os outros" ou "sou o que sou pelo que nós somos todos".
        
        A distribuição foi lançada em outubro de 2004 e desde então tem sido uma das mais populares distribuições Linux para desktops e servidores. Ubuntu é lançado a cada seis meses, com versões LTS (Long Term Support) a cada dois anos, que recebem suporte por cinco anos.
        
        Ubuntu vem com um conjunto abrangente de software instalado, incluindo LibreOffice, Firefox, Thunderbird e muitos outros aplicativos. Também inclui ferramentas de desenvolvimento e servidores, tornando-o adequado para uso em servidores e desenvolvimento de software.
      `,
      rating: 4.5,
      systemRequirements: {
        processor: '2 GHz dual core processor ou superior',
        memory: '4 GB RAM',
        storage: '25 GB de espaço livre em disco',
        graphics: 'Placa de vídeo compatível com 3D e resolução de 1024x768'
      },
      screenshots: [
        '/src/assets/images/ubuntu-screenshot-1.jpg',
        '/src/assets/images/ubuntu-screenshot-2.jpg',
        '/src/assets/images/ubuntu-screenshot-3.jpg'
      ],
      downloadUrl: 'https://ubuntu.com/download/desktop',
      website: 'https://ubuntu.com/'
    }
  } catch (err) {
    error.value = 'Erro ao carregar os dados da distribuição'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDistribution()
})
</script>

<template>
  <div class="distribution-detail">
    <div v-if="isLoading" class="loading">
      <p>Carregando informações da distribuição...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <BaseButton @click="fetchDistribution">Tentar novamente</BaseButton>
    </div>
    
    <div v-else-if="distribution" class="distribution-content">
      <div class="distribution-header">
        <div class="distribution-logo-container">
          <img 
            :src="distribution.logo" 
            :alt="`${distribution.name} logo`" 
            class="distribution-logo"
            @error="$event.target.src = '/src/assets/images/default-distro.png'"
          />
        </div>
        
        <div class="distribution-title">
          <h1>{{ distribution.name }} <span class="version">{{ distribution.version }}</span></h1>
          <div class="distribution-meta">
            <div class="meta-item">
              <span class="meta-label">Base:</span>
              <span class="meta-value">{{ distribution.basedOn }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Release:</span>
              <span class="meta-value">{{ new Date(distribution.releaseDate).toLocaleDateString() }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Desktop:</span>
              <span class="meta-value">{{ distribution.desktopEnvironment }}</span>
            </div>
          </div>
          
          <div class="distribution-rating">
            <RatingStars :value="distribution.rating" :readonly="true" />
          </div>
        </div>
      </div>
      
      <div class="distribution-actions">
        <BaseButton 
          variant="primary" 
          size="large"
          @click="window.open(distribution.downloadUrl, '_blank')"
        >
          Download
        </BaseButton>
        
        <BaseButton 
          variant="secondary" 
          size="large"
          @click="window.open(distribution.website, '_blank')"
        >
          Visitar Site Oficial
        </BaseButton>
      </div>
      
      <div class="distribution-description">
        <h2>Sobre {{ distribution.name }}</h2>
        <p>{{ distribution.description }}</p>
        <div class="long-description" v-html="distribution.longDescription.replace(/\n/g, '<br>')"></div>
      </div>
      
      <div class="distribution-requirements">
        <h2>Requisitos de Sistema</h2>
        <ul>
          <li><strong>Processador:</strong> {{ distribution.systemRequirements.processor }}</li>
          <li><strong>Memória:</strong> {{ distribution.systemRequirements.memory }}</li>
          <li><strong>Armazenamento:</strong> {{ distribution.systemRequirements.storage }}</li>
          <li><strong>Gráficos:</strong> {{ distribution.systemRequirements.graphics }}</li>
        </ul>
      </div>
      
      <div class="distribution-screenshots">
        <h2>Screenshots</h2>
        <div class="screenshots-grid">
          <div 
            v-for="(screenshot, index) in distribution.screenshots" 
            :key="index"
            class="screenshot-item"
          >
            <img 
              :src="screenshot" 
              :alt="`${distribution.name} screenshot ${index + 1}`" 
              class="screenshot-image"
              @error="$event.target.src = '/src/assets/images/default-screenshot.jpg'"
            />
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="not-found">
      <p>Distribuição não encontrada</p>
      <BaseButton @click="$router.push({ name: 'distributions' })">
        Ver todas as distribuições
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.distribution-detail {
  max-width: 1000px;
  margin: 0 auto;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.error {
  color: #e53935;
}

.distribution-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.distribution-header {
  display: flex;
  padding: 2rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.distribution-logo-container {
  flex-shrink: 0;
  margin-right: 2rem;
}

.distribution-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.distribution-title {
  flex: 1;
}

.distribution-title h1 {
  margin: 0;
  margin-bottom: 1rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.version {
  font-size: 1rem;
  font-weight: normal;
  color: #666;
  margin-left: 0.5rem;
}

.distribution-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.meta-value {
  font-weight: 500;
}

.distribution-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
}

.distribution-description,
.distribution-requirements,
.distribution-screenshots {
  padding: 2rem;
  border-bottom: 1px solid #eee;
}

.distribution-description h2,
.distribution-requirements h2,
.distribution-screenshots h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.distribution-description p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.long-description {
  line-height: 1.6;
  color: #444;
}

.distribution-requirements ul {
  list-style-position: inside;
  line-height: 1.6;
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.screenshot-item {
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.screenshot-image {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .distribution-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .distribution-logo-container {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
  
  .distribution-meta {
    justify-content: center;
  }
  
  .distribution-actions {
    flex-direction: column;
  }
}
</style>
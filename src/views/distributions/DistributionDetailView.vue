<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const distribution = ref(null)
const isLoading = ref(true)
const error = ref('')

const fetchDistribution = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    const id = Number(route.params.id)
    
    // Simulando chamada de API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Dados mockados para demonstração
    const mockDistributions = [
      {
        id: 1,
        name: 'Ubuntu',
        version: '22.04 LTS',
        category: 'desktop',
        logo: '/src/assets/images/ubuntu-logo.png',
        description: 'Uma das distribuições Linux mais populares, conhecida por sua facilidade de uso.',
        rating: 4.5,
        releaseDate: '2022-04-21',
        basedOn: 'Debian',
        website: 'https://ubuntu.com',
        desktopEnvironment: 'GNOME',
        packageManager: 'APT',
        systemRequirements: {
          cpu: '2 GHz dual core processor',
          ram: '4 GB',
          storage: '25 GB'
        },
        features: [
          'Interface amigável para iniciantes',
          'Grande comunidade e suporte',
          'Vasta biblioteca de software',
          'Atualizações LTS com suporte de 5 anos',
          'Integração com serviços de nuvem'
        ],
        screenshots: [
          '/src/assets/images/ubuntu-screenshot-1.jpg',
          '/src/assets/images/ubuntu-screenshot-2.jpg',
          '/src/assets/images/ubuntu-screenshot-3.jpg'
        ]
      },
      {
        id: 2,
        name: 'Debian',
        version: '11 Bullseye',
        category: 'server',
        logo: '/src/assets/images/debian-logo.png',
        description: 'Conhecida por sua estabilidade e segurança, é uma excelente escolha para servidores.',
        rating: 4.7,
        releaseDate: '2021-08-14',
        basedOn: 'Independent',
        website: 'https://debian.org',
        desktopEnvironment: 'GNOME, KDE, Xfce, LXDE, etc.',
        packageManager: 'APT',
        systemRequirements: {
          cpu: '1 GHz processor',
          ram: '512 MB (minimal), 2 GB (recommended)',
          storage: '10 GB (minimal), 20 GB (recommended)'
        },
        features: [
          'Extremamente estável',
          'Foco em software livre',
          'Suporte para múltiplas arquiteturas',
          'Processo de lançamento rigoroso',
          'Base para muitas outras distribuições'
        ],
        screenshots: [
          '/src/assets/images/debian-screenshot-1.jpg',
          '/src/assets/images/debian-screenshot-2.jpg'
        ]
      }
    ]
    
    const foundDistribution = mockDistributions.find(d => d.id === id)
    
    if (foundDistribution) {
      distribution.value = foundDistribution
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
      <p>Carregando distribuição...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchDistribution">Tentar novamente</button>
    </div>
    
    <div v-else-if="distribution" class="distribution-content">
      <div class="distribution-header">
        <div class="back-button" @click="$router.go(-1)">
          ← Voltar
        </div>
        
        <div class="distribution-title">
          <img 
            :src="distribution.logo" 
            :alt="`${distribution.name} logo`" 
            class="distribution-logo"
            @error="$event.target.src = '/src/assets/images/default-distro.png'"
          />
          <div>
            <h1>{{ distribution.name }}</h1>
            <div class="distribution-meta">
              <span class="version">{{ distribution.version }}</span>
              <span class="category">{{ distribution.category }}</span>
              <div class="rating">
                <span class="stars">★★★★★</span>
                <span class="rating-value">{{ distribution.rating }}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="distribution-description">
        <p>{{ distribution.description }}</p>
      </div>
      
      <div class="distribution-details">
        <h2>Detalhes</h2>
        <div class="details-grid">
          <div class="detail-item">
            <div class="detail-label">Data de lançamento</div>
            <div class="detail-value">{{ distribution.releaseDate }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Baseada em</div>
            <div class="detail-value">{{ distribution.basedOn }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Website</div>
            <div class="detail-value">
              <a :href="distribution.website" target="_blank" rel="noopener noreferrer">
                {{ distribution.website }}
              </a>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Ambiente Desktop</div>
            <div class="detail-value">{{ distribution.desktopEnvironment }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Gerenciador de Pacotes</div>
            <div class="detail-value">{{ distribution.packageManager }}</div>
          </div>
        </div>
      </div>
      
      <div class="system-requirements">
        <h2>Requisitos de Sistema</h2>
        <div class="requirements-grid">
          <div class="requirement-item">
            <div class="requirement-label">Processador</div>
            <div class="requirement-value">{{ distribution.systemRequirements.cpu }}</div>
          </div>
          <div class="requirement-item">
            <div class="requirement-label">Memória RAM</div>
            <div class="requirement-value">{{ distribution.systemRequirements.ram }}</div>
          </div>
          <div class="requirement-item">
            <div class="requirement-label">Armazenamento</div>
            <div class="requirement-value">{{ distribution.systemRequirements.storage }}</div>
          </div>
        </div>
      </div>
      
      <div class="distribution-features">
        <h2>Características</h2>
        <ul class="features-list">
          <li v-for="(feature, index) in distribution.features" :key="index">
            {{ feature }}
          </li>
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
      <button @click="$router.push({ name: 'distributions' })">
        Ver todas as distribuições
      </button>
    </div>
  </div>
</template>

<style scoped>
.distribution-detail {
  max-width: 1000px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: 1rem;
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 0;
  color: #2c3e50;
  font-weight: 500;
}

.back-button:hover {
  color: #42b983;
}

.distribution-header {
  margin-bottom: 2rem;
}

.distribution-title {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.distribution-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.distribution-title h1 {
  margin: 0;
  margin-bottom: 0.5rem;
}

.distribution-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.version {
  background-color: #e0e0e0;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.category {
  background-color: #42b983;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  text-transform: capitalize;
}

.rating {
  display: flex;
  align-items: center;
}

.stars {
  color: #FFD700;
  margin-right: 0.5rem;
}

.distribution-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.distribution-details, .system-requirements, .distribution-features, .distribution-screenshots {
  margin-bottom: 2.5rem;
}

h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2c3e50;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.details-grid, .requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.detail-item, .requirement-item {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.detail-label, .requirement-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #666;
}

.detail-value a {
  color: #42b983;
  text-decoration: none;
}

.detail-value a:hover {
  text-decoration: underline;
}

.features-list {
  padding-left: 1.5rem;
  line-height: 1.6;
}

.features-list li {
  margin-bottom: 0.5rem;
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.screenshot-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.screenshot-image {
  width: 100%;
  height: auto;
  display: block;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 3rem 1rem;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #3aa876;
}

@media (max-width: 768px) {
  .distribution-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .details-grid, .requirements-grid, .screenshots-grid {
    grid-template-columns: 1fr;
  }
}
</style>
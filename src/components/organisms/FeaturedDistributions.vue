<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DistributionCard from '../molecules/DistributionCard.vue'

const router = useRouter()

// Dados mockados para demonstração
const featuredDistributions = ref([
  {
    id: 1,
    name: 'Ubuntu',
    version: '22.04 LTS',
    logo: '/src/assets/images/ubuntu-logo.png',
    basedOn: 'Debian',
    releaseDate: '2022-04-21',
    desktopEnvironment: 'GNOME',
    description: 'Ubuntu é uma distribuição Linux baseada no Debian, focada em facilidade de uso e acessibilidade.',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Fedora',
    version: '37',
    logo: '/src/assets/images/fedora-logo.png',
    basedOn: 'Red Hat',
    releaseDate: '2022-11-15',
    desktopEnvironment: 'GNOME',
    description: 'Fedora é uma distribuição Linux patrocinada pela Red Hat, conhecida por adotar tecnologias de ponta.',
    rating: 4.2
  },
  {
    id: 3,
    name: 'Arch Linux',
    version: 'Rolling',
    logo: '/src/assets/images/arch-logo.png',
    basedOn: 'Independente',
    releaseDate: 'Rolling Release',
    desktopEnvironment: 'Vários',
    description: 'Arch Linux é uma distribuição rolling release que segue o princípio KISS (Keep It Simple, Stupid).',
    rating: 4.7
  }
])

const navigateToDistribution = (id: number) => {
  router.push({ name: 'distribution-detail', params: { id } })
}

const handleRate = (data: { distributionId: number, rating: number }) => {
  // Em uma implementação real, aqui enviaríamos a avaliação para o backend
  console.log(`Distribuição ${data.distributionId} avaliada com ${data.rating} estrelas`)

  // Atualiza a avaliação localmente para demonstração
  const distribution = featuredDistributions.value.find(d => d.id === data.distributionId)
  if (distribution) {
    distribution.rating = data.rating
  }
}
</script>

<template>
  <div class="featured-distributions">
    <div class="distributions-grid">
      <DistributionCard 
        v-for="distribution in featuredDistributions" 
        :key="distribution.id"
        :distribution="distribution"
        @view-details="navigateToDistribution"
        @rate="handleRate"
      />
    </div>
  </div>
</template>

<style scoped>
.featured-distributions {
  margin-bottom: 2rem;
}

.distributions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Cyberpunk terminal styling for distribution cards */
:deep(.distribution-card) {
  background-color: rgba(0, 20, 0, 0.7) !important;
  border: 1px solid #0f0 !important;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2) !important;
  color: #0f0 !important;
}

:deep(.card-title) {
  color: #0f0 !important;
  text-shadow: 0 0 5px #0f0 !important;
}

:deep(.card-content) {
  color: #0f0 !important;
}

:deep(.card-footer) {
  border-top: 1px solid rgba(0, 255, 0, 0.3) !important;
}

:deep(.btn) {
  background-color: rgba(0, 50, 0, 0.7) !important;
  border: 1px solid #0f0 !important;
  color: #0f0 !important;
  text-shadow: 0 0 2px #0f0 !important;
  transition: all 0.3s ease !important;
}

:deep(.btn:hover) {
  background-color: rgba(0, 100, 0, 0.7) !important;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5) !important;
}

:deep(.rating-star) {
  color: #0f0 !important;
  text-shadow: 0 0 5px #0f0 !important;
}

@media (max-width: 768px) {
  .distributions-grid {
    grid-template-columns: 1fr;
  }
}
</style>

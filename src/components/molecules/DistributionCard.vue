<script setup lang="ts">
import { ref, computed } from 'vue'
import RatingStars from '../atoms/RatingStars.vue'
import BaseButton from '../atoms/BaseButton.vue'

const props = defineProps({
  distribution: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-details', 'rate'])

const showDescription = ref(false)

const toggleDescription = () => {
  showDescription.value = !showDescription.value
}

const formattedReleaseDate = computed(() => {
  if (!props.distribution.releaseDate) return 'N/A'
  if (props.distribution.releaseDate === 'Rolling Release') return 'Rolling Release'
  return new Date(props.distribution.releaseDate).toLocaleDateString()
})

const handleViewDetails = () => {
  emit('view-details', props.distribution.id)
}

const handleRate = (rating: number) => {
  emit('rate', { distributionId: props.distribution.id, rating })
}
</script>

<template>
  <div class="distribution-card">
    <div class="distribution-header">
      <img 
        :src="distribution.logo" 
        :alt="`${distribution.name} logo`" 
        class="distribution-logo"
        @error="$event.target.src = '/src/assets/images/default-distro.png'"
      />
      <div class="distribution-title">
        <h3 class="distribution-name">{{ distribution.name }}</h3>
        <span class="distribution-version">{{ distribution.version }}</span>
      </div>
    </div>
    
    <div class="distribution-meta">
      <div class="meta-item">
        <span class="meta-label">Base:</span>
        <span class="meta-value">{{ distribution.basedOn }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Release:</span>
        <span class="meta-value">{{ formattedReleaseDate }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Desktop:</span>
        <span class="meta-value">{{ distribution.desktopEnvironment }}</span>
      </div>
    </div>
    
    <div v-if="showDescription" class="distribution-description">
      <p>{{ distribution.description }}</p>
    </div>
    
    <div class="distribution-footer">
      <RatingStars 
        :value="distribution.rating" 
        :readonly="false"
        @update="handleRate" 
      />
      
      <div class="actions">
        <BaseButton 
          variant="text" 
          @click="toggleDescription"
        >
          {{ showDescription ? 'Ocultar Detalhes' : 'Mostrar Detalhes' }}
        </BaseButton>
        
        <BaseButton 
          variant="primary" 
          @click="handleViewDetails"
        >
          Ver Distribuição
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.distribution-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.distribution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.distribution-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.distribution-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-right: 1rem;
}

.distribution-title {
  flex: 1;
}

.distribution-name {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}

.distribution-version {
  font-size: 0.875rem;
  color: #666;
}

.distribution-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
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
  font-size: 0.875rem;
}

.distribution-description {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #333;
}

.distribution-footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

@media (max-width: 400px) {
  .distribution-meta {
    grid-template-columns: 1fr 1fr;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>
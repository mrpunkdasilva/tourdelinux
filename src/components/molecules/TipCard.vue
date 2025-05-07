<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  tip: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() => {
  if (!props.tip.date) return ''
  return new Date(props.tip.date).toLocaleDateString()
})
</script>

<template>
  <div class="tip-card">
    <div class="tip-category">{{ tip.category }}</div>
    <h3 class="tip-title">{{ tip.title }}</h3>
    <p class="tip-excerpt">{{ tip.excerpt }}</p>
    
    <div class="tip-meta">
      <div class="tip-author">
        <span>Por {{ tip.author }}</span>
      </div>
      <div class="tip-info">
        <span class="tip-date">{{ formattedDate }}</span>
        <span class="tip-read-time">{{ tip.readTime }} min de leitura</span>
      </div>
    </div>
    
    <div class="tip-tags">
      <span v-for="(tag, index) in tip.tags" :key="index" class="tip-tag">
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.tip-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tip-category {
  display: inline-block;
  background-color: #42b883;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.tip-title {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  line-height: 1.4;
}

.tip-excerpt {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #666;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.tip-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
}

.tip-author {
  font-weight: 600;
  color: #333;
}

.tip-info {
  display: flex;
  justify-content: space-between;
  color: #666;
}

.tip-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tip-tag {
  font-size: 0.75rem;
  color: #42b883;
  background-color: rgba(66, 184, 131, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .tip-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .tip-info {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
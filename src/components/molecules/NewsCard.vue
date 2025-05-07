<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() => {
  if (!props.news.date) return ''
  return new Date(props.news.date).toLocaleDateString()
})
</script>

<template>
  <div class="news-card">
    <div class="news-image-container">
      <img 
        :src="news.imageUrl" 
        :alt="news.title" 
        class="news-image"
        @error="$event.target.src = '/src/assets/images/default-news.jpg'"
      />
      <div class="news-category">{{ news.category }}</div>
    </div>
    
    <div class="news-content">
      <h3 class="news-title">{{ news.title }}</h3>
      <p class="news-excerpt">{{ news.excerpt }}</p>
      
      <div class="news-meta">
        <span class="news-source">{{ news.source }}</span>
        <span class="news-date">{{ formattedDate }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.news-image-container {
  position: relative;
  height: 180px;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-category {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #42b883;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-top-left-radius: 4px;
}

.news-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.news-title {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  line-height: 1.4;
}

.news-excerpt {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #666;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #666;
}

.news-source {
  font-weight: 600;
}

@media (max-width: 768px) {
  .news-image-container {
    height: 160px;
  }
}
</style>
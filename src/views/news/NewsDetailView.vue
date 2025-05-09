<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NewsFactory } from '@/factories/NewsFactory'
import { NewsItem } from '@/types/News'

const route = useRoute()
const router = useRouter()
const newsId = Number(route.params.id)

const newsItem = ref<NewsItem | null>(null)
const relatedNews = ref<NewsItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Simulação de busca de dados
const fetchNewsDetail = async () => {
  isLoading.value = true
  error.value = null

  try {
    // Em uma aplicação real, aqui faríamos uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))

    // Obter notícia pelo ID usando o factory
    const foundNews = NewsFactory.getNewsById(newsId)

    if (foundNews) {
      newsItem.value = foundNews

      // Obter notícias relacionadas usando o factory
      relatedNews.value = NewsFactory.getRelatedNews(newsId, 3)
    } else {
      error.value = 'Notícia não encontrada'
      router.push({ name: 'news' })
    }
  } catch (err) {
    error.value = 'Erro ao carregar a notícia'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const navigateToRelated = (id: number) => {
  router.push({ name: 'news-detail', params: { id } })
  window.scrollTo(0, 0)
}

const goBack = () => {
  router.push({ name: 'news' })
}

onMounted(() => {
  fetchNewsDetail()
})
</script>

<template>
  <div class="terminal-window">
    <div class="terminal-title-bar">
      <div class="terminal-title">news_reader.sh - Tour de Linux Terminal</div>
      <div class="terminal-controls">
        <div class="terminal-control terminal-control-minimize"></div>
        <div class="terminal-control terminal-control-maximize"></div>
        <div class="terminal-control terminal-control-close"></div>
      </div>
    </div>

    <div class="terminal-content">
      <div class="news-detail">
        <div class="terminal-command-line mb-4">
          <span class="terminal-prompt" @click="goBack">$ cd /news</span>
        </div>

        <div v-if="isLoading" class="loading">
          <p class="terminal-output animate-blink">Carregando dados... <span class="animate-blink">_</span></p>
        </div>

        <div v-else-if="error" class="error">
          <p class="terminal-error">ERROR: {{ error }}</p>
          <div class="terminal-command-line mt-3">
            <span class="terminal-prompt" @click="fetchNewsDetail">$ retry --force</span>
          </div>
        </div>

        <div v-else-if="newsItem" class="news-content">
          <div class="news-header mb-4">
            <div class="news-meta mb-2">
              <span class="news-category text-accent">{{ newsItem.category }}</span>
              <span class="news-date text-muted">{{ formatDate(newsItem.date) }}</span>
            </div>

            <h1 class="news-title glow-primary mb-3">{{ newsItem.title }}</h1>

            <div class="news-author mb-2">
              <span class="terminal-prompt">$ author --info</span>
              <span class="author-name text-secondary">{{ newsItem.author }}</span> | 
              <span class="news-source">{{ newsItem.source }}</span>
            </div>

            <div class="news-tags mb-3">
              <span 
                v-for="(tag, index) in newsItem.tags" 
                :key="index"
                class="news-tag"
              >
                <span class="text-secondary">#</span>{{ tag }}
              </span>
            </div>
          </div>

          <div class="news-body">
            <div class="terminal-command-line mb-2">
              <span class="terminal-prompt">$ cat news_content.md</span>
            </div>

            <div class="terminal-output">
              <p class="news-excerpt mb-4">{{ newsItem.excerpt }}</p>

              <div class="news-full-content" v-html="newsItem.content"></div>
            </div>
          </div>

          <div v-if="relatedNews.length > 0" class="related-news mt-5">
            <div class="terminal-command-line mb-3">
              <span class="terminal-prompt">$ find /news --related --limit 3</span>
            </div>

            <h3 class="text-secondary glow-secondary mb-3">Notícias relacionadas</h3>

            <div class="related-news-list">
              <div 
                v-for="item in relatedNews" 
                :key="item.id"
                class="related-news-item"
                @click="navigateToRelated(item.id)"
              >
                <div class="related-news-content">
                  <div class="related-news-category text-accent mb-1">{{ item.category }}</div>
                  <h4 class="related-news-title text-secondary mb-2">{{ item.title }}</h4>
                  <p class="related-news-excerpt text-muted">{{ item.excerpt }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="terminal-command-line mt-5">
            <span class="terminal-prompt">$ _</span>
            <span class="cursor-blink"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-detail {
  width: 100%;
}

.terminal-command-line {
  display: flex;
  align-items: center;
  font-family: var(--font-family-mono);
  cursor: pointer;
}

.terminal-command-line:hover .terminal-prompt {
  color: var(--color-text-primary);
  text-shadow: var(--glow-primary);
}

.loading, .error {
  padding: var(--spacing-lg);
  border-left: 2px solid var(--color-border-terminal);
  margin-left: var(--spacing-md);
}

.error .terminal-error {
  color: var(--color-text-error);
}

.news-header {
  border-bottom: 1px solid var(--color-border-terminal);
  padding-bottom: var(--spacing-md);
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-category {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.news-date {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
}

.news-title {
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-tight);
  font-family: var(--font-family-mono);
}

.news-author {
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.author-name {
  font-weight: 600;
}

.news-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.news-tag {
  font-size: var(--font-size-sm);
  margin-right: var(--spacing-sm);
  font-family: var(--font-family-mono);
}

.news-body {
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
}

.terminal-output {
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-left: 2px solid var(--color-border-terminal);
  margin-left: var(--spacing-md);
  position: relative;
  font-family: var(--font-family-mono);
}

.terminal-output::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 0;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid var(--color-border-terminal);
}

.news-excerpt {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  border-bottom: 1px dashed var(--color-border-terminal);
  padding-bottom: var(--spacing-md);
}

.news-full-content {
  color: var(--color-text-primary);
}

.news-full-content p {
  margin-bottom: var(--spacing-md);
}

.related-news {
  border-top: 1px solid var(--color-border-terminal);
  padding-top: var(--spacing-lg);
}

.related-news-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.related-news-item {
  border-left: 2px solid var(--color-border-terminal);
  padding-left: var(--spacing-md);
  transition: all var(--transition-normal);
  position: relative;
  cursor: pointer;
}

.related-news-item::before {
  content: '>';
  position: absolute;
  left: -15px;
  color: var(--color-text-secondary);
}

.related-news-item:hover {
  border-left-color: var(--color-text-accent);
  transform: translateX(5px);
}

.related-news-item:hover::before {
  color: var(--color-text-accent);
}

.related-news-content {
  padding: var(--spacing-sm);
}

.related-news-title {
  font-size: var(--font-size-md);
  font-family: var(--font-family-mono);
}

.related-news-excerpt {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

/* Responsive styles */
@media (max-width: 768px) {
  .news-title {
    font-size: var(--font-size-2xl);
  }

  .terminal-window {
    margin-left: -1rem;
    margin-right: -1rem;
    border-radius: 0;
  }
}

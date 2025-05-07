<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NewsCard from '../molecules/NewsCard.vue'

const router = useRouter()

// Dados mockados para demonstração
const newsHighlights = ref([
  {
    id: 1,
    title: 'Linux 6.0 lançado com melhorias significativas de desempenho',
    excerpt: 'A nova versão do kernel Linux traz melhorias importantes para processadores modernos e suporte a novos hardwares.',
    source: 'Linux Journal',
    date: '2023-05-20',
    imageUrl: '/src/assets/images/linux-kernel.jpg',
    category: 'Kernel'
  },
  {
    id: 2,
    title: 'Ubuntu 23.04 "Lunar Lobster" disponível para download',
    excerpt: 'A Canonical lançou a mais recente versão do Ubuntu com GNOME 44 e kernel Linux 6.2.',
    source: 'OMG Ubuntu',
    date: '2023-04-20',
    imageUrl: '/src/assets/images/ubuntu-lunar.jpg',
    category: 'Distribuições'
  },
  {
    id: 3,
    title: 'Red Hat Enterprise Linux 9.2 traz melhorias em segurança e automação',
    excerpt: 'A nova versão do RHEL inclui recursos avançados de segurança e ferramentas de automação aprimoradas.',
    source: 'Red Hat Blog',
    date: '2023-05-10',
    imageUrl: '/src/assets/images/rhel.jpg',
    category: 'Empresarial'
  }
])

const navigateToNews = (id: number) => {
  router.push({ name: 'news-detail', params: { id } })
}
</script>

<template>
  <div class="news-highlights">
    <div class="news-grid">
      <NewsCard 
        v-for="news in newsHighlights" 
        :key="news.id"
        :news="news"
        @click="navigateToNews(news.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.news-highlights {
  margin-bottom: 2rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
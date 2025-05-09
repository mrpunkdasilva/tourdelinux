<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NewsFactory } from '@/factories/NewsFactory'

const router = useRouter()
const news = ref([])
const isLoading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: 'Todas' },
  { id: 'releases', name: 'Lançamentos' },
  { id: 'security', name: 'Segurança' },
  { id: 'community', name: 'Comunidade' },
  { id: 'enterprise', name: 'Empresarial' }
]

const fetchNews = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    // Simulando chamada de API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Obter notícias do factory
    news.value = NewsFactory.getMockNews()
  } catch (err) {
    error.value = 'Erro ao carregar as notícias'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const filteredNews = computed(() => {
  let result = [...news.value]
  
  // Filtrar por categoria
  if (selectedCategory.value !== 'all') {
    result = result.filter(item => 
      item.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }
  
  // Filtrar por termo de busca
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.excerpt.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return result
})

const navigateToNewsDetail = (id: number) => {
  router.push({ name: 'news-detail', params: { id } })
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

onMounted(() => {
  fetchNews()
})
</script>
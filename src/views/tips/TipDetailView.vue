<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '../../components/atoms/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const tipId = Number(route.params.id)

const tip = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Simulação de busca de dados
const fetchTip = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Em uma aplicação real, aqui faríamos uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Dados mockados para demonstração
    tip.value = {
      id: tipId,
      title: 'Como configurar um servidor SSH seguro',
      content: `
        <h2>Introdução</h2>
        <p>SSH (Secure Shell) é um protocolo de rede criptográfico para operação de serviços de rede de forma segura sobre uma rede não segura. É amplamente utilizado para acesso remoto a servidores Linux.</p>
        
        <h2>Passo 1: Instale o servidor SSH</h2>
        <p>Na maioria das distribuições Linux, você pode instalar o servidor SSH com o seguinte comando:</p>
        <pre><code>sudo apt install openssh-server</code></pre>
        
        <h2>Passo 2: Configure o arquivo sshd_config</h2>
        <p>Edite o arquivo de configuração principal do SSH:</p>
        <pre><code>sudo nano /etc/ssh/sshd_config</code></pre>
        
        <p>Faça as seguintes alterações para aumentar a segurança:</p>
        <ul>
          <li>Desabilite o login de root: <code>PermitRootLogin no</code></li>
          <li>Use apenas a versão 2 do protocolo: <code>Protocol 2</code></li>
          <li>Limite o número de tentativas de autenticação: <code>MaxAuthTries 3</code></li>
          <li>Defina um tempo limite de inatividade: <code>ClientAliveInterval 300</code></li>
        </ul>
        
        <h2>Passo 3: Configure a autenticação por chave</h2>
        <p>A autenticação por chave é mais segura que senhas. No seu computador local, gere um par de chaves:</p>
        <pre><code>ssh-keygen -t ed25519 -C "seu_email@exemplo.com"</code></pre>
        
        <p>Copie a chave pública para o servidor:</p>
        <pre><code>ssh-copy-id usuario@seu_servidor</code></pre>
        
        <p>Depois de confirmar que a autenticação por chave funciona, você pode desabilitar a autenticação por senha:</p>
        <pre><code>PasswordAuthentication no</code></pre>
        
        <h2>Passo 4: Configure o Firewall</h2>
        <p>Limite o acesso SSH apenas aos IPs necessários usando o firewall:</p>
        <pre><code>sudo ufw allow from 192.168.1.0/24 to any port 22</code></pre>
        
        <h2>Passo 5: Use Fail2Ban para proteção adicional</h2>
        <p>Fail2Ban é uma ferramenta que monitora logs e bane IPs que mostram comportamento malicioso:</p>
        <pre><code>sudo apt install fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local</code></pre>
        
        <p>Configure a seção [sshd] para proteger seu servidor SSH.</p>
        
        <h2>Conclusão</h2>
        <p>Seguindo estes passos, você terá um servidor SSH significativamente mais seguro. Lembre-se de reiniciar o serviço SSH após fazer alterações na configuração:</p>
        <pre><code>sudo systemctl restart sshd</code></pre>
      `,
      author: 'João Silva',
      authorAvatar: '/src/assets/images/author-avatar.jpg',
      date: '2023-05-15',
      readTime: 8,
      category: 'Segurança',
      tags: ['ssh', 'segurança', 'servidor', 'linux', 'configuração'],
      relatedTips: [
        {
          id: 2,
          title: 'Comandos essenciais do terminal Linux',
          excerpt: 'Uma lista dos comandos mais úteis que todo usuário Linux deveria conhecer para aumentar sua produtividade.'
        },
        {
          id: 3,
          title: 'Otimizando o consumo de memória no Linux',
          excerpt: 'Dicas práticas para reduzir o consumo de memória RAM e melhorar o desempenho do seu sistema Linux.'
        }
      ]
    }
  } catch (err) {
    error.value = 'Erro ao carregar os dados da dica'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const navigateToRelatedTip = (id: number) => {
  router.push({ name: 'tip-detail', params: { id } })
}

onMounted(() => {
  fetchTip()
})
</script>

<template>
  <div class="tip-detail">
    <div v-if="isLoading" class="loading">
      <p>Carregando dica...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <BaseButton @click="fetchTip">Tentar novamente</BaseButton>
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
              @error="$event.target.src = '/src/assets/images/default-avatar.jpg'"
            />
            <span class="author-name">Por {{ tip.author }}</span>
          </div>
          
          <div class="tip-details">
            <span class="tip-date">{{ new Date(tip.date).toLocaleDateString() }}</span>
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
            v-for="relatedTip in tip.relatedTips" 
            :key="relatedTip.id"
            class="related-tip"
            @click="navigateToRelatedTip(relatedTip.id)"
          >
            <h4>{{ relatedTip.title }}</h4>
            <p
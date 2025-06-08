<template>
  <div class="terminal-box box-glow-primary">
    <div class="terminal-header">
      <span class="terminal-command">tourdelinux@terminal</span>
      <span class="ml-2 text-muted">— Terminal Mode</span>
    </div>
    <div class="terminal-body">
      <div v-if="section === ''">
        <div class="terminal-output mb-3">
          Bem-vindo ao <span class="terminal-command">Tour de Linux Terminal</span>!
          <br><br>
          Comandos disponíveis:
          <br>
          <span class="terminal-command">tips</span> - Exibe dicas sobre Linux
          <br>
          <span class="terminal-command">news</span> - Mostra notícias sobre Linux
          <br>
          <span class="terminal-command">distros</span> - Lista distribuições Linux disponíveis
          <br>
          <span class="terminal-command">clear</span> ou <span class="terminal-command">home</span> - Limpa o terminal
          <br><br>
          Para ver detalhes, use o comando seguido do ID. Exemplo: <span class="terminal-command">distro 1</span>
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
          
        </div>
      </div>
      <div v-else-if="section === 'tips'">
        <div class="terminal-output">
          <div class="terminal-header-text">===== DICAS LINUX =====</div>
          <br>
          <div v-for="tip in tips" :key="tip.id">
            <span class="terminal-command">[{{ tip.id }}]</span> {{ tip.title }}
            <br>
            <span class="text-muted">{{ tip.excerpt }}</span>
            <br>
          </div>
          <br>
          <div class="terminal-divider">---------------------------------</div>
          <br>
          <div class="terminal-help-text">
            Para ver detalhes de uma dica, digite: <span class="terminal-command">tip [ID]</span>
            <br>
            Exemplo: <span class="terminal-command">tip 1</span>
          </div>
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
        </div>
      </div>
      <div v-else-if="section === 'news'">
        <div class="terminal-output">
          <div class="terminal-header-text">===== NOTÍCIAS LINUX =====</div>
          <br>
          <div v-for="news in newsList" :key="news.id">
            <span class="terminal-command">[{{ news.id }}]</span> {{ news.title }}
            <br>
            <span class="text-muted">{{ news.excerpt }}</span>
            <br>
          </div>
          <br>
          <div class="terminal-divider">---------------------------------</div>
          <br>
          <div class="terminal-help-text">
            Para ver detalhes de uma notícia, digite: <span class="terminal-command">news [ID]</span>
            <br>
            Exemplo: <span class="terminal-command">news 1</span>
          </div>
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
        </div>
      </div>
      <div v-else-if="section.startsWith('tips/')">
        <div class="terminal-output">
          <div v-if="tipDetail">
            <div class="terminal-header-text">===== DICA #{{ tipDetail.id }} =====</div>
            <br>
            <div>Título: {{ tipDetail.title }}</div>
            <br>
            <div>Conteúdo:</div>
            <div v-html="tipDetail.content" class="mt-2"></div>
            <br>
            <div class="terminal-divider">---------------------------------</div>
            <br>
            <div class="terminal-help-text">
              Digite <span class="terminal-command">tips</span> para voltar à lista de dicas
            </div>
          </div>
          <div v-else class="terminal-error">Dica não encontrada.</div>
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
        </div>
      </div>
      <div v-else-if="section.startsWith('news/')">
        <div class="terminal-output">
          <div v-if="newsDetail">
            <div class="terminal-header-text">===== NOTÍCIA #{{ newsDetail.id }} =====</div>
            <br>
            <div>Título: {{ newsDetail.title }}</div>
            <br>
            <div>Conteúdo:</div>
            <div v-html="newsDetail.content" class="mt-2"></div>
            <br>
            <div class="terminal-divider">---------------------------------</div>
            <br>
            <div class="terminal-help-text">
              Digite <span class="terminal-command">news</span> para voltar à lista de notícias
            </div>
          </div>
          <div v-else class="terminal-error">Notícia não encontrada.</div>
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
        </div>
      </div>
      <div v-else-if="section === 'distros'">
        <div class="terminal-output">
          <div class="terminal-header-text">===== DISTRIBUIÇÕES LINUX =====</div>
          <br>
          <div v-for="distro in distributions" :key="distro.id">
            <span class="terminal-command">[{{ distro.id }}]</span> <span class="distro-name">{{ distro.name }}</span> ({{ distro.version }}) - {{ distro.category }}
            <br>
          </div>
          <br>
          <div class="terminal-divider">---------------------------------</div>
          <br>
          <div class="terminal-help-text">
            Para ver detalhes de uma distribuição, digite: <span class="terminal-command">distro [ID]</span>
            <br>
            Exemplo: <span class="terminal-command">distro 1</span>
          </div>
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
        </div>
      </div>
      <div v-else-if="section.startsWith('distros/')">
        <div class="terminal-output">
          <div v-if="distributionDetail">
            <div class="terminal-header-text">===== {{ distributionDetail.name.toUpperCase() }} =====</div>
            <br>
            <div>ID: {{ distributionDetail.id }}</div>
            <div>Nome: {{ distributionDetail.name }}</div>
            <div>Versão: {{ distributionDetail.version }}</div>
            <div>Categoria: {{ distributionDetail.category }}</div>
            <div>Avaliação: {{ distributionDetail.rating }}/5</div>
            <br>
            <div>Descrição:</div>
            <div>{{ distributionDetail.description }}</div>
            <br>
            <div class="terminal-divider">---------------------------------</div>
            <br>
            <div class="terminal-help-text">
              Digite <span class="terminal-command">distros</span> para voltar à lista de distribuições
            </div>
          </div>
          <div v-else class="terminal-error">Distribuição não encontrada.</div>
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
        </div>
      </div>
      <div v-else>
        <div class="terminal-error">
          Comando desconhecido: "{{ route.params.cmd }}"
          <br><br>
          Comandos disponíveis:
          <br>
          <span class="terminal-command">tips</span> - Exibe dicas sobre Linux
          <br>
          <span class="terminal-command">news</span> - Mostra notícias sobre Linux
          <br>
          <span class="terminal-command">distros</span> - Lista distribuições Linux disponíveis
          <br>
          <span class="terminal-command">clear</span> ou <span class="terminal-command">home</span> - Limpa o terminal
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TipFactory } from '@/factories/TipFactory';
import { NewsFactory } from '@/factories/NewsFactory';
import { DistributionFactory } from '@/factories/DistributionFactory';

const route = useRoute();
const router = useRouter();

const command = ref('');
const section = computed(() => {
  if (route.name === 'terminal') return '';
  if (route.name === 'terminal-tips') return 'tips';
  if (route.name === 'terminal-news') return 'news';
  if (route.name === 'terminal-distros') return 'distros';
  if (route.name === 'terminal-tip-detail') return `tips/${route.params.id}`;
  if (route.name === 'terminal-news-detail') return `news/${route.params.id}`;
  if (route.name === 'terminal-distro-detail') return `distros/${route.params.id}`;
  return '';
});

const tips = TipFactory.getMockTips();
const newsList = NewsFactory.getMockNews();
const distributions = DistributionFactory.getMockDistributions();

const tipDetail = computed(() => {
  if (section.value.startsWith('tips/')) {
    const id = Number(section.value.split('/')[1]);
    return TipFactory.getTipById ? TipFactory.getTipById(id) : tips.find(t => t.id === id);
  }
  return null;
});

const newsDetail = computed(() => {
  if (section.value.startsWith('news/')) {
    const id = Number(section.value.split('/')[1]);
    return NewsFactory.getNewsById(id);
  }
  return null;
});

const distributionDetail = computed(() => {
  if (section.value.startsWith('distros/')) {
    const id = Number(section.value.split('/')[1]);
    return DistributionFactory.getDistributionById(id);
  }
  return null;
});

function runCommand(cmdParam?: string) {
  const cmd = cmdParam || command.value.trim().toLowerCase();
  if (cmd === 'tips') {
    router.push({ name: 'terminal-tips' });
  } else if (cmd === 'news') {
    router.push({ name: 'terminal-news' });
  } else if (cmd === 'distros') {
    router.push({ name: 'terminal-distros' });
  } else if (cmd.startsWith('tip ')) {
    const id = cmd.split(' ')[1];
    router.push({ name: 'terminal-tip-detail', params: { id } });
  } else if (cmd.startsWith('news ')) {
    const id = cmd.split(' ')[1];
    router.push({ name: 'terminal-news-detail', params: { id } });
  } else if (cmd.startsWith('distro ')) {
    const id = cmd.split(' ')[1];
    router.push({ name: 'terminal-distro-detail', params: { id } });
  } else if (cmd === 'home' || cmd === 'clear') {
    router.push({ name: 'terminal' });
  } else {
    // comando desconhecido
    router.push({ name: 'terminal-unknown', params: { cmd } });
  }
  command.value = '';
}

watch(route, () => {
  command.value = '';
});
</script>

<style scoped>
.terminal-box {
  max-width: 700px;
  margin: 40px auto;
}
.terminal-header {
  user-select: none;
}
.terminal-body {
  min-height: 300px;
}
input.bg-terminal {
  color: var(--color-text-primary);
  font-family: var(--font-family-mono);
  font-size: 1em;
}

.terminal-header-text {
  color: var(--color-text-primary);
  font-weight: bold;
  font-family: var(--font-family-mono);
}

.terminal-divider {
  color: #555;
}

.terminal-help-text {
  color: #888;
  font-style: italic;
}

.distro-name {
  font-weight: bold;
  color: #4CAF50;
}

.terminal-error {
  color: #ff5555;
  margin-bottom: 1rem;
}
</style>

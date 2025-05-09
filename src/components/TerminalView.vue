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
          <br>
          Digite <span class="terminal-command">tips</span> para ver dicas ou <span class="terminal-command">news</span> para notícias.
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
          
        </div>
      </div>
      <div v-else-if="section === 'tips'">
        <div class="terminal-output">
          <div v-for="tip in tips" :key="tip.id">
            <span class="terminal-command">[Tip #{{ tip.id }}]</span> {{ tip.title }}
            <br>
            <span class="text-muted">{{ tip.excerpt }}</span>
            <br>
            <router-link :to="`/terminal/tips/${tip.id}`" class="text-accent">Ver detalhes</router-link>
            <br><br>
          </div>
        </div>
        <div class="terminal-prompt">
          <span>&gt; </span>
          <input v-model="command" @keyup.enter="runCommand" class="bg-terminal text-primary" style="border:none;outline:none;width:60%;background:transparent;" autofocus />
          
        </div>
      </div>
      <div v-else-if="section === 'news'">
        <div class="terminal-output">
          <div v-for="news in newsList" :key="news.id">
            <span class="terminal-command">[News #{{ news.id }}]</span> {{ news.title }}
            <br>
            <span class="text-muted">{{ news.excerpt }}</span>
            <br>
            <router-link :to="`/terminal/news/${news.id}`" class="text-accent">Ver detalhes</router-link>
            <br><br>
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
            <span class="terminal-command">[Tip #{{ tipDetail.id }}]</span> {{ tipDetail.title }}
            <div v-html="tipDetail.content" class="mt-2"></div>
            <br>
            <router-link to="/terminal/tips" class="text-accent">Voltar para dicas</router-link>
          </div>
          <div v-else class="terminal-error">Tip não encontrada.</div>
        </div>
      </div>
      <div v-else-if="section.startsWith('news/')">
        <div class="terminal-output">
          <div v-if="newsDetail">
            <span class="terminal-command">[News #{{ newsDetail.id }}]</span> {{ newsDetail.title }}
            <div v-html="newsDetail.content" class="mt-2"></div>
            <br>
            <router-link to="/terminal/news" class="text-accent">Voltar para notícias</router-link>
          </div>
          <div v-else class="terminal-error">Notícia não encontrada.</div>
        </div>
      </div>
      <div v-else>
        <div class="terminal-error">Comando ou seção desconhecida.</div>
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

const route = useRoute();
const router = useRouter();

const command = ref('');
const section = computed(() => {
  if (route.name === 'terminal') return '';
  if (route.name === 'terminal-tips') return 'tips';
  if (route.name === 'terminal-news') return 'news';
  if (route.name === 'terminal-tip-detail') return `tips/${route.params.id}`;
  if (route.name === 'terminal-news-detail') return `news/${route.params.id}`;
  return '';
});

const tips = TipFactory.getMockTips();
const newsList = NewsFactory.getMockNews();

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

function runCommand() {
  const cmd = command.value.trim().toLowerCase();
  if (cmd === 'tips') {
    router.push({ name: 'terminal-tips' });
  } else if (cmd === 'news') {
    router.push({ name: 'terminal-news' });
  } else if (cmd.startsWith('tip ')) {
    const id = cmd.split(' ')[1];
    router.push({ name: 'terminal-tip-detail', params: { id } });
  } else if (cmd.startsWith('news ')) {
    const id = cmd.split(' ')[1];
    router.push({ name: 'terminal-news-detail', params: { id } });
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
</style>

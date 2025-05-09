<script setup lang="ts">
import { ref } from 'vue'

const teamMembers = ref([
  {
    name: 'Ana Silva',
    role: 'Fundadora & Editora-chefe',
    bio: 'Entusiasta de Linux há mais de 15 anos, Ana tem experiência com diversas distribuições e é contribuidora ativa em projetos open source.',
    avatar: '/src/assets/images/team/ana.jpg'
  },
  {
    name: 'Carlos Mendes',
    role: 'Desenvolvedor & Escritor Técnico',
    bio: 'Especialista em segurança e infraestrutura Linux, Carlos trabalha com administração de sistemas e escreve sobre tópicos avançados.',
    avatar: '/src/assets/images/team/carlos.jpg'
  },
  {
    name: 'Pedro Costa',
    role: 'Especialista em Distribuições',
    bio: 'Pedro testa e avalia distribuições Linux, focando em usabilidade e recursos para diferentes perfis de usuários.',
    avatar: '/src/assets/images/team/pedro.jpg'
  }
])
</script>

<template>
  <div class="terminal-window">
    <div class="terminal-title-bar">
      <div class="terminal-title">about.sh - Tour de Linux Terminal</div>
      <div class="terminal-controls">
        <div class="terminal-control terminal-control-minimize"></div>
        <div class="terminal-control terminal-control-maximize"></div>
        <div class="terminal-control terminal-control-close"></div>
      </div>
    </div>

    <div class="terminal-content">
      <div class="about">
        <section class="about-header mb-5">
          <h1 class="typing mb-2">Sobre o Tour de Linux</h1>
          <p class="terminal-prompt about-subtitle">
            Guiando você pelo mundo das distribuições Linux desde 2023
          </p>
        </section>

        <section class="about-mission mb-5">
          <h2 class="mb-3">$ cat mission.txt</h2>
          <div class="terminal-output">
            <p class="mb-3">
              O Tour de Linux nasceu da paixão por software livre e da crença de que o Linux é para todos. 
              Nossa missão é desmistificar o mundo Linux, tornando-o acessível para iniciantes enquanto 
              oferecemos conteúdo relevante para usuários experientes.
            </p>
            <p>
              Acreditamos que a diversidade de distribuições Linux é uma força, não uma fraqueza. 
              Cada distribuição tem seu propósito e público-alvo, e estamos aqui para ajudar você 
              a encontrar a que melhor atende às suas necessidades.
            </p>
          </div>
        </section>

        <section class="team-section mb-5">
          <h2 class="mb-3">$ ls -la /team</h2>
          <div class="terminal-output">
            <div class="team-grid">
              <div v-for="member in teamMembers" :key="member.name" class="team-member mb-4">
                <div class="member-info">
                  <h3 class="member-name text-secondary glow-secondary">{{ member.name }} <span class="text-primary">({{ member.role }})</span></h3>
                  <p class="member-bio">{{ member.bio }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="contact-section">
          <h2 class="mb-3">$ contact --help</h2>
          <div class="terminal-output mb-4">
            <p>
              Tem sugestões, dúvidas ou quer contribuir com o Tour de Linux? 
              Estamos sempre abertos a novas ideias e colaborações.
            </p>
          </div>

          <div class="contact-methods">
            <div class="contact-method mb-3">
              <h3 class="text-accent">$ mail</h3>
              <p class="terminal-command">contato@tourdelinux.com.br</p>
            </div>
            <div class="contact-method mb-3">
              <h3 class="text-accent">$ social</h3>
              <p class="terminal-command">@tourdelinux em todas as plataformas</p>
            </div>
            <div class="contact-method">
              <h3 class="text-accent">$ git clone</h3>
              <p class="terminal-command">github.com/tourdelinux</p>
            </div>
          </div>

          <div class="cursor-blink mt-4">_</div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  width: 100%;
}

.about-header {
  text-align: left;
  border-bottom: 1px solid var(--color-border-terminal);
  padding-bottom: var(--spacing-md);
}

.about-subtitle {
  font-size: var(--font-size-md);
  opacity: 0.8;
}

h2 {
  font-family: var(--font-family-mono);
  color: var(--color-text-secondary);
  text-shadow: var(--glow-secondary);
  display: block;
  position: relative;
}

.terminal-output {
  padding: var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-left: 2px solid var(--color-border-terminal);
  margin-left: var(--spacing-md);
  position: relative;
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

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.team-member {
  border-left: 2px solid var(--color-border-terminal);
  padding-left: var(--spacing-md);
  transition: all var(--transition-normal);
  position: relative;
}

.team-member::before {
  content: '>';
  position: absolute;
  left: -15px;
  color: var(--color-text-secondary);
}

.team-member:hover {
  border-left-color: var(--color-text-accent);
  transform: translateX(5px);
}

.team-member:hover::before {
  color: var(--color-text-accent);
}

.member-info {
  padding: var(--spacing-sm);
}

.member-name {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.member-bio {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  opacity: 0.9;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.contact-method {
  border-left: 2px solid var(--color-text-accent);
  padding-left: var(--spacing-md);
  transition: all var(--transition-normal);
}

.contact-method:hover {
  transform: translateX(5px);
}

.contact-method h3 {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xs);
}

.terminal-command {
  font-family: var(--font-family-mono);
  background-color: var(--color-bg-input);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 2px;
  display: inline-block;
}

/* Responsive styles */
@media (max-width: 768px) {
  .team-grid, .contact-methods {
    grid-template-columns: 1fr;
  }

  .terminal-window {
    margin-left: -1rem;
    margin-right: -1rem;
    border-radius: 0;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import FeaturedDistributions from '../../components/organisms/FeaturedDistributions.vue'
import LatestTips from '../../components/organisms/LatestTips.vue'
import NewsHighlights from '../../components/organisms/NewsHighlights.vue'

const isLoading = ref(true)
const terminalReady = ref(false)
const currentSection = ref('welcome')
const terminalInput = ref('')
type TerminalLine = { text: string, isError?: boolean, isCommand?: boolean }
const terminalHistory = ref<TerminalLine[]>([])
const cursorVisible = ref(true)
const welcomeMessage = ref('')
const welcomeText = 'Bem-vindo ao Tour de Linux - Terminal v1.0.0'
const typingSpeed = 50
const activeCommand = ref(-1)
const commandHistory = ref<string[]>([])
const terminalInputRef = ref<HTMLInputElement | null>(null)

// Focus the terminal input when clicking anywhere in the terminal
const focusInput = () => {
  if (terminalInputRef.value) {
    terminalInputRef.value.focus()
  }
}

// Keyboard shortcuts
const handleKeyDown = (e: KeyboardEvent) => {
  // Arrow up for previous command
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (commandHistory.value.length > 0) {
      if (activeCommand.value < commandHistory.value.length - 1) {
        activeCommand.value++
      }
      terminalInput.value = commandHistory.value[commandHistory.value.length - 1 - activeCommand.value] || ''
    }
  }
  // Arrow down for next command
  else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (activeCommand.value > -1) {
      activeCommand.value--
      terminalInput.value = activeCommand.value >= 0 
        ? commandHistory.value[commandHistory.value.length - 1 - activeCommand.value] 
        : ''
    }
  }
  // Tab for command completion
  else if (e.key === 'Tab') {
    e.preventDefault()
    const input = terminalInput.value.trim().toLowerCase()
    if (input) {
      const availableCommands = Object.keys(commands)
      const matchingCommand = availableCommands.find(cmd => cmd.startsWith(input))
      if (matchingCommand) {
        terminalInput.value = matchingCommand
      }
    }
  }
}

// Simula digitação de texto como em um terminal
const typeText = async (text: string, target: Ref<string>) => {
  target.value = ''
  for (let i = 0; i < text.length; i++) {
    target.value += text[i]
    await new Promise(resolve => setTimeout(resolve, typingSpeed))
  }
}

// Comandos disponíveis
const commands = {
  help: () => {
    addToHistory('Comandos disponíveis:')
    addToHistory('  help         - Mostra esta ajuda')
    addToHistory('  clear        - Limpa o terminal')
    addToHistory('  distros      - Mostra distribuições em destaque')
    addToHistory('  tips         - Mostra dicas recentes')
    addToHistory('  news         - Mostra notícias do mundo Linux')
    addToHistory('  about        - Sobre o Tour de Linux')
  },
  clear: () => {
    terminalHistory.value = []
  },
  distros: () => {
    addToHistory('Carregando distribuições em destaque...')
    currentSection.value = 'distros'
  },
  tips: () => {
    addToHistory('Carregando dicas recentes...')
    currentSection.value = 'tips'
  },
  news: () => {
    addToHistory('Carregando notícias do mundo Linux...')
    currentSection.value = 'news'
  },
  about: () => {
    addToHistory('Tour de Linux - Seu guia pelo mundo das distribuições Linux, dicas e notícias')
    addToHistory('Desenvolvido com Vue.js e muito ☕')
  }
}

// Adiciona texto ao histórico do terminal
const addToHistory = (text: string, isError = false) => {
  terminalHistory.value.push({
    text,
    isError,
    isCommand: text.startsWith('>')
  })
}

// Processa o comando digitado
const processCommand = () => {
  const command = terminalInput.value.trim().toLowerCase()

  if (command) {
    // Add to command history for up/down navigation
    commandHistory.value.push(command)
    if (commandHistory.value.length > 50) {
      commandHistory.value.shift() // Limit history size
    }
    activeCommand.value = -1 // Reset active command index

    addToHistory(`> ${command}`, false)

    if (commands[command as keyof typeof commands]) {
      commands[command as keyof typeof commands]()
    } else {
      addToHistory(`Comando não reconhecido: ${command}`, true)
      addToHistory('Digite "help" para ver os comandos disponíveis')
    }
  }

  terminalInput.value = ''
  scrollToBottom()
}

// Rola para o final do terminal
const scrollToBottom = () => {
  nextTick(() => {
    const terminal = document.querySelector('.terminal-output')
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  })
}

// Alterna a visibilidade do cursor
const toggleCursor = () => {
  cursorVisible.value = !cursorVisible.value
}

// Inicializa o terminal
onMounted(async () => {
  // Simula carregamento de dados
  setTimeout(async () => {
    isLoading.value = false

    // Inicia a animação de digitação do texto de boas-vindas
    await typeText(welcomeText, welcomeMessage)

    // Adiciona mensagens iniciais ao histórico
    addToHistory('Iniciando sistema...')
    addToHistory('Kernel Linux 6.2.0 carregado')
    addToHistory('Todos os sistemas operacionais')
    addToHistory('Digite "help" para ver os comandos disponíveis')

    terminalReady.value = true

    // Inicia o piscar do cursor
    setInterval(toggleCursor, 500)

    // Foca o input do terminal automaticamente
    nextTick(() => {
      if (terminalInputRef.value) {
        terminalInputRef.value.focus()
      }
    })
  }, 800)
})
</script>

<template>
  <div class="terminal-container">
    <div v-if="isLoading" class="terminal-loading">
      <div class="loading-text">Inicializando terminal...</div>
      <div class="loading-bar"></div>
    </div>

    <div v-else class="terminal" @click="focusInput">
      <div class="terminal-body">
        <div class="terminal-welcome" v-if="welcomeMessage">
          <pre class="ascii-art">
      .--.
     |o_o |
     |:_/ |
    //   \ \
   (|     | )
  /'\_   _/`\
  \___)=(___/
</pre>
<pre class="ascii-art">
 _____                     _        _     _                  
|_   _|__  _   _ _ __   __| | ___  | |   (_)_ __  _   ___  __
  | |/ _ \| | | | '_ \ / _` |/ _ \ | |   | | '_ \| | | \ \/ /
  | | (_) | |_| | | | | (_| |  __/ | |___| | | | | |_| |>  < 
  |_|\___/ \__,_|_| |_|\__,_|\___| |_____|_|_| |_|\__,_/_/\_\
</pre>
<div class="terminal-examples">
  <span class="example-label">Exemplos de comandos:</span>
  <span class="example-command">help</span>
  <span class="example-command">distros</span>
  <span class="example-command">tips</span>
  <span class="example-command">news</span>
  <span class="example-command">about</span>
</div>
<div class="welcome-message">{{ welcomeMessage }}</div>
        </div>

        <div class="terminal-output">
          <div 
            v-for="(line, index) in terminalHistory" 
            :key="index" 
            class="terminal-line"
            :class="{
              'command-line': line.isCommand,
              'error-message': line.isError,
              'help-text': index >= 1 && index <= 6 && terminalHistory[0]?.text === 'Comandos disponíveis:'
            }"
          >
            {{ line.text }}
          </div>
        </div>

        <div class="terminal-section" v-if="currentSection !== 'welcome'">
          <div v-if="currentSection === 'distros'" class="section-content">
            <h2 class="section-title">Distribuições em Destaque</h2>
            <FeaturedDistributions />
          </div>

          <div v-if="currentSection === 'tips'" class="section-content">
            <h2 class="section-title">Dicas Recentes</h2>
            <LatestTips />
          </div>

          <div v-if="currentSection === 'news'" class="section-content">
            <h2 class="section-title">Notícias do Mundo Linux</h2>
            <NewsHighlights />
          </div>
        </div>

        <div class="terminal-input-line" v-if="terminalReady">
          <span class="prompt">tour-de-linux@cyberpunk:~$</span>
          <span class="cursor" :class="{ 'cursor-visible': cursorVisible }"></span>
          <span class="typed-text">{{ terminalInput }}</span>
          <input 
            type="text" 
            class="terminal-input" 
            v-model="terminalInput"
            @keyup.enter="processCommand"
            @keydown="handleKeyDown"
            autofocus
            spellcheck="false"
            ref="terminalInputRef"
            style="position: absolute; left: -9999px; width: 0; height: 0; opacity: 0; pointer-events: none;" 
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Courier New', monospace;
}

.terminal-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  color: #6a9955; /* Softer green */
  background-color: #1e1e1e; /* Dark gray background */
  border-radius: 4px;
  padding: 20px;
}

.loading-text {
  margin-bottom: 20px;
  font-size: 1.2rem;
  text-shadow: 0 0 3px #6a9955;
  color: #d4d4d4; /* Light gray text */
}

.loading-bar {
  width: 300px;
  height: 20px;
  background-color: #252526; /* Slightly lighter than background */
  border: 1px solid #6a9955;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.loading-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background-color: #6a9955;
  animation: loading 0.8s linear forwards;
  box-shadow: 0 0 5px #6a9955;
}

@keyframes loading {
  0% { width: 0; }
  100% { width: 100%; }
}

.terminal {
  width: 100%;
  height: 100%;
  background-color: #1e1e1e; /* Dark gray background */
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #3a3a3a; /* Subtle border */
  cursor: text; /* Indicate text input area */
}


.terminal-body {
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.terminal-welcome {
  margin-bottom: 20px;
  text-align: center;
}

.ascii-art {
  color: #569cd6; /* Blue for ASCII art */
  font-size: 0.7rem;
  margin-bottom: 10px;
  text-shadow: 0 0 2px #569cd6;
  line-height: 1.2;
}

.welcome-message {
  color: #d4d4d4; /* Light gray for welcome message */
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-shadow: 0 0 2px #569cd6;
}

.terminal-output {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 15px;
}

.terminal-line {
  color: #d4d4d4; /* Light gray for regular output */
  margin-bottom: 5px;
  word-break: break-word;
}

/* Command line styling */
.command-line {
  color: #ce9178; /* Orange for command lines */
}

/* Help text styling */
.help-text {
  color: #9cdcfe; /* Light blue for help text */
  padding-left: 1rem;
}

.terminal-input-line {
  display: flex;
  align-items: center;
  margin-top: 10px;
  position: relative;
}

.typed-text {
  color: #d4d4d4;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  min-width: 1em;
  display: inline-block;
  vertical-align: middle;
  letter-spacing: 0.02em;
}

.prompt {
  color: #569cd6; /* Blue for prompt */
  margin-right: 10px;
  font-weight: bold;
}

.terminal-input {
  background: transparent;
  border: none;
  color: #d4d4d4; /* Light gray for input text */
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  flex-grow: 1;
  outline: none;
  caret-color: transparent; /* Hide default cursor */
  box-shadow: none !important;
  padding: 0;
  margin: 0;
  height: 1.2em;
}

.cursor {
  width: 8px;
  height: 16px;
  background-color: #d4d4d4; /* Light gray cursor */
  display: inline-block;
  margin-left: 0;
  margin-right: 2px;
  opacity: 0;
  vertical-align: middle;
  animation: blink 1s steps(1) infinite;
}

.cursor-visible {
  opacity: 1;
}

.terminal-examples {
  margin-bottom: 10px;
  color: #dcdcaa;
  font-size: 0.95rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5em;
  align-items: center;
}
.example-label {
  color: #569cd6;
  font-weight: bold;
  margin-right: 0.5em;
}
.example-command {
  background: #252526;
  color: #6a9955;
  border-radius: 3px;
  padding: 0.1em 0.5em;
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  font-size: 0.95em;
  margin-right: 0.2em;
  box-shadow: 0 0 2px #6a9955;
}


.cursor {
  width: 8px;
  height: 16px;
  background-color: #d4d4d4; /* Light gray cursor */
  display: inline-block;
  margin-left: 2px;
  opacity: 0;
}

.cursor-visible {
  opacity: 1;
}

.terminal-section {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #252526; /* Slightly lighter than main background */
  border: 1px solid #3a3a3a; /* Subtle border */
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.section-content {
  color: #d4d4d4; /* Light gray for content */
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #dcdcaa; /* Yellow for section titles */
  position: relative;
  padding-bottom: 0.5rem;
  font-weight: normal;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 1px;
  background-color: #569cd6; /* Blue underline */
}

/* Style for error messages */
.error-message {
  color: #f44747; /* Red for errors */
}

@media (max-width: 768px) {
  .terminal {
    border-radius: 0;
  }

  .ascii-art {
    font-size: 0.5rem;
  }

  .welcome-message {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.3rem;
  }
}
</style>

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
  <div class="about">
    <section class="about-header">
      <h1>Sobre o Tour de Linux</h1>
      <p class="about-subtitle">
        Guiando você pelo mundo das distribuições Linux desde 2023
      </p>
    </section>
    
    <section class="about-mission">
      <h2>Nossa Missão</h2>
      <p>
        O Tour de Linux nasceu da paixão por software livre e da crença de que o Linux é para todos. 
        Nossa missão é desmistificar o mundo Linux, tornando-o acessível para iniciantes enquanto 
        oferecemos conteúdo relevante para usuários experientes.
      </p>
      <p>
        Acreditamos que a diversidade de distribuições Linux é uma força, não uma fraqueza. 
        Cada distribuição tem seu propósito e público-alvo, e estamos aqui para ajudar você 
       
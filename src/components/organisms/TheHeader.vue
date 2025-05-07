<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const checkScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <div class="header-container">
      <RouterLink to="/" class="logo" @click="closeMenu">
        <img src="@/assets/images/logo.svg" alt="Tour de Linux" class="logo-image" />
        <span class="logo-text">Tour de Linux</span>
      </RouterLink>
      
      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span class="menu-icon" :class="{ 'open': isMenuOpen }"></span>
      </button>
      
      <nav class="nav" :class="{ 'open': isMenuOpen }">
        <ul class="nav-list">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" @click="closeMenu">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/distributions" class="nav-link" @click="closeMenu">Distribuições</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/tips" class="nav-link" @click="closeMenu">Dicas</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/news" class="nav-link" @click="closeMenu">Notícias</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link" @click="closeMenu">Sobre</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.header.scrolled {
  padding: 0.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2c3e50;
}

.logo-image {
  height: 32px;
  margin-right: 0.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 0.5rem;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  border-radius: 4px;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #42b883;
}

.nav-link.router-link-exact-active {
  background-color: rgba(66, 184, 131, 0.1);
  color: #42b883;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  display: block;
  position: relative;
  width: 24px;
  height: 2px;
  background-color: #2c3e50;
  transition: all 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #2c3e50;
  transition: all 0.3s ease;
}

.menu-icon::before {
  transform: translateY(-8px);
}

.menu-icon::after {
  transform: translateY(8px);
}

.menu-icon.open {
  background-color: transparent;
}

.menu-icon.open::before {
  transform: rotate(45deg);
}

.menu-icon.open::after {
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
    z-index: 101;
  }
  
  .nav {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 250px;
    background-color: white;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 100;
    padding-top: 4rem;
  }
  
  .nav.open {
    transform: translateX(0);
  }
  
  .nav-list {
    flex-direction: column;
    padding: 1rem;
  }
  
  .nav-item {
    margin: 0.5rem 0;
  }
  
  .nav-link {
    padding: 0.75rem 1rem;
  }
}
</style>
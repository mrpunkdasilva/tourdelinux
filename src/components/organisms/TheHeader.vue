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
  background-color: rgba(0, 0, 0, 0.95);
  border-bottom: 1px solid #0f0;
  box-shadow: 0 2px 8px rgba(0, 255, 0, 0.2);
  transition: all 0.3s ease;
}

.header.scrolled {
  padding: 0.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 255, 0, 0.3);
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
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
  font-family: 'Courier New', monospace;
}

.logo-image {
  height: 32px;
  margin-right: 0.5rem;
  filter: hue-rotate(100deg) brightness(1.5);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1px;
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
  color: #0f0;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 2px #0f0;
  border: 1px solid transparent;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
  border: 1px solid rgba(0, 255, 0, 0.3);
}

.nav-link.router-link-exact-active {
  background-color: rgba(0, 255, 0, 0.1);
  color: #0f0;
  border: 1px solid #0f0;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
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
  background-color: #0f0;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px #0f0;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #0f0;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px #0f0;
}

.menu-icon::before {
  transform: translateY(-8px);
}

.menu-icon::after {
  transform: translateY(8px);
}

.menu-icon.open {
  background-color: transparent;
  box-shadow: none;
}

.menu-icon.open::before {
  transform: rotate(45deg);
  box-shadow: 0 0 5px #0f0;
}

.menu-icon.open::after {
  transform: rotate(-45deg);
  box-shadow: 0 0 5px #0f0;
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
    background-color: rgba(0, 0, 0, 0.95);
    border-left: 1px solid #0f0;
    box-shadow: -2px 0 15px rgba(0, 255, 0, 0.3);
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
    border: 1px solid rgba(0, 255, 0, 0.2);
    margin-bottom: 0.5rem;
  }

  .nav-link:hover {
    background-color: rgba(0, 255, 0, 0.1);
  }
}
</style>

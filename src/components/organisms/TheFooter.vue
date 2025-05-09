<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3 class="footer-title">Tour de Linux</h3>
        <p class="footer-description">
          Seu guia pelo mundo das distribuições Linux, dicas e notícias.
        </p>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Links Rápidos</h4>
        <ul class="footer-links">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/distributions">Distribuições</RouterLink></li>
          <li><RouterLink to="/tips">Dicas</RouterLink></li>
          <li><RouterLink to="/news">Notícias</RouterLink></li>
          <li><RouterLink to="/about">Sobre</RouterLink></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Comunidade</h4>
        <ul class="footer-links">
          <li><a href="#" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="#" target="_blank" rel="noopener">Discord</a></li>
          <li><a href="#" target="_blank" rel="noopener">Twitter</a></li>
          <li><a href="#" target="_blank" rel="noopener">Reddit</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-subtitle">Newsletter</h4>
        <p class="newsletter-text">
          Receba as últimas novidades sobre o mundo Linux.
        </p>
        <div class="newsletter-form">
          <input 
            type="email" 
            placeholder="Seu e-mail" 
            class="newsletter-input"
          />
          <button class="newsletter-button">Inscrever</button>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="copyright">
        &copy; {{ currentYear }} Tour de Linux. Todos os direitos reservados.
      </p>
      <div class="footer-bottom-links">
        <RouterLink to="/privacy">Privacidade</RouterLink>
        <RouterLink to="/terms">Termos</RouterLink>
        <RouterLink to="/contact">Contato</RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000;
  color: #0f0;
  padding-top: 3rem;
  border-top: 1px solid #0f0;
  box-shadow: 0 -5px 15px rgba(0, 255, 0, 0.1);
  font-family: 'Courier New', monospace;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
  letter-spacing: 1px;
}

.footer-description {
  line-height: 1.6;
  color: rgba(0, 255, 0, 0.8);
  text-shadow: 0 0 2px rgba(0, 255, 0, 0.5);
}

.footer-subtitle {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #0f0;
  text-shadow: 0 0 3px #0f0;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-subtitle::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 1px;
  background-color: #0f0;
  box-shadow: 0 0 5px #0f0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 15px;
}

.footer-links li::before {
  content: '>';
  position: absolute;
  left: 0;
  color: #0f0;
  font-weight: bold;
}

.footer-links a {
  color: rgba(0, 255, 0, 0.8);
  text-decoration: none;
  transition: all 0.3s;
}

.footer-links a:hover {
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
}

.newsletter-text {
  margin-bottom: 1rem;
  color: rgba(0, 255, 0, 0.8);
}

.newsletter-form {
  display: flex;
}

.newsletter-input {
  flex: 1;
  padding: 0.5rem;
  background-color: rgba(0, 20, 0, 0.7);
  color: #0f0;
  border: 1px solid #0f0;
  border-radius: 4px 0 0 4px;
  font-size: 0.875rem;
  font-family: 'Courier New', monospace;
  outline: none;
}

.newsletter-input::placeholder {
  color: rgba(0, 255, 0, 0.5);
}

.newsletter-button {
  background-color: rgba(0, 50, 0, 0.8);
  color: #0f0;
  border: 1px solid #0f0;
  padding: 0.5rem 1rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 2px #0f0;
}

.newsletter-button:hover {
  background-color: rgba(0, 100, 0, 0.8);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.footer-bottom {
  margin-top: 3rem;
  padding: 1.5rem 1rem;
  border-top: 1px solid rgba(0, 255, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: rgba(0, 255, 0, 0.7);
  font-size: 0.875rem;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-links a {
  color: rgba(0, 255, 0, 0.7);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s;
}

.footer-bottom-links a:hover {
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-subtitle::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-links li {
    text-align: center;
    padding-left: 0;
  }

  .footer-links li::before {
    display: none;
  }
}
</style>

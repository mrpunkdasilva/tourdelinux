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
  background-color: #2c3e50;
  color: #fff;
  padding-top: 3rem;
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
  color: #42b883;
}

.footer-description {
  line-height: 1.6;
  color: #ccc;
}

.footer-subtitle {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #fff;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #42b883;
}

.newsletter-text {
  margin-bottom: 1rem;
  color: #ccc;
}

.newsletter-form {
  display: flex;
}

.newsletter-input {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 0.875rem;
}

.newsletter-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.newsletter-button:hover {
  background-color: #3aa876;
}

.footer-bottom {
  margin-top: 3rem;
  padding: 1.5rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: #ccc;
  font-size: 0.875rem;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-links a {
  color: #ccc;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s;
}

.footer-bottom-links a:hover {
  color: #42b883;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
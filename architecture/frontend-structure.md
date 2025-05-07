# Estrutura do Frontend Vue.js


```
/src
├── /assets                  # Recursos estáticos (imagens, fontes, etc.)
├── /components              # Componentes Vue reutilizáveis
│   ├── /atoms               # Componentes básicos (botões, inputs, etc.)
│   ├── /molecules           # Combinações de atoms (cards, forms, etc.)
│   ├── /organisms           # Seções maiores de UI
│   └── /templates           # Layouts de página
│
├── /composables             # Funções de Composition API reutilizáveis
├── /views                   # Componentes de página
│   ├── /home
│   ├── /distributions
│   ├── /tips
│   ├── /news
│   └── /user
│
├── /router                  # Configuração do Vue Router
├── /stores                  # Stores Pinia para gerenciamento de estado
│   ├── /auth
│   ├── /content
│   ├── /ui
│   └── /user
│
├── /services                # Serviços para comunicação com API
├── /utils                   # Funções utilitárias
├── /plugins                 # Plugins Vue
├── /types                   # Definições de tipos TypeScript
│
├── App.vue                  # Componente raiz
├── main.ts                  # Ponto de entrada da aplicação
└── env.d.ts                 # Definições de ambiente
```
# Git Workflow: Trunk-Based Development

## Visão Geral

O Tour de Linux adota o modelo de desenvolvimento Trunk-Based (Desenvolvimento Baseado em Tronco), uma prática de controle de versão onde os desenvolvedores colaboram em código em um único branch chamado 'trunk' (geralmente o branch 'main' ou 'master'). Esta abordagem é fundamental para a Integração Contínua (CI) e a Entrega Contínua (CD).

## Princípios do Trunk-Based Development

1. **Branch principal único**: Todo o desenvolvimento acontece no branch principal ('main')
2. **Commits pequenos e frequentes**: Alterações são pequenas, focadas e frequentes
3. **Integração contínua**: Código é integrado ao trunk várias vezes ao dia
4. **Testes automatizados**: Cada commit passa por testes automatizados antes de ser integrado
5. **Sempre pronto para deploy**: O branch principal está sempre em estado deployable

## Fluxo de Trabalho

### Para novas funcionalidades ou correções:

1. **Sincronize com o trunk**:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Desenvolva diretamente no trunk** (para alterações pequenas):
   - Faça as alterações necessárias
   - Execute testes locais
   - Commit e push diretamente para o trunk:
   ```bash
   git add .
   git commit -m "Descrição clara da alteração"
   git push origin main
   ```

3. **Use branch de curta duração** (para alterações maiores):
   - Crie um branch a partir do trunk:
   ```bash
   git checkout -b feature-xyz main
   ```
   - Faça as alterações necessárias
   - Mantenha o branch sincronizado com o trunk:
   ```bash
   git pull --rebase origin main
   ```
   - Quando pronto, faça merge de volta para o trunk:
   ```bash
   git checkout main
   git merge --no-ff feature-xyz
   git push origin main
   ```
   - Delete o branch após o merge:
   ```bash
   git branch -d feature-xyz
   ```

### Práticas Recomendadas

1. **Feature Flags**: Para funcionalidades maiores que não podem ser divididas, use feature flags para ocultar código incompleto em produção
2. **Rebase vs. Merge**: Prefira rebase para manter o histórico limpo
3. **Revisão de Código**: Utilize revisões de código através de Pull Requests para branches de curta duração
4. **Testes Automatizados**: Mantenha uma suíte de testes robusta para garantir que o trunk permaneça estável
5. **Integração Frequente**: Integre seu código ao trunk pelo menos uma vez por dia

## Diferenças do GitFlow

O Trunk-Based Development difere do GitFlow nos seguintes aspectos:

1. **Simplicidade**: Menos branches para gerenciar
2. **Integração mais rápida**: Mudanças são integradas mais rapidamente
3. **Menos conflitos de merge**: Devido à integração frequente
4. **Melhor suporte para CI/CD**: O trunk está sempre pronto para deploy

## Implementação no Tour de Linux

Para o Tour de Linux, seguiremos estas diretrizes específicas:

1. O branch principal será o `main`
2. Branches de curta duração serão usados apenas para funcionalidades que levem mais de um dia para serem implementadas
3. Todos os commits no `main` devem passar nos testes automatizados
4. Utilizaremos feature flags para funcionalidades em desenvolvimento que precisam ser integradas ao trunk

## Transição para Trunk-Based Development

Se você estava trabalhando em um branch de longa duração:

1. Divida seu trabalho em partes menores
2. Integre cada parte ao trunk assim que estiver pronta e testada
3. Use feature flags para ocultar funcionalidades incompletas

> **Nota**: A transição para o Trunk-Based Development foi concluída em 15/05/2023. O branch `cyberpunk-terminal-design` foi mesclado ao trunk (`main`) e todos os desenvolvedores agora devem seguir este novo fluxo de trabalho.

## Referências

- [Trunk-Based Development](https://trunkbaseddevelopment.com/)
- [Google's Engineering Practices](https://google.github.io/eng-practices/)
- [Martin Fowler on Trunk-Based Development](https://martinfowler.com/articles/branching-patterns.html#trunk-based-development)

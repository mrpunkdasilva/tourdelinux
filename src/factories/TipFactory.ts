import type {RelatedTip, Tip} from "@/types/Tip";


export class TipFactory {
  static getMockTips(): Tip[] {
    return [
      {
        id: 1,
        title: 'Como configurar um servidor SSH seguro',
        excerpt: 'Aprenda a configurar e proteger seu servidor SSH contra ataques comuns.',
        content: `
          <h2>Introdução</h2>
          <p>SSH (Secure Shell) é um protocolo de rede criptográfico para operação de serviços de rede de forma segura sobre uma rede não segura. É amplamente utilizado para acesso remoto a servidores Linux.</p>
          
          <h2>Passo 1: Instale o servidor SSH</h2>
          <p>Na maioria das distribuições Linux, você pode instalar o servidor SSH com o seguinte comando:</p>
          <pre><code>sudo apt install openssh-server</code></pre>
          
          <h2>Passo 2: Configure o arquivo sshd_config</h2>
          <p>Edite o arquivo de configuração principal do SSH:</p>
          <pre><code>sudo nano /etc/ssh/sshd_config</code></pre>
          
          <p>Faça as seguintes alterações para aumentar a segurança:</p>
          <pre><code># Desabilitar login como root
PermitRootLogin no

# Usar apenas o protocolo SSH versão 2
Protocol 2

# Limitar tentativas de autenticação
MaxAuthTries 3

# Definir tempo limite de inatividade
ClientAliveInterval 300
ClientAliveCountMax 2

# Restringir usuários que podem acessar via SSH
AllowUsers usuario1 usuario2

# Desabilitar autenticação por senha (use chaves SSH)
PasswordAuthentication no</code></pre>
          
          <h2>Passo 3: Configure autenticação por chave SSH</h2>
          <p>Gere um par de chaves no seu computador cliente:</p>
          <pre><code>ssh-keygen -t ed25519 -C "seu_email@exemplo.com"</code></pre>
          
          <p>Copie a chave pública para o servidor:</p>
          <pre><code>ssh-copy-id usuario@seu_servidor</code></pre>
          
          <h2>Passo 4: Configure um firewall</h2>
          <p>Limite o acesso à porta SSH usando UFW:</p>
          <pre><code>sudo ufw allow from 192.168.1.0/24 to any port 22
sudo ufw enable</code></pre>
          
          <h2>Passo 5: Instale e configure Fail2Ban</h2>
          <p>Fail2Ban ajuda a prevenir ataques de força bruta:</p>
          <pre><code>sudo apt install fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local</code></pre>
          
          <p>Configure a seção SSH:</p>
          <pre><code>[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600</code></pre>
          
          <h2>Conclusão</h2>
          <p>Seguindo estes passos, você terá um servidor SSH significativamente mais seguro. Lembre-se de reiniciar o serviço SSH após fazer alterações na configuração:</p>
          <pre><code>sudo systemctl restart sshd</code></pre>
        `,
        author: 'João Silva',
        authorAvatar: '/src/assets/images/author-avatar.jpg',
        date: '2023-05-15',
        readTime: 8,
        category: 'Segurança',
        tags: ['ssh', 'segurança', 'servidor', 'linux', 'configuração']
      },
      {
        id: 2,
        title: 'Comandos essenciais do terminal Linux',
        excerpt: 'Uma lista dos comandos mais úteis que todo usuário Linux deveria conhecer para aumentar sua produtividade.',
        content: `
          <h2>Introdução</h2>
          <p>O terminal Linux é uma ferramenta poderosa que permite controlar seu sistema operacional através de comandos de texto. Dominar os comandos básicos do terminal pode aumentar significativamente sua produtividade e permitir que você realize tarefas que seriam difíceis ou impossíveis através da interface gráfica.</p>
          
          <h2>Navegação no sistema de arquivos</h2>
          
          <h3>pwd - Print Working Directory</h3>
          <p>Mostra o diretório atual em que você está:</p>
          <pre><code>pwd</code></pre>
          
          <h3>ls - List</h3>
          <p>Lista arquivos e diretórios:</p>
          <pre><code>ls                  # Lista básica
ls -l               # Formato longo com detalhes
ls -a               # Mostra arquivos ocultos
ls -lh              # Formato longo com tamanhos legíveis</code></pre>
          
          <h3>cd - Change Directory</h3>
          <pre><code>cd /etc            # Vai para o diretório /etc
cd ~               # Vai para o diretório home
cd ..              # Sobe um nível
cd -               # Volta ao diretório anterior</code></pre>
          
          <h2>Manipulação de arquivos</h2>
          
          <h3>touch - Criar arquivo vazio</h3>
          <pre><code>touch arquivo.txt</code></pre>
          
          <h3>mkdir - Make Directory</h3>
          <pre><code>mkdir pasta
mkdir -p pasta1/pasta2/pasta3  # Cria estrutura de diretórios</code></pre>
          
          <h3>cp - Copy</h3>
          <pre><code>cp arquivo.txt copia.txt
cp -r pasta/ backup/     # Copia recursivamente</code></pre>
          
          <h3>mv - Move/Rename</h3>
          <pre><code>mv arquivo.txt novo_nome.txt  # Renomeia
mv arquivo.txt ~/Documentos/  # Move</code></pre>
          
          <h3>rm - Remove</h3>
          <pre><code>rm arquivo.txt
rm -r pasta/       # Remove recursivamente
rm -f arquivo.txt  # Força remoção sem confirmação</code></pre>
          
          <h2>Visualização de conteúdo</h2>
          
          <h3>cat - Concatenate</h3>
          <pre><code>cat arquivo.txt</code></pre>
          
          <h3>less - Paginador</h3>
          <pre><code>less arquivo_grande.txt</code></pre>
          
          <h3>head/tail - Início/Fim do arquivo</h3>
          <pre><code>head -n 10 arquivo.txt  # Primeiras 10 linhas
tail -n 20 arquivo.txt  # Últimas 20 linhas
tail -f /var/log/syslog  # Acompanha atualizações</code></pre>
          
          <h2>Busca</h2>
          
          <h3>find - Busca arquivos</h3>
          <pre><code>find /home -name "*.txt"
find . -type f -size +1M</code></pre>
          
          <h3>grep - Busca conteúdo</h3>
          <pre><code>grep "texto" arquivo.txt
grep -r "texto" /etc/  # Busca recursiva</code></pre>
          
          <h2>Gerenciamento de sistema</h2>
          
          <h3>ps - Process Status</h3>
          <pre><code>ps aux  # Lista todos os processos</code></pre>
          
          <h3>top/htop - Monitor de processos</h3>
          <pre><code>top
htop  # Versão melhorada (pode precisar instalar)</code></pre>
          
          <h3>df - Disk Free</h3>
          <pre><code>df -h  # Mostra espaço em disco em formato legível</code></pre>
          
          <h3>du - Disk Usage</h3>
          <pre><code>du -sh *  # Tamanho de arquivos/pastas no diretório atual</code></pre>
          
          <h2>Conclusão</h2>
          <p>Estes comandos formam a base para trabalhar eficientemente no terminal Linux. Com prática, você poderá combinar estes comandos de formas poderosas usando pipes (|) e redirecionamentos (>, >>), aumentando ainda mais sua produtividade.</p>
        `,
        author: 'Maria Oliveira',
        authorAvatar: '/src/assets/images/author-avatar-2.jpg',
        date: '2023-04-28',
        readTime: 10,
        category: 'Terminal',
        tags: ['terminal', 'comandos', 'bash', 'shell', 'produtividade']
      },
      {
        id: 3,
        title: 'Como instalar e configurar o Docker no Linux',
        excerpt: 'Um guia passo a passo para instalar, configurar e começar a usar o Docker em distribuições Linux.',
        content: `
          <h2>Introdução ao Docker</h2>
          <p>Docker é uma plataforma de código aberto que automatiza a implantação de aplicativos dentro de contêineres. Os contêineres permitem que os desenvolvedores empacotem um aplicativo com todas as partes de que ele precisa, como bibliotecas e outras dependências, e o enviem como um único pacote.</p>
          
          <h2>Instalação do Docker no Ubuntu/Debian</h2>
          
          <h3>1. Atualize os pacotes</h3>
          <pre><code>sudo apt update
sudo apt upgrade</code></pre>
          
          <h3>2. Instale os pré-requisitos</h3>
          <pre><code>sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg</code></pre>
          
          <h3>3. Adicione a chave GPG oficial do Docker</h3>
          <pre><code>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg</code></pre>
          
          <h3>4. Configure o repositório estável</h3>
          <pre><code>echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null</code></pre>
          
          <h3>5. Instale o Docker Engine</h3>
          <pre><code>sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io</code></pre>
          
          <h3>6. Verifique a instalação</h3>
          <pre><code>sudo docker run hello-world</code></pre>
          
          <h2>Configuração pós-instalação</h2>
          
          <h3>1. Adicione seu usuário ao grupo docker</h3>
          <p>Para usar o Docker sem sudo:</p>
          <pre><code>sudo usermod -aG docker $USER
newgrp docker</code></pre>
          
          <h3>2. Configure o Docker para iniciar na inicialização</h3>
          <pre><code>sudo systemctl enable docker.service
sudo systemctl enable containerd.service</code></pre>
          
          <h2>Comandos básicos do Docker</h2>
          
          <h3>Imagens</h3>
          <pre><code># Listar imagens
docker images

# Baixar uma imagem
docker pull ubuntu:20.04

# Remover uma imagem
docker rmi ubuntu:20.04</code></pre>
          
          <h3>Contêineres</h3>
          <pre><code># Executar um contêiner
docker run -it ubuntu:20.04 bash

# Listar contêineres em execução
docker ps

# Listar todos os contêineres
docker ps -a

# Iniciar/parar um contêiner
docker start container_id
docker stop container_id

# Remover um contêiner
docker rm container_id</code></pre>
          
          <h2>Docker Compose</h2>
          <p>Para aplicações multi-contêiner, instale o Docker Compose:</p>
          <pre><code>sudo curl -L "https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose</code></pre>
          
          <p>Exemplo básico de docker-compose.yml:</p>
          <pre><code>version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: example</code></pre>
          
          <p>Execute com:</p>
          <pre><code>docker-compose up -d</code></pre>
          
          <h2>Conclusão</h2>
          <p>Docker é uma ferramenta poderosa para desenvolvimento e implantação de aplicações. Com esta configuração básica, você já pode começar a explorar contêineres e aproveitar os benefícios da containerização em seu ambiente Linux.</p>
        `,
        author: 'Pedro Santos',
        authorAvatar: '/src/assets/images/author-avatar-3.jpg',
        date: '2023-03-10',
        readTime: 12,
        category: 'Ferramentas',
        tags: ['docker', 'containerização', 'devops', 'desenvolvimento']
      }
    ];
  }

  static getTipById(id: number): Tip | undefined {
    const allTips = this.getMockTips();
    return allTips.find(tip => tip.id === id);
  }

  static getRelatedTips(tipId: number, limit: number = 3): RelatedTip[] {
    const allTips = this.getMockTips();
    const currentTip = this.getTipById(tipId);
    
    if (!currentTip) return [];
    
    return allTips
      .filter(tip => 
        tip.id !== tipId && 
        (tip.category === currentTip.category || 
         tip.tags.some(tag => currentTip.tags.includes(tag)))
      )
      .slice(0, limit)
      .map(tip => ({
        id: tip.id,
        title: tip.title,
        excerpt: tip.excerpt || tip.content.substring(0, 120) + '...'
      }));
  }

  static getLatestTips(limit: number = 4): Tip[] {
    const allTips = this.getMockTips();
    
    // Ordenar por data (mais recente primeiro)
    return [...allTips]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  static getTipsByCategory(category: string, limit?: number): Tip[] {
    const allTips = this.getMockTips();
    const filteredTips = allTips.filter(tip => 
      tip.category.toLowerCase() === category.toLowerCase()
    );
    
    return limit ? filteredTips.slice(0, limit) : filteredTips;
  }

  static searchTips(query: string): Tip[] {
    if (!query.trim()) return [];
    
    const allTips = this.getMockTips();
    const searchTerm = query.toLowerCase();
    
    return allTips.filter(tip => 
      tip.title.toLowerCase().includes(searchTerm) ||
      tip.excerpt?.toLowerCase().includes(searchTerm) ||
      tip.content.toLowerCase().includes(searchTerm) ||
      tip.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
}
// Factory para criar dados mockados de notícias
export class NewsFactory {
  static getMockNews() {
    return [
      {
        id: 1,
        title: 'Ubuntu 23.04 "Lunar Lobster" é lançado com novos recursos',
        excerpt: 'A Canonical lançou o Ubuntu 23.04 com kernel Linux 6.2, GNOME 44 e melhorias de desempenho.',
        content: `<p>A Canonical anunciou o lançamento do Ubuntu 23.04, codinome "Lunar Lobster". Esta nova versão traz o kernel Linux 6.2, ambiente desktop GNOME 44 e diversas melhorias de desempenho.</p>
                 <p>Entre as novidades estão suporte aprimorado para hardware mais recente, melhor integração com dispositivos móveis e atualizações significativas nas ferramentas de desenvolvimento.</p>
                 <p>O Ubuntu 23.04 também inclui as versões mais recentes de aplicativos populares como Firefox, LibreOffice e Thunderbird. A Canonical destacou melhorias significativas no consumo de energia, especialmente importante para usuários de laptops.</p>
                 <p>Como uma versão não-LTS, o Ubuntu 23.04 receberá suporte por 9 meses, até janeiro de 2024. Usuários que preferem estabilidade a longo prazo são aconselhados a permanecer no Ubuntu 22.04 LTS, que tem suporte até 2027.</p>
                 <p>A atualização está disponível para download no site oficial do Ubuntu e também pode ser instalada através do gerenciador de atualizações para usuários de versões anteriores.</p>`,
        source: 'Ubuntu Blog',
        author: 'Mark Shuttleworth',
        date: '2023-04-20',
        category: 'releases',
        tags: ['ubuntu', 'lançamento', 'canonical', 'gnome']
      },
      {
        id: 2,
        title: 'Vulnerabilidade crítica descoberta no kernel Linux',
        excerpt: 'Uma falha de segurança que afeta versões do kernel Linux desde 5.8 foi descoberta e corrigida.',
        content: `<p>Pesquisadores de segurança identificaram uma vulnerabilidade crítica no kernel Linux que afeta todas as versões desde 5.8. A falha, identificada como CVE-2023-1234, poderia permitir que atacantes locais obtivessem privilégios elevados no sistema.</p>
                 <p>De acordo com o relatório de segurança, a vulnerabilidade está relacionada a um problema no subsistema de memória do kernel, que poderia ser explorado para executar código arbitrário com privilégios de root. Os pesquisadores demonstraram que a falha poderia ser explorada em sistemas comuns em menos de 5 minutos.</p>
                 <p>A comunidade Linux reagiu rapidamente, e patches já foram lançados para todas as distribuições principais. Usuários são fortemente aconselhados a atualizar seus sistemas imediatamente para evitar possíveis ataques.</p>
                 <p>Esta descoberta destaca a importância de manter sistemas Linux atualizados e seguir as melhores práticas de segurança. Administradores de sistemas devem revisar suas políticas de atualização e considerar a implementação de medidas adicionais de proteção.</p>`,
        source: 'Linux Security',
        author: 'Sarah Johnson',
        date: '2023-05-15',
        category: 'security',
        tags: ['segurança', 'kernel', 'vulnerabilidade', 'patch']
      },
      {
        id: 3,
        title: 'Red Hat Enterprise Linux 9.2 traz melhorias em segurança e automação',
        excerpt: 'A nova versão do RHEL inclui recursos avançados de segurança e ferramentas de automação aprimoradas.',
        content: `<p>A Red Hat anunciou o lançamento do Red Hat Enterprise Linux 9.2, trazendo melhorias significativas em segurança, automação e gerenciamento de sistemas. Esta atualização inclui novos recursos de conformidade, ferramentas aprimoradas para automação de TI e otimizações de desempenho para cargas de trabalho em nuvem.</p>
                 <p>Entre os destaques estão o suporte aprimorado para contêineres, melhorias no sistema de gerenciamento de identidade e atualizações nas ferramentas de monitoramento e diagnóstico. A Red Hat também expandiu as capacidades de integração com plataformas de nuvem pública e privada.</p>
                 <p>A empresa enfatizou seu compromisso com a estabilidade e segurança, destacando as certificações de segurança atualizadas e o suporte estendido para hardware de última geração. O RHEL 9.2 também inclui melhorias na experiência do desenvolvedor, com atualizações nas linguagens de programação e ferramentas de desenvolvimento suportadas.</p>
                 <p>Clientes existentes podem atualizar para a nova versão através do Red Hat Customer Portal, enquanto novos usuários podem acessar uma versão de avaliação gratuita no site da empresa.</p>`,
        source: 'Red Hat Blog',
        author: 'Paul Cormier',
        date: '2023-05-10',
        category: 'enterprise',
        tags: ['red hat', 'rhel', 'empresarial', 'automação']
      },
      {
        id: 4,
        title: 'Linux Foundation anuncia novos cursos gratuitos de treinamento',
        excerpt: 'Novos cursos online gratuitos focados em segurança e DevOps estão disponíveis para a comunidade.',
        content: `<p>A Linux Foundation anunciou o lançamento de uma nova série de cursos gratuitos focados em segurança cibernética e práticas de DevOps. Os cursos online estão disponíveis para todos e incluem tópicos como segurança de contêineres, infraestrutura como código e práticas de CI/CD.</p>
                 <p>Esta iniciativa visa ajudar a preencher a lacuna de habilidades na indústria e promover melhores práticas de segurança no desenvolvimento de software. Os cursos foram desenvolvidos em colaboração com especialistas da indústria e acadêmicos, garantindo conteúdo atualizado e relevante.</p>
                 <p>Além dos cursos gratuitos, a Linux Foundation também anunciou descontos em suas certificações profissionais para estudantes e profissionais em início de carreira. A organização espera que estas iniciativas ajudem a aumentar a diversidade no ecossistema de código aberto e fortaleçam a comunidade como um todo.</p>
                 <p>Os cursos já estão disponíveis na plataforma de treinamento da Linux Foundation, e novos módulos serão adicionados regularmente ao longo do ano.</p>`,
        source: 'Linux Foundation',
        author: 'Jim Zemlin',
        date: '2023-05-05',
        category: 'community',
        tags: ['treinamento', 'educação', 'devops', 'segurança']
      },
      {
        id: 5,
        title: 'Fedora 38 lançado com foco em experiência do usuário',
        excerpt: 'A mais recente versão do Fedora traz melhorias na interface, desempenho e suporte a hardware.',
        content: `<p>O Projeto Fedora anunciou o lançamento do Fedora 38, com foco em melhorias na experiência do usuário e suporte a hardware mais recente. Esta versão inclui o ambiente GNOME 44, KDE Plasma 5.27, e o kernel Linux 6.2.</p>
                 <p>Entre as novidades estão melhor suporte para laptops com tela sensível ao toque, otimizações de desempenho para sistemas com pouca memória e atualizações significativas nas ferramentas de desenvolvimento. O Fedora 38 também traz melhorias na duração da bateria e no gerenciamento de energia.</p>
                 <p>Para desenvolvedores, esta versão inclui atualizações importantes nas linguagens de programação e ambientes de desenvolvimento, incluindo Python 3.11, Ruby 3.2, e Node.js 18. O sistema de contêineres também recebeu atualizações significativas, com melhor integração com Podman e ferramentas relacionadas.</p>
                 <p>Como sempre, o Fedora 38 está disponível em várias edições, incluindo Workstation, Server, e IoT, além das populares spins com diferentes ambientes desktop. A atualização pode ser feita através do gerenciador de software ou via linha de comando.</p>`,
        source: 'Fedora Magazine',
        author: 'Matthew Miller',
        date: '2023-04-18',
        category: 'releases',
        tags: ['fedora', 'lançamento', 'gnome', 'kde']
      },
      {
        id: 6,
        title: 'Debian celebra 30 anos com eventos virtuais globais',
        excerpt: 'A comunidade Debian está organizando uma série de eventos online para comemorar três décadas do projeto.',
        content: `<p>O Projeto Debian está celebrando seu 30º aniversário com uma série de eventos virtuais globais. Fundado em 1993 por Ian Murdock, o Debian se tornou uma das distribuições Linux mais influentes e respeitadas.</p>
                 <p>As comemorações incluem palestras técnicas, mesas redondas com desenvolvedores veteranos e atividades para novos contribuidores. A comunidade também está compartilhando histórias e memórias dos 30 anos de desenvolvimento colaborativo.</p>
                 <p>Durante os eventos, serão destacados os principais marcos do projeto, incluindo a criação do sistema de gerenciamento de pacotes APT, o compromisso com software livre e o impacto do Debian no ecossistema Linux como um todo. Muitas distribuições populares, como Ubuntu, são baseadas no Debian.</p>
                 <p>A programação completa dos eventos está disponível no site do projeto, e todos são convidados a participar, independentemente de experiência prévia com o Debian ou Linux em geral.</p>`,
        source: 'Debian Community',
        author: 'Debian Project',
        date: '2023-05-12',
        category: 'community',
        tags: ['debian', 'aniversário', 'comunidade', 'evento']
      }
    ];
  }

  static getNewsById(id: number) {
    const allNews = this.getMockNews();
    return allNews.find(item => item.id === id);
  }

  static getRelatedNews(newsId: number, limit: number = 3) {
    const allNews = this.getMockNews();
    const currentNews = this.getNewsById(newsId);
    
    if (!currentNews) return [];
    
    return allNews
      .filter(item => 
        item.id !== newsId && 
        (item.category === currentNews.category || 
         item.tags.some(tag => currentNews.tags.includes(tag)))
      )
      .slice(0, limit);
  }
}
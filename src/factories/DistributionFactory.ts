import type { Distribution } from '@/types/Distribution'

export class DistributionFactory {
  static getMockDistributions(): Distribution[] {
    return [
      {
        id: 1,
        name: 'Ubuntu',
        version: '22.04 LTS',
        category: 'desktop',
        description: 'Uma das distribuições Linux mais populares, conhecida por sua facilidade de uso.',
        rating: 4.5
      },
      {
        id: 2,
        name: 'Debian',
        version: '11 Bullseye',
        category: 'server',
        description: 'Conhecida por sua estabilidade e segurança, é uma excelente escolha para servidores.',
        rating: 4.7
      },
      {
        id: 3,
        name: 'Fedora',
        version: '37',
        category: 'desktop',
        description: 'Distribuição patrocinada pela Red Hat, focada em software livre e inovação.',
        rating: 4.3
      },
      {
        id: 4,
        name: 'Arch Linux',
        version: 'Rolling Release',
        category: 'desktop',
        description: 'Distribuição minimalista com atualizações contínuas e grande personalização.',
        rating: 4.6
      },
      {
        id: 5,
        name: 'Linux Mint',
        version: '21',
        category: 'desktop',
        description: 'Baseada no Ubuntu, com foco em usabilidade e interface amigável.',
        rating: 4.4
      },
      {
        id: 6,
        name: 'CentOS',
        version: 'Stream 9',
        category: 'server',
        description: 'Distribuição empresarial derivada do Red Hat Enterprise Linux.',
        rating: 4.2
      },
      {
        id: 7,
        name: 'Lubuntu',
        version: '22.04 LTS',
        category: 'lightweight',
        description: 'Versão leve do Ubuntu, ideal para computadores antigos.',
        rating: 4.0
      },
      {
        id: 8,
        name: 'openSUSE',
        version: 'Leap 15.4',
        category: 'desktop',
        description: 'Distribuição versátil com ferramentas de administração avançadas.',
        rating: 4.1
      }
    ]
  }

  static getDistributionById(id: number): Distribution | undefined {
    return this.getMockDistributions().find(distro => distro.id === id)
  }
}
export interface AgentTask {
  id: string
  title: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'error'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface AgentManager {
  id: string
  name: string
  email: string
  role: string
  department: string
  avatar?: string
}

export interface AgentConfig {
  id: string
  key: string
  value: string | number | boolean
  description: string
  type: 'string' | 'number' | 'boolean' | 'select'
  options?: string[]
}

export interface AgentPerformance {
  quality: number
  accuracy: number
  speed: number
  reliability: number
  uptime: number
  lastUpdate: string
}

export interface AIAgent {
  id: string
  name: string
  description: string
  type: 'content' | 'analysis' | 'research' | 'technical' | 'outreach' | 'social'
  status: 'active' | 'training' | 'inactive' | 'error'
  manager: AgentManager
  tasks: AgentTask[]
  config: AgentConfig[]
  performance: AgentPerformance
  capabilities: string[]
  createdAt: string
  updatedAt: string
}

export const preconfiguredAgents: AIAgent[] = [
  {
    id: '1',
    name: 'Content Writer Pro',
    description: 'Agente especializado em criação de conteúdo SEO otimizado',
    type: 'content',
    status: 'active',
    manager: {
      id: 'm1',
      name: 'Ana Silva',
      email: 'ana.silva@agencia.com',
      role: 'Gerente de Conteúdo',
      department: 'Marketing'
    },
    tasks: [
      {
        id: 't1',
        title: 'Criar artigo sobre tendências SEO 2024',
        description: 'Desenvolver artigo completo com 2000 palavras sobre as principais tendências de SEO para 2024',
        status: 'running',
        priority: 'high',
        dueDate: '2024-08-15',
        createdAt: '2024-08-14T10:00:00Z',
        updatedAt: '2024-08-14T10:30:00Z'
      },
      {
        id: 't2',
        title: 'Otimizar conteúdo existente',
        description: 'Revisar e otimizar 10 artigos existentes para melhor performance SEO',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-08-14T09:00:00Z',
        updatedAt: '2024-08-14T09:00:00Z'
      },
      {
        id: 't3',
        title: 'Gerar meta descriptions',
        description: 'Criar meta descriptions otimizadas para 50 páginas do site',
        status: 'pending',
        priority: 'low',
        createdAt: '2024-08-14T08:00:00Z',
        updatedAt: '2024-08-14T08:00:00Z'
      }
    ],
    config: [
      {
        id: 'c1',
        key: 'temperature',
        value: 0.7,
        description: 'Nível de criatividade do conteúdo',
        type: 'number'
      },
      {
        id: 'c2',
        key: 'model',
        value: 'gpt-4',
        description: 'Modelo de linguagem utilizado',
        type: 'string'
      },
      {
        id: 'c3',
        key: 'language',
        value: 'pt-BR',
        description: 'Idioma principal do conteúdo',
        type: 'string'
      },
      {
        id: 'c4',
        key: 'maxLength',
        value: 3000,
        description: 'Comprimento máximo do conteúdo',
        type: 'number'
      }
    ],
    performance: {
      quality: 92,
      accuracy: 94,
      speed: 88,
      reliability: 96,
      uptime: 99,
      lastUpdate: '2024-08-14T10:30:00Z'
    },
    capabilities: [
      'Criação de artigos SEO',
      'Otimização de conteúdo',
      'Meta descriptions',
      'Headlines otimizadas',
      'Conteúdo para blog',
      'Landing pages'
    ],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-14T10:30:00Z'
  },
  {
    id: '2',
    name: 'SEO Analyst Expert',
    description: 'Especialista em análise técnica e estratégica de SEO',
    type: 'analysis',
    status: 'active',
    manager: {
      id: 'm2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@agencia.com',
      role: 'Gerente de SEO',
      department: 'SEO'
    },
    tasks: [
      {
        id: 't4',
        title: 'Auditoria SEO completa',
        description: 'Realizar auditoria completa do site identificando problemas técnicos e oportunidades',
        status: 'running',
        priority: 'high',
        dueDate: '2024-08-16',
        createdAt: '2024-08-14T11:00:00Z',
        updatedAt: '2024-08-14T11:15:00Z'
      },
      {
        id: 't5',
        title: 'Analisar concorrência',
        description: 'Analisar estratégias SEO dos 5 principais concorrentes',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-08-14T10:00:00Z',
        updatedAt: '2024-08-14T10:00:00Z'
      },
      {
        id: 't6',
        title: 'Monitorar rankings',
        description: 'Monitorar diariamente as posições das palavras-chave principais',
        status: 'pending',
        priority: 'high',
        createdAt: '2024-08-14T09:30:00Z',
        updatedAt: '2024-08-14T09:30:00Z'
      }
    ],
    config: [
      {
        id: 'c5',
        key: 'temperature',
        value: 0.3,
        description: 'Nível de precisão analítica',
        type: 'number'
      },
      {
        id: 'c6',
        key: 'model',
        value: 'gpt-4',
        description: 'Modelo de linguagem utilizado',
        type: 'string'
      },
      {
        id: 'c7',
        key: 'focus',
        value: 'technical',
        description: 'Foco da análise',
        type: 'select',
        options: ['technical', 'strategic', 'competitive']
      },
      {
        id: 'c8',
        key: 'depth',
        value: 'deep',
        description: 'Profundidade da análise',
        type: 'select',
        options: ['basic', 'standard', 'deep']
      }
    ],
    performance: {
      quality: 95,
      accuracy: 97,
      speed: 85,
      reliability: 98,
      uptime: 99,
      lastUpdate: '2024-08-14T11:15:00Z'
    },
    capabilities: [
      'Auditoria SEO técnica',
      'Análise de concorrência',
      'Monitoramento de rankings',
      'Análise de backlinks',
      'Relatórios de performance',
      'Recomendações estratégicas'
    ],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-14T11:15:00Z'
  },
  {
    id: '3',
    name: 'Keyword Research Master',
    description: 'Mestre em pesquisa e análise de palavras-chave',
    type: 'research',
    status: 'active',
    manager: {
      id: 'm3',
      name: 'Mariana Santos',
      email: 'mariana.santos@agencia.com',
      role: 'Especialista em Palavras-Chave',
      department: 'SEO'
    },
    tasks: [
      {
        id: 't7',
        title: 'Pesquisar palavras-chave para e-commerce',
        description: 'Identificar 100 palavras-chave de alto potencial para loja virtual',
        status: 'running',
        priority: 'high',
        dueDate: '2024-08-17',
        createdAt: '2024-08-14T12:00:00Z',
        updatedAt: '2024-08-14T12:20:00Z'
      },
      {
        id: 't8',
        title: 'Analisar intenção de busca',
        description: 'Classificar palavras-chave por intenção de busca (informacional, comercial, etc)',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-08-14T11:00:00Z',
        updatedAt: '2024-08-14T11:00:00Z'
      },
      {
        id: 't9',
        title: 'Monitorar tendências',
        description: 'Monitorar tendências de busca e identificar oportunidades emergentes',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-08-14T10:30:00Z',
        updatedAt: '2024-08-14T10:30:00Z'
      }
    ],
    config: [
      {
        id: 'c9',
        key: 'temperature',
        value: 0.5,
        description: 'Nível de criatividade na pesquisa',
        type: 'number'
      },
      {
        id: 'c10',
        key: 'focus',
        value: 'volume_competition',
        description: 'Foco da pesquisa',
        type: 'select',
        options: ['volume', 'competition', 'volume_competition', 'trends']
      },
      {
        id: 'c11',
        key: 'maxResults',
        value: 100,
        description: 'Número máximo de resultados',
        type: 'number'
      },
      {
        id: 'c12',
        key: 'includeLongTail',
        value: true,
        description: 'Incluir palavras-chave de cauda longa',
        type: 'boolean'
      }
    ],
    performance: {
      quality: 88,
      accuracy: 91,
      speed: 90,
      reliability: 94,
      uptime: 98,
      lastUpdate: '2024-08-14T12:20:00Z'
    },
    capabilities: [
      'Pesquisa de palavras-chave',
      'Análise de volume e concorrência',
      'Intenção de busca',
      'Tendências de pesquisa',
      'Palavras-chave de cauda longa',
      'Oportunidades de mercado'
    ],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-14T12:20:00Z'
  },
  {
    id: '4',
    name: 'Technical SEO Specialist',
    description: 'Especialista em otimização técnica de SEO',
    type: 'technical',
    status: 'training',
    manager: {
      id: 'm4',
      name: 'Roberto Ferreira',
      email: 'roberto.ferreira@agencia.com',
      role: 'Especialista em SEO Técnico',
      department: 'SEO'
    },
    tasks: [
      {
        id: 't10',
        title: 'Otimizar Core Web Vitals',
        description: 'Otimizar métricas Core Web Vitals para melhorar experiência do usuário',
        status: 'running',
        priority: 'high',
        dueDate: '2024-08-18',
        createdAt: '2024-08-14T13:00:00Z',
        updatedAt: '2024-08-14T13:10:00Z'
      },
      {
        id: 't11',
        title: 'Verificar schema markup',
        description: 'Implementar e verificar schema markup em todas as páginas importantes',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-08-14T12:00:00Z',
        updatedAt: '2024-08-14T12:00:00Z'
      },
      {
        id: 't12',
        title: 'Otimizar imagens',
        description: 'Otimizar todas as imagens do site para melhor performance e SEO',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-08-14T11:30:00Z',
        updatedAt: '2024-08-14T11:30:00Z'
      }
    ],
    config: [
      {
        id: 'c13',
        key: 'temperature',
        value: 0.2,
        description: 'Nível de precisão técnica',
        type: 'number'
      },
      {
        id: 'c14',
        key: 'focus',
        value: 'performance',
        description: 'Foco da otimização',
        type: 'select',
        options: ['performance', 'structure', 'indexing', 'security']
      },
      {
        id: 'c15',
        key: 'autoFix',
        value: true,
        description: 'Correção automática de problemas',
        type: 'boolean'
      },
      {
        id: 'c16',
        key: 'monitoring',
        value: 'continuous',
        description: 'Tipo de monitoramento',
        type: 'select',
        options: ['continuous', 'daily', 'weekly']
      }
    ],
    performance: {
      quality: 94,
      accuracy: 96,
      speed: 87,
      reliability: 95,
      uptime: 97,
      lastUpdate: '2024-08-14T13:10:00Z'
    },
    capabilities: [
      'Core Web Vitals',
      'Schema markup',
      'Otimização de imagens',
      'Velocidade de carregamento',
      'Indexação',
      'Segurança técnica'
    ],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-14T13:10:00Z'
  },
  {
    id: '5',
    name: 'Link Builder Pro',
    description: 'Especialista em construção de links e outreach',
    type: 'outreach',
    status: 'active',
    manager: {
      id: 'm5',
      name: 'Patricia Lima',
      email: 'patricia.lima@agencia.com',
      role: 'Gerente de Link Building',
      department: 'SEO'
    },
    tasks: [
      {
        id: 't13',
        title: 'Identificar oportunidades de backlinks',
        description: 'Encontrar 50 oportunidades de backlinks de alta qualidade',
        status: 'running',
        priority: 'high',
        dueDate: '2024-08-20',
        createdAt: '2024-08-14T14:00:00Z',
        updatedAt: '2024-08-14T14:15:00Z'
      },
      {
        id: 't14',
        title: 'Enviar emails de outreach',
        description: 'Enviar emails personalizados para 100 potenciais parceiros',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-08-14T13:00:00Z',
        updatedAt: '2024-08-14T13:00:00Z'
      },
      {
        id: 't15',
        title: 'Monitorar menções da marca',
        description: 'Monitorar menções da marca e oportunidades de link não solicitadas',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-08-14T12:30:00Z',
        updatedAt: '2024-08-14T12:30:00Z'
      }
    ],
    config: [
      {
        id: 'c17',
        key: 'temperature',
        value: 0.6,
        description: 'Nível de personalização na comunicação',
        type: 'number'
      },
      {
        id: 'c18',
        key: 'focus',
        value: 'relationships',
        description: 'Foco da estratégia',
        type: 'select',
        options: ['relationships', 'quality', 'quantity', 'diversity']
      },
      {
        id: 'c19',
        key: 'autoOutreach',
        value: false,
        description: 'Envio automático de emails',
        type: 'boolean'
      },
      {
        id: 'c20',
        key: 'minDA',
        value: 30,
        description: 'Domain Authority mínimo',
        type: 'number'
      }
    ],
    performance: {
      quality: 91,
      accuracy: 89,
      speed: 83,
      reliability: 92,
      uptime: 96,
      lastUpdate: '2024-08-14T14:15:00Z'
    },
    capabilities: [
      'Identificação de oportunidades',
      'Outreach personalizado',
      'Monitoramento de backlinks',
      'Análise de concorrentes',
      'Relacionamentos',
      'Relatórios de link building'
    ],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-14T14:15:00Z'
  },
  {
    id: '6',
    name: 'Social Media AI',
    description: 'Agente inteligente para gestão de redes sociais',
    type: 'social',
    status: 'active',
    manager: {
      id: 'm6',
      name: 'Fernanda Costa',
      email: 'fernanda.costa@agencia.com',
      role: 'Gerente de Redes Sociais',
      department: 'Marketing'
    },
    tasks: [
      {
        id: 't16',
        title: 'Criar conteúdo para Instagram',
        description: 'Criar 30 posts para Instagram com foco em engajamento',
        status: 'running',
        priority: 'high',
        dueDate: '2024-08-19',
        createdAt: '2024-08-14T15:00:00Z',
        updatedAt: '2024-08-14T15:20:00Z'
      },
      {
        id: 't17',
        title: 'Analisar engajamento',
        description: 'Analisar métricas de engajamento e sugerir melhorias',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-08-14T14:00:00Z',
        updatedAt: '2024-08-14T14:00:00Z'
      },
      {
        id: 't18',
        title: 'Agendar publicações',
        description: 'Agendar publicações para toda a semana',
        status: 'pending',
        priority: 'high',
        createdAt: '2024-08-14T13:30:00Z',
        updatedAt: '2024-08-14T13:30:00Z'
      }
    ],
    config: [
      {
        id: 'c21',
        key: 'temperature',
        value: 0.8,
        description: 'Nível de criatividade e casualidade',
        type: 'number'
      },
      {
        id: 'c22',
        key: 'style',
        value: 'casual',
        description: 'Estilo de comunicação',
        type: 'select',
        options: ['casual', 'professional', 'mixed', 'brand_voice']
      },
      {
        id: 'c23',
        key: 'focus',
        value: 'engagement',
        description: 'Foco principal',
        type: 'select',
        options: ['engagement', 'awareness', 'conversion', 'community']
      },
      {
        id: 'c24',
        key: 'platforms',
        value: ['instagram', 'facebook', 'linkedin', 'twitter'],
        description: 'Plataformas ativas',
        type: 'string'
      }
    ],
    performance: {
      quality: 89,
      accuracy: 87,
      speed: 91,
      reliability: 93,
      uptime: 95,
      lastUpdate: '2024-08-14T15:20:00Z'
    },
    capabilities: [
      'Criação de conteúdo',
      'Análise de engajamento',
      'Agendamento',
      'Monitoramento de métricas',
      'Respostas automáticas',
      'Tendências de mercado'
    ],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-14T15:20:00Z'
  }
]
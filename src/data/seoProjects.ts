export interface SEOProjectTask {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface SEOProjectMetric {
  id: string
  name: string
  value: number
  target: number
  unit: string
  change: number
  changeType: 'positive' | 'negative'
}

export interface SEOProject {
  id: string
  name: string
  description: string
  client: string
  website: string
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  startDate: string
  endDate?: string
  budget: number
  spent: number
  manager: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  team: {
    id: string
    name: string
    role: string
  }[]
  tasks: SEOProjectTask[]
  metrics: SEOProjectMetric[]
  keywords: {
    keyword: string
    position: number
    volume: number
    difficulty: number
  }[]
  tags: string[]
  createdAt: string
  updatedAt: string
}

export const seoProjects: SEOProject[] = [
  {
    id: '1',
    name: 'E-commerce Fashion Store',
    description: 'Projeto completo de SEO para loja de moda online com foco em tráfego orgânico e conversões',
    client: 'Fashion Store Ltda',
    website: 'https://fashionstore.com.br',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-15',
    endDate: '2024-12-15',
    budget: 50000,
    spent: 32500,
    manager: {
      id: 'm1',
      name: 'Ana Silva',
      email: 'ana.silva@agencia.com'
    },
    team: [
      { id: 't1', name: 'Carlos Oliveira', role: 'SEO Specialist' },
      { id: 't2', name: 'Mariana Santos', role: 'Content Writer' },
      { id: 't3', name: 'Roberto Ferreira', role: 'Technical SEO' }
    ],
    tasks: [
      {
        id: 'task1',
        title: 'Auditoria SEO completa',
        description: 'Realizar auditoria completa do site identificando problemas técnicos',
        status: 'completed',
        priority: 'high',
        assignedTo: 'Carlos Oliveira',
        dueDate: '2024-02-01',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-02-01T15:00:00Z'
      },
      {
        id: 'task2',
        title: 'Otimização de páginas de produto',
        description: 'Otimizar meta tags e conteúdo das 50 principais páginas de produto',
        status: 'in_progress',
        priority: 'high',
        assignedTo: 'Mariana Santos',
        dueDate: '2024-03-15',
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-15T14:00:00Z'
      },
      {
        id: 'task3',
        title: 'Melhorar Core Web Vitals',
        description: 'Otimizar velocidade de carregamento e métricas de experiência do usuário',
        status: 'pending',
        priority: 'medium',
        assignedTo: 'Roberto Ferreira',
        dueDate: '2024-04-01',
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z'
      }
    ],
    metrics: [
      {
        id: 'metric1',
        name: 'Tráfego Orgânico',
        value: 45230,
        target: 60000,
        unit: 'visitas',
        change: 23.5,
        changeType: 'positive'
      },
      {
        id: 'metric2',
        name: 'Posição Média',
        value: 12.5,
        target: 8,
        unit: 'posição',
        change: -15.2,
        changeType: 'positive'
      },
      {
        id: 'metric3',
        name: 'Taxa de Conversão',
        value: 2.8,
        target: 3.5,
        unit: '%',
        change: 12.1,
        changeType: 'positive'
      },
      {
        id: 'metric4',
        name: 'Backlinks',
        value: 234,
        target: 500,
        unit: 'links',
        change: 45.2,
        changeType: 'positive'
      }
    ],
    keywords: [
      { keyword: 'vestido feminino', position: 3, volume: 12000, difficulty: 65 },
      { keyword: 'calça jeans feminina', position: 7, volume: 8900, difficulty: 58 },
      { keyword: 'blusa elegante', position: 12, volume: 5600, difficulty: 42 },
      { keyword: 'sapato feminino', position: 15, volume: 7800, difficulty: 71 },
      { keyword: 'moda feminina online', position: 8, volume: 9200, difficulty: 63 }
    ],
    tags: ['e-commerce', 'moda', 'varejo', 'alta prioridade'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-15T14:00:00Z'
  },
  {
    id: '2',
    name: 'Consultoria de Software B2B',
    description: 'SEO para empresa de consultoria de software com foco em geração de leads qualificados',
    client: 'TechSolutions Pro',
    website: 'https://techsolutions.com',
    status: 'active',
    priority: 'medium',
    startDate: '2024-02-01',
    budget: 35000,
    spent: 18500,
    manager: {
      id: 'm2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@agencia.com'
    },
    team: [
      { id: 't4', name: 'Patricia Lima', role: 'Link Builder' },
      { id: 't5', name: 'Fernanda Costa', role: 'Content Strategist' }
    ],
    tasks: [
      {
        id: 'task4',
        title: 'Pesquisa de palavras-chave B2B',
        description: 'Identificar palavras-chave de alto valor para o setor B2B',
        status: 'completed',
        priority: 'high',
        assignedTo: 'Patricia Lima',
        dueDate: '2024-02-15',
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-15T16:00:00Z'
      },
      {
        id: 'task5',
        title: 'Criar conteúdo para blog',
        description: 'Produzir 20 artigos especializados para o blog da empresa',
        status: 'in_progress',
        priority: 'medium',
        assignedTo: 'Fernanda Costa',
        dueDate: '2024-04-30',
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-03-01T11:00:00Z'
      }
    ],
    metrics: [
      {
        id: 'metric5',
        name: 'Leads Gerados',
        value: 156,
        target: 300,
        unit: 'leads',
        change: 67.8,
        changeType: 'positive'
      },
      {
        id: 'metric6',
        name: 'Tráfego Orgânico',
        value: 23450,
        target: 40000,
        unit: 'visitas',
        change: 34.2,
        changeType: 'positive'
      },
      {
        id: 'metric7',
        name: 'Custo por Lead',
        value: 118.59,
        target: 100,
        unit: 'R$',
        change: -12.3,
        changeType: 'positive'
      }
    ],
    keywords: [
      { keyword: 'consultoria de software', position: 5, volume: 3200, difficulty: 72 },
      { keyword: 'desenvolvimento de software', position: 9, volume: 5600, difficulty: 68 },
      { keyword: 'sistemas empresariais', position: 11, volume: 2100, difficulty: 58 },
      { keyword: 'software de gestão', position: 7, volume: 4300, difficulty: 65 }
    ],
    tags: ['B2B', 'software', 'consultoria', 'lead generation'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-01T11:00:00Z'
  },
  {
    id: '3',
    name: 'Clínica Médica Regional',
    description: 'SEO para clínica médica com foco em pacientes locais e agendamentos online',
    client: 'Clínica Saúde Total',
    website: 'https://clinicasaudetotal.com.br',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: 25000,
    spent: 19800,
    manager: {
      id: 'm3',
      name: 'Mariana Santos',
      email: 'mariana.santos@agencia.com'
    },
    team: [
      { id: 't6', name: 'Roberto Ferreira', role: 'Technical SEO' },
      { id: 't7', name: 'Ana Silva', role: 'Content Manager' }
    ],
    tasks: [
      {
        id: 'task6',
        title: 'Otimização Google My Business',
        description: 'Completar e otimizar perfil do Google My Business',
        status: 'completed',
        priority: 'high',
        assignedTo: 'Roberto Ferreira',
        dueDate: '2024-01-15',
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-15T12:00:00Z'
      },
      {
        id: 'task7',
        title: 'Criar páginas de especialidades',
        description: 'Desenvolver páginas otimizadas para cada especialidade médica',
        status: 'in_progress',
        priority: 'high',
        assignedTo: 'Ana Silva',
        dueDate: '2024-06-30',
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
      }
    ],
    metrics: [
      {
        id: 'metric8',
        name: 'Agendamentos Online',
        value: 89,
        target: 200,
        unit: 'agendamentos',
        change: 145.2,
        changeType: 'positive'
      },
      {
        id: 'metric9',
        name: 'Visitas à Página',
        value: 12450,
        target: 20000,
        unit: 'visitas',
        change: 78.9,
        changeType: 'positive'
      },
      {
        id: 'metric10',
        name: 'Posições Locais',
        value: 2.3,
        target: 1,
        unit: 'posição',
        change: -56.7,
        changeType: 'positive'
      }
    ],
    keywords: [
      { keyword: 'clínica médica', position: 1, volume: 8900, difficulty: 45 },
      { keyword: 'médico geral', position: 2, volume: 5600, difficulty: 38 },
      { keyword: 'consultório médico', position: 3, volume: 3400, difficulty: 32 },
      { keyword: 'agendamento médico online', position: 1, volume: 2300, difficulty: 28 }
    ],
    tags: ['saúde', 'local', 'médico', 'agendamento'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: '4',
    name: 'Restaurante Gourmet',
    description: 'SEO para restaurante gourmet com foco em reservas e delivery',
    client: 'Chef\'s Table Restaurant',
    website: 'https://chefstable.com',
    status: 'paused',
    priority: 'low',
    startDate: '2024-01-10',
    endDate: '2024-06-10',
    budget: 15000,
    spent: 7500,
    manager: {
      id: 'm4',
      name: 'Roberto Ferreira',
      email: 'roberto.ferreira@agencia.com'
    },
    team: [
      { id: 't8', name: 'Fernanda Costa', role: 'Social Media Manager' }
    ],
    tasks: [
      {
        id: 'task8',
        title: 'Otimização para delivery',
        description: 'Otimizar páginas para serviços de delivery',
        status: 'completed',
        priority: 'medium',
        assignedTo: 'Fernanda Costa',
        dueDate: '2024-02-01',
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-02-01T14:00:00Z'
      }
    ],
    metrics: [
      {
        id: 'metric11',
        name: 'Reservas Online',
        value: 234,
        target: 500,
        unit: 'reservas',
        change: 23.1,
        changeType: 'positive'
      },
      {
        id: 'metric12',
        name: 'Pedidos de Delivery',
        value: 567,
        target: 1000,
        unit: 'pedidos',
        change: 45.6,
        changeType: 'positive'
      }
    ],
    keywords: [
      { keyword: 'restaurante gourmet', position: 4, volume: 3400, difficulty: 52 },
      { keyword: 'melhor restaurante', position: 8, volume: 6700, difficulty: 61 },
      { keyword: 'delivery de comida', position: 12, volume: 8900, difficulty: 58 }
    ],
    tags: ['restaurante', 'food', 'delivery', 'local'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-02-01T14:00:00Z'
  }
]
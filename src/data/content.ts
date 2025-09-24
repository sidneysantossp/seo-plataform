export interface ContentAuthor {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

export interface ContentSEO {
  title: string
  description: string
  keywords: string[]
  readabilityScore: number
  seoScore: number
  wordCount: number
  readingTime: number
}

export interface ContentAnalytics {
  views: number
  uniqueVisitors: number
  averageTimeOnPage: number
  bounceRate: number
  socialShares: number
  backlinks: number
  conversionRate: number
}

export interface ContentVersion {
  id: string
  version: string
  title: string
  content: string
  author: ContentAuthor
  createdAt: string
  changes: string[]
}

export interface ContentItem {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  type: 'post' | 'page' | 'product' | 'category'
  status: 'draft' | 'published' | 'archived' | 'scheduled'
  author: ContentAuthor
  category: string
  tags: string[]
  featuredImage?: string
  seo: ContentSEO
  analytics: ContentAnalytics
  versions: ContentVersion[]
  projectId?: string
  publishedAt?: string
  scheduledAt?: string
  createdAt: string
  updatedAt: string
}

export const contentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Guia Completo de SEO para E-commerce em 2024',
    slug: 'guia-completo-seo-e-commerce-2024',
    content: `# Guia Completo de SEO para E-commerce em 2024

O SEO para e-commerce evoluiu significativamente nos últimos anos. Com as atualizações constantes do Google e as mudanças no comportamento do consumidor, é crucial que as lojas online se adaptem às novas tendências.

## O que mudou no SEO para E-commerce?

1. **Experiência do usuário (UX) como fator de classificação**
2. **Busca por voz e otimização para mobile**
3. **Conteúdo visual e busca por imagens**
4. **Inteligência artificial e machine learning**

## Estratégias Essenciais

### 1. Otimização de Páginas de Produto

Cada página de produto deve ser tratada como uma landing page única. Isso inclui:

- Títulos únicos e descritivos
- Descrições detalhadas com palavras-chave relevantes
- Imagens otimizadas com alt text
- Avaliações de clientes
- Perguntas frequentes

### 2. Conteúdo de Blog Estratégico

O blog continua sendo uma das ferramentas mais poderosas para atrair tráfego orgânico. Crie conteúdo que:

- Responda às dúvidas dos seus clientes
- Ajude na decisão de compra
- Posicione sua marca como autoridade
- Gere backlinks de qualidade

### 3. SEO Técnico

A base de qualquer estratégia de SEO bem-sucedida:

- Velocidade de carregamento
- Mobile-friendliness
- Estrutura de URL limpa
- Schema markup
- Segurança (HTTPS)

## Métricas para Monitorar

- Tráfego orgânico
- Taxa de conversão
- Posicionamento de palavras-chave
- Taxa de rejeição
- Tempo médio na página

## Conclusão

O SEO para e-commerce em 2024 requer uma abordagem holística que combina otimização técnica, conteúdo de qualidade e experiência excepcional do usuário.`,
    excerpt: 'Descubra as estratégias essenciais de SEO para e-commerce em 2024. Guia completo com técnicas atualizadas para aumentar seu tráfego orgânico e conversões.',
    type: 'post',
    status: 'published',
    author: {
      id: 'a1',
      name: 'Ana Silva',
      email: 'ana.silva@agencia.com',
      role: 'Gerente de Conteúdo'
    },
    category: 'SEO',
    tags: ['SEO', 'E-commerce', 'Marketing Digital', '2024'],
    featuredImage: '/images/seo-ecommerce-2024.jpg',
    seo: {
      title: 'Guia Completo de SEO para E-commerce em 2024 | Estratégias Atualizadas',
      description: 'Aprenda as melhores técnicas de SEO para e-commerce em 2024. Aumente seu tráfego orgânico e conversões com estratégias comprovadas.',
      keywords: ['seo e-commerce', 'marketing digital', 'otimização de sites', 'tráfego orgânico'],
      readabilityScore: 85,
      seoScore: 92,
      wordCount: 2450,
      readingTime: 12
    },
    analytics: {
      views: 15420,
      uniqueVisitors: 12350,
      averageTimeOnPage: 245,
      bounceRate: 32,
      socialShares: 156,
      backlinks: 23,
      conversionRate: 3.8
    },
    versions: [
      {
        id: 'v1',
        version: '1.0',
        title: 'Guia Completo de SEO para E-commerce em 2024',
        content: 'Versão inicial do conteúdo...',
        author: {
          id: 'a1',
          name: 'Ana Silva',
          email: 'ana.silva@agencia.com',
          role: 'Gerente de Conteúdo'
        },
        createdAt: '2024-01-15T10:00:00Z',
        changes: ['Criação do artigo', 'Adição de estratégias principais']
      }
    ],
    projectId: '1',
    publishedAt: '2024-01-15T14:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T14:00:00Z'
  },
  {
    id: '2',
    title: 'Como Aumentar a Velocidade do Seu Site WordPress',
    slug: 'aumentar-velocidade-site-wordpress',
    content: `# Como Aumentar a Velocidade do Seu Site WordPress

A velocidade do site é um dos fatores mais importantes para o sucesso online. Sites rápidos proporcionam melhor experiência ao usuário, têm melhor classificação nos mecanismos de busca e convertem mais.

## Por que a Velocidade é Importante?

1. **Experiência do usuário**: 53% dos usuários abandonam sites que demoram mais de 3 segundos para carregar
2. **SEO**: Google usa a velocidade como fator de classificação
3. **Conversões**: Cada segundo de melhoria pode aumentar as conversões em até 7%

## Ferramentas para Medir a Velocidade

- Google PageSpeed Insights
- GTmetrix
- Pingdom
- WebPageTest

## Técnicas de Otimização

### 1. Otimização de Imagens

- Comprimir imagens sem perder qualidade
- Usar formatos modernos (WebP, AVIF)
- Implementar lazy loading
- Especificar dimensões das imagens

### 2. Cache e CDN

- Configurar cache do navegador
- Usar plugins de cache
- Implementar CDN
- Otimizar cache de banco de dados

### 3. Otimização de Código

- Minificar CSS, JavaScript e HTML
- Remover código desnecessário
- Otimizar consultas ao banco de dados
- Usar lazy loading para scripts

## Plugins Recomendados

1. **WP Rocket**: Melhor plugin de cache premium
2. **W3 Total Cache**: Alternativa gratuita robusta
3. **Smush**: Otimização de imagens
4. **Autoptimize**: Minificação de código

## Monitoramento Contínuo

A velocidade do site não é um projeto único, mas um processo contínuo. Monitore regularmente e faça ajustes conforme necessário.

## Conclusão

Aumentar a velocidade do seu site WordPress é essencial para o sucesso online. Com as técnicas certas e monitoramento constante, você pode proporcionar uma experiência excepcional aos seus usuários.`,
    excerpt: 'Aprenda a aumentar a velocidade do seu site WordPress com técnicas comprovadas. Guia completo com ferramentas, plugins e melhores práticas.',
    type: 'post',
    status: 'published',
    author: {
      id: 'a2',
      name: 'Roberto Ferreira',
      email: 'roberto.ferreira@agencia.com',
      role: 'Especialista em SEO Técnico'
    },
    category: 'WordPress',
    tags: ['WordPress', 'Velocidade', 'Performance', 'Otimização'],
    featuredImage: '/images/wordpress-speed.jpg',
    seo: {
      title: 'Como Aumentar a Velocidade do Seu Site WordPress | Guia Completo',
      description: 'Descubra como aumentar a velocidade do seu site WordPress com técnicas comprovadas. Melhore a experiência do usuário e seu SEO.',
      keywords: ['velocidade site', 'wordpress', 'performance', 'otimização'],
      readabilityScore: 78,
      seoScore: 88,
      wordCount: 1890,
      readingTime: 9
    },
    analytics: {
      views: 12340,
      uniqueVisitors: 9870,
      averageTimeOnPage: 198,
      bounceRate: 28,
      socialShares: 89,
      backlinks: 15,
      conversionRate: 2.4
    },
    versions: [
      {
        id: 'v2',
        version: '1.0',
        title: 'Como Aumentar a Velocidade do Seu Site WordPress',
        content: 'Versão inicial do conteúdo...',
        author: {
          id: 'a2',
          name: 'Roberto Ferreira',
          email: 'roberto.ferreira@agencia.com',
          role: 'Especialista em SEO Técnico'
        },
        createdAt: '2024-01-20T09:00:00Z',
        changes: ['Criação do artigo', 'Adição de técnicas de otimização']
      }
    ],
    projectId: '1',
    publishedAt: '2024-01-20T15:00:00Z',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-20T15:00:00Z'
  },
  {
    id: '3',
    title: 'Estratégias de Link Building para 2024',
    slug: 'estrategias-link-building-2024',
    content: `# Estratégias de Link Building para 2024

O link building continua sendo um dos fatores mais importantes para o SEO, mas as estratégias evoluíram. Em 2024, a qualidade e relevância são mais importantes do que a quantidade.

## O que Mudou no Link Building?

1. **Foco em qualidade sobre quantidade**
2. **Relevância contextual**
3. **Autoridade da marca**
4. **Experiência do usuário**

## Estratégias Eficazes

### 1. Content Marketing

Crie conteúdo que naturalmente atraia links:

- Estudos originais e pesquisas
- Guias completos e tutoriais
- Infográficos e conteúdo visual
- Ferramentas e calculadoras

### 2. Outreach Estratégico

- Identifique sites relevantes
- Personalize seus emails
- Ofereça valor real
- Construa relacionamentos

### 3. Link Building Local

- Diretórios locais de qualidade
- Patrocínios e eventos
    - Parcerias com empresas locais
- Menções na imprensa local

## Métricas para Avaliar

- Domain Authority (DA)
- Page Authority (PA)
- Relevância do conteúdo
- Tráfego do site
- Posicionamento nos mecanismos

## Ferramentas Recomendadas

- Ahrefs
- SEMrush
- Moz Link Explorer
- Majestic

## Cuidados a Tomar

- Evite comprar links
- Não participe de esquemas de troca de links
- Fuja de links de baixa qualidade
- Monitore seu perfil de links regularmente

## Conclusão

O link building em 2024 requer uma abordagem estratégica focada em qualidade e relevância. Construa links que realmente adicionem valor aos usuários.`,
    excerpt: 'Descubra as melhores estratégias de link building para 2024. Aprenda a construir backlinks de qualidade e melhorar seu SEO com técnicas atualizadas.',
    type: 'post',
    status: 'published',
    author: {
      id: 'a3',
      name: 'Patricia Lima',
      email: 'patricia.lima@agencia.com',
      role: 'Gerente de Link Building'
    },
    category: 'Link Building',
    tags: ['Link Building', 'SEO', 'Backlinks', 'Marketing Digital'],
    featuredImage: '/images/link-building-2024.jpg',
    seo: {
      title: 'Estratégias de Link Building para 2024 | Guia Completo',
      description: 'Aprenda as melhores estratégias de link building para 2024. Construa backlinks de qualidade e melhore seu posicionamento nos mecanismos de busca.',
      keywords: ['link building', 'backlinks', 'seo', 'estratégias'],
      readabilityScore: 82,
      seoScore: 90,
      wordCount: 2150,
      readingTime: 11
    },
    analytics: {
      views: 9870,
      uniqueVisitors: 7650,
      averageTimeOnPage: 267,
      bounceRate: 25,
      socialShares: 134,
      backlinks: 31,
      conversionRate: 4.2
    },
    versions: [
      {
        id: 'v3',
        version: '1.0',
        title: 'Estratégias de Link Building para 2024',
        content: 'Versão inicial do conteúdo...',
        author: {
          id: 'a3',
          name: 'Patricia Lima',
          email: 'patricia.lima@agencia.com',
          role: 'Gerente de Link Building'
        },
        createdAt: '2024-01-25T11:00:00Z',
        changes: ['Criação do artigo', 'Adição de estratégias modernas']
      }
    ],
    projectId: '2',
    publishedAt: '2024-01-25T16:00:00Z',
    createdAt: '2024-01-25T11:00:00Z',
    updatedAt: '2024-01-25T16:00:00Z'
  },
  {
    id: '4',
    title: 'Otimização para Busca Local: Guia Completo',
    slug: 'otimizacao-busca-local-guia-completo',
    content: `# Otimização para Busca Local: Guia Completo

A busca local é essencial para empresas que atendem clientes em regiões geográficas específicas. Com o aumento das buscas "perto de mim", otimizar para busca local tornou-se crucial.

## Por que a Busca Local é Importante?

- 46% de todas as buscas no Google têm intenção local
- 88% de buscas "perto de mim" resultam em visita ou ligação em 24 horas
- 78% de buscas locais em mobile resultam em compras offline

## Otimização do Google My Business

### 1. Configuração Completa

- Preencha todas as informações do perfil
- Use categorias relevantes
- Adicione fotos de qualidade
- Obtenha avaliações positivas

### 2. Posts e Atualizações

- Compartilhe novidades regularmente
- Ofereça cupons e promoções
- Responda a perguntas e avaliações
- Use o Google Posts para conteúdo

## Otimização On-Page

### 1. Páginas de Serviço

- Crie páginas dedicadas para cada serviço
- Inclua informações de contato local
- Use schema markup para endereço
- Otimize para palavras-chave locais

### 2. Conteúdo Local

- Escreva sobre eventos locais
- Crie guias locais
- Destaque casos de sucesso locais
- Inclua depoimentos de clientes locais

## Construção de Citations

### O que são Citations?

Citations são menções do nome, endereço e telefone (NAP) da sua empresa em outros sites.

### Tipos de Citations

- **Estruturadas**: Diretórios de empresas
- **Não estruturadas**: Menções em blogs, notícias

### Principais Diretórios

- Google My Business
- Facebook Business
- Yelp
- Foursquare
- Diretórios locais específicos

## Reviews e Avaliações

### Importância das Reviews

- 91% dos consumidores leem reviews antes de comprar
- 84% confiam em reviews tanto quanto em recomendações pessoais
- Reviews positivas melhoram o ranking local

### Estratégias para Obter Reviews

- Peça ativamente aos clientes
- Facilite o processo de review
- Responda a todos os reviews
- Use reviews em seu marketing

## Monitoramento e Análise

### Métricas Importantes

- Visualizações no Google My Business
- Cliques para o site
- Chamadas telefônicas
- Solicitações de direções
- Avaliações e classificação

### Ferramentas

- Google My Business Insights
- Google Analytics
- Google Search Console
- Ferramentas de monitoramento de reviews

## Conclusão

A otimização para busca local é um processo contínuo que requer atenção constante e adaptação às novas tendências. Com as estratégias certas, sua empresa pode dominar os resultados de busca local.`,
    excerpt: 'Guia completo de otimização para busca local. Aprenda a melhorar seu posicionamento nos resultados locais e atrair mais clientes da sua região.',
    type: 'post',
    status: 'published',
    author: {
      id: 'a4',
      name: 'Mariana Santos',
      email: 'mariana.santos@agencia.com',
      role: 'Especialista em Palavras-Chave'
    },
    category: 'SEO Local',
    tags: ['SEO Local', 'Google My Business', 'Marketing Local', 'Busca Local'],
    featuredImage: '/images/seo-local-guia.jpg',
    seo: {
      title: 'Otimização para Busca Local: Guia Completo | SEO Local',
      description: 'Guia completo de otimização para busca local. Aprenda a dominar os resultados de busca local e atrair mais clientes da sua região.',
      keywords: ['seo local', 'google my business', 'busca local', 'marketing local'],
      readabilityScore: 86,
      seoScore: 94,
      wordCount: 2680,
      readingTime: 13
    },
    analytics: {
      views: 18760,
      uniqueVisitors: 15420,
      averageTimeOnPage: 312,
      bounceRate: 22,
      socialShares: 198,
      backlinks: 42,
      conversionRate: 5.1
    },
    versions: [
      {
        id: 'v4',
        version: '1.0',
        title: 'Otimização para Busca Local: Guia Completo',
        content: 'Versão inicial do conteúdo...',
        author: {
          id: 'a4',
          name: 'Mariana Santos',
          email: 'mariana.santos@agencia.com',
          role: 'Especialista em Palavras-Chave'
        },
        createdAt: '2024-01-30T08:00:00Z',
        changes: ['Criação do artigo', 'Adição de estratégias locais']
      }
    ],
    projectId: '3',
    publishedAt: '2024-01-30T17:00:00Z',
    createdAt: '2024-01-30T08:00:00Z',
    updatedAt: '2024-01-30T17:00:00Z'
  },
  {
    id: '5',
    title: 'Marketing de Conteúdo para Redes Sociais em 2024',
    slug: 'marketing-conteudo-redes-sociais-2024',
    content: `# Marketing de Conteúdo para Redes Sociais em 2024

O marketing de conteúdo para redes sociais evoluiu rapidamente. Em 2024, a autenticidade, valor e engajamento são mais importantes do que nunca.

## Tendências para 2024

1. **Conteúdo de curta duração**: Reels, TikToks, Shorts
2. **Autenticidade**: Conteúdo real e transparente
3. **Comunidade**: Construção de comunidades engajadas
4. **Interação**: Foco em conversas e relacionamentos

## Estratégias por Plataforma

### Instagram

- **Reels**: Conteúdo educativo e entretenimento
- **Stories**: Conteúdo efêmero e interativo
- **Posts**: Conteúdo evergreen e de valor
- **IGTV**: Conteúdo longo e educacional

### Facebook

- **Grupos**: Construção de comunidade
- **Página**: Conteúdo institucional
- **Anúncios**: Segmentação precisa
- **Live**: Transmissões ao vivo

### LinkedIn

- **Artigos**: Conteúdo profissional e educacional
- **Posts**: Atualizações e insights
- **Vídeos**: Conteúdo profissional em vídeo
- **Documentos**: Compartilhamento de conhecimento

### Twitter/X

- **Threads**: Conteúdo sequencial
- **Vídeos**: Conteúdo rápido e impactante
- **Polls**: Interação e engajamento
- **Retweets**: Compartilhamento estratégico

## Criação de Conteúdo

### 1. Planejamento

- Defina objetivos claros
- Conheça seu público
- Escolha as plataformas certas
- Crie um calendário editorial

### 2. Produção

- Use templates e ferramentas
- Mantenha a identidade visual
- Otimize para cada plataforma
- Inclua call-to-actions claros

### 3. Distribuição

- Publique nos horários ideais
- Use hashtags relevantes
- Interaja com seguidores
- Analise o desempenho

## Métricas de Sucesso

### Engajamento
- Curtidas, comentários, compartilhamentos
- Taxa de engajamento
- Alcance orgânico

### Conversão
- Cliques no link
- Taxa de conversão
- Custo por aquisição

### Crescimento
- Novos seguidores
- Taxa de retenção
- Crescimento da comunidade

## Ferramentas Recomendadas

- **Canva**: Design gráfico
- **Buffer**: Agendamento de posts
- **Hootsuite**: Gestão de redes sociais
- **Later**: Planejamento visual
- **Sprout Social**: Análise e relatórios

## Dicas para Sucesso

1. **Seja consistente**: Mantenha uma frequência regular
2. **Seja autêntico**: Mostre a personalidade da marca
3. **Forneça valor**: Conteúdo que ajude seu público
4. **Interaja**: Responda a comentários e mensagens
5. **Analise**: Use dados para melhorar

## Conclusão

O marketing de conteúdo para redes sociais em 2024 requer uma abordagem estratégica focada em autenticidade e valor. Com as estratégias certas, você pode construir uma comunidade engajada e alcançar seus objetivos de negócio.`,
    excerpt: 'Descubra as melhores estratégias de marketing de conteúdo para redes sociais em 2024. Guia completo com tendências, plataformas e métricas de sucesso.',
    type: 'post',
    status: 'draft',
    author: {
      id: 'a5',
      name: 'Fernanda Costa',
      email: 'fernanda.costa@agencia.com',
      role: 'Gerente de Redes Sociais'
    },
    category: 'Redes Sociais',
    tags: ['Redes Sociais', 'Marketing Digital', 'Conteúdo', '2024'],
    featuredImage: '/images/social-media-2024.jpg',
    seo: {
      title: 'Marketing de Conteúdo para Redes Sociais em 2024 | Guia Completo',
      description: 'Aprenda as melhores estratégias de marketing de conteúdo para redes sociais em 2024. Tendências, plataformas e métricas de sucesso.',
      keywords: ['redes sociais', 'marketing digital', 'conteúdo', '2024'],
      readabilityScore: 80,
      seoScore: 86,
      wordCount: 2320,
      readingTime: 12
    },
    analytics: {
      views: 0,
      uniqueVisitors: 0,
      averageTimeOnPage: 0,
      bounceRate: 0,
      socialShares: 0,
      backlinks: 0,
      conversionRate: 0
    },
    versions: [
      {
        id: 'v5',
        version: '1.0',
        title: 'Marketing de Conteúdo para Redes Sociais em 2024',
        content: 'Versão inicial do conteúdo...',
        author: {
          id: 'a5',
          name: 'Fernanda Costa',
          email: 'fernanda.costa@agencia.com',
          role: 'Gerente de Redes Sociais'
        },
        createdAt: '2024-02-05T10:00:00Z',
        changes: ['Criação do rascunho', 'Estruturação do conteúdo']
      }
    ],
    projectId: '4',
    scheduledAt: '2024-02-15T10:00:00Z',
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z'
  }
]
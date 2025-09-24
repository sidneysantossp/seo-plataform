'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Globe,
  Target,
  Calendar,
  Star,
  Settings,
  RefreshCw,
  Download,
  Search,
  Eye,
  Click,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Minus
} from 'lucide-react'

// Dados de exemplo para detalhes da palavra-chave
const keywordDetails = {
  id: '1',
  keyword: 'agência de marketing digital',
  currentPosition: 3,
  previousPosition: 5,
  bestPosition: 2,
  volume: 2400,
  difficulty: 65,
  cpc: 8.50,
  url: 'https://exemplo.com/servicos',
  traffic: 450,
  ctr: 18.5,
  impressions: 2430,
  clicks: 450,
  lastUpdated: '2024-01-15',
  project: 'E-commerce',
  status: 'active',
  tags: ['principal', 'serviços', 'alto-volume'],
  history: [
    { date: '2024-01-15', position: 3, volume: 2400, traffic: 450 },
    { date: '2024-01-08', position: 5, volume: 2350, traffic: 380 },
    { date: '2024-01-01', position: 6, volume: 2300, traffic: 320 },
    { date: '2023-12-25', position: 8, volume: 2250, traffic: 280 },
    { date: '2023-12-18', position: 7, volume: 2200, traffic: 310 }
  ],
  competitors: [
    { domain: 'concorrente1.com', position: 1, url: 'https://concorrente1.com/marketing-digital' },
    { domain: 'concorrente2.com', position: 2, url: 'https://concorrente2.com/agencia-marketing' },
    { domain: 'nosso-site.com', position: 3, url: 'https://exemplo.com/servicos' },
    { domain: 'concorrente3.com', position: 4, url: 'https://concorrente3.com/marketing' },
    { domain: 'concorrente4.com', position: 5, url: 'https://concorrente4.com/digital' }
  ],
  suggestions: [
    { keyword: 'agência marketing digital sp', volume: 880, difficulty: 58 },
    { keyword: 'marketing digital para empresas', volume: 1200, difficulty: 62 },
    { keyword: 'agência de marketing digital preço', volume: 650, difficulty: 45 },
    { keyword: 'melhor agência de marketing digital', volume: 980, difficulty: 71 },
    { keyword: 'agência de marketing digital orçamento', volume: 420, difficulty: 38 }
  ]
}

export default function KeywordDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [keyword, setKeyword] = useState(keywordDetails)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [params.id])

  const getChangeIcon = (current: number, previous: number) => {
    if (current < previous) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (current > previous) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }

  const getChangeColor = (current: number, previous: number) => {
    if (current < previous) return 'text-green-600 bg-green-50'
    if (current > previous) return 'text-red-600 bg-red-50'
    return 'text-gray-600 bg-gray-50'
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'bg-green-100 text-green-800'
    if (difficulty <= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 30) return 'Fácil'
    if (difficulty <= 60) return 'Médio'
    return 'Difícil'
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{keyword.keyword}</h1>
            <p className="text-muted-foreground">
              Projeto: {keyword.project} • Atualizado em {new Date(keyword.lastUpdated).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Dados
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posição Atual</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{keyword.currentPosition}</div>
            <div className="flex items-center gap-1 mt-1">
              {getChangeIcon(keyword.currentPosition, keyword.previousPosition)}
              <span className="text-sm text-muted-foreground">
                {keyword.currentPosition < keyword.previousPosition ? 'Melhorou' : 'Piorou'} 
                ({Math.abs(keyword.currentPosition - keyword.previousPosition)} posições)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume de Busca</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keyword.volume.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">Buscas mensais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tráfego</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keyword.traffic}</div>
            <p className="text-xs text-muted-foreground">Visitantes/mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTR</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keyword.ctr}%</div>
            <p className="text-xs text-muted-foreground">Taxa de cliques</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="competitors">Concorrentes</TabsTrigger>
          <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Keyword Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Informações da Palavra-Chave
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">URL de Destino</label>
                    <a href={keyword.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      {keyword.url}
                    </a>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Dificuldade</label>
                    <Badge className={getDifficultyColor(keyword.difficulty)}>
                      {getDifficultyText(keyword.difficulty)} ({keyword.difficulty}%)
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">CPC Estimado</label>
                    <p className="font-medium">R$ {keyword.cpc.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Melhor Posição</label>
                    <p className="font-medium">#{keyword.bestPosition}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge variant="outline" className="bg-green-50 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Ativo
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Métricas de Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Impressões</label>
                    <p className="font-medium">{keyword.impressions.toLocaleString('pt-BR')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cliques</label>
                    <p className="font-medium">{keyword.clicks.toLocaleString('pt-BR')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">CTR</label>
                    <div className="flex items-center gap-2">
                      <Progress value={keyword.ctr * 5} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{keyword.ctr}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Posição vs Concorrentes</label>
                    <p className="font-medium">3 de 10 concorrentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {keyword.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Posicionamento</CardTitle>
              <CardDescription>
                Evolução da posição da palavra-chave ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyword.history.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{new Date(record.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <Badge variant="outline">
                        #{record.position}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Volume: {record.volume.toLocaleString('pt-BR')}</span>
                      <span>Tráfego: {record.traffic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Concorrentes</CardTitle>
              <CardDescription>
                Top 10 posições para "{keyword.keyword}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keyword.competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant={competitor.domain === 'nosso-site.com' ? 'default' : 'secondary'}>
                        #{competitor.position}
                      </Badge>
                      <div>
                        <p className="font-medium">{competitor.domain}</p>
                        <a href={competitor.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                          {competitor.url}
                        </a>
                      </div>
                    </div>
                    {competitor.domain === 'nosso-site.com' && (
                      <Badge className="bg-green-100 text-green-800">Nosso Site</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Palavras-Chave Sugeridas</CardTitle>
              <CardDescription>
                Sugestões relacionadas com base na palavra-chave atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyword.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{suggestion.keyword}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Volume: {suggestion.volume.toLocaleString('pt-BR')}</span>
                        <span>Dificuldade: {suggestion.difficulty}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(suggestion.difficulty)}>
                        {getDifficultyText(suggestion.difficulty)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendência de Posição</CardTitle>
                <CardDescription>Variação da posição nos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="w-16 h-16" />
                  <p className="ml-2">Gráfico de tendência</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Tráfego</CardTitle>
                <CardDescription>Fontes de tráfego orgânico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Google Search</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-20 h-2" />
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Google Images</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm font-medium">15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Outros</span>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-20 h-2" />
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
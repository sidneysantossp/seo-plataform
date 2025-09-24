'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Plus, 
  Filter,
  Download,
  RefreshCw,
  Target,
  BarChart3,
  Users,
  Globe,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

// Dados de exemplo para palavras-chave
const keywordsData = [
  {
    id: '1',
    keyword: 'agência de marketing digital',
    position: 3,
    previousPosition: 5,
    volume: 2400,
    difficulty: 65,
    url: 'https://exemplo.com/servicos',
    traffic: 450,
    ctr: 18.5,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    keyword: 'seo para pequenas empresas',
    position: 7,
    previousPosition: 12,
    volume: 1200,
    difficulty: 45,
    url: 'https://exemplo.com/blog/seo-pequenas-empresas',
    traffic: 280,
    ctr: 23.2,
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    keyword: 'consultoria seo',
    position: 2,
    previousPosition: 2,
    volume: 880,
    difficulty: 72,
    url: 'https://exemplo.com/consultoria',
    traffic: 195,
    ctr: 22.1,
    lastUpdated: '2024-01-15'
  },
  {
    id: '4',
    keyword: 'otimização de sites',
    position: 15,
    previousPosition: 8,
    volume: 1600,
    difficulty: 58,
    url: 'https://exemplo.com/otimizacao',
    traffic: 120,
    ctr: 7.5,
    lastUpdated: '2024-01-13'
  },
  {
    id: '5',
    keyword: 'marketing digital local',
    position: 4,
    previousPosition: 6,
    volume: 2100,
    difficulty: 52,
    url: 'https://exemplo.com/local',
    traffic: 380,
    ctr: 18.1,
    lastUpdated: '2024-01-15'
  }
]

const getChangeIcon = (current: number, previous: number) => {
  if (current < previous) return <ArrowUpRight className="w-4 h-4 text-green-500" />
  if (current > previous) return <ArrowDownRight className="w-4 h-4 text-red-500" />
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

export default function PalavrasChavePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState('all')
  const [sortBy, setSortBy] = useState('position')

  const filteredKeywords = keywordsData.filter(keyword =>
    keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedKeywords = [...filteredKeywords].sort((a, b) => {
    switch (sortBy) {
      case 'position':
        return a.position - b.position
      case 'volume':
        return b.volume - a.volume
      case 'difficulty':
        return b.difficulty - a.difficulty
      case 'traffic':
        return b.traffic - a.traffic
      default:
        return 0
    }
  })

  const totalKeywords = keywordsData.length
  const avgPosition = Math.round(keywordsData.reduce((sum, kw) => sum + kw.position, 0) / totalKeywords)
  const totalTraffic = keywordsData.reduce((sum, kw) => sum + kw.traffic, 0)
  const improvedKeywords = keywordsData.filter(kw => kw.position < kw.previousPosition).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Palavras-Chave</h1>
          <p className="text-muted-foreground">
            Monitoramento e análise de palavras-chave para todos os projetos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Palavra-Chave
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Palavras-Chave</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalKeywords}</div>
            <p className="text-xs text-muted-foreground">Em monitoramento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posição Média</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{avgPosition}</div>
            <p className="text-xs text-muted-foreground">No Google</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tráfego Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTraffic.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">Visitantes/mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhoradas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{improvedKeywords}</div>
            <p className="text-xs text-muted-foreground">Posições melhoradas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar palavras-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">Todos Projetos</option>
                <option value="ecommerce">E-commerce</option>
                <option value="b2b">B2B</option>
                <option value="medico">Médico</option>
                <option value="restaurante">Restaurante</option>
              </select>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="position">Posição</option>
                <option value="volume">Volume</option>
                <option value="difficulty">Dificuldade</option>
                <option value="traffic">Tráfego</option>
              </select>
              <Button variant="outline" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle>Palavras-Chave Monitoradas</CardTitle>
          <CardDescription>
            {filteredKeywords.length} palavras-chave encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedKeywords.map((keyword) => (
              <div key={keyword.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{keyword.keyword}</span>
                      <Badge variant="outline" className="text-xs">
                        #{keyword.position}
                      </Badge>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeColor(keyword.position, keyword.previousPosition)}`}>
                      {getChangeIcon(keyword.position, keyword.previousPosition)}
                      <span>{Math.abs(keyword.position - keyword.previousPosition)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      {keyword.volume.toLocaleString('pt-BR')} buscas/mês
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {keyword.traffic} visitantes
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {keyword.ctr}% CTR
                    </span>
                  </div>
                  <div className="mt-1">
                    <a href={keyword.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                      {keyword.url}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">Dificuldade</div>
                    <Badge className={getDifficultyColor(keyword.difficulty)}>
                      {getDifficultyText(keyword.difficulty)} ({keyword.difficulty}%)
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Volume</div>
                    <div className="text-xs text-muted-foreground">
                      {keyword.volume.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Posições</CardTitle>
            <CardDescription>Quantidade de palavras-chave por posição no ranking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Top 3</span>
                <div className="flex items-center gap-2">
                  <Progress value={40} className="w-24 h-2" />
                  <span className="text-sm font-medium">2</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Top 10</span>
                <div className="flex items-center gap-2">
                  <Progress value={60} className="w-24 h-2" />
                  <span className="text-sm font-medium">3</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Top 20</span>
                <div className="flex items-center gap-2">
                  <Progress value={80} className="w-24 h-2" />
                  <span className="text-sm font-medium">4</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">> 20</span>
                <div className="flex items-center gap-2">
                  <Progress value={20} className="w-24 h-2" />
                  <span className="text-sm font-medium">1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance por Projeto</CardTitle>
            <CardDescription>Média de posições por projeto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">E-commerce</span>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="w-24 h-2" />
                  <span className="text-sm font-medium">#5.2</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">B2B</span>
                <div className="flex items-center gap-2">
                  <Progress value={60} className="w-24 h-2" />
                  <span className="text-sm font-medium">#8.1</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Médico</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-24 h-2" />
                  <span className="text-sm font-medium">#3.7</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Restaurante</span>
                <div className="flex items-center gap-2">
                  <Progress value={45} className="w-24 h-2" />
                  <span className="text-sm font-medium">#12.4</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
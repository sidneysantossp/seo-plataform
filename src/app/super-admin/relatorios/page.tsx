'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Settings,
  Share,
  Printer,
  Mail,
  Database,
  PieChart,
  Activity,
  Target,
  Users,
  DollarSign,
  Globe,
  Search,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

// Dados de exemplo para relatórios
const reportsData = {
  overview: {
    totalReports: 24,
    scheduledReports: 8,
    lastGenerated: '2024-01-15 14:30',
    mostPopular: 'Relatório de Performance Mensal'
  },
  recentReports: [
    {
      id: '1',
      title: 'Relatório de Performance Mensal - Janeiro 2024',
      type: 'performance',
      status: 'completed',
      generatedAt: '2024-01-15 14:30',
      size: '2.4 MB',
      format: 'pdf',
      scheduled: true,
      nextRun: '2024-02-15 14:30'
    },
    {
      id: '2',
      title: 'Análise de Palavras-Chave - Semanal',
      type: 'keywords',
      status: 'completed',
      generatedAt: '2024-01-14 09:15',
      size: '1.8 MB',
      format: 'xlsx',
      scheduled: true,
      nextRun: '2024-01-21 09:15'
    },
    {
      id: '3',
      title: 'Relatório de Conversões - Q4 2023',
      type: 'conversions',
      status: 'completed',
      generatedAt: '2024-01-12 16:45',
      size: '3.1 MB',
      format: 'pdf',
      scheduled: false,
      nextRun: null
    },
    {
      id: '4',
      title: 'Análise de Tráfego - Comparativo',
      type: 'traffic',
      status: 'processing',
      generatedAt: null,
      size: null,
      format: 'pdf',
      scheduled: false,
      nextRun: null
    },
    {
      id: '5',
      title: 'Relatório de ROI - Campanhas',
      type: 'roi',
      status: 'failed',
      generatedAt: '2024-01-10 11:20',
      size: null,
      format: 'pdf',
      scheduled: true,
      nextRun: '2024-01-17 11:20'
    }
  ],
  reportTemplates: [
    {
      id: '1',
      name: 'Relatório de Performance Mensal',
      description: 'Análise completa de performance do site com métricas principais',
      category: 'performance',
      frequency: 'monthly',
      lastUsed: '2024-01-15',
      usageCount: 45
    },
    {
      id: '2',
      name: 'Análise de Palavras-Chave',
      description: 'Relatório detalhado de posicionamento e performance de keywords',
      category: 'seo',
      frequency: 'weekly',
      lastUsed: '2024-01-14',
      usageCount: 32
    },
    {
      id: '3',
      name: 'Relatório de Conversões',
      description: 'Análise de metas de conversão e taxas de sucesso',
      category: 'conversions',
      frequency: 'monthly',
      lastUsed: '2024-01-12',
      usageCount: 28
    },
    {
      id: '4',
      name: 'Análise de Tráfego',
      description: 'Relatório comparativo de fontes de tráfego e comportamento do usuário',
      category: 'traffic',
      frequency: 'weekly',
      lastUsed: '2024-01-10',
      usageCount: 24
    },
    {
      id: '5',
      name: 'Relatório de ROI',
      description: 'Análise de retorno sobre investimento para campanhas',
      category: 'finance',
      frequency: 'monthly',
      lastUsed: '2024-01-08',
      usageCount: 18
    },
    {
      id: '6',
      name: 'Relatório Competitivo',
      description: 'Análise de concorrentes e posicionamento no mercado',
      category: 'competitive',
      frequency: 'monthly',
      lastUsed: '2024-01-05',
      usageCount: 15
    }
  ],
  scheduledReports: [
    {
      id: '1',
      name: 'Performance Mensal',
      frequency: 'monthly',
      nextRun: '2024-02-15 14:30',
      recipients: ['admin@seosaas.com', 'team@seosaas.com'],
      format: 'pdf',
      status: 'active'
    },
    {
      id: '2',
      name: 'Keywords Semanal',
      frequency: 'weekly',
      nextRun: '2024-01-21 09:15',
      recipients: ['seo@seosaas.com'],
      format: 'xlsx',
      status: 'active'
    },
    {
      id: '3',
      name: 'ROI Diário',
      frequency: 'daily',
      nextRun: '2024-01-16 08:00',
      recipients: ['finance@seosaas.com'],
      format: 'pdf',
      status: 'paused'
    }
  ]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800'
    case 'processing': return 'bg-blue-100 text-blue-800'
    case 'failed': return 'bg-red-100 text-red-800'
    case 'active': return 'bg-green-100 text-green-800'
    case 'paused': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed': return 'Concluído'
    case 'processing': return 'Processando'
    case 'failed': return 'Falhou'
    case 'active': return 'Ativo'
    case 'paused': return 'Pausado'
    default: return 'Desconhecido'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-4 h-4" />
    case 'processing': return <Clock className="w-4 h-4" />
    case 'failed': return <AlertTriangle className="w-4 h-4" />
    case 'active': return <CheckCircle className="w-4 h-4" />
    case 'paused': return <Clock className="w-4 h-4" />
    default: return <Clock className="w-4 h-4" />
  }
}

const getFormatIcon = (format: string) => {
  switch (format) {
    case 'pdf': return <FileText className="w-4 h-4" />
    case 'xlsx': return <Database className="w-4 h-4" />
    case 'csv': return <Database className="w-4 h-4" />
    default: return <FileText className="w-4 h-4" />
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'performance': return <BarChart3 className="w-5 h-5" />
    case 'seo': return <Search className="w-5 h-5" />
    case 'conversions': return <Target className="w-5 h-5" />
    case 'traffic': return <Globe className="w-5 h-5" />
    case 'finance': return <DollarSign className="w-5 h-5" />
    case 'competitive': return <Activity className="w-5 h-5" />
    default: return <FileText className="w-5 h-5" />
  }
}

const getFrequencyText = (frequency: string) => {
  switch (frequency) {
    case 'daily': return 'Diário'
    case 'weekly': return 'Semanal'
    case 'monthly': return 'Mensal'
    case 'quarterly': return 'Trimestral'
    default: return frequency
  }
}

export default function RelatoriosPage() {
  const [selectedTab, setSelectedTab] = useState('recent')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTemplates = reportsData.reportTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || template.category === selectedCategory)
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Gerencie, agende e baixe relatórios de análise e performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Tudo
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Relatório
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Relatórios</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.overview.totalReports}</div>
            <p className="text-xs text-muted-foreground">Relatórios gerados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendados</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.overview.scheduledReports}</div>
            <p className="text-xs text-muted-foreground">Relatórios automáticos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Gerado</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{reportsData.overview.lastGenerated}</div>
            <p className="text-xs text-muted-foreground">Data e hora</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mais Popular</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{reportsData.overview.mostPopular}</div>
            <p className="text-xs text-muted-foreground">Template mais usado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recent">Recentes</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Agendados</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Recentes</CardTitle>
              <CardDescription>
                Relatórios gerados recentemente com status e informações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportsData.recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getFormatIcon(report.format)}
                      <div className="flex-1">
                        <h4 className="font-medium">{report.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          {report.generatedAt && (
                            <span>Gerado: {new Date(report.generatedAt).toLocaleDateString('pt-BR')}</span>
                          )}
                          {report.size && (
                            <span>Tamanho: {report.size}</span>
                          )}
                          {report.scheduled && report.nextRun && (
                            <span>Próximo: {new Date(report.nextRun).toLocaleDateString('pt-BR')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusIcon(report.status)}
                        <span className="ml-1">{getStatusText(report.status)}</span>
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Templates de Relatórios</CardTitle>
              <CardDescription>
                Escolha um template para gerar um novo relatório
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">Todas Categorias</option>
                  <option value="performance">Performance</option>
                  <option value="seo">SEO</option>
                  <option value="conversions">Conversões</option>
                  <option value="traffic">Tráfego</option>
                  <option value="finance">Financeiro</option>
                  <option value="competitive">Competitivo</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(template.category)}
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{getFrequencyText(template.frequency)}</span>
                    <span>{template.usageCount} usos</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <FileText className="w-4 h-4 mr-1" />
                      Gerar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Agendados</CardTitle>
              <CardDescription>
                Relatórios configurados para geração automática
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportsData.scheduledReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{getFrequencyText(report.frequency)}</span>
                          <span>Próximo: {new Date(report.nextRun).toLocaleDateString('pt-BR')}</span>
                          <span>{report.recipients.length} destinatários</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusIcon(report.status)}
                        <span className="ml-1">{getStatusText(report.status)}</span>
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
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
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Relatórios Gerados por Mês
                </CardTitle>
                <CardDescription>
                  Quantidade de relatórios gerados nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Janeiro 2024</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm font-medium">17</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dezembro 2023</span>
                    <div className="flex items-center gap-2">
                      <Progress value={70} className="w-20 h-2" />
                      <span className="text-sm font-medium">14</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Novembro 2023</span>
                    <div className="flex items-center gap-2">
                      <Progress value={90} className="w-20 h-2" />
                      <span className="text-sm font-medium">18</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Outubro 2023</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-20 h-2" />
                      <span className="text-sm font-medium">15</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Distribuição por Tipo
                </CardTitle>
                <CardDescription>
                  Tipos de relatórios mais gerados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Performance</span>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="w-20 h-2" />
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SEO</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20 h-2" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conversões</span>
                    <div className="flex items-center gap-2">
                      <Progress value={20} className="w-20 h-2" />
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tráfego</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm font-medium">15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Outros</span>
                    <div className="flex items-center gap-2">
                      <Progress value={5} className="w-20 h-2" />
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance de Geração</CardTitle>
              <CardDescription>
                Tempo médio de geração e taxas de sucesso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2.3min</div>
                  <p className="text-sm text-muted-foreground">Tempo Médio</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8MB</div>
                  <p className="text-sm text-muted-foreground">Tamanho Médio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
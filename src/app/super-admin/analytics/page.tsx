'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Clock,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Activity,
  Zap,
  DollarSign,
  ShoppingCart,
  FileText,
  Minus
} from 'lucide-react'

// Dados de exemplo para analytics
const analyticsData = {
  overview: {
    totalVisits: 45230,
    uniqueVisitors: 28450,
    pageViews: 123450,
    bounceRate: 32.5,
    avgSessionDuration: '3:45',
    conversionRate: 2.8,
    totalRevenue: 45680
  },
  trafficSources: [
    { source: 'Organic Search', visits: 18500, percentage: 41, change: 12.5, icon: Search },
    { source: 'Direct', visits: 9800, percentage: 22, change: 5.2, icon: Globe },
    { source: 'Social Media', visits: 7250, percentage: 16, change: 8.7, icon: Users },
    { source: 'Referral', visits: 5400, percentage: 12, change: -2.1, icon: ArrowUpRight },
    { source: 'Email', visits: 3200, percentage: 7, change: 15.3, icon: FileText },
    { source: 'Paid Search', visits: 1080, percentage: 2, change: -5.8, icon: DollarSign }
  ],
  topPages: [
    { path: '/', title: 'Página Inicial', views: 18500, uniqueVisitors: 12400, avgTime: '2:30', bounceRate: 28.5 },
    { path: '/servicos', title: 'Serviços', views: 12400, uniqueVisitors: 8900, avgTime: '4:15', bounceRate: 22.3 },
    { path: '/blog/seo-para-pequenas-empresas', title: 'SEO para Pequenas Empresas', views: 8900, uniqueVisitors: 7200, avgTime: '5:20', bounceRate: 18.7 },
    { path: '/contato', title: 'Contato', views: 6800, uniqueVisitors: 5100, avgTime: '1:45', bounceRate: 35.2 },
    { path: '/sobre', title: 'Sobre Nós', views: 5200, uniqueVisitors: 3900, avgTime: '3:10', bounceRate: 25.8 }
  ],
  devices: [
    { device: 'Desktop', visits: 24500, percentage: 54.2, icon: Monitor },
    { device: 'Mobile', visits: 16800, percentage: 37.2, icon: Smartphone },
    { device: 'Tablet', visits: 3930, percentage: 8.6, icon: Tablet }
  ],
  conversions: [
    { goal: 'Formulário de Contato', completions: 245, rate: 2.8, value: 12500 },
    { goal: 'Solicitação de Orçamento', completions: 89, rate: 1.2, value: 28900 },
    { goal: 'Download de E-book', completions: 156, rate: 1.8, value: 4200 },
    { goal: 'Newsletter Signup', completions: 423, rate: 4.9, value: 800 }
  ],
  monthlyData: [
    { month: 'Jan', visits: 38500, revenue: 38200 },
    { month: 'Fev', visits: 41200, revenue: 41500 },
    { month: 'Mar', visits: 39800, revenue: 40100 },
    { month: 'Abr', visits: 42600, revenue: 42800 },
    { month: 'Mai', visits: 44100, revenue: 43900 },
    { month: 'Jun', visits: 45230, revenue: 45680 }
  ]
}

const getChangeIcon = (change: number) => {
  if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
  if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />
  return <Minus className="w-4 h-4 text-gray-500" />
}

const getChangeColor = (change: number) => {
  if (change > 0) return 'text-green-600 bg-green-50'
  if (change < 0) return 'text-red-600 bg-red-50'
  return 'text-gray-600 bg-gray-50'
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30days')
  const [selectedProject, setSelectedProject] = useState('all')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Análise completa de tráfego, conversões e performance do site
          </p>
        </div>
        <div className="flex gap-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="7days">Últimos 7 dias</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="90days">Últimos 90 dias</option>
            <option value="1year">Último ano</option>
          </select>
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
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Visitas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalVisits.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.uniqueVisitors.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.3%</span> vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.4%</span> vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {analyticsData.overview.totalRevenue.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.2%</span> vs período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="traffic">Tráfego</TabsTrigger>
          <TabsTrigger value="pages">Páginas</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="conversions">Conversões</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Fontes de Tráfego</CardTitle>
              <CardDescription>
                Origem do tráfego do seu site nos últimos 30 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <source.icon className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{source.source}</span>
                          <Badge variant="outline" className="text-xs">
                            {source.percentage}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {source.visits.toLocaleString('pt-BR')} visitas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeColor(source.change)}`}>
                        {getChangeIcon(source.change)}
                        <span>{Math.abs(source.change)}%</span>
                      </div>
                      <Progress value={source.percentage} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.bounceRate}%</div>
                <Progress value={100 - analyticsData.overview.bounceRate} className="mt-2 h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">-2.3%</span> vs anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Duração Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.avgSessionDuration}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+0:30</span> vs anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Páginas por Sessão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.7</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+0.2</span> vs anterior
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visitas Mensais</CardTitle>
                <CardDescription>Evolução do tráfego nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="w-16 h-16" />
                  <p className="ml-2">Gráfico de visitas mensais</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
                <CardDescription>Evolução da receita nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <DollarSign className="w-16 h-16" />
                  <p className="ml-2">Gráfico de receita mensal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Páginas Mais Visitadas</CardTitle>
              <CardDescription>
                Análise detalhada das páginas com melhor performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{page.title}</span>
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{page.path}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{page.views.toLocaleString('pt-BR')} visualizações</span>
                        <span>{page.uniqueVisitors.toLocaleString('pt-BR')} visitantes únicos</span>
                        <span>Tempo médio: {page.avgTime}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Taxa de Rejeição</div>
                      <div className="flex items-center gap-2">
                        <Progress value={100 - page.bounceRate} className="w-16 h-2" />
                        <span className="text-sm">{page.bounceRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tráfego por Dispositivo</CardTitle>
              <CardDescription>
                Distribuição de visitas por tipo de dispositivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analyticsData.devices.map((device, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <device.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">{device.device}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{device.percentage}%</span>
                        <span className="text-sm text-muted-foreground">
                          ({device.visits.toLocaleString('pt-BR')} visitas)
                        </span>
                      </div>
                    </div>
                    <Progress value={device.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metas de Conversão</CardTitle>
              <CardDescription>
                Performance das metas de conversão configuradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.conversions.map((conversion, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{conversion.goal}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{conversion.completions} conversões</span>
                        <span>Taxa: {conversion.rate}%</span>
                        <span>Valor: R$ {conversion.value.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{conversion.rate}%</div>
                      <Progress value={conversion.rate * 20} className="w-16 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendência de Tráfego</CardTitle>
                <CardDescription>Variação de visitas ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(data.visits / 50000) * 100} className="w-20 h-2" />
                        <span className="text-sm">{data.visits.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendência de Receita</CardTitle>
                <CardDescription>Variação de receita ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(data.revenue / 50000) * 100} className="w-20 h-2" />
                        <span className="text-sm">R$ {data.revenue.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
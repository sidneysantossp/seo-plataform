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
  Target,
  Users,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Download,
  FileText,
  Eye,
  Settings,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Globe,
  Tag,
  User,
  Star,
  Share
} from 'lucide-react'
import Link from 'next/link'
import { seoProjects, type SEOProject } from '@/data/seoProjects'

interface ReportData {
  id: string
  title: string
  type: 'performance' | 'progress' | 'financial' | 'team' | 'seo'
  date: string
  generatedBy: string
  status: 'completed' | 'generating' | 'failed'
  data: any
}

export default function ProjectReportsPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<SEOProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState<ReportData[]>([])
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null)

  useEffect(() => {
    const projectId = params.id as string
    const foundProject = seoProjects.find(p => p.id === projectId)
    setProject(foundProject || null)
    
    // Simular relatórios existentes
    if (foundProject) {
      setReports([
        {
          id: '1',
          title: 'Relatório de Performance SEO',
          type: 'performance',
          date: new Date().toISOString(),
          generatedBy: 'Sistema',
          status: 'completed',
          data: {
            organicTraffic: 2450,
            keywordRankings: 89,
            backlinks: 156,
            pageSpeed: 92
          }
        },
        {
          id: '2',
          title: 'Relatório de Progresso do Projeto',
          type: 'progress',
          date: new Date(Date.now() - 86400000).toISOString(),
          generatedBy: 'Carlos Oliveira',
          status: 'completed',
          data: {
            taskCompletion: 75,
            milestones: 4,
            completedMilestones: 3,
            teamProductivity: 88
          }
        },
        {
          id: '3',
          title: 'Relatório Financeiro',
          type: 'financial',
          date: new Date(Date.now() - 172800000).toISOString(),
          generatedBy: 'Sistema',
          status: 'completed',
          data: {
            budget: foundProject.budget,
            spent: foundProject.spent,
            remaining: foundProject.budget - foundProject.spent,
            costPerTask: foundProject.spent / foundProject.tasks.length
          }
        }
      ])
    }
    
    setLoading(false)
  }, [params.id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'completed': return 'bg-blue-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'paused': return 'Pausado'
      case 'completed': return 'Concluído'
      case 'cancelled': return 'Cancelado'
      default: return 'Desconhecido'
    }
  }

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return <BarChart3 className="w-4 h-4" />
      case 'progress': return <Target className="w-4 h-4" />
      case 'financial': return <DollarSign className="w-4 h-4" />
      case 'team': return <Users className="w-4 h-4" />
      case 'seo': return <TrendingUp className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getReportTypeText = (type: string) => {
    switch (type) {
      case 'performance': return 'Performance'
      case 'progress': return 'Progresso'
      case 'financial': return 'Financeiro'
      case 'team': return 'Equipe'
      case 'seo': return 'SEO'
      default: return 'Geral'
    }
  }

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'generating': return 'text-blue-600 bg-blue-50'
      case 'failed': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getReportStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído'
      case 'generating': return 'Gerando'
      case 'failed': return 'Falhou'
      default: return 'Desconhecido'
    }
  }

  const getProjectProgress = () => {
    if (!project) return 0
    const completedTasks = project.tasks.filter(task => task.status === 'completed').length
    return project.tasks.length > 0 ? (completedTasks / project.tasks.length) * 100 : 0
  }

  const generateNewReport = (type: string) => {
    if (!project) return
    
    const newReport: ReportData = {
      id: Date.now().toString(),
      title: `Relatório de ${getReportTypeText(type)}`,
      type: type as any,
      date: new Date().toISOString(),
      generatedBy: 'Sistema',
      status: 'generating',
      data: {}
    }
    
    setReports(prev => [newReport, ...prev])
    
    // Simular geração de relatório
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id 
          ? { ...r, status: 'completed', data: generateReportData(type, project) }
          : r
      ))
    }, 3000) // Aumentado para 3 segundos para melhor experiência
  }

  const generateReportData = (type: string, project: SEOProject) => {
    switch (type) {
      case 'performance':
        return {
          organicTraffic: Math.floor(Math.random() * 5000) + 1000,
          keywordRankings: Math.floor(Math.random() * 100) + 50,
          backlinks: Math.floor(Math.random() * 300) + 100,
          pageSpeed: Math.floor(Math.random() * 30) + 70,
          bounceRate: Math.floor(Math.random() * 20) + 25,
          avgSessionDuration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          conversionRate: (Math.random() * 5 + 2).toFixed(1),
          topKeywords: [
            { keyword: 'ferramentas seo', position: Math.floor(Math.random() * 10) + 1, traffic: Math.floor(Math.random() * 500) + 200 },
            { keyword: 'otimização seo', position: Math.floor(Math.random() * 15) + 1, traffic: Math.floor(Math.random() * 400) + 150 },
            { keyword: 'seo local', position: Math.floor(Math.random() * 20) + 1, traffic: Math.floor(Math.random() * 300) + 100 }
          ]
        }
      case 'progress':
        return {
          taskCompletion: getProjectProgress(),
          milestones: 5,
          completedMilestones: Math.floor(getProjectProgress() / 20),
          teamProductivity: Math.floor(Math.random() * 40) + 60,
          tasksCompleted: project.tasks.filter(t => t.status === 'completed').length,
          tasksTotal: project.tasks.length,
          avgCompletionTime: `${Math.floor(Math.random() * 5) + 3} dias`,
          overdueTasks: project.tasks.filter(t => t.status === 'blocked').length
        }
      case 'financial':
        return {
          budget: project.budget,
          spent: project.spent,
          remaining: project.budget - project.spent,
          costPerTask: project.spent / project.tasks.length,
          costPerHour: Math.floor(Math.random() * 40) + 60,
          projectedCost: project.budget * (0.9 + Math.random() * 0.2),
          savings: project.budget * (0.02 + Math.random() * 0.08)
        }
      case 'team':
        return {
          teamMembers: project.team.length,
          activeMembers: project.team.filter(t => t.status === 'active').length,
          avgTaskCompletion: Math.floor(Math.random() * 40) + 60,
          totalHours: Math.floor(Math.random() * 200) + 100,
          avgPerformance: Math.floor(Math.random() * 30) + 70,
          topPerformer: project.team[Math.floor(Math.random() * project.team.length)]?.name || 'N/A'
        }
      case 'seo':
        return {
          totalKeywords: Math.floor(Math.random() * 200) + 50,
          top10Keywords: Math.floor(Math.random() * 80) + 20,
          avgPosition: Math.floor(Math.random() * 20) + 5,
          organicGrowth: (Math.random() * 30 + 10).toFixed(1),
          domainAuthority: Math.floor(Math.random() * 30) + 40,
          pageAuthority: Math.floor(Math.random() * 30) + 35
        }
      default:
        return {}
    }
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

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Projeto não encontrado</h1>
          <p className="text-muted-foreground">O projeto solicitado não existe ou foi removido.</p>
          <Link href="/super-admin/projetos-seo">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Projetos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/super-admin/projetos-seo/${project.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Relatórios do Projeto</h1>
            <p className="text-muted-foreground">{project.name} • {project.client}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Todos
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Relatório
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Visão Geral do Projeto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4" />
                <span>Status</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                <span className="font-medium">{getStatusText(project.status)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="w-4 h-4" />
                <span>Progresso</span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{Math.round(getProjectProgress())}%</div>
                <Progress value={getProjectProgress()} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>Orçamento</span>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold">R$ {project.budget.toLocaleString('pt-BR')}</div>
                <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  R$ {project.spent.toLocaleString('pt-BR')} utilizado
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Equipe</span>
              </div>
              <div className="text-2xl font-bold">{project.team.length}</div>
              <p className="text-xs text-muted-foreground">Membros ativos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="generate">Gerar Novo</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedReport(report)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getReportTypeIcon(report.type)}
                      <CardTitle className="text-sm">{report.title}</CardTitle>
                    </div>
                    <Badge className={getReportStatusColor(report.status)}>
                      {getReportStatusText(report.status)}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {new Date(report.date).toLocaleDateString('pt-BR')} • {report.generatedBy}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>Tipo: {getReportTypeText(report.type)}</span>
                  </div>
                  
                  {report.status === 'completed' && (
                    <div className="space-y-2">
                      {report.type === 'performance' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Tráfego Orgânico</span>
                            <span className="font-medium">{report.data.organicTraffic}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Rankings</span>
                            <span className="font-medium">{report.data.keywordRankings}</span>
                          </div>
                        </div>
                      )}
                      
                      {report.type === 'progress' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progresso</span>
                            <span className="font-medium">{Math.round(report.data.taskCompletion)}%</span>
                          </div>
                          <Progress value={report.data.taskCompletion} className="h-2" />
                        </div>
                      )}
                      
                      {report.type === 'financial' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Utilizado</span>
                            <span className="font-medium">R$ {report.data.spent.toLocaleString('pt-BR')}</span>
                          </div>
                          <Progress value={(report.data.spent / report.data.budget) * 100} className="h-2" />
                        </div>
                      )}
                      
                      {report.type === 'team' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Membros Ativos</span>
                            <span className="font-medium">{report.data.activeMembers}/{report.data.teamMembers}</span>
                          </div>
                          <Progress value={(report.data.activeMembers / report.data.teamMembers) * 100} className="h-2" />
                        </div>
                      )}
                      
                      {report.type === 'seo' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Palavras no Top 10</span>
                            <span className="font-medium">{report.data.top10Keywords}</span>
                          </div>
                          <Progress value={(report.data.top10Keywords / report.data.totalKeywords) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {report.status === 'generating' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-blue-600">
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>Gerando relatório...</span>
                      </div>
                      <Progress value={33} className="h-2" />
                      <p className="text-xs text-muted-foreground">Isso pode levar alguns segundos</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Link href={`/super-admin/projetos-seo/${project.id}/relatorios/${report.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerar Novo Relatório</CardTitle>
              <CardDescription>
                Selecione o tipo de relatório que deseja gerar para o projeto {project.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                      onClick={() => generateNewReport('performance')}>
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                    <h3 className="font-semibold mb-2">Relatório de Performance</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Análise completa de métricas de SEO e performance
                    </p>
                    <Button variant="outline" className="w-full">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                      onClick={() => generateNewReport('progress')}>
                  <CardContent className="p-6 text-center">
                    <Target className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <h3 className="font-semibold mb-2">Relatório de Progresso</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Acompanhamento do progresso das tarefas e metas
                    </p>
                    <Button variant="outline" className="w-full">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                      onClick={() => generateNewReport('financial')}>
                  <CardContent className="p-6 text-center">
                    <DollarSign className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                    <h3 className="font-semibold mb-2">Relatório Financeiro</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Análise detalhada de custos e orçamento
                    </p>
                    <Button variant="outline" className="w-full">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                      onClick={() => generateNewReport('team')}>
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="font-semibold mb-2">Relatório da Equipe</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Desempenho e produtividade da equipe
                    </p>
                    <Button variant="outline" className="w-full">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                      onClick={() => generateNewReport('seo')}>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-red-500" />
                    <h3 className="font-semibold mb-2">Relatório SEO</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Métricas específicas de SEO e palavras-chave
                    </p>
                    <Button variant="outline" className="w-full">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Evolução do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progresso Geral</span>
                    <span className="font-medium">{Math.round(getProjectProgress())}%</span>
                  </div>
                  <Progress value={getProjectProgress()} className="h-3" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tarefas Concluídas</span>
                      <span className="font-medium">
                        {project.tasks.filter(t => t.status === 'completed').length} / {project.tasks.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Orçamento Utilizado</span>
                      <span className="font-medium">
                        R$ {project.spent.toLocaleString('pt-BR')} / R$ {project.budget.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Membros Ativos</span>
                      <span className="font-medium">
                        {project.team.filter(t => t.status === 'active').length} / {project.team.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Distribuição de Tarefas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['completed', 'in_progress', 'pending', 'blocked'].map(status => {
                    const count = project.tasks.filter(t => t.status === status).length
                    const percentage = (count / project.tasks.length) * 100
                    
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            {status === 'completed' && 'Concluídas'}
                            {status === 'in_progress' && 'Em Progresso'}
                            {status === 'pending' && 'Pendentes'}
                            {status === 'blocked' && 'Bloqueadas'}
                          </span>
                          <span className="font-medium">{count} ({Math.round(percentage)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Análise Avançada */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance SEO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tráfego Orgânico</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">2,450</div>
                      <div className="text-xs text-green-600">+12.5%</div>
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taxa de Conversão</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">4.2%</div>
                      <div className="text-xs text-green-600">+0.8%</div>
                    </div>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Eficiência da Equipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Produtividade</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">88%</div>
                      <div className="text-xs text-green-600">+5.2%</div>
                    </div>
                  </div>
                  <Progress value={88} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tempo Médio</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">4.2 dias</div>
                      <div className="text-xs text-yellow-600">-0.5 dias</div>
                    </div>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Saúde Financeira
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ROI do Projeto</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">245%</div>
                      <div className="text-xs text-green-600">+15.3%</div>
                    </div>
                  </div>
                  <Progress value={92} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Economia</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">5.2%</div>
                      <div className="text-xs text-green-600">+1.8%</div>
                    </div>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights e Recomendações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Insights e Recomendações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Pontos Fortes</h3>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Alta produtividade da equipe</li>
                    <li>• Bom controle financeiro</li>
                    <li>• Progresso constante</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Oportunidades</h3>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• Otimizar tempo de tarefas</li>
                    <li>• Aumentar conversão SEO</li>
                    <li>• Melhorar comunicação</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">🎯 Ações Recomendadas</h3>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Revisar estratégia de keywords</li>
                    <li>• Investir em treinamento</li>
                    <li>• Automatizar relatórios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Relatórios</CardTitle>
              <CardDescription>
                Todos os relatórios gerados para o projeto {project.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filtros e Busca */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar relatórios..."
                      className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border rounded-md text-sm">
                    <option value="all">Todos Tipos</option>
                    <option value="performance">Performance</option>
                    <option value="progress">Progresso</option>
                    <option value="financial">Financeiro</option>
                    <option value="team">Equipe</option>
                    <option value="seo">SEO</option>
                  </select>
                  <select className="px-3 py-2 border rounded-md text-sm">
                    <option value="all">Todos Status</option>
                    <option value="completed">Concluídos</option>
                    <option value="generating">Gerando</option>
                    <option value="failed">Falharam</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </div>

              {/* Lista de Relatórios */}
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      {getReportTypeIcon(report.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{report.title}</h4>
                          <Badge className={getReportStatusColor(report.status)}>
                            {getReportStatusText(report.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{new Date(report.date).toLocaleDateString('pt-BR')}</span>
                          <span>•</span>
                          <span>{report.generatedBy}</span>
                          <span>•</span>
                          <span>{getReportTypeText(report.type)}</span>
                        </div>
                        
                        {/* Preview de dados */}
                        {report.status === 'completed' && (
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            {report.type === 'performance' && (
                              <>
                                <span>Tráfego: {report.data.organicTraffic}</span>
                                <span>•</span>
                                <span>Rankings: {report.data.keywordRankings}</span>
                              </>
                            )}
                            {report.type === 'progress' && (
                              <>
                                <span>Progresso: {Math.round(report.data.taskCompletion)}%</span>
                                <span>•</span>
                                <span>Tarefas: {report.data.tasksCompleted}/{report.data.tasksTotal}</span>
                              </>
                            )}
                            {report.type === 'financial' && (
                              <>
                                <span>Utilizado: R$ {report.data.spent.toLocaleString('pt-BR')}</span>
                                <span>•</span>
                                <span>Restante: R$ {report.data.remaining.toLocaleString('pt-BR')}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link href={`/super-admin/projetos-seo/${project.id}/relatorios/${report.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Estatísticas do Histórico */}
              <div className="mt-8 pt-6 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{reports.length}</div>
                    <div className="text-sm text-muted-foreground">Total Relatórios</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {reports.filter(r => r.status === 'completed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Concluídos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {reports.filter(r => r.type === 'performance').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {new Date().getMonth() + 1}
                    </div>
                    <div className="text-sm text-muted-foreground">Este Mês</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
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
  Download,
  FileText,
  BarChart3,
  Target,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  PieChart,
  Star,
  Award,
  Zap,
  Eye,
  Settings,
  Share,
  Printer
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

export default function ReportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<SEOProject | null>(null)
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const projectId = params.id as string
    const reportId = params.reportId as string
    
    const foundProject = seoProjects.find(p => p.id === projectId)
    setProject(foundProject || null)
    
    // Simular busca do relatório
    if (foundProject) {
      const mockReports: ReportData[] = [
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
            pageSpeed: 92,
            bounceRate: 32,
            avgSessionDuration: '3:45',
            conversionRate: 4.2,
            topKeywords: [
              { keyword: 'ferramentas seo', position: 3, traffic: 450 },
              { keyword: 'otimização seo', position: 7, traffic: 320 },
              { keyword: 'seo local', position: 12, traffic: 180 }
            ]
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
            teamProductivity: 88,
            tasksCompleted: 12,
            tasksTotal: 16,
            avgCompletionTime: '5 dias',
            overdueTasks: 2
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
            costPerTask: foundProject.spent / foundProject.tasks.length,
            costPerHour: 85,
            projectedCost: foundProject.budget * 1.1,
            savings: foundProject.budget * 0.05
          }
        }
      ]
      
      const foundReport = mockReports.find(r => r.id === reportId)
      setReport(foundReport || null)
    }
    
    setLoading(false)
  }, [params.id, params.reportId])

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return <BarChart3 className="w-5 h-5" />
      case 'progress': return <Target className="w-5 h-5" />
      case 'financial': return <DollarSign className="w-5 h-5" />
      case 'team': return <Users className="w-5 h-5" />
      case 'seo': return <TrendingUp className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
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

  if (!project || !report) {
    return (
      <div className="p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Relatório não encontrado</h1>
          <p className="text-muted-foreground">O relatório solicitado não existe ou foi removido.</p>
          <Link href={`/super-admin/projetos-seo/${params.id}/relatorios`}>
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Relatórios
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
          <Link href={`/super-admin/projetos-seo/${project.id}/relatorios`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            {getReportTypeIcon(report.type)}
            <div>
              <h1 className="text-2xl font-bold">{report.title}</h1>
              <p className="text-muted-foreground">{project.name} • {project.client}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </div>

      {/* Report Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informações do Relatório
              </CardTitle>
              <CardDescription>
                Detalhes sobre a geração e conteúdo deste relatório
              </CardDescription>
            </div>
            <Badge className="bg-green-50 text-green-600">
              Concluído
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Tipo</label>
              <div className="flex items-center gap-2">
                {getReportTypeIcon(report.type)}
                <span className="font-medium">{getReportTypeText(report.type)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Data de Geração</label>
              <p className="font-medium">{new Date(report.date).toLocaleDateString('pt-BR')}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Gerado por</label>
              <p className="font-medium">{report.generatedBy}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">ID do Relatório</label>
              <p className="font-medium font-mono text-sm">{report.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {report.type === 'performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Métricas de Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tráfego Orgânico</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">{report.data.organicTraffic}</div>
                        <div className="text-xs text-green-600">+12.5%</div>
                      </div>
                    </div>
                    <Progress value={75} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rankings de Palavras-Chave</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">{report.data.keywordRankings}</div>
                        <div className="text-xs text-green-600">+8.2%</div>
                      </div>
                    </div>
                    <Progress value={82} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Backlinks</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">{report.data.backlinks}</div>
                        <div className="text-xs text-green-600">+15.3%</div>
                      </div>
                    </div>
                    <Progress value={68} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Page Speed</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">{report.data.pageSpeed}/100</div>
                        <div className="text-xs text-green-600">+5.1%</div>
                      </div>
                    </div>
                    <Progress value={report.data.pageSpeed} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Palavras-Chave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {report.data.topKeywords.map((keyword: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{keyword.keyword}</div>
                          <div className="text-sm text-muted-foreground">
                            Posição: #{keyword.position}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{keyword.traffic}</div>
                          <div className="text-xs text-muted-foreground">visitas/mês</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {report.type === 'progress' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Progresso do Projeto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Conclusão de Tarefas</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">{Math.round(report.data.taskCompletion)}%</div>
                        <div className="text-xs text-green-600">No prazo</div>
                      </div>
                    </div>
                    <Progress value={report.data.taskCompletion} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tarefas Concluídas</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">{report.data.tasksCompleted}/{report.data.tasksTotal}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Produtividade da Equipe</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">{report.data.teamProductivity}%</div>
                        <div className="text-xs text-green-600">Acima da média</div>
                      </div>
                    </div>
                    <Progress value={report.data.teamProductivity} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tempo Médio de Conclusão</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">{report.data.avgCompletionTime}</div>
                        <div className="text-xs text-muted-foreground">Por tarefa</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Marcos do Projeto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="font-medium">Auditoria SEO Completa</div>
                          <div className="text-sm text-muted-foreground">Concluído</div>
                        </div>
                      </div>
                      <Badge className="bg-green-50 text-green-600">100%</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="font-medium">Otimização On-Page</div>
                          <div className="text-sm text-muted-foreground">Concluído</div>
                        </div>
                      </div>
                      <Badge className="bg-green-50 text-green-600">100%</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="font-medium">Link Building Inicial</div>
                          <div className="text-sm text-muted-foreground">Concluído</div>
                        </div>
                      </div>
                      <Badge className="bg-green-50 text-green-600">100%</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-yellow-500" />
                        <div>
                          <div className="font-medium">Monitoramento Contínuo</div>
                          <div className="text-sm text-muted-foreground">Em andamento</div>
                        </div>
                      </div>
                      <Badge className="bg-yellow-50 text-yellow-600">75%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {report.type === 'financial' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Análise Financeira
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Orçamento Total</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">R$ {report.data.budget.toLocaleString('pt-BR')}</div>
                        <div className="text-xs text-muted-foreground">100%</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Valor Utilizado</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">R$ {report.data.spent.toLocaleString('pt-BR')}</div>
                        <div className="text-xs text-muted-foreground">{Math.round((report.data.spent / report.data.budget) * 100)}%</div>
                      </div>
                    </div>
                    <Progress value={(report.data.spent / report.data.budget) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Saldo Restante</span>
                      <div className="text-right">
                        <div className="font-bold text-lg text-green-600">R$ {report.data.remaining.toLocaleString('pt-BR')}</div>
                        <div className="text-xs text-green-600">Disponível</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Custo por Tarefa</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">R$ {Math.round(report.data.costPerTask)}</div>
                        <div className="text-xs text-muted-foreground">Média</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Custo por Hora</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">R$ {report.data.costPerHour}</div>
                        <div className="text-xs text-muted-foreground">Média</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Projeções e Economia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Custo Projetado Final</span>
                      <div className="text-right">
                        <div className="font-bold text-lg">R$ {report.data.projectedCost.toLocaleString('pt-BR')}</div>
                        <div className="text-xs text-blue-600">Estimativa</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Economia Prevista</span>
                      <div className="text-right">
                        <div className="font-bold text-lg text-green-600">R$ {report.data.savings.toLocaleString('pt-BR')}</div>
                        <div className="text-xs text-green-600">5% do orçamento</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">Desempenho Financeiro</span>
                      </div>
                      <p className="text-sm text-green-700">
                        O projeto está dentro do orçamento previsto com uma economia potencial de 5%. 
                        A eficiência de custos está 15% acima da média do mercado.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Detalhes Completos
              </CardTitle>
              <CardDescription>
                Informações detalhadas e métricas específicas do relatório
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {report.type === 'performance' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Métricas de Tráfego</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Tráfego Orgânico Mensal</span>
                          <span className="font-medium">{report.data.organicTraffic}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxa de Rejeição</span>
                          <span className="font-medium">{report.data.bounceRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duração Média da Sessão</span>
                          <span className="font-medium">{report.data.avgSessionDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxa de Conversão</span>
                          <span className="font-medium">{report.data.conversionRate}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Métricas SEO</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Palavras-chave no Top 10</span>
                          <span className="font-medium">{report.data.keywordRankings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total de Backlinks</span>
                          <span className="font-medium">{report.data.backlinks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pontuação de Page Speed</span>
                          <span className="font-medium">{report.data.pageSpeed}/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {report.type === 'progress' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Progresso de Tarefas</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total de Tarefas</span>
                          <span className="font-medium">{report.data.tasksTotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tarefas Concluídas</span>
                          <span className="font-medium">{report.data.tasksCompleted}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tarefas em Atraso</span>
                          <span className="font-medium text-red-600">{report.data.overdueTasks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tempo Médio de Conclusão</span>
                          <span className="font-medium">{report.data.avgCompletionTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Desempenho da Equipe</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Produtividade Geral</span>
                          <span className="font-medium">{report.data.teamProductivity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Marcos Concluídos</span>
                          <span className="font-medium">{report.data.completedMilestones}/{report.data.milestones}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {report.type === 'financial' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Detalhes Orçamentários</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Orçamento Inicial</span>
                          <span className="font-medium">R$ {report.data.budget.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Valor Utilizado</span>
                          <span className="font-medium">R$ {report.data.spent.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saldo Disponível</span>
                          <span className="font-medium text-green-600">R$ {report.data.remaining.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Custo por Hora</span>
                          <span className="font-medium">R$ {report.data.costPerHour}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Projeções</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Custo Projetado Final</span>
                          <span className="font-medium">R$ {report.data.projectedCost.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Economia Prevista</span>
                          <span className="font-medium text-green-600">R$ {report.data.savings.toLocaleString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Insights e Recomendações
              </CardTitle>
              <CardDescription>
                Análise inteligente e sugestões para melhorar o desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {report.type === 'performance' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">🎯 Oportunidades de Melhoria</h3>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li>• Concentrar esforços nas palavras-chave que estão entre as posições 11-20 para entrar no Top 10</li>
                        <li>• Melhorar a velocidade de carregamento das páginas com score abaixo de 90</li>
                        <li>• Aumentar o conteúdo para palavras-chave com alto potencial de tráfego</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">✅ Pontos Fortes</h3>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li>• Excelente taxa de rejeição abaixo de 35%</li>
                        <li>• Bom desempenho em palavras-chave de alto valor</li>
                        <li>• Crescimento consistente no tráfego orgânico</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {report.type === 'progress' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Atenção Necessária</h3>
                      <ul className="space-y-2 text-sm text-yellow-700">
                        <li>• {report.data.overdueTasks} tarefas estão em atraso e precisam de priorização</li>
                        <li>• Revisar a estimativa de tempo para novas tarefas com base no histórico</li>
                        <li>• Considerar realocação de recursos para tarefas críticas</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">🚀 Desempenho Excelente</h3>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li>• Produtividade da equipe acima de 85%</li>
                        <li>• Conclusão antecipada de marcos importantes</li>
                        <li>• Bom gerenciamento de tempo e recursos</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {report.type === 'financial' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">💰 Saúde Financeira</h3>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li>• Projeto dentro do orçamento com economia prevista de 5%</li>
                        <li>• Custo por hora competitivo em relação ao mercado</li>
                        <li>• Boa distribuição de custos entre tarefas</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">📊 Recomendações Financeiras</h3>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li>• Considerar reinvestimento da economia em melhorias de SEO</li>
                        <li>• Manter o controle rigoroso dos custos para preservar a margem</li>
                        <li>• Avaliar expansão do escopo com base no desempenho atual</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
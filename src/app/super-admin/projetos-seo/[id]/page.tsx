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
  Target,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Settings,
  Eye,
  Mail,
  Phone,
  Globe,
  BarChart3,
  Search,
  Link,
  Tag,
  User,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { seoProjects, type SEOProject } from '@/data/seoProjects'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<SEOProject | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const projectId = params.id as string
    const foundProject = seoProjects.find(p => p.id === projectId)
    setProject(foundProject || null)
    setLoading(false)
  }, [params.id])

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

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-500" />
      case 'blocked': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getTaskStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída'
      case 'in_progress': return 'Em Progresso'
      case 'blocked': return 'Bloqueada'
      case 'pending': return 'Pendente'
      default: return 'Desconhecido'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'secondary'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta'
      case 'medium': return 'Média'
      case 'low': return 'Baixa'
      default: return 'Desconhecida'
    }
  }

  const getProjectProgress = () => {
    const completedTasks = project.tasks.filter(task => task.status === 'completed').length
    return project.tasks.length > 0 ? (completedTasks / project.tasks.length) * 100 : 0
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/super-admin/projetos-seo">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground">{project.client} • {project.website}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          {project.status === 'active' ? (
            <Button variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              Pausar
            </Button>
          ) : (
            <Button>
              <Play className="w-4 h-4 mr-2" />
              Iniciar
            </Button>
          )}
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
              <span className="font-medium">{getStatusText(project.status)}</span>
            </div>
            <Badge variant={getPriorityColor(project.priority)} className="mt-2">
              {getPriorityText(project.priority)}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(getProjectProgress())}%</div>
            <Progress value={getProjectProgress()} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {project.tasks.filter(t => t.status === 'completed').length} de {project.tasks.length} tarefas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {project.budget.toLocaleString('pt-BR')}
            </div>
            <Progress value={(project.spent / project.budget) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              R$ {project.spent.toLocaleString('pt-BR')} utilizado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipe</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.team.length}</div>
            <p className="text-xs text-muted-foreground">Membros ativos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-Chave</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="team">Equipe</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Informações do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cliente</label>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Website</label>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {project.website}
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Período</label>
                    <p className="font-medium">
                      {new Date(project.startDate).toLocaleDateString('pt-BR')} - {' '}
                      {project.endDate ? new Date(project.endDate).toLocaleDateString('pt-BR') : 'Em andamento'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Descrição</label>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manager Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Gestor do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{project.manager.name}</h3>
                    <p className="text-muted-foreground">Gestor do Projeto</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{project.manager.email}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Telefone
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags do Projeto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tarefas do Projeto</CardTitle>
              <CardDescription>
                Todas as tarefas atribuídas ao projeto {project.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTaskStatusIcon(task.status)}
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            <User className="w-3 h-3 inline mr-1" />
                            {task.assignedTo}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs text-muted-foreground">
                              Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                        {getTaskStatusText(task.status)}
                      </Badge>
                      <Badge variant={getPriorityColor(task.priority)}>
                        {getPriorityText(task.priority)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Palavras-Chave Monitoradas
              </CardTitle>
              <CardDescription>
                Posições e métricas das principais palavras-chave
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{keyword.keyword}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Volume: {keyword.volume.toLocaleString('pt-BR')}</span>
                        <span>Dificuldade: {keyword.difficulty}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">#{keyword.position}</div>
                      <div className="text-xs text-muted-foreground">Posição</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Métricas de Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.metrics.map((metric) => (
                  <div key={metric.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{metric.name}</h4>
                      <div className={`flex items-center gap-1 text-sm ${
                        metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="w-4 h-4" />
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </div>
                    </div>
                    <div className="text-2xl font-bold">
                      {metric.value.toLocaleString('pt-BR')} {metric.unit}
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                        <span>Meta</span>
                        <span>{metric.target.toLocaleString('pt-BR')} {metric.unit}</span>
                      </div>
                      <Progress 
                        value={Math.min((metric.value / metric.target) * 100, 100)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Equipe do Projeto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.team.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-1" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
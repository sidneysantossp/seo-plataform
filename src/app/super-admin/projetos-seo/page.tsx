'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Plus,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Pause,
  Eye,
  Settings,
  MoreHorizontal
} from 'lucide-react'
import Link from 'next/link'
import { seoProjects, type SEOProject } from '@/data/seoProjects'

export default function SEOProjectsPage() {
  const [projects, setProjects] = useState<SEOProject[]>(seoProjects)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

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

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-500" />
      case 'blocked': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getProjectProgress = (project: SEOProject) => {
    const completedTasks = project.tasks.filter(task => task.status === 'completed').length
    return project.tasks.length > 0 ? (completedTasks / project.tasks.length) * 100 : 0
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projetos SEO</h1>
          <p className="text-muted-foreground">
            Gestão completa de projetos de otimização para mecanismos de busca
          </p>
        </div>
        <Link href="/super-admin/projetos-seo/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">Projetos ativos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">Investimento total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(projects.reduce((sum, p) => sum + getProjectProgress(p), 0) / projects.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Média geral</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar projetos ou clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">Todos Status</option>
                <option value="active">Ativos</option>
                <option value="paused">Pausados</option>
                <option value="completed">Concluídos</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.client}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                  <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                    {getStatusText(project.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Project Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                  {project.endDate && (
                    <span>- {new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{project.team.length} membros</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span>R$ {project.budget.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progresso</span>
                  <span className="font-medium">{Math.round(getProjectProgress(project))}%</span>
                </div>
                <Progress value={getProjectProgress(project)} className="h-2" />
              </div>

              {/* Current Tasks */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Tarefas Atuais</p>
                <div className="space-y-1">
                  {project.tasks.slice(0, 2).map((task) => (
                    <div key={task.id} className="flex items-center gap-2 text-xs">
                      {getTaskStatusIcon(task.status)}
                      <span className="flex-1 truncate">{task.title}</span>
                    </div>
                  ))}
                  {project.tasks.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{project.tasks.length - 2} tarefas
                    </p>
                  )}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Métricas Principais</p>
                <div className="grid grid-cols-2 gap-2">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.id} className="text-xs">
                      <span className="text-muted-foreground">{metric.name}:</span>
                      <span className="font-medium ml-1">
                        {metric.value} {metric.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link href={`/super-admin/projetos-seo/${project.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Tente ajustar sua busca ou filtros.' : 'Comece criando seu primeiro projeto SEO.'}
            </p>
            <Link href="/super-admin/projetos-seo/novo">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Projeto
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
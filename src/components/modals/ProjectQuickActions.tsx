'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
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
  Edit,
  MoreHorizontal,
  BarChart3,
  FileText,
  Search,
  Link
} from 'lucide-react'

interface ProjectQuickActionsProps {
  project: {
    id: string
    name: string
    client: string
    status: 'active' | 'paused' | 'completed' | 'cancelled'
    priority: 'low' | 'medium' | 'high'
    progress: number
    budget: number
    spent: number
    teamSize: number
    tasksCompleted: number
    tasksTotal: number
    metrics: {
      traffic: number
      conversions: number
      rankings: number
    }
  }
  onAction?: (action: string, projectId: string) => void
}

export function ProjectQuickActions({ project, onAction }: ProjectQuickActionsProps) {
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

  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action, project.id)
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Progresso</span>
            </div>
            <Badge variant={getPriorityColor(project.priority)}>
              {getPriorityText(project.priority)}
            </Badge>
          </div>
          <Progress value={project.progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{project.tasksCompleted} de {project.tasksTotal} tarefas</span>
            <span>{Math.round(project.progress)}%</span>
          </div>
        </div>

        {/* Budget Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span>Orçamento</span>
          </div>
          <Progress value={(project.spent / project.budget) * 100} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>R$ {project.spent.toLocaleString('pt-BR')} utilizado</span>
            <span>R$ {project.budget.toLocaleString('pt-BR')} total</span>
          </div>
        </div>

        {/* Team Info */}
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>{project.teamSize} membros na equipe</span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-muted rounded">
            <div className="text-lg font-bold text-blue-600">
              {project.metrics.traffic}
            </div>
            <div className="text-xs text-muted-foreground">Tráfego</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-lg font-bold text-green-600">
              {project.metrics.conversions}
            </div>
            <div className="text-xs text-muted-foreground">Conversões</div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="text-lg font-bold text-purple-600">
              {project.metrics.rankings}
            </div>
            <div className="text-xs text-muted-foreground">Rankings</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAction('view')}
            className="h-auto p-3 flex flex-col items-center gap-1"
          >
            <Eye className="w-4 h-4" />
            <span className="text-xs">Ver</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAction('edit')}
            className="h-auto p-3 flex flex-col items-center gap-1"
          >
            <Edit className="w-4 h-4" />
            <span className="text-xs">Editar</span>
          </Button>
          {project.status === 'active' ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleAction('pause')}
              className="h-auto p-3 flex flex-col items-center gap-1"
            >
              <Pause className="w-4 h-4" />
              <span className="text-xs">Pausar</span>
            </Button>
          ) : (
            <Button 
              size="sm" 
              onClick={() => handleAction('start')}
              className="h-auto p-3 flex flex-col items-center gap-1"
            >
              <Play className="w-4 h-4" />
              <span className="text-xs">Iniciar</span>
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAction('analytics')}
            className="h-auto p-3 flex flex-col items-center gap-1"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs">Analytics</span>
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction('tasks')}
            className="flex-1"
          >
            <FileText className="w-4 h-4 mr-1" />
            Tarefas
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction('keywords')}
            className="flex-1"
          >
            <Search className="w-4 h-4 mr-1" />
            Keywords
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction('backlinks')}
            className="flex-1"
          >
            <Link className="w-4 h-4 mr-1" />
            Backlinks
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
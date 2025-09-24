'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Bot,
  User,
  Settings,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Eye,
  Edit,
  MoreHorizontal,
  BarChart3,
  Zap,
  Target,
  Cpu,
  Database,
  Shield,
  Mail,
  Phone
} from 'lucide-react'

interface AgentQuickActionsProps {
  agent: {
    id: string
    name: string
    description: string
    type: 'content' | 'analysis' | 'research' | 'technical' | 'outreach' | 'social'
    status: 'active' | 'training' | 'inactive' | 'error'
    manager: {
      name: string
      email: string
      role: string
      department: string
    }
    performance: {
      quality: number
      accuracy: number
      speed: number
      reliability: number
    }
    tasks: {
      running: number
      completed: number
      total: number
    }
    metrics: {
      cpu: number
      memory: number
      responseTime: number
      uptime: number
    }
  }
  onAction?: (action: string, agentId: string) => void
}

export function AgentQuickActions({ agent, onAction }: AgentQuickActionsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'training': return 'bg-yellow-500'
      case 'inactive': return 'bg-gray-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'training': return 'Em Treinamento'
      case 'inactive': return 'Inativo'
      case 'error': return 'Erro'
      default: return 'Desconhecido'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'content': return <Target className="w-4 h-4" />
      case 'analysis': return <TrendingUp className="w-4 h-4" />
      case 'research': return <Zap className="w-4 h-4" />
      case 'technical': return <Settings className="w-4 h-4" />
      case 'outreach': return <User className="w-4 h-4" />
      case 'social': return <Activity className="w-4 h-4" />
      default: return <Bot className="w-4 h-4" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'content': return 'Conteúdo'
      case 'analysis': return 'Análise'
      case 'research': return 'Pesquisa'
      case 'technical': return 'Técnico'
      case 'outreach': return 'Outreach'
      case 'social': return 'Social'
      default: return 'Desconhecido'
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action, agent.id)
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon(agent.type)}
            <div>
              <CardTitle className="text-lg line-clamp-1">{agent.name}</CardTitle>
              <CardDescription className="text-sm">
                {agent.description}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
            <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
              {getStatusText(agent.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Manager Info */}
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{agent.manager.name}</p>
              <p className="text-xs text-muted-foreground">{agent.manager.role}</p>
              <p className="text-xs text-muted-foreground">{agent.manager.department}</p>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Performance Geral</span>
            <span className={`font-medium ${getPerformanceColor(agent.performance.quality)}`}>
              {agent.performance.quality}%
            </span>
          </div>
          <Progress value={agent.performance.quality} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Precisão: {agent.performance.accuracy}%</span>
            <span>Confiabilidade: {agent.performance.reliability}%</span>
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Tarefas</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-blue-50 rounded">
              <div className="text-lg font-bold text-blue-600">
                {agent.tasks.running}
              </div>
              <div className="text-xs text-muted-foreground">Executando</div>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <div className="text-lg font-bold text-green-600">
                {agent.tasks.completed}
              </div>
              <div className="text-xs text-muted-foreground">Concluídas</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-lg font-bold text-gray-600">
                {agent.tasks.total}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Métricas do Sistema</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                CPU
              </span>
              <span>{agent.metrics.cpu}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3" />
                Memória
              </span>
              <span>{agent.metrics.memory}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Resposta
              </span>
              <span>{agent.metrics.responseTime.toFixed(1)}s</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Uptime
              </span>
              <span>{agent.metrics.uptime}%</span>
            </div>
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
          {agent.status === 'active' ? (
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
            onClick={() => handleAction('monitor')}
            className="h-auto p-3 flex flex-col items-center gap-1"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs">Monitorar</span>
          </Button>
        </div>

        {/* Manager Actions */}
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction('email_manager')}
            className="flex-1"
          >
            <Mail className="w-4 h-4 mr-1" />
            Gestor
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction('tasks')}
            className="flex-1"
          >
            <Clock className="w-4 h-4 mr-1" />
            Tarefas
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction('config')}
            className="flex-1"
          >
            <Settings className="w-4 h-4 mr-1" />
            Config
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
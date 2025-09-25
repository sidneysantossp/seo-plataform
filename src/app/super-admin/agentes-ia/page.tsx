'use client'

import { useState, useEffect } from 'react'
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
  AlertCircle,
  Zap,
  Target,
  Plus,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import { preconfiguredAgents, type AIAgent } from '@/data/preconfiguredAgents'

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>(preconfiguredAgents)
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null)

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

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'running': return <Clock className="w-4 h-4 text-blue-500" />
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getTaskStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída'
      case 'running': return 'Em execução'
      case 'error': return 'Erro'
      case 'pending': return 'Pendente'
      default: return 'Desconhecido'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Agentes de IA</h1>
          <p className="text-muted-foreground">
            Gestão dos 6 agentes pré-configurados para SEO
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Agente
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Agentes</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-xs text-muted-foreground">Agentes pré-configurados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agentes Ativos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.filter(a => a.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Operando normalmente</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Ativas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.reduce((sum, agent) => sum + agent.tasks.filter(t => t.status === 'running').length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Em execução</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(agents.reduce((sum, agent) => sum + agent.performance.quality, 0) / agents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Qualidade geral</p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(agent.type)}
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
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
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{agent.manager.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.manager.role}</p>
                  <p className="text-xs text-muted-foreground">{agent.manager.email}</p>
                </div>
              </div>

              {/* Performance */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Performance</span>
                  <span className="font-medium">{agent.performance.quality}%</span>
                </div>
                <Progress value={agent.performance.quality} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Precisão: {agent.performance.accuracy}%</span>
                  <span>Confiabilidade: {agent.performance.reliability}%</span>
                </div>
              </div>

              {/* Current Tasks */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Tarefas Atuais</p>
                <div className="space-y-1">
                  {agent.tasks.slice(0, 2).map((task) => (
                    <div key={task.id} className="flex items-center gap-2 text-xs">
                      {getTaskStatusIcon(task.status)}
                      <span className="flex-1 truncate">{task.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {getTaskStatusText(task.status)}
                      </Badge>
                    </div>
                  ))}
                  {agent.tasks.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{agent.tasks.length - 2} tarefas pendentes
                    </p>
                  )}
                </div>
              </div>

              {/* Capabilities */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Capacidades</p>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 3).map((capability, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                  {agent.capabilities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{agent.capabilities.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link href={`/super-admin/agentes-ia/${agent.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Gerencie múltiplos agentes simultaneamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Zap className="h-6 w-6" />
              <span className="text-sm">Iniciar Todos</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Clock className="h-6 w-6" />
              <span className="text-sm">Pausar Todos</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Relatório Geral</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">Configurar Todos</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
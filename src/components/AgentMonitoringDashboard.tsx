'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Activity,
  TrendingUp,
  Zap,
  Cpu,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Target,
  Users,
  Bot
} from 'lucide-react'

interface RealTimeMetrics {
  cpu: number
  memory: number
  responseTime: number
  uptime: number
  tasksRunning: number
  tasksCompleted: number
  errors: number
  lastUpdate: string
}

interface AgentPerformance {
  id: string
  name: string
  status: 'active' | 'training' | 'inactive' | 'error'
  performance: number
  tasks: number
  cpu: number
  memory: number
  responseTime: number
}

export function AgentMonitoringDashboard() {
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    cpu: 0,
    memory: 0,
    responseTime: 0,
    uptime: 0,
    tasksRunning: 0,
    tasksCompleted: 0,
    errors: 0,
    lastUpdate: new Date().toISOString()
  })

  const [agents, setAgents] = useState<AgentPerformance[]>([
    {
      id: '1',
      name: 'Content Writer Pro',
      status: 'active',
      performance: 92,
      tasks: 3,
      cpu: 45,
      memory: 62,
      responseTime: 1.2
    },
    {
      id: '2',
      name: 'SEO Analyst Expert',
      status: 'active',
      performance: 95,
      tasks: 2,
      cpu: 38,
      memory: 55,
      responseTime: 0.8
    },
    {
      id: '3',
      name: 'Keyword Research Master',
      status: 'active',
      performance: 88,
      tasks: 4,
      cpu: 52,
      memory: 68,
      responseTime: 1.5
    },
    {
      id: '4',
      name: 'Technical SEO Specialist',
      status: 'training',
      performance: 94,
      tasks: 1,
      cpu: 28,
      memory: 45,
      responseTime: 2.1
    },
    {
      id: '5',
      name: 'Link Builder Pro',
      status: 'active',
      performance: 91,
      tasks: 5,
      cpu: 41,
      memory: 58,
      responseTime: 1.8
    },
    {
      id: '6',
      name: 'Social Media AI',
      status: 'active',
      performance: 89,
      tasks: 3,
      cpu: 35,
      memory: 48,
      responseTime: 1.1
    }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.floor(Math.random() * 30) + 30, // 30-60%
        memory: Math.floor(Math.random() * 40) + 40, // 40-80%
        responseTime: Math.random() * 2 + 0.5, // 0.5-2.5s
        uptime: 99.9,
        tasksRunning: Math.floor(Math.random() * 10) + 5, // 5-15
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 3),
        errors: Math.floor(Math.random() * 2),
        lastUpdate: new Date().toISOString()
      }))

      setAgents(prev => prev.map(agent => ({
        ...agent,
        cpu: Math.max(0, Math.min(100, agent.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, agent.memory + (Math.random() - 0.5) * 8)),
        responseTime: Math.max(0.1, agent.responseTime + (Math.random() - 0.5) * 0.4),
        performance: Math.max(70, Math.min(100, agent.performance + (Math.random() - 0.5) * 2))
      })))
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500'
      case 'training': return 'text-yellow-500'
      case 'inactive': return 'text-gray-500'
      case 'error': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'training': return <Clock className="w-4 h-4" />
      case 'inactive': return <Clock className="w-4 h-4" />
      case 'error': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600'
    if (performance >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Total</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.cpu}%</div>
            <Progress value={metrics.cpu} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Última atualização: {new Date(metrics.lastUpdate).toLocaleTimeString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memória Total</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.memory}%</div>
            <Progress value={metrics.memory} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Uso de memória do sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Resposta</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.responseTime.toFixed(1)}s</div>
            <Progress value={Math.max(0, 100 - metrics.responseTime * 20)} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Média de resposta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.uptime}%</div>
            <Progress value={metrics.uptime} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Disponibilidade do sistema
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas em Execução</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.tasksRunning}</div>
            <p className="text-xs text-muted-foreground">
              Agentes ativos no momento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.tasksCompleted}</div>
            <p className="text-xs text-muted-foreground">
              Total hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Erros</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.errors}</div>
            <p className="text-xs text-muted-foreground">
              Erros nas últimas 24h
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Agent Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Monitoramento Individual dos Agentes
          </CardTitle>
          <CardDescription>
            Performance em tempo real de cada agente de IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    agent.status === 'active' ? 'bg-green-100' : 
                    agent.status === 'training' ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    {getStatusIcon(agent.status)}
                  </div>
                  <div>
                    <h4 className="font-medium">{agent.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                        {agent.status === 'active' ? 'Ativo' : 
                         agent.status === 'training' ? 'Em Treinamento' : 'Inativo'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {agent.tasks} tarefas
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getPerformanceColor(agent.performance)}`}>
                      {agent.performance}%
                    </div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold">{agent.cpu}%</div>
                    <div className="text-xs text-muted-foreground">CPU</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold">{agent.memory}%</div>
                    <div className="text-xs text-muted-foreground">Memória</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold">{agent.responseTime.toFixed(1)}s</div>
                    <div className="text-xs text-muted-foreground">Resposta</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Saúde do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Métricas de Sistema</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status Geral</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-green-600">Operacional</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Carga do Sistema</span>
                  <span className="text-sm font-medium">Normal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conexões Ativas</span>
                  <span className="text-sm font-medium">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Latência de Rede</span>
                  <span className="text-sm font-medium">12ms</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Alertas Recentes</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm">Alto uso de CPU detectado</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Backup concluído com sucesso</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Novo agente iniciado</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
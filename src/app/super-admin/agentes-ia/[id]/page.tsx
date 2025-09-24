'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Mail,
  Phone,
  Building,
  Calendar,
  BarChart3,
  Cpu,
  Database,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { preconfiguredAgents, type AIAgent } from '@/data/preconfiguredAgents'

export default function AgentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [agent, setAgent] = useState<AIAgent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const agentId = params.id as string
    const foundAgent = preconfiguredAgents.find(a => a.id === agentId)
    setAgent(foundAgent || null)
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

  if (!agent) {
    return (
      <div className="p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Agente não encontrado</h1>
          <p className="text-muted-foreground">O agente solicitado não existe ou foi removido.</p>
          <Link href="/super-admin/agentes-ia">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Agentes
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'content': return <Target className="w-5 h-5" />
      case 'analysis': return <TrendingUp className="w-5 h-5" />
      case 'research': return <Zap className="w-5 h-5" />
      case 'technical': return <Settings className="w-5 h-5" />
      case 'outreach': return <User className="w-5 h-5" />
      case 'social': return <Activity className="w-5 h-5" />
      default: return <Bot className="w-5 h-5" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/super-admin/agentes-ia">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            {getTypeIcon(agent.type)}
            <div>
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              <p className="text-muted-foreground">{agent.description}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          {agent.status === 'active' ? (
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
              <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
              <span className="font-medium">{getStatusText(agent.status)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Última atualização: {new Date(agent.performance.lastUpdate).toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualidade</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agent.performance.quality}%</div>
            <Progress value={agent.performance.quality} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Ativas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agent.tasks.filter(t => t.status === 'running').length}
            </div>
            <p className="text-xs text-muted-foreground">
              de {agent.tasks.length} totais
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confiabilidade</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agent.performance.reliability}%</div>
            <Progress value={agent.performance.reliability} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="config">Configurações</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Manager Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Gestor Responsável
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{agent.manager.name}</h3>
                    <p className="text-muted-foreground">{agent.manager.role}</p>
                    <p className="text-sm text-muted-foreground">{agent.manager.department}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{agent.manager.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span>{agent.manager.department}</span>
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

            {/* Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Capacidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="secondary">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Métricas de Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Qualidade</span>
                    <span className="font-medium">{agent.performance.quality}%</span>
                  </div>
                  <Progress value={agent.performance.quality} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Precisão</span>
                    <span className="font-medium">{agent.performance.accuracy}%</span>
                  </div>
                  <Progress value={agent.performance.accuracy} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Velocidade</span>
                    <span className="font-medium">{agent.performance.speed}%</span>
                  </div>
                  <Progress value={agent.performance.speed} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Confiabilidade</span>
                    <span className="font-medium">{agent.performance.reliability}%</span>
                  </div>
                  <Progress value={agent.performance.reliability} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tarefas do Agente</CardTitle>
              <CardDescription>
                Todas as tarefas atribuídas a {agent.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agent.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTaskStatusIcon(task.status)}
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-4 mt-1">
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
                      <Badge variant="outline">
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações do Agente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.config.map((config) => (
                  <div key={config.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{config.key}</h4>
                      <Badge variant="outline">{config.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{config.description}</p>
                    <div className="p-2 bg-muted rounded text-sm font-mono">
                      {Array.isArray(config.value) ? config.value.join(', ') : String(config.value)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Performance em Tempo Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Uso de CPU</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Uso de Memória</span>
                      <span className="font-medium">62%</span>
                    </div>
                    <Progress value={62} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tempo de Resposta</span>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <Progress value={75} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Estatísticas de Uso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tarefas Concluídas</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tempo de Operação</span>
                    <span className="font-medium">15 dias</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taxa de Sucesso</span>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Última Reinicialização</span>
                    <span className="font-medium">2 horas atrás</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
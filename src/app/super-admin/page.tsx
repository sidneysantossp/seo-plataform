'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Bot, 
  Activity,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react'

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: 'Projetos Ativos',
      value: '24',
      change: '+12%',
      icon: FileText,
      description: 'Projetos SEO em andamento'
    },
    {
      title: 'Agentes de IA',
      value: '6',
      change: '+100%',
      icon: Bot,
      description: 'Agentes pré-configurados'
    },
    {
      title: 'Tarefas Concluídas',
      value: '156',
      change: '+23%',
      icon: CheckCircle,
      description: 'Neste mês'
    },
    {
      title: 'Performance',
      value: '92%',
      change: '+5%',
      icon: TrendingUp,
      description: 'Média geral'
    }
  ]

  const recentActivities = [
    {
      agent: 'Content Writer Pro',
      action: 'iniciou tarefa',
      task: 'Criar artigo sobre tendências SEO 2024',
      time: '2 min atrás',
      status: 'running'
    },
    {
      agent: 'SEO Analyst Expert',
      action: 'concluiu análise',
      task: 'Auditoria SEO completa',
      time: '15 min atrás',
      status: 'completed'
    },
    {
      agent: 'Keyword Research Master',
      action: 'atualizou dados',
      task: 'Pesquisa de palavras-chave',
      time: '1 hora atrás',
      status: 'completed'
    },
    {
      agent: 'Technical SEO Specialist',
      action: 'detectou problema',
      task: 'Otimização Core Web Vitals',
      time: '2 horas atrás',
      status: 'error'
    }
  ]

  const agentStatus = [
    {
      name: 'Content Writer Pro',
      status: 'active',
      tasks: 3,
      performance: 92,
      manager: 'Ana Silva'
    },
    {
      name: 'SEO Analyst Expert',
      status: 'active',
      tasks: 2,
      performance: 95,
      manager: 'Carlos Oliveira'
    },
    {
      name: 'Keyword Research Master',
      status: 'active',
      tasks: 4,
      performance: 88,
      manager: 'Mariana Santos'
    },
    {
      name: 'Technical SEO Specialist',
      status: 'training',
      tasks: 1,
      performance: 94,
      manager: 'Roberto Ferreira'
    },
    {
      name: 'Link Builder Pro',
      status: 'active',
      tasks: 5,
      performance: 91,
      manager: 'Patricia Lima'
    },
    {
      name: 'Social Media AI',
      status: 'active',
      tasks: 3,
      performance: 89,
      manager: 'Fernanda Costa'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Super Admin</h1>
          <p className="text-muted-foreground">Visão geral da plataforma SaaS SEO</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Status dos Agentes de IA
            </CardTitle>
            <CardDescription>
              Monitoramento em tempo real dos 6 agentes pré-configurados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentStatus.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      agent.status === 'active' ? 'bg-green-500' : 
                      agent.status === 'training' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                      {agent.tasks} tarefas
                    </Badge>
                    <span className="text-sm font-medium">{agent.performance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Últimas ações dos agentes de IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className={`mt-0.5 ${
                    activity.status === 'completed' ? 'text-green-500' :
                    activity.status === 'running' ? 'text-blue-500' : 'text-red-500'
                  }`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : activity.status === 'running' ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.agent}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{activity.task}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>
            Acessar rapidamente as funcionalidades principais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Novo Projeto SEO</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Bot className="h-6 w-6" />
              <span className="text-sm">Configurar Agente</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Ver Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Gerenciar Equipe</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
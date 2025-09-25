'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  User,
  Briefcase,
  Star,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  TrendingUp,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  startDate: string
  skills: string[]
  status: 'active' | 'inactive'
  avatar?: string
  performance?: {
    completedTasks: number
    totalTasks: number
    averageRating: number
    productivity: number
  }
}

export default function TeamMemberDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const memberId = params.memberId as string

  // Dados de exemplo para o membro da equipe
  const [member] = useState<TeamMember>({
    id: memberId,
    name: 'Ana Silva',
    email: 'ana.silva@agencia.com',
    phone: '+55 11 99999-8888',
    role: 'SEO Specialist',
    department: 'SEO',
    startDate: '2024-01-15',
    skills: ['SEO On-Page', 'SEO Técnico', 'Análise de Dados', 'Content Strategy', 'Link Building'],
    status: 'active',
    performance: {
      completedTasks: 24,
      totalTasks: 28,
      averageRating: 4.7,
      productivity: 85
    }
  })

  const handleSendEmail = () => {
    window.open(`mailto:${member.email}`, '_blank')
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-red-500'
  }

  const getStatusText = (status: string) => {
    return status === 'active' ? 'Ativo' : 'Inativo'
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (!member) {
    return <div>Membro não encontrado</div>
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/super-admin/projetos-seo/${projectId}/equipe`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Detalhes do Membro</h1>
          <p className="text-muted-foreground">
            Informações completas sobre {member.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
          <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
            {getStatusText(member.status)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{member.name}</h2>
                    <p className="text-lg text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Email:</span>
                      </div>
                      <p className="ml-6">{member.email}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Telefone:</span>
                      </div>
                      <p className="ml-6">{member.phone}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Departamento:</span>
                      </div>
                      <p className="ml-6">{member.department}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Data de Início:</span>
                      </div>
                      <p className="ml-6">{new Date(member.startDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          {member.performance && (
            <Card>
              <CardHeader>
                <CardTitle>Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {member.performance.completedTasks}/{member.performance.totalTasks}
                    </div>
                    <p className="text-sm text-muted-foreground">Tarefas Concluídas</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(member.performance.completedTasks / member.performance.totalTasks) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getPerformanceColor(member.performance.averageRating)}`}>
                      {member.performance.averageRating}
                    </div>
                    <p className="text-sm text-muted-foreground">Avaliação Média</p>
                    <div className="flex justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(member.performance.averageRating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getPerformanceColor(member.performance.productivity)}`}>
                      {member.performance.productivity}%
                    </div>
                    <p className="text-sm text-muted-foreground">Produtividade</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${member.performance.productivity}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((member.performance.completedTasks / member.performance.totalTasks) * 100)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${(member.performance.completedTasks / member.performance.totalTasks) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Completou tarefa "Otimização de meta tags"</p>
                    <p className="text-sm text-muted-foreground">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Iniciou tarefa "Análise de backlinks"</p>
                    <p className="text-sm text-muted-foreground">Há 5 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Tarefa "Auditoria técnica" precisa de revisão</p>
                    <p className="text-sm text-muted-foreground">Há 1 dia</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleSendEmail}
              >
                <Mail className="w-4 h-4 mr-2" />
                Enviar Email
              </Button>
              <Link href={`/super-admin/projetos-seo/${projectId}/equipe/${memberId}/editar`}>
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Membro
                </Button>
              </Link>
              <Link href={`/super-admin/projetos-seo/${projectId}/tarefas?assignee=${memberId}`}>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Ver Tarefas
                </Button>
              </Link>
              <Link href={`/super-admin/projetos-seo/${projectId}/relatorios?member=${memberId}`}>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Ver Relatórios
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Telefone</p>
                  <p className="text-sm text-muted-foreground">{member.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Departamento</p>
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Situação</span>
                  <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                    {getStatusText(member.status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tempo na Empresa</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor((new Date().getTime() - new Date(member.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} meses
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
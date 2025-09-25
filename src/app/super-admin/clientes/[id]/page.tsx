'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Edit,
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  Star,
  Target,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Settings,
  MoreHorizontal,
  Eye,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { clients, type Client } from '@/data/clients'
import { seoProjects, type SEOProject } from '@/data/seoProjects'

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [clientProjects, setClientProjects] = useState<SEOProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const clientId = params.id as string
    const foundClient = clients.find(c => c.id === clientId)
    const foundProjects = seoProjects.filter(p => p.client === foundClient?.name)
    
    setClient(foundClient || null)
    setClientProjects(foundProjects)
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

  if (!client) {
    return (
      <div className="p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Cliente não encontrado</h1>
          <p className="text-muted-foreground">O cliente solicitado não existe ou foi removido.</p>
          <Link href="/super-admin/clientes">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Clientes
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-red-500'
      case 'prospect': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'inactive': return 'Inativo'
      case 'prospect': return 'Prospecto'
      default: return 'Desconhecido'
    }
  }

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'completed': return 'bg-blue-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getProjectStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'paused': return 'Pausado'
      case 'completed': return 'Concluído'
      case 'cancelled': return 'Cancelado'
      default: return 'Desconhecido'
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
        <div className="flex items-center gap-4">
          <Link href="/super-admin/clientes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">{client.company} • {client.industry}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(client.status)}`} />
              <span className="font-medium">{getStatusText(client.status)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientProjects.length}</div>
            <p className="text-xs text-muted-foreground">Projetos ativos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {clientProjects.reduce((sum, p) => sum + p.budget, 0).toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">Investimento total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientProjects.length > 0 
                ? Math.round(clientProjects.reduce((sum, p) => sum + getProjectProgress(p), 0) / clientProjects.length) 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Média geral</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
          <TabsTrigger value="address">Endereço</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informações do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Razão Social</label>
                    <p className="font-medium">{client.company}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Documento</label>
                    <p className="font-medium">{client.document}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Indústria</label>
                    <p className="font-medium">{client.industry}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Website</label>
                    {client.website ? (
                      <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {client.website}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">Não informado</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Data de Cadastro</label>
                    <p className="font-medium">{new Date(client.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contato Principal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{client.contactPerson.name}</h3>
                    <p className="text-muted-foreground">{client.contactPerson.position}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{client.contactPerson.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{client.contactPerson.phone}</span>
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
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Projetos do Cliente</CardTitle>
                  <CardDescription>
                    Todos os projetos SEO associados ao cliente {client.name}
                  </CardDescription>
                </div>
                <Link href={`/super-admin/projetos-seo/novo`}>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Projeto
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {clientProjects.length > 0 ? (
                <div className="space-y-4">
                  {clientProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getProjectStatusColor(project.status)}`} />
                        <div className="flex-1">
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {new Date(project.startDate).toLocaleDateString('pt-BR')}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              <DollarSign className="w-3 h-3 inline mr-1" />
                              R$ {project.budget.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{Math.round(getProjectProgress(project))}%</div>
                          <div className="text-xs text-muted-foreground">Progresso</div>
                        </div>
                        <Link href={`/super-admin/projetos-seo/${project.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Visualizar detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum projeto encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Este cliente ainda não possui projetos SEO associados.
                  </p>
                  <Link href={`/super-admin/projetos-seo/novo`}>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Projeto
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contato Principal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nome</label>
                    <p className="font-medium">{client.contactPerson.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cargo</label>
                    <p className="font-medium">{client.contactPerson.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-medium">{client.contactPerson.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                    <p className="font-medium">{client.contactPerson.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Contato da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Empresa</label>
                    <p className="font-medium">{client.company}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-medium">{client.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                    <p className="font-medium">{client.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Website</label>
                    {client.website ? (
                      <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {client.website}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">Não informado</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="address" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço Completo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rua</label>
                    <p className="font-medium">{client.address.street}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Número</label>
                    <p className="font-medium">{client.address.number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Complemento</label>
                    <p className="font-medium">{client.address.complement || 'Não informado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bairro</label>
                    <p className="font-medium">{client.address.neighborhood}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cidade</label>
                    <p className="font-medium">{client.address.city}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Estado</label>
                    <p className="font-medium">{client.address.state}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">CEP</label>
                    <p className="font-medium">{client.address.zipCode}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Endereço Completo</h4>
                  <p className="text-sm">
                    {client.address.street}, {client.address.number}
                    {client.address.complement && `, ${client.address.complement}`}<br />
                    {client.address.neighborhood}, {client.address.city} - {client.address.state}<br />
                    {client.address.zipCode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
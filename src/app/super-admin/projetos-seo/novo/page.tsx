'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Save,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  Target,
  Users,
  Tag,
  Plus,
  X,
  Check
} from 'lucide-react'
import Link from 'next/link'
import { clients, type Client } from '@/data/clients'
import { seoProjects, type SEOProject } from '@/data/seoProjects'

interface NewProjectData {
  name: string
  description: string
  website: string
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  startDate: string
  endDate?: string
  budget: number
  tags: string[]
  clientId: string
}

export default function NewProjectPage() {
  const router = useRouter()
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [projectData, setProjectData] = useState<NewProjectData>({
    name: '',
    description: '',
    website: '',
    status: 'active',
    priority: 'medium',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    budget: 0,
    tags: [],
    clientId: ''
  })
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClientSelect = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    setSelectedClient(client || null)
    setProjectData(prev => ({
      ...prev,
      clientId,
      website: client?.website || ''
    }))
  }

  const handleInputChange = (field: keyof NewProjectData, value: string | number) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !projectData.tags.includes(newTag.trim())) {
      setProjectData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setProjectData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClient) {
      alert('Por favor, selecione um cliente')
      return
    }

    setIsSubmitting(true)
    
    // Simular criação do projeto
    const newProject: SEOProject = {
      id: (seoProjects.length + 1).toString(),
      name: projectData.name,
      description: projectData.description,
      client: selectedClient.name,
      website: projectData.website,
      status: projectData.status,
      priority: projectData.priority,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      budget: projectData.budget,
      spent: 0,
      manager: {
        id: 'm1',
        name: 'Ana Silva',
        email: 'ana.silva@agencia.com'
      },
      team: [],
      tasks: [],
      metrics: [],
      keywords: [],
      tags: projectData.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirecionar para a página do projeto
    router.push(`/super-admin/projetos-seo/${newProject.id}`)
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
            <h1 className="text-2xl font-bold">Novo Projeto SEO</h1>
            <p className="text-muted-foreground">
              Crie um novo projeto de otimização para mecanismos de busca
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !selectedClient}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="client" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="client">Dados do Cliente</TabsTrigger>
            <TabsTrigger value="project">Dados do Projeto</TabsTrigger>
            <TabsTrigger value="advanced">Configurações Avançadas</TabsTrigger>
          </TabsList>

          {/* Dados do Cliente */}
          <TabsContent value="client" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Selecionar Cliente
                </CardTitle>
                <CardDescription>
                  Escolha um cliente existente ou cadastre um novo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="client-select">Cliente</Label>
                  <div className="space-y-2">
                    <Select onValueChange={handleClientSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              <div>
                                <div className="font-medium">{client.name}</div>
                                <div className="text-sm text-muted-foreground">{client.industry}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Não tem um cliente cadastrado?{' '}
                      <Link href="/super-admin/clientes/novo" className="text-primary hover:underline">
                        Cadastre um novo cliente
                      </Link>
                    </p>
                  </div>
                </div>

                {selectedClient && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{selectedClient.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedClient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedClient.website || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedClient.address.city}, {selectedClient.address.state}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedClient.contactPerson.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant={selectedClient.status === 'active' ? 'default' : 'secondary'}>
                          {selectedClient.status === 'active' ? 'Ativo' : selectedClient.status === 'prospect' ? 'Prospecto' : 'Inativo'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedClient && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contato Principal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome</Label>
                      <p className="font-medium">{selectedClient.contactPerson.name}</p>
                    </div>
                    <div>
                      <Label>Cargo</Label>
                      <p className="font-medium">{selectedClient.contactPerson.position}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="font-medium">{selectedClient.contactPerson.email}</p>
                    </div>
                    <div>
                      <Label>Telefone</Label>
                      <p className="font-medium">{selectedClient.contactPerson.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Dados do Projeto */}
          <TabsContent value="project" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Informações Básicas do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-name">Nome do Projeto *</Label>
                    <Input
                      id="project-name"
                      value={projectData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ex: SEO para E-commerce Fashion"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-website">Website *</Label>
                    <Input
                      id="project-website"
                      type="url"
                      value={projectData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://exemplo.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="project-description">Descrição do Projeto *</Label>
                  <Textarea
                    id="project-description"
                    value={projectData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva os objetivos e escopo do projeto..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="project-status">Status</Label>
                    <Select value={projectData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="paused">Pausado</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="project-priority">Prioridade</Label>
                    <Select value={projectData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="project-budget">Orçamento (R$)</Label>
                    <Input
                      id="project-budget"
                      type="number"
                      value={projectData.budget}
                      onChange={(e) => handleInputChange('budget', Number(e.target.value))}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-start-date">Data de Início *</Label>
                    <Input
                      id="project-start-date"
                      type="date"
                      value={projectData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-end-date">Data de Término (opcional)</Label>
                    <Input
                      id="project-end-date"
                      type="date"
                      value={projectData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      min={projectData.startDate}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Tags do Projeto
                </CardTitle>
                <CardDescription>
                  Adicione tags para categorizar e organizar o projeto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Adicionar uma tag..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {projectData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações Avançadas */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Avançadas</CardTitle>
                <CardDescription>
                  Configurações adicionais para o projeto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Configurações Padrão</h4>
                    <p className="text-sm text-muted-foreground">
                      As configurações avançadas serão definidas após a criação do projeto na página de configurações.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Equipe Padrão</h4>
                      <p className="text-sm text-muted-foreground">
                        A equipe será definida na aba "Equipe" do projeto.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Métricas Iniciais</h4>
                      <p className="text-sm text-muted-foreground">
                        As métricas serão configuradas na aba "Métricas" do projeto.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
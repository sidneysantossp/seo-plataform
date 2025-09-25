'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Puzzle, 
  Plus, 
  Edit, 
  Trash2, 
  Settings, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle,
  FileText,
  Search,
  BarChart3,
  Bot,
  Globe,
  Database,
  Users,
  Star,
  Zap,
  Crown,
  Rocket,
  Activity,
  Shield,
  Target,
  TrendingUp
} from 'lucide-react'

interface ModuleLimit {
  name: string
  key: string
  type: 'number' | 'boolean'
  description: string
}

interface ModulePlan {
  planId: string
  enabled: boolean
  limits: Record<string, any>
}

interface Module {
  id: string
  name: string
  description: string
  category: 'seo' | 'content' | 'analytics' | 'ai' | 'integration' | 'utility'
  icon: React.ReactNode
  active: boolean
  order: number
  limits: ModuleLimit[]
  plans: ModulePlan[]
  features: string[]
  dependencies?: string[]
  config?: Record<string, any>
}

const moduleLimits: Record<string, ModuleLimit[]> = {
  projects: [
    { name: 'Limite de Projetos', key: 'maxProjects', type: 'number', description: 'Número máximo de projetos' },
    { name: 'Limite de Palavras-chave', key: 'maxKeywords', type: 'number', description: 'Palavras-chave por projeto' },
    { name: 'Limite de Conteúdo', key: 'maxContent', type: 'number', description: 'Conteúdos por projeto' }
  ],
  keywords: [
    { name: 'Pesquisas Diárias', key: 'dailySearches', type: 'number', description: 'Pesquisas de palavras-chave por dia' },
    { name: 'Volume de Dados', key: 'dataVolume', type: 'number', description: 'Volume de dados em MB' }
  ],
  content: [
    { name: 'Geração de Conteúdo', key: 'contentGeneration', type: 'boolean', description: 'Permitir geração de conteúdo' },
    { name: 'Limite Diário', key: 'dailyLimit', type: 'number', description: 'Conteúdos por dia' },
    { name: 'Palavras por Conteúdo', key: 'wordsPerContent', type: 'number', description: 'Limite de palavras' }
  ],
  analytics: [
    { name: 'Acesso Avançado', key: 'advancedAccess', type: 'boolean', description: 'Recursos avançados de analytics' },
    { name: 'Histórico de Dados', key: 'dataHistory', type: 'number', description: 'Dias de histórico disponível' },
    { name: 'Relatórios Personalizados', key: 'customReports', type: 'boolean', description: 'Criação de relatórios customizados' }
  ],
  'ai-agents': [
    { name: 'Agentes Disponíveis', key: 'availableAgents', type: 'number', description: 'Número de agentes simultâneos' },
    { name: 'Requisições Diárias', key: 'dailyRequests', type: 'number', description: 'Requisições à API por dia' },
    { name: 'Modelos Avançados', key: 'advancedModels', type: 'boolean', description: 'Acesso a modelos premium' }
  ],
  integrations: [
    { name: 'Integrações Ativas', key: 'activeIntegrations', type: 'number', description: 'Número de integrações simultâneas' },
    { name: 'API Externa', key: 'externalAPI', type: 'boolean', description: 'Permitir chamadas a APIs externas' }
  ]
}

export default function ModulosPage() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'projects',
      name: 'Projetos SEO',
      description: 'Gerenciamento completo de projetos SEO com monitoramento e otimização',
      category: 'seo',
      icon: <Target className="w-6 h-6" />,
      active: true,
      order: 1,
      limits: moduleLimits.projects,
      plans: [
        { planId: 'free', enabled: true, limits: { maxProjects: 1, maxKeywords: 10, maxContent: 5 } },
        { planId: 'pro', enabled: true, limits: { maxProjects: 10, maxKeywords: 100, maxContent: 50 } },
        { planId: 'enterprise', enabled: true, limits: { maxProjects: -1, maxKeywords: -1, maxContent: -1 } }
      ],
      features: ['Criação de projetos', 'Monitoramento SEO', 'Otimização de conteúdo', 'Relatórios de progresso']
    },
    {
      id: 'keywords',
      name: 'Pesquisa de Palavras-Chave',
      description: 'Ferramentas avançadas para pesquisa e análise de palavras-chave',
      category: 'seo',
      icon: <Search className="w-6 h-6" />,
      active: true,
      order: 2,
      limits: moduleLimits.keywords,
      plans: [
        { planId: 'free', enabled: true, limits: { dailySearches: 10, dataVolume: 100 } },
        { planId: 'pro', enabled: true, limits: { dailySearches: 100, dataVolume: 1000 } },
        { planId: 'enterprise', enabled: true, limits: { dailySearches: -1, dataVolume: -1 } }
      ],
      features: ['Análise de concorrência', 'Volume de busca', 'Dificuldade de keyword', 'Sugestões de palavras']
    },
    {
      id: 'content',
      name: 'Geração de Conteúdo',
      description: 'Criação e otimização de conteúdo com inteligência artificial',
      category: 'content',
      icon: <FileText className="w-6 h-6" />,
      active: true,
      order: 3,
      limits: moduleLimits.content,
      plans: [
        { planId: 'free', enabled: true, limits: { contentGeneration: true, dailyLimit: 5, wordsPerContent: 1000 } },
        { planId: 'pro', enabled: true, limits: { contentGeneration: true, dailyLimit: 50, wordsPerContent: 3000 } },
        { planId: 'enterprise', enabled: true, limits: { contentGeneration: true, dailyLimit: -1, wordsPerContent: -1 } }
      ],
      features: ['Geração com IA', 'Otimização SEO', 'Formatação automática', 'Múltiplos idiomas']
    },
    {
      id: 'analytics',
      name: 'Analytics Avançado',
      description: 'Análise detalhada de desempenho e métricas SEO',
      category: 'analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      active: true,
      order: 4,
      limits: moduleLimits.analytics,
      plans: [
        { planId: 'free', enabled: false, limits: {} },
        { planId: 'pro', enabled: true, limits: { advancedAccess: true, dataHistory: 30, customReports: false } },
        { planId: 'enterprise', enabled: true, limits: { advancedAccess: true, dataHistory: -1, customReports: true } }
      ],
      features: ['Métricas em tempo real', 'Histórico de dados', 'Comparação de períodos', 'Exportação de dados']
    },
    {
      id: 'ai-agents',
      name: 'Agentes de IA',
      description: 'Assistentes inteligentes para automação de tarefas SEO',
      category: 'ai',
      icon: <Bot className="w-6 h-6" />,
      active: true,
      order: 5,
      limits: moduleLimits['ai-agents'],
      plans: [
        { planId: 'free', enabled: false, limits: {} },
        { planId: 'pro', enabled: true, limits: { availableAgents: 3, dailyRequests: 1000, advancedModels: false } },
        { planId: 'enterprise', enabled: true, limits: { availableAgents: -1, dailyRequests: -1, advancedModels: true } }
      ],
      features: ['Assistente SEO', 'Análise automática', 'Recomendações', 'Automação de tarefas']
    },
    {
      id: 'integrations',
      name: 'Integrações',
      description: 'Conexão com plataformas e serviços externos',
      category: 'integration',
      icon: <Globe className="w-6 h-6" />,
      active: true,
      order: 6,
      limits: moduleLimits.integrations,
      plans: [
        { planId: 'free', enabled: false, limits: {} },
        { planId: 'pro', enabled: true, limits: { activeIntegrations: 3, externalAPI: false } },
        { planId: 'enterprise', enabled: true, limits: { activeIntegrations: -1, externalAPI: true } }
      ],
      features: ['Google Search Console', 'Google Analytics', 'WordPress', 'API REST']
    }
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const [newModule, setNewModule] = useState<Partial<Module>>({
    name: '',
    description: '',
    category: 'utility',
    active: true,
    order: modules.length + 1,
    limits: [],
    plans: [],
    features: []
  })

  const toggleModuleStatus = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, active: !module.active }
        : module
    ))
  }

  const updateModulePlan = (moduleId: string, planId: string, enabled: boolean) => {
    setModules(prev => prev.map(module => {
      if (module.id === moduleId) {
        const updatedPlans = module.plans.map(plan => 
          plan.planId === planId 
            ? { ...plan, enabled }
            : plan
        )
        return { ...module, plans: updatedPlans }
      }
      return module
    }))
  }

  const updateModuleLimit = (moduleId: string, planId: string, limitKey: string, value: any) => {
    setModules(prev => prev.map(module => {
      if (module.id === moduleId) {
        const updatedPlans = module.plans.map(plan => {
          if (plan.planId === planId) {
            const updatedLimits = { ...plan.limits, [limitKey]: value }
            return { ...plan, limits: updatedLimits }
          }
          return plan
        })
        return { ...module, plans: updatedPlans }
      }
      return module
    }))
  }

  const createModule = () => {
    if (newModule.name && newModule.description) {
      const newModuleItem: Module = {
        id: newModule.name.toLowerCase().replace(/\s+/g, '-'),
        name: newModule.name!,
        description: newModule.description!,
        category: newModule.category || 'utility',
        icon: <Puzzle className="w-6 h-6" />,
        active: newModule.active || true,
        order: newModule.order || modules.length + 1,
        limits: newModule.limits || [],
        plans: newModule.plans || [],
        features: newModule.features || []
      }
      setModules(prev => [...prev, newModuleItem])
      setNewModule({
        name: '',
        description: '',
        category: 'utility',
        active: true,
        order: modules.length + 1,
        limits: [],
        plans: [],
        features: []
      })
      setIsCreateDialogOpen(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      seo: <Target className="w-4 h-4" />,
      content: <FileText className="w-4 h-4" />,
      analytics: <BarChart3 className="w-4 h-4" />,
      ai: <Bot className="w-4 h-4" />,
      integration: <Globe className="w-4 h-4" />,
      utility: <Puzzle className="w-4 h-4" />
    }
    return icons[category] || <Puzzle className="w-4 h-4" />
  }

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      seo: 'SEO',
      content: 'Conteúdo',
      analytics: 'Analytics',
      ai: 'IA',
      integration: 'Integração',
      utility: 'Utilitário'
    }
    return names[category] || category
  }

  const modulesByCategory = modules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = []
    }
    acc[module.category].push(module)
    return acc
  }, {} as Record<string, Module[]>)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Módulos</h1>
          <p className="text-muted-foreground">
            Gerencie os módulos do sistema e suas configurações por plano
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Módulo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Módulo</DialogTitle>
              <DialogDescription>
                Configure um novo módulo do sistema com suas funcionalidades.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Módulo</Label>
                  <Input
                    id="name"
                    value={newModule.name || ''}
                    onChange={(e) => setNewModule(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Relatórios Avançados"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select onValueChange={(value: Module['category']) => setNewModule(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="content">Conteúdo</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="ai">IA</SelectItem>
                      <SelectItem value="integration">Integração</SelectItem>
                      <SelectItem value="utility">Utilitário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newModule.description || ''}
                  onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição do módulo..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Ordem</Label>
                <Input
                  id="order"
                  type="number"
                  value={newModule.order || ''}
                  onChange={(e) => setNewModule(prev => ({ ...prev, order: Number(e.target.value) }))}
                  placeholder="1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newModule.active || false}
                  onCheckedChange={(checked) => setNewModule(prev => ({ ...prev, active: checked }))}
                />
                <Label htmlFor="active">Módulo Ativo</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={createModule}>
                Criar Módulo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos os Módulos</TabsTrigger>
          {Object.keys(modulesByCategory).map(category => (
            <TabsTrigger key={category} value={category}>
              {getCategoryName(category)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card key={module.id} className={`relative ${module.active ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {module.icon}
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={module.active ? "default" : "secondary"}>
                        {module.active ? "Ativo" : "Inativo"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryName(module.category)}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Funcionalidades</h4>
                    <ul className="space-y-1">
                      {module.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                      {module.features.length > 3 && (
                        <li className="text-xs text-muted-foreground">
                          +{module.features.length - 3} mais funcionalidades
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Disponibilidade por Plano</h4>
                    <div className="space-y-2">
                      {module.plans.map((plan) => (
                        <div key={plan.planId} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={plan.enabled}
                              onCheckedChange={(checked) => updateModulePlan(module.id, plan.planId, checked)}
                            />
                            <span className="text-sm font-medium capitalize">{plan.planId}</span>
                          </div>
                          {plan.enabled && Object.keys(plan.limits).length > 0 && (
                            <Button variant="ghost" size="sm">
                              <Settings className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => toggleModuleStatus(module.id)}
                    >
                      {module.active ? "Desativar" : "Ativar"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {Object.entries(modulesByCategory).map(([category, categoryModules]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {getCategoryIcon(category)}
              <h3 className="text-lg font-semibold">{getCategoryName(category)}</h3>
              <Badge variant="outline">{categoryModules.length} módulos</Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {categoryModules.map((moduleItem) => (
                <Card key={moduleItem.id} className={`relative ${moduleItem.active ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {moduleItem.icon}
                        <CardTitle className="text-lg">{moduleItem.name}</CardTitle>
                      </div>
                      <Badge variant={moduleItem.active ? "default" : "secondary"}>
                        {moduleItem.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <CardDescription>{moduleItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Funcionalidades</h4>
                      <ul className="space-y-1">
                        {moduleItem.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Limites e Configurações</h4>
                      <div className="space-y-1">
                        {moduleItem.limits.map((limit) => (
                          <div key={limit.key} className="flex items-center justify-between text-xs">
                            <span>{limit.name}</span>
                            <span className="text-muted-foreground">{limit.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => toggleModuleStatus(moduleItem.id)}
                      >
                        {moduleItem.active ? "Desativar" : "Ativar"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Visão Geral dos Módulos</CardTitle>
          <CardDescription>
            Status e configurações de todos os módulos do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Módulo</th>
                  <th className="text-left p-2">Categoria</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Planos Disponíveis</th>
                  <th className="text-left p-2">Funcionalidades</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr key={module.id} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        {module.icon}
                        <span className="font-medium">{module.name}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(module.category)}
                        <span>{getCategoryName(module.category)}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant={module.active ? "default" : "secondary"}>
                        {module.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {module.plans.filter(p => p.enabled).map((plan) => (
                          <Badge key={plan.planId} variant="outline" className="text-xs capitalize">
                            {plan.planId}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-2">
                      <span className="text-sm text-muted-foreground">
                        {module.features.length} funcionalidades
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Users, 
  Zap,
  Database,
  BarChart3,
  FileText,
  Search,
  Bot,
  Globe,
  Star,
  Crown,
  Rocket
} from 'lucide-react'

interface PlanFeature {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

interface PlanModule {
  moduleId: string
  enabled: boolean
  limits?: {
    projects?: number
    keywords?: number
    content?: number
    aiRequests?: number
    storage?: number
  }
}

interface Plan {
  id: string
  name: string
  description: string
  price: number
  interval: 'monthly' | 'yearly'
  featured: boolean
  active: boolean
  color: string
  icon: React.ReactNode
  modules: PlanModule[]
  features: string[]
  userLimit: number
  popularFeatures: string[]
}

const availableFeatures: PlanFeature[] = [
  { id: 'projects', name: 'Projetos SEO', description: 'Gerenciamento de projetos SEO', icon: <FileText className="w-4 h-4" /> },
  { id: 'keywords', name: 'Pesquisa de Palavras-Chave', description: 'Ferramentas de pesquisa e análise', icon: <Search className="w-4 h-4" /> },
  { id: 'content', name: 'Geração de Conteúdo', description: 'Criação e otimização de conteúdo', icon: <FileText className="w-4 h-4" /> },
  { id: 'analytics', name: 'Analytics Avançado', description: 'Análise detalhada de desempenho', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'ai-agents', name: 'Agentes de IA', description: 'Assistentes de IA inteligentes', icon: <Bot className="w-4 h-4" /> },
  { id: 'integrations', name: 'Integrações', description: 'Conexão com plataformas externas', icon: <Globe className="w-4 h-4" /> },
  { id: 'reports', name: 'Relatórios Personalizados', description: 'Relatórios detalhados e exportáveis', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'api', name: 'Acesso à API', description: 'Integração via API REST', icon: <Database className="w-4 h-4" /> },
  { id: 'support', name: 'Suporte Prioritário', description: 'Suporte técnico dedicado', icon: <Users className="w-4 h-4" /> },
  { id: 'white-label', name: 'White Label', description: 'Remoção de marca e personalização', icon: <Star className="w-4 h-4" /> }
]

export default function PlanosPage() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: 'free',
      name: 'Free',
      description: 'Perfeito para começar e testar a plataforma',
      price: 0,
      interval: 'monthly',
      featured: false,
      active: true,
      color: 'bg-gray-100 border-gray-300',
      icon: <Rocket className="w-6 h-6" />,
      modules: [
        { moduleId: 'projects', enabled: true, limits: { projects: 1, keywords: 10, content: 5 } },
        { moduleId: 'keywords', enabled: true, limits: { keywords: 10 } },
        { moduleId: 'content', enabled: true, limits: { content: 5 } }
      ],
      features: ['projects', 'keywords', 'content'],
      userLimit: 1,
      popularFeatures: ['1 Projeto', '10 Palavras-chave', '5 Conteúdos']
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Ideal para pequenas e médias empresas',
      price: 99,
      interval: 'monthly',
      featured: true,
      active: true,
      color: 'bg-blue-50 border-blue-300',
      icon: <Star className="w-6 h-6" />,
      modules: [
        { moduleId: 'projects', enabled: true, limits: { projects: 10, keywords: 100, content: 50 } },
        { moduleId: 'keywords', enabled: true, limits: { keywords: 100 } },
        { moduleId: 'content', enabled: true, limits: { content: 50 } },
        { moduleId: 'analytics', enabled: true },
        { moduleId: 'ai-agents', enabled: true, limits: { aiRequests: 1000 } },
        { moduleId: 'integrations', enabled: true }
      ],
      features: ['projects', 'keywords', 'content', 'analytics', 'ai-agents', 'integrations', 'support'],
      userLimit: 5,
      popularFeatures: ['10 Projetos', '100 Palavras-chave', '50 Conteúdos', 'Analytics', 'Agentes de IA']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Solução completa para grandes empresas',
      price: 299,
      interval: 'monthly',
      featured: false,
      active: true,
      color: 'bg-purple-50 border-purple-300',
      icon: <Crown className="w-6 h-6" />,
      modules: [
        { moduleId: 'projects', enabled: true, limits: { projects: -1, keywords: -1, content: -1 } },
        { moduleId: 'keywords', enabled: true, limits: { keywords: -1 } },
        { moduleId: 'content', enabled: true, limits: { content: -1 } },
        { moduleId: 'analytics', enabled: true },
        { moduleId: 'ai-agents', enabled: true, limits: { aiRequests: -1 } },
        { moduleId: 'integrations', enabled: true },
        { moduleId: 'reports', enabled: true },
        { moduleId: 'api', enabled: true },
        { moduleId: 'support', enabled: true },
        { moduleId: 'white-label', enabled: true }
      ],
      features: ['projects', 'keywords', 'content', 'analytics', 'ai-agents', 'integrations', 'reports', 'api', 'support', 'white-label'],
      userLimit: -1,
      popularFeatures: ['Projetos Ilimitados', 'Palavras-chave Ilimitadas', 'API Completa', 'White Label']
    }
  ])

  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    name: '',
    description: '',
    price: 0,
    interval: 'monthly',
    featured: false,
    active: true,
    color: 'bg-gray-100 border-gray-300',
    userLimit: 1,
    features: [],
    modules: []
  })

  const togglePlanStatus = (planId: string) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId 
        ? { ...plan, active: !plan.active }
        : plan
    ))
  }

  const updatePlanModules = (planId: string, moduleId: string, enabled: boolean) => {
    setPlans(prev => prev.map(plan => {
      if (plan.id === planId) {
        const existingModuleIndex = plan.modules.findIndex(m => m.moduleId === moduleId)
        if (existingModuleIndex >= 0) {
          const updatedModules = [...plan.modules]
          updatedModules[existingModuleIndex] = { ...updatedModules[existingModuleIndex], enabled }
          return { ...plan, modules: updatedModules }
        } else {
          return { 
            ...plan, 
            modules: [...plan.modules, { moduleId, enabled, limits: {} }]
          }
        }
      }
      return plan
    }))
  }

  const createPlan = () => {
    if (newPlan.name && newPlan.description) {
      const plan: Plan = {
        id: newPlan.name.toLowerCase().replace(/\s+/g, '-'),
        name: newPlan.name!,
        description: newPlan.description!,
        price: newPlan.price || 0,
        interval: newPlan.interval || 'monthly',
        featured: newPlan.featured || false,
        active: newPlan.active || true,
        color: newPlan.color || 'bg-gray-100 border-gray-300',
        icon: <Star className="w-6 h-6" />,
        modules: newPlan.modules || [],
        features: newPlan.features || [],
        userLimit: newPlan.userLimit || 1,
        popularFeatures: []
      }
      setPlans(prev => [...prev, plan])
      setNewPlan({
        name: '',
        description: '',
        price: 0,
        interval: 'monthly',
        featured: false,
        active: true,
        color: 'bg-gray-100 border-gray-300',
        userLimit: 1,
        features: [],
        modules: []
      })
      setIsCreateDialogOpen(false)
    }
  }

  const getFeatureIcon = (featureId: string) => {
    const feature = availableFeatures.find(f => f.id === featureId)
    return feature?.icon || <Star className="w-4 h-4" />
  }

  const getFeatureName = (featureId: string) => {
    const feature = availableFeatures.find(f => f.id === featureId)
    return feature?.name || featureId
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Planos</h1>
          <p className="text-muted-foreground">
            Gerencie os planos de assinatura e seus recursos
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Plano</DialogTitle>
              <DialogDescription>
                Configure um novo plano de assinatura com seus recursos e limites.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Plano</Label>
                  <Input
                    id="name"
                    value={newPlan.name || ''}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newPlan.price || ''}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, price: Number(e.target.value) }))}
                    placeholder="99"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newPlan.description || ''}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição do plano..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interval">Intervalo</Label>
                  <Select onValueChange={(value: 'monthly' | 'yearly') => setNewPlan(prev => ({ ...prev, interval: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o intervalo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensal</SelectItem>
                      <SelectItem value="yearly">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userLimit">Limite de Usuários</Label>
                  <Input
                    id="userLimit"
                    type="number"
                    value={newPlan.userLimit || ''}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, userLimit: Number(e.target.value) }))}
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newPlan.featured || false}
                  onCheckedChange={(checked) => setNewPlan(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Plano Destacado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newPlan.active || false}
                  onCheckedChange={(checked) => setNewPlan(prev => ({ ...prev, active: checked }))}
                />
                <Label htmlFor="active">Plano Ativo</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={createPlan}>
                Criar Plano
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.featured ? 'ring-2 ring-primary' : ''} ${plan.color} border-2`}>
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  Mais Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                {plan.icon}
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">R${plan.price}</span>
                <span className="text-muted-foreground">/{plan.interval === 'monthly' ? 'mês' : 'ano'}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Status</span>
                  <Badge variant={plan.active ? "default" : "secondary"}>
                    {plan.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Limite de Usuários</span>
                  <span>{plan.userLimit === -1 ? 'Ilimitado' : plan.userLimit}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Recursos Populares</h4>
                <ul className="space-y-1 text-sm">
                  {plan.popularFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Módulos Disponíveis</h4>
                <div className="space-y-2">
                  {availableFeatures.map((feature) => {
                    const isEnabled = plan.modules.some(m => m.moduleId === feature.id && m.enabled)
                    return (
                      <div key={feature.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {feature.icon}
                          <span className="text-sm">{feature.name}</span>
                        </div>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={(checked) => updatePlanModules(plan.id, feature.id, checked)}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => togglePlanStatus(plan.id)}
                >
                  {plan.active ? "Desativar" : "Ativar"}
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

      <Card>
        <CardHeader>
          <CardTitle>Resumo dos Planos</CardTitle>
          <CardDescription>
            Visão geral de todos os planos e suas configurações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Plano</th>
                  <th className="text-left p-2">Preço</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Usuários</th>
                  <th className="text-left p-2">Módulos</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        {plan.icon}
                        <span className="font-medium">{plan.name}</span>
                        {plan.featured && <Badge variant="default">Destaque</Badge>}
                      </div>
                    </td>
                    <td className="p-2">R${plan.price}/{plan.interval === 'monthly' ? 'mês' : 'ano'}</td>
                    <td className="p-2">
                      <Badge variant={plan.active ? "default" : "secondary"}>
                        {plan.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </td>
                    <td className="p-2">{plan.userLimit === -1 ? 'Ilimitado' : plan.userLimit}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {plan.features.slice(0, 3).map((featureId) => (
                          <Badge key={featureId} variant="outline" className="text-xs">
                            {getFeatureName(featureId)}
                          </Badge>
                        ))}
                        {plan.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{plan.features.length - 3}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3" />
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
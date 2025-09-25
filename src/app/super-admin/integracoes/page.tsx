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
import { 
  Bot, 
  Search, 
  BarChart3, 
  MapPin, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Loader2,
  RefreshCw,
  Sparkles,
  Zap
} from 'lucide-react'

interface IntegrationStatus {
  connected: boolean
  lastChecked?: string
  error?: string
}

interface IntegrationConfig {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: 'ia' | 'google' | 'other'
  fields: Array<{
    name: string
    label: string
    type: 'text' | 'password' | 'url'
    placeholder: string
    required: boolean
  }>
  status: IntegrationStatus
}

export default function IntegracoesPage() {
  const [configs, setConfigs] = useState<IntegrationConfig[]>([
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'Integração com a API da OpenAI para geração de conteúdo',
      icon: <Bot className="w-5 h-5" />,
      category: 'ia',
      fields: [
        {
          name: 'apiKey',
          label: 'API Key',
          type: 'password',
          placeholder: 'sk-...',
          required: true
        },
        {
          name: 'model',
          label: 'Modelo',
          type: 'text',
          placeholder: 'gpt-4',
          required: false
        }
      ],
      status: { connected: false }
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      description: 'Integração com a API da Anthropic para assistentes de IA',
      icon: <Bot className="w-5 h-5" />,
      category: 'ia',
      fields: [
        {
          name: 'apiKey',
          label: 'API Key',
          type: 'password',
          placeholder: 'sk-ant-...',
          required: true
        }
      ],
      status: { connected: false }
    },
    {
      id: 'perplexity',
      name: 'Perplexity',
      description: 'Integração com a API da Perplexity para pesquisa e análise avançada',
      icon: <Sparkles className="w-5 h-5" />,
      category: 'ia',
      fields: [
        {
          name: 'apiKey',
          label: 'API Key',
          type: 'password',
          placeholder: 'pplx-...',
          required: true
        },
        {
          name: 'model',
          label: 'Modelo',
          type: 'text',
          placeholder: 'llama-3.1-sonar-large-128k-online',
          required: false
        }
      ],
      status: { connected: false }
    },
    {
      id: 'grok',
      name: 'Grok',
      description: 'Integração com a API do Grok para análise de dados em tempo real',
      icon: <Zap className="w-5 h-5" />,
      category: 'ia',
      fields: [
        {
          name: 'apiKey',
          label: 'API Key',
          type: 'password',
          placeholder: 'xai-...',
          required: true
        },
        {
          name: 'model',
          label: 'Modelo',
          type: 'text',
          placeholder: 'grok-beta',
          required: false
        }
      ],
      status: { connected: false }
    },
    {
      id: 'google-search',
      name: 'Google Search Console',
      description: 'Monitoramento de desempenho nos resultados de busca',
      icon: <Search className="w-5 h-5" />,
      category: 'google',
      fields: [
        {
          name: 'clientId',
          label: 'Client ID',
          type: 'text',
          placeholder: 'Seu Client ID',
          required: true
        },
        {
          name: 'clientSecret',
          label: 'Client Secret',
          type: 'password',
          placeholder: 'Seu Client Secret',
          required: true
        }
      ],
      status: { connected: false }
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Análise de tráfego e comportamento dos usuários',
      icon: <BarChart3 className="w-5 h-5" />,
      category: 'google',
      fields: [
        {
          name: 'viewId',
          label: 'View ID',
          type: 'text',
          placeholder: '123456789',
          required: true
        },
        {
          name: 'credentials',
          label: 'JSON Credentials',
          type: 'password',
          placeholder: 'Cole o JSON aqui',
          required: true
        }
      ],
      status: { connected: false }
    },
    {
      id: 'google-maps',
      name: 'Google Meu Negócio',
      description: 'Gerenciamento de informações locais e avaliações',
      icon: <MapPin className="w-5 h-5" />,
      category: 'google',
      fields: [
        {
          name: 'apiKey',
          label: 'API Key',
          type: 'password',
          placeholder: 'Sua API Key',
          required: true
        },
        {
          name: 'placeId',
          label: 'Place ID',
          type: 'text',
          placeholder: 'ChIJ...',
          required: true
        }
      ],
      status: { connected: false }
    }
  ])

  const [testingId, setTestingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({})

  const handleFieldChange = (integrationId: string, fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [integrationId]: {
        ...(prev[integrationId] || {}),
        [fieldName]: value
      }
    }))
  }

  const testConnection = async (integrationId: string) => {
    setTestingId(integrationId)
    
    // Simular teste de conexão
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const config = configs.find(c => c.id === integrationId)
    if (config) {
      const success = Math.random() > 0.3 // 70% de chance de sucesso para demonstração
      
      setConfigs(prev => prev.map(c => 
        c.id === integrationId 
          ? {
              ...c,
              status: {
                connected: success,
                lastChecked: new Date().toISOString(),
                error: success ? undefined : 'Falha na autenticação. Verifique suas credenciais.'
              }
            }
          : c
      ))
    }
    
    setTestingId(null)
  }

  const saveIntegration = (integrationId: string) => {
    const config = configs.find(c => c.id === integrationId)
    if (config) {
      // Aqui você implementaria a lógica para salvar as configurações
      console.log(`Salvando configurações para ${config.name}:`, formData[integrationId])
      
      // Simular salvamento bem sucedido
      setConfigs(prev => prev.map(c => 
        c.id === integrationId 
          ? {
              ...c,
              status: {
                ...c.status,
                lastChecked: new Date().toISOString()
              }
            }
          : c
      ))
    }
  }

  const iaIntegrations = configs.filter(c => c.category === 'ia')
  const googleIntegrations = configs.filter(c => c.category === 'google')
  const otherIntegrations = configs.filter(c => c.category === 'other')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Integrações</h1>
          <p className="text-muted-foreground">
            Conecte sua conta com as principais plataformas para otimizar seu SEO
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Verificar Todas
        </Button>
      </div>

      <Tabs defaultValue="ia" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ia">Plataformas de IA</TabsTrigger>
          <TabsTrigger value="google">Google</TabsTrigger>
          <TabsTrigger value="other">Outras</TabsTrigger>
        </TabsList>

        <TabsContent value="ia" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {iaIntegrations.map((config) => (
              <Card key={config.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {config.icon}
                      <CardTitle className="text-lg">{config.name}</CardTitle>
                    </div>
                    <Badge variant={config.status.connected ? "default" : "secondary"}>
                      {config.status.connected ? "Conectado" : "Desconectado"}
                    </Badge>
                  </div>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {config.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={`${config.id}-${field.name}`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      <Input
                        id={`${config.id}-${field.name}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[config.id]?.[field.name] || ''}
                        onChange={(e) => handleFieldChange(config.id, field.name, e.target.value)}
                      />
                    </div>
                  ))}
                  
                  {config.status.error && (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>{config.status.error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {config.status.lastChecked && (
                    <p className="text-xs text-muted-foreground">
                      Última verificação: {new Date(config.status.lastChecked).toLocaleString('pt-BR')}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => testConnection(config.id)}
                      disabled={testingId === config.id}
                      variant="outline"
                      className="flex-1"
                    >
                      {testingId === config.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                      )}
                      Testar Conexão
                    </Button>
                    <Button 
                      onClick={() => saveIntegration(config.id)}
                      disabled={!config.status.connected}
                    >
                      Salvar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="google" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {googleIntegrations.map((config) => (
              <Card key={config.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {config.icon}
                      <CardTitle className="text-lg">{config.name}</CardTitle>
                    </div>
                    <Badge variant={config.status.connected ? "default" : "secondary"}>
                      {config.status.connected ? "Conectado" : "Desconectado"}
                    </Badge>
                  </div>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {config.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={`${config.id}-${field.name}`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      <Input
                        id={`${config.id}-${field.name}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[config.id]?.[field.name] || ''}
                        onChange={(e) => handleFieldChange(config.id, field.name, e.target.value)}
                      />
                    </div>
                  ))}
                  
                  {config.status.error && (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>{config.status.error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {config.status.lastChecked && (
                    <p className="text-xs text-muted-foreground">
                      Última verificação: {new Date(config.status.lastChecked).toLocaleString('pt-BR')}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => testConnection(config.id)}
                      disabled={testingId === config.id}
                      variant="outline"
                      className="flex-1"
                    >
                      {testingId === config.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                      )}
                      Testar Conexão
                    </Button>
                    <Button 
                      onClick={() => saveIntegration(config.id)}
                      disabled={!config.status.connected}
                    >
                      Salvar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Globe className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-semibold">WordPress</h3>
                <p className="text-muted-foreground">
                  A integração com WordPress será configurada na página de criação do projeto
                </p>
                <p className="text-sm text-muted-foreground">
                  Você precisará fornecer URL, usuário e senha de aplicação para conectar seu site WordPress
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
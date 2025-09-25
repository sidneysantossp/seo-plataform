'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Palette,
  Users,
  Globe
} from 'lucide-react'

interface GeneralSettings {
  siteName: string
  siteUrl: string
  adminEmail: string
  timezone: string
  language: string
}

interface NotificationSettings {
  emailNotifications: boolean
  projectAlerts: boolean
  weeklyReports: boolean
  securityAlerts: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordExpiry: number
  allowedIPs: string[]
}

export default function ConfiguracoesPage() {
  const [general, setGeneral] = useState<GeneralSettings>({
    siteName: 'SEO SaaS',
    siteUrl: 'https://seosaas.com',
    adminEmail: 'admin@seosaas.com',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR'
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    projectAlerts: true,
    weeklyReports: true,
    securityAlerts: true
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 3600,
    passwordExpiry: 90,
    allowedIPs: []
  })

  const handleGeneralChange = (field: keyof GeneralSettings, value: string) => {
    setGeneral(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }))
  }

  const handleSecurityChange = (field: keyof SecuritySettings, value: any) => {
    setSecurity(prev => ({ ...prev, [field]: value }))
  }

  const saveSettings = () => {
    console.log('Salvando configurações:', { general, notifications, security })
    // Aqui você implementaria a lógica para salvar as configurações
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema
          </p>
        </div>
        <Button onClick={saveSettings}>
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Informações do Site
                </CardTitle>
                <CardDescription>
                  Configurações básicas do seu site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={general.siteName}
                    onChange={(e) => handleGeneralChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">URL do Site</Label>
                  <Input
                    id="siteUrl"
                    type="url"
                    value={general.siteUrl}
                    onChange={(e) => handleGeneralChange('siteUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email do Administrador</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={general.adminEmail}
                    onChange={(e) => handleGeneralChange('adminEmail', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Localização
                </CardTitle>
                <CardDescription>
                  Configurações de localização e idioma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <select
                    id="timezone"
                    className="w-full p-2 border rounded-md"
                    value={general.timezone}
                    onChange={(e) => handleGeneralChange('timezone', e.target.value)}
                  >
                    <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                    <option value="America/Bahia">America/Bahia</option>
                    <option value="America/Fortaleza">America/Fortaleza</option>
                    <option value="America/Manaus">America/Manaus</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <select
                    id="language"
                    className="w-full p-2 border rounded-md"
                    value={general.language}
                    onChange={(e) => handleGeneralChange('language', e.target.value)}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notificações por Email
              </CardTitle>
              <CardDescription>
                Configure quais notificações você deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar todas as notificações por email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Projetos</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre status dos projetos
                  </p>
                </div>
                <Switch
                  checked={notifications.projectAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('projectAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Relatórios Semanais</Label>
                  <p className="text-sm text-muted-foreground">
                    Resumo semanal das atividades
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Segurança</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificações importantes de segurança
                  </p>
                </div>
                <Switch
                  checked={notifications.securityAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('securityAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Segurança da Conta
                </CardTitle>
                <CardDescription>
                  Proteja sua conta com configurações de segurança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (segundos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Expiração da Senha (dias)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={security.passwordExpiry}
                    onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Backup e Manutenção
                </CardTitle>
                <CardDescription>
                  Gerencie backups e manutenção do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Último Backup</Label>
                  <p className="text-sm text-muted-foreground">2024-01-15 14:30:00</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Próximo Backup Agendado</Label>
                  <p className="text-sm text-muted-foreground">2024-01-16 02:00:00</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  Fazer Backup Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações Avançadas
              </CardTitle>
              <CardDescription>
                Configurações técnicas avançadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Versão do Sistema</Label>
                  <p className="text-sm text-muted-foreground">v1.0.0</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Ambiente</Label>
                  <Badge variant="secondary">Desenvolvimento</Badge>
                </div>
                
                <div className="space-y-2">
                  <Label>Node.js Version</Label>
                  <p className="text-sm text-muted-foreground">18.17.0</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Database</Label>
                  <p className="text-sm text-muted-foreground">SQLite</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="destructive">
                  Limpar Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
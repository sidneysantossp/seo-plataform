'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Save,
  X,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import { seoProjects, type SEOProject } from '@/data/seoProjects'

export default function EditTaskPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<SEOProject | null>(null)
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    assignedTo: '',
    dueDate: ''
  })

  useEffect(() => {
    const projectId = params.id as string
    const taskId = params.taskId as string
    
    const foundProject = seoProjects.find(p => p.id === projectId)
    setProject(foundProject || null)
    
    if (foundProject) {
      const foundTask = foundProject.tasks.find(t => t.id === taskId)
      setTask(foundTask || null)
      
      if (foundTask) {
        setFormData({
          title: foundTask.title,
          description: foundTask.description,
          status: foundTask.status,
          priority: foundTask.priority,
          assignedTo: foundTask.assignedTo,
          dueDate: foundTask.dueDate ? new Date(foundTask.dueDate).toISOString().split('T')[0] : ''
        })
      }
    }
    
    setLoading(false)
  }, [params.id, params.taskId])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message (in a real app, you'd use a toast)
    alert('Tarefa atualizada com sucesso!')
    
    setSaving(false)
    router.push(`/super-admin/projetos-seo/${project?.id}/tarefas/${task?.id}`)
  }

  const getTaskStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída'
      case 'in_progress': return 'Em Progresso'
      case 'blocked': return 'Bloqueada'
      case 'pending': return 'Pendente'
      default: return 'Desconhecido'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta'
      case 'medium': return 'Média'
      case 'low': return 'Baixa'
      default: return 'Desconhecida'
    }
  }

  // Mock team members
  const teamMembers = [
    'Carlos Oliveira',
    'Mariana Santos',
    'Roberto Ferreira',
    'Ana Costa',
    'Pedro Silva'
  ]

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="h-96 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!project || !task) {
    return (
      <div className="p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Tarefa não encontrada</h1>
          <p className="text-muted-foreground">A tarefa solicitada não existe ou foi removida.</p>
          <Link href={`/super-admin/projetos-seo/${project?.id}/tarefas`}>
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Tarefas
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/super-admin/projetos-seo/${project.id}/tarefas/${task.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Editar Tarefa</h1>
            <p className="text-muted-foreground">{project.name} • {task.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/super-admin/projetos-seo/${project.id}/tarefas/${task.id}`}>
            <Button variant="outline">
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>
                  Edite as informações principais da tarefa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Tarefa</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Digite o título da tarefa"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva os detalhes da tarefa"
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Tarefa</CardTitle>
                <CardDescription>
                  Configure status, prioridade e atribuições
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="in_progress">Em Progresso</SelectItem>
                        <SelectItem value="blocked">Bloqueada</SelectItem>
                        <SelectItem value="completed">Concluída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Responsável</Label>
                    <Select value={formData.assignedTo} onValueChange={(value) => handleInputChange('assignedTo', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o responsável" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member} value={member}>
                            {member}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Prazo</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  {task.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {task.status === 'in_progress' && <Clock className="w-4 h-4 text-blue-500" />}
                  {task.status === 'blocked' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  {task.status === 'pending' && <Clock className="w-4 h-4 text-gray-500" />}
                  <span className="text-sm font-medium">{getTaskStatusText(task.status)}</span>
                </div>
                <div>
                  <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                    {getPriorityText(task.priority)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações do Projeto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Projeto</Label>
                  <p className="text-sm">{project.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Cliente</Label>
                  <p className="text-sm">{project.client}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Responsável Atual</Label>
                  <p className="text-sm">{task.assignedTo}</p>
                </div>
                {task.dueDate && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Prazo Atual</Label>
                    <p className="text-sm">{new Date(task.dueDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button type="submit" className="w-full" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Link href={`/super-admin/projetos-seo/${project.id}/tarefas/${task.id}`}>
                  <Button variant="outline" className="w-full">
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
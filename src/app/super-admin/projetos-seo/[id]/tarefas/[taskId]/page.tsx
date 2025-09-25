'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft,
  Edit,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Trash2
} from 'lucide-react'
import Link from 'next/link'
import { TaskComments } from '@/components/tasks/TaskComments'
import { TaskFiles } from '@/components/tasks/TaskFiles'
import { seoProjects, type SEOProject } from '@/data/seoProjects'

interface TaskComment {
  id: string
  author: {
    id: string
    name: string
    email: string
    avatar?: string
    role: string
  }
  content: string
  createdAt: string
  updatedAt: string
  likes: number
  likedByUser: boolean
  attachments?: CommentAttachment[]
  replies?: TaskComment[]
}

interface CommentAttachment {
  id: string
  name: string
  size: string
  type: string
  url: string
}

interface ProjectFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedBy: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  uploadedAt: string
  taskId?: string
  taskName?: string
  description?: string
  tags: string[]
}

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<SEOProject | null>(null)
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<TaskComment[]>([])
  const [files, setFiles] = useState<ProjectFile[]>([])

  useEffect(() => {
    const projectId = params.id as string
    const taskId = params.taskId as string
    
    const foundProject = seoProjects.find(p => p.id === projectId)
    setProject(foundProject || null)
    
    if (foundProject) {
      const foundTask = foundProject.tasks.find(t => t.id === taskId)
      setTask(foundTask || null)
      
      // Mock comments data
      setComments([
        {
          id: '1',
          author: {
            id: '1',
            name: 'Carlos Oliveira',
            email: 'carlos@exemplo.com',
            role: 'SEO Specialist'
          },
          content: 'Iniciei a auditoria SEO e já identifiquei alguns pontos críticos que precisam de atenção. A estrutura de URLs precisa ser revisada e as meta descriptions estão muito genéricas.',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          likes: 2,
          likedByUser: true,
          attachments: [
            {
              id: '1',
              name: 'relatorio-seo-inicial.pdf',
              size: '2.4 MB',
              type: 'PDF',
              url: '#'
            }
          ]
        },
        {
          id: '2',
          author: {
            id: '2',
            name: 'Mariana Santos',
            email: 'mariana@exemplo.com',
            role: 'Content Manager'
          },
          content: 'Vou analisar os relatórios de palavras-chave para sugerir melhorias. Já percebi que algumas palavras importantes estão com baixo desempenho.',
          createdAt: '2024-01-16T14:20:00Z',
          updatedAt: '2024-01-16T14:20:00Z',
          likes: 1,
          likedByUser: false
        }
      ])
      
      // Mock files data
      setFiles([
        {
          id: '1',
          name: 'relatorio-seo-inicial.pdf',
          size: 2400000,
          type: 'application/pdf',
          url: '#',
          uploadedBy: {
            id: '1',
            name: 'Carlos Oliveira',
            email: 'carlos@exemplo.com'
          },
          uploadedAt: '2024-01-15T10:30:00Z',
          taskId: taskId,
          taskName: foundTask?.title,
          description: 'Relatório completo da auditoria SEO inicial realizada no site',
          tags: ['SEO', 'Auditoria', 'Relatório']
        },
        {
          id: '2',
          name: 'analise-palavras-chave.xlsx',
          size: 1100000,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          url: '#',
          uploadedBy: {
            id: '2',
            name: 'Mariana Santos',
            email: 'mariana@exemplo.com'
          },
          uploadedAt: '2024-01-16T14:20:00Z',
          taskId: taskId,
          taskName: foundTask?.title,
          description: 'Análise detalhada de palavras-chave e volumes de busca',
          tags: ['Palavras-chave', 'Análise', 'Planilha']
        }
      ])
    }
    
    setLoading(false)
  }, [params.id, params.taskId])

  const handleAddComment = async (content: string, attachments: File[]) => {
    // Simulate adding comment
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newComment: TaskComment = {
      id: `comment-${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'Usuário Atual',
        email: 'usuario@exemplo.com',
        role: 'Project Manager'
      },
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      likedByUser: false
    }
    
    setComments(prev => [newComment, ...prev])
  }

  const handleEditComment = async (commentId: string, content: string) => {
    // Simulate editing comment
    await new Promise(resolve => setTimeout(resolve, 500))
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, content, updatedAt: new Date().toISOString() }
          : comment
      )
    )
  }

  const handleDeleteComment = async (commentId: string) => {
    if (confirm('Tem certeza que deseja excluir este comentário?')) {
      // Simulate deleting comment
      await new Promise(resolve => setTimeout(resolve, 500))
      setComments(prev => prev.filter(comment => comment.id !== commentId))
    }
  }

  const handleLikeComment = async (commentId: string) => {
    // Simulate liking comment
    await new Promise(resolve => setTimeout(resolve, 300))
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              likes: comment.likedByUser ? comment.likes - 1 : comment.likes + 1,
              likedByUser: !comment.likedByUser
            }
          : comment
      )
    )
  }

  const handleUploadFiles = async (files: FileList, description?: string, tags?: string[]) => {
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newFiles: ProjectFile[] = Array.from(files).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: '#',
      uploadedBy: {
        id: 'current-user',
        name: 'Usuário Atual',
        email: 'usuario@exemplo.com'
      },
      uploadedAt: new Date().toISOString(),
      taskId: task?.id,
      taskName: task?.title,
      description,
      tags: tags || []
    }))
    
    setFiles(prev => [...newFiles, ...prev])
  }

  const handleDeleteFile = async (fileId: string) => {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      // Simulate file deletion
      await new Promise(resolve => setTimeout(resolve, 500))
      setFiles(prev => prev.filter(file => file.id !== fileId))
    }
  }

  const handleEditFile = async (fileId: string, data: Partial<ProjectFile>) => {
    // Simulate file edit
    await new Promise(resolve => setTimeout(resolve, 500))
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, ...data } : file
    ))
  }

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

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_progress': return <Clock className="w-5 h-5 text-blue-500" />
      case 'blocked': return <AlertTriangle className="w-5 h-5 text-red-500" />
      default: return <Clock className="w-5 h-5 text-gray-500" />
    }
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'secondary'
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/super-admin/projetos-seo/${project.id}/tarefas`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalhes da Tarefa</h1>
            <p className="text-muted-foreground">{project.name} • {task.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/super-admin/projetos-seo/${project.id}/tarefas/${task.id}/editar`}>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </Link>
          <Button variant="outline" className="text-destructive hover:text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Task Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Task Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getTaskStatusIcon(task.status)}
                  <div>
                    <CardTitle className="text-xl">{task.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {task.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                    {getTaskStatusText(task.status)}
                  </Badge>
                  <Badge variant={getPriorityColor(task.priority)}>
                    {getPriorityText(task.priority)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Responsável</p>
                    <p className="text-sm text-muted-foreground">{task.assignedTo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Data de Criação</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                {task.dueDate && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Prazo</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <TaskComments
            taskId={task.id}
            comments={comments}
            onAddComment={handleAddComment}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
            onLikeComment={handleLikeComment}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações da Tarefa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="flex items-center gap-2 mt-1">
                  {getTaskStatusIcon(task.status)}
                  <span className="text-sm">{getTaskStatusText(task.status)}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Prioridade</label>
                <div className="mt-1">
                  <Badge variant={getPriorityColor(task.priority)}>
                    {getPriorityText(task.priority)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Projeto</label>
                <p className="text-sm mt-1">{project.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Cliente</label>
                <p className="text-sm mt-1">{project.client}</p>
              </div>
            </CardContent>
          </Card>

          {/* Task Files */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paperclip className="h-5 w-5" />
                Arquivos da Tarefa
              </CardTitle>
              <CardDescription>
                {files.length} arquivo{files.length !== 1 ? 's' : ''} nesta tarefa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {files.slice(0, 3).map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                      <Paperclip className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              {files.length > 3 && (
                <Link href={`/super-admin/projetos-seo/${project.id}/arquivos`}>
                  <Button variant="outline" className="w-full">
                    Ver todos os {files.length} arquivos
                  </Button>
                </Link>
              )}
              
              {files.length === 0 && (
                <div className="text-center py-4">
                  <Paperclip className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nenhum arquivo nesta tarefa
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Marcar como Concluída
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Alterar Responsável
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Alterar Prazo
              </Button>
              <Link href={`/super-admin/projetos-seo/${project.id}/arquivos`}>
                <Button variant="outline" className="w-full justify-start">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Gerenciar Arquivos
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
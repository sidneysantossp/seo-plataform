'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  HardDrive,
  FolderOpen,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react'
import Link from 'next/link'
import { TaskFiles } from '@/components/tasks/TaskFiles'
import { seoProjects, type SEOProject } from '@/data/seoProjects'

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

export default function ProjectFilesPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<SEOProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [files, setFiles] = useState<ProjectFile[]>([])

  useEffect(() => {
    const projectId = params.id as string
    const foundProject = seoProjects.find(p => p.id === projectId)
    setProject(foundProject || null)
    
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
        taskId: '1',
        taskName: 'Auditoria SEO completa',
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
        taskId: '1',
        taskName: 'Auditoria SEO completa',
        description: 'Análise detalhada de palavras-chave e volumes de busca',
        tags: ['Palavras-chave', 'Análise', 'Planilha']
      },
      {
        id: '3',
        name: 'screenshot-homepage.png',
        size: 850000,
        type: 'image/png',
        url: '#',
        uploadedBy: {
          id: '3',
          name: 'Roberto Ferreira',
          email: 'roberto@exemplo.com'
        },
        uploadedAt: '2024-01-17T09:15:00Z',
        taskId: '2',
        taskName: 'Otimização de páginas de produto',
        description: 'Screenshot da homepage antes da otimização',
        tags: ['Screenshot', 'Homepage', 'Antes']
      },
      {
        id: '4',
        name: 'backup-dados-estruturados.zip',
        size: 5200000,
        type: 'application/zip',
        url: '#',
        uploadedBy: {
          id: '1',
          name: 'Carlos Oliveira',
          email: 'carlos@exemplo.com'
        },
        uploadedAt: '2024-01-18T16:45:00Z',
        taskId: '3',
        taskName: 'Melhorar Core Web Vitals',
        description: 'Backup completo dos dados estruturados do site',
        tags: ['Backup', 'Dados estruturados', 'Schema']
      }
    ])
    
    setLoading(false)
  }, [params.id])

  const handleUploadFiles = async (files: FileList, description?: string, tags?: string[]) => {
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would upload to a server and return the file data
    const newFiles: ProjectFile[] = Array.from(files).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: '#', // Would be the actual URL after upload
      uploadedBy: {
        id: 'current-user',
        name: 'Usuário Atual',
        email: 'usuario@exemplo.com'
      },
      uploadedAt: new Date().toISOString(),
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
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Projeto não encontrado</h1>
          <p className="text-muted-foreground">O projeto solicitado não existe ou foi removido.</p>
          <Link href="/super-admin/projetos-seo">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Projetos
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
          <Link href={`/super-admin/projetos-seo/${project.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Arquivos do Projeto</h1>
            <p className="text-muted-foreground">{project.name} • {project.client}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/super-admin/projetos-seo/${project.id}`}>
            <Button variant="outline">
              Ver Projeto
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Arquivos</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
            <p className="text-xs text-muted-foreground">Arquivos armazenados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espaço Utilizado</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(files.reduce((total, file) => total + file.size, 0) / 1024 / 1024).toFixed(1)} MB
            </div>
            <p className="text-xs text-muted-foreground">Armazenamento total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.filter(f => f.type.includes('pdf') || f.type.includes('document') || f.type.includes('text')).length}
            </div>
            <p className="text-xs text-muted-foreground">PDFs, DOCs, TXTs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mídias</CardTitle>
            <Image className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.filter(f => f.type.startsWith('image/') || f.type.startsWith('video/') || f.type.startsWith('audio/')).length}
            </div>
            <p className="text-xs text-muted-foreground">Imagens, Vídeos, Áudios</p>
          </CardContent>
        </Card>
      </div>

      {/* Files Management Component */}
      <TaskFiles
        projectId={project.id}
        files={files}
        onUploadFiles={handleUploadFiles}
        onDeleteFile={handleDeleteFile}
        onEditFile={handleEditFile}
      />
    </div>
  )
}
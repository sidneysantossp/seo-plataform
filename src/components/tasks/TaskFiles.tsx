'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Upload,
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  FolderOpen,
  HardDrive
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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

interface TaskFilesProps {
  projectId: string
  files: ProjectFile[]
  onUploadFiles: (files: FileList, description?: string, tags?: string[]) => Promise<void>
  onDeleteFile?: (fileId: string) => Promise<void>
  onEditFile?: (fileId: string, data: Partial<ProjectFile>) => Promise<void>
}

export function TaskFiles({ 
  projectId, 
  files, 
  onUploadFiles, 
  onDeleteFile, 
  onEditFile 
}: TaskFilesProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files)
  }

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      await onUploadFiles(selectedFiles, description, tags)
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      // Reset form
      setSelectedFiles(null)
      setDescription('')
      setTags([])
      
      // Reset progress after delay
      setTimeout(() => setUploadProgress(0), 1000)
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />
    if (type.startsWith('video/')) return <Video className="w-8 h-8 text-purple-500" />
    if (type.startsWith('audio/')) return <Music className="w-8 h-8 text-green-500" />
    if (type.includes('archive') || type.includes('zip') || type.includes('rar')) return <Archive className="w-8 h-8 text-orange-500" />
    if (type.includes('pdf') || type.includes('document') || type.includes('text')) return <FileText className="w-8 h-8 text-red-500" />
    return <File className="w-8 h-8 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'all' || file.type.startsWith(typeFilter)
    return matchesSearch && matchesType
  })

  const fileStats = {
    total: files.length,
    images: files.filter(f => f.type.startsWith('image/')).length,
    documents: files.filter(f => f.type.includes('pdf') || f.type.includes('document') || f.type.includes('text')).length,
    other: files.length - files.filter(f => f.type.startsWith('image/') || f.type.includes('pdf') || f.type.includes('document') || f.type.includes('text')).length
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload de Arquivos
          </CardTitle>
          <CardDescription>
            Adicione arquivos ao projeto. Formatos suportados: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG, GIF, MP4, MP3, ZIP, RAR
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
            <div className="text-center space-y-4">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-lg font-medium">Arraste arquivos para cá</p>
                <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.zip,.rar"
              />
              <label htmlFor="file-upload">
                <Button asChild>
                  <span className="cursor-pointer">Selecionar Arquivos</span>
                </Button>
              </label>
            </div>
          </div>

          {selectedFiles && selectedFiles.length > 0 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Arquivos Selecionados:</h4>
                <div className="space-y-2">
                  {Array.from(selectedFiles).map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Descrição (opcional)</label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Adicione uma descrição para os arquivos..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Tags (opcional)</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Adicionar tag"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={handleAddTag}>
                      Adicionar
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Enviando arquivos...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              <Button 
                onClick={handleUpload} 
                disabled={uploading}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Enviando...' : 'Confirmar Upload'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Files Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Arquivos do Projeto
              </CardTitle>
              <CardDescription>
                Gerencie todos os arquivos e documentos do projeto
              </CardDescription>
            </div>
            <Badge variant="outline">{filteredFiles.length} arquivos</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <HardDrive className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{fileStats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Image className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{fileStats.images}</p>
              <p className="text-xs text-muted-foreground">Imagens</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <FileText className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <p className="text-2xl font-bold">{fileStats.documents}</p>
              <p className="text-xs text-muted-foreground">Documentos</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <File className="w-6 h-6 mx-auto mb-2 text-gray-500" />
              <p className="text-2xl font-bold">{fileStats.other}</p>
              <p className="text-xs text-muted-foreground">Outros</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar arquivos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('all')}
              >
                Todos
              </Button>
              <Button
                variant={typeFilter === 'image/' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('image/')}
              >
                Imagens
              </Button>
              <Button
                variant={typeFilter === 'application/pdf' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('application/pdf')}
              >
                PDFs
              </Button>
              <Button
                variant={typeFilter === 'video/' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('video/')}
              >
                Vídeos
              </Button>
            </div>
          </div>

          {/* Files List */}
          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onDelete={onDeleteFile}
                onEdit={onEditFile}
              />
            ))}
            
            {filteredFiles.length === 0 && (
              <div className="text-center py-8">
                <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum arquivo encontrado</h3>
                <p className="text-muted-foreground">
                  {searchTerm || typeFilter !== 'all' 
                    ? 'Tente ajustar seus filtros ou termos de busca.'
                    : 'Nenhum arquivo foi enviado para este projeto ainda.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface FileItemProps {
  file: ProjectFile
  onDelete?: (fileId: string) => Promise<void>
  onEdit?: (fileId: string, data: Partial<ProjectFile>) => Promise<void>
}

function FileItem({ file, onDelete, onEdit }: FileItemProps) {
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />
    if (type.startsWith('video/')) return <Video className="w-8 h-8 text-purple-500" />
    if (type.startsWith('audio/')) return <Music className="w-8 h-8 text-green-500" />
    if (type.includes('archive') || type.includes('zip') || type.includes('rar')) return <Archive className="w-8 h-8 text-orange-500" />
    if (type.includes('pdf') || type.includes('document') || type.includes('text')) return <FileText className="w-8 h-8 text-red-500" />
    return <File className="w-8 h-8 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        {getFileIcon(file.type)}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{file.name}</h4>
            {file.taskName && (
              <Badge variant="outline" className="text-xs">
                {file.taskName}
              </Badge>
            )}
          </div>
          {file.description && (
            <p className="text-sm text-muted-foreground mt-1">{file.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span>{formatFileSize(file.size)}</span>
            <span>Enviado por {file.uploadedBy.name}</span>
            <span>
              {formatDistanceToNow(new Date(file.uploadedAt), { 
                addSuffix: true, 
                locale: ptBR 
              })}
            </span>
          </div>
          {file.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {file.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Visualizar">
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Download">
          <Download className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Editar">
          <Edit className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-destructive hover:text-destructive" 
          title="Excluir"
          onClick={() => onDelete?.(file.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Mais opções">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
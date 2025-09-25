'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Plus,
  FileText,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  TrendingUp,
  Clock,
  BarChart3,
  Tag,
  MoreHorizontal,
  Globe,
  Image,
  MessageSquare,
  Share2,
  Target
} from 'lucide-react'
import Link from 'next/link'
import { contentItems, type ContentItem } from '@/data/content'

export default function ContentPage() {
  const [contents, setContents] = useState<ContentItem[]>(contentItems)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter
    const matchesType = typeFilter === 'all' || content.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500'
      case 'draft': return 'bg-yellow-500'
      case 'archived': return 'bg-gray-500'
      case 'scheduled': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado'
      case 'draft': return 'Rascunho'
      case 'archived': return 'Arquivado'
      case 'scheduled': return 'Agendado'
      default: return 'Desconhecido'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return <FileText className="w-4 h-4" />
      case 'page': return <Globe className="w-4 h-4" />
      case 'product': return <Target className="w-4 h-4" />
      case 'category': return <Tag className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'post': return 'Post'
      case 'page': return 'Página'
      case 'product': return 'Produto'
      case 'category': return 'Categoria'
      default: return 'Desconhecido'
    }
  }

  const getSEOScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Conteúdo</h1>
          <p className="text-muted-foreground">
            Gerencie todo o conteúdo do seu site em um único lugar
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Conteúdo
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Conteúdo</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contents.length}</div>
            <p className="text-xs text-muted-foreground">Artigos e páginas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicados</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contents.filter(c => c.status === 'published').length}
            </div>
            <p className="text-xs text-muted-foreground">Conteúdo ativo</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contents.reduce((sum, c) => sum + c.analytics.views, 0).toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">Total de visualizações</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média SEO</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(contents.reduce((sum, c) => sum + c.seo.seoScore, 0) / contents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Score médio</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">Todos Status</option>
                <option value="published">Publicados</option>
                <option value="draft">Rascunhos</option>
                <option value="scheduled">Agendados</option>
                <option value="archived">Arquivados</option>
              </select>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">Todos Tipos</option>
                <option value="post">Posts</option>
                <option value="page">Páginas</option>
                <option value="product">Produtos</option>
                <option value="category">Categorias</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContents.map((content) => (
          <Card key={content.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(content.type)}
                  <div>
                    <CardTitle className="text-lg line-clamp-1">{content.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {content.category}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(content.status)}`} />
                  <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                    {getStatusText(content.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Content Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{content.author.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {content.publishedAt 
                      ? new Date(content.publishedAt).toLocaleDateString('pt-BR')
                      : content.scheduledAt
                      ? `Agendado para ${new Date(content.scheduledAt).toLocaleDateString('pt-BR')}`
                      : 'Não publicado'
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{content.seo.readingTime} min de leitura</span>
                </div>
              </div>

              {/* SEO Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Score SEO</span>
                  <span className={`font-medium ${getSEOScoreColor(content.seo.seoScore)}`}>
                    {content.seo.seoScore}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Leiturabilidade: {content.seo.readabilityScore}%</span>
                  <span>{content.seo.wordCount} palavras</span>
                </div>
              </div>

              {/* Analytics */}
              {content.status === 'published' && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Analytics</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{content.analytics.views.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{content.analytics.socialShares}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {content.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {content.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{content.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link href={`/super-admin/conteudo/${content.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum conteúdo encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Tente ajustar sua busca ou filtros.' : 'Comece criando seu primeiro conteúdo.'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Conteúdo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
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
  Globe,
  MessageSquare,
  Share2,
  Target,
  Settings,
  Play,
  Pause,
  Mail,
  Phone,
  Image,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react'
import Link from 'next/link'
import { contentItems, type ContentItem } from '@/data/content'

export default function ContentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [content, setContent] = useState<ContentItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const contentId = params.id as string
    const foundContent = contentItems.find(c => c.id === contentId)
    setContent(foundContent || null)
    setLoading(false)
  }, [params.id])

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

  if (!content) {
    return (
      <div className="p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Conteúdo não encontrado</h1>
          <p className="text-muted-foreground">O conteúdo solicitado não existe ou foi removido.</p>
          <Link href="/super-admin/conteudo">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Conteúdo
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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
      case 'post': return <FileText className="w-5 h-5" />
      case 'page': return <Globe className="w-5 h-5" />
      case 'product': return <Target className="w-5 h-5" />
      case 'category': return <Tag className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
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
        <div className="flex items-center gap-4">
          <Link href="/super-admin/conteudo">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{content.title}</h1>
            <p className="text-muted-foreground">{content.category} • {getTypeText(content.type)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          {content.status === 'published' ? (
            <Button variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              Arquivar
            </Button>
          ) : (
            <Button>
              <Play className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          )}
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            {getTypeIcon(content.type)}
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(content.status)}`} />
              <span className="font-medium">{getStatusText(content.status)}</span>
            </div>
            {content.publishedAt && (
              <p className="text-xs text-muted-foreground mt-1">
                Publicado em {new Date(content.publishedAt).toLocaleDateString('pt-BR')}
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score SEO</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getSEOScoreColor(content.seo.seoScore)}`}>
              {content.seo.seoScore}%
            </div>
            <Progress value={content.seo.seoScore} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leiturabilidade</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.seo.readabilityScore}%</div>
            <p className="text-xs text-muted-foreground">
              {content.seo.wordCount} palavras • {content.seo.readingTime} min
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {content.analytics.views.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              {content.analytics.uniqueVisitors.toLocaleString('pt-BR')} únicos
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="versions">Versões</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Content Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informações do Conteúdo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Título</label>
                    <p className="font-medium">{content.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Slug</label>
                    <p className="font-mono text-sm">{content.slug}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                    <p className="font-medium">{content.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Resumo</label>
                    <p className="text-sm">{content.excerpt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Autor do Conteúdo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{content.author.name}</h3>
                    <p className="text-muted-foreground">{content.author.role}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{content.author.email}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags do Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          {content.featuredImage && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" alt="Ícone de imagem" />
                  Imagem Destacada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Image className="w-12 h-12 text-muted-foreground" alt="Placeholder de imagem" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{content.featuredImage}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo Completo</CardTitle>
              <CardDescription>
                Visualização e edição do conteúdo completo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{content.content}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Meta Tags SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Title Tag</label>
                  <div className="p-3 bg-muted rounded text-sm font-mono">
                    {content.seo.title}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Meta Description</label>
                  <div className="p-3 bg-muted rounded text-sm">
                    {content.seo.description}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Keywords</label>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {content.seo.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Conteúdo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Score SEO</span>
                    <span className={`font-medium ${getSEOScoreColor(content.seo.seoScore)}`}>
                      {content.seo.seoScore}%
                    </span>
                  </div>
                  <Progress value={content.seo.seoScore} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Leiturabilidade</span>
                    <span className="font-medium">{content.seo.readabilityScore}%</span>
                  </div>
                  <Progress value={content.seo.readabilityScore} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Palavras</p>
                    <p className="font-medium">{content.seo.wordCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tempo de Leitura</p>
                    <p className="font-medium">{content.seo.readingTime} min</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Visualizações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {content.analytics.views.toLocaleString('pt-BR')}
                </div>
                <p className="text-sm text-muted-foreground">
                  {content.analytics.uniqueVisitors.toLocaleString('pt-BR')} visitantes únicos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Engajamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(content.analytics.averageTimeOnPage)}s
                </div>
                <p className="text-sm text-muted-foreground">
                  Tempo médio na página
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Taxa de Rejeição
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {content.analytics.bounceRate}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Taxa de rejeição
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Social
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {content.analytics.socialShares}
                </div>
                <p className="text-sm text-muted-foreground">
                  Compartilhamentos sociais
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Backlinks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {content.analytics.backlinks}
                </div>
                <p className="text-sm text-muted-foreground">
                  Links de entrada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Conversão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {content.analytics.conversionRate}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Taxa de conversão
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="versions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Versões</CardTitle>
              <CardDescription>
                Todas as versões e alterações do conteúdo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.versions.map((version) => (
                  <div key={version.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{version.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Versão {version.version} • {version.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(version.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{version.version}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {version.changes.length} alterações
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
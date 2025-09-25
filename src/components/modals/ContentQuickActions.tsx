'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
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
  Play,
  Pause,
  Settings,
  MoreHorizontal,
  Image,
  CheckCircle,
  AlertTriangle,
  Search,
  Download,
  Copy
} from 'lucide-react'

interface ContentQuickActionsProps {
  content: {
    id: string
    title: string
    excerpt: string
    type: 'post' | 'page' | 'product' | 'category'
    status: 'draft' | 'published' | 'archived' | 'scheduled'
    author: {
      name: string
      email: string
      role: string
    }
    category: string
    tags: string[]
    seo: {
      score: number
      readability: number
      wordCount: number
      readingTime: number
    }
    analytics: {
      views: number
      uniqueVisitors: number
      averageTimeOnPage: number
      bounceRate: number
      socialShares: number
      conversionRate: number
    }
    publishedAt?: string
    scheduledAt?: string
  }
  onAction?: (action: string, contentId: string) => void
}

export function ContentQuickActions({ content, onAction }: ContentQuickActionsProps) {
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

  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action, content.id)
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon(content.type)}
            <div>
              <CardTitle className="text-lg line-clamp-1">{content.title}</CardTitle>
              <CardDescription className="text-sm">
                {content.category} • {getTypeText(content.type)}
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
            <span className={`font-medium ${getSEOScoreColor(content.seo.score)}`}>
              {content.seo.score}%
            </span>
          </div>
          <Progress value={content.seo.score} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Leiturabilidade: {content.seo.readability}%</span>
            <span>{content.seo.wordCount} palavras</span>
          </div>
        </div>

        {/* Analytics (if published) */}
        {content.status === 'published' && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Analytics</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1 text-xs">
                <Eye className="w-3 h-3" />
                <span>{content.analytics.views.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <MessageSquare className="w-3 h-3" />
                <span>{content.analytics.socialShares}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>{content.analytics.conversionRate}%</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Clock className="w-3 h-3" />
                <span>{Math.round(content.analytics.averageTimeOnPage)}s</span>
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

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAction('view')}
            className="h-auto p-3 flex flex-col items-center gap-1"
          >
            <Eye className="w-4 h-4" />
            <span className="text-xs">Ver</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAction('edit')}
            className="h-auto p-3 flex flex-col items-center gap-1"
          >
            <Edit className="w-4 h-4" />
            <span className="text-xs">Editar</span>
          </Button>
          {content.status === 'published' ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleAction('archive')}
              className="h-auto p-3 flex flex-col items-center gap-1"
            >
              <Pause className="w-4 h-4" />
              <span className="text-xs">Arquivar</span>
            </Button>
          ) : (
            <Button 
              size="sm" 
              onClick={() => handleAction('publish')}
              className="h-auto p-3 flex flex-col items-center gap-1"
            >
              <Play className="w-4 h-4" />
              <span className="text-xs">Publicar</span>
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAction('analytics')}
            className="h-auto p-3 flex flex-col items-center gap-1"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs">Analytics</span>
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction('seo')}
            className="flex-1"
          >
            <Search className="w-4 h-4 mr-1" />
            SEO
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction('share')}
            className="flex-1"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Compartilhar
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction('export')}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-1" />
            Exportar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Bell,
  MessageSquare,
  FileText,
  Upload,
  Check,
  X,
  Eye,
  Clock,
  User,
  Tag
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Notification {
  id: string
  type: 'comment' | 'file_upload' | 'mention' | 'task_update'
  title: string
  message: string
  projectId?: string
  projectName?: string
  taskId?: string
  taskName?: string
  author: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  createdAt: string
  read: boolean
  actionUrl?: string
}

interface TaskNotificationsProps {
  notifications: Notification[]
  onMarkAsRead: (notificationId: string) => Promise<void>
  onMarkAllAsRead: () => Promise<void>
  onDismiss: (notificationId: string) => Promise<void>
}

export function TaskNotifications({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDismiss 
}: TaskNotificationsProps) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length)
  }, [notifications])

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-500" />
      case 'file_upload':
        return <Upload className="w-5 h-5 text-green-500" />
      case 'mention':
        return <Tag className="w-5 h-5 text-purple-500" />
      case 'task_update':
        return <FileText className="w-5 h-5 text-orange-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'comment':
        return 'bg-blue-50 border-blue-200'
      case 'file_upload':
        return 'bg-green-50 border-green-200'
      case 'mention':
        return 'bg-purple-50 border-purple-200'
      case 'task_update':
        return 'bg-orange-50 border-orange-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notificações</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount}</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onMarkAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <CardDescription>
          Atualizações e atividades recentes nas tarefas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma notificação</h3>
            <p className="text-muted-foreground">
              Você não tem nenhuma notificação no momento.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onDismiss={onDismiss}
              getNotificationIcon={getNotificationIcon}
              getNotificationColor={getNotificationColor}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (notificationId: string) => Promise<void>
  onDismiss: (notificationId: string) => Promise<void>
  getNotificationIcon: (type: Notification['type']) => React.ReactNode
  getNotificationColor: (type: Notification['type']) => string
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDismiss,
  getNotificationIcon,
  getNotificationColor
}: NotificationItemProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleMarkAsRead = async () => {
    await onMarkAsRead(notification.id)
  }

  const handleDismiss = async () => {
    await onDismiss(notification.id)
    setIsDismissed(true)
  }

  if (isDismissed) return null

  return (
    <div 
      className={`p-4 rounded-lg border transition-all duration-200 ${
        notification.read ? 'bg-muted/30' : getNotificationColor(notification.type)
      } ${!notification.read ? 'shadow-sm' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={notification.author.avatar} alt={notification.author.name} />
                <AvatarFallback>
                  {notification.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h4 className="font-medium text-sm">{notification.author.name}</h4>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), { 
                  addSuffix: true, 
                  locale: ptBR 
                })}
              </span>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-sm mb-1">{notification.title}</h5>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
            
            {notification.projectName && notification.taskName && (
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>Projeto: {notification.projectName}</span>
                <span>•</span>
                <span>Tarefa: {notification.taskName}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {notification.actionUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={notification.actionUrl}>
                    <Eye className="w-3 h-3 mr-1" />
                    Ver
                  </a>
                </Button>
              )}
              {!notification.read && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleMarkAsRead}
                >
                  <Check className="w-3 h-3 mr-1" />
                  Marcar como lida
                </Button>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleDismiss}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook para gerenciar notificações
export function useTaskNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'comment',
      title: 'Novo comentário na tarefa',
      message: 'Carlos Oliveira comentou: "Iniciei a auditoria SEO e já identifiquei alguns pontos críticos..."',
      projectId: '1',
      projectName: 'E-commerce Fashion Store',
      taskId: '1',
      taskName: 'Auditoria SEO completa',
      author: {
        id: '1',
        name: 'Carlos Oliveira',
        email: 'carlos@exemplo.com'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      read: false,
      actionUrl: '/super-admin/projetos-seo/1/tarefas/1'
    },
    {
      id: '2',
      type: 'file_upload',
      title: 'Novo arquivo enviado',
      message: 'Mariana Santos enviou "analise-palavras-chave.xlsx" na tarefa "Auditoria SEO completa"',
      projectId: '1',
      projectName: 'E-commerce Fashion Store',
      taskId: '1',
      taskName: 'Auditoria SEO completa',
      author: {
        id: '2',
        name: 'Mariana Santos',
        email: 'mariana@exemplo.com'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      read: false,
      actionUrl: '/super-admin/projetos-seo/1/arquivos'
    },
    {
      id: '3',
      type: 'mention',
      title: 'Você foi mencionado',
      message: 'Roberto Ferreira mencionou você em um comentário: "@usuário pode verificar estes números?"',
      projectId: '1',
      projectName: 'E-commerce Fashion Store',
      taskId: '2',
      taskName: 'Otimização de páginas de produto',
      author: {
        id: '3',
        name: 'Roberto Ferreira',
        email: 'roberto@exemplo.com'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: true,
      actionUrl: '/super-admin/projetos-seo/1/tarefas/2'
    },
    {
      id: '4',
      type: 'task_update',
      title: 'Tarefa atualizada',
      message: 'O status da tarefa "Melhorar Core Web Vitals" foi alterado para "Em Progresso"',
      projectId: '1',
      projectName: 'E-commerce Fashion Store',
      taskId: '3',
      taskName: 'Melhorar Core Web Vitals',
      author: {
        id: '1',
        name: 'Carlos Oliveira',
        email: 'carlos@exemplo.com'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      read: true,
      actionUrl: '/super-admin/projetos-seo/1/tarefas/3'
    }
  ]

  useEffect(() => {
    setNotifications(mockNotifications)
  }, [])

  const markAsRead = async (notificationId: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      )
    } catch (error) {
      console.error('Error marking notification as read:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAllAsRead = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    } finally {
      setLoading(false)
    }
  }

  const dismiss = async (notificationId: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setNotifications(prev => prev.filter(n => n.id !== notificationId))
    } catch (error) {
      console.error('Error dismissing notification:', error)
    } finally {
      setLoading(false)
    }
  }

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  return {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    dismiss,
    addNotification,
    unreadCount: notifications.filter(n => !n.read).length
  }
}
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare,
  Send,
  Paperclip,
  MoreHorizontal,
  Edit,
  Trash2,
  Heart,
  Reply,
  Clock,
  Check
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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

interface TaskCommentsProps {
  taskId: string
  comments: TaskComment[]
  onAddComment: (content: string, attachments: File[]) => Promise<void>
  onEditComment?: (commentId: string, content: string) => Promise<void>
  onDeleteComment?: (commentId: string) => Promise<void>
  onLikeComment?: (commentId: string) => Promise<void>
}

export function TaskComments({ 
  taskId, 
  comments, 
  onAddComment, 
  onEditComment, 
  onDeleteComment, 
  onLikeComment 
}: TaskCommentsProps) {
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() && selectedFiles.length === 0) return

    setIsSubmitting(true)
    try {
      await onAddComment(newComment, selectedFiles)
      setNewComment('')
      setSelectedFiles([])
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) return
    try {
      await onEditComment?.(commentId, editContent)
      setEditingCommentId(null)
      setEditContent('')
    } catch (error) {
      console.error('Error editing comment:', error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comentários
          <Badge variant="secondary">{comments.length}</Badge>
        </CardTitle>
        <CardDescription>
          Discussões e atualizações sobre a tarefa
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment Form */}
        <div className="border rounded-lg p-4">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Adicione um comentário..."
              rows={3}
              className="resize-none"
            />
            
            {/* File Upload Area */}
            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Arquivos anexados:</p>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFile(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span className="cursor-pointer">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Anexar Arquivo
                    </span>
                  </Button>
                </label>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting || (!newComment.trim() && selectedFiles.length === 0)}
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Enviando...' : 'Enviar Comentário'}
              </Button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              editingCommentId={editingCommentId}
              editContent={editContent}
              setEditingCommentId={setEditingCommentId}
              setEditContent={setEditContent}
              onEditComment={handleEditComment}
              onDeleteComment={onDeleteComment}
              onLikeComment={onLikeComment}
            />
          ))}
          
          {comments.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum comentário ainda</h3>
              <p className="text-muted-foreground">
                Seja o primeiro a comentar sobre esta tarefa.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface CommentItemProps {
  comment: TaskComment
  editingCommentId: string | null
  editContent: string
  setEditingCommentId: (id: string | null) => void
  setEditContent: (content: string) => void
  onEditComment?: (commentId: string, content: string) => Promise<void>
  onDeleteComment?: (commentId: string) => Promise<void>
  onLikeComment?: (commentId: string) => Promise<void>
}

function CommentItem({
  comment,
  editingCommentId,
  editContent,
  setEditingCommentId,
  setEditContent,
  onEditComment,
  onDeleteComment,
  onLikeComment
}: CommentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isEditing = editingCommentId === comment.id

  const startEditing = () => {
    setEditingCommentId(comment.id)
    setEditContent(comment.content)
  }

  const cancelEditing = () => {
    setEditingCommentId(null)
    setEditContent('')
  }

  const handleLike = async () => {
    await onLikeComment?.(comment.id)
  }

  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>
            {comment.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-3">
          {/* Comment Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{comment.author.name}</h4>
              <Badge variant="outline" className="text-xs">
                {comment.author.role}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), { 
                  addSuffix: true, 
                  locale: ptBR 
                })}
              </span>
              {comment.updatedAt !== comment.createdAt && (
                <span className="text-xs text-muted-foreground">
                  (editado)
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleLike}
              >
                <Heart className={`w-4 h-4 ${comment.likedByUser ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              {comment.likes > 0 && (
                <span className="text-xs text-muted-foreground">
                  {comment.likes}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Reply className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Comment Content */}
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onEditComment?.(comment.id, editContent)}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cancelEditing}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">
                {comment.content}
              </p>
              
              {/* Comment Attachments */}
              {comment.attachments && comment.attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Anexos:</p>
                  <div className="space-y-1">
                    {comment.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-2 p-2 bg-muted rounded text-sm"
                      >
                        <Paperclip className="w-4 h-4" />
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {attachment.name}
                        </a>
                        <span className="text-xs text-muted-foreground">
                          ({attachment.size})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Comment Actions */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0"
                  onClick={handleLike}
                >
                  <Heart className={`w-3 h-3 mr-1 ${comment.likedByUser ? 'fill-red-500 text-red-500' : ''}`} />
                  Curtir
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0"
                  onClick={startEditing}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-destructive hover:text-destructive"
                  onClick={() => onDeleteComment?.(comment.id)}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Excluir
                </Button>
              </div>
            </div>
          )}

          {/* Comment Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 space-y-3 border-l-2 border-muted pl-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  editingCommentId={editingCommentId}
                  editContent={editContent}
                  setEditingCommentId={setEditingCommentId}
                  setEditContent={setEditContent}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                  onLikeComment={onLikeComment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
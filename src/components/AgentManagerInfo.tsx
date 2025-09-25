'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Star,
  Award,
  Target,
  Users,
  Activity,
  TrendingUp
} from 'lucide-react'

interface AgentManager {
  id: string
  name: string
  email: string
  role: string
  department: string
  avatar?: string
  joinDate?: string
  performance?: number
  teamSize?: number
  completedTasks?: number
  expertise?: string[]
}

interface AgentManagerInfoProps {
  manager: AgentManager
  showActions?: boolean
}

export function AgentManagerInfo({ manager, showActions = true }: AgentManagerInfoProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Gestor Responsável
        </CardTitle>
        <CardDescription>
          Informações do gestor do agente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Manager Profile */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{manager.name}</h3>
            <p className="text-sm text-muted-foreground">{manager.role}</p>
            <Badge variant="secondary" className="mt-1">
              {manager.department}
            </Badge>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{manager.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Building className="w-4 h-4 text-muted-foreground" />
            <span>{manager.department}</span>
          </div>
          {manager.joinDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Desde {new Date(manager.joinDate).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
        </div>

        {/* Performance Metrics */}
        {manager.performance !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Performance</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{manager.performance}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tarefas Concluídas</span>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-green-500" />
                <span className="font-medium">{manager.completedTasks || 0}</span>
              </div>
            </div>
            {manager.teamSize !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tamanho da Equipe</span>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{manager.teamSize}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Expertise */}
        {manager.expertise && manager.expertise.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Especialidades</p>
            <div className="flex flex-wrap gap-1">
              {manager.expertice.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Telefone
            </Button>
          </div>
        )}

        {/* Status Badge */}
        <div className="flex items-center justify-center pt-2">
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Activity className="w-3 h-3 mr-1" />
            Ativo
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
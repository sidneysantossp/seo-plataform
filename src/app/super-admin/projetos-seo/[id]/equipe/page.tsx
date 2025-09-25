'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Save,
  Users,
  Mail,
  Phone,
  Building,
  Calendar,
  Plus,
  Trash2,
  Edit,
  Eye,
  User,
  Briefcase,
  Star,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { seoProjects } from '@/data/seoProjects'

interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  startDate: string
  skills: string[]
  status: 'active' | 'inactive'
  avatar?: string
}

export default function TeamManagementPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const [project, setProject] = useState(() => {
    const foundProject = seoProjects.find(p => p.id === projectId)
    if (!foundProject) {
      router.push('/super-admin/projetos-seo')
      return null
    }
    return foundProject
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)

  // Dados de exemplo para membros da equipe
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'member1',
      name: 'Ana Silva',
      email: 'ana.silva@agencia.com',
      phone: '+55 11 99999-8888',
      role: 'SEO Specialist',
      department: 'SEO',
      startDate: '2024-01-15',
      skills: ['SEO On-Page', 'SEO Técnico', 'Análise de Dados'],
      status: 'active'
    },
    {
      id: 'member2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@agencia.com',
      phone: '+55 11 98888-7777',
      role: 'Content Writer',
      department: 'Conteúdo',
      startDate: '2024-01-20',
      skills: ['Copywriting', 'Blog Posts', 'Content Strategy'],
      status: 'active'
    },
    {
      id: 'member3',
      name: 'Mariana Santos',
      email: 'mariana.santos@agencia.com',
      phone: '+55 11 97777-6666',
      role: 'Link Builder',
      department: 'SEO',
      startDate: '2024-02-01',
      skills: ['Outreach', 'Link Building', 'Relationship Management'],
      status: 'active'
    },
    {
      id: 'member4',
      name: 'Roberto Ferreira',
      email: 'roberto.ferreira@agencia.com',
      phone: '+55 11 96666-5555',
      role: 'Technical SEO',
      department: 'SEO',
      startDate: '2024-01-10',
      skills: ['SEO Técnico', 'Web Development', 'Analytics'],
      status: 'active'
    }
  ])

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    skills: '',
    startDate: new Date().toISOString().split('T')[0]
  })

  if (!project) {
    return <div>Carregando...</div>
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const handleAddMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      const member: TeamMember = {
        id: `member${Date.now()}`,
        name: newMember.name,
        email: newMember.email,
        phone: newMember.phone,
        role: newMember.role,
        department: newMember.department || 'SEO',
        startDate: newMember.startDate,
        skills: newMember.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        status: 'active'
      }
      setTeamMembers(prev => [...prev, member])
      setNewMember({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        skills: '',
        startDate: new Date().toISOString().split('T')[0]
      })
      setShowAddForm(false)
    }
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member)
    setNewMember({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      department: member.department,
      skills: member.skills.join(', '),
      startDate: member.startDate
    })
    setShowAddForm(true)
  }

  const handleUpdateMember = () => {
    if (editingMember && newMember.name && newMember.email && newMember.role) {
      setTeamMembers(prev => prev.map(member => 
        member.id === editingMember.id 
          ? {
              ...member,
              name: newMember.name,
              email: newMember.email,
              phone: newMember.phone,
              role: newMember.role,
              department: newMember.department || member.department,
              startDate: newMember.startDate,
              skills: newMember.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
            }
          : member
      ))
      setEditingMember(null)
      setNewMember({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        skills: '',
        startDate: new Date().toISOString().split('T')[0]
      })
      setShowAddForm(false)
    }
  }

  const handleDeleteMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId))
  }

  const handleSendEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank')
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-red-500'
  }

  const departments = Array.from(new Set(teamMembers.map(m => m.department)))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/super-admin/projetos-seo/${projectId}/configuracoes`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Gestão de Equipe</h1>
          <p className="text-muted-foreground">
            {project.name} - {project.client}
          </p>
        </div>
        <Badge variant="default">
          {teamMembers.length} membros
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Buscar Membros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar por nome, email ou função..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Departamentos</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Team Members List */}
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <span>{member.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>Desde {new Date(member.startDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        {member.skills.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-1">Habilidades:</p>
                            <div className="flex flex-wrap gap-1">
                              {member.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendEmail(member.email)}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Link href={`/super-admin/projetos-seo/${projectId}/equipe/${member.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditMember(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum membro encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Tente ajustar sua busca ou filtros.' : 'Comece adicionando membros à equipe.'}
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Membro
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas da Equipe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total de Membros</span>
                <Badge variant="default">{teamMembers.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Membros Ativos</span>
                <Badge variant="secondary">{teamMembers.filter(m => m.status === 'active').length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Departamentos</span>
                <Badge variant="outline">{departments.length}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Add Member Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {editingMember ? 'Editar Membro' : 'Adicionar Membro'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome do membro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={newMember.phone}
                  onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+55 11 99999-8888"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Input
                  id="role"
                  value={newMember.role}
                  onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="Ex: SEO Specialist"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select value={newMember.department} onValueChange={(value) => setNewMember(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SEO">SEO</SelectItem>
                    <SelectItem value="Conteúdo">Conteúdo</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Habilidades (separadas por vírgula)</Label>
                <Textarea
                  id="skills"
                  value={newMember.skills}
                  onChange={(e) => setNewMember(prev => ({ ...prev, skills: e.target.value }))}
                  placeholder="SEO On-Page, Copywriting, Analytics"
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={editingMember ? handleUpdateMember : handleAddMember}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingMember ? 'Atualizar' : 'Adicionar'}
                </Button>
                {showAddForm && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingMember(null)
                      setNewMember({
                        name: '',
                        email: '',
                        phone: '',
                        role: '',
                        department: '',
                        skills: '',
                        startDate: new Date().toISOString().split('T')[0]
                      })
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Projeto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Projeto:</span>
                <p className="text-muted-foreground">{project.name}</p>
              </div>
              <div>
                <span className="font-medium">Cliente:</span>
                <p className="text-muted-foreground">{project.client}</p>
              </div>
              <div>
                <span className="font-medium">Gerente:</span>
                <p className="text-muted-foreground">{project.manager.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
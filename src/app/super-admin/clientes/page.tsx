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
  Users,
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  Star,
  MoreHorizontal,
  Edit,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import { clients, type Client } from '@/data/clients'

export default function ClientsPage() {
  const [clientsList, setClientsList] = useState<Client[]>(clients)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredClients = clientsList.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-red-500'
      case 'prospect': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'inactive': return 'Inativo'
      case 'prospect': return 'Prospecto'
      default: return 'Desconhecido'
    }
  }

  const getIndustryIcon = (industry: string) => {
    return <Building className="w-4 h-4" />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie todos os clientes da sua agência
          </p>
        </div>
        <Link href="/super-admin/clientes/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsList.length}</div>
            <p className="text-xs text-muted-foreground">Clientes cadastrados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientsList.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Com projetos ativos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prospectos</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientsList.filter(c => c.status === 'prospect').length}
            </div>
            <p className="text-xs text-muted-foreground">Em negociação</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indústrias</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(clientsList.map(c => c.industry)).size}
            </div>
            <p className="text-xs text-muted-foreground">Diferentes setores</p>
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
                  placeholder="Buscar clientes ou empresas..."
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
                <option value="active">Ativos</option>
                <option value="prospect">Prospectos</option>
                <option value="inactive">Inativos</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-1">{client.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {client.company}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(client.status)}`} />
                  <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                    {getStatusText(client.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Client Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span>{client.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                {client.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{client.website}</span>
                  </div>
                )}
              </div>

              {/* Contact Person */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Contato Principal</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span>{client.contactPerson.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Star className="w-3 h-3 text-muted-foreground" />
                    <span>{client.contactPerson.position}</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Endereço</p>
                <div className="flex items-start gap-2 text-xs">
                  <MapPin className="w-3 h-3 text-muted-foreground mt-0.5" />
                  <span>
                    {client.address.street}, {client.address.number}
                    {client.address.complement && `, ${client.address.complement}`}<br />
                    {client.address.neighborhood}, {client.address.city} - {client.address.state}<br />
                    {client.address.zipCode}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link href={`/super-admin/clientes/${client.id}`} className="flex-1">
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

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum cliente encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Tente ajustar sua busca ou filtros.' : 'Comece cadastrando seu primeiro cliente.'}
            </p>
            <Link href="/super-admin/clientes/novo">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Cliente
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
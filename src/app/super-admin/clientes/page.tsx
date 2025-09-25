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
  Eye,
  Trash2,
  Archive,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import { clients, type Client } from '@/data/clients'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { seoProjects } from '@/data/seoProjects'

export default function ClientsPage() {
  const [clientsList, setClientsList] = useState<Client[]>(clients)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Função para verificar se um cliente tem projetos ativos
  const hasActiveProjects = (clientName: string): boolean => {
    const activeProjects = seoProjects.filter(project => 
      project.client === clientName && 
      project.status === 'active'
    )
    return activeProjects.length > 0
  }

  // Função para finalizar projetos de um cliente
  const finalizeClientProjects = (clientName: string): void => {
    // Em uma implementação real, isso atualizaria os projetos no banco de dados
    console.log(`Finalizando projetos do cliente: ${clientName}`)
  }

  // Função para excluir um cliente
  const deleteClient = (clientId: string): void => {
    const clientName = clientsList.find(c => c.id === clientId)?.name || ''
    
    // Verificar se há projetos ativos
    if (hasActiveProjects(clientName)) {
      // Finalizar projetos antes de excluir
      finalizeClientProjects(clientName)
    }
    
    // Remover cliente da lista
    setClientsList(prev => prev.filter(client => client.id !== clientId))
  }

  // Função para arquivar/desativar um cliente
  const archiveClient = (clientId: string): void => {
    setClientsList(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, status: 'inactive' as const }
        : client
    ))
  }

  // Função para verificar se um cliente tem pagamento atrasado
  const hasOverduePayment = (client: Client): boolean => {
    return client.paymentStatus === 'overdue'
  }

  // Função para desativar cliente por pagamento atrasado
  const deactivateForOverduePayment = (clientId: string): void => {
    setClientsList(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, status: 'inactive' as const }
        : client
    ))
  }

  // Função para obter a cor do status de pagamento
  const getPaymentStatusColor = (paymentStatus?: string) => {
    switch (paymentStatus) {
      case 'paid': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'overdue': return 'bg-red-500'
      case 'cancelled': return 'bg-gray-500'
      default: return 'bg-gray-300'
    }
  }

  // Função para obter o texto do status de pagamento
  const getPaymentStatusText = (paymentStatus?: string) => {
    switch (paymentStatus) {
      case 'paid': return 'Pago'
      case 'pending': return 'Pendente'
      case 'overdue': return 'Atrasado'
      case 'cancelled': return 'Cancelado'
      default: return 'Não informado'
    }
  }

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
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(client.status)}`} />
                    <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                      {getStatusText(client.status)}
                    </Badge>
                  </div>
                  {client.paymentStatus && (
                    <div className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${getPaymentStatusColor(client.paymentStatus)}`} />
                      <span className="text-xs text-muted-foreground">
                        {getPaymentStatusText(client.paymentStatus)}
                      </span>
                    </div>
                  )}
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

              {/* Payment Info */}
              {client.monthlyFee && client.monthlyFee > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Informações de Pagamento</p>
                  <div className="bg-gray-50 rounded p-2 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mensalidade:</span>
                      <span className="font-medium">R$ {client.monthlyFee.toLocaleString('pt-BR')}</span>
                    </div>
                    {client.lastPaymentDate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Último pagamento:</span>
                        <span>{new Date(client.lastPaymentDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                    {client.nextPaymentDate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Próximo pagamento:</span>
                        <span>{new Date(client.nextPaymentDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link href={`/super-admin/clientes/${client.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </Link>
                <Link href={`/super-admin/clientes/${client.id}/editar`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações do Cliente</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/super-admin/clientes/${client.id}/editar`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Cliente
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/super-admin/projetos-seo/novo?client=${client.id}`}>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Projeto
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {hasOverduePayment(client) && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-orange-600" onSelect={(e) => e.preventDefault()}>
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Desativar por Pagamento Atrasado
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5" />
                              Desativar Cliente por Pagamento Atrasado
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              <div className="space-y-2">
                                <p>
                                  O cliente "{client.name}" possui pagamento atrasado. 
                                  Deseja desativá-lo temporariamente até que o pagamento seja regularizado?
                                </p>
                                {hasActiveProjects(client.name) && (
                                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                                    <p className="text-sm font-medium mb-1">Atenção:</p>
                                    <p className="text-sm">
                                      Este cliente possui projetos ativos que serão pausados automaticamente.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deactivateForOverduePayment(client.id)}
                              className="bg-orange-600 hover:bg-orange-700"
                            >
                              Desativar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                          <Archive className="w-4 h-4 mr-2" />
                          Arquivar Cliente
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Arquivar Cliente</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja arquivar o cliente "{client.name}"? 
                            Isso o tornará inativo e não aparecerá nas listagens principais.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => archiveClient(client.id)}>
                            Arquivar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir Cliente
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Excluir Cliente
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {hasActiveProjects(client.name) ? (
                              <div className="space-y-2">
                                <p>
                                  Este cliente possui projetos ativos. Ao excluí-lo, os seguintes projetos serão finalizados automaticamente:
                                </p>
                                <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                                  {seoProjects
                                    .filter(p => p.client === client.name && p.status === 'active')
                                    .map(p => (
                                      <div key={p.id} className="text-sm">
                                        • {p.name}
                                      </div>
                                    ))}
                                </div>
                                <p className="font-medium">
                                  Tem certeza que deseja excluir permanentemente o cliente "{client.name}"?
                                </p>
                              </div>
                            ) : (
                              <p>
                                Tem certeza que deseja excluir permanentemente o cliente "{client.name}"? 
                                Esta ação não pode ser desfeita.
                              </p>
                            )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => deleteClient(client.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
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
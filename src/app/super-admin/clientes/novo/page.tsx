'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Save,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  Plus,
  Check
} from 'lucide-react'
import Link from 'next/link'
import { clients, type Client } from '@/data/clients'

interface NewClientData {
  name: string
  email: string
  phone: string
  company: string
  document: string
  industry: string
  website: string
  status: 'active' | 'inactive' | 'prospect'
  address: {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  contactPerson: {
    name: string
    email: string
    phone: string
    position: string
  }
}

export default function NewClientPage() {
  const router = useRouter()
  const [clientData, setClientData] = useState<NewClientData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    document: '',
    industry: '',
    website: '',
    status: 'prospect',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    },
    contactPerson: {
      name: '',
      email: '',
      phone: '',
      position: ''
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof NewClientData, value: string) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setClientData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handleContactPersonChange = (field: string, value: string) => {
    setClientData(prev => ({
      ...prev,
      contactPerson: {
        ...prev.contactPerson,
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular criação do cliente
    const newClient: Client = {
      id: (clients.length + 1).toString(),
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      company: clientData.company,
      document: clientData.document,
      industry: clientData.industry,
      website: clientData.website,
      status: clientData.status,
      address: clientData.address,
      contactPerson: clientData.contactPerson,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirecionar para a página de clientes
    router.push('/super-admin/clientes')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/super-admin/clientes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Novo Cliente</h1>
            <p className="text-muted-foreground">
              Cadastre um novo cliente na sua agência
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="address">Endereço</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
          </TabsList>

          {/* Dados Básicos */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informações da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client-name">Nome do Cliente *</Label>
                    <Input
                      id="client-name"
                      value={clientData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nome completo do cliente"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company-name">Nome da Empresa *</Label>
                    <Input
                      id="company-name"
                      value={clientData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Nome da empresa"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client-email">Email *</Label>
                    <Input
                      id="client-email"
                      type="email"
                      value={clientData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@empresa.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="client-phone">Telefone *</Label>
                    <Input
                      id="client-phone"
                      value={clientData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+55 11 99999-8888"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="client-document">Documento *</Label>
                    <Input
                      id="client-document"
                      value={clientData.document}
                      onChange={(e) => handleInputChange('document', e.target.value)}
                      placeholder="12.345.678/0001-90"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="client-industry">Indústria *</Label>
                    <Select value={clientData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Saúde">Saúde</SelectItem>
                        <SelectItem value="Gastronomia">Gastronomia</SelectItem>
                        <SelectItem value="Construção Civil">Construção Civil</SelectItem>
                        <SelectItem value="Educação">Educação</SelectItem>
                        <SelectItem value="Financeiro">Financeiro</SelectItem>
                        <SelectItem value="Varejo">Varejo</SelectItem>
                        <SelectItem value="Serviços">Serviços</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="client-status">Status</Label>
                    <Select value={clientData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                        <SelectItem value="prospect">Prospecto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="client-website">Website</Label>
                  <Input
                    id="client-website"
                    type="url"
                    value={clientData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://empresa.com"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contato */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contato Principal
                </CardTitle>
                <CardDescription>
                  Informações da pessoa principal de contato
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Nome *</Label>
                    <Input
                      id="contact-name"
                      value={clientData.contactPerson.name}
                      onChange={(e) => handleContactPersonChange('name', e.target.value)}
                      placeholder="Nome do contato principal"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-position">Cargo *</Label>
                    <Input
                      id="contact-position"
                      value={clientData.contactPerson.position}
                      onChange={(e) => handleContactPersonChange('position', e.target.value)}
                      placeholder="Cargo na empresa"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={clientData.contactPerson.email}
                      onChange={(e) => handleContactPersonChange('email', e.target.value)}
                      placeholder="email@empresa.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Telefone *</Label>
                    <Input
                      id="contact-phone"
                      value={clientData.contactPerson.phone}
                      onChange={(e) => handleContactPersonChange('phone', e.target.value)}
                      placeholder="+55 11 99999-8888"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Endereço */}
          <TabsContent value="address" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="address-street">Rua *</Label>
                    <Input
                      id="address-street"
                      value={clientData.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      placeholder="Nome da rua"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address-number">Número *</Label>
                    <Input
                      id="address-number"
                      value={clientData.address.number}
                      onChange={(e) => handleAddressChange('number', e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address-complement">Complemento</Label>
                    <Input
                      id="address-complement"
                      value={clientData.address.complement}
                      onChange={(e) => handleAddressChange('complement', e.target.value)}
                      placeholder="Apto, Sala, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="address-neighborhood">Bairro *</Label>
                    <Input
                      id="address-neighborhood"
                      value={clientData.address.neighborhood}
                      onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
                      placeholder="Nome do bairro"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address-city">Cidade *</Label>
                    <Input
                      id="address-city"
                      value={clientData.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      placeholder="Nome da cidade"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address-state">Estado *</Label>
                    <Select value={clientData.address.state} onValueChange={(value) => handleAddressChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC">AC</SelectItem>
                        <SelectItem value="AL">AL</SelectItem>
                        <SelectItem value="AP">AP</SelectItem>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="BA">BA</SelectItem>
                        <SelectItem value="CE">CE</SelectItem>
                        <SelectItem value="DF">DF</SelectItem>
                        <SelectItem value="ES">ES</SelectItem>
                        <SelectItem value="GO">GO</SelectItem>
                        <SelectItem value="MA">MA</SelectItem>
                        <SelectItem value="MT">MT</SelectItem>
                        <SelectItem value="MS">MS</SelectItem>
                        <SelectItem value="MG">MG</SelectItem>
                        <SelectItem value="PA">PA</SelectItem>
                        <SelectItem value="PB">PB</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                        <SelectItem value="PE">PE</SelectItem>
                        <SelectItem value="PI">PI</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="RN">RN</SelectItem>
                        <SelectItem value="RS">RS</SelectItem>
                        <SelectItem value="RO">RO</SelectItem>
                        <SelectItem value="RR">RR</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="SE">SE</SelectItem>
                        <SelectItem value="TO">TO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address-zipcode">CEP *</Label>
                  <Input
                    id="address-zipcode"
                    value={clientData.address.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    placeholder="00000-000"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Avançado */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Avançadas</CardTitle>
                <CardDescription>
                  Configurações adicionais para o cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Informações Adicionais</h4>
                    <p className="text-sm text-muted-foreground">
                      Após o cadastro, você poderá adicionar notas, documentos e outras informações detalhadas sobre o cliente.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Projetos</h4>
                      <p className="text-sm text-muted-foreground">
                        Você poderá associar projetos SEO a este cliente após o cadastro.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Documentos</h4>
                      <p className="text-sm text-muted-foreground">
                        Será possível anexar contratos, propostas e outros documentos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
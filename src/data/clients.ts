export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  document: string // CPF ou CNPJ
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  industry: string
  website?: string
  contactPerson: {
    name: string
    email: string
    phone: string
    position: string
  }
  status: 'active' | 'inactive' | 'prospect'
  createdAt: string
  updatedAt: string
}

export const clients: Client[] = [
  {
    id: 'client1',
    name: 'Fashion Store Ltda',
    email: 'contato@fashionstore.com.br',
    phone: '+55 11 98765-4321',
    company: 'Fashion Store Ltda',
    document: '12.345.678/0001-90',
    address: {
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Sala 1501',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    industry: 'E-commerce',
    website: 'https://fashionstore.com.br',
    contactPerson: {
      name: 'João Silva',
      email: 'joao.silva@fashionstore.com.br',
      phone: '+55 11 99999-8888',
      position: 'Diretor de Marketing'
    },
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'client2',
    name: 'TechSolutions Pro',
    email: 'contato@techsolutions.com',
    phone: '+55 11 97654-3210',
    company: 'TechSolutions Pro Ltda',
    document: '98.765.432/0001-10',
    address: {
      street: 'Rua Faria Lima',
      number: '2000',
      complement: 'Andar 15',
      neighborhood: 'Vila Olímpia',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01452-000'
    },
    industry: 'Software',
    website: 'https://techsolutions.com',
    contactPerson: {
      name: 'Maria Santos',
      email: 'maria.santos@techsolutions.com',
      phone: '+55 11 98888-7777',
      position: 'CEO'
    },
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-01T14:00:00Z'
  },
  {
    id: 'client3',
    name: 'Clínica Saúde Total',
    email: 'contato@clinicasaudetotal.com.br',
    phone: '+55 11 96543-2109',
    company: 'Clínica Saúde Total Ltda',
    document: '45.678.901/0001-23',
    address: {
      street: 'Rua Augusta',
      number: '500',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01304-000'
    },
    industry: 'Saúde',
    website: 'https://clinicasaudetotal.com.br',
    contactPerson: {
      name: 'Dr. Carlos Oliveira',
      email: 'carlos.oliveira@clinicasaudetotal.com.br',
      phone: '+55 11 97777-6666',
      position: 'Diretor Clínico'
    },
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z'
  },
  {
    id: 'client4',
    name: 'Chef\'s Table Restaurant',
    email: 'contato@chefstable.com',
    phone: '+55 11 95432-1098',
    company: 'Chef\'s Table Restaurant Ltda',
    document: '56.789.012/0001-34',
    address: {
      street: 'Rua Oscar Freire',
      number: '300',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-001'
    },
    industry: 'Gastronomia',
    website: 'https://chefstable.com',
    contactPerson: {
      name: 'Chef Roberto Ferreira',
      email: 'roberto.ferreira@chefstable.com',
      phone: '+55 11 96666-5555',
      position: 'Chef Proprietário'
    },
    status: 'active',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z'
  },
  {
    id: 'client5',
    name: 'Construtora ABC',
    email: 'contato@construtoraabc.com.br',
    phone: '+55 11 94321-0987',
    company: 'Construtora ABC Ltda',
    document: '67.890.123/0001-45',
    address: {
      street: 'Avenida Brigadeiro Faria Lima',
      number: '1500',
      neighborhood: 'Itaim Bibi',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01452-010'
    },
    industry: 'Construção Civil',
    contactPerson: {
      name: 'Pedro Almeida',
      email: 'pedro.almeida@construtoraabc.com.br',
      phone: '+55 11 95555-4444',
      position: 'Diretor Presidente'
    },
    status: 'prospect',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  }
]
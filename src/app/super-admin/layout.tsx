'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  BarChart3, 
  FileText, 
  Bot, 
  Settings, 
  Menu,
  Home,
  Search,
  TrendingUp,
  FileBarChart,
  Users,
  Zap
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/super-admin', icon: Home },
  { name: 'Projetos SEO', href: '/super-admin/projetos-seo', icon: FileText },
  { name: 'Agentes de IA', href: '/super-admin/agentes-ia', icon: Bot },
  { name: 'Conteúdo', href: '/super-admin/conteudo', icon: FileBarChart },
  { name: 'Palavras-Chave', href: '/super-admin/palavras-chave', icon: Search },
  { name: 'Analytics', href: '/super-admin/analytics', icon: TrendingUp },
  { name: 'Relatórios', href: '/super-admin/relatorios', icon: BarChart3 },
  { name: 'Integrações', href: '/super-admin/integracoes', icon: Zap },
  { name: 'Configurações', href: '/super-admin/configuracoes', icon: Settings },
]

interface SuperAdminLayoutProps {
  children: React.ReactNode
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const NavContent = () => (
    <nav className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-6 border-b">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-lg">SEO SaaS</h1>
          <p className="text-xs text-muted-foreground">Super Admin</p>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Super Admin</p>
            <p className="text-xs text-muted-foreground truncate">admin@seosaas.com</p>
          </div>
        </div>
      </div>
    </nav>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r bg-card">
        <NavContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">
              {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Config
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
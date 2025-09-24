import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bot, BarChart3, FileText, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 bg-gradient-to-br from-background to-muted/20">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <img
          src="/logo.svg"
          alt="Z.ai Logo"
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="text-center max-w-2xl space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          SEO SaaS Platform
        </h1>
        <p className="text-xl text-muted-foreground">
          Plataforma completa de SEO com agentes de IA para otimizar seu conteúdo e rankings
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/super-admin">
              <BarChart3 className="w-5 h-5 mr-2" />
              Acessar Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            <Zap className="w-5 h-5 mr-2" />
            Ver Demo
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-12">
        <div className="p-6 rounded-lg border bg-card">
          <Bot className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">6 Agentes de IA</h3>
          <p className="text-muted-foreground">Agentes especializados em conteúdo, SEO, palavras-chave e mais</p>
        </div>
        
        <div className="p-6 rounded-lg border bg-card">
          <FileText className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Gestão Completa</h3>
          <p className="text-muted-foreground">Projetos, conteúdo e métricas em um único lugar</p>
        </div>
        
        <div className="p-6 rounded-lg border bg-card">
          <BarChart3 className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Analytics em Tempo Real</h3>
          <p className="text-muted-foreground">Monitoramento contínuo do desempenho e atividades</p>
        </div>
      </div>
    </div>
  )
}
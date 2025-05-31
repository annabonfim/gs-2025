'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header/Header'
import Card from '@/components/Card/Card'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Aqui você pode adicionar verificação de autenticação futuramente
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FDF7F0] px-6 py-10">
        <h1 className="text-3xl font-bold text-[#0C3B5D] mb-2">Bem-vindo ao HumanLink</h1>
        <p className="text-gray-700 mb-6">Aqui você pode visualizar necessidades registradas e contribuir com ações solidárias.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Painel lateral de ações */}
          <aside className="md:col-span-1 space-y-4">
            <div className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold text-[#0C3B5D] mb-2">Ações rápidas</h2>
              <ul className="space-y-2 text-sm">
                <li><Link href="/necessidades/nova" className="block text-left w-full text-[#0C3B5D] hover:underline">Registrar Necessidade</Link></li>
                <li><button className="text-left w-full text-[#0C3B5D] hover:underline">Oferecer Ajuda</button></li>
                <li><button className="text-left w-full text-[#0C3B5D] hover:underline">Abrir Mapa</button></li>
              </ul>
            </div>
          </aside>

          {/* Feed de registros */}
          <section className="md:col-span-3 space-y-6">
            <Card
              title="Necessidade urgente"
              description="Família desalojada precisa de água e alimentos na região central. 5 pessoas afetadas."
              status="urgente"
              autor="Equipe Resgate Zona Oeste"
              hora="há 2 horas"
            />

            <Card
              title="Doação disponível"
              description="Doador anônimo oferece 3 colchões e itens de higiene. Retirada em ponto seguro."
              status="disponivel"
              autor="Doador Anônimo"
              hora="há 3 horas"
            />
          </section>
        </div>
      </main>
    </>
  )
}
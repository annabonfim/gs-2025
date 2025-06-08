'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import Card from '@/components/Card/Card'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

type Necessidade = {
  id: number
  titulo: string
  categoria: string
  urgencia: string
  cidade: string
  estado: string
}

export default function NecessidadesPage() {
  const [necessidades, setNecessidades] = useState<Necessidade[]>([])
  useEffect(() => {
    async function fetchNecessidades() {
      try {
        const res = await fetch('https://humanlink-api-production.up.railway.app/necessidades')
        if (!res.ok) throw new Error('Erro ao buscar necessidades')
        const data = await res.json()
        setNecessidades(data)
      } catch (error) {
        console.error('Erro ao carregar necessidades:', error)
      }
    }

    fetchNecessidades()
  }, [])

  return (
    <ProtectedRoute>
      <Header />
      <main className="min-h-screen bg-[#FDF7F0] px-6 py-10">
        <SectionTitle title="Necessidades Cadastradas" />
        <div className="flex justify-end mt-4">
          <a
            href="/dashboard/necessidades/nova"
            className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            Registrar nova necessidade
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {necessidades.map(n => (
            <Card
              key={n.id}
              title={n.titulo}
              subtitle={`${n.cidade} – ${n.estado}`}
              tags={[n.categoria, `Urgência: ${n.urgencia}`]}
              href={`/dashboard/necessidades/${n.id}`}
            />
          ))}
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}
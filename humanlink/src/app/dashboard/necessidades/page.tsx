'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import Card from '@/components/Card/Card'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

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
    // Substituir essa parte por uma chamada real à API futuramente
    setNecessidades([
      {
        id: 1,
        titulo: 'Doação de alimentos para família em situação de risco',
        categoria: 'Alimento',
        urgencia: 'Alta',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      {
        id: 2,
        titulo: 'Medicamentos para idosos',
        categoria: 'Medicamento',
        urgencia: 'Crítica',
        cidade: 'Belo Horizonte',
        estado: 'MG'
      }
    ])
  }, [])

  return (
    <>
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
    </>
  )
}
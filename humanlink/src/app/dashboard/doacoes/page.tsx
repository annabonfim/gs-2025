'use client'

import Card from '@/components/Card/Card'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Link from 'next/link'

const doacoes = [
  {
    id: 1,
    titulo: 'Roupas de frio disponíveis',
    descricao: 'Casacos e cobertores em bom estado para quem está em situação de rua.',
    status: 'disponivel',
    autor: 'Maria S.',
    hora: 'Há 2 horas',
  },
  {
    id: 2,
    titulo: 'Kit de higiene pessoal',
    descricao: 'Shampoo, sabonete, escova e pasta de dente.',
    status: 'disponivel',
    autor: 'ONG Esperança',
    hora: 'Hoje, 08:30',
  },
  {
    id: 3,
    titulo: 'Cestas básicas',
    descricao: 'Alimentos não perecíveis prontos para retirada no centro comunitário.',
    status: 'concluido',
    autor: 'João P.',
    hora: 'Ontem',
  },
]

export default function DoacoesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FDF7F0] px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <SectionTitle title="Doações disponíveis" subtitle="Itens que podem ser retirados nos pontos indicados" />
          <Link href="/dashboard/doacoes/nova" className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900">
            Registrar Doação
          </Link>
        </div>
        <div className="space-y-6">
          {doacoes.map((doacao) => (
            <Card
              key={doacao.id}
              title={doacao.titulo}
              description={doacao.descricao}
              status={doacao.status as 'disponivel' | 'urgente' | 'concluido'}
              autor={doacao.autor}
              hora={doacao.hora}
              href={`/dashboard/doacoes/${doacao.id}`}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

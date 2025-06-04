'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Card from '@/components/Card/Card'

type Doacao = {
  id: string
  titulo: string
  descricao: string
  categoria: string
  status: 'disponivel' | 'reservado' | 'encerrado'
  autor: string
  hora: string
}

const mockDoacoes: Doacao[] = [
  {
    id: '1',
    titulo: 'Roupas de frio disponíveis',
    descricao: 'Casacos e cobertores em bom estado para quem está em situação de rua.',
    categoria: 'Roupas',
    status: 'disponivel',
    autor: 'Maria S.',
    hora: 'Há 2 horas'
  },
  {
    id: '2',
    titulo: 'Kit de higiene pessoal',
    descricao: 'Shampoo, sabonete, escova e pasta de dente.',
    categoria: 'Higiene',
    status: 'disponivel',
    autor: 'ONG Esperança',
    hora: 'Hoje, 08:30'
  },
  {
    id: '3',
    titulo: 'Cestas básicas',
    descricao: 'Alimentos não perecíveis prontos para retirada no centro comunitário.',
    categoria: 'Alimentos',
    status: 'disponivel',
    autor: 'João P.',
    hora: 'Ontem'
  }
]

export default function DoacaoDetalhePage() {
  const params = useParams()
  const id = params?.id
  const [doacao, setDoacao] = useState<Doacao | null>(null)

  useEffect(() => {
    if (id) {
      const encontrada = mockDoacoes.find((d) => d.id === id)
      if (encontrada) setDoacao(encontrada)
    }
  }, [id])

  if (!doacao) {
    return <p className="text-center py-10">Carregando...</p>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FDF7F0] px-6 py-10 flex justify-center">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold text-[#0C3B5D] mb-6">{doacao.titulo}</h1>
          <p className="text-base text-gray-800 mb-4">{doacao.descricao}</p>
          <ul className="text-gray-800 text-sm space-y-2">
            <li><span className="font-semibold">Categoria:</span> {doacao.categoria}</li>
            <li><span className="font-semibold">Status:</span> {doacao.status}</li>
            <li><span className="font-semibold">Publicado por:</span> {doacao.autor}</li>
            <li><span className="font-semibold">Horário:</span> {doacao.hora}</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
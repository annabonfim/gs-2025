'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

type Necessidade = {
  id: number
  titulo: string
  descricao: string
  categoria: string
  urgencia: string
  cep: string
  endereco: string
  numero: string
  bairro: string
  cidade: string
  estado: string
}

export default function NecessidadeDetalhesPage() {
  const { id } = useParams()
  const [necessidade, setNecessidade] = useState<Necessidade | null>(null)

  // Simula base de dados local
  const mockData: Necessidade[] = [
    {
      id: 1,
      titulo: 'Doação de alimentos para família em situação de risco',
      descricao: 'Família com crianças pequenas precisa de doações de alimentos básicos.',
      categoria: 'Alimento',
      urgencia: 'Alta',
      cep: '01000-000',
      endereco: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP'
    },
    {
      id: 2,
      titulo: 'Medicamentos para idosos',
      descricao: 'Instituição de apoio a idosos precisa de medicamentos para tratamento contínuo.',
      categoria: 'Medicamento',
      urgencia: 'Crítica',
      cep: '30123-456',
      endereco: 'Avenida Brasil',
      numero: '456',
      bairro: 'Funcionários',
      cidade: 'Belo Horizonte',
      estado: 'MG'
    }
  ]

  useEffect(() => {
    const found = mockData.find(n => n.id === Number(id))
    if (found) {
      setNecessidade(found)
    }
  }, [id])

  return (
    <ProtectedRoute>
      <Header />
      <main className="min-h-screen bg-[#FDF7F0] px-6 py-10 flex justify-center">
        <div className="bg-white shadow-md rounded-md p-8 max-w-2xl w-full space-y-4">
          {necessidade ? (
            <>
              <h1 className="text-2xl font-bold text-[#0C3B5D]">{necessidade.titulo}</h1>
              <p className="text-gray-700">{necessidade.descricao}</p>
              <div className="text-sm text-gray-600">
                <p><strong>Categoria:</strong> {necessidade.categoria}</p>
                <p><strong>Urgência:</strong> {necessidade.urgencia}</p>
                <p><strong>Endereço:</strong> {necessidade.endereco}, {necessidade.numero}</p>
                <p><strong>Bairro:</strong> {necessidade.bairro}</p>
                <p><strong>Cidade:</strong> {necessidade.cidade} - {necessidade.estado}</p>
                <p><strong>CEP:</strong> {necessidade.cep}</p>
              </div>
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}
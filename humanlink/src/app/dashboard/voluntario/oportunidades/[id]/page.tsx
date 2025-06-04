'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

interface Oportunidade {
  id: number
  titulo: string
  descricao: string
  local: string
  horario: string
}

const mockOportunidades: Oportunidade[] = [
  {
    id: 1,
    titulo: 'Entrega de alimentos no centro',
    descricao: 'Precisamos de voluntários para ajudar na entrega de marmitas no centro da cidade. O ponto de encontro será na praça principal às 11h.',
    local: 'Praça Central, São Paulo - SP',
    horario: 'Hoje, às 11h',
  },
  {
    id: 2,
    titulo: 'Ajuda em abrigo comunitário',
    descricao: 'O abrigo na zona norte precisa de apoio com a organização de doações e atendimento às famílias.',
    local: 'Av. das Palmeiras, 123 - Zona Norte',
    horario: 'Amanhã, das 9h às 14h',
  },
  {
    id: 3,
    titulo: 'Distribuição de kits de higiene',
    descricao: 'Voluntários para distribuir kits de higiene em bairros afetados pelas enchentes.',
    local: 'Escola Municipal Aurora, Rua das Rosas, 45',
    horario: 'Sábado, às 10h',
  },
]

export default function ConfirmarOportunidadePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [oportunidade, setOportunidade] = useState<Oportunidade | null>(null)
  const [mostrarModal, setMostrarModal] = useState(false)

  useEffect(() => {
    const idNum = Number(id)
    if (!isNaN(idNum)) {
      const encontrada = mockOportunidades.find((op) => op.id === idNum)
      if (encontrada) {
        setOportunidade(encontrada)
      }
    }
  }, [id])

  const handleConfirm = () => {
    setMostrarModal(true)
    setTimeout(() => {
      setMostrarModal(false)
      router.replace('/dashboard/voluntario/oportunidades')
    }, 4000)
  }

  if (!oportunidade) {
    return <p className="text-center mt-10">Oportunidade não encontrada.</p>
  }

  return (
    <>
      <Header />
      <main className="bg-[#FDF7F0] min-h-screen px-6 py-10 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white shadow-md rounded-md p-6 space-y-4">
          <h1 className="text-2xl font-bold text-[#0C3B5D] text-center">Confirmar Participação</h1>
          <h2 className="text-lg font-bold text-[#0C3B5D]">{oportunidade.titulo}</h2>
          <p>{oportunidade.descricao}</p>
          <p><strong>Local:</strong> {oportunidade.local}</p>
          <p><strong>Horário:</strong> {oportunidade.horario}</p>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleConfirm}
              className="bg-[#0C3B5D] text-white px-6 py-2 rounded hover:bg-blue-900"
            >
              Confirmar Participação
            </button>
          </div>
          {mostrarModal && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-[#FDF7F0] bg-opacity-90 z-50"
              onClick={() => {
                setMostrarModal(false)
                router.replace('/dashboard/voluntario/oportunidades')
              }}
            >
              <div
                className="relative bg-white p-6 rounded-md shadow-lg text-center max-w-sm border-t-4 border-[#0C3B5D] space-y-4 transition"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setMostrarModal(false)
                    router.replace('/dashboard/voluntario/oportunidades')
                  }}
                  className="absolute top-4 right-4 text-[#0C3B5D] text-xl font-bold hover:text-red-500"
                  aria-label="Fechar"
                >
                  ×
                </button>
                <div className="text-3xl text-[#0C3B5D]">✔️</div>
                <h2 className="text-xl font-bold text-[#0C3B5D]">Inscrição confirmada!</h2>
                <p>Você se inscreveu para: <strong>{oportunidade?.titulo}</strong></p>
                <p className="text-sm text-gray-600">Agora é só seguir as instruções do post!</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
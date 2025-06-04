'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

type Notificacao = {
  id: number
  titulo: string
  mensagem: string
  data: string
  lida: boolean
}

export default function NotificacoesPage() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])

  useEffect(() => {
    // Simulação de fetch — substituir por chamada real à API Java
    setNotificacoes([
      {
        id: 1,
        titulo: 'Relato enviado com sucesso!',
        mensagem: 'Seu relato sobre o abrigo na zona norte foi recebido.',
        data: '03/06/2025',
        lida: false,
      },
      {
        id: 2,
        titulo: 'Alerta da Defesa Civil',
        mensagem: 'Evite transitar pela Av. Rio Branco devido a enchentes.',
        data: '03/06/2025',
        lida: true,
      },
    ])
  }, [])

  return (
    <>
      <Header />
      <main className="bg-[#FDF7F0] min-h-screen px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold text-[#0C3B5D]">Notificações</h1>
          {notificacoes.map((n) => (
            <div
              key={n.id}
              className={`p-4 border rounded-md shadow-sm ${
                n.lida ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <h2 className="font-semibold text-[#0C3B5D]">{n.titulo}</h2>
              <p className="text-gray-700">{n.mensagem}</p>
              <p className="text-sm text-gray-500 mt-1">{n.data}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

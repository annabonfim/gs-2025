'use client'

import { ReactNode } from 'react'

type CardProps = {
  title: string
  description?: string
  status?: 'urgente' | 'disponivel' | 'concluido'
  autor?: string
  hora?: string
  children?: ReactNode
}

export default function Card({ title, description, status, autor, hora, children }: CardProps) {
  const statusColor = {
    urgente: 'text-red-600',
    disponivel: 'text-green-600',
    concluido: 'text-gray-500'
  }

  const statusLabel = {
    urgente: 'URGENTE',
    disponivel: 'DISPONÍVEL',
    concluido: 'CONCLUÍDO'
  }

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-[#0C3B5D]">{title}</h2>
        {status && (
          <span className={`text-xs font-bold uppercase ${statusColor[status]}`}>
            {statusLabel[status]}
          </span>
        )}
      </div>
      {description && (
        <p className="text-gray-700 text-sm mb-2">{description}</p>
      )}

      {children}

      {autor && (
        <p className="text-xs text-gray-500">
          Publicado por: {autor} {hora && `• ${hora}`}
        </p>
      )}
    </div>
  )
}

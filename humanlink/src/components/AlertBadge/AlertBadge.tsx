

'use client'

type AlertBadgeProps = {
  status: 'urgente' | 'disponivel' | 'concluido'
}

export default function AlertBadge({ status }: AlertBadgeProps) {
  const colorMap = {
    urgente: 'bg-red-100 text-red-800',
    disponivel: 'bg-green-100 text-green-800',
    concluido: 'bg-gray-100 text-gray-700'
  }

  const labelMap = {
    urgente: 'URGENTE',
    disponivel: 'DISPONÍVEL',
    concluido: 'CONCLUÍDO'
  }

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${colorMap[status]}`}>
      {labelMap[status]}
    </span>
  )
}
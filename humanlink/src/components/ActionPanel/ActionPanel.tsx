'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

type Action = {
  label: string
  icon: ReactNode
  href: string
}

type ActionPanelProps = {
  actions: Action[]
}

export default function ActionPanel({ actions }: ActionPanelProps) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[#0C3B5D] mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span className="text-xl mr-3">{action.icon}</span>
            <span className="text-sm font-medium text-gray-800">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

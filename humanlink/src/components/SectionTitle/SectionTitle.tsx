'use client'

import { ReactNode } from 'react'

type SectionTitleProps = {
  children: ReactNode
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-2xl font-bold text-[#0C3B5D] mb-4 border-b border-gray-200 pb-2">
      {children}
    </h2>
  )
}

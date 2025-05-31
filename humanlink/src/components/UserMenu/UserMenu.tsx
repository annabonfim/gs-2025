

'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
      >
        👤
      </button>
      <div className={`absolute right-0 mt-2 bg-white border rounded shadow-md w-40 z-50 ${open ? '' : 'hidden'}`}>
        <Link href="/perfil" className="block px-4 py-2 hover:bg-gray-100">Editar Perfil</Link>
        <Link href="/suporte" className="block px-4 py-2 hover:bg-gray-100">Suporte</Link>
        <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">Sair</button>
      </div>
    </div>
  )
}
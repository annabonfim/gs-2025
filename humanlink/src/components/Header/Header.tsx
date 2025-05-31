'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const isLoggedIn = pathname.startsWith('/dashboard')
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-[#0C3B5D] text-2xl font-bold">HumanLink</Link>
      <nav className="space-x-4 flex items-center">
        {['/', '/login', '/cadastro'].includes(pathname) && (
          <>
            <Link href="/" className="text-[#0C3B5D] hover:underline">Início</Link>
            <Link href="/recursos" className="text-[#0C3B5D] hover:underline">Recursos</Link>
            <Link href="/sobre" className="text-[#0C3B5D] hover:underline">Sobre</Link>
          </>
        )}

        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="text-[#0C3B5D] hover:underline">Painel</Link>
            <Link href="/mapa" className="text-[#0C3B5D] hover:underline">Mapa</Link>
            <Link href="/doacoes" className="text-[#0C3B5D] hover:underline">Doações</Link>
            <Link href="/necessidades" className="text-[#0C3B5D] hover:underline">Necessidades</Link>

            <div className="relative">
              <button
                className="flex items-center gap-2 text-[#0C3B5D] font-medium focus:outline-none"
                onClick={() => setOpen(!open)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
                }}
              >
                <span className="rounded-full bg-[#0C3B5D] text-white px-3 py-1 text-sm">👤</span>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40 z-50">
                  <Link href="/perfil" className="block px-4 py-2 hover:bg-gray-100">Editar Perfil</Link>
                  <Link href="/suporte" className="block px-4 py-2 hover:bg-gray-100">Suporte</Link>
                  <button className="block px-4 py-2 text-left w-full hover:bg-gray-100">Sair</button>
                </div>
              )}
            </div>
          </>
        ) : pathname === '/login' ? (
          <Link href="/cadastro" className="bg-[#D64541] text-white px-4 py-1 rounded hover:bg-red-700">Cadastrar</Link>
        ) : pathname === '/cadastro' ? (
          <Link href="/login" className="bg-[#0C3B5D] text-white px-4 py-1 rounded hover:bg-blue-900">Login</Link>
        ) : (
          <>
            <Link href="/login" className="bg-[#0C3B5D] text-white px-4 py-1 rounded hover:bg-blue-900">Entrar</Link>
            <Link href="/cadastro" className="ml-2 bg-[#D64541] text-white px-4 py-1 rounded hover:bg-red-700">Cadastrar</Link>
          </>
        )}
      </nav>
    </header>
  )
}

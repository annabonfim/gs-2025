'use client'

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Button from '@/components/Button/Button'

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    senha: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json()

      if (res.ok) {
        await fetch('/api/set-cookie', {
          method: 'POST',
          body: JSON.stringify({ userId: data.id }),
        })

        window.location.href = '/dashboard'
      } else {
        alert('Credenciais inválidas. Tente novamente.')
      }
    } catch (err) {
      alert('Erro ao tentar logar. Tente novamente mais tarde.')
      console.error(err)
    }
  }

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-[#FDF7F0]">
        <div className="flex flex-col items-center justify-center flex-grow py-16">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8 max-w-md w-full space-y-6">
            <div className="flex justify-center">
              <img src="/logo-sem-fundo.png" alt="HumanLink logo" className="h-32 mb-2" />
            </div>
            <h1 className="text-3xl font-bold text-center text-[#0C3B5D]">Login</h1>

            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                required
              />
            </div>

            <div className="text-left">
              <a href="#" className="text-sm text-blue-600 hover:underline">Esqueceu seu e-mail ou senha?</a>
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="bg-[#0C3B5D] text-white px-6 py-2 rounded-md hover:bg-blue-900">
                Entrar
              </Button>
            </div>
          </form>
        </div>
        <Footer />
      </main>
    </>
  )
}
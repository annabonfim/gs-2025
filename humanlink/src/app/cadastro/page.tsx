'use client'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import Button from '@/components/Button/Button'

import { useState } from 'react'

export default function CadastroPage() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: '',
    telefone: '',
    endereco: '',
    bairro: '',
    cidade: '',
    cep: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você vai futuramente chamar a API Java para salvar no banco
    console.log('Dados cadastrados:', form)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-[#FDF7F0] px-4 py-12">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8 max-w-4xl w-full space-y-6">
        <div className="flex justify-center">
          <img src="/logo-sem-fundo.png" alt="HumanLink logo" className="h-40 mb-2" />
        </div>
        <h1 className="text-3xl font-bold text-center text-[#0C3B5D]">Cadastro</h1>

        <div className="flex justify-center">
          <div className="md:w-1/2 w-full">
            <Select
              label="Tipo de Usuário"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
              options={[
                { value: 'vitima', label: 'Vítima' },
                { value: 'voluntario', label: 'Voluntário' },
                { value: 'doador', label: 'Doador' },
                { value: 'ong', label: 'ONG' }
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome completo"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <Input
            label="E-mail"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Senha"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <Input
            label="Telefone"
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />

          <Input
            label="CEP"
            type="text"
            name="cep"
            value={form.cep}
            onChange={handleChange}
            required
          />

          <Input
            label="Endereço"
            type="text"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            required
          />

          <Input
            label="Bairro"
            type="text"
            name="bairro"
            value={form.bairro}
            onChange={handleChange}
            required
          />

          <Input
            label="Cidade"
            type="text"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            required
          />

        </div>

        <div className="flex justify-center">
          <Button type="submit" className="bg-[#0C3B5D] text-white px-6 py-2 rounded-md hover:bg-blue-900">
            Cadastrar
          </Button>
        </div>
      </form>
      </main>
      <Footer />
    </>
  )
}
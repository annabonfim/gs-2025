'use client'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { useState, useEffect } from 'react'
import api from '@/services/api'
import ProtectedPage from '@/components/ProtectedRoute/ProtectedRoute'

export default function CadastroVoluntarioPage() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoAjuda: '',
    disponibilidade: '',
    observacoes: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const cep = form.cep.replace(/\D/g, '')
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setForm(prev => ({
              ...prev,
              endereco: data.logradouro || '',
              bairro: data.bairro || '',
              cidade: data.localidade || '',
              estado: data.uf || ''
            }))
          }
        })
        .catch(err => console.error('Erro ao buscar CEP:', err))
    }
  }, [form.cep])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const payload = {
        id: 0,
        nome: form.nome,
        tipoDeAjuda: form.tipoAjuda,
        disponibilidade: form.disponibilidade,
        dataRegistro: new Date().toISOString(),
        idUsuario: 0,
        telefone: form.telefone,
        email: form.email
      }

      console.log('Enviando voluntário:', payload)

      const res = await api.post('/voluntarios', payload)
      if (res.status === 200 || res.status === 201) {
        alert('Cadastro de voluntário enviado com sucesso!')
      } else {
        alert('Erro ao cadastrar voluntário.')
      }
    } catch (err) {
      console.error('Erro ao cadastrar voluntário:', err)
      alert('Erro ao conectar com o servidor.')
    }
  }

  return (
    <ProtectedPage>
      <Header />
      <main className="bg-[#FDF7F0] min-h-screen px-6 py-10 flex justify-center">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8 max-w-xl w-full space-y-4">
          <h1 className="text-2xl font-bold text-[#0C3B5D] text-center mb-4">Cadastro de Voluntário</h1>

          <div>
            <label className="block font-medium mb-1">Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">E-mail</label>
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
            <label className="block font-medium mb-1">Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tipo de Ajuda</label>
            <select
              name="tipoAjuda"
              value={form.tipoAjuda}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            >
              <option value="">Selecione...</option>
              <option value="transporte">Transporte</option>
              <option value="abrigo">Oferecer abrigo</option>
              <option value="alimentacao">Distribuir alimentos</option>
              <option value="apoio emocional">Apoio emocional</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Disponibilidade</label>
            <input
              type="text"
              name="disponibilidade"
              value={form.disponibilidade}
              onChange={handleChange}
              placeholder="Ex: Durante as manhãs ou finais de semana"
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">CEP</label>
              <input
                type="text"
                name="cep"
                value={form.cep}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Endereço</label>
              <input
                type="text"
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Número</label>
              <input
                type="text"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Bairro</label>
              <input
                type="text"
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Estado</label>
              <input
                type="text"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-medium mb-1">Observações (opcional)</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>

          <div className="text-center pt-4">
            <button type="submit" className="bg-[#0C3B5D] text-white px-6 py-2 rounded-md hover:bg-blue-900">
              Enviar Cadastro
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </ProtectedPage>
  )
}

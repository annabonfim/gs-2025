'use client'

import { useState, useEffect } from 'react'
import Input from '@/components/Input/Input'
import Select from '@/components/Select/Select'
import Button from '@/components/Button/Button'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function NovaNecessidadePage() {
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    urgencia: '',
    categoria: '',
    categoriaExtra: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Necessidade registrada com sucesso!')
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FDF7F0] px-6 py-10 flex justify-center">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-8 max-w-2xl w-full space-y-4">
          <h1 className="text-2xl font-bold text-[#0C3B5D] text-center mb-4">Registrar Nova Necessidade</h1>

          <Input label="Título" name="titulo" value={form.titulo} onChange={handleChange} required />
          <div>
            <label className="block font-medium mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              required
            />
          </div>

          <Select
            label="Urgência"
            name="urgencia"
            value={form.urgencia}
            onChange={handleChange}
            options={[
              { value: 'baixa', label: 'Baixa' },
              { value: 'media', label: 'Média' },
              { value: 'alta', label: 'Alta' },
              { value: 'critica', label: 'Crítica' },
            ]}
            required
          />

          <Select
            label="Categoria"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            options={[
              { value: 'alimento', label: 'Alimento' },
              { value: 'abrigo', label: 'Abrigo' },
              { value: 'roupas', label: 'Roupas' },
              { value: 'higiene', label: 'Higiene' },
              { value: 'medicamento', label: 'Medicamento' },
              { value: 'mobilidade', label: 'Mobilidade' },
              { value: 'mantimentos', label: 'Mantimentos' },
              { value: 'resgate', label: 'Resgate' },
              { value: 'outros', label: 'Outros' },
            ]}
            required
          />
          {form.categoria === 'outros' && (
            <Input
              label="Especifique a categoria"
              name="categoriaExtra"
              value={form.categoriaExtra}
              onChange={handleChange}
              required
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="CEP" name="cep" value={form.cep} onChange={handleChange} required />
            <Input label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Número" name="numero" value={form.numero} onChange={handleChange} required />
            <Input label="Bairro" name="bairro" value={form.bairro} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Cidade" name="cidade" value={form.cidade} onChange={handleChange} required />
            <Select
              label="Estado"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              options={[
                { value: 'AC', label: 'AC' },
                { value: 'AL', label: 'AL' },
                { value: 'AP', label: 'AP' },
                { value: 'AM', label: 'AM' },
                { value: 'BA', label: 'BA' },
                { value: 'CE', label: 'CE' },
                { value: 'DF', label: 'DF' },
                { value: 'ES', label: 'ES' },
                { value: 'GO', label: 'GO' },
                { value: 'MA', label: 'MA' },
                { value: 'MT', label: 'MT' },
                { value: 'MS', label: 'MS' },
                { value: 'MG', label: 'MG' },
                { value: 'PA', label: 'PA' },
                { value: 'PB', label: 'PB' },
                { value: 'PR', label: 'PR' },
                { value: 'PE', label: 'PE' },
                { value: 'PI', label: 'PI' },
                { value: 'RJ', label: 'RJ' },
                { value: 'RN', label: 'RN' },
                { value: 'RS', label: 'RS' },
                { value: 'RO', label: 'RO' },
                { value: 'RR', label: 'RR' },
                { value: 'SC', label: 'SC' },
                { value: 'SP', label: 'SP' },
                { value: 'SE', label: 'SE' },
                { value: 'TO', label: 'TO' },
              ]}
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit" className="bg-[#0C3B5D] text-white px-6 py-2 rounded-md hover:bg-blue-900">
              Registrar
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
'use client'

import { useState, useRef } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function PerfilPage() {
  const initialForm = {
    nome: 'Anna Bonfim',
    email: 'anna@example.com',
    novaSenha: '',
    senhaAtual: '',
    telefone: '(11) 99999-8888',
    endereco: 'Rua das Flores, 123',
  }

  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState(initialForm)

  const [userTipos, setUserTipos] = useState<string[]>(['Voluntária'])
  const userLocalizacao = 'São Paulo - SP'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailChanged = form.email !== initialForm.email
    const senhaChanged = form.novaSenha !== ''
    if ((emailChanged || senhaChanged) && form.senhaAtual === '') {
      alert('Por favor, insira sua senha atual para confirmar as alterações.')
      return
    }
    console.log('Salvando alterações:', { ...form, userTipos })
    setEditando(false)
    setForm(prev => ({ ...prev, senhaAtual: '', novaSenha: '' }))
  }

  const cancelarEdicao = () => {
    setEditando(false)
    setForm(initialForm)
  }

  // Modal de confirmação de desativação de conta
  const [mostrarModal, setMostrarModal] = useState(false)
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("")

  return (
    <>
      <Header />
      <main className="bg-[#FDF7F0] min-h-screen px-6 py-10 flex flex-col items-center">
        <div className="bg-white shadow-md rounded-md p-8 max-w-2xl w-full text-center">
          <img src="/ft-perfil-F.png" alt="Foto do perfil" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0C3B5D] mb-2">
            {editando ? 'Editar Perfil' : `Olá, ${form.nome} !`}
          </h1>
          {!editando && (
            <div className="flex flex-wrap justify-center gap-2 mt-1 mb-3">
              {userTipos.map(tipo => {
                const filename = `badge-${tipo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}.png`
                return (
                  <img
                    key={tipo}
                    src={`/badges/${filename}`}
                    alt={`Badge ${tipo}`}
                    className="h-22"
                  />
                )
              })}
            </div>
          )}
          <p className="text-gray-600 mb-4">
            {editando
              ? 'Atualize suas informações.'
              : 'Gerencie suas informações de perfil e preferências de conta.'}
          </p>
          {!editando && (
            <div className="mt-10 text-center">
              <button onClick={() => setEditando(true)}
                className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900">Editar Perfil</button>
            </div>
          )}
          {!editando && (
            <div className="mt-8 text-left space-y-3">
              <p><span className="font-semibold">E-mail:</span> {form.email}</p>
              <p><span className="font-semibold">Localização:</span> {userLocalizacao}</p>
              {form.telefone && (
                <p><span className="font-semibold">Telefone:</span> {form.telefone}</p>
              )}
              {form.endereco && (
                <p><span className="font-semibold">Endereço:</span> {form.endereco}</p>
              )}
            </div>
          )}

          {editando ? (
            <>
              <form onSubmit={handleSubmit} className="text-left space-y-4">
                <div>
                  <label className="block text-sm font-medium">Nome</label>
                  <input type="text" name="nome" value={form.nome} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">E-mail</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Telefone</label>
                  <input type="text" name="telefone" value={form.telefone} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Endereço</label>
                  <input type="text" name="endereco" value={form.endereco} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Usuário</label>
                  <div className="flex gap-4 flex-wrap">
                    {['Voluntária', 'Doador', 'Vítima'].map(tipo => (
                      <label key={tipo} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={userTipos.includes(tipo)}
                          onChange={() =>
                            setUserTipos(prev =>
                              prev.includes(tipo)
                                ? prev.filter(t => t !== tipo)
                                : [...prev, tipo]
                            )
                          }
                        />
                        {tipo}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Nova Senha</label>
                  <input type="password" name="novaSenha" value={form.novaSenha} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Senha Atual <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    name="senhaAtual"
                    value={form.senhaAtual}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required={form.email !== initialForm.email || form.novaSenha !== ''}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button type="button" onClick={cancelarEdicao}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
                  <button type="submit"
                    className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900">Salvar Alterações</button>
                </div>
              </form>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setMostrarModal(true)}
                  className="text-sm text-red-600 underline hover:text-red-800"
                >
                  Desativar Conta
                </button>
                {mostrarModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-[#FDF7F0] bg-opacity-90 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-left">
                      <h2 className="text-lg font-bold text-[#0C3B5D] mb-2">Confirme sua senha</h2>
                      <p className="text-sm text-gray-700 mb-4">Digite sua senha para confirmar a desativação da conta.</p>
                      <input
                        type="password"
                        placeholder="Senha"
                        value={senhaConfirmacao}
                        onChange={(e) => setSenhaConfirmacao(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setMostrarModal(false)}
                          className="px-4 py-2 text-gray-600 hover:underline"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            if (senhaConfirmacao.trim() !== "") {
                              window.location.href = "/conta-desativada"
                            }
                          }}
                          className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900"
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}
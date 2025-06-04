

import { NextRequest, NextResponse } from 'next/server'

const API_URL = '' // Insira aqui a URL da sua API Java

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${API_URL}/oportunidades/${params.id}`)
    if (!response.ok) {
      return NextResponse.json({ error: 'Oportunidade não encontrada' }, { status: response.status })
    }

    const oportunidade = await response.json()
    return NextResponse.json(oportunidade)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao conectar com o backend' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const response = await fetch(`${API_URL}/oportunidades/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar oportunidade')
    }

    const updated = await response.json()
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar oportunidade' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${API_URL}/oportunidades/${params.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Erro ao remover oportunidade')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover oportunidade' }, { status: 500 })
  }
}
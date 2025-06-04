

import { NextResponse } from 'next/server'

const API_URL = '' // Insira aqui a URL da API Java

export async function POST(req: Request) {
  const credentials = await req.json()

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error('Falha ao autenticar usuário')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao comunicar com o backend' }, { status: 500 })
  }
}
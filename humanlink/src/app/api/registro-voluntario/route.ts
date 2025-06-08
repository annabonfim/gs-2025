import { NextResponse } from 'next/server'

const API_URL = 'https://humanlink-api-production.up.railway.app/humanlink'

export async function POST(req: Request) {
  const novoRegistro = await req.json()

  try {
    const response = await fetch(`${API_URL}/registro-voluntario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoRegistro),
    })

    if (!response.ok) {
      throw new Error('Erro ao registrar voluntário')
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro na comunicação com o backend' }, { status: 500 })
  }
}
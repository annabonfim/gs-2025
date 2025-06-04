import { NextResponse } from 'next/server'

const API_URL = '' // Insira aqui a URL da API Java

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/oportunidades`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar oportunidades')
    }

    const oportunidades = await response.json()
    return NextResponse.json(oportunidades)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao conectar com o backend' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const novaOportunidade = await req.json()

  try {
    const response = await fetch(`${API_URL}/oportunidades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaOportunidade),
    })

    if (!response.ok) {
      throw new Error('Erro ao cadastrar oportunidade')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao conectar com o backend' }, { status: 500 })
  }
}
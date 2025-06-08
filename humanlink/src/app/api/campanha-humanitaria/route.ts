


import { NextResponse } from 'next/server'

const API_BASE = 'https://humanlink-api-production.up.railway.app/humanlink/campanhas-humanitarias'
const HEADERS = {
  'Content-Type': 'application/json',
  'X-API-Key': 'chave123'
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  const url = id ? `${API_BASE}/${id}` : API_BASE

  const res = await fetch(url, { headers: HEADERS })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const body = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório para atualizar.' }, { status: 400 })
  }

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID é obrigatório para deletar.' }, { status: 400 })
  }

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: HEADERS,
  })

  const data = await res.json()
  return NextResponse.json(data)
}


import { NextResponse } from 'next/server'

let usuarios = [
  { id: 1, nome: 'Joana Silva', email: 'joana@example.com' },
  { id: 2, nome: 'Carlos Lima', email: 'carlos@example.com' },
]

export async function GET() {
  return NextResponse.json(usuarios)
}

export async function POST(req: Request) {
  const data = await req.json()
  const novoUsuario = {
    id: usuarios.length + 1,
    ...data,
  }
  usuarios.push(novoUsuario)
  return NextResponse.json(novoUsuario, { status: 201 })
}
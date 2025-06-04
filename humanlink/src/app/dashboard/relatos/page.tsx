'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

interface Relato {
  id: number;
  nome: string;
  titulo: string;
  mensagem: string;
  data: string;
  midiaPreview?: string[];
}

export default function RelatosPage() {
  const [relatos, setRelatos] = useState<Relato[]>([
    {
      id: 1,
      nome: 'Joana',
      titulo: 'Abrigo disponível na zona norte',
      mensagem:
        'Consegui abrigo no centro comunitário da zona norte. Estava com minha família sem um local seguro desde ontem e fomos muito bem recebidos por voluntários. Há ainda espaço para mais famílias, especialmente com crianças pequenas. Recomendo que venham até aqui quem estiver em necessidade.',
      data: '02/06/2025',
      midiaPreview: ['/abrigo.png'],
    },
    {
      id: 2,
      nome: 'Carlos',
      titulo: 'Crise na região da ponte: falta de água e desidratação',
      mensagem:
        'A situação na região da ponte está crítica. Além da falta de água potável, muitas pessoas estão começando a apresentar sintomas de desidratação. Precisamos urgentemente de doações, especialmente garrafas de água, pastilhas purificadoras e alimentos não perecíveis.',
      data: '01/06/2025',
    },
    {
      id: 3,
      nome: 'Fernanda',
      titulo: 'Mutirão de distribuição de marmitas no bairro São Pedro',
      mensagem:
        'Estamos organizando um mutirão de distribuição de marmitas na escola municipal do bairro São Pedro. Hoje conseguimos entregar mais de 300 refeições. Quem puder ajudar com ingredientes ou mesmo com transporte, será muito bem-vindo!',
      data: '01/06/2025',
    },
    {
      id: 4,
      nome: 'Rafael',
      titulo: 'Limpeza das ruas da Vila Esperança após alagamentos',
      mensagem:
        'Voluntários estão atuando na limpeza das ruas da Vila Esperança após os alagamentos. Há muita lama e entulho acumulado, e precisamos de equipamentos de proteção e ferramentas como pás, vassouras e luvas. Agradecemos todo o apoio recebido até agora!',
      data: '31/05/2025',
    },
    {
      id: 5,
      nome: 'Luiza',
      titulo: 'Coleta de doações de roupas na igreja Santa Clara',
      mensagem:
        'Estamos coletando doações de roupas para adultos e crianças na igreja Santa Clara. Muitos moradores perderam tudo com a enchente. As doações podem ser entregues até às 17h. Itens como roupas íntimas novas, cobertores e calçados também são bem-vindos.',
      data: '30/05/2025',
    },
  ]);

  const [relatosExpandido, setRelatosExpandido] = useState<{ [id: number]: boolean }>({});

  return (
    <>
      <Header />
      <main className="bg-[#FDF7F0] px-6 py-10 flex flex-col items-center">
        <div className="w-full max-w-2xl flex justify-end mb-4">
          <a
            href="/dashboard/relatos/novo"
            className="bg-[#0C3B5D] text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            Postar Relato
          </a>
        </div>
        <div className="bg-white shadow-md rounded-md p-8 max-w-2xl w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Relatos da Comunidade</h1>

          <section className="space-y-4 text-left">
            {relatos.map((relato) => {
              const expandido = relatosExpandido[relato.id] || false;
              const textoCurto = relato.mensagem.length > 200 && !expandido;

              return (
                <div key={relato.id} className="bg-white border border-gray-200 rounded shadow-sm p-4">
                  <div className="text-sm text-gray-500 mb-2 font-medium">
                    {relato.nome} • {relato.data}
                  </div>
                  <h2 className="text-lg font-semibold text-[#0C3B5D] mb-1">{relato.titulo}</h2>
                  <p className="text-gray-800">
                    {textoCurto ? `${relato.mensagem.slice(0, 200)}...` : relato.mensagem}
                    {relato.mensagem.length > 200 && (
                      <button
                        onClick={() =>
                          setRelatosExpandido(prev => ({
                            ...prev,
                            [relato.id]: !prev[relato.id],
                          }))
                        }
                        className="text-blue-600 ml-1 text-sm underline"
                      >
                        {expandido ? 'Mostrar menos' : 'Mostrar mais'}
                      </button>
                    )}
                  </p>

                  {Array.isArray(relato.midiaPreview) && relato.midiaPreview.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {relato.midiaPreview.map((src, idx) => (
                        <div key={idx}>
                          {src.includes('video') ? (
                            <video controls src={src} className="max-w-full h-auto rounded" />
                          ) : (
                            <img src={src} alt={`midia ${idx}`} className="max-w-full h-auto rounded" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
/**
 * Dados fixos do negócio. O que a dona da loja edita no dia a dia
 * (aviso do topo, frase do hero, WhatsApp) vive na tabela `config` e é
 * editável em /painel/config, não aqui.
 */

function resolverUrl(): string {
  const candidatos = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const bruto of candidatos) {
    const valor = bruto?.trim();
    if (!valor) continue;
    const comProtocolo = /^https?:\/\//i.test(valor) ? valor : `https://${valor}`;
    try {
      return new URL(comProtocolo).origin;
    } catch {
      // valor malformado: tenta o próximo em vez de derrubar o build
    }
  }

  return "http://localhost:3100";
}

export const site = {
  nome: "Mimos da Mah",
  marca: "Mimos da Mah",
  posicionamento: "Maquiagem por um precinho justo, a partir de R$10",
  cidade: "Jundiaí | SP",
  /* o número do link da bio. Na prévia ele não é usado: ver PREVIA. */
  whatsapp: "5511978559979",
  instagram: "mimosdamah10",
  url: resolverUrl(),
  /* a loja não tem endereço público: vende pelo WhatsApp, entrega por
     Uber moto em Jundiaí e região e envia para todo o Brasil */
  endereco: "",
  maps: "",
  /* o que a bio promete, palavra por palavra */
  aPartirDe: 10,
  entregaLocal: "Uber moto para Jundiaí e região",
  entregaBrasil: "Envio para todo o Brasil",
  /* a feira, enquanto estiver por vir */
  feira: {
    nome: "FENS, Feira do Empreendedor, Negócios e Serviços",
    quando: "18, 19 e 20 de setembro",
    horarios: ["Quinta 18/09, das 18h às 22h", "Sexta 19/09, das 9h às 22h", "Sábado 20/09, das 9h às 22h"],
    onde: "Santuário Diocesano Santa Rita de Cássia",
    endereco: "Rua Uva Niágara, 352, Parque Cecap, Jundiaí, SP",
    ate: "2026-09-20",
  },
} as const;

/**
 * MODO PRÉVIA. Enquanto a vitrine é uma amostra, TODO botão de WhatsApp
 * aponta para o estúdio com a mesma mensagem. Quando a loja contratar:
 * PREVIA = null e o número acima passa a valer.
 */
export const PREVIA: { whatsapp: string; mensagem: string } | null = {
  whatsapp: "5544999997219",
  mensagem: "Oi! Vi a prévia da vitrine da Mimos da Mah e quero colocar no ar.",
};

/** Valores iniciais da tabela `config`. Sobrescritos pelo banco quando existirem. */
export const configPadrao: Record<string, string> = {
  whatsapp: site.whatsapp,
  instagram: site.instagram,
  cidade: site.cidade,
  /* frases separadas por "|": o cabeçalho reveza uma de cada vez */
  aviso_topo: "Maquiagem a partir de R$10 | Envio para todo o Brasil | Uber moto para Jundiaí e região | Pedido pelo WhatsApp, sem cadastro",
  frase_hero: "Sua maquiagem por um precinho justo.",
  endereco: "",
  horario: "",
};

import type { Produto } from "./tipos";
import { site } from "@/data/site.config";

/**
 * O menu das portas, montado do catálogo: cada porta do cabeçalho abre
 * uma aba ao passar o mouse, e o que está na aba vem dos produtos (os
 * atalhos só aparecem se acham algo) e do WhatsApp. Assim a aba nunca
 * promete o que a vitrine não tem.
 */
export type NomeIconeMenu = "novidade" | "labios" | "olhos" | "rosto" | "pinceis" | "perfume" | "coracao" | "moto" | "feira" | "revenda" | "etiqueta" | "pino" | "conversa" | "caminhao";

export type ItemMenu = {
  nome: string;
  href: string;
  icone?: NomeIconeMenu;
  nota?: string;
  externa?: boolean;
};

export type Aba = {
  chave: string;
  nome: string;
  href: string;
  icone: NomeIconeMenu;
  externa?: boolean;
  titulo?: string;
  itens: ItemMenu[];
  colunas: 1 | 2 | 3 | 4;
  total?: number;
  nota?: string;
};

export const PORTAS: { slug: string; nome: string; tudo: string; icone: NomeIconeMenu; linha: string; atalhos: string[] }[] = [
  { slug: "labios", nome: "Lábios", tudo: "Tudo para os lábios", icone: "labios", linha: "batom, gloss, lápis, hidratante", atalhos: ["Batom", "Gloss", "Lápis", "Hidratante"] },
  { slug: "olhos", nome: "Olhos", tudo: "Tudo para os olhos", icone: "olhos", linha: "máscara, delineador, paleta, cílios", atalhos: ["Máscara", "Delineador", "Paleta", "Lápis", "Cílios"] },
  { slug: "rosto", nome: "Rosto", tudo: "Tudo para o rosto", icone: "rosto", linha: "pó, blush, iluminador", atalhos: ["Pó", "Blush", "Iluminador"] },
  { slug: "pinceis-e-acessorios", nome: "Pincéis", tudo: "Todos os acessórios", icone: "pinceis", linha: "pincéis, esponja, nécessaire, espelho", atalhos: ["Pincéis", "Esponja", "Nécessaire", "Espelho"] },
  { slug: "perfumaria", nome: "Perfumaria", tudo: "Toda a perfumaria", icone: "perfume", linha: "body splash, esmalte", atalhos: ["Body splash", "Esmalte"] },
];

export function montarMenu(produtos: Produto[], linkWhats: string): Aba[] {
  const ativos = produtos.filter((p) => p.ativo);
  const conta = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).length;
  const busca = (cat: string, termo: string) => `/catalogo/${cat}?busca=${encodeURIComponent(termo)}`;
  const existe = (cat: string, termo: string) => ativos.some((p) => p.categoria_slug === cat && p.nome.toLowerCase().includes(termo.toLowerCase()));

  return [
    ...PORTAS.map((porta): Aba => {
      const total = conta(porta.slug);
      return {
        chave: porta.slug,
        nome: porta.nome,
        href: `/catalogo/${porta.slug}`,
        icone: porta.icone,
        total,
        titulo: `${total} ${total === 1 ? "mimo" : "mimos"}: ${porta.linha}`,
        colunas: 2,
        itens: [
          ...porta.atalhos.filter((t) => existe(porta.slug, t)).map((t) => ({ nome: t, href: busca(porta.slug, t) })),
          { nome: porta.tudo, href: `/catalogo/${porta.slug}`, icone: porta.icone },
        ],
      };
    }),
    {
      chave: "pedido",
      nome: "Como pedir",
      href: "/#pedido",
      icone: "coracao",
      nota: "a partir de R$10",
      colunas: 1,
      itens: [
        { nome: "Falar no WhatsApp", href: linkWhats, icone: "conversa", nota: "pedido, cor e entrega", externa: true },
        { nome: site.entregaLocal, href: "/#pedido", icone: "moto", nota: "combinado no pedido" },
        { nome: site.entregaBrasil, href: "/#pedido", icone: "caminhao", nota: "combinado no pedido" },
        { nome: "Quero revender", href: "/#revenda", icone: "revenda", nota: "a Mah tem revendedoras" },
      ],
    },
  ];
}

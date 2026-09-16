/**
 * As portas que juntam categorias. A Mimos da Mah tem cinco categorias
 * diretas (lábios, olhos, rosto, pincéis e acessórios, perfumaria),
 * nenhuma agrupada: o mapa fica vazio até precisar.
 */
export const GRUPOS: Record<string, { nome: string; categorias: string[] }> = {};

export function categoriasDoGrupo(slug: string): string[] | null {
  return GRUPOS[slug]?.categorias ?? null;
}

import { FaixaWhats } from "@/components/FaixaWhats";
import { Feira } from "@/components/Feira";
import { Garantias } from "@/components/Garantias";
import { Hero } from "@/components/Hero";
import { Portas } from "@/components/Portas";
import { Prateleira } from "@/components/Prateleira";
import { Revenda } from "@/components/Revenda";
import { Vitrines } from "@/components/Vitrines";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { PORTAS as PORTAS_MENU } from "@/lib/menu";
import { linkGeral } from "@/lib/whatsapp";
import { configPadrao, site } from "@/data/site.config";

/* a ordem e a cara das portas na home */
const PORTAS = PORTAS_MENU.map((p) => ({ slug: p.slug, nome: p.nome === "Pincéis" ? "Pincéis e acessórios" : p.nome, icone: p.icone, linha: `${p.linha[0].toUpperCase()}${p.linha.slice(1)}.` }));

/**
 * A home: o hero rosa com a etiqueta "a partir de R$10" e a estrela da
 * vez, as garantias penduradas nele, as cinco portas, o que a Mah mais
 * indica, duas vitrines grandes (os dois produtos com foto de verdade),
 * a feira enquanto a data não passa, as prateleiras por porta, a faixa
 * do pedido e a porta da revenda. Tudo montado do catálogo.
 */
export default async function Home() {
  const [{ categorias, produtos, hero }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);

  const whats = linkGeral(config.whatsapp);
  const ativos = produtos.filter((p) => p.ativo);
  const ativas = categorias.filter((c) => c.ativo);
  const porSlug = new Map(ativas.map((c) => [c.slug, c]));
  const da = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).sort((a, b) => a.ordem - b.ordem);

  const destaques = hero
    .map((h) => ativos.find((p) => p.slug === h.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 8);
  const estrelaDe = (slug: string) => destaques.find((p) => p.categoria_slug === slug) ?? da(slug)[0] ?? null;
  const peca = (slug: string) => ativos.find((p) => p.slug === slug) ?? null;

  const inedito = (lista: typeof ativos) => [...lista.filter((p) => !destaques.includes(p)), ...lista.filter((p) => destaques.includes(p))];
  const prateleiras = PORTAS.map((p) => ({ ...p, produtos: inedito(da(p.slug)) })).filter((p) => p.produtos.length);

  return (
    <>
      <Hero frase={config.frase_hero || configPadrao.frase_hero} estrelas={destaques} linkWhats={whats} totais={{ produtos: ativos.length, categorias: ativas.length }} />

      <Garantias linkWhats={whats} />

      <Portas portas={PORTAS.map((p) => ({ nome: p.nome, href: `/catalogo/${p.slug}`, icone: p.icone, peca: estrelaDe(p.slug), total: da(p.slug).length, linha: p.linha }))} />

      <Prateleira id="destaques" titulo="Os queridinhos" subtitulo="O que a Mah mais indica" href="/catalogo" verTudo="Ver todos os mimos" produtos={destaques} categorias={porSlug} prioridade total={ativos.length} nomeDaPorta="mimos" />

      <Vitrines
        vitrines={[
          { titulo: "Lip Plumper Gloss Vivai", texto: "Volume instantâneo, menta, brilho intenso e D-Pantenol. Sozinho ou por cima do batom.", href: "/produto/lip-plumper-gloss-vivai", peca: peca("lip-plumper-gloss-vivai"), acao: "Quero esse" },
          { titulo: "Marshmallow Blush Body Splash", texto: "O cheirinho doce que conquista em cada borrifada. Leve, para todo dia.", href: "/produto/marshmallow-blush-body-splash", peca: peca("marshmallow-blush-body-splash"), acao: "Quero esse" },
        ].filter((v): v is typeof v & { peca: NonNullable<typeof v.peca> } => Boolean(v.peca))}
      />

      <Feira />

      {prateleiras.map((p) => (
        <Prateleira key={p.slug} id={`prateleira-${p.slug}`} titulo={p.nome} subtitulo={p.linha} href={`/catalogo/${p.slug}`} verTudo={`Ver ${p.produtos.length === 1 ? "o mimo" : `os ${p.produtos.length}`}`} produtos={p.produtos} categorias={porSlug} nomeDaPorta={p.nome.toLowerCase()} />
      ))}

      <FaixaWhats linkWhats={whats} />

      <Revenda whatsapp={config.whatsapp} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Mimos da Mah",
            telephone: "+55 11 97855-9979",
            url: site.url,
            areaServed: "BR",
            address: { "@type": "PostalAddress", addressLocality: "Jundiaí", addressRegion: "SP", addressCountry: "BR" },
          }),
        }}
      />
    </>
  );
}

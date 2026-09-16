import Image from "next/image";
import Link from "next/link";
import { Icone } from "./Icones";
import { site } from "@/data/site.config";
import type { Produto } from "@/lib/tipos";

/**
 * A abertura, no rosa da logo: à esquerda a manchete em serifa, a
 * etiqueta de preço grande ("a partir de R$10", que é a promessa da
 * bio), a linha de apoio e os dois botões. À direita, a estrela da vez
 * numa foto grande de cantos redondos, com a etiqueta pendurada no
 * canto. No celular a foto vem primeiro e o texto senta embaixo.
 */
export function Hero({ frase, estrelas, linkWhats, totais }: { frase: string; estrelas: Produto[]; linkWhats: string; totais: { produtos: number; categorias: number } }) {
  const principal = estrelas.find((p) => p.slug.startsWith("lip-plumper")) ?? estrelas[0];
  const capa = principal?.imagens[0];

  return (
    <section aria-labelledby="titulo-hero" className="agua relative overflow-hidden">
      {/* o confete: bolinhas claras espalhadas, como papel de doceria */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_center,#fff_1.5px,transparent_2px)] [background-size:1.75rem_1.75rem]" />

      <div className="miolo relative grid gap-8 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:py-16">
        <div className="order-2 lg:order-1">
          <p className="etiqueta text-white/90">Maquiagem em Jundiaí, com envio para todo o Brasil</p>
          <h1 id="titulo-hero" className="manchete mt-3 max-w-[16ch] text-[clamp(2.5rem,8vw,3.5rem)] text-branco lg:text-[clamp(3rem,5vw,4.75rem)]">
            {frase}
          </h1>

          <div className="mt-6 flex flex-wrap items-end gap-x-6 gap-y-4">
            <span className="tag tag--grande">
              <span className="tag-rotulo">Itens a partir de</span>
              <span className="tag-valor">R${site.aPartirDe}</span>
            </span>
            <p className="falada max-w-[30ch] text-[1.0625rem] text-white/90 lg:text-[1.125rem]">
              {totais.produtos} mimos em {totais.categorias} portas. Escolhe aqui, pede no WhatsApp, e chega por Uber moto em Jundiaí ou por envio para qualquer canto do Brasil.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/catalogo" className="btn btn--raia">
              Ver todos os mimos
            </Link>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--placa-fio">
              <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
              Pedir no WhatsApp
            </a>
          </div>
        </div>

        {principal && capa ? (
          <Link href={`/produto/${principal.slug}`} className="group order-1 block lg:order-2">
            <span className="foto block aspect-square rounded-[var(--raio)] shadow-[0_30px_60px_-30px_rgba(92,16,48,0.7)] sm:aspect-[4/3] lg:aspect-square">
              <Image src={capa.url} alt={capa.alt ?? principal.nome} fill priority sizes="(max-width: 1024px) 100vw, 46vw" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              <span className="placa-etiqueta absolute left-4 top-4 z-[1]">Queridinho</span>
            </span>
            <span className="mt-3 flex items-center justify-between gap-3 text-[0.9375rem] text-white/90">
              <span>
                Na foto: <span className="font-bold text-branco group-hover:underline group-hover:decoration-white group-hover:underline-offset-4">{principal.nome}</span>
              </span>
              <Icone nome="seta" className="h-5 w-5 shrink-0 text-white" peso={2} />
            </span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}

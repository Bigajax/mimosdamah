import Link from "next/link";
import { Icone, type NomeIcone } from "./Icones";
import { site } from "@/data/site.config";

/**
 * As garantias: quatro placas brancas penduradas na borda do hero rosa.
 * Só o que a bio da loja promete, palavra por palavra: a partir de
 * R$10, envio para todo o Brasil, Uber moto em Jundiaí e região, pedido
 * pelo WhatsApp.
 */
const ITENS: { icone: NomeIcone; titulo: string; texto: string; href: string; externa?: boolean }[] = [
  { icone: "etiqueta", titulo: `A partir de R$${site.aPartirDe}`, texto: "maquiagem por um precinho justo", href: "/catalogo" },
  { icone: "moto", titulo: "Uber moto", texto: "para Jundiaí e região, combinado no pedido", href: "/#pedido" },
  { icone: "caminhao", titulo: "Todo o Brasil", texto: "envio combinado no pedido", href: "/#pedido" },
  { icone: "conversa", titulo: "Pedido pelo WhatsApp", texto: "sem cadastro, sem carrinho", href: "", externa: true },
];

export function Garantias({ linkWhats }: { linkWhats: string }) {
  return (
    <section aria-label="Como a loja funciona" className="miolo relative z-10 lg:-mt-8">
      <ul className="garantias sangra faixa-scroll lg:mx-0">
        {ITENS.map((i) => {
          const href = i.href || linkWhats;
          const conteudo = (
            <>
              <span className="garantia-icone">
                <Icone nome={i.icone} className="h-7 w-7" peso={1.4} />
              </span>
              <span className="min-w-0">
                <span className="garantia-titulo">{i.titulo}</span>
                <span className="block text-[0.8125rem] leading-snug text-tinta-fraca">{i.texto}</span>
              </span>
            </>
          );
          return (
            <li key={i.titulo}>
              {i.externa ? (
                <a href={href} target="_blank" rel="noreferrer" className="garantia">
                  {conteudo}
                </a>
              ) : (
                <Link href={href} className="garantia">
                  {conteudo}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

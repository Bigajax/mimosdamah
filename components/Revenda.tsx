import { Icone } from "./Icones";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * A revenda: o Instagram da Mah tem um destaque "Revendedoras", então
 * a vitrine abre essa porta também. Sem condição inventada: quem
 * explica como funciona é a Mah, no WhatsApp.
 */
export function Revenda({ whatsapp }: { whatsapp: string }) {
  const link = linkWhatsApp("Oi! Vi no site que a Mimos da Mah tem revendedoras. Como funciona para revender?", whatsapp);
  return (
    <section id="revenda" aria-labelledby="titulo-revenda" className="miolo scroll-mt-24 pt-12 lg:pt-16">
      <div className="agua bloco relative overflow-hidden p-6 sm:p-10 lg:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_center,#fff_1.5px,transparent_2px)] [background-size:1.75rem_1.75rem]" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
          <div className="flex items-start gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-agua">
              <Icone nome="revenda" className="h-8 w-8" peso={1.4} />
            </span>
            <div>
              <p className="etiqueta text-white/90">Quer revender?</p>
              <h2 id="titulo-revenda" className="manchete mt-1 text-[clamp(1.75rem,3.4vw,2.5rem)] text-branco">
                A Mah tem revendedoras. Pode ser você.
              </h2>
              <p className="mt-2 max-w-[48ch] text-[0.9375rem] text-white/90">Maquiagem a partir de R$10 é fácil de vender para as amigas, na escola, no trabalho. Chama a Mah e ela explica como funciona.</p>
            </div>
          </div>
          <a href={link} target="_blank" rel="noreferrer" className="btn btn--raia shrink-0">
            Quero revender
          </a>
        </div>
      </div>
    </section>
  );
}

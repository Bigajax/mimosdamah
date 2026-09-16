import { Icone } from "./Icones";
import { site } from "@/data/site.config";

/**
 * A feira: a Mah vai estar na FENS, e isso está no feed dela com dia,
 * hora e endereço. Enquanto a data não passa, o bloco fica na home
 * como convite; depois some sozinho (a data está em site.config).
 */
export function Feira() {
  const { feira } = site;
  if (new Date() > new Date(`${feira.ate}T23:59:59-03:00`)) return null;
  const rota = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${feira.onde}, ${feira.endereco}`)}`;

  return (
    <section aria-labelledby="titulo-feira" className="miolo pt-12 lg:pt-16">
      <div className="bloco grid gap-6 border-2 border-agua bg-piscina p-6 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:p-10">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-agua text-white lg:h-20 lg:w-20">
          <Icone nome="feira" className="h-8 w-8 lg:h-10 lg:w-10" peso={1.4} />
        </span>
        <div>
          <p className="etiqueta">Vem aí, {feira.quando}</p>
          <h2 id="titulo-feira" className="secao mt-1">
            A Mah vai estar na FENS. Passa lá para ver os mimos de pertinho.
          </h2>
          <p className="mt-2 text-[0.9375rem] text-tinta-fraca">
            {feira.nome}, no {feira.onde}, {feira.endereco}.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem] font-semibold text-tinta">
            {feira.horarios.map((h) => (
              <li key={h} className="coracao">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <a href={rota} target="_blank" rel="noreferrer" className="btn btn--agua shrink-0">
          Como chegar
        </a>
      </div>
    </section>
  );
}

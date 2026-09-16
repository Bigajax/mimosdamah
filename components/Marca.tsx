import Image from "next/image";

/**
 * A marca da Mimos da Mah é a logo de verdade: o carimbo redondo com os
 * itens de maquiagem desenhados, os corações e o nome em serifa, tirado
 * do avatar do Instagram (1080px) e convertido em PNG com alfa
 * (`public/marca/logo.png`). Ela é rosa e funciona no branco e no
 * ameixa; por isso entra como imagem, não como máscara.
 */
export function Logo({ className = "", altura = 56 }: { className?: string; altura?: number }) {
  return <Image src="/marca/logo.png" alt="Mimos da Mah" width={Math.round(altura * (985 / 875))} height={altura} priority className={`shrink-0 ${className}`} />;
}

/* a assinatura do estúdio, em máscara, pintada pela cor do texto */
export function MarcaEstudio({ altura, className = "" }: { altura: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label="Rafael Razeira Estúdio"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        height: altura,
        width: Math.round(altura * (956 / 519)),
        WebkitMaskImage: "url(/marca/rafael-razeira.png)",
        maskImage: "url(/marca/rafael-razeira.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

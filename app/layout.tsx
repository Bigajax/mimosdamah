import type { Metadata } from "next";
import { DM_Serif_Display, Nunito } from "next/font/google";
import { site } from "@/data/site.config";
import "./globals.css";

/* A serifa de contraste faz a manchete e os títulos (é a família da
   logo, "mimos da mah"); a Nunito, redonda, faz o corpo, os botões e
   os preços. */
const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--fonte-corpo",
  display: "swap",
});

const TITULO = "Mimos da Mah: maquiagem a partir de R$10";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITULO,
    template: "%s · Mimos da Mah",
  },
  description: "Batom, gloss, máscara, blush, paleta e muito mais por um precinho justo. Você escolhe no site e pede pelo WhatsApp: envio para todo o Brasil e Uber moto para Jundiaí e região.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Mimos da Mah",
    url: site.url,
    title: TITULO,
    description: site.posicionamento,
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: "Mimos da Mah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: site.posicionamento,
    images: ["/og/site.jpg"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${corpo.variable} antialiased`}>{children}</body>
    </html>
  );
}

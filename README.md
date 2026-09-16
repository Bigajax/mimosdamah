# Mimos da Mah, vitrine digital

Site público + painel da loja para a **Mimos da Mah** (@mimosdamah10), loja de
maquiagem de Jundiaí, SP: "sua maquiagem por um precinho justo, itens a partir
de R$10, envio para todo o Brasil e Uber moto para Jundiaí e região". A
conversão é pelo WhatsApp: não existe carrinho, checkout nem login de cliente.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (opcional)
- **Catálogo:** 20 peças. 2 são da loja (Lip Plumper Gloss Vivai e Marshmallow
  Blush Body Splash, as únicas com foto no Instagram) e 18 são itens típicos de
  loja de maquiagem com fotos genéricas de bancos Creative Commons, colhidas por
  `scripts/colher-fotos.mjs` e listadas em `/creditos`. Sem preço em nenhuma:
  a única promessa de preço é a da bio, "a partir de R$10".
- **Base:** duplicada da vitrine da Fantoche (que veio da Picorelli). A lógica
  (dados, painel, menu com abas) é a mesma; identidade, textos e dados são desta loja.

## Modo prévia

Enquanto a vitrine é uma amostra, `PREVIA` em `data/site.config.ts` faz TODO
botão de WhatsApp apontar para o estúdio, com uma mensagem só. Quando a loja
contratar: `PREVIA = null`, e o número da loja passa a valer.

## Como rodar

```bash
npm install
npx next dev -p 3100
```

Sem as chaves do Supabase o projeto roda em modo local: lê `data/catalogo.json`
e serve as fotos de `public/produtos`. A senha do painel nesse modo é
`PAINEL_SENHA_LOCAL` (padrão: `mimos`).

## Trocar fotos e itens

`data/fonte.json` é a fonte: cada item tem nome, categoria, descrição e um
termo de busca em inglês (`busca`) ou o arquivo da loja (`local`). Depois:

```bash
node scripts/colher-fotos.mjs      # baixa o que falta em _fonte/mimos
node scripts/montar-catalogo.mjs   # escreve data/catalogo.json e public/produtos
```

Para trocar uma foto genérica: apague o `.jpg` em `_fonte/mimos` e rode com outro termo.

## A identidade, em uma linha

"Vitrine de doceria": o rosa da logo como superfície viva (cabeçalho, hero,
portas), o ameixa fechando topo e rodapé, a cereja como único acento (preço,
botão que fecha, confete entre seções), tudo redondo. A serifa da logo (DM
Serif Display) nos títulos, Nunito no corpo. A etiqueta de preço com o furinho
(`.tag`) é o dispositivo da casa: "a partir de R$10" pendurado no hero. A marca
é a logo real do avatar em PNG com alfa. Os nomes dos tokens vêm da base
(agua = rosa, marinho = ameixa, raia = cereja).

## Capturas

```bash
npm i --no-save puppeteer-core
node scripts/capturar.mjs http://localhost:3100/ saida.png 390 844 full
```

# Consulenza Acquisto – Pagina Statica

## Struttura
- index.html
- styles.css
- script.js

## Deploy
1. Copia la cartella `consulenza-acquisto` sul server web.
2. Assicurati che il percorso pubblico sia `/consulenza-acquisto/`.
3. Se usi un CDN, abilita la compressione Brotli o Gzip.

## Aggiornamento testi via CMS headless
Suggerimento: usa un CMS headless (Contentful, Strapi o Sanity) con un JSON pubblico.
Nel file `script.js` puoi sostituire i contenuti statici con una fetch verso un endpoint CMS e popolare:
- headline, sottotitolo
- descrizione e benefit
- servizi (titolo, descrizione, dettagli)
- testimonianze e numeri

## Note immagini
Le immagini usano URL webP remoti con `seed` nominati `image01` … `image06`.
Per usare asset locali, salva sei file `image01.webp` … `image06.webp` in `/consulenza-acquisto/assets`
e sostituisci gli URL nel markup con i percorsi locali, mantenendo i nomi.

## Analytics e privacy
Google Analytics viene caricato solo dopo il consenso cookie.
Sostituisci `G-XXXXXXXXXX` con il tuo ID reale.

#!/bin/bash
# Dočasný lokální náhled skryté stránky /sluzby/neuromarketing. Po Ctrl+C (nebo zavření okna) vrátí vše zpět.
cd "$(dirname "$0")/.." || exit 1
S=src/pages/sluzby
restore() {
  [ -f $S/neuromarketing.astro ] && mv $S/neuromarketing.astro $S/_neuromarketing.astro
  echo; echo "✔ Vráceno: stránka zase skrytá."
}
trap restore EXIT
[ -f $S/_neuromarketing.astro ] && mv $S/_neuromarketing.astro $S/neuromarketing.astro
( sleep 5; open "http://localhost:4321/sluzby/neuromarketing/#ukazka" ) &
npx astro dev --port 4321

#!/usr/bin/env bash
# Jednorázové stažení log klientů k self-hostingu (spusť lokálně: ./stahni-loga.sh)
set -e
mkdir -p public/logos
curl -sSL -o public/logos/skoda.png "https://cdn.skoda-storyboard.com/2023/07/Skoda_Wordmark_RGB_Black_a351de07-1920x630.png"
curl -sSL -o public/logos/fchk.png "https://fchk.esports.cz/files/editor/Logo%20FCHK2.png"
curl -sSL -o public/logos/uhk.svg "https://www.uhk.cz/img/svg/logo/uhk-uhk-cs_hor.svg"
ls -la public/logos/
echo "Hotovo — loga jsou v public/logos/, commitni je a smaž tento skript."

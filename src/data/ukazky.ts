// Ukázky výstupů z eye trackingu (natáčení s Filipem Oborníkem, Coffee Break, 14. 9. 2026).
// Jde o NÁZORNOU UKÁZKU, ne o výsledek studie — nikde neuvádět N ani závěry.
//
// Zveřejnění: dokud je UKAZKY_LIVE = false, blok se na /sluzby/eye-tracking nevykreslí.
// Spustit až po vydání videa u Filipa (spolu s MEDIA_PAGE_LIVE v src/data/media.ts).
export const UKAZKY_LIVE = false;

export interface Ukazka {
  id: string;
  /** soubor v public/images/ukazky/ */
  src: string;
  width: number;
  height: number;
  nadpis: string;
  popis: string;
  alt: string;
  /** výřez v dlaždici: vysoké heatmapy od shora, široké snímky na střed */
  pozice: 'top' | 'center';
  /** volitelně přesná pozice výřezu (CSS object-position) */
  vyrez?: string;
}

export const ukazky: Ukazka[] = [
  {
    id: 'zaznam',
    src: 'zaznam-pohledu-biometrie.webp',
    width: 1850,
    height: 965,
    nadpis: 'Záznam pohledu a biometrie',
    popis: 'Pohyb očí v čase spolu s výrazem tváře a kožní vodivostí (GSR). Vidíme, co člověk sleduje a jak na to reaguje.',
    alt: 'Záznam eye-trackingového měření: pohled respondenta na YouTube kanálu, kamera respondenta a průběh GSR a výrazu tváře',
    pozice: 'center',
    vyrez: '45% 0%',
  },
  {
    id: 'heatmapa',
    src: 'heatmapa-youtube-videa.webp',
    width: 730,
    height: 2760,
    nadpis: 'Heatmapa pozornosti',
    popis: 'Barvy ukazují, kde se pohled zdržel nejdéle a kam už se nedostal. Ukázka na přehledu videí YouTube kanálu.',
    alt: 'Heatmapa pozornosti z eye trackingu nad přehledem videí YouTube kanálu Filipa Oborníka',
    pozice: 'top',
  },
  {
    id: 'aoi',
    src: 'aoi-analyza-youtube.webp',
    width: 1920,
    height: 1002,
    nadpis: 'AOI analýza',
    popis: 'Stránku rozdělíme na oblasti a u každé změříme, kdy na ni padl první pohled, jak dlouho na ní zůstal a kolikrát se k ní vrátil.',
    alt: 'AOI analýza eye-trackingových dat: oblasti zájmu na YouTube kanálu a tabulka metrik (čas do první fixace, doba pohledu, návraty)',
    pozice: 'center',
  },
  {
    id: 'heatmapa-kanal',
    src: 'heatmapa-youtube-kanal.webp',
    width: 1367,
    height: 2263,
    nadpis: 'Heatmapa úvodní stránky kanálu',
    popis: 'Rozložení pozornosti na domovské stránce kanálu během prvních zhruba 25 sekund.',
    alt: 'Heatmapa pozornosti z eye trackingu nad domovskou stránkou YouTube kanálu Filipa Oborníka',
    pozice: 'top',
  },
];

export const ukazkaPoznamka = 'Názorná ukázka z natáčení s Filipem Oborníkem (Coffee Break). Nejde o výsledek studie.';

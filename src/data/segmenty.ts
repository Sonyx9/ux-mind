// Segmenty („Pro koho") — jediný zdroj pravdy pro rozcestník i detailní stránky.
// Obsah: segmenty-obsah.md (schváleno 20. 8. 2026). Zatím pouze čeština;
// převod do dalších jazyků je mechanická práce (viz zadani-segmenty-pro-programatora.md).
//
// Stránky se generují dynamicky z tohoto pole: src/pages/segmenty/[slug].astro
// (detail) + src/pages/segmenty/index.astro (rozcestník). Jeden nový segment =
// jedna položka tady, žádný nový .astro soubor.

export type Dukaz =
  | {
      typ: 'vlastni';
      /** Výrazný nadpis karty (claim studie) */
      nadpis: string;
      text: string;
      /** METODA: … (volitelné — u nezpracovaného assetu chybí) */
      metoda?: string;
      /** Odkaz na případovou studii (volitelný — „Projít studii →") */
      odkaz?: string;
    }
  | {
      typ: 'cizi';
      text: string;
      /** Vždy uvést zdroj (např. „Tobii"); loga cizích firem se nepoužívají */
      zdroj?: string;
      odkaz?: string;
    };

export type Segment = {
  slug: string;
  poradi: number;
  /** Plný název (nadpisy, meta) */
  nazev: string;
  /** Krátký název (dlaždice, navigace, patička) */
  nazevKratky: string;
  /** Jednořádková bolest oboru (dlaždice na rozcestníku) */
  bolest: string;
  /** true → štítek VLASTNÍ DATA; false → ZATÍM BEZ VLASTNÍ REFERENCE */
  maVlastniData: boolean;
  metaTitle: string;
  metaDescription: string;
  /** Řádky H1; koncová interpunkce posledního řádku se obarví modře */
  h1: string[];
  /** Perex — odstavce */
  perex: string[];
  /** Info pás — vždy 4 dvojice [štítek, hodnota] */
  infoPas: [string, string][];
  /** Nadpis sekce „co měříme" (výchozí CO MĚŘÍME; univerzity mají CO NABÍZÍME) */
  coMerimeLabel?: string;
  /** Vždy 3 karty */
  coMerime: { nadpis: string; text: string }[];
  typickeZadani: string[];
  coDostanete: string[];
  /** Uvozující odstavec sekce Důkaz (poctivé přiznání u segmentů bez reference) */
  dukazUvod?: string;
  dukazy: Dukaz[];
  /** POVINNÉ — rozlišovač značky, na každé stránce */
  hranice: { nadpis: string; text: string };
  faq: { q: string; a: string }[];
  cta: { text: string; href: string };
  ctaSekundarni?: { text: string; href: string };
  /** Závěrečný černý CTA blok */
  zaver: { nadpis: string[]; text: string };
  /** Volitelný obrázek (heatmapa / záběr z měření). Zatím nedodáno → sekce se vynechá. */
  obrazek?: { src: string; alt: string; popisek: string };
  /** Klíče z urlMap — související služby */
  souvisejiciSluzby: string[];
};

export const segmenty: Segment[] = [
  // ── 1. E-shopy ────────────────────────────────────────────────
  {
    slug: 'e-shopy',
    poradi: 1,
    nazev: 'E-shopy a e-commerce',
    nazevKratky: 'E-shopy',
    bolest: 'Analytika ukáže, že lidé odešli z produktové stránky. Neřekne proč.',
    maVlastniData: true,
    metaTitle: 'Eye tracking pro e-shopy | Proč lidé nedokončí nákup',
    metaDescription:
      'Měříme, kde v e-shopu mizí pozornost a kde nákup vázne. Vlastní data: typ produktové fotky ovlivnil rychlost rozhodnutí (p = 0,037; N = 84). Konverzní poměr podložený měřením, ne dojmy.',
    h1: ['KOŠÍK', 'NELŽE.'],
    perex: [
      'Analytika ukáže, že lidé odešli z produktové stránky. Neřekne proč. Nevidíte, že si nikdo nevšiml dopravy zdarma, že recenze byly pod ohybem, že se pozornost zasekla na banneru vedle tlačítka.',
      'Eye tracking to ukáže na sekundu přesně — a u nás k tomu dostanete i měření kognitivní zátěže (EMLI): jak moc vaše rozhraní zatěžuje mozek zákazníka, než dojde k tlačítku „Do košíku".',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', '2–4 týdny'],
      ['METODA', 'Eye-tracking + úkolové testy'],
      ['RESPONDENTI', '30–100'],
      ['BALÍČEK', 'Standardní UX test'],
    ],
    coMerime: [
      {
        nadpis: 'Cesta k nákupu',
        text: 'Kde se zákazník ztratí mezi kategorií, produktem a košíkem. Ne kde klikl, ale kde hledal a nenašel.',
      },
      {
        nadpis: 'Produktová stránka',
        text: 'Co z ní lidé skutečně přečtou. Fotka, cena, doprava, recenze, dostupnost — v jakém pořadí a co přeskočí úplně.',
      },
      {
        nadpis: 'Kognitivní zátěž košíku a checkoutu',
        text: 'Kolik úsilí stojí dokončení objednávky. Zátěž se sčítá; každý krok navíc má cenu.',
      },
    ],
    typickeZadani: [
      'Redesign e-shopu — ověřit novou verzi proti staré, než se nasadí',
      'Výběr šablony nebo platformy — otestovat kandidáty s reálnými nákupními úkoly',
      'Produktová fotografie — packshot vs. lifestyle, kolik variant a v jakém pořadí',
      'Košík a checkout — kde odpadávají objednávky a proč',
      'Kategorie a filtry — najde zákazník to, co hledá, nebo odejde ke konkurenci',
      'Bannery a promo bloky — pomáhají prodeji, nebo kradou pozornost tlačítkům',
    ],
    coDostanete: [
      'Heatmapy a AOI analýzu klíčových stránek s procenty pozornosti',
      'Nahrávky pohledu reálných zákazníků při plnění nákupních úkolů',
      'EMLI skóre — kognitivní zátěž po stránkách i oblastech',
      'Prioritizovaný seznam úprav podle dopadu na dokončení nákupu',
      'Srovnání variant, pokud testujeme více verzí',
      'Workshop s vaším týmem nad výstupy',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        nadpis: 'Fotka produktu „na člověku" vypadá lépe. Ale zpomalila nákupní rozhodnutí.',
        text: 'Experiment porovnal čistý packshot s lifestyle fotografií. Typ fotografie měl signifikantní vliv na dobu plnění úkolu — F(1,82) = 4,50; p = 0,037. Na subjektivní hodnocení vliv neměl: „líbivější" neznamená „výkonnější".',
        metoda: 'Eye-tracking + UEQ · N = 84',
        odkaz: '/pripadove-studie/produktove-fotografie-e-commerce',
      },
      {
        typ: 'vlastni',
        nadpis: 'Tři šablony, stejný sortiment. Pozornost se měnila podle zadaného úkolu.',
        text: 'Estetické hodnocení bez úkolového kontextu je zavádějící — šablonu testujte se skutečnými nákupními úkoly, ne „na dojem".',
        metoda: 'Eye-tracking + VisAWI · N = 61',
        odkaz: '/pripadove-studie/sablony-e-shopu',
      },
    ],
    hranice: {
      nadpis: 'Eye tracking neřekne, kolik vyděláte navíc',
      text: 'Ukáže, kde se pozornost tříští a kde je rozhodování zbytečně drahé — obchodní dopad vzniká až tím, co s tím uděláte. A pokud je problém v ceně, sortimentu nebo dopravě, žádné rozhraní to nespraví. To vám řekneme rovnou.',
    },
    faq: [
      {
        q: 'Kolik respondentů je potřeba?',
        a: 'Pro odhalení většiny problémů v použitelnosti stačí 15–30. Pokud chcete porovnávat varianty statisticky, počítejte s 60+. Konkrétní číslo navrhneme podle toho, jaké rozhodnutí potřebujete udělat.',
      },
      {
        q: 'Jde měřit e-shop, který ještě není hotový?',
        a: 'Ano. Testujeme prototypy i wireframy — čím dřív, tím levnější je oprava.',
      },
      {
        q: 'Umíte to i pro mobilní verzi?',
        a: 'Ano, včetně reálného telefonu na stojanu, ne jen simulace na desktopu.',
      },
      {
        q: 'Čím se to liší od heatmap z Hotjaru?',
        a: 'Klikací a scrollovací heatmapy ukazují, kde lidé klikli. Eye tracking ukazuje, kam se dívali — včetně míst, kde se dívali marně a pak odešli. To v klikacích datech nikdy neuvidíte.',
      },
    ],
    cta: { text: 'POŠLETE NÁM ODKAZ NA E-SHOP →', href: '/kontakt' },
    zaver: {
      nadpis: ['KDE VÁM', 'MIZÍ NÁKUP?'],
      text: 'Pošlete nám odkaz na e-shop. Do pár dní řekneme, kde se pozornost tříští a jestli má měření smysl.',
    },
    souvisejiciSluzby: ['ux-audit', 'user-testing', 'eye-tracking', 'test-packages'],
  },

  // ── 2. Firemní weby, portály a aplikace ───────────────────────
  {
    slug: 'weby',
    poradi: 2,
    nazev: 'Firemní weby, portály a aplikace',
    nazevKratky: 'Weby a aplikace',
    bolest: 'Web „vypadá přehledně" — a přesto z něj chodí málo poptávek a lidé nenajdou, co hledají.',
    maVlastniData: true,
    metaTitle: 'UX audit a testování webu | Vypadá dobře, ale funguje?',
    metaDescription:
      'Uživatelské testování a UX audit firemních webů, portálů a aplikací. Vlastní data: 40 % uchazečů nenašlo volné pozice na webu, který „vypadal přehledně" (N = 102). Podklad pro redesign i přístupnost.',
    h1: ['VYPADÁ DOBŘE.', 'FUNGUJE?'],
    perex: [
      'Web schválilo vedení, agentura ho pochválila, interně se v něm všichni vyznají. A přesto z něj chodí málo poptávek, na infolinku volají lidé s otázkami, které jsou na webu zodpovězené, a uchazeči nenajdou volné pozice.',
      'Rozdíl mezi „vypadá přehledně" a „lidé to zvládnou" je měřitelný. U nás vyšel na 40 % — tolik uchazečů se na kariérním webu nedostalo k cíli, přestože web hodnotili jako srozumitelný.',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', '2–5 týdnů'],
      ['METODA', 'Eye-tracking + úkolové testy'],
      ['RESPONDENTI', '20–100'],
      ['BALÍČEK', 'Rychlá diagnostika / Standardní UX test'],
    ],
    coMerime: [
      {
        nadpis: 'Splní návštěvník úkol?',
        text: 'Najde produkt, kontakt, ceník, volnou pozici, formulář? Ne jestli se mu web líbí — jestli s ním něco dokáže.',
      },
      {
        nadpis: 'Co z obsahu skutečně přečte',
        text: 'Texty na webech se píšou, jako by je někdo četl celé. Nečte. Měříme, kde končí pozornost a co propadá úplně.',
      },
      {
        nadpis: 'Kolik to stojí úsilí',
        text: 'EMLI skóre ukáže kognitivní zátěž stránky i jednotlivých oblastí. Zátěž je nepřítel konverze i srozumitelnosti.',
      },
    ],
    typickeZadani: [
      'Redesign webu — ověřit nový návrh proti stávajícímu, než se nasadí. Nejlevnější okamžik pro měření a nejčastější důvod, proč nás lidé oslovují.',
      'Kariérní portál a nábor — dostane se uchazeč k pozici, nebo odejde',
      'Generování poptávek — kde v cestě ke kontaktnímu formuláři se návštěvník ztrácí',
      'Samoobslužné zóny a portály — klientská sekce, objednávkový systém, rezervace',
      'Přístupnost — jak web zvládnou lidé se zhoršeným zrakem, senioři, uživatelé bez myši',
      'Interní systémy a intranet — kolik pozornosti stojí úkon, který zaměstnanec dělá denně',
      'Landing pages a kampaňové stránky — dojde návštěvník k akci, nebo se zasekne',
      'Weby veřejné správy — srozumitelnost a orientace pro celou populaci, ne jen pro zdatné uživatele',
      'Výběr dodavatele nebo návrhu — když máte na stole dvě varianty a rozhoduje se od stolu',
    ],
    coDostanete: [
      'Nahrávky pohledu reálných uživatelů plnících konkrétní úkoly na vašem webu',
      'Úspěšnost splnění úkolů v procentech — číslo, které se dá ukázat vedení',
      'Heatmapy a AOI analýzu klíčových stránek',
      'EMLI skóre kognitivní zátěže po stránkách i oblastech',
      'Prioritizovaný seznam úprav podle dopadu, ne podle toho, co jde snadno opravit',
      'Srovnání variant nebo staré a nové verze, pokud testujeme obojí',
      'Workshop s vaším týmem a s dodavatelem webu',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        nadpis: '40 % uchazečů nenašlo cestu k volným pozicím. Web přitom „vypadal přehledně".',
        text: 'Kariérní portál ŠKODA AUTO — eye-tracking se scénářem „najděte volné pozice" ukázal, že subjektivní hodnocení přehlednosti neodpovídá schopnosti splnit úkol. A/B porovnání plovoucího CTA přineslo měřitelné rozdíly ve fixačních metrikách i délce návštěvy. Výsledkem bylo zjednodušení cesty k pozicím a přestavba navigace.',
        metoda: 'Eye-tracking + dotazník · N = 102',
        odkaz: '/pripadove-studie/karierni-portal-automotive',
      },
      {
        typ: 'vlastni',
        nadpis: '92 % pohledů skončilo na hlavním CTA. Dlouhý odstavec dočetla jen třetina.',
        text: 'AOI analýza odhalila gradient čtení: tučný nadpis zaznamenalo ~86 % respondentů, krátký návazný text 62 % a dlouhý odstavec jen ~33 %. Orientaci nenese množství textu, ale hierarchie — primární CTA se proto zvýraznilo a dlouhé bloky zkrátily.',
        metoda: 'Eye-tracking, AOI analýza · cca 120 respondentů',
        odkaz: '/pripadove-studie/backend-stories',
      },
    ],
    hranice: {
      nadpis: 'Weby nestavíme ani nekódujeme',
      text: 'Neděláme grafický návrh, nepíšeme kód a nejsme agentura — měříme a doporučujeme, realizaci si necháte u svého dodavatele. Bereme to jako výhodu: nemáme důvod obhajovat návrh, který jsme sami vyrobili. A druhá věc: měření neřekne, jestli je váš web hezký. Řekne, jestli s ním lidé zvládnou to, kvůli čemu na něj přišli. Když je problém v nabídce, ceně nebo v tom, že web nemá komu co říct, žádný redesign to nespraví.',
    },
    faq: [
      {
        q: 'Kolik respondentů je potřeba?',
        a: 'Většinu problémů v použitelnosti odhalí 15–30 lidí. Na statistické porovnání variant počítejte s 60+. Číslo navrhneme podle toho, jaké rozhodnutí potřebujete udělat.',
      },
      {
        q: 'Můžeme testovat web, který ještě není hotový?',
        a: 'Ano, a je to nejlepší okamžik. Testujeme prototypy i wireframy — oprava v návrhu stojí zlomek toho, co oprava po nasazení.',
      },
      {
        q: 'Máme redesign od agentury. Není pozdě?',
        a: 'Není, ale nečekejte na spuštění. Ověření návrhu před nasazením je levnější než přesvědčování, že hotový web má problém.',
      },
      {
        q: 'Umíte posoudit přístupnost?',
        a: 'Ano, měřením s uživateli, kteří web ovládají jinak než myší a očima na plné rozlišení. Formální audit podle WCAG je jiná disciplína — měření je jeho doplněk, ne náhrada.',
      },
      {
        q: 'Čím se to liší od Hotjaru nebo Google Analytics?',
        a: 'Analytika ukáže, že lidé odešli. Eye tracking ukáže, kam se dívali, než odešli — včetně míst, kde hledali marně. To v klikacích datech není.',
      },
      {
        q: 'Testujete i mobilní verzi?',
        a: 'Ano, na reálném telefonu ve stojanu, ne simulací na desktopu.',
      },
    ],
    cta: { text: 'POŠLETE NÁM ODKAZ NA WEB →', href: '/kontakt' },
    zaver: {
      nadpis: ['VYPADÁ DOBŘE.', 'FUNGUJE?'],
      text: 'Pošlete nám odkaz na web. Do pár dní řekneme, jestli s ním lidé zvládnou to, kvůli čemu přišli — a co s tím.',
    },
    souvisejiciSluzby: ['ux-audit', 'user-testing', 'eye-tracking', 'test-packages'],
  },

  // ── 3. Sport, stadiony a sponzoring ───────────────────────────
  {
    slug: 'sport-a-stadiony',
    poradi: 3,
    nazev: 'Sport, stadiony a sponzoring',
    nazevKratky: 'Sport a stadiony',
    bolest: 'Klub prodá plochu, sponzor ji zaplatí — a ani jeden neví, jestli se na ni někdo díval.',
    maVlastniData: true,
    metaTitle: 'Eye tracking ve sportu | Kolik pozornosti sponzor doopravdy dostane',
    metaDescription:
      'Měříme, kam se divák na stadionu i u obrazovky skutečně dívá. Podklad pro ocenění reklamních ploch, obhájení ceny před sponzory a návrh kampaní. Vlastní data z fotbalového klubu.',
    h1: ['KOUKÁ SE', 'NĚKDO NA', 'TU BANDU?'],
    perex: [
      'Klub prodá sponzorovi mantinel za částku odvozenou od návštěvnosti a televizního času. Sponzor to zaplatí, protože jinou metriku nemá. Ani jeden z nich neví, jestli se na tu plochu někdo podíval.',
      'My to změříme. Mobilní eye-tracking brýle na divákovi na tribuně nebo u přenosu ukážou kolik pozornosti která plocha reálně dostane, kdy a v jaké fázi zápasu. Klub tím obhájí cenu, sponzor si ověří, co koupil, a agentura přestane hádat.',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', '3–6 týdnů'],
      ['METODA', 'Mobilní brýle + dotazník'],
      ['PROSTŘEDÍ', 'Stadion, přenos, laboratoř'],
      ['BALÍČEK', 'Terénní studie'],
    ],
    coMerime: [
      {
        nadpis: 'Hodnotu reklamní plochy',
        text: 'Mantinely, dresy, LED pásy, plachty, obrazovka. Kolik pozornosti která pozice reálně dostane a v jaké fázi zápasu. Ne odhad z návštěvnosti, ale naměřené sekundy.',
      },
      {
        nadpis: 'Divácký zážitek a provoz stadionu',
        text: 'Orientace v areálu, fronty na občerstvení, navigace k sektoru, čitelnost kostky. Kde divák bloudí a kde utrácí.',
      },
      {
        nadpis: 'Kampaň dřív, než se vytiskne',
        text: 'Billboardy, plakáty, vizuály na sociálních sítích. Který návrh zaujme cílovou skupinu a který skončí jako tapeta.',
      },
    ],
    typickeZadani: [
      'Ocenění reklamních ploch — datový podklad k ceníku pro sponzory na další sezónu',
      'Ověření sponzorského plnění — sponzor chce vidět, co za své peníze dostal',
      'Porovnání pozic — mantinel u středu vs. za brankou vs. dres vs. LED pás',
      'Kampaň na návštěvnost — testování vizuálů před výrobou',
      'Divácký zážitek — orientační systém, catering, vstup, odbavení',
      'Digitální kanály klubu — web, aplikace, prodej vstupenek, e-shop s merchem',
      'TV a streamový přenos — kam se dívá divák u obrazovky a co z reklamy zaregistruje',
      'Sportovní výkon — pohled hráče, brankáře, střelce; rozdíl mezi zkušeným a mladým hráčem',
    ],
    coDostanete: [
      'Videozáznam z pohledu diváka s vyznačenou trajektorií pohledu — nejnázornější výstup, jaký umíme dodat',
      'Rozpad pozornosti podle jednotlivých ploch: kolik procent diváků, jak dlouho, ve které fázi',
      'Srovnávací žebříček pozic — podklad pro cenovou diferenciaci ploch',
      'Heatmapy vizuálů a doporučení k úpravě kreativy',
      'Prezentaci ve formě, kterou klub může rovnou ukázat sponzorovi',
      'Podle zadání i EMLI skóre a doplňkovou biometriku (emoce z tváře, galvanický odpor kůže)',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        nadpis: '16 návrhů billboardů, 79 párů očí. Vyhrály černé minimalistické varianty.',
        text: 'Fotbalový klub připravoval kampaň na podporu návštěvnosti a měl na výběr 16 grafických návrhů. Místo hlasování v marketingovém týmu se rozhodl měřit. Každý respondent viděl všech 16 návrhů přesně 10 sekund, eye-tracking doplnil hodnotící dotazník a výběr TOP3. Všech šest nejlépe hodnocených návrhů mělo černé pozadí. Nejsilnější přenositelný insight: vizuální reklamou je ovlivněno 39 % žen oproti 16 % mužů.',
        metoda: 'Eye-tracking + hodnotící dotazník · N = 79 · 16 stimulů á 10 s',
        odkaz: '/pripadove-studie/billboardy-sport-marketing',
      },
      {
        typ: 'vlastni',
        nadpis: 'Měření přímo na zápase.',
        text: 'Máme za sebou i sběr mobilními eye-tracking brýlemi přímo na stadionu během utkání. Zatím to není zpracované jako veřejná případová studie — a mělo by být. Je to jediný záběr svého druhu, který v ČR nikdo jiný nemá, a pro tenhle segment je to nejsilnější možný otvírák.',
      },
      {
        typ: 'cizi',
        text: 'Měření pozornosti u sponzoringu je etablovaná akademická disciplína — publikované eye-tracking studie se věnují umístění a kongruenci sponzorských sdělení, pozornosti k názvům stadionů (naming rights), sponzorům na dresech i sponzoringu při olympijských kvalifikacích. Ve sportovní výkonnosti pak PING použil eye tracking k vývoji golfových puterů.',
        zdroj: 'Tobii',
      },
    ],
    hranice: {
      nadpis: 'Neměříme mediální hodnotu v korunách',
      text: 'Sledovanost ani mediální hodnotu umí mediální agentury a je to jiná disciplína. My dodáme, co jim chybí: jestli se na plochu někdo skutečně podíval. Naše čísla se s mediální hodnotou dají zkombinovat, ale nenahradí ji. A druhá poctivá věc: vzorek diváků na stadionu je vždycky menší než u online testu — výstup je proto silný na pořadí a poměry mezi plochami, slabší na absolutní čísla přenositelná na celou návštěvnost.',
    },
    faq: [
      {
        q: 'Kolik diváků potřebujete změřit?',
        a: 'U terénního měření na stadionu typicky 20–40. Sběr je pomalejší než v laboratoři, ale i tenhle vzorek spolehlivě odliší, které plochy fungují a které ne.',
      },
      {
        q: 'Nebude to divákům vadit?',
        a: 'Brýle vypadají jako běžné brýle a divák se dívá na zápas normálně. Měření běží na dobrovolnících s informovaným souhlasem.',
      },
      {
        q: 'Jde měřit i televizní přenos?',
        a: 'Ano, a je to levnější a rychlejší než sběr na stadionu. Dělá se v laboratoři nad záznamem nebo živým přenosem.',
      },
      {
        q: 'K čemu to je klubu, který má sponzory nasmlouvané?',
        a: 'Právě k obhájení ceny při dalším jednání. Sponzor slyší „mantinel u střídačky získal třikrát víc pozornosti než plocha za brankou" jinak než „máme průměrnou návštěvnost 4 000 lidí".',
      },
      {
        q: 'A co sponzorovi?',
        a: 'Ke kontrole, jestli platí za to, co dostává — a k argumentu na slevu nebo přesun na lepší pozici.',
      },
      {
        q: 'Umíte měřit i hráče, ne jen diváky?',
        a: 'Ano. Pohled brankáře, střelce nebo rozehrávače je měřitelný a rozdíl mezi zkušeným a mladým hráčem bývá viditelný. Zatím je to u nás oblast s potenciálem, ne s vlastní referencí.',
      },
    ],
    cta: { text: 'ZMĚŘÍME VAŠE PLOCHY →', href: '/kontakt' },
    ctaSekundarni: { text: 'JSEM SPONZOR, CHCI OVĚŘENÍ →', href: '/kontakt' },
    zaver: {
      nadpis: ['POZORNOST', 'SE PRODÁVÁ.'],
      text: 'Změříme, kolik pozornosti které plochy reálně dostanou — podklad, kterým klub obhájí cenu a sponzor si ověří, co koupil.',
    },
    souvisejiciSluzby: ['field-research', 'eye-tracking', 'ux-research', 'test-packages'],
  },

  // ── 4. Automotive ─────────────────────────────────────────────
  {
    slug: 'automotive',
    poradi: 4,
    nazev: 'Automotive',
    nazevKratky: 'Automotive',
    bolest: 'Rozhraní, které interně vypadá přehledně, se v reálném provozu chová jinak.',
    maVlastniData: true,
    metaTitle: 'Eye tracking pro automotive | Rozhraní, kariérní weby, showroom',
    metaDescription:
      'Měříme pozornost a kognitivní zátěž tam, kde automotive rozhoduje o lidech i zákaznících. Vlastní data: 40 % uchazečů nenašlo cestu k volným pozicím (N = 102).',
    h1: ['POZORNOST', 'ZA VOLANTEM', 'I PŘED NÍM.'],
    perex: [
      'Automotive je v ČR největší průmysl a zároveň největší bitva o lidi. Obě fronty mají stejný problém: rozhraní, které interně vypadá přehledně, se v reálném provozu chová jinak.',
      'Měříme obojí — digitální produkty (kariérní portály, konfigurátory, zákaznické zóny) i fyzické prostředí (showroom, HMI, výrobní a servisní pracoviště) mobilními eye-tracking brýlemi.',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', '3–6 týdnů'],
      ['METODA', 'Eye-tracking + dotazník'],
      ['PROSTŘEDÍ', 'Laboratoř i terén'],
      ['BALÍČEK', 'Standardní / Terénní studie'],
    ],
    coMerime: [
      {
        nadpis: 'Nábor a kariérní weby',
        text: 'Jestli se uchazeč vůbec dostane k volné pozici. V automotive je nábor byznysově kritický a web je jeho první filtr.',
      },
      {
        nadpis: 'Konfigurátory a zákaznické zóny',
        text: 'Kde se zákazník ztrácí ve výbavách, kde vzdá konfiguraci, co z ceníku vůbec nepřečte.',
      },
      {
        nadpis: 'Fyzické prostředí',
        text: 'Showroom, prodejní materiály, orientace na pracovišti. Mobilní brýle zachytí pozornost v prostoru, ne jen na obrazovce.',
      },
    ],
    typickeZadani: [
      'Kariérní portál — proč přichází málo relevantních uchazečů',
      'Konfigurátor vozu — kde končí cesta a proč',
      'Zákaznická zóna / servisní objednávka',
      'Showroom a product placement — čeho si zákazník všimne a v jakém pořadí',
      'Rozhraní HMI a palubních systémů — čitelnost a kognitivní zátěž',
      'Interní systémy — kolik pozornosti stojí operátora rutinní úkon',
    ],
    coDostanete: [
      'Data z reálných uživatelů plnících konkrétní úkoly, ne z fokusních skupin',
      'Heatmapy, AOI analýzu a nahrávky pohledu',
      'Statistické porovnání variant, pokud testujeme více verzí',
      'EMLI skóre pro posouzení kognitivní zátěže rozhraní',
      'Prioritizovaná doporučení a workshop s týmem',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        nadpis: '40 % uchazečů nenašlo cestu k volným pozicím. Web přitom „vypadal přehledně".',
        text: 'Kariérní portál ŠKODA AUTO — eye-tracking se scénářem „najděte volné pozice" ukázal, že subjektivní hodnocení přehlednosti neodpovídá schopnosti splnit úkol. A/B porovnání plovoucího CTA přineslo měřitelné rozdíly ve fixačních metrikách i délce návštěvy. Výsledkem bylo zjednodušení cesty k pozicím a přestavba navigace.',
        metoda: 'Eye-tracking + dotazník · N = 102',
        odkaz: '/pripadove-studie/karierni-portal-automotive',
      },
    ],
    hranice: {
      nadpis: 'Neděláme homologační ani bezpečnostní testy vozidel',
      text: 'Neměříme řidiče v reálném provozu na veřejné komunikaci. Pracujeme s rozhraním, prostředím a simulovanými úkoly. Pokud potřebujete certifikovaný test podle normy, nasměrujeme vás jinam.',
    },
    faq: [
      {
        q: 'Umíte měřit přímo ve výrobě nebo showroomu?',
        a: 'Ano, mobilními eye-tracking brýlemi. Domluvíme se na bezpečnostních podmínkách provozu.',
      },
      {
        q: 'Jak řešíte NDA a citlivá data?',
        a: 'Standardně. Většina projektů v automotive běží pod NDA a case study zveřejňujeme jen se souhlasem, případně anonymizovaně.',
      },
      {
        q: 'Můžeme testovat prototyp, který ještě není venku?',
        a: 'Ano, a je to nejlepší okamžik.',
      },
    ],
    cta: { text: 'POPTAT MĚŘENÍ →', href: '/kontakt' },
    zaver: {
      nadpis: ['POZORNOST', 'ROZHODUJE.'],
      text: 'Digitální produkt i fyzické prostředí — změříme, kde se pozornost a lidé ztrácejí.',
    },
    souvisejiciSluzby: ['user-testing', 'field-research', 'eye-tracking', 'test-packages'],
  },

  // ── 10. Univerzity, výzkum a vzdělávání ──────────────────────
  {
    slug: 'univerzity-a-vyzkum',
    poradi: 10,
    nazev: 'Univerzity, výzkum a vzdělávání',
    nazevKratky: 'Univerzity a výzkum',
    bolest: 'Recenzent se neptá, jestli je závěr zajímavý. Ptá se, jak jste sbírali data.',
    maVlastniData: true,
    metaTitle: 'Eye tracking pro univerzity a výzkum | Laboratoř a metodika',
    metaDescription:
      'Sběr eye-tracking dat pro akademický výzkum, metodická podpora, spolupráce na publikacích. Vlastní publikovaná metodika EMLI, zázemí laboratoře FIMEYELAB na FIM UHK.',
    h1: ['DATA,', 'KTERÁ OBSTOJÍ.'],
    perex: [
      'Recenzent se neptá, jestli je závěr zajímavý. Ptá se, jak jste sbírali data, jak jste je normalizovali a proč zrovna takhle. Přesně tam laboratoře nejčastěji ztrácejí čas.',
      'Máme vlastní publikovanou metodiku EMLI pro kvantifikaci mentální zátěže z eye-tracking dat, zázemí laboratoře na FIM UHK a zkušenost s tím, co v recenzním řízení projde a co ne.',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', 'dle projektu'],
      ['METODA', 'Eye-tracking + biometrie'],
      ['ZÁZEMÍ', 'FIM UHK'],
      ['VÝSTUP', 'Data + metodika'],
    ],
    coMerimeLabel: 'CO NABÍZÍME',
    coMerime: [
      {
        nadpis: 'Sběr dat na zakázku',
        text: 'Vy máte výzkumnou otázku, my hardware, laboratoř a protokol. Dostanete čistá data připravená k analýze.',
      },
      {
        nadpis: 'Metodická konzultace',
        text: 'Návrh designu experimentu, velikost vzorku, volba metrik, ošetření limitů. Dřív, než začnete sbírat, ne až po.',
      },
      {
        nadpis: 'EMLI jako nástroj',
        text: 'Publikovaný model, který převádí nesourodé eye-tracking metriky na jednu škálu 0–100 kompatibilní s NASA-TLX. Metodika je veřejná a citovatelná.',
      },
    ],
    typickeZadani: [
      'Diplomové a disertační práce, které potřebují laboratorní data',
      'Grantové projekty s eye-tracking komponentou',
      'Výuka — praktické bloky, kde si studenti sáhnou na reálné vybavení',
      'Spolupráce na publikaci (spoluautorství, metodická část)',
      'Pilotní studie před podáním grantové žádosti',
      'Vybudování vlastní eye-tracking učebny nebo laboratoře — konzultace, čemu se vyhnout',
    ],
    coDostanete: [
      'Surová i zpracovaná data v otevřených formátech',
      'Popis metodiky v podobě použitelné do metodické kapitoly',
      'Vyhodnocení metrik včetně limitů a velikosti efektu',
      'EMLI skóre, pokud je relevantní pro vaši otázku',
      'Konzultaci nad interpretací výsledků',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        nadpis: 'EMLI je naše vlastní publikovaná metodika.',
        text: 'Model byl navržen a publikován v disertační práci na FIM UHK (Petružálek, 2023). V publikovaném experimentu (n = 61, tři reálné šablony e-shopů) signifikantně rozlišil kognitivní zátěž na úrovni produktových oblastí (p < 0,001). Poctivě k tomu patří i limit: EMLI je publikovaný, ale zatím plně nevalidovaný — chybí verifikace proti NASA-TLX na větších vzorcích a ověření vah jednotlivých metrik. Uvádíme to všude, protože transparentnost je součástí metody, ne marketingová vada.',
      },
      {
        typ: 'cizi',
        text: 'Referenční model ze zahraničí: Fakulta informatiky Slovenské technické univerzity v Bratislavě (FIIT STU) postavila plně vybavenou eye-tracking učebnu — 20 zařízení plus samostatná laboratoř — a používá ji na learning analytics i UX výzkum. Ukazuje, že model univerzitní laboratoř + komerční využití funguje.',
        zdroj: 'Tobii',
      },
    ],
    hranice: {
      nadpis: 'Nejsme statistická poradna',
      text: 'Neděláme analýzu dat, která jsme nesbírali, bez znalosti protokolu. A pokud je výzkumná otázka postavená tak, že ji eye tracking nezodpoví, řekneme to na první schůzce — ušetří to oběma stranám semestr.',
    },
    faq: [
      {
        q: 'Můžeme si data odvézt a analyzovat sami?',
        a: 'Ano, to je běžný režim. Dostanete surová data i popis sběru.',
      },
      {
        q: 'Jak citovat EMLI?',
        a: 'Metodika je publikovaná a veřejně dostupná — citujte disertační práci. Citaci vám rádi pošleme.',
      },
      {
        q: 'Děláte spoluautorství?',
        a: 'Podle rozsahu naší role. Domlouváme se předem, ne po odeslání do časopisu.',
      },
      {
        q: 'Umíte měřit i mimo laboratoř?',
        a: 'Ano, mobilními eye-tracking brýlemi v reálném prostředí — viz Terénní měření.',
      },
    ],
    cta: { text: 'POJĎME PROBRAT VÁŠ VÝZKUM →', href: '/kontakt' },
    zaver: {
      nadpis: ['DATA,', 'KTERÁ OBSTOJÍ.'],
      text: 'Máte výzkumnou otázku, my hardware, laboratoř a protokol. Pojďme probrat, co potřebujete doložit.',
    },
    souvisejiciSluzby: ['ux-research', 'eye-tracking', 'field-research', 'test-packages'],
  },

  // ── 5. Doprava, města a veřejný prostor ───────────────────────
  {
    slug: 'doprava-a-mesta',
    poradi: 5,
    nazev: 'Doprava, města a veřejný prostor',
    nazevKratky: 'Doprava a města',
    bolest: 'Značka, kterou nikdo nezaregistruje, je jen náklad.',
    maVlastniData: false,
    metaTitle: 'Eye tracking v dopravě a veřejném prostoru | Značení a orientace',
    metaDescription:
      'Měříme, čeho si řidič, chodec nebo cestující skutečně všimne. Dopravní značení, orientace ve městě, dispečink, informační systémy.',
    h1: ['VŠIMNE SI', 'HO NĚKDO?'],
    perex: [
      'Značka, kterou nikdo nezaregistruje, je jen náklad. Informační tabule, kterou lidé přehlédnou, generuje frontu na infocentru. Ve veřejném prostoru se přitom skoro nikdy neměří — rozhoduje se od stolu a ověřuje se stížnostmi.',
      'Mobilní eye-tracking brýle ukážou, co člověk v reálném pohybu skutečně vidí, kdy se rozhoduje a co mine.',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', '4–8 týdnů'],
      ['METODA', 'Mobilní eye-tracking brýle'],
      ['PROSTŘEDÍ', 'Reálný terén'],
      ['BALÍČEK', 'Terénní studie'],
    ],
    coMerime: [
      {
        nadpis: 'Vnímání značení',
        text: 'Dopravní značky, orientační systémy, výstrahy. Kdy si jich člověk všimne a jestli má ještě čas zareagovat.',
      },
      {
        nadpis: 'Orientace v prostoru',
        text: 'Nádraží, přestupní uzel, nemocniční areál, úřad. Kde lidé zastaví a hledají.',
      },
      {
        nadpis: 'Pozornost operátora',
        text: 'Dispečink, řídicí středisko. Co operátor sleduje a co mu unikne.',
      },
    ],
    typickeZadani: [
      'Návrh nebo úprava orientačního systému (nádraží, terminál, areál)',
      'Vyhodnocení dopravního značení v konkrétním úseku',
      'Informační systémy MHD — displeje, jízdní řády, odbavovací automaty',
      'Bezpečnost chodců a cyklistů — co vidí a kdy',
      'Dispečink a řídicí středisko — rozložení pozornosti operátora',
      'Ověření návrhu před realizací — levnější než přeznačovat hotové',
    ],
    coDostanete: [
      'Videozáznam z pohledu účastníka provozu s vyznačenou trajektorií pohledu',
      'Analýzu, kdy a odkud byl prvek poprvé zaznamenán',
      'Mapu míst, kde se lidé zastavují a hledají',
      'Doporučení k umístění, velikosti a hierarchii prvků',
    ],
    dukazUvod:
      'Ve veřejném prostoru zatím nemáme vlastní realizovaný projekt v ČR. Metoda je ale v oboru zavedená a doložená jinde ve světě. Hledáme první český projekt a jsme ochotni jít do pilotu za zvýhodněných podmínek výměnou za souhlas s publikací.',
    dukazy: [
      {
        typ: 'cizi',
        text: 'Studie pozornosti operátora v dopravním dispečinku s mobilním eye trackingem.',
        zdroj: 'Tobii',
      },
      {
        typ: 'cizi',
        text: 'Heathrow Terminal 5 — zlepšení orientace cestujících.',
        zdroj: 'Tobii',
      },
      {
        typ: 'cizi',
        text: 'Recenzované akademické studie vnímání a porozumění dopravnímu značení pomocí eye trackingu (mj. vliv znalosti trasy na vnímání značek).',
      },
    ],
    hranice: {
      nadpis: 'Neděláme dopravně-inženýrské posudky',
      text: 'Ani nenavrhujeme značení podle norem. Měříme lidské vnímání — projektant s tím pak pracuje. A měření v ostrém provozu vždy řešíme s ohledem na bezpečnost účastníků.',
    },
    faq: [
      {
        q: 'Dá se měřit za jízdy?',
        a: 'Na uzavřeném polygonu nebo v simulátoru ano. Na veřejné komunikaci to řešíme individuálně a konzervativně.',
      },
      {
        q: 'Kolik lidí je potřeba?',
        a: 'U terénních studií typicky 20–40. Sběr je pomalejší než v laboratoři.',
      },
      {
        q: 'Umíte to i pro pěší a cyklisty?',
        a: 'Ano, to je pro mobilní brýle přirozené prostředí.',
      },
    ],
    cta: { text: 'POPTAT TERÉNNÍ MĚŘENÍ →', href: '/kontakt' },
    zaver: {
      nadpis: ['VŠIMNE SI', 'HO NĚKDO?'],
      text: 'Mobilní brýle ukážou, co člověk v reálném pohybu skutečně vidí. Poptejte terénní měření.',
    },
    souvisejiciSluzby: ['field-research', 'eye-tracking', 'ux-research', 'test-packages'],
  },

  // ── 6. Průmysl, energetika a kritická infrastruktura ──────────
  {
    slug: 'prumysl-a-energetika',
    poradi: 6,
    nazev: 'Průmysl, energetika a kritická infrastruktura',
    nazevKratky: 'Průmysl a energetika',
    bolest: 'Expert pozná vadu za vteřinu a neumí vysvětlit jak. Zaškolení pak trvá měsíce.',
    maVlastniData: false,
    metaTitle: 'Eye tracking v průmyslu a energetice | Výcvik, kontrola, dispečink',
    metaDescription:
      'Zkrácení zaškolení, snížení chybovosti kontroly, měření pozornosti operátora. Know-how zkušeného pracovníka jde zviditelnit a předat.',
    h1: ['CO VIDÍ', 'ZKUŠENÝ', 'OPERÁTOR.'],
    perex: [
      'Zkušený pracovník pozná vadu za vteřinu a neumí vysvětlit jak. Zaškolení nováčka pak trvá měsíce a stojí na tom, jestli si ho někdo vezme pod křídla.',
      'Eye tracking z toho dělá měřitelnou věc: ukáže, kam se expert dívá, v jakém pořadí a co přeskočí. Tacitní znalost, kterou nikdo neuměl popsat, se změní v osnovu školení.',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', '4–8 týdnů'],
      ['METODA', 'Mobilní eye-tracking brýle'],
      ['PROSTŘEDÍ', 'Provoz a dispečink'],
      ['BALÍČEK', 'Terénní studie'],
    ],
    coMerime: [
      {
        nadpis: 'Rozdíl expert vs. nováček',
        text: 'Co dělá zkušeného zkušeným. Podklad pro zkrácení zaškolení.',
      },
      {
        nadpis: 'Vizuální kontrola a inspekce',
        text: 'Kde vzniká přehlédnutí a jestli je systematické.',
      },
      {
        nadpis: 'Pozornost v dispečinku',
        text: 'Které panely operátor sleduje a které jsou dekorace.',
      },
    ],
    typickeZadani: [
      'Zkrácení doby zaškolení nových pracovníků',
      'Vizuální kontrola kvality — snížení chybovosti',
      'Obhlídky a údržba — dodržují se postupy, nebo se zkracují',
      'Velín a dispečink — rozložení pozornosti mezi obrazovkami',
      'Bezpečnostní značení v provozu — je vidět tam, kde má být',
      'Interní software — kolik pozornosti stojí rutinní úkon, který se dělá stokrát denně',
    ],
    coDostanete: [
      'Videozáznam z pohledu pracovníka při reálné práci',
      'Porovnání skenovacích vzorců expert vs. nováček',
      'Identifikaci míst, kde vzniká přehlédnutí',
      'Podklad pro osnovu školení postavený na datech, ne na vzpomínkách školitele',
      'EMLI skóre kognitivní zátěže u rozhraní a velínů',
    ],
    dukazUvod:
      'V průmyslu zatím nemáme vlastní realizovaný projekt. Metoda je ale v oboru zavedená a doložená jinde ve světě. Hledáme první český projekt a jsme ochotni jít do pilotu za zvýhodněných podmínek výměnou za souhlas s publikací.',
    dukazy: [
      {
        typ: 'cizi',
        text: 'Kubota použila eye tracking ke zlepšení výcviku vizuální kontroly a zkrácení doby zaškolení.',
        zdroj: 'Tobii',
      },
      {
        typ: 'cizi',
        text: 'Tobii má samostatnou řešenou oblast pro provoz, údržbu a inspekci zařízení.',
        zdroj: 'Tobii',
      },
      {
        typ: 'cizi',
        text: 'Měření pozornosti operátorů v řídicích střediscích je doložené v dopravním dispečinku.',
        zdroj: 'Tobii',
      },
    ],
    hranice: {
      nadpis: 'Neděláme audity bezpečnosti práce',
      text: 'Ani procesní poradenství. Dodáme data o tom, kam se lidé dívají a co je to stojí — návaznou změnu procesu si řídíte vy nebo váš procesní tým. A měření v provozu vždy podléhá vašim bezpečnostním pravidlům.',
    },
    faq: [
      {
        q: 'Nebudou se pracovníci bránit?',
        a: 'Zkušenost je, že po vysvětlení účelu ne — měření není hodnocení výkonu jednotlivce a data anonymizujeme. Klíčové je to říct předem a férově.',
      },
      {
        q: 'Fungují brýle v provozu?',
        a: 'Ano, včetně přilby a ochranných pomůcek. Kombinaci ověříme před ostrým sběrem.',
      },
      {
        q: 'Kolik pracovníků potřebujeme?',
        a: 'Pro porovnání expert vs. nováček stačí 8–15 na skupinu, podle variability práce.',
      },
    ],
    cta: { text: 'POPTAT MĚŘENÍ V PROVOZU →', href: '/kontakt' },
    zaver: {
      nadpis: ['CO VIDÍ', 'ZKUŠENÝ.'],
      text: 'Tacitní znalost experta se dá zviditelnit a předat. Poptejte měření přímo v provozu.',
    },
    souvisejiciSluzby: ['field-research', 'eye-tracking', 'ux-research', 'test-packages'],
  },

  // ── 7. Zdravotnictví a zdravotnické prostředky ────────────────
  {
    slug: 'zdravotnictvi',
    poradi: 7,
    nazev: 'Zdravotnictví a zdravotnické prostředky',
    nazevKratky: 'Zdravotnictví',
    bolest: 'Špatné rozhraní tu není otázkou konverze, ale rizika.',
    maVlastniData: false,
    metaTitle: 'Eye tracking ve zdravotnictví | Rozhraní, výcvik, bezpečnost',
    metaDescription:
      'Měření pozornosti a kognitivní zátěže u zdravotnických rozhraní, přístrojů a výcviku. Kde chyba stojí víc než konverzi.',
    h1: ['KDE CHYBA', 'STOJÍ VÍC.'],
    perex: [
      'Ve zdravotnictví není špatné rozhraní otázkou konverze. Zdravotník čte displej pod časovým tlakem, s rukama v rukavicích, po dvanácti hodinách směny. Kognitivní zátěž tam není abstraktní pojem — je to riziko.',
      'Měříme, kam se zdravotník ve skutečnosti dívá, co přehlédne a jak drahé je pro něj rozhraní ovládat.',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', '4–8 týdnů'],
      ['METODA', 'Eye-tracking + EMLI'],
      ['PROSTŘEDÍ', 'Simulace i pracoviště'],
      ['BALÍČEK', 'Komplexní biometrický výzkum'],
    ],
    coMerime: [
      {
        nadpis: 'Rozhraní přístrojů a systémů',
        text: 'Displeje, alarmy, nemocniční informační systémy. Co se přehlédne, když jde o čas.',
      },
      {
        nadpis: 'Kognitivní zátěž pod tlakem',
        text: 'Kolik mentální kapacity spotřebuje samotné ovládání, místo aby šla do rozhodování o pacientovi.',
      },
      {
        nadpis: 'Výcvik a hodnocení dovedností',
        text: 'Kam se dívá zkušený zdravotník a kam nováček. Rozdíl je učitelný, jakmile je vidět.',
      },
    ],
    typickeZadani: [
      'Použitelnost zdravotnického prostředku před uvedením na trh',
      'Nemocniční informační systém — kde zdravotníci ztrácejí čas',
      'Simulační výcvik — objektivní hodnocení místo subjektivního posudku instruktora',
      'Pacientská rozhraní — objednávkové systémy, portály, příbalové informace',
      'Alarmy a upozornění — všimne si jich někdo, nebo zapadly',
      'E-health aplikace a telemedicína',
    ],
    coDostanete: [
      'Záznam pohledu při plnění klinicky relevantních úkolů',
      'EMLI skóre kognitivní zátěže rozhraní',
      'Porovnání expert vs. začátečník, pokud je to cílem',
      'Doporučení k úpravám rozhraní a k designu výcviku',
      'Podklad použitelný do dokumentace použitelnosti',
    ],
    dukazUvod:
      'Buďme na téhle stránce upřímní. Ve zdravotnictví zatím nemáme vlastní realizovaný projekt. Metoda je ale v oboru zavedená a doložená jinde ve světě. Hledáme první český projekt v tomhle segmentu a jsme ochotni jít do pilotu za zvýhodněných podmínek výměnou za souhlas s publikací case study.',
    dukazy: [
      {
        typ: 'cizi',
        text: 'Berlin Heart Center použil eye tracking k výuce chirurgických metod a hodnocení, jak se studenti učí.',
        zdroj: 'Tobii',
      },
      {
        typ: 'cizi',
        text: 'Studie „Seeing through nurses’ eyes" ukázala, jak eye tracking zlepšuje bezpečnost zdravotnických prostředků.',
        zdroj: 'Tobii',
      },
      {
        typ: 'cizi',
        text: 'Tongji University ho využila k výcviku torakoskopické chirurgie.',
        zdroj: 'Tobii',
      },
    ],
    hranice: {
      nadpis: 'Neděláme klinické hodnocení ani diagnostiku',
      text: 'Neposuzujeme medicínskou správnost postupu — na to jsou lékaři. Měříme použitelnost, pozornost a kognitivní zátěž. A pokud potřebujete formální usability engineering podle IEC 62366, měření je jeho vstup, ne náhrada celého procesu.',
    },
    faq: [
      {
        q: 'Jak je to s etikou a souhlasy?',
        a: 'Standardní informovaný souhlas, u výzkumných projektů podle potřeby přes etickou komisi. Máme s tím zkušenost z akademického prostředí.',
      },
      {
        q: 'Jde měřit na reálném pracovišti?',
        a: 'Mobilními brýlemi ano, ale závisí to na provozu a souhlasu pracoviště. Často začínáme v simulaci.',
      },
      {
        q: 'Vidí měření na pacienta?',
        a: 'Ne. Záznam řešíme tak, aby pacient nebyl identifikovatelný, případně měříme mimo kontakt s pacienty.',
      },
    ],
    cta: { text: 'HLEDÁME PILOTNÍ PROJEKT →', href: '/kontakt' },
    zaver: {
      nadpis: ['KDE CHYBA', 'STOJÍ VÍC.'],
      text: 'Hledáme první český projekt v tomhle segmentu — jsme ochotni jít do pilotu za zvýhodněných podmínek výměnou za souhlas s publikací.',
    },
    souvisejiciSluzby: ['user-testing', 'eye-tracking', 'field-research', 'test-packages'],
  },

  // ── 8. Banky, pojišťovny a poradenství ────────────────────────
  {
    slug: 'finance-a-poradenstvi',
    poradi: 8,
    nazev: 'Banky, pojišťovny a poradenství',
    nazevKratky: 'Finance a poradenství',
    bolest: 'Finanční produkty se prodávají textem, který skoro nikdo nečte.',
    maVlastniData: false,
    metaTitle: 'Eye tracking pro banky a pojišťovny | Srozumitelnost a back office',
    metaDescription:
      'Měříme, co klient v dokumentu skutečně přečte a kolik ho stojí pochopení. Sjednání online, srozumitelnost podmínek, efektivita back office.',
    h1: ['PŘEČETL', 'SI TO VŮBEC?'],
    perex: [
      'Finanční produkty se prodávají textem, který skoro nikdo nečte. „Klient byl informován" je právní fikce, kterou eye tracking během půl hodiny rozebere na kusy.',
      'Dvě roviny: navenek srozumitelnost a sjednání pro klienta, dovnitř efektivita rozhraní, ve kterých vaši lidé tráví celý den.',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', '3–6 týdnů'],
      ['METODA', 'Eye-tracking + EMLI'],
      ['ZAMĚŘENÍ', 'Klient i back office'],
      ['BALÍČEK', 'Standardní / Komplexní'],
    ],
    coMerime: [
      {
        nadpis: 'Srozumitelnost a skutečné čtení',
        text: 'Co z podmínek, sazebníku nebo předsmluvních informací klient reálně zaznamená. A co přeskočí vždycky.',
      },
      {
        nadpis: 'Sjednání online',
        text: 'Kde v procesu klient odpadne a jestli je to formulářem, nebo nedůvěrou.',
      },
      {
        nadpis: 'Back office a interní rozhraní',
        text: 'Kolik pozornosti stojí úkon, který operátor dělá stokrát denně.',
      },
    ],
    typickeZadani: [
      'Online sjednání pojištění, úvěru nebo účtu — kde se cesta láme',
      'Srozumitelnost smluvní dokumentace a předsmluvních informací',
      'Internetové a mobilní bankovnictví — orientace, chybové stavy',
      'Back office — zrychlení rutinních úkonů, snížení chybovosti',
      'Přístupnost pro seniory a méně zdatné uživatele',
      'Marketingové materiály — co z nabídky si klient vezme',
    ],
    coDostanete: [
      'Heatmapy a AOI analýzu dokumentů i rozhraní s procenty pozornosti',
      'Doklad o tom, které pasáže klienti systematicky přeskakují',
      'EMLI skóre kognitivní zátěže formulářů a procesů',
      'Doporučení k přeformulování a přeuspořádání',
      'U back office porovnání variant rozhraní podle času a zátěže',
    ],
    dukazUvod:
      'Ve finančních službách zatím nemáme vlastní realizovaný projekt. Nejbližší vlastní data máme z čtení textu obecně — a jsou přímo přenositelná na smluvní dokumentaci:',
    dukazy: [
      {
        typ: 'vlastni',
        nadpis: '92 % pohledů skončilo na hlavním CTA. Dlouhý odstavec dočetla jen třetina.',
        text: 'AOI analýza odhalila gradient čtení: tučný nadpis zaznamenalo ~86 % respondentů, krátký návazný text 62 % a dlouhý odstavec jen ~33 %. Orientaci nenese množství textu, ale hierarchie. To je přímo přenositelné na smluvní dokumentaci: dlouhý blok textu dočte třetina lidí. Ať už je v něm cokoliv.',
        metoda: 'Eye-tracking, AOI analýza · cca 120 respondentů',
        odkaz: '/pripadove-studie/backend-stories',
      },
      {
        typ: 'cizi',
        text: 'Orix Insurance zefektivnila back office pomocí eye trackingu.',
        zdroj: 'Tobii',
      },
    ],
    hranice: {
      nadpis: 'Neposuzujeme právní správnost dokumentů',
      text: 'Ani soulad s regulací. Měříme, co si klient přečte a co ho to stojí — právní obsah je na vašich právnících. Zjištění „tuhle pasáž nikdo nečte" ale bývá pro compliance zajímavější než pro marketing.',
    },
    faq: [
      {
        q: 'Jde měřit tištěné dokumenty?',
        a: 'Ano, mobilními brýlemi. Papír měříme stejně dobře jako obrazovku.',
      },
      {
        q: 'Jak řešíte citlivá data?',
        a: 'Testujeme na neostrých datech a demo účtech. Reálné klientské údaje do měření nepatří.',
      },
      {
        q: 'Umíte porovnat starou a novou verzi podmínek?',
        a: 'Ano, a je to jedno z nejsilnějších využití — rozdíl je vidět v číslech.',
      },
    ],
    cta: { text: 'POJĎME ZMĚŘIT, CO SE ČTE →', href: '/kontakt' },
    zaver: {
      nadpis: ['PŘEČETL', 'SI TO VŮBEC?'],
      text: 'Změříme, co si klient z dokumentu skutečně přečte a kolik ho to stojí.',
    },
    souvisejiciSluzby: ['ux-audit', 'eye-tracking', 'user-testing', 'test-packages'],
  },

  // ── 9. Letectví a doprava vzduchem ────────────────────────────
  {
    slug: 'letectvi',
    poradi: 9,
    nazev: 'Letectví a doprava vzduchem',
    nazevKratky: 'Letectví',
    bolest: 'Kam se dívá pilot, instruktor a cestující — a kde jim dochází kapacita.',
    maVlastniData: false,
    metaTitle: 'Eye tracking v letectví | Kokpit, výcvik, orientace na letišti',
    metaDescription:
      'Měření situačního povědomí, kognitivní zátěže a orientace v leteckém provozu a na letištích.',
    h1: ['KAM SE DÍVÁ', 'PILOT.'],
    perex: [
      'Letectví je obor, kde se eye tracking používá nejdéle a nejsystematičtěji — protože tam se pozornost odjakživa řeší jako bezpečnostní parametr, ne jako UX detail.',
      'Stejná metoda funguje ve třech rovinách: kokpit a výcvik, řízení provozu a orientace cestujících na letišti.',
    ],
    infoPas: [
      ['TYPICKÝ ROZSAH', '4–8 týdnů'],
      ['METODA', 'Eye-tracking v simulátoru i terénu'],
      ['KLÍČOVÁ METRIKA', 'Situační povědomí'],
      ['BALÍČEK', 'Komplexní / Terénní'],
    ],
    coMerime: [
      {
        nadpis: 'Rozložení pozornosti ve výcviku',
        text: 'Jaký sken přístrojů má instruktor a jaký student. Objektivní podklad místo dojmu z kabiny.',
      },
      {
        nadpis: 'Kognitivní zátěž v kritických fázích',
        text: 'Kolik kapacity zbývá, když se přidá další úkol.',
      },
      {
        nadpis: 'Orientace v prostoru',
        text: 'Značení na letišti, terminál, odbavení. Kde cestující zpomalí, zastaví se a hledá.',
      },
    ],
    typickeZadani: [
      'Výcvik pilotů a personálu — hodnocení skenovacích vzorců v simulátoru',
      'Návrh nebo úprava rozhraní v kokpitu či na stanovišti řízení',
      'Orientace a wayfinding na letišti — značení, informační tabule, cesta k bráně',
      'Odbavovací kiosky a samoobslužná rozhraní',
      'Bezpečnostní kontrola — pozornost operátora u rentgenu',
      'Postupy údržby a předletové kontroly',
    ],
    coDostanete: [
      'Záznam pohledu v simulátoru nebo v reálném prostoru',
      'Analýzu skenovacích vzorců a porovnání expert vs. nováček',
      'EMLI skóre kognitivní zátěže v definovaných fázích úkolu',
      'Doporučení k úpravě rozhraní, značení nebo osnovy výcviku',
    ],
    dukazUvod:
      'V letectví zatím nemáme vlastní realizovaný projekt. Metoda je tu ale doma déle než kdekoli jinde a doložené použití ze světa je bohaté:',
    dukazy: [
      {
        typ: 'cizi',
        text: 'Heathrow Airport použil eye tracking ke zlepšení orientace cestujících v Terminálu 5.',
        zdroj: 'Tobii',
      },
      {
        typ: 'cizi',
        text: 'OHB Sweden ho nasadil ve vesmírném průmyslu na kontrolu kvality, snížení lidské chyby a zaškolení.',
        zdroj: 'Tobii',
      },
      {
        typ: 'cizi',
        text: 'Tobii má pro letectví a kosmonautiku samostatnou řešenou oblast zaměřenou na situační povědomí a simulační výcvik.',
        zdroj: 'Tobii',
      },
    ],
    hranice: {
      nadpis: 'Nejsme certifikační ani letecká autorita',
      text: 'Nedodáváme podklady pro schvalovací řízení. Měříme lidský faktor: pozornost, zátěž, orientaci. Měření v ostrém provozu vždy závisí na souhlasu provozovatele a bezpečnostních pravidlech.',
    },
    faq: [
      {
        q: 'Umíte měřit v simulátoru?',
        a: 'Ano, mobilními brýlemi. Simulátor je pro tenhle typ měření ideální prostředí.',
      },
      {
        q: 'Dá se to použít pro hodnocení výcviku?',
        a: 'Ano, a je to jedno z nejsilnějších využití — rozdíl mezi skenem experta a nováčka je měřitelný a učitelný.',
      },
      {
        q: 'A dron nebo bezpilotní systémy?',
        a: 'Měření pozornosti a zátěže operátora ano. Vývoj ovládání pohledem neděláme.',
      },
    ],
    cta: { text: 'POJĎME TO PROBRAT →', href: '/kontakt' },
    zaver: {
      nadpis: ['KAM SE DÍVÁ', 'PILOT.'],
      text: 'Kokpit, řízení provozu i orientace na letišti — pojďme probrat, co potřebujete změřit.',
    },
    souvisejiciSluzby: ['field-research', 'eye-tracking', 'ux-research', 'test-packages'],
  },
];

// Segmenty v pořadí pro rozcestník i navigaci
export const segmentyByPoradi = [...segmenty].sort((a, b) => a.poradi - b.poradi);

export function getSegment(slug: string): Segment | undefined {
  return segmenty.find((s) => s.slug === slug);
}

// Sousední segmenty (předchozí / další dle pořadí) pro patičku detailu
export function sousedniSegmenty(slug: string): { prev?: Segment; next?: Segment } {
  const i = segmentyByPoradi.findIndex((s) => s.slug === slug);
  return {
    prev: i > 0 ? segmentyByPoradi[i - 1] : undefined,
    next: i >= 0 && i < segmentyByPoradi.length - 1 ? segmentyByPoradi[i + 1] : undefined,
  };
}

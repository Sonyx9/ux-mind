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
      /** Krátký, výrazný výsledek pro moderní kartu studie */
      vysledek?: string;
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
  /** true → štítek VLASTNÍ DATA; false → ZAHRANIČNÍ STUDIE */
  maVlastniData: boolean;
  metaTitle: string;
  metaDescription: string;
  schemaName?: string;
  schemaServiceType?: string;
  /** Řádky H1; koncová interpunkce posledního řádku se obarví modře */
  h1: string[];
  /** Nová vizuální struktura zapínaná postupně po jednotlivých segmentech */
  moderni?: boolean;
  heroNadpis?: string;
  /** Perex — odstavce */
  perex: string[];
  /** Info pás — vždy 4 dvojice [štítek, hodnota] */
  infoPas: [string, string][];
  /** Nadpis sekce „co měříme" (výchozí CO MĚŘÍME; univerzity mají CO NABÍZÍME) */
  coMerimeLabel?: string;
  /** Vždy 3 karty */
  coMerime: { nadpis: string; text: string }[];
  coMerimeNadpis?: string;
  rozsahy?: { nadpis: string; text: string; stitek: string; href: string }[];
  typickeNadpis?: string;
  vystupNadpis?: string;
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
    metaTitle: 'UX testování a eye tracking pro e-shopy | UX MIND',
    metaDescription:
      'UX audit, uživatelské testování a eye tracking pro e-shopy. Odhalte překážky na produktové stránce, v košíku a checkoutu a získejte konkrétní priority úprav.',
    h1: ['KOŠÍK', 'NELŽE.'],
    moderni: true,
    heroNadpis: 'Zjistěte, co zákazníkům brání dokončit nákup.',
    perex: [
      'Analytika ukáže, kde lidé z e-shopu odcházejí. Neřekne ale, zda nenašli správný produkt, nerozuměli dopravě, přehlédli důležitou informaci nebo se ztratili během objednávky.',
      'Podle cíle zvolíme rychlý UX audit, testování se skutečnými zákazníky nebo eye tracking. Dostanete konkrétní zjištění a priority pro produktové stránky, navigaci, košík i checkout.',
    ],
    infoPas: [
      ['DÉLKA', '2–6 týdnů'],
      ['OBLASTI', 'Listing · detail · checkout'],
      ['METODY', 'Audit · testování · eye tracking'],
      ['VÝSTUP', 'Priority · konkrétní doporučení'],
    ],
    coMerimeLabel: 'CO V NÁKUPNÍ CESTĚ OVĚŘÍME',
    coMerimeNadpis: 'Tři místa, kde se rozhoduje o nákupu',
    coMerime: [
      {
        nadpis: 'Výběr produktu',
        text: 'Ověříme, zda lidé rozumějí kategoriím, filtrům a řazení a dokážou najít vhodný produkt bez zbytečného hledání.',
      },
      {
        nadpis: 'Rozhodnutí na detailu',
        text: 'Zjistíme, zda zákazníci zaznamenají cenu, varianty, dostupnost, dopravu, recenze a informace potřebné k rozhodnutí.',
      },
      {
        nadpis: 'Košík a checkout',
        text: 'Odhalíme nejasné kroky, chybějící informace a překážky, které komplikují dokončení objednávky.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Rychlý UX audit',
        text: 'Expertní kontrola nákupní cesty bez respondentů. Vhodná, když potřebujete rychle najít hlavní problémy a určit první úpravy.',
        stitek: 'RYCHLÝ ZAČÁTEK',
        href: '/sluzby/ux-audit',
      },
      {
        nadpis: 'Uživatelské testování',
        text: 'Skuteční zákazníci plní nákupní úkoly. Sledujeme, zda se zorientují, kde chybují a kterým informacím nerozumějí.',
        stitek: 'OVĚŘENÍ CHOVÁNÍ',
        href: '/sluzby/testovani-uzivatelu',
      },
      {
        nadpis: 'Eye tracking a biometrie',
        text: 'Prémiové měření vizuální pozornosti a podle cíle také mentální zátěže nebo dalších reakcí. Pro porovnání variant a důležitá rozhodnutí.',
        stitek: 'MĚŘENÍ DO HLOUBKY',
        href: '/sluzby/eye-tracking',
      },
    ],
    typickeNadpis: 'Co má smysl na e-shopu prověřit',
    vystupNadpis: 'Jasné priority pro nákupní cestu',
    typickeZadani: [
      'Redesign e-shopu — ověřit novou verzi proti současné před nasazením',
      'Výběr šablony nebo platformy — porovnat kandidáty na stejných nákupních úkolech',
      'Produktová fotografie — zjistit, která podoba pomáhá výběru a rozhodnutí',
      'Košík a checkout — odhalit překážky při dokončení objednávky',
      'Kategorie a filtry — ověřit, zda zákazníci najdou vhodný produkt',
      'Bannery a promo bloky — zjistit, zda podporují nabídku, nebo odvádějí pozornost',
    ],
    coDostanete: [
      'Přehled problémů na klíčových místech nákupní cesty',
      'Zjištění doložená konkrétními situacemi a chováním zákazníků',
      'Podle rozsahu také heatmapy, záznamy pohledu a metriky pozornosti',
      'Priority úprav podle dopadu a náročnosti',
      'Srovnání variant, pokud je součástí zadání',
      'Konkrétní doporučení a společné předání výsledků',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        vysledek: 'Lifestyle prodloužil dobu úkolu',
        nadpis: 'Stejný produkt. Jinak dlouhé rozhodování.',
        text: 'Experiment porovnal čistý packshot s lifestyle fotografií. Typ fotografie statisticky významně ovlivnil dobu plnění úkolu — F(1,82) = 4,50; p = 0,037. Lifestyle varianta vedla v testovaném scénáři k delšímu času, rozdíl v subjektivním hodnocení se jednoznačně nepotvrdil.',
        metoda: 'Eye-tracking + UEQ · N = 84',
        odkaz: '/pripadove-studie/produktove-fotografie-e-commerce',
      },
      {
        typ: 'vlastni',
        vysledek: '60 z 61 našlo produkt',
        nadpis: 'Více informací v kartě výběr neurychlilo.',
        text: 'Při testování tří šablon Shoptetu se rozdíly ukázaly hlavně uvnitř produktových karet. Nejkomplexnější karta vyžadovala více fixací, celkový čas dokončení však nezkrátila.',
        metoda: 'Eye-tracking + VisAWI · N = 61',
        odkaz: '/pripadove-studie/sablony-e-shopu',
      },
    ],
    hranice: {
      nadpis: 'Výzkum odhalí překážku. Výsledek určí změna',
      text: 'Měření samo nezaručí vyšší konverzi. Ukáže, co zákazníkům komplikuje nákup a které úpravy mají největší smysl ověřit. Pokud je problém v ceně, sortimentu, dopravě nebo nabídce, řekneme to stejně otevřeně.',
    },
    faq: [
      {
        q: 'Jak poznáme, zda potřebujeme audit, testování nebo eye tracking?',
        a: 'Audit je vhodný pro rychlé expertní odhalení hlavních problémů. Uživatelské testování ověří nákupní cestu se skutečnými zákazníky. Eye tracking přidává přesné měření vizuální pozornosti a hodí se pro porovnání variant nebo rozhodnutí, která potřebujete podložit podrobnějšími daty.',
      },
      {
        q: 'Kolik účastníků je potřeba?',
        a: 'Počet závisí na cíli, počtu zákaznických skupin a na tom, zda hledáme problémy, nebo statisticky porovnáváme varianty. Vhodný vzorek navrhneme podle výzkumné otázky; jedno číslo neplatí pro každé zadání.',
      },
      {
        q: 'Jde měřit e-shop, který ještě není hotový?',
        a: 'Ano. Testujeme prototypy i wireframy — čím dřív, tím levnější je oprava.',
      },
      {
        q: 'Umíte to i pro mobilní verzi?',
        a: 'Ano. Mobilní nákupní cestu testujeme na telefonu a scénář přizpůsobíme tomu, jak zákazníci e-shop skutečně používají.',
      },
      {
        q: 'Čím se to liší od heatmap z Hotjaru?',
        a: 'Klikací a scrollovací heatmapy vycházejí z interakcí na webu. Eye tracking zaznamenává skutečný směr pohledu účastníka a ukáže také prvky, které viděl, ale neaktivoval. Výsledek vždy interpretujeme společně s úkolem a chováním zákazníka.',
      },
      {
        q: 'Jak dlouho testování e-shopu trvá a kolik stojí?',
        a: 'Podle zvoleného rozsahu nejčastěji 2–6 týdnů. Cena závisí na metodě, počtu účastníků, počtu testovaných cest a podobě výstupu. Po úvodním zadání připravíme konkrétní návrh i cenu.',
      },
      {
        q: 'Co od nás potřebujete?',
        a: 'Odkaz nebo přístup k e-shopu či prototypu, popis hlavních zákaznických skupin a nákupních cest. Pokud máte analytiku, záznamy podpory nebo předchozí výzkum, zapojíme je jako další kontext.',
      },
    ],
    cta: { text: 'POPTAT TESTOVÁNÍ E-SHOPU →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT BALÍČKY', href: '/sluzby#testovaci-balicky' },
    zaver: {
      nadpis: ['KDE VÁM', 'MIZÍ NÁKUP?'],
      text: 'Pošlete nám odkaz na e-shop a stručně popište, co potřebujete rozhodnout. Navrhneme, co má smysl prověřit a jaký rozsah bude stačit.',
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
    metaTitle: 'UX audit a testování webů a aplikací | UX MIND',
    metaDescription:
      'UX audit, uživatelské testování a eye tracking webů, portálů a aplikací. Ověřte navigaci, formuláře, obsah i klíčové úkoly a získejte priority úprav.',
    h1: ['VYPADÁ DOBŘE.', 'FUNGUJE?'],
    moderni: true,
    heroNadpis: 'Ověřte, zda lidé na webu zvládnou to, kvůli čemu přišli.',
    perex: [
      'Web může působit přehledně a přesto návštěvník nenajde službu, cenu, kontakt, formulář nebo volnou pozici. Interní tým zná jeho strukturu, skutečný uživatel ale přichází bez této výhody.',
      'Podle cíle zvolíme UX audit, testování se skutečnými uživateli nebo eye tracking. Ověříme důležité cesty a ukážeme, které úpravy pomohou orientaci, srozumitelnosti a dokončení úkolu.',
    ],
    infoPas: [
      ['DÉLKA', '2–6 týdnů'],
      ['OBLASTI', 'Navigace · obsah · formuláře'],
      ['METODY', 'Audit · testování · eye tracking'],
      ['VÝSTUP', 'Priority · konkrétní doporučení'],
    ],
    coMerimeLabel: 'CO NA WEBU OVĚŘÍME',
    coMerimeNadpis: 'Tři podmínky, aby web splnil svůj účel',
    coMerime: [
      {
        nadpis: 'Orientace a nalezení informací',
        text: 'Ověříme, zda lidé rozumějí navigaci a dokážou najít službu, cenu, dokument, kontakt nebo jiný důležitý obsah.',
      },
      {
        nadpis: 'Dokončení klíčového úkolu',
        text: 'Sledujeme cestu k poptávce, registraci, rezervaci, žádosti nebo jiné akci a odhalíme místa, která postup komplikují.',
      },
      {
        nadpis: 'Srozumitelnost a hierarchie',
        text: 'Zjistíme, zda lidé chápou názvy, texty a ovládací prvky a zda důležité sdělení nezaniká mezi méně podstatným obsahem.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Rychlý UX audit',
        text: 'Expertní kontrola webu, portálu nebo aplikace bez respondentů. Vhodná pro rychlé nalezení hlavních problémů a prvních úprav.',
        stitek: 'RYCHLÝ ZAČÁTEK',
        href: '/sluzby/ux-audit',
      },
      {
        nadpis: 'Uživatelské testování',
        text: 'Reální uživatelé plní důležité úkoly. Sledujeme, zda se zorientují, kde chybují a čemu nerozumějí.',
        stitek: 'OVĚŘENÍ CHOVÁNÍ',
        href: '/sluzby/testovani-uzivatelu',
      },
      {
        nadpis: 'Eye tracking a biometrie',
        text: 'Prémiové měření pozornosti a podle cíle také mentální zátěže nebo dalších reakcí. Pro porovnání variant a důležitá rozhodnutí.',
        stitek: 'MĚŘENÍ DO HLOUBKY',
        href: '/sluzby/eye-tracking',
      },
    ],
    typickeNadpis: 'Co má smysl na webu nebo v aplikaci prověřit',
    vystupNadpis: 'Jasné priority pro další úpravy',
    typickeZadani: [
      'Redesign webu nebo aplikace — ověřit návrh před nasazením',
      'Kariérní portál — zjistit, zda uchazeči najdou vhodnou pozici a dokončí reakci',
      'Poptávková cesta — odhalit překážky před odesláním formuláře nebo rezervace',
      'Klientský portál — ověřit registraci, přihlášení a samoobslužné úkoly',
      'Interní systém — zjednodušit často opakované pracovní postupy',
      'Landing page — zjistit, zda návštěvník pochopí nabídku a najde další krok',
      'Veřejný nebo informační web — prověřit orientaci a srozumitelnost pro různé skupiny',
      'Dvě varianty návrhu — porovnat je na stejných úkolech místo interního hlasování',
    ],
    coDostanete: [
      'Přehled problémů na klíčových uživatelských cestách',
      'Zjištění doložená konkrétními situacemi a chováním uživatelů',
      'Podle rozsahu úspěšnost úkolů, čas, chybovost nebo metriky pozornosti',
      'Priority úprav podle dopadu a náročnosti',
      'Srovnání variant nebo současné a nové verze, pokud je součástí zadání',
      'Konkrétní doporučení a společné předání výsledků',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        vysledek: '4 z 10 nenašli volné pozice',
        nadpis: '40 % uchazečů nenašlo cestu k volným pozicím. Web přitom „vypadal přehledně".',
        text: 'Kariérní portál ŠKODA AUTO — eye-tracking se scénářem „najděte volné pozice" ukázal, že subjektivní hodnocení přehlednosti neodpovídá schopnosti splnit úkol. A/B porovnání plovoucího CTA přineslo měřitelné rozdíly ve fixačních metrikách i délce návštěvy. Výsledkem bylo zjednodušení cesty k pozicím a přestavba navigace.',
        metoda: 'Eye-tracking + dotazník · N = 102',
        odkaz: '/pripadove-studie/karierni-portal-automotive',
      },
      {
        typ: 'vlastni',
        vysledek: 'Dlouhý odstavec zaznamenala třetina',
        nadpis: 'Čím delší text, tím méně pozornosti.',
        text: 'AOI analýza odhalila gradient pozornosti: výrazný nadpis zaznamenalo přibližně 86 % respondentů, krátký návazný text 62 % a dlouhý odstavec 33 %. Výsledky podpořily zvýraznění primárního CTA a zkrácení dlouhých bloků.',
        metoda: 'Eye-tracking, AOI analýza · cca 120 respondentů',
        odkaz: '/pripadove-studie/backend-stories',
      },
    ],
    hranice: {
      nadpis: 'Výzkum ukáže, co změnit. Realizace může zůstat u vašeho týmu',
      text: 'Weby ani aplikace neprogramujeme. Dodáme nezávislá zjištění, priority a doporučení, se kterými může pracovat váš interní tým nebo současný dodavatel. Pokud problém není v rozhraní, ale v nabídce, obsahu nebo procesu, řekneme to otevřeně.',
    },
    faq: [
      {
        q: 'Jak poznáme, zda potřebujeme audit, testování nebo eye tracking?',
        a: 'Audit je vhodný pro rychlou expertní kontrolu. Uživatelské testování ověří důležité úkoly se skutečnými uživateli. Eye tracking přidává přesné měření vizuální pozornosti a hodí se pro porovnání variant nebo rozhodnutí, která potřebujete podložit podrobnějšími daty.',
      },
      {
        q: 'Kolik účastníků je potřeba?',
        a: 'Počet závisí na cíli, počtu uživatelských skupin a na tom, zda hledáme problémy, nebo porovnáváme varianty. Vhodný vzorek navrhneme podle výzkumné otázky; jedno číslo neplatí pro každé zadání.',
      },
      {
        q: 'Můžeme testovat web, který ještě není hotový?',
        a: 'Ano. Testujeme hotové weby a aplikace i klikací prototypy. Ověření před vývojem umožní upravit problematická místa dříve, než se promítnou do hotového řešení.',
      },
      {
        q: 'Máme hotový návrh od dodavatele. Můžete jej nezávisle ověřit?',
        a: 'Ano. Návrh posoudíme podle stejných kritérií bez ohledu na to, kdo jej vytvořil. Výsledky předáme tak, aby s nimi mohl váš dodavatel nebo interní tým dál pracovat.',
      },
      {
        q: 'Umíte posoudit přístupnost?',
        a: 'Dokážeme při auditu a testování odhalit řadu praktických bariér. Formální audit shody s WCAG je ale samostatná disciplína; uživatelské testování jej může doplnit, nikoliv nahradit.',
      },
      {
        q: 'Čím se to liší od Hotjaru nebo Google Analytics?',
        a: 'Analytika ukazuje, co se na webu stalo a ve kterém kroku lidé odešli. Uživatelské testování pomáhá vysvětlit překážky při plnění úkolu a eye tracking může navíc změřit, kam se lidé dívali a co přehlédli.',
      },
      {
        q: 'Testujete i mobilní verzi?',
        a: 'Ano. Mobilní weby a aplikace testujeme na telefonu a scénář přizpůsobujeme způsobu, jakým se produkt skutečně používá.',
      },
      {
        q: 'Jak dlouho testování webu trvá a kolik stojí?',
        a: 'Podle zvoleného rozsahu nejčastěji 2–6 týdnů. Cena závisí na metodě, počtu účastníků, počtu testovaných cest a podobě výstupu. Po úvodním zadání připravíme konkrétní návrh i cenu.',
      },
      {
        q: 'Co od nás potřebujete?',
        a: 'Odkaz nebo přístup k webu, aplikaci či prototypu, popis cílových skupin a hlavních úkolů. Pokud máte analytiku, data podpory nebo předchozí výzkum, zapojíme je jako další kontext.',
      },
    ],
    cta: { text: 'POPTAT TESTOVÁNÍ WEBU →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT BALÍČKY', href: '/sluzby#testovaci-balicky' },
    zaver: {
      nadpis: ['VYPADÁ DOBŘE.', 'FUNGUJE?'],
      text: 'Pošlete nám odkaz na web, aplikaci nebo prototyp a stručně popište, co potřebujete rozhodnout. Navrhneme, co má smysl prověřit a jaký rozsah bude stačit.',
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
    metaTitle: 'Eye tracking ve sportu a na stadionech | UX MIND',
    metaDescription:
      'Mobilní eye tracking na stadionech, při sportovních akcích i u přenosu. Změřte pozornost ke sponzorským plochám, kampaním a prvkům divácké cesty.',
    schemaName: 'Eye tracking a terénní výzkum ve sportu',
    schemaServiceType: 'Mobilní eye tracking, terénní výzkum a měření sportovního sponzoringu',
    h1: ['POZORNOST', 'SE PRODÁVÁ.'],
    moderni: true,
    heroNadpis: 'Změřte skutečnou viditelnost značek i divácký zážitek.',
    perex: [
      'Návštěvnost, televizní čas a počet zobrazení popisují příležitost značku vidět. Neříkají ale, zda se na sponzorskou plochu divák skutečně podíval a které umístění získalo více pozornosti.',
      'Mobilní eye tracking na stadionu nebo laboratorní měření přenosu a kampaní ukáže, co lidé zaznamenají, kdy a na jak dlouho. Výsledky lze využít při práci se sponzory, plánování reklamy i zlepšování návštěvnické cesty.',
    ],
    infoPas: [
      ['DÉLKA', '3–8 týdnů'],
      ['MĚŘENÍ', 'Mobilní eye tracking · pozorování'],
      ['PROSTŘEDÍ', 'Stadion, přenos, laboratoř'],
      ['VÝSTUP', 'Srovnání pozornosti · doporučení'],
    ],
    coMerimeLabel: 'CO VE SPORTU ZMĚŘÍME',
    coMerimeNadpis: 'Pozornost ke značce i celá cesta diváka',
    coMerime: [
      {
        nadpis: 'Viditelnost sponzorských ploch',
        text: 'Porovnáme mantinely, LED pásy, dresy, obrazovky a další umístění podle toho, zda a jak dlouho získají pozornost diváků.',
      },
      {
        nadpis: 'Diváckou cestu a provoz',
        text: 'Sledujeme orientaci v areálu, vstup, cestu k sektoru, informační systém, občerstvení a další místa, která ovlivňují návštěvu.',
      },
      {
        nadpis: 'Kampaně a přenosy',
        text: 'Ověříme billboardy, plakáty, digitální vizuály nebo sportovní přenos a zjistíme, zda lidé zaznamenají značku i hlavní sdělení.',
      },
      {
        nadpis: 'Pozornost při sportovním výkonu',
        text: 'U vhodných výzkumných projektů lze sledovat pohled sportovce během tréninku nebo konkrétní herní situace.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Test kampaně nebo vizuálu',
        text: 'Laboratorní porovnání návrhů před výrobou nebo nasazením. Vhodné pro billboardy, sponzorské vizuály, video a digitální kampaně.',
        stitek: 'KREATIVA A PŘENOS',
        href: '/sluzby/eye-tracking',
      },
      {
        nadpis: 'Terénní studie na stadionu',
        text: 'Mobilní eye tracking během skutečné návštěvy. Pro viditelnost ploch, orientaci, provoz a návštěvnickou cestu.',
        stitek: 'REÁLNÉ PROSTŘEDÍ',
        href: '/sluzby/terenni-mereni',
      },
      {
        nadpis: 'Kombinované vyhodnocení',
        text: 'Propojení pozornosti, pozorování, dotazníků a dalších dat podle rozhodnutí klubu, sponzora nebo agentury.',
        stitek: 'STUDIE NA MÍRU',
        href: '/kontakt',
      },
    ],
    typickeNadpis: 'Co lze na stadionu, v přenosu i kampani prověřit',
    vystupNadpis: 'Data použitelná pro klub i sponzora',
    typickeZadani: [
      'Porovnání viditelnosti mantinelů, LED pásů, dresů a dalších ploch',
      'Podklady pro plánování a odstupňování sponzorských balíčků',
      'Ověření sponzorského plnění z pohledu skutečné pozornosti',
      'Test kampaně na návštěvnost před výrobou a nasazením',
      'Orientace návštěvníků, vstup, cesta k sektoru a občerstvení',
      'Pozornost ke značkám během televizního nebo streamového přenosu',
      'Web, aplikace, nákup vstupenek a klubový e-shop',
      'Výzkumné měření pohledu sportovce v konkrétní situaci',
    ],
    coDostanete: [
      'Záznam pohledu diváka v kontextu zápasu nebo návštěvnické cesty',
      'Srovnání pozornosti mezi sledovanými plochami, pozicemi nebo variantami',
      'Mapa klíčových momentů podle fáze utkání, přenosu nebo průchodu areálem',
      'Heatmapy a metriky pozornosti u kampaní a vizuálů',
      'Konkrétní doporučení pro umístění, kreativní zpracování nebo provoz stadionu',
      'Srozumitelné předání výsledků pro klub, sponzora nebo agenturu',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        vysledek: '16 návrhů. 79 účastníků.',
        nadpis: 'Prvních šest míst patřilo černým billboardům.',
        text: 'Fotbalový klub vybíral z 16 návrhů kampaně. Všech šest nejlépe hodnocených variant mělo černé pozadí, samotné fixační metriky však výsledné pořadí nevysvětlily.',
        metoda: 'Eye-tracking + hodnotící dotazník · N = 79 · 16 stimulů á 10 s',
        odkaz: '/pripadove-studie/billboardy-sport-marketing',
      },
      {
        typ: 'vlastni',
        vysledek: 'Měření během skutečného utkání',
        nadpis: 'Mobilní eye tracking jsme nasadili přímo na stadionu.',
        text: 'Sběr během utkání zachytil pohled diváka v přirozeném kontextu tribun, hry, sponzorských ploch a okolního provozu. Tento typ studie umožňuje propojit pozornost s konkrétní fází návštěvy i zápasu.',
        metoda: 'Mobilní eye tracking · terénní studie',
      },
    ],
    hranice: {
      nadpis: 'Pozornost není totéž co mediální hodnota',
      text: 'Eye tracking změří, zda a jak dlouho plocha získala pozornost vybraných účastníků. Sám neurčí její cenu ani obchodní návratnost. Výsledky lze spojit s návštěvností, sledovaností a obchodními daty, ale nenahrazují je. U terénní studie také vždy otevřeně popíšeme, na jakou populaci lze závěry přenést.',
    },
    faq: [
      {
        q: 'Co přesně lze u sponzorských ploch změřit?',
        a: 'Lze sledovat, zda se účastník na plochu podíval, jak dlouho jí věnoval pozornost a v jaké části zápasu nebo návštěvy k tomu došlo. Jednotlivá umístění lze porovnat podle stejného protokolu.',
      },
      {
        q: 'Kolik diváků potřebujete změřit?',
        a: 'Počet závisí na počtu porovnávaných ploch, skupin diváků a na tom, zda hledáme orientační vzorce, nebo potřebujeme robustnější srovnání. Vzorek navrhneme až podle výzkumné otázky a podmínek stadionu.',
      },
      {
        q: 'Nebude to divákům vadit?',
        a: 'Každé pozorování může chování do určité míry ovlivnit. Používáme lehké brýle, účastníkům necháváme čas si na ně zvyknout a pracujeme pouze s dobrovolníky s informovaným souhlasem.',
      },
      {
        q: 'Jde měřit i televizní přenos?',
        a: 'Ano. Přenos lze testovat v laboratoři nad záznamem nebo podle podmínek také živě. Zjistíme, jak se pozornost dělí mezi hru, grafiku, značky a další prvky obrazu.',
      },
      {
        q: 'Jak mohou výsledky využít klub a sponzor?',
        a: 'Klub získá podklad pro plánování umístění a struktury sponzorských balíčků. Sponzor může porovnat pozice a upravit kreativní zpracování. Obě strany dostanou stejná data o pozornosti, nikoliv automatický výpočet ceny plochy.',
      },
      {
        q: 'Umíte prověřit také orientaci a služby na stadionu?',
        a: 'Ano. Terénní studie může sledovat vstup, cestu k sektoru, informační značení, občerstvení, toalety, fan zóny nebo odchod z areálu. Metody volíme podle konkrétní návštěvnické cesty.',
      },
      {
        q: 'Umíte měřit i hráče, ne jen diváky?',
        a: 'Technicky lze mobilní eye tracking využít i při vybraných tréninkových a výzkumných situacích. Návrh vždy závisí na bezpečnosti, pravidlech sportu a otázce, kterou potřebujete ověřit.',
      },
      {
        q: 'Jak dlouho studie trvá a kolik stojí?',
        a: 'Nejčastěji 3–8 týdnů podle počtu lokalit, utkání, účastníků a analyzovaných ploch. Po úvodním zadání a seznámení s prostředím připravíme konkrétní harmonogram i cenu.',
      },
      {
        q: 'Jak řešíte souhlas a soukromí na stadionu?',
        a: 'Studii koordinujeme s provozovatelem a každý účastník podepisuje informovaný souhlas. Zachycené osoby a citlivé informace chráníme podle předem dohodnutého datového protokolu.',
      },
    ],
    cta: { text: 'POPTAT MĚŘENÍ POZORNOSTI →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT TERÉNNÍ MĚŘENÍ', href: '/sluzby/terenni-mereni' },
    zaver: {
      nadpis: ['POZORNOST', 'SE PRODÁVÁ.'],
      text: 'Popište nám stadion, akci, přenos nebo kampaň a rozhodnutí, které potřebujete udělat. Navrhneme, co lze spolehlivě změřit a jaký rozsah studie bude potřeba.',
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
    metaTitle: 'UX výzkum a eye tracking pro automotive | UX MIND',
    metaDescription:
      'UX výzkum, uživatelské testování a eye tracking pro automotive. Digitální produkty, konfigurátory, showroomy, HMI i pracovní postupy v laboratoři a terénu.',
    schemaName: 'UX výzkum a eye tracking pro automotive',
    schemaServiceType: 'UX výzkum, uživatelské testování, laboratorní a mobilní eye tracking pro automotive',
    h1: ['POZORNOST', 'ZA VOLANTEM', 'I PŘED NÍM.'],
    moderni: true,
    heroNadpis: 'Ověřte digitální rozhraní, showroom i pracovní postupy.',
    perex: [
      'Zkušenost se značkou vzniká na kariérním webu, v konfigurátoru, zákaznickém portálu, showroomu, vozidle i servisním nebo výrobním prostředí. Každé z těchto míst klade na člověka jiné nároky.',
      'Podle cíle kombinujeme UX audit, uživatelské testování, laboratorní eye tracking a terénní výzkum. Zjišťujeme, zda se lidé zorientují, zaznamenají důležité informace a bezpečně zvládnou konkrétní úkol v podmínkách, které lze pro výzkum odpovědně vytvořit.',
    ],
    infoPas: [
      ['DÉLKA', '3–8 týdnů'],
      ['PROSTŘEDÍ', 'Laboratoř · showroom · pracoviště'],
      ['METODY', 'Testování · eye tracking · pozorování'],
      ['VÝSTUP', 'Zjištění · priority · doporučení'],
    ],
    coMerimeLabel: 'CO V AUTOMOTIVE OVĚŘÍME',
    coMerimeNadpis: 'Od digitální cesty po skutečné prostředí',
    coMerime: [
      {
        nadpis: 'Nábor a digitální služby',
        text: 'Kariérní weby, zákaznické portály, servisní objednávky a další cesty, ve kterých musí člověk najít informace a dokončit úkol.',
      },
      {
        nadpis: 'Konfigurátory a složité volby',
        text: 'Ověříme, zda zákazník rozumí variantám, výbavám, cenám a návazným krokům a kde se během konfigurace ztrácí.',
      },
      {
        nadpis: 'Showroom a zákaznická cesta',
        text: 'Mobilní měření ukáže, čeho si návštěvník všimne, jak pracuje s vozem a materiály a kde potřebuje podporu prodejce.',
      },
      {
        nadpis: 'HMI a pracovní postupy',
        text: 'V bezpečných a předem dohodnutých podmínkách sledujeme orientaci v rozhraní, čitelnost informací a průběh servisního nebo výrobního úkolu.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Digitální audit a testování',
        text: 'Pro kariérní web, konfigurátor, klientský portál, servisní rezervaci nebo jiný digitální produkt. Od rychlé kontroly po test se skutečnými uživateli.',
        stitek: 'DIGITÁLNÍ PRODUKTY',
        href: '/sluzby/testovani-uzivatelu',
      },
      {
        nadpis: 'Laboratorní eye tracking',
        text: 'Pro přesné měření vizuální pozornosti na obrazovce, prototypu, ovládacím panelu nebo bezpečně připraveném HMI scénáři.',
        stitek: 'ŘÍZENÉ PODMÍNKY',
        href: '/sluzby/eye-tracking',
      },
      {
        nadpis: 'Terénní studie',
        text: 'Pro showroom, servisní nebo výrobní pracoviště a další prostředí, kde rozhoduje pohyb, okolní provoz a fyzická interakce.',
        stitek: 'REÁLNÉ PROSTŘEDÍ',
        href: '/sluzby/terenni-mereni',
      },
    ],
    typickeNadpis: 'Co lze v automotive prověřit',
    vystupNadpis: 'Výsledky pro digitální i fyzické prostředí',
    typickeZadani: [
      'Kariérní portál — zda uchazeč najde vhodnou pozici a dokončí reakci',
      'Konfigurátor vozu — orientace ve výbavách, cenách a návazných krocích',
      'Zákaznická zóna — registrace, servisní objednávka a samoobslužné úkoly',
      'Showroom — pozornost k vozům, prvkům prezentace a informačním materiálům',
      'HMI nebo ovládací panel — čitelnost, hierarchie a dokončení simulovaného úkolu',
      'Servisní a výrobní pracoviště — orientace, bezpečnostní informace a pracovní postup',
      'Porovnání variant — ověření návrhů před širším vývojem nebo nasazením',
      'Návaznost kanálů — přechod mezi webem, prodejcem, showroomem a servisem',
    ],
    coDostanete: [
      'Zjištění doložená konkrétními úkoly, situacemi a chováním účastníků',
      'Podle rozsahu úspěšnost, čas, chybovost, záznam pohledu nebo metriky pozornosti',
      'Srovnání variant, pokud je součástí návrhu studie',
      'Priority problémů podle dopadu a podmínek použití',
      'Konkrétní doporučení pro rozhraní, prostředí nebo pracovní postup',
      'Společné předání výsledků internímu týmu a zapojeným dodavatelům',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        vysledek: '4 z 10 nenašli volné pozice',
        nadpis: '40 % uchazečů nenašlo cestu k volným pozicím. Web přitom „vypadal přehledně".',
        text: 'Kariérní portál ŠKODA AUTO — eye-tracking se scénářem „najděte volné pozice" ukázal, že subjektivní hodnocení přehlednosti neodpovídá schopnosti splnit úkol. A/B porovnání plovoucího CTA přineslo měřitelné rozdíly ve fixačních metrikách i délce návštěvy. Výsledkem bylo zjednodušení cesty k pozicím a přestavba navigace.',
        metoda: 'Eye-tracking + dotazník · N = 102',
        odkaz: '/pripadove-studie/karierni-portal-automotive',
      },
    ],
    hranice: {
      nadpis: 'UX výzkum nenahrazuje homologaci ani bezpečnostní zkoušku',
      text: 'Neměříme řidiče v běžném provozu na veřejné komunikaci a nevydáváme certifikaci podle automobilových norem. Pracujeme s digitálními produkty, prototypy, prostředím a bezpečně připravenými scénáři. Rozsah vždy přizpůsobíme riziku, podmínkám provozu a tomu, co lze z výsledků odpovědně vyvodit.',
    },
    faq: [
      {
        q: 'Co lze v automotive pomocí UX výzkumu ověřit?',
        a: 'Digitální produkty, konfigurátory, kariérní weby, zákaznické portály, showroomy, informační materiály i vybrané HMI a pracovní postupy. Metodu a prostředí volíme podle konkrétního rozhodnutí.',
      },
      {
        q: 'Umíte měřit přímo ve výrobě, servisu nebo showroomu?',
        a: 'Ano, pokud lze vytvořit bezpečné podmínky a měření schválí provozovatel. Podle cíle používáme pozorování, video, rozhovory nebo mobilní eye-trackingové brýle.',
      },
      {
        q: 'Můžeme testovat prototyp, který ještě není venku?',
        a: 'Ano. Testujeme klikací prototypy, obrazovkové návrhy, fyzické modely i bezpečně připravené scénáře. Včasné ověření umožní upravit problém před širším vývojem nebo nasazením.',
      },
      {
        q: 'Měříte řidiče během jízdy na veřejné komunikaci?',
        a: 'Ne. Takové měření vyžaduje specializované bezpečnostní, právní a homologační podmínky. Pro UX výzkum pracujeme s laboratorními, simulovanými nebo jinak bezpečně kontrolovanými scénáři.',
      },
      {
        q: 'Jak řešíte NDA a citlivá data?',
        a: 'Rozsah přístupů, záznamů, anonymizace a uchování dat nastavujeme před zahájením projektu. Výsledky ani případovou studii nezveřejňujeme bez předchozího souhlasu.',
      },
      {
        q: 'Kolik účastníků je potřeba?',
        a: 'Počet závisí na výzkumné otázce, počtu cílových skupin, prostředí a na tom, zda hledáme problémy, nebo porovnáváme varianty. Vzorek navrhneme podle požadovaného typu závěru.',
      },
      {
        q: 'Jak dlouho automotive studie trvá a kolik stojí?',
        a: 'Nejčastěji 3–8 týdnů. Rozsah ovlivňuje prostředí, bezpečnostní příprava, nábor účastníků, počet variant a požadované výstupy. Po úvodním zadání připravíme harmonogram i cenu.',
      },
      {
        q: 'Může se do výzkumu zapojit náš vývojový tým nebo dodavatel?',
        a: 'Ano. Na začátku společně upřesníme otázky a omezení a při předání výsledků projdeme priority tak, aby je bylo možné převést do vývoje, designu nebo provozu.',
      },
    ],
    cta: { text: 'POPTAT AUTOMOTIVE STUDII →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT TERÉNNÍ MĚŘENÍ', href: '/sluzby/terenni-mereni' },
    zaver: {
      nadpis: ['POZORNOST', 'ROZHODUJE.'],
      text: 'Popište nám produkt, prostředí nebo pracovní postup a rozhodnutí, které potřebujete udělat. Navrhneme bezpečný a metodicky odpovídající rozsah studie.',
    },
    souvisejiciSluzby: ['user-testing', 'field-research', 'eye-tracking', 'test-packages'],
  },

  // ── 10. Univerzity, výzkum a vzdělávání ──────────────────────
  {
    slug: 'univerzity-a-vyzkum',
    poradi: 10,
    nazev: 'Univerzity, výzkum a vzdělávání',
    nazevKratky: 'Univerzity a výzkum',
    bolest: 'Dobrá data začínají výzkumnou otázkou a promyšleným protokolem.',
    maVlastniData: true,
    moderni: true,
    metaTitle: 'Eye tracking pro univerzity a výzkum | UX MIND',
    metaDescription:
      'Metodická spolupráce, pilotáž a sběr eye-trackingových a biometrických dat pro univerzity, výzkumné týmy a vzdělávání.',
    schemaName: 'Eye tracking a metodická spolupráce pro univerzity a výzkum',
    schemaServiceType:
      'Metodická spolupráce, eye tracking, biometrické měření a sběr dat pro akademický výzkum',
    h1: ['OD OTÁZKY', 'K DATŮM.'],
    heroNadpis: 'Metodická spolupráce, technologie a sběr dat pro akademické projekty.',
    perex: [
      'Pomáháme převést výzkumnou otázku do proveditelné studie. Společně vyjasníme proměnné, úkoly, vzorek, prostředí, metriky a podobu dat ještě před zahájením sběru.',
      'Využíváme zázemí laboratoře FIMEYELAB na Fakultě informatiky a managementu Univerzity Hradec Králové. Podle projektu zajistíme pilotáž, obsluhu techniky, sběr dat nebo metodickou spolupráci v širším výzkumném týmu.',
    ],
    infoPas: [
      ['ROZSAH', 'Podle projektu'],
      ['ZÁZEMÍ', 'FIMEYELAB · FIM UHK'],
      ['METODY', 'Eye tracking · biometrie · testování'],
      ['VÝSTUP', 'Protokol · data · interpretace'],
    ],
    coMerimeLabel: 'CO NABÍZÍME',
    coMerimeNadpis: 'Podpora v jednotlivých fázích výzkumu',
    coMerime: [
      {
        nadpis: 'Návrh a pilotáž studie',
        text: 'Pomůžeme převést otázku do scénáře, zvolit vhodné metriky a ověřit, zda protokol i technika fungují před hlavním sběrem.',
      },
      {
        nadpis: 'Laboratorní sběr dat',
        text: 'Zajistíme připravené pracoviště, kalibraci, obsluhu zařízení a konzistentní průběh měření podle dohodnutého protokolu.',
      },
      {
        nadpis: 'Výzkum v reálném prostředí',
        text: 'Mobilní eye tracking a další metody umožní sledovat úkol v učebně, provozu, veřejném prostoru nebo jiném relevantním kontextu.',
      },
      {
        nadpis: 'Zpracování a interpretace',
        text: 'Připravíme dohodnuté exporty, metriky a dokumentaci sběru. Rozsah analýzy i odpovědnost jednotlivých partnerů stanovíme předem.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Potřebujete konzultovat návrh',
        text: 'Projdeme výzkumnou otázku, design studie, technické možnosti a limity plánovaného měření.',
        stitek: 'METODICKÁ KONZULTACE',
        href: '/kontakt',
      },
      {
        nadpis: 'Potřebujete zajistit sběr dat',
        text: 'Připravíme pracoviště, pilotáž a sběr podle schváleného protokolu v laboratoři nebo vhodném terénu.',
        stitek: 'MĚŘENÍ',
        href: '/sluzby/eye-tracking',
      },
      {
        nadpis: 'Hledáte partnera pro celý projekt',
        text: 'Zapojíme se do návrhu, realizace a interpretace v předem dohodnuté roli a s jasně rozdělenými výstupy.',
        stitek: 'VÝZKUMNÁ SPOLUPRÁCE',
        href: '/sluzby/ux-vyzkum',
      },
    ],
    typickeNadpis: 'S čím se na nás můžete obrátit',
    typickeZadani: [
      'Výzkumný projekt s eye-trackingovou nebo biometrickou částí',
      'Pilotní studie před hlavním sběrem nebo grantovým projektem',
      'Diplomová či disertační práce vyžadující specializované měření',
      'Sběr dat podle již připraveného výzkumného protokolu',
      'Konzultace metrik, oblastí zájmu a podoby datových exportů',
      'Mobilní měření mimo laboratoř',
      'Praktická výuka výzkumných metod a práce s technologií',
      'Konzultace při návrhu eye-trackingového pracoviště',
    ],
    vystupNadpis: 'Předem dohodnutý výstup a odpovědnosti',
    coDostanete: [
      'Návrh nebo revizi protokolu v dohodnutém rozsahu',
      'Pilotáž a záznam podmínek měření',
      'Surová data a exporty v předem domluvených formátech',
      'Popis zařízení, postupu, kalibrace a zpracování dat',
      'Výpočet vybraných metrik, pokud je součástí zadání',
      'Konzultaci interpretace a transparentně popsané limity',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        nadpis: 'EMLI vznikl v akademickém výzkumu na FIM UHK.',
        vysledek: 'Publikovaná metodika ve fázi dalšího ověřování.',
        text: 'Model Eye-tracking Mental Load Index vznikl v disertační práci Jana Petružálka (2023). Spojuje vybrané eye-trackingové metriky do jednoho indexu mentální zátěže. Používáme ho pouze tehdy, když odpovídá výzkumné otázce, a ve výstupu vždy uvádíme jeho současné limity.',
        metoda: 'Petružálek, 2023 · disertační práce · FIM UHK',
      },
    ],
    hranice: {
      nadpis: 'Technologie nezachrání nevhodně navrženou studii',
      text: 'Eye tracking ani biometrie nejsou univerzální odpověď. Pokud metoda neodpovídá výzkumné otázce nebo dostupný design neumožňuje bezpečnou interpretaci, doporučíme změnu postupu. Sběr dat také sám o sobě nezaručuje publikovatelnost ani přijetí výstupu v recenzním řízení.',
    },
    faq: [
      {
        q: 'Můžeme přijít s hotovým výzkumným protokolem?',
        a: 'Ano. Před realizací ho společně projdeme z hlediska technické proveditelnosti, kalibrace, časování, exportů a podmínek měření. Odbornou odpovědnost za výzkumný design si rozdělíme předem.',
      },
      {
        q: 'Můžeme data analyzovat sami?',
        a: 'Ano. Před sběrem si odsouhlasíme formáty, strukturu exportů, označení událostí a dokumentaci, kterou k datům potřebujete. Rozsah následného zpracování může zůstat na vašem týmu.',
      },
      {
        q: 'Lze využít pouze laboratoř a techniku?',
        a: 'Podle projektu zajistíme pracoviště i vyškolenou obsluhu. Samostatné zapůjčení zařízení řešíme individuálně; u specializovaného měření běžně doporučujeme zapojení operátora kvůli kvalitě a srovnatelnosti dat.',
      },
      {
        q: 'Umíte měřit i mimo laboratoř?',
        a: 'Ano. Mobilní eye tracking a další terénní metody lze použít v učebně, provozu, veřejném prostoru nebo jiném relevantním prostředí, pokud jsou splněny technické, etické a bezpečnostní podmínky.',
      },
      {
        q: 'Pomůžete s etikou a informovaným souhlasem?',
        a: 'Pomůžeme připravit popis měření, práci se záznamem a podklady pro informovaný souhlas. Za schválení projektu a splnění pravidel příslušné instituce odpovídá výzkumný tým a jeho pracoviště.',
      },
      {
        q: 'Děláte spoluautorství na publikacích?',
        a: 'Podle skutečného rozsahu odborného zapojení a pravidel autorství. Role, očekávané výstupy, nakládání s daty i způsob uvedení spolupráce domlouváme před zahájením projektu.',
      },
      {
        q: 'Je EMLI vhodný pro každý projekt?',
        a: 'Ne. EMLI je doplňková interpretační metoda pro vhodně navržená eye-trackingová měření. Je ve fázi dalšího ověřování a nenahrazuje ostatní ukazatele ani standardizované metody hodnocení mentální zátěže.',
      },
      {
        q: 'Lze spolupráci zahrnout do grantového projektu?',
        a: 'Ano. Pomůžeme vymezit plánované činnosti, techniku, předpokládaný rozsah měření a výstupy tak, aby je bylo možné zapracovat do návrhu projektu nebo rozpočtu.',
      },
      {
        q: 'Jak dlouho příprava a měření trvají?',
        a: 'Záleží na designu, počtu účastníků, prostředí a připravenosti podkladů. Menší pilot lze připravit v řádu týdnů, rozsáhlejší projekt plánujeme podle harmonogramu výzkumného týmu.',
      },
    ],
    cta: { text: 'PROBRAT VÝZKUMNÝ PROJEKT →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT EYE TRACKING', href: '/sluzby/eye-tracking' },
    zaver: {
      nadpis: ['OD OTÁZKY', 'K DATŮM.'],
      text: 'Pošlete nám výzkumnou otázku, představu o vzorku a prostředí měření. Navrhneme, kde dává naše metodika a technické zázemí smysl.',
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
    metaTitle: 'Eye tracking v dopravě a veřejném prostoru | UX MIND',
    metaDescription:
      'Terénní výzkum a mobilní eye tracking pro dopravu a města. Ověřte orientační systémy, informace pro cestující, veřejný prostor a řídicí rozhraní.',
    schemaName: 'Terénní výzkum a eye tracking pro dopravu a města',
    schemaServiceType: 'Mobilní eye tracking, UX výzkum a testování orientačních a informačních systémů',
    h1: ['VŠIMNOU SI', 'VČAS?'],
    moderni: true,
    heroNadpis: 'Ověřte, zda značení a informace fungují během skutečného pohybu.',
    perex: [
      'V dopravě a veřejném prostoru se lidé rozhodují za pohybu, pod časovým tlakem a mezi mnoha dalšími podněty. Informace může být formálně správná a přesto přijít pozdě, zaniknout nebo člověka zavést jinam.',
      'Terénní výzkum propojí trasu, chování a podle cíle také mobilní eye tracking. Ukáže, kde lidé hledají, které prvky zaznamenají a co jim komplikuje cestu, přestup nebo obsluhu informačního systému.',
    ],
    infoPas: [
      ['DÉLKA', '3–8 týdnů'],
      ['PROSTŘEDÍ', 'Terminál · zastávka · veřejný prostor'],
      ['METODY', 'Pozorování · testování · mobilní eye tracking'],
      ['VÝSTUP', 'Trasy · zjištění · doporučení'],
    ],
    coMerimeLabel: 'CO V DOPRAVĚ A MĚSTĚ OVĚŘÍME',
    coMerimeNadpis: 'Informace musí přijít ve správný okamžik',
    coMerime: [
      {
        nadpis: 'Orientaci a trasu',
        text: 'Zjistíme, kde lidé hledají další krok, mění směr, vracejí se nebo potřebují pomoc při cestě k cíli.',
      },
      {
        nadpis: 'Značení a informace',
        text: 'Ověříme, zda cestující, chodec nebo návštěvník zaznamená tabuli, mapu, výstrahu či označení v okamžiku, kdy je potřebuje.',
      },
      {
        nadpis: 'Odbavení a digitální rozhraní',
        text: 'Testujeme automaty, displeje, jízdní řády, mobilní aplikace a další rozhraní spojená s cestou nebo službou.',
      },
      {
        nadpis: 'Řídicí a dohledová pracoviště',
        text: 'V bezpečných podmínkách sledujeme, jak operátor pracuje s informacemi, výstrahami a opakovanými úkoly.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Test návrhu před realizací',
        text: 'Ověření mapy, značení, automatu nebo informačního rozhraní na prototypu či vizualizaci dříve, než vznikne finální řešení.',
        stitek: 'NÁVRH A PROTOTYP',
        href: '/sluzby/testovani-uzivatelu',
      },
      {
        nadpis: 'Terénní studie cesty',
        text: 'Pozorování a podle cíle mobilní eye tracking během skutečného průchodu terminálem, areálem nebo veřejným prostorem.',
        stitek: 'REÁLNÉ PROSTŘEDÍ',
        href: '/sluzby/terenni-mereni',
      },
      {
        nadpis: 'Výzkum systému nebo provozu',
        text: 'Kombinace testování, rozhovorů, pozorování a dostupných dat pro složitější informační či řídicí systém.',
        stitek: 'STUDIE NA MÍRU',
        href: '/sluzby/ux-vyzkum',
      },
    ],
    typickeNadpis: 'Co lze v dopravě a veřejném prostoru prověřit',
    vystupNadpis: 'Podklady pro projektanta i provozovatele',
    typickeZadani: [
      'Orientační systém na nádraží, terminálu, v areálu nebo veřejné budově',
      'Přestupní cesta — zda cestující najde správné nástupiště nebo spoj',
      'Informační displeje, jízdní řády, mapy a odbavovací automaty',
      'Navigace pěších a cyklistů v konkrétním prostoru',
      'Dočasné značení při výluce, rekonstrukci nebo kulturní akci',
      'Mobilní aplikace a digitální služby spojené s cestováním',
      'Dispečink nebo dohledové pracoviště v bezpečně připraveném režimu',
      'Porovnání variant značení nebo rozhraní před realizací',
    ],
    coDostanete: [
      'Záznam trasy, zastavení, návratů a klíčových rozhodovacích míst',
      'Podle rozsahu video z první osoby a metriky vizuální pozornosti',
      'Přehled prvků, které lidé zaznamenali, přehlédli nebo pochopili pozdě',
      'Srovnání variant, pokud je součástí návrhu studie',
      'Priority problémů podle dopadu na orientaci a dokončení cesty',
      'Doporučení k hierarchii, umístění a srozumitelnosti informací',
    ],
    dukazy: [],
    hranice: {
      nadpis: 'Výzkum nenahrazuje dopravně-inženýrský posudek',
      text: 'Nenavrhujeme značení podle technických norem ani nevydáváme bezpečnostní certifikaci. Měříme lidské vnímání, orientaci a práci s informacemi. Výsledky slouží jako podklad pro projektanta, provozovatele nebo odborníka na dopravu. Měření nikdy nestavíme nad bezpečnost účastníků.',
    },
    faq: [
      {
        q: 'Co lze v dopravě a veřejném prostoru testovat?',
        a: 'Orientační systémy, mapy, displeje, automaty, přestupní cesty, dočasné značení, digitální služby i vybraná řídicí rozhraní. Rozsah vždy přizpůsobíme prostředí a rozhodnutí, které potřebujete udělat.',
      },
      {
        q: 'Dá se měřit za jízdy?',
        a: 'Neměříme běžnou jízdu na veřejné komunikaci. Výzkum řidiče připadá v úvahu pouze v bezpečně kontrolovaném prostředí, například v simulátoru nebo na uzavřeném polygonu a po dohodě se specialisty na daný provoz.',
      },
      {
        q: 'Umíte to i pro pěší a cyklisty?',
        a: 'Ano. Lze sledovat orientaci a práci s informacemi během skutečné pěší nebo cyklistické trasy, pokud lze měření provést bezpečně a s potřebnými povoleními.',
      },
      {
        q: 'Lze návrh ověřit ještě před realizací?',
        a: 'Ano. Mapu, značení, displej nebo automat lze testovat jako prototyp, vizualizaci či modelovou situaci. Terénní ověření lze následně využít po instalaci nebo v pilotním prostoru.',
      },
      {
        q: 'Potřebujeme povolení správce prostoru?',
        a: 'U terénního měření ano. Předem řešíme přístup, bezpečnost, pohyb účastníků, záznam okolí a pravidla pro práci s daty.',
      },
      {
        q: 'Jak chráníte soukromí lidí zachycených v záznamu?',
        a: 'Účastníci podepisují informovaný souhlas a způsob práce s osobami v pozadí nastavujeme v datovém protokolu. Podle potřeby záznam anonymizujeme nebo omezíme jeho další použití.',
      },
      {
        q: 'Kolik účastníků je potřeba?',
        a: 'Počet závisí na počtu tras, cílových skupin, variant a na požadovaném typu závěru. Vzorek navrhneme podle výzkumné otázky; pro každé prostředí neplatí stejné číslo.',
      },
      {
        q: 'Jak dlouho studie trvá a kolik stojí?',
        a: 'Nejčastěji 3–8 týdnů podle lokality, povolení, počtu účastníků a rozsahu analýzy. Po seznámení s místem a cílem připravíme konkrétní harmonogram i cenu.',
      },
    ],
    cta: { text: 'POPTAT STUDII V TERÉNU →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT TERÉNNÍ MĚŘENÍ', href: '/sluzby/terenni-mereni' },
    zaver: {
      nadpis: ['VŠIMNE SI', 'HO NĚKDO?'],
      text: 'Popište nám místo, trasu nebo informační systém a rozhodnutí, které potřebujete udělat. Navrhneme bezpečný způsob ověření i vhodný rozsah studie.',
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
    metaTitle: 'Eye tracking v průmyslu a energetice | UX MIND',
    metaDescription:
      'Terénní výzkum a mobilní eye tracking pro výrobu, energetiku a provoz. Pracovní postupy, vizuální kontrola, řídicí rozhraní a přenos know-how.',
    schemaName: 'Terénní výzkum a eye tracking pro průmysl a energetiku',
    schemaServiceType: 'Mobilní eye tracking, UX výzkum pracovních postupů a testování řídicích rozhraní',
    h1: ['CO VIDÍ', 'ZKUŠENÝ', 'OPERÁTOR.'],
    moderni: true,
    heroNadpis: 'Zviditelněte pracovní postupy, které se těžko předávají.',
    perex: [
      'Zkušený pracovník často kontroluje situaci jinak než nováček. Ví, kam se podívat, které signály spojit a co může bezpečně vynechat. Část tohoto know-how se obtížně popisuje pouze rozhovorem nebo pracovním návodem.',
      'Pozorování, rozhovory a podle cíle mobilní eye tracking pomohou zachytit průběh úkolu v kontextu. Výsledky lze využít při úpravě školení, pracovních instrukcí, rozhraní nebo uspořádání pracoviště.',
    ],
    infoPas: [
      ['DÉLKA', '4–8 týdnů'],
      ['PROSTŘEDÍ', 'Provoz · pracoviště · velín'],
      ['METODY', 'Pozorování · rozhovory · mobilní eye tracking'],
      ['VÝSTUP', 'Vzorce práce · priority · doporučení'],
    ],
    coMerimeLabel: 'CO V PROVOZU OVĚŘÍME',
    coMerimeNadpis: 'Pozornost, postup a prostředí v jednom kontextu',
    coMerime: [
      {
        nadpis: 'Rozdíl mezi zkušeností a začátkem',
        text: 'Porovnáme, jak různé skupiny procházejí stejným úkolem, které informace kontrolují a ve kterých místech váhají.',
      },
      {
        nadpis: 'Vizuální kontrolu a údržbu',
        text: 'Sledujeme pořadí kontroly, návraty, vynechaná místa a práci s instrukcemi během inspekce nebo servisního postupu.',
      },
      {
        nadpis: 'Řídicí rozhraní a velíny',
        text: 'Ověříme hierarchii informací, práci s alarmy a průběh opakovaných úkolů v bezpečně připravených podmínkách.',
      },
      {
        nadpis: 'Pracoviště a bezpečnostní informace',
        text: 'Zjistíme, zda uspořádání, značení a pracovní pomůcky podporují správný postup a nezakrývají důležité informace.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Pozorování pracovního postupu',
        text: 'Výzkumník sleduje průběh úkolu, pracuje s rozhovorem a dokumentací a hledá rozdíly mezi popsaným a skutečným postupem.',
        stitek: 'PROCES A KONTEXT',
        href: '/sluzby/ux-vyzkum',
      },
      {
        nadpis: 'Mobilní eye tracking v provozu',
        text: 'Záznam pohledu v první osobě pro inspekce, údržbu, kontrolu kvality nebo práci v prostoru, pokud to dovolují bezpečnostní podmínky.',
        stitek: 'REÁLNÉ PRACOVIŠTĚ',
        href: '/sluzby/terenni-mereni',
      },
      {
        nadpis: 'Test rozhraní nebo instrukce',
        text: 'Řízené ověření dashboardu, pracovního návodu, ovládacího panelu nebo tréninkového scénáře mimo ostrý provoz.',
        stitek: 'ŘÍZENÉ PODMÍNKY',
        href: '/sluzby/testovani-uzivatelu',
      },
    ],
    typickeNadpis: 'Co lze v průmyslu a energetice prověřit',
    vystupNadpis: 'Podklady pro školení, rozhraní i provoz',
    typickeZadani: [
      'Porovnání pracovního postupu zkušeného pracovníka a nováčka',
      'Vizuální kontrola kvality a hledání opakujících se míst přehlédnutí',
      'Obhlídka, inspekce nebo údržba zařízení podle pracovního postupu',
      'Velín a dispečink — práce s obrazovkami, alarmy a prioritami',
      'Bezpečnostní značení a instrukce v konkrétním pracovním kontextu',
      'Interní software používaný při rutinních a časově náročných úkolech',
      'Pracovní návod nebo školicí materiál před širším nasazením',
      'Uspořádání pracoviště, nástrojů a informačních prvků',
    ],
    coDostanete: [
      'Popsaný průběh úkolu včetně klíčových rozhodovacích a kontrolních momentů',
      'Podle rozsahu video z první osoby a metriky vizuální pozornosti',
      'Srovnání skupin nebo variant, pokud je součástí návrhu studie',
      'Místa, kde se postup liší, informace zaniká nebo vzniká zbytečné hledání',
      'Doporučení pro rozhraní, pracovní instrukce, školení nebo uspořádání pracoviště',
      'Výstup s popsanými limity a podmínkami, za kterých data vznikla',
    ],
    dukazy: [],
    hranice: {
      nadpis: 'Výzkum nenahrazuje audit bezpečnosti ani procesní řízení',
      text: 'Měříme chování, pozornost a práci s informacemi. Neposuzujeme soulad provozu s bezpečnostními předpisy a neneseme roli procesního auditora. Studii připravujeme společně s vaším odborníkem na provoz a BOZP a měření vždy podléhá pravidlům daného pracoviště.',
    },
    faq: [
      {
        q: 'K čemu lze výzkum v průmyslu využít?',
        a: 'K pochopení pracovních postupů, porovnání zkušenostních skupin, ověření instrukcí, vizuální kontroly, řídicích rozhraní nebo uspořádání pracoviště. Cílem je získat podklady pro úpravu, ne hodnotit jednotlivce.',
      },
      {
        q: 'Nebudou pracovníci měření vnímat jako kontrolu výkonu?',
        a: 'Účel, způsob anonymizace a použití dat nastavujeme předem a srozumitelně jej vysvětlíme účastníkům. Výzkum navrhujeme pro pochopení postupu a prostředí, ne pro personální hodnocení konkrétního člověka.',
      },
      {
        q: 'Lze mobilní brýle použít s ochrannými pomůckami?',
        a: 'Záleží na konkrétní přilbě, brýlích, štítu a bezpečnostních pravidlech pracoviště. Kompatibilitu vždy ověříme při rekognoskaci a pilotáži. Pokud vybavení použít nelze, navrhneme jiný způsob pozorování.',
      },
      {
        q: 'Může výzkum probíhat během ostrého provozu?',
        a: 'Pouze pokud to dovolí provozní a bezpečnostní podmínky. Rizikové úkoly přesouváme do odstávky, tréninkového prostředí nebo simulace. Rozhodnutí vzniká společně s odpovědnou osobou na pracovišti.',
      },
      {
        q: 'Zkrátí studie zaškolení nebo sníží chybovost?',
        a: 'Sama studie tento výsledek nezaručí. Může ukázat rozdíly v postupu a místa, která mají smysl upravit ve školení, instrukcích nebo rozhraní. Dopad změn je potřeba následně ověřit.',
      },
      {
        q: 'Kolik pracovníků potřebujeme?',
        a: 'Počet závisí na variabilitě úkolu, počtu rolí, směn a skupin, které potřebujete porovnat. Vzorek navrhneme podle výzkumné otázky a dostupnosti pracovníků.',
      },
      {
        q: 'Jak chráníte citlivá provozní data?',
        a: 'Předem nastavíme přístup, rozsah záznamu, anonymizaci, uchování a způsob předání dat. Projekt může probíhat pod NDA a výstupy bez souhlasu nezveřejňujeme.',
      },
      {
        q: 'Jak dlouho studie trvá a kolik stojí?',
        a: 'Nejčastěji 4–8 týdnů podle počtu pracovišť, rolí, bezpečnostní přípravy a rozsahu analýzy. Po rekognoskaci a úvodním zadání připravíme konkrétní harmonogram i cenu.',
      },
    ],
    cta: { text: 'POPTAT STUDII V PROVOZU →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT TERÉNNÍ MĚŘENÍ', href: '/sluzby/terenni-mereni' },
    zaver: {
      nadpis: ['CO VIDÍ', 'ZKUŠENÝ.'],
      text: 'Popište nám pracovní postup, prostředí a rozhodnutí, které potřebujete udělat. Navrhneme bezpečný způsob pozorování nebo měření a vhodný rozsah studie.',
    },
    souvisejiciSluzby: ['field-research', 'eye-tracking', 'ux-research', 'test-packages'],
  },

  // ── 7. Zdravotnictví a zdravotnické prostředky ────────────────
  {
    slug: 'zdravotnictvi',
    poradi: 7,
    nazev: 'Zdravotnictví a zdravotnické prostředky',
    nazevKratky: 'Zdravotnictví',
    bolest: 'Každý krok musí být srozumitelný lidem, kteří ho mají udělat.',
    maVlastniData: false,
    moderni: true,
    metaTitle: 'UX výzkum a testování ve zdravotnictví | UX MIND',
    metaDescription:
      'Testování zdravotnických systémů, prostředků, pacientských služeb a pracovních postupů. V laboratoři, simulaci i reálném prostředí.',
    schemaName: 'UX výzkum a testování ve zdravotnictví',
    schemaServiceType:
      'UX výzkum, uživatelské testování a eye tracking zdravotnických systémů a prostředků',
    h1: ['OVĚŘTE', 'KAŽDÝ KROK.'],
    heroNadpis: 'Výzkum zdravotnických systémů, prostředků, služeb a pracovních postupů.',
    perex: [
      'Zdravotníci, pacienti i další pracovníci používají digitální systémy, přístroje, formuláře a návody v rozdílných podmínkách. Výzkum ukáže, kde hledají informace, čemu nerozumějí a při kterých krocích váhají nebo chybují.',
      'Podle otázky zapojíme expertní posouzení, testování s uživateli, pozorování v kontextu nebo eye tracking. Výsledkem jsou podklady pro návrh a další ověření — ne posouzení medicínské správnosti.',
    ],
    infoPas: [
      ['TYPICKÁ DÉLKA', '4–8 týdnů'],
      ['PROSTŘEDÍ', 'Laboratoř · simulace · pracoviště'],
      ['METODY', 'Testování · pozorování · eye tracking'],
      ['VÝSTUP', 'Zjištění · priority · doporučení'],
    ],
    coMerimeNadpis: 'Co lze ve zdravotnictví ověřit',
    coMerime: [
      {
        nadpis: 'Systémy a zdravotnické prostředky',
        text: 'Zda uživatel najde potřebnou informaci, správně jí porozumí a zvládne navazující krok v konkrétním scénáři.',
      },
      {
        nadpis: 'Pacientské služby a informace',
        text: 'Objednávání, portály, formuláře, návody a další místa, kde pacient potřebuje vědět, co má udělat dál.',
      },
      {
        nadpis: 'Pracovní postupy a prostředí',
        text: 'Jak do používání vstupuje pořadí kroků, dostupnost informací, přerušování, spolupráce lidí a podmínky pracoviště.',
      },
      {
        nadpis: 'Výcvik a simulace',
        text: 'Které části postupu jsou pro účastníky nejasné a kde může názorná zpětná vazba podpořit další učení.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Digitální služba nebo prototyp',
        text: 'Ověříme důležité úkoly s odpovídajícími uživateli a popíšeme, kde rozhraní komplikuje jejich dokončení.',
        stitek: 'UŽIVATELSKÉ TESTOVÁNÍ',
        href: '/sluzby/testovani-uzivatelu',
      },
      {
        nadpis: 'Přístroj, návod nebo pracovní postup',
        text: 'Navrhneme realistické scénáře v kontrolovaném prostředí a podle potřeby doplníme měření pozornosti.',
        stitek: 'UX VÝZKUM',
        href: '/sluzby/ux-vyzkum',
      },
      {
        nadpis: 'Používání na pracovišti',
        text: 'Sledujeme práci v jejím kontextu, pokud to dovolují provozní, bezpečnostní a etické podmínky.',
        stitek: 'TERÉNNÍ MĚŘENÍ',
        href: '/sluzby/terenni-mereni',
      },
    ],
    typickeNadpis: 'Co lze ve zdravotnictví prověřit',
    typickeZadani: [
      'Formativní testování návrhu zdravotnického prostředku',
      'Nemocniční a ambulantní informační systémy',
      'Pacientské portály, objednávání a digitální formuláře',
      'Návody, štítky, upozornění a informační materiály',
      'Telemedicína a další služby elektronického zdravotnictví',
      'Simulační scénáře a podpora výcviku',
      'Pracovní postupy a předávání informací',
      'Používání přístroje nebo systému v konkrétním prostředí',
    ],
    vystupNadpis: 'Podklady pro další návrh a ověření',
    coDostanete: [
      'Zjištění z realistických úkolů a pozorování účastníků',
      'Úspěšnost, čas, chybovost a problematické kroky, pokud odpovídají cíli studie',
      'Metriky pozornosti a záznam pohledu, pokud zapojíme eye tracking',
      'Rozdíly mezi uživatelskými skupinami, pokud je potřebujete porovnat',
      'Prioritizovaná doporučení pro návrh a další ověřování',
      'Popsanou metodiku, podmínky a limity studie',
    ],
    dukazy: [],
    hranice: {
      nadpis: 'Výzkum nenahrazuje klinické ani regulatorní posouzení',
      text: 'Neposuzujeme medicínskou správnost, diagnózu, shodu prostředku ani jeho certifikaci. Studie může dodat výzkumné podklady do širšího procesu usability engineering, který řídí výrobce společně s odpovědnými klinickými a regulatorními specialisty.',
    },
    faq: [
      {
        q: 'Co všechno lze ve zdravotnictví testovat?',
        a: 'Digitální systémy, prototypy, zdravotnické prostředky, návody, formuláře, pacientské služby i pracovní postupy. Konkrétní rozsah vždy přizpůsobíme zamýšleným uživatelům, prostředí a rozhodnutí, které potřebujete udělat.',
      },
      {
        q: 'Můžeme testovat ještě před dokončením řešení?',
        a: 'Ano. Formativní testování prototypu nebo rozpracovaného návrhu pomáhá odhalit problémy dříve, než se jejich oprava prodraží. Prototyp musí umožnit realisticky projít úkoly, které chceme ověřit.',
      },
      {
        q: 'Nahradí studie klinické hodnocení?',
        a: 'Ne. Neposuzujeme klinickou účinnost, medicínskou správnost ani diagnózu. Zaměřujeme se na interakci uživatele se systémem, prostředkem, informacemi nebo pracovním postupem.',
      },
      {
        q: 'Zajistíte celý proces podle IEC 62366?',
        a: 'Samotná uživatelská studie nenahrazuje celý proces usability engineering ani regulatorní posouzení. Umíme připravit a zdokumentovat výzkumnou část jako podklad pro proces vedený výrobcem a jeho regulatorními specialisty.',
      },
      {
        q: 'Jde měřit na reálném pracovišti?',
        a: 'Ano, pokud to dovolují provozní, bezpečnostní, etické a datové podmínky. Když by měření narušovalo péči nebo soukromí, navrhneme simulaci či jinou bezpečnou variantu.',
      },
      {
        q: 'Jak chráníte pacienty a citlivá data?',
        a: 'Předem vymezíme, co se smí zaznamenat, kdo k datům přistupuje, jak budou anonymizována a jak dlouho se uchovají. Pokud nelze soukromí spolehlivě zajistit, měření upravíme nebo přesuneme do simulace.',
      },
      {
        q: 'Jak je to s etikou a informovaným souhlasem?',
        a: 'Účastníci dostanou srozumitelné informace o průběhu, záznamu a zpracování dat a dávají informovaný souhlas. U výzkumných projektů řešíme podle povahy studie také posouzení etickou komisí.',
      },
      {
        q: 'Koho zapojíte do testování?',
        a: 'Výběr vychází ze zamýšlených uživatelů řešení — mohou to být zdravotníci konkrétních rolí, další pracovníci nebo pacienti. Nábor a podmínky účasti nastavíme podle citlivosti tématu a požadované zkušenosti.',
      },
      {
        q: 'Jak dlouho studie trvá a kolik stojí?',
        a: 'Nejčastěji 4–8 týdnů. Rozsah a cenu ovlivní počet uživatelských skupin, prostředí, náročnost náboru, použité metody a požadovaná dokumentace. Po úvodním zadání připravíme konkrétní návrh.',
      },
    ],
    cta: { text: 'POPTAT STUDII VE ZDRAVOTNICTVÍ →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT UX VÝZKUM', href: '/sluzby/ux-vyzkum' },
    zaver: {
      nadpis: ['OVĚŘTE', 'KAŽDÝ KROK.'],
      text: 'Popište nám systém, prostředek, službu nebo pracovní postup a rozhodnutí, které potřebujete udělat. Navrhneme odpovídající metody, účastníky i bezpečný průběh studie.',
    },
    souvisejiciSluzby: ['user-testing', 'eye-tracking', 'field-research', 'test-packages'],
  },

  // ── 8. Banky, pojišťovny a poradenství ────────────────────────
  {
    slug: 'finance-a-poradenstvi',
    poradi: 8,
    nazev: 'Banky, pojišťovny a poradenství',
    nazevKratky: 'Finance a poradenství',
    bolest: 'Klient se musí zorientovat, porozumět nabídce a bezpečně dokončit důležitý krok.',
    maVlastniData: false,
    moderni: true,
    metaTitle: 'UX výzkum pro banky a pojišťovny | UX MIND',
    metaDescription:
      'Testování digitálního sjednání, klientských portálů, dokumentů a interních systémů pro banky, pojišťovny a finanční poradenství.',
    schemaName: 'UX výzkum pro banky, pojišťovny a finanční poradenství',
    schemaServiceType:
      'UX výzkum, uživatelské testování a eye tracking finančních služeb a interních systémů',
    h1: ['ROZUMÍ', 'TOMU KLIENT?'],
    heroNadpis: 'Ověřte, zda klienti i zaměstnanci najdou, pochopí a dokončí to podstatné.',
    perex: [
      'Finanční služba stojí na důvěře a srozumitelném rozhodování. Výzkum ukáže, kde klient ztrácí orientaci, kterým informacím nerozumí a co mu brání dokončit sjednání, správu produktu nebo důležitou změnu.',
      'Stejně důležité jsou systémy pro poradce, operátory a back office. Prověříme celé pracovní cesty, jednotlivé obrazovky i dokumenty a navrhneme úpravy podle dopadu.',
    ],
    infoPas: [
      ['TYPICKÁ DÉLKA', '3–6 týdnů'],
      ['UŽIVATELÉ', 'Klienti · poradci · back office'],
      ['METODY', 'Audit · testování · eye tracking'],
      ['VÝSTUP', 'Zjištění · priority · doporučení'],
    ],
    coMerimeNadpis: 'Kde výzkum ve finančních službách pomáhá',
    coMerime: [
      {
        nadpis: 'Sjednání a změny produktů',
        text: 'Kde klient váhá, vrací se, chybuje nebo cestu opouští při založení účtu, sjednání pojištění, úvěru či změně služby.',
      },
      {
        nadpis: 'Dokumenty a komunikace',
        text: 'Zda lidé najdou důležité informace, správně jim porozumějí a vědí, co pro ně znamenají a jak mají pokračovat.',
      },
      {
        nadpis: 'Samoobsluha a podpora',
        text: 'Jak se klient orientuje v bankovnictví, portálu, aplikaci nebo nápovědě a zda zvládne běžné i méně časté situace.',
      },
      {
        nadpis: 'Poradenství a interní systémy',
        text: 'Kde pracovní nástroje zpomalují obsluhu, zvyšují počet kroků nebo komplikují předání informací mezi lidmi a systémy.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Potřebujete rychle najít slabá místa',
        text: 'Expertně projdeme klíčové cesty, obsah a rozhraní a připravíme priority pro další úpravy nebo testování.',
        stitek: 'UX AUDIT',
        href: '/sluzby/ux-audit',
      },
      {
        nadpis: 'Chcete ověřit cestu s uživateli',
        text: 'Na realistických úkolech zjistíme, co lidé zvládnou, čemu nerozumějí a kde potřebují pomoc.',
        stitek: 'UŽIVATELSKÉ TESTOVÁNÍ',
        href: '/sluzby/testovani-uzivatelu',
      },
      {
        nadpis: 'Potřebujete změřit práci s informacemi',
        text: 'Eye tracking ukáže, co lidé skutečně zaznamenají, v jakém pořadí informace procházejí a co přehlížejí.',
        stitek: 'EYE TRACKING',
        href: '/sluzby/eye-tracking',
      },
    ],
    typickeNadpis: 'Co můžeme prověřit',
    typickeZadani: [
      'Online založení účtu, sjednání pojištění nebo žádost o úvěr',
      'Internetové a mobilní bankovnictví',
      'Klientské zóny, samoobsluha a správa produktů',
      'Formuláře, kalkulačky a srovnání variant',
      'Smluvní, předsmluvní a informační dokumenty',
      'Komunikace změn, poplatků a dalších důležitých podmínek',
      'Poradenské, operátorské a back-office systémy',
      'Služby pro seniory a uživatele s rozdílnou digitální zkušeností',
    ],
    vystupNadpis: 'Podklady pro srozumitelnější a plynulejší cestu',
    coDostanete: [
      'Zjištění z klíčových klientských nebo pracovních úkolů',
      'Místa, kde uživatelé váhají, chybují nebo potřebují pomoc',
      'Vyhodnocení srozumitelnosti obsahu a informační hierarchie',
      'Metriky pozornosti a vizualizace, pokud zapojíme eye tracking',
      'Porovnání variant, pokud potřebujete vybrat mezi návrhy',
      'Prioritizovaná doporučení pro obsah, rozhraní a další ověření',
    ],
    dukazy: [
      {
        typ: 'vlastni',
        nadpis: 'Delší text rychle ztrácel pozornost.',
        vysledek: 'Dlouhý odstavec zaznamenala přibližně třetina účastníků.',
        text: 'Při eye-trackingové studii webové stránky jsme sledovali výrazný pokles pozornosti od nadpisu přes krátký text až k delšímu odstavci. Studie ukazuje, proč při práci s důležitým obsahem nestačí pouze umístit informace na stránku.',
        metoda: 'Eye-tracking, AOI analýza · cca 120 respondentů',
        odkaz: '/pripadove-studie/backend-stories',
      },
    ],
    hranice: {
      nadpis: 'Výzkum nenahrazuje právní, regulatorní ani bezpečnostní posouzení',
      text: 'Ověřujeme srozumitelnost, použitelnost a chování uživatelů. Neposuzujeme právní správnost dokumentů, splnění informační povinnosti, vhodnost finančního produktu ani kybernetickou bezpečnost. Tyto oblasti zůstávají v odpovědnosti příslušných specialistů.',
    },
    faq: [
      {
        q: 'Co lze ve finančních službách testovat?',
        a: 'Weby, aplikace, klientské portály, kalkulačky, formuláře, dokumenty i interní systémy. Můžeme prověřit jednu konkrétní část nebo celou cestu napříč kanály.',
      },
      {
        q: 'Můžeme testovat prototyp před vývojem?',
        a: 'Ano. Prototyp je vhodný pro včasné ověření struktury, obsahu a jednotlivých kroků. Musí pouze umožnit realisticky projít úkoly, které potřebujete prověřit.',
      },
      {
        q: 'Jde testovat také dokumenty a e-maily?',
        a: 'Ano. Prověříme, zda lidé najdou klíčové informace, jak jim rozumějí a co očekávají jako další krok. Podle cíle lze zapojit rozhovor, úkolové testování nebo eye tracking.',
      },
      {
        q: 'Jde měřit tištěné dokumenty?',
        a: 'Ano. Pomocí mobilního eye trackingu lze sledovat práci s papírovým dokumentem i jeho použití v širším kontextu.',
      },
      {
        q: 'Jak řešíte citlivá data?',
        a: 'Preferujeme prototypy, demo účty a připravená testovací data. Před projektem nastavíme přístupy, anonymizaci, rozsah záznamu, uchování dat a případné NDA.',
      },
      {
        q: 'Umíte porovnat současnou a novou variantu?',
        a: 'Ano. Připravíme srovnatelné úkoly a předem určíme, podle kterých ukazatelů budeme varianty hodnotit. Výsledkem není jen preference, ale vysvětlení rozdílů.',
      },
      {
        q: 'Nahradí výzkum právní nebo compliance kontrolu?',
        a: 'Ne. Výzkum ukáže, jak lidé obsah a rozhraní používají a čemu rozumějí. Neprokazuje právní správnost dokumentu ani splnění regulatorních povinností.',
      },
      {
        q: 'Lze testovat také interní systémy?',
        a: 'Ano. Zaměříme se na časté i kritické pracovní úkoly, návaznost kroků, dohledávání informací a místa, kde systém pracovníky zbytečně zpomaluje.',
      },
      {
        q: 'Jak dlouho studie trvá a kolik stojí?',
        a: 'Nejčastěji 3–6 týdnů. Rozsah a cenu ovlivní počet cest a uživatelských skupin, nábor, zvolené metody a požadovaná forma výstupu. Po úvodním zadání připravíme konkrétní návrh.',
      },
    ],
    cta: { text: 'POPTAT VÝZKUM FINANČNÍ SLUŽBY →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT UX VÝZKUM', href: '/sluzby/ux-vyzkum' },
    zaver: {
      nadpis: ['ROZUMÍ', 'TOMU KLIENT?'],
      text: 'Popište nám službu, klientskou cestu, dokument nebo interní systém a rozhodnutí, které potřebujete udělat. Navrhneme vhodný rozsah i metody výzkumu.',
    },
    souvisejiciSluzby: ['ux-audit', 'eye-tracking', 'user-testing', 'test-packages'],
  },

  // ── 9. Letectví a doprava vzduchem ────────────────────────────
  {
    slug: 'letectvi',
    poradi: 9,
    nazev: 'Letectví a doprava vzduchem',
    nazevKratky: 'Letectví',
    bolest: 'Pozornost se mění s úkolem, prostředím i fází provozu.',
    maVlastniData: false,
    moderni: true,
    metaTitle: 'Eye tracking a UX výzkum v letectví | UX MIND',
    metaDescription:
      'Výzkum vizuální pozornosti a použitelnosti v leteckém výcviku, simulátorech, pozemním provozu, údržbě a na letištích.',
    schemaName: 'Eye tracking a UX výzkum v letectví',
    schemaServiceType:
      'Eye tracking, terénní měření a UX výzkum pro letecký výcvik, provoz a letiště',
    h1: ['POZORNOST', 'V KAŽDÉ FÁZI.'],
    heroNadpis: 'Výzkum pro výcvik, provoz, údržbu i cestu letištěm.',
    perex: [
      'Pilot, instruktor, dispečer, technik i cestující pracují s jinými informacemi a v jiném kontextu. Výzkum ukáže, kam směřuje jejich vizuální pozornost, jak procházejí rozhraním nebo prostorem a kde se jejich postup komplikuje.',
      'Podle prostředí spojíme pozorování, uživatelské testování, mobilní eye tracking nebo laboratorní měření. Výsledky vždy interpretujeme společně s úkolem, chováním a provozním kontextem.',
    ],
    infoPas: [
      ['TYPICKÁ DÉLKA', '4–8 týdnů'],
      ['PROSTŘEDÍ', 'Simulátor · pracoviště · letiště'],
      ['METODY', 'Pozorování · testování · eye tracking'],
      ['VÝSTUP', 'Záznam · analýza · doporučení'],
    ],
    coMerimeNadpis: 'Kde výzkum v letectví pomáhá',
    coMerime: [
      {
        nadpis: 'Výcvik a simulace',
        text: 'Jak účastník rozděluje pozornost mezi přístroje, výhled, instrukce a jednotlivé části úkolu v předem připraveném scénáři.',
      },
      {
        nadpis: 'Řídicí a provozní pracoviště',
        text: 'Jak lidé vyhledávají informace, přecházejí mezi zdroji a používají rozhraní při běžných i modelových situacích.',
      },
      {
        nadpis: 'Údržba a pozemní provoz',
        text: 'Jak pracovník prochází kontrolou, návodem nebo fyzickým postupem a kde potřebuje informaci, potvrzení či lepší podporu.',
      },
      {
        nadpis: 'Cesta cestujícího',
        text: 'Zda cestující najde značení, informační tabuli, odbavení, bezpečnostní kontrolu, službu nebo správnou cestu k odletu.',
      },
    ],
    rozsahy: [
      {
        nadpis: 'Simulátor nebo výcvikový scénář',
        text: 'Zaznamenáme průběh úkolu a vizuální pozornost. Porovnání skupin připravíme jen tehdy, když odpovídá cíli studie.',
        stitek: 'EYE TRACKING',
        href: '/sluzby/eye-tracking',
      },
      {
        nadpis: 'Pracoviště nebo reálný prostor',
        text: 'Mobilní měření zachytí práci a orientaci v kontextu, pokud jsou splněny provozní a bezpečnostní podmínky.',
        stitek: 'TERÉNNÍ MĚŘENÍ',
        href: '/sluzby/terenni-mereni',
      },
      {
        nadpis: 'Digitální rozhraní nebo prototyp',
        text: 'Ověříme ovládání, informační hierarchii a důležité úkoly ještě před nasazením nebo další úpravou řešení.',
        stitek: 'UX VÝZKUM',
        href: '/sluzby/ux-vyzkum',
      },
    ],
    typickeNadpis: 'Co lze prověřit',
    typickeZadani: [
      'Práce s přístroji a informacemi v simulátoru',
      'Výcvikové scénáře a názorná zpětná vazba',
      'Rozhraní na řídicích a provozních pracovištích',
      'Elektronické příručky, checklisty a pracovní instrukce',
      'Postupy údržby, kontroly a pozemního odbavení',
      'Orientace a značení v terminálu',
      'Odbavovací kiosky, aplikace a samoobslužné služby',
      'Pozemní ovládání dronů a dalších bezpilotních systémů',
    ],
    vystupNadpis: 'Data zasazená do konkrétního scénáře',
    coDostanete: [
      'Synchronizovaný záznam úkolu a pohledu, pokud zapojíme eye tracking',
      'Analýzu rozdělení pozornosti mezi předem definované oblasti',
      'Průběh úkolu, problematické kroky a pozorované chování',
      'Porovnání scénářů, variant nebo skupin, pokud to dovolí design studie',
      'Popsanou metodiku, podmínky měření a limity interpretace',
      'Doporučení pro rozhraní, informace, prostor nebo další ověření',
    ],
    dukazy: [],
    hranice: {
      nadpis: 'Výzkum nenahrazuje odborné, bezpečnostní ani certifikační posouzení',
      text: 'Pohledová data sama neprokazují situační povědomí, kompetenci člověka ani bezpečnost systému. Neposuzujeme způsobilost personálu, soulad s předpisy ani řešení pro schvalovací řízení. Výzkum může být jedním z podkladů pro specialisty, kteří za tyto oblasti odpovídají.',
    },
    faq: [
      {
        q: 'Co lze v letectví měřit?',
        a: 'Vizuální pozornost, průběh úkolu, práci s rozhraním, návody i orientaci v prostoru. Konkrétní metriky vždy vybíráme podle prostředí a rozhodnutí, které má studie podpořit.',
      },
      {
        q: 'Umíte měřit v simulátoru?',
        a: 'Ano. Simulátor umožňuje připravit opakovatelné scénáře bez vstupu do ostrého provozu. Předem ověříme kompatibilitu techniky s vybavením, pohybem účastníka a podmínkami simulace.',
      },
      {
        q: 'Lze měřit v ostrém provozu?',
        a: 'Pouze pokud to dovolí provozovatel a měření nezasáhne do bezpečnosti ani pracovních povinností. Často je vhodnější simulace, odstavené pracoviště nebo přesně vymezená nekritická část provozu.',
      },
      {
        q: 'Co eye tracking řekne o situačním povědomí?',
        a: 'Ukáže, kam člověk směřoval pohled a jak pozornost rozděloval. Sám však neprokáže, čemu porozuměl nebo jaké měl situační povědomí. Proto pohled propojujeme s úkolem, chováním a dalšími daty.',
      },
      {
        q: 'Lze porovnat zkušeného pracovníka a nováčka?',
        a: 'Ano, pokud jsou skupiny a scénáře vhodně definované. Výsledek popíše rozdíly ve sledovaném úkolu, nenahrazuje však odborné hodnocení způsobilosti ani zkoušku.',
      },
      {
        q: 'A drony nebo bezpilotní systémy?',
        a: 'Můžeme prověřit pozemní ovládací rozhraní, práci s informacemi a průběh modelového úkolu. Nevyvíjíme řízení pohledem a neposuzujeme letovou způsobilost systému.',
      },
      {
        q: 'Jak chráníte provozní a osobní data?',
        a: 'Předem vymezíme rozsah záznamu, přístup, anonymizaci, uchování a způsob předání dat. Projekt může probíhat pod NDA a bez souhlasu klienta nic nezveřejňujeme.',
      },
      {
        q: 'Jak dlouho studie trvá a kolik stojí?',
        a: 'Nejčastěji 4–8 týdnů. Rozsah a cenu ovlivní prostředí, počet scénářů a rolí, dostupnost simulátoru, bezpečnostní příprava a použité metody. Po úvodním zadání připravíme konkrétní návrh.',
      },
    ],
    cta: { text: 'POPTAT VÝZKUM V LETECTVÍ →', href: '/kontakt' },
    ctaSekundarni: { text: 'PROJÍT TERÉNNÍ MĚŘENÍ', href: '/sluzby/terenni-mereni' },
    zaver: {
      nadpis: ['POZORNOST', 'V KAŽDÉ FÁZI.'],
      text: 'Popište nám prostředí, scénář a rozhodnutí, které potřebujete udělat. Navrhneme realistický a provozně bezpečný způsob výzkumu.',
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

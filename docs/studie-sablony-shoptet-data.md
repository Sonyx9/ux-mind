# Testování šablon Shoptetu - datový podklad

## Účel dokumentu

Interní zdrojový podklad pro případovou studii, příspěvky na sociální sítě a případné jednání se Shoptetem. Veřejné texty mají používat pouze tvrzení uvedená v části **Bezpečná veřejná tvrzení**.

## Primární zdroj

- Jan Petružálek: *Komparace a kombinace metod měření uživatelské zkušenosti (UX) s využitím Eye-tracking technologie*, disertační práce, FIM UHK.
- Relevantní část: kapitola 6, zejména tištěné strany 76-106.
- Zdrojový soubor: `/Users/luky/Downloads/Petružálek_disertace_2023_v8.pdf`
- Vazba šablon Classic, Step a Waltz na platformu Shoptet byla potvrzena zadavatelem projektu. Text metodické části disertace uvádí názvy šablon, ale platformu na relevantních stranách výslovně nejmenuje.

## Design studie

| Položka | Hodnota |
|---|---|
| Celkový vzorek | 61 osob |
| Pohlaví | 30 žen, 31 mužů |
| Věk | 18-26 let |
| Výběr | studenti a studentky FIM UHK |
| Design | vnitroskupinový - každý účastník prošel všemi třemi šablonami |
| Hlavní úkol | najít a kliknutím otevřít předem určený produkt |
| Časový limit | 60 sekund na šablonu |
| Eye tracker | Tobii X2-60 |
| Frekvence záznamu | 60 Hz |
| Subjektivní hodnocení | VisAWI - hodnocení vizuální estetiky |
| Testované šablony | Classic, Step, Waltz |

## Testované šablony a obsah

Šablony nebyly naplněny stejným sortimentem. Lišily se rozložením, obsahem, barevností, fotografiemi i produktovou kategorií. Výsledky proto neizolují čistý efekt samotné šablony.

| Šablona | Kategorie | Výchozí obsah produktové karty | Relativní komplexita |
|---|---|---|---|
| Classic | domácí potřeby | kód, fotografie, název, hodnocení, doprava, cena s DPH i bez DPH, tlačítko | nejvyšší |
| Step | móda | fotografie, název, cena, tlačítko, velikosti a někdy doplňkové štítky | střední až vyšší |
| Waltz | cukrářské výrobky | fotografie, název a cena; další informace po interakci | nejnižší |

## Hlavní výsledky

1. Cílový produkt našlo v časovém limitu **60 z 61 účastníků**.
2. Celková doba nalezení a potvrzení produktu se mezi šablonami statisticky významně nelišila.
3. Na úrovni celých stránek se většina sledovaných eye-trackingových metrik významně nelišila.
4. Významné rozdíly se objevily především v AOI cílových produktových karet.
5. Classic, který zobrazoval nejvíce informací, vyžadoval při práci s cílovým produktem více fixací než Step a Waltz.
6. Cílový produkt v Classic účastníci zaznamenali dříve než ve Step, což ale nevedlo k rychlejšímu dokončení celého úkolu. Výsledek ovlivnila také vyšší pozice hledaného produktu na stránce.
7. Doba setrvání na cílovém produktu byla u Classic delší než u Waltz.
8. V estetickém hodnocení VisAWI skončily šablony v pořadí Waltz, Step, Classic. Tento výsledek může být ovlivněn rozdílným sortimentem, fotografiemi a celkovým obsahem.

## Vybrané statistické výsledky

### Počet fixací

| Oblast | Výsledek | Interpretace |
|---|---|---|
| Celá stránka | F(2, 108) = 2,62; p = 0,077 | rozdíl nebyl statisticky významný |
| AOI produktu | F(2, 96) = 9,58; p < 0,001; parciální eta² = 0,17 | významný rozdíl mezi šablonami |
| Classic vs. Step | t(48) = 2,85; p = 0,017 | Classic měl více fixací |
| Classic vs. Waltz | t(48) = 3,87; p < 0,001 | Classic měl více fixací |

### Čas do první fixace na cílový produkt

| Porovnání | Výsledek | Interpretace |
|---|---|---|
| Efekt šablony | F(2, 96) = 8,27; p = 0,001; parciální eta² = 0,15 | čas do první fixace se mezi šablonami lišil |
| Efekt pohlaví | F(1, 48) = 11,64; p = 0,001; parciální eta² = 0,20 | rozdíl byl nalezen i mezi skupinami pohlaví |
| Interakce šablona × pohlaví | F(2, 96) = 0,38; p = 0,646; parciální eta² = 0,00 | interakce nebyla významná |
| Classic vs. Step | t(48) = -3,73; p = 0,001 | produkt v Classic byl fixován dříve |
| Step vs. Waltz | t(48) = 2,66; p = 0,028 | produkt ve Step byl fixován později |

Pozor: čas do první fixace byl ovlivněn vertikální pozicí cílového produktu. V Classic byl hledaný produkt umístěn nejblíže horní části stránky.

### Průměrná doba fixace na produkt

- AOI produktu: F(2, 96) = 5,03; p = 0,008; parciální eta² = 0,09.
- Classic vs. Step: t(48) = -2,85; p = 0,017.
- Autor uvádí, že tento rozdíl nelze jednoduše interpretovat; mohl jej ovlivnit typ produktu a změna fotografie po najetí ve šabloně Step.

### Sekvence fixací před první fixací cílového produktu

- AOI produktu: F(2, 96) = 7,68; p = 0,002; parciální eta² = 0,14.
- Classic vs. Waltz: t(48) = 3,33; p = 0,005.
- Step vs. Waltz: t(48) = 3,81; p = 0,001.
- U Classic a Step účastníci před pohledem na cílový produkt fixovali více okolních prvků než u Waltz.

### Doba setrvání na cílovém produktu

- AOI produktu: F(2, 98) = 4,55; p = 0,013; parciální eta² = 0,08.
- Classic vs. Waltz: t(49) = 2,68; p = 0,027.
- Delší setrvání může znamenat zaujetí i problém. V kontextu ostatních výsledků je v disertaci spojováno spíše s vyšší složitostí produktové karty Classic.

## Hodnocení estetiky VisAWI

Celkový efekt šablony: **F(2, 118) = 46,42; p < 0,001**. Všechna párová porovnání Classic, Step a Waltz byla významná na úrovni p < 0,001.

| Šablona a skupina | Průměr | SD | n |
|---|---:|---:|---:|
| Classic - ženy | 4,16 | 0,92 | 30 |
| Classic - muži | 4,23 | 0,71 | 31 |
| Step - ženy | 4,65 | 0,86 | 30 |
| Step - muži | 4,90 | 0,77 | 31 |
| Waltz - ženy | 5,44 | 0,63 | 30 |
| Waltz - muži | 5,18 | 0,65 | 31 |

Pořadí podle VisAWI: **Waltz > Step > Classic**. Nelze z něj udělat univerzální pořadí šablon, protože se současně měnil sortiment, vizuální obsah i struktura produktové karty.

## EMLI - pouze experimentální část disertace

Model EMLI byl v této studii vytvořen a poprvé použit. V samotné disertaci je výslovně uvedeno, že neprošel dlouhodobou verifikací a validací. Ve veřejné případové studii proto nemá být použit jako samostatný důkaz.

### Celá stránka, n = 61

| Šablona | Průměr EMLI | SD |
|---|---:|---:|
| Classic | 48,67 | 20,90 |
| Step | 51,54 | 19,52 |
| Waltz | 45,52 | 17,76 |

Rozdíl nebyl statisticky významný: F(2, 118) = 2,77; p = 0,067.

### AOI produktu, n = 56

| Šablona | Průměr EMLI | SD |
|---|---:|---:|
| Classic | 62,23 | 16,17 |
| Step | 51,94 | 15,24 |
| Waltz | 49,88 | 14,96 |

Rozdíl byl významný: F(2, 108) = 15,63; p < 0,001. Classic měl vyšší skóre než Step a Waltz. Tento výsledek je nutné komunikovat pouze jako výstup experimentálního modelu, ne jako validované měření mentální zátěže.

## Limity

- účastníci byli ve věku 18-26 let a pocházeli z jedné fakulty;
- studie testovala pouze jeden typ chování - vyhledání konkrétního produktu;
- šablony měly rozdílný sortiment, fotografie, barevnost, rozložení i množství informací;
- pozice hledaného produktu nebyla mezi šablonami totožná;
- výsledky nelze automaticky přenést na současné verze šablon Shoptetu;
- studie neměřila konverzní poměr, tržby ani dlouhodobé chování zákazníků;
- EMLI byl experimentální a v době disertace nevalidovaný;
- v textu výsledků počtu sakád je rozpor mezi slovním závěrem a uvedenou hodnotou párového testu Classic vs. Waltz (p = 0,537). Tento konkrétní pár nepoužívat ve veřejné komunikaci bez kontroly původního statistického výstupu;
- v části postupu je jednou uveden UEQ, zatímco metodika a výsledky pracují s VisAWI. Pro veřejný text používat VisAWI, které odpovídá analyzovaným výsledkům a tabulkám.

## Bezpečná veřejná tvrzení

- Testovali jsme tři reálné šablony Shoptetu: Classic, Step a Waltz.
- Studie zahrnovala 61 účastníků ve věku 18-26 let.
- Cílový produkt našlo do 60 sekund 60 z 61 účastníků.
- Celková doba dokončení úkolu se mezi šablonami významně nelišila.
- Rozdíly se ukázaly především při práci s cílovou produktovou kartou.
- Produktová karta s největším množstvím informací vyžadovala více fixací než dvě jednodušší varianty, ale nezrychlila dokončení úkolu.
- Waltz získal v tomto testu nejvyšší hodnocení estetiky, výsledek ale mohl ovlivnit rozdílný sortiment a obsah.
- Šablonu je potřeba testovat na skutečném obsahu a konkrétních zákaznických úkolech.

## Tvrzení, kterým se vyhnout

- „Testovali jsme stejné produkty nebo stejný sortiment ve třech šablonách.“
- „Porovnávali jsme volné prohlížení a cílený úkol.“
- „Waltz je nejlepší šablona Shoptetu.“
- „Classic má prokazatelně horší konverze.“
- „Více fixací automaticky znamená horší UX.“
- „Studie dokázala, že jedna šablona způsobuje vyšší mentální zátěž.“
- „Výsledky platí pro všechny současné e-shopy a zákaznické skupiny.“

## Doporučený navazující výzkum pro Shoptet

Pro čistší porovnání současných šablon použít:

1. stejný sortiment, produkty, fotografie, ceny a texty ve všech variantách;
2. stejné pozice cílových produktů;
3. více úkolů - hledání, porovnání, výběr varianty, přidání do košíku a kontrola dopravy;
4. vzorek odpovídající reálným zákazníkům jednotlivých segmentů;
5. oddělené vyhodnocení desktopu a mobilu;
6. eye tracking, úspěšnost úkolu, čas, chybovost, SUS nebo jiný vhodný UX dotazník a VisAWI pro estetiku;
7. následné ověření vybraných změn pomocí experimentu nebo provozních dat.

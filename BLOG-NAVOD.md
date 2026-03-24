# Jak přidat nový článek do blogu

## Rychlý návod (3 kroky)

### 1. Vytvořte soubor
Přejděte do složky `src/content/blog/` a vytvořte nový soubor s příponou `.md`.

**Název souboru = URL adresa článku**
Například: `jak-ziskat-feedback.md` → `uxmind.cz/blog/jak-ziskat-feedback`

### 2. Vyplňte metadata (frontmatter)
Na začátek souboru vložte tuto šablonu a vyplňte ji:

```md
---
title: "Název vašeho článku"
date: "2026-03-20"
author: "UX Mind"
excerpt: "Krátký popis článku (1-2 věty). Zobrazuje se v přehledu blogu a ve výsledcích vyhledávání."
coverImage: "https://odkaz-na-obrazek.jpg"
tags: ["UX", "Eye Tracking"]
video: "https://www.youtube.com/watch?v=XXXXX"
featured: false
draft: false
---
```

### 3. Napište obsah článku
Pod uzavírací `---` napište článek ve formátu Markdown.

---

## Pravidla pro media

### Obrázky
- Nahrát na Cloudflare R2 nebo jiný CDN
- Do článku vložit jako: `![Popis obrázku](https://cdn.uxmind.cz/obrazek.jpg)`
- Cover image = URL na hlavní obrázek v metadatech

### Video
- YouTube: zkopírujte URL videa (např. `https://www.youtube.com/watch?v=abc123`)
- Vimeo: zkopírujte URL videa
- Vložte do pole `video` v metadatech

---

## Markdown cheat sheet

```md
# Nadpis 1. úrovně
## Nadpis 2. úrovně
### Nadpis 3. úrovně

**tučný text**
*kurzíva*

- odrážka 1
- odrážka 2

1. číslovaný seznam
2. položka 2

[odkaz](https://uxmind.cz)
![obrázek](https://url-obrazku.jpg)

> citace
```

---

## Pole v metadatech

| Pole | Povinné | Popis |
|------|---------|-------|
| title | ✅ | Název článku |
| date | ✅ | Datum (YYYY-MM-DD) |
| excerpt | ✅ | Krátký popis (1-2 věty) |
| author | Ne | Výchozí: "UX Mind" |
| coverImage | Ne | URL hlavního obrázku |
| tags | Ne | Seznam tagů |
| video | Ne | URL YouTube/Vimeo |
| featured | Ne | Výchozí: false |
| draft | Ne | true = nezveřejněný |

---

## Chcete skrýt článek?
Nastavte `draft: true` — článek se nezobrazí na webu, ale soubor zůstane.

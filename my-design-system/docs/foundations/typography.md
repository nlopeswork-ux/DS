# Fundações — Tipografia

> Cobre a escala completa de `text-xs` até `display-2xl` (tamanhos + line-heights), pesos, e os *text styles* publicados no Figma.

---

## 1. Família Tipográfica

| Variável Figma | Valor | Token CSS | Tailwind |
|---|---|---|---|
| Font family/font-family-display | Inter | `--font-family-display` | `font-display` |
| Font family/font-family-body | Inter | `--font-family-body` | `font-body` |

## 2. Pesos (Font Weights)

| Variável Figma | Valor | Token CSS | Tailwind |
|---|---|---|---|
| Font weight/regular | Regular (400) | `--font-weight-regular` | `font-normal` |
| Font weight/medium | Medium (500) | `--font-weight-medium` | `font-medium` |
| Font weight/semibold | Semibold (600) | `--font-weight-semibold` | `font-semibold` |
| Font weight/bold | Bold (700) | `--font-weight-bold` | `font-bold` |

## 3. Tamanhos (Font Sizes) — text-xs → display-2xl

| Variável Figma | px | rem | Token CSS | Tailwind |
|---|---|---|---|---|
| Font size/text-xs | 12px | 0.75rem | `--font-size-xs` | `text-xs` |
| Font size/text-sm | 14px | 0.875rem | `--font-size-sm` | `text-sm` |
| Font size/text-md | 16px | 1rem | `--font-size-md` | `text-base` |
| Font size/text-lg | 18px | 1.125rem | `--font-size-lg` | `text-lg` |
| Font size/text-xl | 20px | 1.25rem | `--font-size-xl` | `text-xl` |
| Font size/display-xs | 24px | 1.5rem | `--font-size-display-xs` | `text-2xl` |
| Font size/display-sm | 30px | 1.875rem | `--font-size-display-sm` | `text-3xl` |
| Font size/display-md | 36px | 2.25rem | `--font-size-display-md` | `text-4xl` |
| Font size/display-lg | 48px | 3rem | `--font-size-display-lg` | `text-5xl` |
| Font size/display-xl | 60px | 3.75rem | `--font-size-display-xl` | `text-6xl` |
| Font size/display-2xl | 72px | 4.5rem | `--font-size-display-2xl` | `text-7xl` |

## 4. Alturas de Linha (Line Heights)

| Variável Figma | px | rem | Token CSS | Tailwind |
|---|---|---|---|---|
| Line height/text-xs | 18px | 1.125rem | `--line-height-xs` | `leading-[18px]` |
| Line height/text-sm | 20px | 1.25rem | `--line-height-sm` | `leading-5` |
| Line height/text-md | 24px | 1.5rem | `--line-height-md` | `leading-6` |
| Line height/text-lg | 28px | 1.75rem | `--line-height-lg` | `leading-7` |
| Line height/text-xl | 30px | 1.875rem | `--line-height-xl` | `leading-[30px]` |
| Line height/display-xs | 32px | 2rem | `--line-height-display-xs` | `leading-8` |
| Line height/display-sm | 38px | 2.375rem | `--line-height-display-sm` | `leading-[38px]` |
| Line height/display-md | 44px | 2.75rem | `--line-height-display-md` | `leading-[44px]` |
| Line height/display-lg | 60px | 3.75rem | `--line-height-display-lg` | `leading-[60px]` |
| Line height/display-xl | 72px | 4.5rem | `--line-height-display-xl` | `leading-[72px]` |
| Line height/display-2xl | 90px | 5.625rem | `--line-height-display-2xl` | `leading-[90px]` |

## 5. Tabela combinada (Tamanho + Line Height por escala)

| Escala | Font size | Line height | Letter spacing |
|---|---|---|---|
| text-xs | 12px | 18px | 0% |
| text-sm | 14px | 20px | 0% |
| text-md | 16px | 24px | 0% |
| text-lg | 18px | 28px | 0% |
| text-xl | 20px | 30px | 0% |
| display-xs | 24px | 32px | 0% |
| display-sm | 30px | 38px | 0% |
| display-md | 36px | 44px | 0% |
| display-lg | 48px | 60px | -2% |
| display-xl | 60px | 72px | -2% |
| display-2xl | 72px | 90px | -2% |

> Nota: a partir de `display-lg` o *letter-spacing* passa a `-2%` (tracking mais apertado, comum em headings grandes).

## 6. Text Styles publicados (Figma)

Cada escala de `Display` e `Text` está publicada em 4 pesos (Regular/Medium/Semibold/Bold):

| Estilo Figma | Weight | Size (px) | Line height | Letter spacing | Token CSS |
|---|---|---|---|---|---|
| Display 2xl/Regular | 400 | 72 | 90px | -2% | `--text-display-2xl` |
| Display 2xl/Medium | 500 | 72 | 90px | -2% | `--text-display-2xl-medium` |
| Display 2xl/Semibold | 600 | 72 | 90px | -2% | `--text-display-2xl-semibold` |
| Display 2xl/Bold | 700 | 72 | 90px | -2% | `--text-display-2xl-bold` |
| Display xl/Regular | 400 | 60 | 72px | -2% | `--text-display-xl` |
| Display xl/Medium | 500 | 60 | 72px | -2% | `--text-display-xl-medium` |
| Display xl/Semibold | 600 | 60 | 72px | -2% | `--text-display-xl-semibold` |
| Display xl/Bold | 700 | 60 | 72px | -2% | `--text-display-xl-bold` |
| Display lg/Regular | 400 | 48 | 60px | -2% | `--text-display-lg` |
| Display lg/Medium | 500 | 48 | 60px | -2% | `--text-display-lg-medium` |
| Display lg/Semibold | 600 | 48 | 60px | -2% | `--text-display-lg-semibold` |
| Display lg/Bold | 700 | 48 | 60px | -2% | `--text-display-lg-bold` |
| Display md/Regular | 400 | 36 | 44px | -2% | `--text-display-md` |
| Display md/Medium | 500 | 36 | 44px | -2% | `--text-display-md-medium` |
| Display md/Semibold | 600 | 36 | 44px | -2% | `--text-display-md-semibold` |
| Display md/Bold | 700 | 36 | 44px | -2% | `--text-display-md-bold` |
| Display sm/Regular | 400 | 30 | 38px | 0% | `--text-display-sm` |
| Display sm/Medium | 500 | 30 | 38px | 0% | `--text-display-sm-medium` |
| Display sm/Semibold | 600 | 30 | 38px | 0% | `--text-display-sm-semibold` |
| Display sm/Bold | 700 | 30 | 38px | 0% | `--text-display-sm-bold` |
| Display xs/Regular | 400 | 24 | 32px | 0% | `--text-display-xs` |
| Display xs/Medium | 500 | 24 | 32px | 0% | `--text-display-xs-medium` |
| Display xs/Semibold | 600 | 24 | 32px | 0% | `--text-display-xs-semibold` |
| Display xs/Bold | 700 | 24 | 32px | 0% | `--text-display-xs-bold` |
| Text xl/Regular | 400 | 20 | 30px | 0% | `--text-xl` |
| Text xl/Medium | 500 | 20 | 30px | 0% | `--text-xl-medium` |
| Text xl/Semibold | 600 | 20 | 30px | 0% | `--text-xl-semibold` |
| Text xl/Bold | 700 | 20 | 30px | 0% | `--text-xl-bold` |
| Text lg/Regular | 400 | 18 | 28px | 0% | `--text-lg` |
| Text lg/Medium | 500 | 18 | 28px | 0% | `--text-lg-medium` |
| Text lg/Semibold | 600 | 18 | 28px | 0% | `--text-lg-semibold` |
| Text lg/Bold | 700 | 18 | 28px | 0% | `--text-lg-bold` |
| Text md/Regular | 400 | 16 | 24px | 0% | `--text-md` |
| Text md/Medium | 500 | 16 | 24px | 0% | `--text-md-medium` |
| Text md/Semibold | 600 | 16 | 24px | 0% | `--text-md-semibold` |
| Text md/Bold | 700 | 16 | 24px | 0% | `--text-md-bold` |
| Text sm/Regular | 400 | 14 | 20px | 0% | `--text-sm` |
| Text sm/Medium | 500 | 14 | 20px | 0% | `--text-sm-medium` |
| Text sm/Semibold | 600 | 14 | 20px | 0% | `--text-sm-semibold` |
| Text sm/Bold | 700 | 14 | 20px | 0% | `--text-sm-bold` |
| Text xs/Regular | 400 | 12 | 18px | 0% | `--text-xs` |
| Text xs/Medium | 500 | 12 | 18px | 0% | `--text-xs-medium` |
| Text xs/Semibold | 600 | 12 | 18px | 0% | `--text-xs-semibold` |
| Text xs/Bold | 700 | 12 | 18px | 0% | `--text-xs-bold` |

> **Variantes** `italic` e `underlined` seguem os mesmos valores numéricos de cada estilo, adicionando `font-style: italic` ou `text-decoration: underline` respetivamente.

## 7. Uso por componente (referência rápida)

| Componente | Elemento | Estilo aplicado |
|---|---|---|
| Button | Label | text-sm, medium/semibold conforme size |
| Badge | Label | text-xs (sm) / text-sm (md, lg), medium |
| Tag | Label | text-sm, medium |
| Input Field | Label | text-sm, medium |
| Input Field | Valor/Hint | text-sm, regular |
| Input dropdown menu item | Texto | text-md, medium/regular |
| Dropdown list item | Texto | text-sm, medium |
| Checkbox / Checkbox group item | Label | text-sm (sm/md igual) ou text-md, medium |
| Toggle | Label / Supporting | text-md (16px), medium / regular |
| Avatar | Iniciais | escala variável (12–24px), semibold |
| Avatar | Label group | text-sm, medium (nome) / regular (apoio) |
| Tooltip | Título / Suporte | text-xs, semibold / medium |
| Progress bar | Label % | text-sm, medium |
| Progress circle | Number | display-md (varia por size), semibold, `font-family-display` |
| Progress circle | Label | text-sm, medium |
| Slider | Label | text-md, medium |
| Button group | Label | text-sm, semibold |

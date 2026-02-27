# Obchody

Modul Obchody je jádrem systému RELS. Slouží ke správě realitních obchodů od prvního kontaktu s klientem až po dokončení převodu nemovitosti. Každý obchod je identifikován spisovou značkou (SP.ZN.) s prefixem **500xxx**.

## Navigace

Klikněte na **Obchody** v levém bočním menu. Zobrazí se seznam všech obchodů.

## Seznam obchodů

Přehled obchodů zobrazuje tabulku s klíčovými informacemi:

- **SP.ZN.** — spisová značka (500xxx), unikátní identifikátor obchodu
- **Název** — stručný popis obchodu (např. "Prodej bytu 3+kk, Praha 5")
- **Stav** — aktuální fáze obchodu
- **Klient** — hlavní klient obchodu
- **Datum vytvoření** — kdy byl obchod založen
- **Termín** — nejbližší důležitý termín

### Filtrování a řazení

- Filtrujte podle stavu, klienta nebo časového období.
- Řaďte kliknutím na záhlaví sloupce.
- Použijte fulltextové vyhledávání pro rychlé nalezení obchodu.

## Vytvoření nového obchodu

1. Klikněte na tlačítko **Nový obchod**.
2. Vyplňte povinné údaje:
   - **SP.ZN.** — systém nabídne další volné číslo v řadě 500xxx
   - **Název obchodu** — stručný popis
   - **Typ obchodu** — prodej / koupě / převod
   - **Klient** — vyberte ze subjektů nebo vytvořte nový
3. Klikněte na **Uložit**.

::: tip
SP.ZN. se přiděluje automaticky, ale lze ji upravit. Vždy musí začínat prefixem 500.
:::

## Detail obchodu

Po kliknutí na obchod v seznamu se otevře detailní pohled s těmito záložkami:

### Základní údaje

- Spisová značka, název a typ obchodu
- Stav a aktuální fáze
- Odpovědný advokát a přiřazený asistent
- Poznámky a interní komentáře

### Účastníci

- **Prodávající** — vlastník nemovitosti
- **Kupující** — nabyvatel nemovitosti
- **Banka** — hypoteční banka (pokud je úvěr)
- **Realitní kancelář** — zprostředkovatel
- Každý účastník je propojen se záznamem v modulu Subjekty

### Nemovitost

- Adresa a katastrální údaje (LV, katastrální území, parcela)
- Typ nemovitosti (byt, dům, pozemek)
- Odkaz na katastrální záznam

### Fáze obchodu

Obchod prochází definovanými fázemi:

1. **Příprava** — shromažďování podkladů, ověření vlastnictví
2. **Smlouvy** — příprava kupní smlouvy a smlouvy o úschově
3. **Podpis** — podepsání smluv všemi stranami
4. **Úschova** — složení kupní ceny do úschovy
5. **Vklad** — podání návrhu na vklad do katastru
6. **Zápis** — čekání na zapsání v katastru nemovitostí
7. **Výplata** — uvolnění prostředků z úschovy
8. **Dokončeno** — obchod je ukončen

::: warning
Fáze lze přesouvat pouze dopředu. Návrat do předchozí fáze vyžaduje oprávnění advokáta a zaznamená se do historie.
:::

### Dokumenty

- Seznam dokumentů přiřazených k obchodu
- Nahrávání nových souborů
- Verze dokumentů

## Workflow obchodu

Typický průběh obchodu:

1. Advokát nebo asistent vytvoří nový obchod a přiřadí klienta.
2. Do obchodu se přidají účastníci (prodávající, kupující, banka).
3. Zadají se údaje o nemovitosti a ověří se v katastru.
4. Připraví se smluvní dokumentace.
5. Po podpisu smluv se vytvoří úschova.
6. Podá se návrh na vklad a sleduje se stav na katastru.
7. Po zápisu se uvolní prostředky z úschovy.
8. Obchod se označí jako dokončený.

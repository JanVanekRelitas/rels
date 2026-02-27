# Subjekty

Modul Subjekty slouží jako centrální databáze kontaktů. Evidují se zde všechny osoby a organizace, které figurují v obchodech a kauzách — klienti, protistrany, banky, realitní kanceláře, notáři a další.

## Navigace

Klikněte na **Subjekty** v levém bočním menu. Zobrazí se seznam všech evidovaných subjektů.

## Seznam subjektů

Přehled obsahuje:

- **Název / Jméno** — název firmy nebo jméno a příjmení osoby
- **Typ** — fyzická osoba / právnická osoba
- **IČO / Rodné číslo** — identifikátor (IČO u firem)
- **E-mail** — kontaktní e-mail
- **Telefon** — kontaktní telefon
- **Počet obchodů** — kolik obchodů je se subjektem spojeno

### Vyhledávání

- Fulltextové vyhledávání podle jména, IČO nebo e-mailu.
- Filtrování podle typu subjektu (fyzická / právnická osoba).
- Filtrování podle role v obchodech (klient, prodávající, kupující, banka).

## Vytvoření nového subjektu

1. Klikněte na tlačítko **Nový subjekt**.
2. Vyberte typ: **Fyzická osoba** nebo **Právnická osoba**.

### Fyzická osoba

- **Jméno a příjmení** — povinné
- **Datum narození** — pro identifikaci
- **Rodné číslo** — volitelné, chráněný údaj
- **Adresa trvalého bydliště** — ulice, město, PSČ
- **E-mail** — kontaktní e-mail
- **Telefon** — kontaktní telefon
- **Číslo účtu** — bankovní účet pro platby

### Právnická osoba

- **Název** — obchodní firma, povinné
- **IČO** — identifikační číslo, povinné
- **DIČ** — daňové identifikační číslo
- **Sídlo** — adresa sídla firmy
- **Jednající osoba** — kdo jedná za společnost
- **E-mail** — kontaktní e-mail
- **Telefon** — kontaktní telefon
- **Číslo účtu** — bankovní účet

::: tip
Při zadání IČO klikněte na tlačítko **Načíst z ARES** — systém automaticky doplní název firmy, sídlo a další údaje z obchodního rejstříku.
:::

## Propojení se obchody a kauzami

Každý subjekt může mít různé role v různých obchodech:

- **Klient** — hlavní klient advokátní kanceláře
- **Prodávající** — vlastník nemovitosti
- **Kupující** — nabyvatel nemovitosti
- **Banka** — hypoteční banka
- **Realitní kancelář** — zprostředkovatel
- **Protistrana** — oponent v kauze
- **Notář** — ověřující notář

Na detailu subjektu je přehled všech obchodů a kauz, ve kterých subjekt figuruje.

## Detail subjektu

Po kliknutí na subjekt se zobrazí:

- Veškeré kontaktní údaje
- Seznam propojených obchodů s rolemi
- Seznam propojených kauz
- Historie komunikace a poznámky

## IČO lookup

Systém umožňuje vyhledávat informace o právnických osobách pomocí IČO:

1. Na detailu subjektu nebo při vytváření nového klikněte na **Načíst z ARES**.
2. Zadejte IČO.
3. Systém načte údaje z registru ARES a automaticky vyplní formulář.

::: warning
Data z ARES jsou informativní. Vždy ověřte aktuálnost údajů, zejména adresu sídla a jednající osobu.
:::

## Import a export

- Subjekty lze exportovat do CSV pro další zpracování.
- Hromadný import subjektů z CSV souboru je dostupný v sekci Nastavení.

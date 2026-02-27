# Úschovy

Modul Úschovy slouží ke správě advokátních úschov finančních prostředků. Úschova je klíčovou součástí většiny realitních obchodů — kupní cena se skládá do úschovy a uvolňuje se po splnění podmínek (typicky po zápisu v katastru).

## Navigace

Klikněte na **Úschovy** v levém bočním menu. Zobrazí se přehled všech úschov.

## Seznam úschov

Tabulka úschov zobrazuje:

- **Číslo úschovy** — unikátní identifikátor
- **Obchod (SP.ZN.)** — propojený obchod
- **Složitel** — kdo prostředky skládá (kupující / banka)
- **Příjemce** — komu budou prostředky vyplaceny (prodávající)
- **Částka** — celková výše úschovy
- **Stav** — aktuální stav úschovy
- **Datum vytvoření** — kdy byla úschova založena

## Vytvoření nové úschovy

1. Klikněte na tlačítko **Nová úschova**.
2. Vyplňte údaje:
   - **Obchod** — vyberte propojený obchod (SP.ZN.)
   - **Složitel** — vyberte subjekt, který skládá prostředky
   - **Příjemce** — vyberte subjekt pro výplatu
   - **Celková částka** — výše úschovy v Kč
   - **Podmínky výplaty** — textový popis podmínek pro uvolnění prostředků
   - **Datum splatnosti** — termín, do kdy mají být prostředky složeny
3. Klikněte na **Uložit**.

::: tip
Úschovu lze vytvořit i přímo z detailu obchodu v záložce "Úschova". Obchod se automaticky propojí.
:::

## Stavy úschovy

- **Vytvořena** — úschova je založena, čeká se na složení prostředků
- **Částečně složena** — přijata část prostředků
- **Složena** — celá částka je na účtu úschovy
- **Podmínky splněny** — podmínky výplaty jsou splněny, čeká se na výplatu
- **Vyplacena** — prostředky byly vyplaceny příjemci
- **Vrácena** — prostředky byly vráceny složiteli (obchod neproběhl)
- **Uzavřena** — úschova je ukončena

## Sledování pohybů

### Příjem prostředků

1. Na detailu úschovy klikněte na **Zaznamenat příjem**.
2. Zadejte částku, datum přijetí a zdroj platby.
3. Systém automaticky aktualizuje stav úschovy.

### Výplata prostředků

1. Klikněte na **Zaznamenat výplatu**.
2. Zadejte částku, datum výplaty a příjemce.
3. Potvrďte splnění podmínek výplaty.

::: warning
Výplata prostředků vyžaduje potvrzení advokátem. Asistent může výplatu připravit, ale finální schválení provádí advokát.
:::

## Detail úschovy

Detail obsahuje:

- **Základní údaje** — číslo, obchod, složitel, příjemce, částka
- **Podmínky výplaty** — smluvní podmínky pro uvolnění prostředků
- **Pohyby** — chronologický seznam příjmů a výplat
- **Aktuální zůstatek** — kolik prostředků je aktuálně na účtu úschovy
- **Historie stavů** — kdy a kým byl stav změněn

## Propojení s obchodem

- Každá úschova je vázána na konkrétní obchod.
- Na detailu obchodu se zobrazuje stav úschovy.
- Změna stavu úschovy se promítá do fáze obchodu.

## Přehledy

- Filtrujte úschovy podle stavu (aktivní / uzavřené).
- Zobrazte celkový objem prostředků v úschovách.
- Exportujte přehled úschov do CSV.

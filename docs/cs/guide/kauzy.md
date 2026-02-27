# Kauzy

Modul Kauzy slouží ke správě právních kauz, které se liší od běžných obchodů — jde o soudní spory, vymáhání pohledávek, dědická řízení a další právní záležitosti. Každá kauza má spisovou značku (SP.ZN.) s prefixem **636xxx**.

## Navigace

Klikněte na **Kauzy** v levém bočním menu. Zobrazí se seznam všech kauz.

## Seznam kauz

Tabulka kauz obsahuje:

- **SP.ZN.** — spisová značka (636xxx)
- **Název** — stručný popis kauzy
- **Typ** — druh právní kauzy (spor, dědictví, vymáhání, ostatní)
- **Stav** — aktuální stav řízení
- **Klient** — zastupovaný klient
- **Soud / Úřad** — příslušný soud nebo úřad
- **Další jednání** — datum nejbližšího jednání

### Filtrování

- Podle typu kauzy, stavu nebo přiřazeného advokáta
- Fulltextové vyhledávání v názvu a SP.ZN.

## Vytvoření nové kauzy

1. Klikněte na tlačítko **Nová kauza**.
2. Vyplňte údaje:
   - **SP.ZN.** — systém nabídne další číslo v řadě 636xxx
   - **Název kauzy** — popis předmětu řízení
   - **Typ kauzy** — vyberte z nabídky
   - **Klient** — vyberte ze subjektů
   - **Protistrana** — vyberte nebo vytvořte nový subjekt
3. Klikněte na **Uložit**.

::: tip
Pokud kauza souvisí s existujícím obchodem, propojte je v sekci "Propojené obchody" na detailu kauzy.
:::

## Detail kauzy

### Základní informace

- Spisová značka, název a typ kauzy
- Stav řízení a fáze
- Odpovědný advokát
- Spisová značka soudu (pokud je přidělena)

### Účastníci

- **Klient** — zastupovaná strana
- **Protistrana** — oponent v řízení
- **Právní zástupce protistrany** — advokát protistrany
- **Soud / Úřad** — rozhodující orgán

### Časová osa

Kauza má chronologickou časovou osu, která zobrazuje:

- Datum zahájení řízení
- Podané návrhy a podání
- Jednání u soudu (s datem a výsledkem)
- Rozhodnutí a usnesení
- Odvolání a opravné prostředky
- Nabytí právní moci

Každá událost na časové ose obsahuje datum, popis a případně přiložené dokumenty.

### Propojení s obchody

- Kauzu lze propojit s jedním nebo více obchody.
- Propojení umožňuje sledovat souvislosti mezi obchodem a případným soudním sporem.
- Na detailu obchodu se zobrazí propojené kauzy a naopak.

## Stavy kauzy

- **Nová** — kauza byla založena, příprava podkladů
- **Podáno** — návrh byl podán u soudu / úřadu
- **Probíhá** — aktivní řízení, čekání na jednání nebo rozhodnutí
- **Rozhodnuto** — soud vydal rozhodnutí
- **Odvolání** — podáno odvolání
- **Pravomocné** — rozhodnutí nabylo právní moci
- **Uzavřeno** — kauza je ukončena

::: warning
Po přechodu do stavu "Pravomocné" nebo "Uzavřeno" nelze kauzu vrátit do předchozího stavu bez oprávnění advokáta.
:::

## Lhůty a termíny

- Systém sleduje procesní lhůty (odvolací lhůty, lhůty pro podání).
- Blížící se lhůty se zobrazují na dashboardu.
- K lhůtám lze nastavit e-mailové upozornění.

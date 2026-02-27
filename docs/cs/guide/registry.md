# Registry (ARES, RÚIAN, Katastr)

Modul Registry umožňuje vyhledávat informace ve veřejných státních registrech přímo z aplikace RELS. Získaná data lze rovnou přiřadit k obchodům, kauzám nebo subjektům.

## Navigace

Klikněte na **Registry** v levém bočním menu. Zobrazí se rozhraní pro vyhledávání v registrech.

## ARES — Administrativní registr ekonomických subjektů

ARES slouží k vyhledávání informací o firmách a podnikatelích v České republice.

### Jak vyhledávat

1. Vyberte záložku **ARES**.
2. Zadejte jedno z kritérií:
   - **IČO** — identifikační číslo osoby (8 číslic)
   - **Název firmy** — obchodní firma nebo její část
3. Klikněte na **Vyhledat**.

### Vrácená data

- **Obchodní firma** — úplný název subjektu
- **IČO** — identifikační číslo
- **DIČ** — daňové identifikační číslo
- **Sídlo** — adresa sídla
- **Právní forma** — s.r.o., a.s., OSVČ apod.
- **Datum vzniku** — kdy byl subjekt založen
- **Předmět podnikání** — obory činnosti
- **Stav** — aktivní / v likvidaci / zaniklý

::: tip
Po vyhledání klikněte na **Převzít do subjektů** — systém automaticky vytvoří nový subjekt s daty z ARES.
:::

## RÚIAN — Registr územní identifikace, adres a nemovitostí

RÚIAN slouží k ověření a validaci adres v České republice.

### Jak vyhledávat

1. Vyberte záložku **RÚIAN**.
2. Zadejte adresu:
   - **Obec** — název obce
   - **Ulice** — název ulice (pokud existuje)
   - **Číslo popisné / orientační** — číslo domu
3. Klikněte na **Vyhledat**.

### Vrácená data

- **Adresní místo** — úplná ověřená adresa
- **Kód adresního místa** — unikátní identifikátor
- **Obec** — název obce a její kód
- **Část obce** — pokud existuje
- **Ulice** — název ulice
- **Číslo domovní** — popisné a orientační
- **PSČ** — poštovní směrovací číslo
- **Katastrální území** — název a kód
- **Parcela** — číslo parcely, na které budova stojí
- **Souřadnice** — GPS poloha adresního místa

::: tip
RÚIAN je užitečný pro ověření, zda adresa existuje a je správně zapsaná. Použijte ho při zadávání adres subjektů.
:::

## Katastr nemovitostí — ČÚZK

Vyhledávání v Katastru nemovitostí je podrobněji popsáno v samostatné kapitole [Katastr](/cs/guide/katastr). V rámci modulu Registry nabízí zrychlený přístup:

### Rychlé vyhledání

1. Vyberte záložku **Katastr**.
2. Zadejte katastrální území a číslo LV, nebo parcelu.
3. Klikněte na **Vyhledat**.

### Vrácená data

- Vlastníci a spoluvlastníci
- Seznam parcel a budov na LV
- Věcná břemena a zástavní práva
- Probíhající řízení (plomby)

## Práce s výsledky

### Přiřazení k subjektu

- Po vyhledání v ARES klikněte na **Převzít do subjektů**.
- Systém vytvoří nový subjekt nebo aktualizuje existující.

### Přiřazení k obchodu

- Výsledky z Katastru lze přiřadit k obchodu kliknutím na **Přiřadit k obchodu**.
- Katastrální údaje se uloží na záložku Nemovitost.

### Ověření adresy

- Výsledek z RÚIAN lze použít k validaci adresy subjektu.
- Klikněte na **Použít adresu** pro přepsání stávající adresy.

::: warning
Data z registrů mohou být aktualizována se zpožděním. Pro právní úkony ověřte údaje aktuálním výpisem z příslušného registru.
:::

## Offline režim

- Pokud je registr dočasně nedostupný, systém zobrazí upozornění.
- Dříve načtená data zůstávají uložena a jsou dostupná v mezipaměti.

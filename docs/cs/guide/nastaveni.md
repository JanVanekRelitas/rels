# Nastavení

Modul Nastavení slouží ke konfiguraci systému RELS. Umožňuje spravovat uživatele, přidělovat role, nastavovat parametry kanceláře a přizpůsobovat chování aplikace.

## Navigace

Klikněte na **Nastavení** v levém bočním menu (ikona ozubeného kola). Modul je dostupný podle oprávnění jednotlivých rolí.

::: warning
Většina nastavení je dostupná pouze pro roli advokáta. Asistenti mohou měnit pouze svůj profil.
:::

## Správa uživatelů

### Seznam uživatelů

Přehled všech uživatelů systému:

- **Jméno** — celé jméno uživatele
- **E-mail** — přihlašovací e-mail
- **Role** — advokát / asistent / klient
- **Stav** — aktivní / deaktivovaný
- **Poslední přihlášení** — datum a čas

### Přidání nového uživatele

1. Klikněte na **Nový uživatel**.
2. Vyplňte údaje:
   - **Jméno a příjmení** — celé jméno
   - **E-mail** — musí být unikátní v systému
   - **Role** — vyberte roli
   - **Heslo** — počáteční heslo (uživatel si ho změní po prvním přihlášení)
3. Klikněte na **Vytvořit uživatele**.
4. Uživatel obdrží uvítací e-mail s přihlašovacími údaji.

### Úprava uživatele

- Klikněte na uživatele v seznamu.
- Upravte potřebné údaje (jméno, roli, stav).
- Klikněte na **Uložit změny**.

### Deaktivace uživatele

- Na detailu uživatele klikněte na **Deaktivovat**.
- Deaktivovaný uživatel se nemůže přihlásit, ale jeho data zůstanou v systému.
- Uživatele lze kdykoli znovu aktivovat.

::: tip
Místo mazání uživatele použijte deaktivaci. Zachová se tak historie přiřazených obchodů, kauz a úkolů.
:::

## Přidělování rolí

### Role a oprávnění

| Oprávnění | Advokát | Asistent | Klient |
|---|:---:|:---:|:---:|
| Obchody — zobrazení | Všechny | Všechny | Pouze své |
| Obchody — úprava | Ano | Ano | Ne |
| Kauzy — zobrazení | Všechny | Všechny | Pouze své |
| Finance | Ano | Omezené | Ne |
| Úschovy — schválení výplaty | Ano | Ne | Ne |
| Správa uživatelů | Ano | Ne | Ne |
| Nastavení systému | Ano | Ne | Ne |
| Docházka — schvalování | Ano | Ne | Ne |

### Změna role

1. Otevřete detail uživatele.
2. V poli **Role** vyberte novou roli.
3. Klikněte na **Uložit změny**.
4. Změna se projeví při dalším přihlášení uživatele.

## Nastavení kanceláře

### Základní údaje

- **Název kanceláře** — např. "JUDr. Jan Novák, advokátní kancelář"
- **IČO** — identifikační číslo kanceláře
- **Sídlo** — adresa kanceláře
- **E-mail** — kontaktní e-mail kanceláře
- **Telefon** — kontaktní telefon
- **Číslo účtu** — bankovní účet pro úschovy
- **Evidenční číslo ČAK** — registrace u České advokátní komory

### Logo a branding

- Nahrajte logo kanceláře (zobrazuje se v záhlaví a na fakturách).
- Podporované formáty: PNG, JPG, SVG.

## Systémová nastavení

### Číselné řady

- **Obchody** — nastavení počáteční hodnoty řady SP.ZN. (výchozí 500001)
- **Kauzy** — nastavení počáteční hodnoty řady SP.ZN. (výchozí 636001)
- **Faktury** — formát čísla faktury (výchozí RRRR-XXXX)

### Upozornění

- **E-mailová upozornění** — zapnutí/vypnutí e-mailových notifikací
- **Upozornění na termíny** — kolik dní předem upozorňovat (výchozí 3 dny)
- **Upozornění na splatnost** — upomínky na neuhrazené faktury

### Zálohování dat

- Systém automaticky zálohuje data denně.
- Ruční zálohu spustíte kliknutím na **Vytvořit zálohu**.
- Zálohy jsou dostupné ke stažení po dobu 30 dní.

## Profil uživatele

Každý uživatel může upravit svůj profil:

- **Jméno** — zobrazované jméno v systému
- **E-mail** — přihlašovací e-mail (změna vyžaduje ověření)
- **Heslo** — změna hesla (vyžaduje zadání stávajícího hesla)
- **Jazyk** — čeština / angličtina
- **Časové pásmo** — výchozí Evropa/Praha

::: tip
Změnu jazyka provedete v nastavení profilu. Aplikace podporuje češtinu a angličtinu.
:::

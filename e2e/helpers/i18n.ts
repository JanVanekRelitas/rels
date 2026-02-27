/**
 * Czech i18n labels — mirrors app/i18n/cs.json for use in selectors.
 */
export const cs = {
  nav: {
    dashboard: 'Přehled',
    deals: 'Obchody',
    cases: 'Kauzy',
    tasks: 'Úkoly',
    cadastral: 'Katastr',
    escrow: 'Úschovy',
    contacts: 'Subjekty',
    finance: 'Finance',
    attendance: 'Docházka',
    registry: 'Registry',
    admin: 'Nastavení',
  },
  auth: {
    login: 'Přihlášení',
    logout: 'Odhlásit',
    signIn: 'Přihlásit se',
  },
  deal: {
    spzn: 'SP.ZN.',
    nazev: 'Název',
    klient: 'Klient',
    typ: 'Typ',
    new: 'Nový obchod',
    overview: 'Přehled',
    payments: 'Platby',
    escrow: 'Úschova',
    cadastral: 'Katastr',
    documents: 'Dokumenty',
  },
  phase: {
    rezervace: 'Rezervace',
    zpracovani: 'Zpracování',
    finalizace: 'Finalizace',
    uschova: 'Úschova',
    katastr: 'Katastr',
    vyplaceni: 'Vyplacení',
    dokonceni: 'Dokončení',
  },
  case: {
    pripad: 'Případ',
    stav: 'Aktuální stav',
  },
  task: {
    ukol: 'Úkol',
    datum: 'Datum',
    lhuta: 'Lhůta',
    status: {
      pending: 'Čeká',
      in_progress: 'Probíhá',
      done: 'Hotovo',
    },
  },
  contact: {
    jmeno: 'Jméno',
    typ: 'Typ',
    telefon: 'Telefon',
    email: 'E-mail',
    ico: 'IČO',
  },
  escrow: {
    account: 'Účet',
    balance: 'Zůstatek',
  },
  registry: {
    ares: 'ARES',
    ruian: 'RUIAN',
    katastr: 'Katastr nemovitostí',
  },
  common: {
    search: 'Hledat',
    loading: 'Načítání...',
    noResults: 'Žádné výsledky',
  },
} as const;

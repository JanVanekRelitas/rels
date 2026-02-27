import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/rels/',
  title: 'RELS',
  description: 'Real Estate Legal Solutions — Uživatelská příručka',

  locales: {
    cs: {
      label: 'Česky',
      lang: 'cs',
      title: 'RELS — Uživatelská příručka',
      description: 'Příručka pro systém RELS',
      themeConfig: {
        nav: [
          { text: 'Úvod', link: '/cs/' },
          { text: 'Průvodce', link: '/cs/guide/prihlaseni' },
        ],
        sidebar: [
          {
            text: 'Průvodce',
            items: [
              { text: 'Přihlášení', link: '/cs/guide/prihlaseni' },
              { text: 'Přehled', link: '/cs/guide/prehled' },
              { text: 'Obchody', link: '/cs/guide/obchody' },
              { text: 'Kauzy', link: '/cs/guide/kauzy' },
              { text: 'Úkoly', link: '/cs/guide/ukoly' },
              { text: 'Subjekty', link: '/cs/guide/subjekty' },
              { text: 'Úschovy', link: '/cs/guide/uschovy' },
              { text: 'Katastr', link: '/cs/guide/katastr' },
              { text: 'Finance', link: '/cs/guide/finance' },
              { text: 'Docházka', link: '/cs/guide/dochazka' },
              { text: 'Registry', link: '/cs/guide/registry' },
              { text: 'Nastavení', link: '/cs/guide/nastaveni' },
            ],
          },
        ],
        outlineTitle: 'Na této stránce',
        docFooter: { prev: 'Předchozí', next: 'Další' },
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'RELS — User Manual',
      description: 'User manual for the RELS system',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/login' },
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Login', link: '/en/guide/login' },
              { text: 'Dashboard', link: '/en/guide/dashboard' },
              { text: 'Deals', link: '/en/guide/deals' },
              { text: 'Cases', link: '/en/guide/cases' },
              { text: 'Tasks', link: '/en/guide/tasks' },
              { text: 'Contacts', link: '/en/guide/contacts' },
              { text: 'Escrow', link: '/en/guide/escrow' },
              { text: 'Cadastral', link: '/en/guide/cadastral' },
              { text: 'Finance', link: '/en/guide/finance' },
              { text: 'Attendance', link: '/en/guide/attendance' },
              { text: 'Registry', link: '/en/guide/registry' },
              { text: 'Settings', link: '/en/guide/settings' },
            ],
          },
        ],
      },
    },
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/JanVanekRelitas/rels' },
    ],
  },
})

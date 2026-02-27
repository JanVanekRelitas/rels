export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  i18n: {
    locales: [
      { code: 'cs', name: 'Čeština', file: 'cs.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'cs',
    lazy: true,
    langDir: '../i18n',
    strategy: 'no_prefix',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  runtimeConfig: {
    public: {
      firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
      },
      e2e: '',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-03-01',
});

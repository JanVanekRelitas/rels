<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const { loading, error, aresLookup, ruianLookup, katastrLvLookup } = useRegistry();

const activeTab = ref('ares');
const icoInput = ref('');
const addressInput = ref('');
const lvInput = ref('');
const katastrInput = ref('');

const aresResult = ref<Awaited<ReturnType<typeof aresLookup>>>(null);
const ruianResult = ref<Awaited<ReturnType<typeof ruianLookup>>>(null);
const katastrResult = ref<Awaited<ReturnType<typeof katastrLvLookup>>>(null);

async function searchAres() {
  if (!icoInput.value) return;
  aresResult.value = await aresLookup(icoInput.value);
}

async function searchRuian() {
  if (!addressInput.value) return;
  ruianResult.value = await ruianLookup(addressInput.value);
}

async function searchKatastr() {
  if (!lvInput.value || !katastrInput.value) return;
  katastrResult.value = await katastrLvLookup(lvInput.value, katastrInput.value);
}

const tabs = [
  { label: t('registry.ares'), value: 'ares' },
  { label: t('registry.ruian'), value: 'ruian' },
  { label: t('registry.katastr'), value: 'katastr' },
];
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar :title="t('registry.title')" />
    </template>

    <div class="p-4">
      <UTabs v-model="activeTab" :items="tabs" />

      <div class="mt-4">
        <!-- ARES -->
        <div v-if="activeTab === 'ares'" class="space-y-4">
          <div class="flex gap-2">
            <UInput v-model="icoInput" :placeholder="t('contact.ico')" />
            <UButton :label="t('common.search')" :loading="loading" @click="searchAres" />
          </div>
          <div v-if="aresResult" class="p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <p><strong>{{ aresResult.nazev }}</strong></p>
            <p>{{ aresResult.sidlo }}</p>
          </div>
        </div>

        <!-- RUIAN -->
        <div v-if="activeTab === 'ruian'" class="space-y-4">
          <div class="flex gap-2">
            <UInput v-model="addressInput" :placeholder="t('contact.adresa')" />
            <UButton :label="t('common.search')" :loading="loading" @click="searchRuian" />
          </div>
          <div v-if="ruianResult?.results?.length" class="space-y-2">
            <div v-for="r in ruianResult.results" :key="r.kod" class="p-2 bg-gray-50 dark:bg-gray-900 rounded">
              {{ r.adresa }}
            </div>
          </div>
        </div>

        <!-- Katastr -->
        <div v-if="activeTab === 'katastr'" class="space-y-4">
          <div class="flex gap-2">
            <UInput v-model="lvInput" placeholder="Číslo LV" />
            <UInput v-model="katastrInput" placeholder="Katastrální území" />
            <UButton :label="t('common.search')" :loading="loading" @click="searchKatastr" />
          </div>
          <pre v-if="katastrResult" class="p-4 bg-gray-50 dark:bg-gray-900 rounded text-sm overflow-auto">{{ JSON.stringify(katastrResult, null, 2) }}</pre>
        </div>

        <UAlert v-if="error" color="error" :title="error" class="mt-4" />
      </div>
    </div>
  </UDashboardPanel>
</template>

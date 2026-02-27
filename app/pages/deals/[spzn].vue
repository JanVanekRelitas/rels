<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const route = useRoute();
const spzn = route.params.spzn as string;

const { deal, payments, escrowEntries, cadastral, loading, subscribe } = useDeal(spzn);

onMounted(() => {
  subscribe();
});

const tabs = computed(() => [
  { label: t('deal.overview'), value: 'overview' },
  { label: t('deal.payments'), value: 'payments' },
  { label: t('deal.escrow'), value: 'escrow' },
  { label: t('deal.cadastral'), value: 'cadastral' },
  { label: t('deal.documents'), value: 'documents' },
]);

const activeTab = ref('overview');
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar>
        <template #left>
          <UButton icon="i-lucide-arrow-left" variant="ghost" to="/deals" />
          <span class="font-mono font-bold">{{ spzn }}</span>
          <span v-if="deal" class="text-gray-500 ml-2">{{ deal.nazev }}</span>
        </template>
      </UDashboardNavbar>
    </template>

    <div v-if="loading" class="flex items-center justify-center p-12">
      <UIcon name="i-lucide-loader-2" class="animate-spin h-8 w-8" />
    </div>

    <template v-else-if="deal">
      <UTabs v-model="activeTab" :items="tabs" class="px-4 pt-4" />

      <div class="p-4">
        <!-- Overview tab -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <UFormField :label="t('deal.klient')">
              <p>{{ deal.klient }}</p>
            </UFormField>
            <UFormField :label="t('deal.typ')">
              <p>{{ deal.typ }}</p>
            </UFormField>
          </div>

          <UFormField :label="t('deal.notes')">
            <p class="whitespace-pre-wrap">{{ deal.poznamky }}</p>
          </UFormField>
        </div>

        <!-- Payments tab -->
        <div v-if="activeTab === 'payments'">
          <UTable
            :data="payments"
            :columns="[
              { accessorKey: 'direction', header: 'Typ' },
              { accessorKey: 'castka', header: t('finance.amount') },
              { accessorKey: 'popis', header: 'Popis' },
            ]"
          />
        </div>

        <!-- Escrow tab -->
        <div v-if="activeTab === 'escrow'">
          <UTable
            :data="escrowEntries"
            :columns="[
              { accessorKey: 'typ', header: 'Typ' },
              { accessorKey: 'castka', header: t('finance.amount') },
              { accessorKey: 'popis', header: 'Popis' },
            ]"
          />
        </div>

        <!-- Cadastral tab -->
        <div v-if="activeTab === 'cadastral'">
          <UTable
            :data="cadastral"
            :columns="[
              { accessorKey: 'cisloRizeni', header: t('cadastral.cisloRizeni') },
              { accessorKey: 'status', header: t('cadastral.stav') },
              { accessorKey: 'predmet', header: 'Předmět' },
            ]"
          />
        </div>

        <!-- Documents tab -->
        <div v-if="activeTab === 'documents'">
          <p class="text-gray-500">{{ t('common.noResults') }}</p>
        </div>
      </div>
    </template>

    <div v-else class="p-8 text-center text-gray-500">
      {{ t('common.noResults') }}
    </div>
  </UDashboardPanel>
</template>

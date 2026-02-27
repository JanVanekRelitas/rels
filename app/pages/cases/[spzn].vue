<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const route = useRoute();
const spzn = route.params.spzn as string;
const casesStore = useCasesStore();

const legalCase = computed(() => casesStore.cases.find((c) => c.spzn === spzn));

onMounted(() => {
  if (!casesStore.cases.length) {
    casesStore.subscribe(false);
  }
});
</script>

<template>
  <UDashboardPanel grow>
    <template #header>
      <UDashboardNavbar>
        <template #left>
          <UButton icon="i-lucide-arrow-left" variant="ghost" to="/cases" />
          <span class="font-mono font-bold">{{ spzn }}</span>
          <span v-if="legalCase" class="text-gray-500 ml-2">{{ legalCase.pripad }}</span>
        </template>
      </UDashboardNavbar>
    </template>

    <div v-if="legalCase" class="p-4 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <UFormField :label="t('deal.klient')">
          <p>{{ legalCase.klient }}</p>
        </UFormField>
        <UFormField :label="t('case.stav')">
          <p>{{ legalCase.aktualniStav }}</p>
        </UFormField>
      </div>
      <UFormField :label="t('deal.notes')">
        <p class="whitespace-pre-wrap">{{ legalCase.poznamky }}</p>
      </UFormField>
    </div>

    <div v-else class="p-8 text-center text-gray-500">
      {{ t('common.loading') }}
    </div>
  </UDashboardPanel>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const casesStore = useCasesStore();

const search = ref('');

onMounted(() => {
  casesStore.subscribe(false);
});

onUnmounted(() => {
  casesStore.unsubscribeAll();
});

const filteredCases = computed(() => {
  if (!search.value) return casesStore.cases;
  const q = search.value.toLowerCase();
  return casesStore.cases.filter(
    (c) =>
      c.spzn.includes(q) ||
      c.pripad.toLowerCase().includes(q) ||
      c.klient.toLowerCase().includes(q),
  );
});
</script>

<template>
  <UDashboardPanel grow>
    <template #header>
      <UDashboardNavbar :title="t('nav.cases')">
        <template #right>
          <UInput v-model="search" :placeholder="t('common.search')" icon="i-lucide-search" />
          <UButton :label="t('case.new')" icon="i-lucide-plus" />
        </template>
      </UDashboardNavbar>
    </template>

    <UAlert v-if="casesStore.error" color="error" icon="i-lucide-alert-triangle" :title="casesStore.error" class="m-4" />

    <UTable
      v-else
      :data="filteredCases"
      :columns="[
        { accessorKey: 'spzn', header: t('deal.spzn') },
        { accessorKey: 'pripad', header: t('case.pripad') },
        { accessorKey: 'klient', header: t('deal.klient') },
        { accessorKey: 'aktualniStav', header: t('case.stav') },
      ]"
      :loading="casesStore.loading"
    >
      <template #spzn-cell="{ row }">
        <NuxtLink :to="`/cases/${row.original.spzn}`" class="font-mono font-semibold text-primary">
          {{ row.original.spzn }}
        </NuxtLink>
      </template>
    </UTable>
  </UDashboardPanel>
</template>

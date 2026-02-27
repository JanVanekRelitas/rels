<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const dealsStore = useDealsStore();

const search = ref('');

onMounted(() => {
  dealsStore.subscribe(false);
});

onUnmounted(() => {
  dealsStore.unsubscribeAll();
});

const filteredDeals = computed(() => {
  if (!search.value) return dealsStore.deals;
  const q = search.value.toLowerCase();
  return dealsStore.deals.filter(
    (d) =>
      d.spzn.includes(q) ||
      d.nazev.toLowerCase().includes(q) ||
      d.klient.toLowerCase().includes(q),
  );
});
</script>

<template>
  <UDashboardPanel grow>
    <template #header>
      <UDashboardNavbar :title="t('nav.deals')">
        <template #right>
          <UInput v-model="search" :placeholder="t('common.search')" icon="i-lucide-search" />
          <UButton :label="t('deal.new')" icon="i-lucide-plus" to="/deals/new" />
        </template>
      </UDashboardNavbar>
    </template>

    <UAlert v-if="dealsStore.error" color="error" icon="i-lucide-alert-triangle" :title="dealsStore.error" class="m-4" />

    <UTable
      v-else
      :data="filteredDeals"
      :columns="[
        { accessorKey: 'spzn', header: t('deal.spzn') },
        { accessorKey: 'nazev', header: t('deal.nazev') },
        { accessorKey: 'klient', header: t('deal.klient') },
        { accessorKey: 'typ', header: t('deal.typ') },
      ]"
      :loading="dealsStore.loading"
    >
      <template #spzn-cell="{ row }">
        <NuxtLink :to="`/deals/${row.original.spzn}`" class="font-mono font-semibold text-primary">
          {{ row.original.spzn }}
        </NuxtLink>
      </template>
    </UTable>
  </UDashboardPanel>
</template>

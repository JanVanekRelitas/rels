<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const dealsStore = useDealsStore();
const uiStore = useUiStore();

onMounted(() => {
  dealsStore.subscribe(uiStore.showArchived);
});

onUnmounted(() => {
  dealsStore.unsubscribeAll();
});

watch(() => uiStore.showArchived, (archived) => {
  dealsStore.unsubscribeAll();
  dealsStore.subscribe(archived);
});

const phases = ['rezervace', 'zpracovani', 'finalizace', 'uschova', 'katastr', 'vyplaceni', 'dokonceni'] as const;
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar :title="t('dashboard.title')">
      <template #right>
        <UButton :label="t('deal.new')" icon="i-lucide-plus" to="/deals/new" />
        <UButton
          :label="uiStore.showArchived ? 'Aktivní' : 'Archiv'"
          variant="ghost"
          icon="i-lucide-archive"
          @click="uiStore.toggleArchived()"
        />
      </template>
    </UDashboardNavbar>

    <div v-if="dealsStore.loading" class="flex items-center justify-center p-12">
      <UIcon name="i-lucide-loader-2" class="animate-spin h-8 w-8" />
    </div>

    <UAlert v-else-if="dealsStore.error" color="error" icon="i-lucide-alert-triangle" :title="dealsStore.error" class="m-4" />

    <UTable
      v-else
      :data="dealsStore.deals"
      :columns="[
        { accessorKey: 'spzn', header: t('deal.spzn') },
        { accessorKey: 'nazev', header: t('deal.nazev') },
        { accessorKey: 'klient', header: t('deal.klient') },
        { accessorKey: 'typ', header: t('deal.typ') },
        ...phases.map(p => ({ accessorKey: `phases.${p}.status`, header: t(`phase.${p}`) })),
      ]"
      class="w-full"
    >
      <template #spzn-cell="{ row }">
        <NuxtLink :to="`/deals/${row.original.spzn}`" class="font-mono font-semibold text-primary">
          {{ row.original.spzn }}
        </NuxtLink>
      </template>
    </UTable>
  </UDashboardPanel>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const tasksStore = useTasksStore();

onMounted(() => {
  tasksStore.subscribe();
});

onUnmounted(() => {
  tasksStore.unsubscribeAll();
});

const columns = [
  { accessorKey: 'spzn', header: t('deal.spzn') },
  { accessorKey: 'klient', header: t('deal.klient') },
  { accessorKey: 'ukol', header: t('task.ukol') },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'urgent', header: t('task.urgent') },
  { accessorKey: 'odhad', header: t('task.odhad') },
  { accessorKey: 'realnyTime', header: t('task.realnyTime') },
];
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar :title="t('nav.tasks')">
        <template #right>
          <UButton :label="t('task.new')" icon="i-lucide-plus" />
        </template>
      </UDashboardNavbar>
    </template>

    <UTable :data="tasksStore.tasks" :columns="columns" :loading="tasksStore.loading">
      <template #spzn-cell="{ row }">
        <NuxtLink :to="`/deals/${row.original.spzn}`" class="font-mono text-primary">
          {{ row.original.spzn }}
        </NuxtLink>
      </template>
      <template #urgent-cell="{ row }">
        <UBadge v-if="row.original.urgent" color="error" variant="subtle">!</UBadge>
      </template>
      <template #status-cell="{ row }">
        <UBadge
          :color="row.original.status === 'done' ? 'success' : row.original.status === 'in_progress' ? 'warning' : 'neutral'"
          variant="subtle"
        >
          {{ t(`task.status.${row.original.status}`) }}
        </UBadge>
      </template>
    </UTable>
  </UDashboardPanel>
</template>

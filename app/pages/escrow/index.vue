<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const escrowStore = useEscrowStore();

onMounted(() => {
  escrowStore.subscribe();
});

onUnmounted(() => {
  escrowStore.unsubscribeAll();
});
</script>

<template>
  <UDashboardPanel grow>
    <template #header>
      <UDashboardNavbar :title="t('escrow.title')" />
    </template>

    <UAlert v-if="escrowStore.error" color="error" icon="i-lucide-alert-triangle" :title="escrowStore.error" class="m-4" />

    <UTable
      v-else
      :data="escrowStore.accounts"
      :columns="[
        { accessorKey: 'cisloUctu', header: t('escrow.account') },
        { accessorKey: 'spzn', header: t('deal.spzn') },
        { accessorKey: 'klient', header: t('deal.klient') },
        { accessorKey: 'zustatek', header: t('escrow.balance') },
      ]"
      :loading="escrowStore.loading"
    />
  </UDashboardPanel>
</template>

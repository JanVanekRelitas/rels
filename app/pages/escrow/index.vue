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
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar :title="t('escrow.title')" />
    </template>

    <UTable
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

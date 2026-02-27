<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
</script>

<template>
  <UDashboardPanel grow>
    <template #header>
      <UDashboardNavbar :title="t('finance.title')" />
    </template>

    <div class="p-4">
      <p class="text-gray-500">{{ t('common.noResults') }}</p>
    </div>
  </UDashboardPanel>
</template>

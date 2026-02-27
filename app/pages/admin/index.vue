<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
</script>

<template>
  <UDashboardPanel grow>
    <template #header>
      <UDashboardNavbar :title="t('nav.admin')" />
    </template>

    <div class="p-4">
      <p class="text-gray-500">Settings, users, and lookup table management will go here.</p>
    </div>
  </UDashboardPanel>
</template>

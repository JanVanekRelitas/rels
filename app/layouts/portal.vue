<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel>
      <template #header>
        <UDashboardSidebarHeader>
          <span class="text-lg font-bold">RELS — {{ t('portal.title') }}</span>
        </UDashboardSidebarHeader>
      </template>

      <UNavigationMenu
        :items="[
          { label: t('portal.myDeals'), icon: 'i-lucide-folder', to: '/portal' },
        ]"
        orientation="vertical"
      />
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>

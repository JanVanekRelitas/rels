<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      :default-size="15"
      :min-size="10"
      :max-size="25"
    >
      <template #header>
        <span class="text-lg font-bold truncate">RELS — {{ t('portal.title') }}</span>
      </template>

      <UNavigationMenu
        :items="[
          { label: t('portal.myDeals'), icon: 'i-lucide-folder', to: '/portal' },
        ]"
        orientation="vertical"
      />
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>

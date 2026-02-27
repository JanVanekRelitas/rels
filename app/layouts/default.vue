<script setup lang="ts">
const { t } = useI18n();

const navigation = computed(() => [
  {
    label: t('nav.dashboard'),
    icon: 'i-lucide-layout-dashboard',
    to: '/',
  },
  {
    label: t('nav.deals'),
    icon: 'i-lucide-handshake',
    to: '/deals',
  },
  {
    label: t('nav.cases'),
    icon: 'i-lucide-scale',
    to: '/cases',
  },
  {
    label: t('nav.tasks'),
    icon: 'i-lucide-check-square',
    to: '/tasks',
  },
  {
    label: t('nav.cadastral'),
    icon: 'i-lucide-map-pin',
    to: '/cadastral',
  },
  {
    label: t('nav.escrow'),
    icon: 'i-lucide-vault',
    to: '/escrow',
  },
  {
    label: t('nav.contacts'),
    icon: 'i-lucide-users',
    to: '/contacts',
  },
  {
    label: t('nav.finance'),
    icon: 'i-lucide-banknote',
    to: '/finance',
  },
  {
    label: t('nav.attendance'),
    icon: 'i-lucide-clock',
    to: '/attendance',
  },
  {
    label: t('nav.registry'),
    icon: 'i-lucide-search',
    to: '/registry',
  },
]);
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel>
      <template #header>
        <UDashboardSidebarHeader>
          <span class="text-lg font-bold">RELS</span>
        </UDashboardSidebarHeader>
      </template>

      <UNavigationMenu :items="navigation" orientation="vertical" />

      <template #footer>
        <UDashboardSidebarFooter>
          <UButton
            icon="i-lucide-settings"
            variant="ghost"
            :to="'/admin'"
            :label="t('nav.admin')"
          />
        </UDashboardSidebarFooter>
      </template>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>

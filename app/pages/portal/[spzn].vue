<script setup lang="ts">
definePageMeta({ layout: 'portal', middleware: ['auth'] });

const { t } = useI18n();
const route = useRoute();
const spzn = route.params.spzn as string;

const { deal, loading, subscribe } = useDeal(spzn);

onMounted(() => {
  subscribe();
});
</script>

<template>
  <UDashboardPanel grow>
    <template #header>
      <UDashboardNavbar>
        <template #left>
          <UButton icon="i-lucide-arrow-left" variant="ghost" to="/portal" />
          <span class="font-mono font-bold">{{ spzn }}</span>
        </template>
      </UDashboardNavbar>
    </template>

    <div v-if="loading" class="flex items-center justify-center p-12">
      <UIcon name="i-lucide-loader-2" class="animate-spin h-8 w-8" />
    </div>

    <div v-else-if="deal" class="p-4 space-y-4">
      <h2 class="text-xl font-semibold">{{ deal.nazev }}</h2>
      <p>{{ t('deal.klient') }}: {{ deal.klient }}</p>
    </div>
  </UDashboardPanel>
</template>

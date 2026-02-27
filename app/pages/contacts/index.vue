<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const contactsStore = useContactsStore();

const search = ref('');

onMounted(() => {
  contactsStore.subscribe();
});

onUnmounted(() => {
  contactsStore.unsubscribeAll();
});

const filteredContacts = computed(() => {
  if (!search.value) return contactsStore.contacts;
  const q = search.value.toLowerCase();
  return contactsStore.contacts.filter(
    (c) =>
      c.jmeno.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.ico && c.ico.includes(q)),
  );
});
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar :title="t('nav.contacts')">
        <template #right>
          <UInput v-model="search" :placeholder="t('common.search')" icon="i-lucide-search" />
          <UButton :label="t('contact.new')" icon="i-lucide-plus" />
        </template>
      </UDashboardNavbar>
    </template>

    <UTable
      :data="filteredContacts"
      :columns="[
        { accessorKey: 'jmeno', header: t('contact.jmeno') },
        { accessorKey: 'typ', header: t('contact.typ') },
        { accessorKey: 'telefon', header: t('contact.telefon') },
        { accessorKey: 'email', header: t('contact.email') },
        { accessorKey: 'ico', header: t('contact.ico') },
      ]"
      :loading="contactsStore.loading"
    >
      <template #jmeno-cell="{ row }">
        <NuxtLink :to="`/contacts/${row.original.id}`" class="font-semibold text-primary">
          {{ row.original.jmeno }}
        </NuxtLink>
      </template>
    </UTable>
  </UDashboardPanel>
</template>

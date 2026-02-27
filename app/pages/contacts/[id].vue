<script setup lang="ts">
definePageMeta({ middleware: ['auth', 'role'] });

const { t } = useI18n();
const route = useRoute();
const contactId = route.params.id as string;
const contactsStore = useContactsStore();

const contact = computed(() => contactsStore.contacts.find((c) => c.id === contactId));

onMounted(() => {
  if (!contactsStore.contacts.length) {
    contactsStore.subscribe();
  }
});
</script>

<template>
  <UDashboardPanel grow>
    <template #header>
      <UDashboardNavbar>
        <template #left>
          <UButton icon="i-lucide-arrow-left" variant="ghost" to="/contacts" />
          <span v-if="contact" class="font-semibold">{{ contact.jmeno }}</span>
        </template>
      </UDashboardNavbar>
    </template>

    <div v-if="contact" class="p-4 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <UFormField :label="t('contact.typ')">
          <p>{{ contact.typ }}</p>
        </UFormField>
        <UFormField :label="t('contact.ico')">
          <p>{{ contact.ico || '—' }}</p>
        </UFormField>
        <UFormField :label="t('contact.adresa')">
          <p>{{ contact.adresa }}</p>
        </UFormField>
        <UFormField :label="t('contact.telefon')">
          <p>{{ contact.telefon }}</p>
        </UFormField>
        <UFormField :label="t('contact.email')">
          <p>{{ contact.email }}</p>
        </UFormField>
        <UFormField :label="t('contact.datovka')">
          <p>{{ contact.datovka || '—' }}</p>
        </UFormField>
      </div>
    </div>
  </UDashboardPanel>
</template>

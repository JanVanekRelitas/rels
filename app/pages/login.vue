<script setup lang="ts">
definePageMeta({ layout: 'auth' });

const { t } = useI18n();
const { login } = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  error.value = '';
  try {
    await login(email.value, password.value);
    router.push('/');
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Login failed';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UCard class="w-full max-w-md">
    <template #header>
      <h1 class="text-2xl font-bold text-center">RELS</h1>
      <p class="text-center text-gray-500">{{ t('auth.login') }}</p>
    </template>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <UFormField :label="t('auth.email')">
        <UInput v-model="email" type="email" required autofocus />
      </UFormField>

      <UFormField :label="t('auth.password')">
        <UInput v-model="password" type="password" required />
      </UFormField>

      <UAlert v-if="error" color="error" :title="error" />

      <UButton type="submit" :label="t('auth.signIn')" block :loading="loading" />
    </form>
  </UCard>
</template>

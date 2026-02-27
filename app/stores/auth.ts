import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import type { UserRole } from '@rels/shared';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const role = ref<UserRole | null>(null);
  const loading = ref(true);

  function init() {
    const { $auth } = useNuxtApp();
    onAuthStateChanged($auth, async (firebaseUser) => {
      user.value = firebaseUser;
      if (firebaseUser) {
        const token = await firebaseUser.getIdTokenResult();
        role.value = (token.claims.role as UserRole) ?? null;
      } else {
        role.value = null;
      }
      loading.value = false;
    });
  }

  async function login(email: string, password: string) {
    const { $auth } = useNuxtApp();
    const credential = await signInWithEmailAndPassword($auth, email, password);
    user.value = credential.user;
    const token = await credential.user.getIdTokenResult();
    role.value = (token.claims.role as UserRole) ?? null;
  }

  async function logout() {
    const { $auth } = useNuxtApp();
    await signOut($auth);
    user.value = null;
    role.value = null;
  }

  const isAuthenticated = computed(() => !!user.value);
  const isLawyer = computed(() => role.value === 'lawyer');
  const isAssistant = computed(() => role.value === 'assistant');
  const isClient = computed(() => role.value === 'client');

  return {
    user,
    role,
    loading,
    isAuthenticated,
    isLawyer,
    isAssistant,
    isClient,
    init,
    login,
    logout,
  };
});

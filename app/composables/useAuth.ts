/**
 * Convenience composable wrapping the auth store for use in components.
 */
export function useAuth() {
  const store = useAuthStore();

  // Initialize auth listener on first use
  if (import.meta.client && store.loading) {
    store.init();
  }

  return {
    user: computed(() => store.user),
    role: computed(() => store.role),
    loading: computed(() => store.loading),
    isAuthenticated: computed(() => store.isAuthenticated),
    isLawyer: computed(() => store.isLawyer),
    login: store.login,
    logout: store.logout,
  };
}

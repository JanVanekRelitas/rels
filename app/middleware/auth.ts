export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;

  const auth = useAuthStore();

  // Wait for Firebase to restore session from IndexedDB on first load
  if (auth.loading) {
    auth.init();
    await new Promise<void>((resolve) => {
      const stop = watch(() => auth.loading, (val) => {
        if (!val) { stop(); resolve(); }
      }, { immediate: true });
    });
  }

  if (!auth.user && to.path !== '/login') {
    return navigateTo('/login');
  }
});

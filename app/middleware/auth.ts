export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (!auth.user && to.path !== '/login') {
    return navigateTo('/login');
  }
});

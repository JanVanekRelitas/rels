export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  // Client users can only access the portal
  if (auth.role === 'client' && !to.path.startsWith('/portal')) {
    return navigateTo('/portal');
  }

  // Admin page is lawyer-only
  if (to.path.startsWith('/admin') && auth.role !== 'lawyer') {
    return navigateTo('/');
  }
});

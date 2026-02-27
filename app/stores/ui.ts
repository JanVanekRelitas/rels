export const useUiStore = defineStore('ui', () => {
  const sidebarOpen = ref(true);
  const showArchived = ref(false);

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function toggleArchived() {
    showArchived.value = !showArchived.value;
  }

  return { sidebarOpen, showArchived, toggleSidebar, toggleArchived };
});

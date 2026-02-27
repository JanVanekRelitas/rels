/**
 * Composable for government registry lookups (ARES, RUIAN, Katastr).
 * Calls Firebase Cloud Functions endpoints.
 */
export function useRegistry() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function callFunction<T>(name: string, params: Record<string, string>): Promise<T | null> {
    loading.value = true;
    error.value = null;

    try {
      const qs = new URLSearchParams(params).toString();
      const res = await $fetch<T>(`/api/registry/${name}?${qs}`);
      return res;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      return null;
    } finally {
      loading.value = false;
    }
  }

  function aresLookup(ico: string) {
    return callFunction<{ nazev: string; sidlo: string; ico: string }>('ares', { ico });
  }

  function ruianLookup(address: string) {
    return callFunction<{ results: Array<{ adresa: string; kod: string }> }>('ruian', { address });
  }

  function katastrLvLookup(cisloLv: string, katastr: string) {
    return callFunction<{ vlastnici: Array<{ jmeno: string }>; parcely: Array<{ cislo: string }> }>(
      'katastr/lv',
      { cisloLv, katastr },
    );
  }

  return { loading, error, aresLookup, ruianLookup, katastrLvLookup };
}

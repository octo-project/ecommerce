import { defineStore } from 'pinia';

export const useCacheStore = defineStore('cache', {
  state: () => ({
    cache: {} as Record<string, any>,
  }),
  actions: {
    setCache(tag: string, data: any) {
      this.cache[tag] = data;
      localStorage.setItem(tag, data);
    },
    getCache(tag: string) {
      return this.cache[tag];
    },
    invalidateCache(tag: string) {
      delete this.cache[tag];
    },
  },
});

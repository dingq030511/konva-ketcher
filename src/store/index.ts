import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useKonvaKetcherStore = defineStore('main', () => {
  const count = ref(0);
  function increament() {
    count.value++;
  }
  function $reset() {
    count.value = 0;
  }
  return {
    count,
    increament,
    $reset,
  };
});

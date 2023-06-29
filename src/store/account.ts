import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountNameStore = defineStore("accountName", () => {
  const accountName = ref("");
  const setAccountName = (newAccountName: string) => {
    accountName.value = newAccountName;
  };
  return { accountName, setAccountName };
});

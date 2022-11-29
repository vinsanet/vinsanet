import { defineStore } from "pinia";
import { ref } from "vue";

export const useSnackbarStore = defineStore("snackbar", () => {
  const shouldShow = ref(false);
  const body = ref("");
  const color = ref("");
  const showSnackbar = (newBody: string, newColor: string) => {
    shouldShow.value = true;
    body.value = newBody;
    color.value = newColor;
  };
  return { shouldShow, body, color, showSnackbar };
});

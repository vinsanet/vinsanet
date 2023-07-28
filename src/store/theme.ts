import { defineStore } from "pinia";
import { ref } from "vue";

export type Theme = "light" | "dark";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<Theme>("light");
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("color-theme", theme.value);
  };
  return { theme, toggleTheme };
});

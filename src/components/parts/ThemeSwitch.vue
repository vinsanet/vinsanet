<template>
  <v-row justify="center" class="align-center">
    <v-col class="text-center"><v-icon>mdi-weather-sunny</v-icon></v-col>
    <v-col class="text-center pl-0">
      <v-switch hide-details :model-value="theme === 'dark'" inset @change="toggleTheme"></v-switch>
    </v-col>
    <v-col class="text-center"><v-icon>mdi-weather-night</v-icon></v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { useThemeStore } from "@/store/theme";
  import { storeToRefs } from "pinia";

  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const { toggleTheme } = themeStore;
</script>

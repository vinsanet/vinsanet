<template>
  <v-app-bar elevation="1">
    <v-app-bar-title class="text-subtitle-1">
      <div style="cursor: pointer" @click="$router.push('/')">
        Kutulu character sheet <v-chip size="small">Beta</v-chip>
        <div :class="['text-caption']">v{{ version }}</div>
      </div>
    </v-app-bar-title>
    <template #append>
      <v-row justify="center" class="align-center">
        <v-col class="text-center"><v-icon>mdi-weather-sunny</v-icon></v-col>
        <v-col class="text-center pl-0">
          <v-switch hide-details :model-value="theme === 'dark'" inset @change="toggleTheme"></v-switch>
        </v-col>
        <v-col class="text-center"><v-icon>mdi-weather-night</v-icon></v-col>
      </v-row>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useThemeStore } from "@/store/theme";
  import { storeToRefs } from "pinia";

  const version = import.meta.env.VITE_APP_VERSION;

  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const { toggleTheme } = themeStore;
</script>

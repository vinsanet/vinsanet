<template>
  <v-app-bar elevation="1">
    <v-app-bar-title class="text-subtitle-1">
      <div style="cursor: pointer" @click.stop="$router.push('/')">
        <div v-if="smAndUp">
          <v-img :src="theme === 'light' ? logoWhiteUrl : logoBlackUrl" width="150px"></v-img>
        </div>
        <div v-if="xs">vinsanet</div>
        <div :class="['text-caption']">v{{ version }}</div>
      </div>
    </v-app-bar-title>
    <template #append>
      <theme-switch></theme-switch>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
  import logoBlackUrl from "@/assets/logo_black.png";
  import logoWhiteUrl from "@/assets/logo_white.png";
  import ThemeSwitch from "@/components/parts/ThemeSwitch.vue";
  import { useThemeStore } from "@/store/theme";
  import { storeToRefs } from "pinia";
  import { useDisplay } from "vuetify";

  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const { xs, smAndUp } = useDisplay();

  const version = import.meta.env.VITE_APP_VERSION;
</script>

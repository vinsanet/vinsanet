<template>
  <v-app :theme="theme">
    <router-view></router-view>
  </v-app>
</template>

<script setup lang="ts">
  import { useThemeStore } from "@/store/theme";
  import { storeToRefs } from "pinia";
  import { RouterView } from "vue-router";

  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
</script>

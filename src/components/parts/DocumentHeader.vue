<template>
  <v-app-bar elevation="1">
    <v-app-bar-nav-icon variant="text" @click.stop="props.onClickNavIcon"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-subtitle-1">
      <div style="cursor: pointer" @click="$router.push('/')">
        Kutulu character sheet <v-chip size="small">Beta</v-chip>
        <div :class="['text-caption']">v{{ version }}</div>
      </div>
    </v-app-bar-title>
    <template #append>
      <theme-switch></theme-switch>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
  import ThemeSwitch from "@/components/parts/ThemeSwitch.vue";

  type Props = { onClickNavIcon: () => void };

  const version = import.meta.env.VITE_APP_VERSION;
  const props = defineProps<Props>();
</script>

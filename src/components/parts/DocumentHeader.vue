<template>
  <v-app-bar hide-on-scroll>
    <v-app-bar-nav-icon variant="text" @click.stop="props.onClickNavIcon"></v-app-bar-nav-icon>
    <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
      Kutulu character sheet
      <div :class="['text-caption']">v{{ version }}</div></v-toolbar-title
    >
  </v-app-bar>
</template>

<script setup lang="ts">
  type Props = { onClickNavIcon: () => void };

  const version = import.meta.env.VITE_APP_VERSION;
  const props = defineProps<Props>();
</script>

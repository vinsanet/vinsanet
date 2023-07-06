<template>
  <v-app-bar hide-on-scroll>
    <v-app-bar-title class="text-subtitle-1">
      <div style="cursor: pointer" @click="$router.push('/')">
        Kutulu character sheet <v-chip size="small">Beta</v-chip>
        <div :class="['text-caption']">v{{ version }}</div>
      </div>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
  const version = import.meta.env.VITE_APP_VERSION;
</script>

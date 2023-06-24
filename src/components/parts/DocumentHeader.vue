<template>
  <v-app-bar hide-on-scroll>
    <v-app-bar-nav-icon variant="text" @click.stop="props.onClickNavIcon"></v-app-bar-nav-icon>
    <v-toolbar-title>Kutulu character sheet</v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
  type Props = { onClickNavIcon: () => void };

  const props = defineProps<Props>();
</script>

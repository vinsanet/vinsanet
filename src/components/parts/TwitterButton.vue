<template>
  <v-btn color="light-blue" class="text-capitalize" @click.stop="props.onClick">
    <v-img cover width="18px" src="/src/assets/twitter.svg" class="mr-2"></v-img>
    {{ props.text }}
  </v-btn>
</template>

<script setup lang="ts">
  type Props = { onClick: () => void; text: string };
  const props = defineProps<Props>();
</script>

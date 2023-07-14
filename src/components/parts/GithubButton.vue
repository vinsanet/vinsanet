<template>
  <v-btn color="grey-darken-4" class="text-capitalize" @click.stop="props.onClick">
    <v-img cover width="18px" src="/src/assets/github.svg" class="mr-2"></v-img>
    {{ props.text }}
  </v-btn>
</template>

<script setup lang="ts">
  type Props = { onClick: () => void; text: string };

  const props = defineProps<Props>();
</script>

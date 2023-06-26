<template>
  <v-btn color="grey-darken-4" class="text-capitalize" prepend-icon="mdi-github" @click.stop="props.onClick"
    >GitHub</v-btn
  >
</template>

<script setup lang="ts">
  type Props = { onClick: () => void };

  const props = defineProps<Props>();
</script>

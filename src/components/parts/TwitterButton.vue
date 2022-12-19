<template>
  <v-btn color="light-blue" class="text-capitalize" prepend-icon="mdi-twitter" @click.stop="props.onClick"
    >Twitter</v-btn
  >
</template>

<script setup lang="ts">
  type Props = { onClick: () => void };

  const props = defineProps<Props>();
</script>

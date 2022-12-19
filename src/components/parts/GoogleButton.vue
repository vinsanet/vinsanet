<template>
  <v-btn color="red" class="text-capitalize" prepend-icon="mdi-google" @click.stop="props.onClick">Google</v-btn>
</template>

<script setup lang="ts">
  type Props = { onClick: () => void };

  const props = defineProps<Props>();
</script>

<template>
  <v-btn class="text-capitalize" variant="outlined" @click.stop="props.onClick">
    <v-img cover width="18px" :src="iconUrl" class="mr-2"></v-img>
    {{ props.text }}
  </v-btn>
</template>

<script setup lang="ts">
  import iconUrl from "@/assets/google.svg";

  type Props = { onClick: () => void; text: string };
  const props = defineProps<Props>();
</script>

<style scoped>
  button {
    color: #000;
    background-color: #fff;
  }
</style>

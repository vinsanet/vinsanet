<template>
  <v-btn class="text-capitalize" variant="flat" @click.stop="props.onClick">
    <v-img cover width="18px" :src="iconUrl" class="mr-2"></v-img>
    {{ props.text }}
  </v-btn>
</template>

<script setup lang="ts">
  import iconUrl from "@/assets/github-white.svg";

  type Props = { onClick: () => void; text: string };
  const props = defineProps<Props>();
</script>

<style scoped>
  button {
    color: #fff;
    background-color: #333;
  }
</style>

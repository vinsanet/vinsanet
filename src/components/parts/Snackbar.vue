<template>
  <v-snackbar v-model="shouldShow" text :color="color">
    {{ body }}
    <template #actions>
      <v-btn icon @click.stop="shouldShow = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { useSnackbarStore } from "@/store/snackbar";
  import { storeToRefs } from "pinia";

  const snackbarStore = useSnackbarStore();
  const { body, color, shouldShow } = storeToRefs(snackbarStore);
</script>

<template>
  <v-app>
    <v-main>
      <router-view />
      <v-container>
        <Snackbar />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import Snackbar from "@/components/parts/Snackbar.vue";
</script>

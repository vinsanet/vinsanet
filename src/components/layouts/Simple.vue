<template>
  <LoginHeader />
  <v-main>
    <router-view />
    <Snackbar />
  </v-main>
</template>

<script setup lang="ts">
  import LoginHeader from "@/components/parts/LoginHeader.vue";
  import Snackbar from "@/components/parts/Snackbar.vue";
  import { RouterView } from "vue-router";
</script>

<template>
  <DocumentHeader :on-click-nav-icon="onClickNavIcon" />
  <DocumentDrawer :drawer="drawer" />
  <v-main>
    <router-view />
    <Snackbar />
  </v-main>
</template>

<script setup lang="ts">
  import DocumentDrawer from "@/components/parts/DocumentDrawer.vue";
  import DocumentHeader from "@/components/parts/DocumentHeader.vue";
  import Snackbar from "@/components/parts/Snackbar.vue";
  import { ref } from "vue";
  import { RouterView } from "vue-router";

  const drawer = ref(false);

  const onClickNavIcon = () => {
    drawer.value = !drawer.value;
  };
</script>

<template>
  <Header :on-click-nav-icon="onClickNavIcon" />
  <Drawer :drawer="drawer" />
  <v-main>
    <router-view />
    <Snackbar />
  </v-main>
</template>

<script setup lang="ts">
  import Drawer from "@/components/parts/Drawer.vue";
  import Header from "@/components/parts/Header.vue";
  import Snackbar from "@/components/parts/Snackbar.vue";
  import { ref } from "vue";
  import { RouterView } from "vue-router";

  const drawer = ref(false);

  const onClickNavIcon = () => {
    drawer.value = !drawer.value;
  };
</script>

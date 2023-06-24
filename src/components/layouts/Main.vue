<template>
  <MainHeader :on-click-nav-icon="onClickNavIcon" />
  <MainDrawer :drawer="drawer" />
  <v-main>
    <router-view />
    <Snackbar />
  </v-main>
</template>

<script setup lang="ts">
  import MainDrawer from "@/components/parts/MainDrawer.vue";
  import MainHeader from "@/components/parts/MainHeader.vue";
  import Snackbar from "@/components/parts/Snackbar.vue";
  import { ref } from "vue";
  import { RouterView } from "vue-router";

  const drawer = ref(false);

  const onClickNavIcon = () => {
    drawer.value = !drawer.value;
  };
</script>

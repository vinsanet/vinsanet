<template>
  <v-app :theme="theme">
    <v-app-bar hide-on-scroll>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="showDrawer = !showDrawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Kutulu character sheet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click.stop="toggleTheme"
      ></v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="showDrawer" expand-on-hover rail>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-format-list-text"
          title="キャラクター一覧"
          value="mypage"
          @click="onClickMypage"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-pencil"
          title="新規作成"
          value="create"
          @click="onClickCreate"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="アカウント"
          value="account"
          @click="onClickAccount"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import Snackbar from "@/components/parts/Snackbar.vue";
  import { useThemeStore } from "@/store/theme";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";
  import { RouterView, useRouter } from "vue-router";

  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const { toggleTheme } = themeStore;

  const router = useRouter();

  const showDrawer = ref(false);

  const onClickMypage = () => {
    router.push("/mypage");
    return;
  };
  const onClickCreate = () => {
    router.push("/create");
    return;
  };
  const onClickAccount = () => {
    router.push("/account");
    return;
  };
</script>

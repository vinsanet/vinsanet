<template>
  <v-app-bar hide-on-scroll>
    <v-app-bar-nav-icon variant="text" @click.stop="props.onClickNavIcon"></v-app-bar-nav-icon>
    <v-toolbar-title>Kutulu character sheet</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click.stop="toggleTheme"></v-btn>
    <v-btn :icon="'mdi-logout'" @click.stop="onClickLogout"></v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { firebaseAuth } from "@/firebase/firebase";
  import { useSnackbarStore } from "@/store/snackbar";
  import { useThemeStore } from "@/store/theme";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";

  type Props = { onClickNavIcon: () => void };

  const props = defineProps<Props>();

  const themeStore = useThemeStore();
  const { showSnackbar } = useSnackbarStore();
  const router = useRouter();
  const { theme } = storeToRefs(themeStore);
  const { toggleTheme } = themeStore;

  const onClickLogout = () => {
    firebaseAuth.signOut().then(() => {
      router.push("/");
      showSnackbar("ログアウトしました", "success");
    });
    return;
  };
</script>

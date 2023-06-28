<template>
  <v-app-bar hide-on-scroll>
    <v-app-bar-nav-icon variant="text" @click.stop="props.onClickNavIcon"></v-app-bar-nav-icon>
    <v-toolbar-title style="cursor: pointer" @click="$router.push('/mypage')">
      Kutulu character sheet <v-chip size="small">Beta</v-chip>
      <div :class="['text-caption']">v{{ version }}</div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="toggleTheme">
      <v-icon>{{ theme === "light" ? "mdi-weather-sunny" : "mdi-weather-night" }}</v-icon>
      <v-tooltip activator="parent" location="bottom">テーマ変更</v-tooltip>
    </v-btn>
    <v-btn icon @click.stop="onClickLogout">
      <v-icon>mdi-logout</v-icon>
      <v-tooltip activator="parent" location="bottom">ログアウト</v-tooltip>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { firebaseAuth } from "@/firebase/firebase";
  import { useSnackbarStore } from "@/store/snackbar";
  import { useThemeStore } from "@/store/theme";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";

  type Props = { onClickNavIcon: () => void };

  const version = import.meta.env.VITE_APP_VERSION;
  const props = defineProps<Props>();
  const themeStore = useThemeStore();
  const { showSnackbar } = useSnackbarStore();
  const router = useRouter();
  const { theme } = storeToRefs(themeStore);
  const { toggleTheme } = themeStore;

  const onClickLogout = () => {
    firebaseAuth.signOut().then(() => {
      if (theme.value === "dark") {
        toggleTheme();
      }
      router.push("/");
      showSnackbar("ログアウトしました", "success");
    });
    return;
  };
</script>

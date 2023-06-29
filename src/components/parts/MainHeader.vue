<template>
  <v-app-bar hide-on-scroll>
    <v-app-bar-nav-icon variant="text" @click.stop="props.onClickNavIcon"></v-app-bar-nav-icon>
    <v-toolbar-title style="cursor: pointer" @click="$router.push('/mypage')">
      Kutulu character sheet <v-chip size="small">Beta</v-chip>
      <div :class="['text-caption']">v{{ version }}</div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    {{ accountName }}
    <v-btn icon class="ml-4">
      <v-icon>mdi-cog</v-icon>
      <v-menu activator="parent" :close-on-content-click="false">
        <v-list>
          <v-list-item>
            <v-switch
              :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              hide-details="auto"
              @change="toggleTheme"
            ></v-switch>
          </v-list-item>
          <v-list-item>
            <v-btn :prepend-icon="'mdi-logout'" variant="plain" @click.stop="onClickLogout">ログアウト</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { firebaseAuth, firebaseDb } from "@/firebase/firebase";
  import { accountConverter } from "@/models/account";
  import { useAccountNameStore } from "@/store/account";
  import { useSnackbarStore } from "@/store/snackbar";
  import { useThemeStore } from "@/store/theme";
  import { collection, getDocs, query, where } from "@firebase/firestore";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";

  type Props = { onClickNavIcon: () => void };

  const version = import.meta.env.VITE_APP_VERSION;
  const props = defineProps<Props>();
  const accountNamestore = useAccountNameStore();
  const { accountName } = storeToRefs(accountNamestore);
  const { setAccountName } = accountNamestore;
  const { showSnackbar } = useSnackbarStore();
  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const { toggleTheme } = themeStore;
  const router = useRouter();

  firebaseAuth.onAuthStateChanged(async (user) => {
    if (!user) return;
    const q = query(collection(firebaseDb, "accounts"), where("id", "==", user.uid)).withConverter(accountConverter);
    getDocs(q).then((querySnapshot) => {
      const account = querySnapshot.docs[0].data();
      setAccountName(account.name ?? "");
    });
  });

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

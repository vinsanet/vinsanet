<template>
  <v-app-bar elevation="1">
    <v-app-bar-nav-icon variant="text" @click.stop="props.onClickNavIcon"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-subtitle-1">
      <div style="cursor: pointer" @click.stop="$router.push('/mypage')">
        <div v-if="smAndUp">
          <v-img :src="theme === 'light' ? logoWhiteUrl : logoBlackUrl" width="150px"></v-img>
        </div>
        <div v-if="xs">vinsanet</div>
        <div :class="['text-caption']">v{{ version }}</div>
      </div>
    </v-app-bar-title>
    <div class="text-subtitle-2" style="max-width: 30%; overflow: hidden; text-overflow: ellipsis">
      {{ accountName }}
    </div>
    <template #append>
      <v-btn icon class="ml-2">
        <v-icon>mdi-cog</v-icon>
        <v-menu activator="parent" :close-on-content-click="false">
          <v-list>
            <v-list-item>
              <theme-switch></theme-switch>
            </v-list-item>
            <v-list-item v-if="!isLoggedIn">
              <v-btn prepend-icon="mdi-login" variant="plain" @click.stop="onClickLogin">ログイン</v-btn>
            </v-list-item>
            <v-list-item v-if="isLoggedIn">
              <v-btn prepend-icon="mdi-logout" variant="plain" @click.stop="onClickLogout">ログアウト</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
  import logoBlackUrl from "@/assets/logo_black.png";
  import logoWhiteUrl from "@/assets/logo_white.png";
  import ThemeSwitch from "@/components/parts/ThemeSwitch.vue";
  import { firebaseAuth, firebaseDb } from "@/firebase/firebase";
  import { accountConverter } from "@/models/account";
  import { useAccountNameStore } from "@/store/account";
  import { useSnackbarStore } from "@/store/snackbar";
  import { useThemeStore } from "@/store/theme";
  import { collection, getDocs, query, where } from "@firebase/firestore";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useDisplay } from "vuetify";

  type Props = { onClickNavIcon: () => void };

  const version = import.meta.env.VITE_APP_VERSION;
  const props = defineProps<Props>();
  const isLoggedIn = ref(false);

  const accountNamestore = useAccountNameStore();
  const { accountName } = storeToRefs(accountNamestore);
  const { setAccountName } = accountNamestore;
  const { showSnackbar } = useSnackbarStore();
  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const { xs, smAndUp } = useDisplay();
  const router = useRouter();

  firebaseAuth.onAuthStateChanged(async (user) => {
    if (!user) {
      isLoggedIn.value = false;
      return;
    }
    isLoggedIn.value = true;
    const q = query(collection(firebaseDb, "accounts"), where("id", "==", user.uid)).withConverter(accountConverter);
    getDocs(q).then((querySnapshot) => {
      const account = querySnapshot.docs[0]?.data();
      setAccountName(account?.name ?? user.displayName);
    });
  });

  const onClickLogin = () => {
    router.push("/login");
    return;
  };
  const onClickLogout = () => {
    firebaseAuth.signOut().then(() => {
      router.push("/");
      showSnackbar("ログアウトしました", "success");
    });
    return;
  };
</script>

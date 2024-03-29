<template>
  <v-container class="d-flex fill-height">
    <v-row :align="'center'">
      <v-col>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            <div :class="['text-h4']">ログイン</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row :justify="'center'" class="pa-2">
              <v-col class="text-center">
                <twitter-button :on-click="onClickTwitter" :text="'Twitterでログイン'" />
              </v-col>
            </v-row>
            <v-row :justify="'center'" class="pa-2">
              <v-col class="text-center">
                <google-button :on-click="onClickGoogle" :text="'Googleでログイン'" />
              </v-col>
            </v-row>
            <v-row :justify="'center'" class="pa-2">
              <v-col class="text-center">
                <github-button :on-click="onClickGithub" :text="'GitHubでログイン'" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            アカウントをお持ちでない場合は
            <router-link to="/register" class="text-decoration-none">新規登録</router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay v-model="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64" width="6"></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
  import GithubButton from "@/components/parts/GithubButton.vue";
  import GoogleButton from "@/components/parts/GoogleButton.vue";
  import TwitterButton from "@/components/parts/TwitterButton.vue";
  import { firebaseAuth, firebaseDb } from "@/firebase/firebase";
  import { accountConverter } from "@/models/account";
  import { useSnackbarStore } from "@/store/snackbar";
  import { collection, getDocs, query, where } from "@firebase/firestore";
  import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, signInWithRedirect } from "firebase/auth";
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";

  const { showSnackbar } = useSnackbarStore();

  const router = useRouter();
  const overlay = ref(true);

  firebaseAuth.onAuthStateChanged(async (user) => {
    if (!user) {
      overlay.value = false;
      return;
    }
    const accountsCollection = collection(firebaseDb, "accounts");
    const q = query(accountsCollection, where("id", "==", user.uid)).withConverter(accountConverter);
    getDocs(q).then(async (querySnapshot) => {
      if (querySnapshot.empty) {
        showSnackbar("アカウントが登録されていません", "error");
        firebaseAuth.signOut();
      } else {
        showSnackbar("ログインしました", "success");
        router.push("/mypage");
      }
    });
  });
  onMounted(() => {
    document.title = "ログイン | vinsanet";
  });

  const onClickTwitter = () => {
    const provider = new TwitterAuthProvider();
    signInWithRedirect(firebaseAuth, provider).catch((error) => {
      const errorMessage = error.message;
      showSnackbar(`ログインできませんでした：${errorMessage}`, "error");
    });
  };
  const onClickGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(firebaseAuth, provider).catch((error) => {
      const errorMessage = error.message;
      showSnackbar(`ログインできませんでした：${errorMessage}`, "error");
    });
  };
  const onClickGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithRedirect(firebaseAuth, provider).catch((error) => {
      const errorMessage = error.message;
      showSnackbar(`ログインできませんでした：${errorMessage}`, "error");
    });
  };
</script>

<style scoped>
  a {
    position: relative;
    border-bottom: solid 1px rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-body));
  }

  a::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 0;
    height: 2px;
    background-color: rgb(var(--v-theme-primary));
    transition: 0.5s;
  }

  a:hover::after {
    width: 100%;
  }
</style>

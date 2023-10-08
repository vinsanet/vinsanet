<template>
  <v-container class="d-flex fill-height">
    <v-row :align="'center'">
      <v-col>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            <div :class="['text-h4']">新規登録</div>
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
                <twitter-button :on-click="onClickTwitter" :text="'Twitterで新規登録'" />
              </v-col>
            </v-row>
            <v-row :justify="'center'" class="pa-2">
              <v-col class="text-center">
                <google-button :on-click="onClickGoogle" :text="'Googleで新規登録'" />
              </v-col>
            </v-row>
            <v-row :justify="'center'" class="pa-2">
              <v-col class="text-center">
                <github-button :on-click="onClickGithub" :text="'GitHubで新規登録'" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            アカウントをお持ちの場合は
            <router-link to="/login" class="text-decoration-none">ログイン</router-link>
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
  import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, signInWithRedirect } from "@firebase/auth";
  import { collection, doc, getDocs, query, setDoc, where } from "@firebase/firestore";
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
        const accountDocRef = doc(accountsCollection).withConverter(accountConverter);
        const data = { id: user.uid, name: user.displayName };
        await setDoc(accountDocRef, { ...data });
        showSnackbar("アカウントを作成しました", "success");
      } else {
        showSnackbar("作成済みのアカウントにログインしました", "success");
      }
    });
    router.push("/mypage");
  });
  onMounted(() => {
    document.title = "新規登録 | vinsanet";
  });

  const onClickTwitter = () => {
    const provider = new TwitterAuthProvider();
    signInWithRedirect(firebaseAuth, provider).catch((error) => {
      const errorMessage = error.message;
      showSnackbar(`アカウントを作成できませんでした：${errorMessage}`, "error");
    });
  };
  const onClickGoogle = () => {
    overlay.value = true;
    const provider = new GoogleAuthProvider();
    signInWithRedirect(firebaseAuth, provider).catch((error) => {
      const errorMessage = error.message;
      showSnackbar(`アカウントを作成できませんでした：${errorMessage}`, "error");
    });
  };
  const onClickGithub = () => {
    overlay.value = true;
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

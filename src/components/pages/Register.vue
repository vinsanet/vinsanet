<template>
  <v-container class="d-flex fill-height">
    <v-row :align="'center'">
      <v-col>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            <div :class="['text-h3']">新規登録</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row :justify="'center'" class="pa-2">
              <v-col class="text-center">
                <TwitterButton :on-click="onClickTwitter" />
              </v-col>
            </v-row>
            <v-row :justify="'center'" class="pa-2">
              <v-col class="text-center">
                <GoogleButton :on-click="onClickGoogle" />
              </v-col>
            </v-row>
            <v-row :justify="'center'" class="pa-2">
              <v-col class="text-center">
                <GithubButton :on-click="onClickGithub" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            アカウントをお持ちの場合は
            <router-link to="/login">ログイン</router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import GithubButton from "@/components/parts/GithubButton.vue";
  import GoogleButton from "@/components/parts/GoogleButton.vue";
  import TwitterButton from "@/components/parts/TwitterButton.vue";
  import { firebaseAuth, firebaseDb } from "@/firebase/firebase";
  import { accountConverter } from "@/models/account";
  import { useSnackbarStore } from "@/store/snackbar";
  import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, signInWithRedirect } from "@firebase/auth";
  import { collection, doc, setDoc } from "@firebase/firestore";
  import { useRouter } from "vue-router";

  const { showSnackbar } = useSnackbarStore();

  const router = useRouter();

  firebaseAuth.onAuthStateChanged(async (user) => {
    if (!user) return;
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      const accountDocRef = doc(collection(firebaseDb, "accounts")).withConverter(accountConverter);
      const data = { id: user.uid, name: user.displayName };
      await setDoc(accountDocRef, { ...data });
      showSnackbar("アカウントを作成しました", "success");
    } else {
      showSnackbar("ログインしました", "success");
    }
    router.push("/mypage");
  });
  const onClickTwitter = () => {
    const provider = new TwitterAuthProvider();
    signInWithRedirect(firebaseAuth, provider).catch((error) => {
      const errorMessage = error.message;
      showSnackbar(`アカウントを作成できませんでした：${errorMessage}`, "error");
    });
  };
  const onClickGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(firebaseAuth, provider).catch((error) => {
      const errorMessage = error.message;
      showSnackbar(`アカウントを作成できませんでした：${errorMessage}`, "error");
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

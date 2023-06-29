<template>
  <v-container class="d-flex fill-height">
    <v-row :align="'center'">
      <v-col>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            <div :class="['text-h3']">ログイン</div>
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
            アカウントをお持ちでない場合は
            <router-link to="/register">新規登録</router-link>
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
  import { collection, doc, getDocs, query, setDoc, where } from "@firebase/firestore";
  import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, signInWithRedirect } from "firebase/auth";
  import { useRouter } from "vue-router";

  const { showSnackbar } = useSnackbarStore();

  const router = useRouter();

  firebaseAuth.onAuthStateChanged(async (user) => {
    if (!user) return;
    const accountsCollection = collection(firebaseDb, "accounts");
    const q = query(accountsCollection, where("id", "==", user.uid)).withConverter(accountConverter);
    getDocs(q).then(async (querySnapshot) => {
      if (querySnapshot.empty) {
        const accountDocRef = doc(accountsCollection).withConverter(accountConverter);
        const data = { id: user.uid, name: user.displayName };
        await setDoc(accountDocRef, { ...data });
        showSnackbar("アカウントを作成しました", "success");
      } else {
        showSnackbar("ログインしました", "success");
      }
    });
    router.push("/mypage");
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

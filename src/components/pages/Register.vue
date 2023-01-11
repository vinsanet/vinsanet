<template>
  <v-container class="d-flex fill-height">
    <v-row :align="'center'">
      <v-col>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            <div :class="['text-h3']">新規登録</div>
          </v-col>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-col cols="4">
            <v-form>
              <v-text-field
                v-model="email"
                label="Email"
                type="text"
                prepend-icon="mdi-email"
                autocomplete="current-password"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                prepend-icon="mdi-key"
                autocomplete="current-password"
              />
            </v-form>
          </v-col>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center" cols="1">
            <v-btn color="primary" @click.stop="onClickCreate">新規登録</v-btn>
          </v-col>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-divider></v-divider>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            <div :class="['text-h5']">SNSで登録する</div>
          </v-col>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center" cols="1">
            <TwitterButton :on-click="onClickTwitter" />
          </v-col>
          <v-col class="text-center" cols="1">
            <GoogleButton :on-click="onClickGoogle" />
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
  import GoogleButton from "@/components/parts/GoogleButton.vue";
  import TwitterButton from "@/components/parts/TwitterButton.vue";
  import { firebaseAuth } from "@/firebase/firebase";
  import { firebaseErrorMessage } from "@/firebase/firebaseErrorMessage";
  import { useSnackbarStore } from "@/store/snackbar";
  import {
    GoogleAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    signInWithRedirect,
  } from "@firebase/auth";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const { showSnackbar } = useSnackbarStore();

  const email = ref("");
  const password = ref("");
  const router = useRouter();

  firebaseAuth.onAuthStateChanged((user) => {
    if (!user) return;
    showSnackbar("アカウントを作成しました", "success");
    router.push("/mypage");
  });
  const onClickCreate = () => {
    if (email.value === "" || password.value == "") {
      showSnackbar("メールアドレスとパスワードを入力してください", "info");
      return;
    }
    createUserWithEmailAndPassword(firebaseAuth, email.value, password.value)
      .then(() => {
        showSnackbar("アカウントを作成しました", "success");
        router.push("/mypage");
      })
      .catch((error) => {
        const errorMessage = firebaseErrorMessage(error.code);
        showSnackbar(errorMessage, "error");
      });
  };
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
</script>

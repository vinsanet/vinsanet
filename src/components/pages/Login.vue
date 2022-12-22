<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-container>
        <v-row>
          <v-col>
            <div :class="['text-h3']">ログイン</div>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row :justify="'center'">
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
        <v-row>
          <v-col>
            <v-btn color="primary" @click="onClickLogin">ログイン</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <div :class="['text-h5']">SNSでログインする</div>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row :justify="'center'">
          <v-col cols="1">
            <TwitterButton :on-click="onClickTwitter" />
          </v-col>
          <v-col cols="1">
            <GoogleButton :on-click="onClickGoogle" />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row :justify="'center'">
          <v-col>
            アカウントをお持ちでない場合は
            <router-link to="/register">新規登録</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
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
    signInWithEmailAndPassword,
    signInWithRedirect,
  } from "firebase/auth";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const { showSnackbar } = useSnackbarStore();

  const email = ref("");
  const password = ref("");
  const router = useRouter();

  firebaseAuth.onAuthStateChanged((user) => {
    if (!user) return;
    showSnackbar("ログインしました", "success");
    router.push("/mypage");
  });
  const onClickLogin = () => {
    if (email.value === "" || password.value == "") {
      showSnackbar("メールアドレスとパスワードを入力してください", "info");
      return;
    }
    signInWithEmailAndPassword(firebaseAuth, email.value, password.value)
      .then(() => {
        showSnackbar("ログインしました", "success");
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
</script>

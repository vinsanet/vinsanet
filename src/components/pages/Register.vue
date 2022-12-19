<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-container>
        <v-row>
          <v-col>
            <div :class="['text-h3']">新規登録</div>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-spacer />
          <v-col>
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
          <v-spacer />
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" @click.stop="onClickCreate">登録</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <div :class="['text-h5']">SNSで登録する</div>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row :justify="'center'">
          <v-col cols="2">
            <TwitterButton :on-click="onClickTwitter" />
          </v-col>
          <v-col cols="2">
            <GoogleButton :on-click="onClickGoogle" />
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
    createUserWithEmailAndPassword,
    signInWithPopup,
  } from "@firebase/auth";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const { showSnackbar } = useSnackbarStore();

  const email = ref("");
  const password = ref("");
  const router = useRouter();

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
    signInWithPopup(firebaseAuth, provider)
      .then(() => {
        showSnackbar("アカウントを作成しました", "success");
        router.push("/mypage");
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`アカウントを作成できませんでした：${errorMessage}`, "error");
      });
  };
  const onClickGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then(() => {
        showSnackbar("アカウントを作成しました", "success");
        router.push("/mypage");
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`アカウントを作成できませんでした：${errorMessage}`, "error");
      });
  };
</script>

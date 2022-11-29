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
      <v-container class="">
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
            <v-btn color="success" @click="onClickLogin">ログイン</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { firebaseAuth } from "@/firebase/firebase";
  import { firebaseErrorMessage } from "@/firebase/firebaseErrorMessage";
  import { useSnackbarStore } from "@/store/snackbar";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const { showSnackbar } = useSnackbarStore();

  const email = ref("");
  const password = ref("");
  const router = useRouter();

  const onClickLogin = () => {
    if (email.value === "" || password.value == "") {
      showSnackbar("メールアドレスとパスワードを入力してください", "info");
      return;
    }

    signInWithEmailAndPassword(firebaseAuth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        showSnackbar("ログインしました", "success");
        router.push("/home");
      })
      .catch((error) => {
        const errorMessage = firebaseErrorMessage(error.code);
        showSnackbar(errorMessage, "error");
      });
  };
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-container>
        <v-row>
          <v-col>
            <div :class="['text-h3']">Create user</div>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="">
        <v-row>
          <v-col />
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
          <v-col />
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="success" @click="onClickCreate">Create</v-btn>
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
  import { createUserWithEmailAndPassword } from "@firebase/auth";
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
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        showSnackbar("アカウントを作成しました", "success");
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = firebaseErrorMessage(error.code);
        showSnackbar(errorMessage, "error");
      });
  };
</script>

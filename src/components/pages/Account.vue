<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>SNS認証</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>現在のアカウントにSNSアカウントを連携することができます。</v-col>
              </v-row>
              <v-row>
                <v-col cols="1">
                  <div :class="'text-subtitle-1'"><v-icon color="light-blue">mdi-twitter</v-icon>Twitter</div>
                </v-col>
                <v-col cols="1">
                  <v-btn :color="!twitterAuthorized ? 'primary' : 'error'" @click.stop="onClickTwitter">
                    <v-icon>{{ !twitterAuthorized ? "mdi-link" : "mdi-link-off" }}</v-icon>
                    {{ !twitterAuthorized ? "連携する" : "連携解除" }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="1">
                  <div :class="'text-subtitle-1'"><v-icon color="red">mdi-google</v-icon>Google</div>
                </v-col>
                <v-col cols="1">
                  <v-btn :color="!googleAuthorized ? 'primary' : 'error'" @click.stop="onClickGoogle">
                    <v-icon>{{ !googleAuthorized ? "mdi-link" : "mdi-link-off" }}</v-icon>
                    {{ !googleAuthorized ? "連携する" : "連携解除" }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
  <v-dialog v-model="twitterDialog" width="40%">
    <v-card>
      <v-card-title>Twitter連携解除</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>連携を解除すると、Twitterアカウントでログインできなくなります。よろしいですか？</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="twitterDialog = false"> キャンセル </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="onClickUnLinkTwitter">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="googleDialog" width="40%">
    <v-card>
      <v-card-title>Google連携解除</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>連携を解除すると、Googleアカウントでログインできなくなります。よろしいですか？</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="googleDialog = false"> キャンセル </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="onClickUnLinkGoogle">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { firebaseAuth } from "@/firebase/firebase";
  import { useSnackbarStore } from "@/store/snackbar";
  import { GoogleAuthProvider, TwitterAuthProvider, linkWithRedirect, unlink } from "firebase/auth";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();

  const twitterAuthorized = ref(false);
  const googleAuthorized = ref(false);
  const twitterDialog = ref(false);
  const googleDialog = ref(false);

  firebaseAuth.onAuthStateChanged((user) => {
    if (!user) {
      showSnackbar("ログインしてください", "error");
      router.push("/login");
      return;
    }
    user.providerData.forEach((provider) => {
      if (provider.providerId === "twitter.com") {
        twitterAuthorized.value = true;
      } else if (provider.providerId === "google.com") {
        googleAuthorized.value = true;
      }
    });
  });
  const onClickTwitter = () => {
    const provider = new TwitterAuthProvider();
    if (!firebaseAuth.currentUser) {
      showSnackbar("ログインしてください", "error");
      router.push("/login");
      return;
    }
    if (!twitterAuthorized.value) {
      linkWithRedirect(firebaseAuth.currentUser, provider)
        .then(() => {
          showSnackbar("Twitterアカウントを連携しました", "success");
        })
        .catch((error) => {
          const errorMessage = error.message;
          showSnackbar(`Twitterアカウントを連携できませんでした：${errorMessage}`, "error");
        });
    } else {
      twitterDialog.value = true;
    }
  };
  const onClickGoogle = () => {
    const provider = new GoogleAuthProvider();
    if (!firebaseAuth.currentUser) {
      showSnackbar("ログインしてください", "error");
      router.push("/login");
      return;
    }
    if (!googleAuthorized.value) {
      linkWithRedirect(firebaseAuth.currentUser, provider)
        .then(() => {
          showSnackbar("Googleアカウントを連携しました", "success");
        })
        .catch((error) => {
          const errorMessage = error.message;
          showSnackbar(`Googleアカウントを連携できませんでした：${errorMessage}`, "error");
        });
    } else {
      googleDialog.value = true;
    }
  };
  const onClickUnLinkTwitter = () => {
    const provider = new TwitterAuthProvider();
    if (!firebaseAuth.currentUser) return;
    unlink(firebaseAuth.currentUser, provider.providerId)
      .then(() => {
        showSnackbar("Twitterアカウントの連携を解除しました", "success");
        twitterAuthorized.value = false;
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`Twitterアカウントの連携を解除できませんでした：${errorMessage}`, "error");
      });
    twitterDialog.value = false;
  };
  const onClickUnLinkGoogle = () => {
    const provider = new GoogleAuthProvider();
    if (!firebaseAuth.currentUser) return;
    unlink(firebaseAuth.currentUser, provider.providerId)
      .then(() => {
        showSnackbar("Googleアカウントの連携を解除しました", "success");
        googleAuthorized.value = false;
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`Googleアカウントの連携を解除できませんでした：${errorMessage}`, "error");
      });
    googleDialog.value = false;
  };
</script>

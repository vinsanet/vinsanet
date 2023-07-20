<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-card variant="outlined" class="mb-8">
        <v-row>
          <v-col>
            <v-card-title>アカウント名設定</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <div :class="'text-caption'">アカウント名は他のユーザーに表示されません。</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="max-width: 500px" class="d-flex align-center">
                  <v-text-field
                    v-model="accountName"
                    :rules="[
                      (value: string) => {
                        return !!value || 'アカウント名を入力してください';
                      },
                      (value: string) => {
                        return value.length <= 50 || '50文字以内で入力してください';
                      },
                    ]"
                    hide-details="auto"
                    density="comfortable"
                  >
                  </v-text-field>
                  <v-btn class="ml-4" color="primary" prepend-icon="mdi-content-save" @click="onClickSaveAccountName">
                    保存
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-card-title>ログイン連携</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <div :class="'text-caption'">現在のアカウントに他サービスのアカウントを連携することができます。</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="max-width: 500px">
                  <v-table>
                    <tbody>
                      <tr>
                        <td>
                          <div class="d-flex align-center">
                            <v-img max-width="1.5rem" class="mr-2" :src="twitterIconUrl"></v-img>
                            <div :class="'text-subtitle-1'">Twitter</div>
                          </div>
                        </td>
                        <td>
                          <v-btn :color="!twitterAuthorized ? 'primary' : 'error'" @click.stop="onClickTwitter">
                            <v-icon>{{ !twitterAuthorized ? "mdi-link" : "mdi-link-off" }}</v-icon>
                            {{ !twitterAuthorized ? "連携する" : "連携解除" }}
                          </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-center">
                            <v-img max-width="1.5rem" class="mr-2" :src="googleIconUrl"></v-img>
                            <div :class="'text-subtitle-1'">Google</div>
                          </div>
                        </td>
                        <td>
                          <v-btn :color="!googleAuthorized ? 'primary' : 'error'" @click.stop="onClickGoogle">
                            <v-icon>{{ !googleAuthorized ? "mdi-link" : "mdi-link-off" }}</v-icon>
                            {{ !googleAuthorized ? "連携する" : "連携解除" }}
                          </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex align-center">
                            <v-img max-width="1.5rem" class="mr-2" :src="githubIconUrl"></v-img>
                            <div :class="'text-subtitle-1'">GitHub</div>
                          </div>
                        </td>
                        <td>
                          <v-btn :color="!githubAuthoized ? 'primary' : 'error'" @click.stop="onClickGithub">
                            <v-icon>{{ !githubAuthoized ? "mdi-link" : "mdi-link-off" }}</v-icon>
                            {{ !githubAuthoized ? "連携する" : "連携解除" }}
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <v-card variant="outlined" color="error">
        <v-row>
          <v-col>
            <v-card-title>アカウント削除</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <div :class="'text-caption'">
                    現在のアカウントを削除するには、事前にすべてのキャラクターを削除する必要があります。
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="max-width: 500px">
                  <v-btn
                    class="ml-4"
                    color="error"
                    prepend-icon="mdi-delete"
                    variant="outlined"
                    :disabled="!isAccountDeletable"
                    @click="() => (deleteDialog = true)"
                  >
                    アカウントを削除する
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-responsive>
  </v-container>
  <v-dialog v-model="twitterDialog" width="30%" min-width="400px">
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
  <v-dialog v-model="googleDialog" width="30%" min-width="400px">
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
  <v-dialog v-model="githubDialog" width="30%" min-width="400px">
    <v-card>
      <v-card-title>GitHub連携解除</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>連携を解除すると、GitHubアカウントでログインできなくなります。よろしいですか？</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="githubDialog = false"> キャンセル </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="onClickUnLinkGithub">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="deleteDialog" width="30%" min-width="400px">
    <v-card>
      <v-card-title>アカウント削除</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>アカウントを削除すると、元に戻すことはできません。よろしいですか？</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="deleteDialog = false"> キャンセル </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="onClickDeleteAccount">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import githubIconUrl from "@/assets/github-black.svg";
  import googleIconUrl from "@/assets/google.svg";
  import twitterIconUrl from "@/assets/twitter-blue.svg";
  import { firebaseAuth, firebaseDb } from "@/firebase/firebase";
  import { accountConverter } from "@/models/account";
  import { useAccountNameStore } from "@/store/account";
  import { useSnackbarStore } from "@/store/snackbar";
  import {
    collection,
    deleteDoc,
    doc,
    getCountFromServer,
    getDocs,
    query,
    updateDoc,
    where,
  } from "@firebase/firestore";
  import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, linkWithRedirect, unlink } from "firebase/auth";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const { setAccountName } = useAccountNameStore();
  const { showSnackbar } = useSnackbarStore();
  let documentId = "";

  const accountName = ref("");
  const twitterAuthorized = ref(false);
  const googleAuthorized = ref(false);
  const githubAuthoized = ref(false);
  const isAccountDeletable = ref(false);
  const twitterDialog = ref(false);
  const googleDialog = ref(false);
  const githubDialog = ref(false);
  const deleteDialog = ref(false);

  firebaseAuth.onAuthStateChanged((user) => {
    if (!user) {
      showSnackbar("ログインしてください", "error");
      router.push("/login");
      return;
    }

    const q = query(collection(firebaseDb, "accounts"), where("id", "==", user.uid)).withConverter(accountConverter);
    getDocs(q).then(async (querySnapshot) => {
      if (querySnapshot.empty) {
        showSnackbar("アカウントが存在しません", "error");
        router.push("/login");
        return;
      }
      const account = querySnapshot.docs[0].data();
      accountName.value = account.name;
      documentId = querySnapshot.docs[0].id;

      const q = query(collection(firebaseDb, "characters"), where("userId", "==", account.id));
      const snapshot = await getCountFromServer(q);
      isAccountDeletable.value = snapshot.data().count === 0;
    });

    user.providerData.forEach((provider) => {
      if (provider.providerId === "twitter.com") {
        twitterAuthorized.value = true;
      } else if (provider.providerId === "google.com") {
        googleAuthorized.value = true;
      } else if (provider.providerId === "github.com") {
        githubAuthoized.value = true;
      }
    });
  });
  const onClickSaveAccountName = () => {
    if (accountName.value === null || accountName.value.length === 0) {
      showSnackbar("アカウント名を入力してください", "error");
      return;
    }
    if (accountName.value.length > 50) {
      showSnackbar("アカウント名は50文字以内で入力してください", "error");
      return;
    }
    const docRef = doc(collection(firebaseDb, "accounts"), documentId).withConverter(accountConverter);
    updateDoc(docRef, { name: accountName.value }).then(() => {
      showSnackbar("アカウント名を更新しました", "success");
      setAccountName(accountName.value);
    });
  };
  const onClickTwitter = () => {
    const provider = new TwitterAuthProvider();
    if (!firebaseAuth.currentUser) {
      showSnackbar("ログインしてください", "error");
      router.push("/login");
      return;
    }
    if (twitterAuthorized.value) {
      twitterDialog.value = true;
      return;
    }
    linkWithRedirect(firebaseAuth.currentUser, provider)
      .then(() => {
        showSnackbar("Twitterアカウントを連携しました", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`Twitterアカウントを連携できませんでした：${errorMessage}`, "error");
      });
  };
  const onClickGoogle = () => {
    const provider = new GoogleAuthProvider();
    if (!firebaseAuth.currentUser) {
      showSnackbar("ログインしてください", "error");
      router.push("/login");
      return;
    }
    if (googleAuthorized.value) {
      googleDialog.value = true;
      return;
    }
    linkWithRedirect(firebaseAuth.currentUser, provider)
      .then(() => {
        showSnackbar("Googleアカウントを連携しました", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`Googleアカウントを連携できませんでした：${errorMessage}`, "error");
      });
  };
  const onClickGithub = () => {
    const provider = new GithubAuthProvider();
    if (!firebaseAuth.currentUser) {
      showSnackbar("ログインしてください", "error");
      router.push("/login");
      return;
    }
    if (githubAuthoized.value) {
      githubDialog.value = true;
      return;
    }
    linkWithRedirect(firebaseAuth.currentUser, provider)
      .then(() => {
        showSnackbar("GitHubアカウントを連携しました", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`GitHubアカウントを連携できませんでした：${errorMessage}`, "error");
      });
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
  const onClickUnLinkGithub = () => {
    const provider = new GithubAuthProvider();
    if (!firebaseAuth.currentUser) return;
    unlink(firebaseAuth.currentUser, provider.providerId)
      .then(() => {
        showSnackbar("GitHubアカウントの連携を解除しました", "success");
        githubAuthoized.value = false;
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`GitHubアカウントの連携を解除できませんでした：${errorMessage}`, "error");
      });
    githubDialog.value = false;
  };
  const onClickDeleteAccount = () => {
    const userId = firebaseAuth.currentUser?.uid;
    firebaseAuth.currentUser
      ?.delete()
      .then(() => {
        const q = query(collection(firebaseDb, "accounts"), where("id", "==", userId)).withConverter(accountConverter);
        getDocs(q).then((querySnapshot) => {
          if (querySnapshot.empty) return;
          deleteDoc(doc(firebaseDb, "accounts", querySnapshot.docs[0].id));
        });
        showSnackbar("アカウントを削除しました", "success");
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`アカウントを削除できませんでした：${errorMessage}`, "error");
      });
  };
</script>

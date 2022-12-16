<template>
  <v-app :theme="theme">
    <v-app-bar hide-on-scroll>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Kutulu character sheet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click.stop="toggleTheme"></v-btn>
      <v-btn :icon="'mdi-logout'" @click.stop="onClickLogout"></v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" expand-on-hover rail>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-format-list-text"
          title="キャラクター一覧"
          value="mypage"
          @click="onClickMypage"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-pencil" title="新規作成" value="create" @click="onClickCreate"></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="アカウント"
          value="account"
          @click="onClickAccount"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import Snackbar from "@/components/parts/Snackbar.vue";
  import { firebaseAuth, firebaseDb } from "@/firebase/firebase";
  import { CharacterType, characterConverter } from "@/models/character";
  import { metadataConverter } from "@/models/metadata";
  import { useSnackbarStore } from "@/store/snackbar";
  import { useThemeStore } from "@/store/theme";
  import { collection, doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";
  import { RouterView, useRouter } from "vue-router";

  const themeStore = useThemeStore();
  const { showSnackbar } = useSnackbarStore();
  const router = useRouter();
  const { theme } = storeToRefs(themeStore);
  const { toggleTheme } = themeStore;
  const drawer = ref(false);

  const onClickMypage = () => {
    router.push("/mypage");
    return;
  };
  const onClickCreate = async () => {
    let characterId = -1;
    // character id
    const metadataDocRef = doc(
      collection(firebaseDb, "metadata"),
      import.meta.env.VITE_METADATA_DOCUMENT_ID
    ).withConverter(metadataConverter);
    const metadataDocSnap = await getDoc(metadataDocRef);
    if (metadataDocSnap.exists()) {
      characterId = metadataDocSnap.data().characterId + 1;
      await setDoc(metadataDocRef, { characterId: characterId });
    } else {
      showSnackbar("メタデータの取得に失敗しました。管理者にお問い合わせください", "error");
      return;
    }
    // initialize
    const information = {} as CharacterType;
    const timeStamp = serverTimestamp();
    information.id = characterId;
    information.name = "";
    information.kana = "";
    information.title = "";
    information.age = "";
    information.gender = "";
    information.profession = "";
    information.home = "";
    information.rank = "";
    information.family = "";
    information.skills = [
      { name: "敏捷", value: 0 },
      { name: "筋力", value: 0 },
      { name: "隠密", value: 0 },
      { name: "射撃", value: 0 },
      { name: "白兵", value: 0 },
      { name: "名声", value: 0 },
      { name: "弁舌", value: 0 },
      { name: "家格", value: 0 },
      { name: "信用", value: 0 },
    ];
    information.specialities = [
      { name: "人類学＆民俗学", value: 0 },
      { name: "考古学＆歴史学", value: 0 },
      { name: "図書館＆古文書学", value: 0 },
      { name: "経済学＆法学", value: 0 },
      { name: "芸術＆工芸", value: 0 },
      { name: "犯罪学", value: 0 },
      { name: "医学", value: 0 },
      { name: "機械工学", value: 0 },
      { name: "自然科学", value: 0 },
      { name: "オカルト", value: 0 },
      { name: "心理学", value: 0 },
      { name: "言語学", value: 0 },
    ];
    information.damage = 0;
    information.memo = "";
    information.tags = [];
    information.userId = firebaseAuth.currentUser?.uid ?? "";
    information.images = [];
    information.isPublishing = true;
    information.createdAt = timeStamp;
    information.updatedAt = timeStamp;
    // document
    const characterDocRef = doc(collection(firebaseDb, "characters")).withConverter(characterConverter);
    await setDoc(characterDocRef, { ...information });
    showSnackbar("新規キャラクターを作成しました", "success");
    router.push(`/characters/${characterId}/edit`);
    return;
  };
  const onClickAccount = () => {
    router.push("/account");
    return;
  };
  const onClickLogout = () => {
    firebaseAuth.signOut().then(() => {
      router.push("/");
      showSnackbar("ログアウトしました", "success");
    });
    return;
  };
</script>

<template>
  <v-theme-provider theme="light" with-background>
    <v-container class="fill-height">
      <v-row style="height: 100vh" class="align-center text-center">
        <v-col>
          <v-row>
            <v-col>
              <div class="d-flex justify-center">
                <v-img :src="logoImageUrl" max-width="700px"></v-img>
              </div>
            </v-col>
          </v-row>
          <v-row class="mb-2">
            <v-col><div class="text-subtitle-1 font-weight-bold">”信頼できるキャラクターシート”</div></v-col>
          </v-row>
          <v-row :justify="'center'" class="ma-4">
            <v-spacer></v-spacer>
            <v-col><v-btn color="primary" variant="flat" to="/login" block>ログイン</v-btn></v-col>
            <v-col><v-btn color="secondary" variant="flat" to="/register" block>新規登録</v-btn></v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row class="my-4">
            <v-divider></v-divider>
          </v-row>
          <v-row>
            <v-col>
              <p>vinsanetは、Kutulu TRPGのキャラクターシートを簡単に作成、管理、共有できるオンラインツールです。</p>
              <p>ご利用にはアカウント登録が必要です。料金は掛かりません。</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="align-center text-center align-stretch">
        <v-col>
          <v-card class="h-100" variant="outlined">
            <v-icon size="75">mdi-account-edit</v-icon>
            <v-card-title>キャラクター管理</v-card-title>
            <v-card-text>Kutulu TRPGのキャラクターを簡単に作成および編集することができます</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="h-100" variant="outlined">
            <v-icon size="75">mdi-folder-search</v-icon>
            <v-card-title>キャラクター閲覧</v-card-title>
            <v-card-text>作成したキャラクターを他の人に共有することも、非公開にすることもできます</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="h-100" variant="outlined">
            <v-icon size="75">mdi-export</v-icon>
            <v-card-title>キャラクター出力</v-card-title>
            <v-card-text>作成したキャラクターをCCFOLIAへ出力したり、ファイルに保存することができます</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="align-center text-center">
        <v-col>
          <v-card color="blue-grey" variant="flat">
            <v-card-text class="text-left pa-6">
              <p>
                本サイトは、株式会社viviONより発売された、Kutulu日本語版の２次創作ガイドラインに基づく創作物です。オリジナル（スウェーデン語）の利用はCC-BY4.0によります。
              </p>
              <p>
                "Kutulu" is available under the CC-BY 4.0 International license; therefore, anyone is free to create,
                copy and add to it as long as they follow the legal norms of that license.
              </p>
              <p>
                "Kutulu Japanese Language Version" is Copyright 2022 By ViviON ; All Rights Reserved. Planning By
                FrogGames. Published By ViviON.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-footer color="primary">
      <v-row no-gutters>
        <v-col v-for="link in links" :key="link.name" class="text-center">
          <v-btn
            color="white"
            variant="text"
            class="px-8 my-2 text-capitalize"
            :prepend-icon="link.icon"
            :href="link.url"
          >
            {{ link.name }}
          </v-btn>
        </v-col>
        <v-col class="text-center" cols="12">© 2023-2024 はにーま</v-col>
      </v-row>
    </v-footer>
  </v-theme-provider>
</template>

<script setup lang="ts">
  import logoImageUrl from "@/assets/logo_white.png";
  import { onMounted, ref } from "vue";

  const links = ref([
    { name: "利用規約", icon: "mdi-file-document", url: "/terms" },
    { name: "よくある質問", icon: "mdi-help-circle", url: "/faq" },
    { name: "開発支援", icon: "mdi-hand-coin", url: "/support" },
    { name: "Twitter", icon: "mdi-twitter", url: "https://twitter.com/vinsanet_trpg" },
  ]);

  onMounted(() => {
    document.title = "vinsanet";
  });
</script>

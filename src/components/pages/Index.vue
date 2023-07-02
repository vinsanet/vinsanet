<template>
  <v-parallax :src="imageUrl">
    <v-container class="fill-height">
      <v-row style="height: 100vh" class="align-center text-center">
        <v-col>
          <v-row class="pa-4">
            <v-col
              ><div :class="['text-h3']">Kutulu character sheet <v-chip>Beta</v-chip></div>
            </v-col>
          </v-row>
          <v-row class="pa-4">
            <v-col>
              Kutulu character sheetは、Kutulu
              TRPGのキャラクターシートを簡単に作成、管理、共有できるオンラインツールです。
            </v-col>
          </v-row>
          <v-row :justify="'center'">
            <v-spacer></v-spacer>
            <v-col><v-btn color="primary" to="/login">ログイン</v-btn></v-col>
            <v-col><v-btn color="success" to="/register">新規登録</v-btn></v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row :justify="'center'">
            <v-col>ご利用にはアカウント登録が必要です。</v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="align-center text-center align-stretch">
        <v-col>
          <v-card>
            <v-icon size="75">mdi-account-details</v-icon>
            <v-card-title>キャラクター管理</v-card-title>
            <v-card-text>Kutulu TRPGのキャラクターを簡単に作成および編集することができます</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-icon size="75">mdi-card-search-outline</v-icon>
            <v-card-title>キャラクター閲覧</v-card-title>
            <v-card-text>作成したキャラクターを他の人に共有することも、非公開にすることもできます</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-icon size="75">mdi-export</v-icon>
            <v-card-title>CCFOLIAコマ出力</v-card-title>
            <v-card-text>作成したキャラクターをCCFOLIAへ出力できます</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="align-center text-center">
        <v-col>
          <v-card color="blue-grey">
            <v-card-text class="text-left pa-6">
              当サイトは、Kutulu日本語版の２次創作ガイドラインに基づく創作物です。オリジナル（スウェーデン語）の利用はCC-BY4.0によります。<br />
              “Kutulu Japanese Language Version” Is Copyright 2022 By ViviON ; All Rights Reserved. Planning By
              FrogGames. Published By ViviON.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
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
      <v-col class="text-center" cols="12">© 2023 - はにーま</v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  import imageUrl from "/src/assets/index.jpg";

  const links = ref([
    { name: "利用規約", icon: "mdi-file-document", url: "/terms" },
    { name: "よくある質問", icon: "mdi-help-circle", url: "/faq" },
    { name: "Twitter", icon: "mdi-twitter", url: "https://twitter.com/hnymA" },
  ]);
</script>

<template>
  <v-navigation-drawer :model-value="props.drawer" expand-on-hover :rail="!mobile">
    <v-list nav>
      <v-list-item prepend-icon="mdi-home" title="ホーム" value="home" @click="onClickHome"></v-list-item>
      <v-list-item prepend-icon="mdi-file-document" title="利用規約" value="terms" @click="onClickTerms"></v-list-item>
      <v-list-item prepend-icon="mdi-help-circle" title="よくある質問" value="faq" @click="onClickFaq"></v-list-item>
      <v-list-item prepend-icon="mdi-hand-coin" title="開発支援" value="support" @click="onClickSupport"></v-list-item>
      <v-list-item prepend-icon="mdi-twitter" title="Twitter" value="twitter" @click="onClickTwitter"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { useDisplay } from "vuetify";

  type Props = { drawer: boolean };

  const props = defineProps<Props>();
  const router = useRouter();
  const { mobile } = useDisplay();
  const onClickHome = () => {
    router.push("/");
    return;
  };
  const onClickTerms = () => {
    router.push("/terms");
    return;
  };
  const onClickFaq = () => {
    router.push("/faq");
    return;
  };
  const onClickSupport = () => {
    router.push("/support");
    return;
  };
  const onClickTwitter = () => {
    window.location.href = "https://twitter.com/vinsanet_trpg";
    return;
  };
</script>

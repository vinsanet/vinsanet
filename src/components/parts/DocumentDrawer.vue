<template>
  <v-navigation-drawer :model-value="props.drawer" expand-on-hover rail>
    <v-list nav>
      <v-list-item prepend-icon="mdi-home" title="ホーム" value="home" @click="onClickHome"></v-list-item>
      <v-list-item prepend-icon="mdi-file-document" title="利用規約" value="terms" @click="onClickTerms"></v-list-item>
      <v-list-item prepend-icon="mdi-help-circle" title="FAQ" value="faq" @click="onClickFaq"></v-list-item>
      <v-list-item prepend-icon="mdi-twitter" title="Twitter" value="twitter" @click="onClickTwitter"></v-list-item>
      <v-list-item prepend-icon="mdi-email" title="お問い合わせ" value="inquiry" @click="onClickInquiry"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";

  type Props = { drawer: boolean };

  const props = defineProps<Props>();
  const router = useRouter();

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
  const onClickTwitter = () => {
    window.location.href = "https://twitter.com/hnymA";
    return;
  };
  const onClickInquiry = () => {
    router.push("/inquiry");
    return;
  };
</script>

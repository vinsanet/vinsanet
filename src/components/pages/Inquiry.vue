<template>
  <v-container class="d-flex fill-height">
    <v-row>
      <v-col>
        <v-row class="pa-2">
          <v-col class="text-center">
            <div :class="['text-h3']">お問い合わせ</div>
          </v-col>
        </v-row>
        <v-row class="pa-2">
          <v-divider></v-divider>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-spacer></v-spacer>
          <v-col class="text-center">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="name" :rules="rules.name" label="*お名前"></v-text-field>
              <v-text-field
                v-model="email"
                :rules="rules.email"
                label="メールアドレス"
                hint="回答を希望される場合はご記入ください"
              ></v-text-field>
              <v-textarea v-model="body" :rules="rules.body" label="*お問い合わせ内容" auto-grow></v-textarea>
              <v-checkbox v-model="answer" label="回答を希望する"></v-checkbox>
              <p class="pb-4">
                <a href="/terms" class="text-decoration-none" target="_blank" rel="noopener noreferrer">
                  プライバシーポリシー
                </a>
                に同意の上、送信してください。
              </p>
              <v-btn color="primary" prepend-icon="mdi-send" @click="onClickSend">送信</v-btn>
            </v-form>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const form = ref();
  const name = ref("");
  const email = ref("");
  const body = ref("");
  const answer = ref(false);
  const valid = ref(false);

  const rules = {
    name: [(v: string) => !!v || "お名前を入力してください"],
    email: [
      (v: string) => /^$|.+@.+\..+/.test(v) || "有効なメールアドレスを入力してください",
      (v: string) => !answer.value || !!v || "回答を希望される場合は、メールアドレスを入力してください",
    ],
    body: [(v: string) => !!v || "お問い合わせ内容を入力してください"],
  };

  const onClickSend = async () => {
    const result = await form.value.validate();
    valid.value = result.valid;
    if (!valid.value) return;
    console.log("ok");
  };
</script>

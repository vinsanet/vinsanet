<template>
  <v-container class="d-flex fill-height">
    <v-row>
      <v-col>
        <v-row class="pa-2">
          <v-col>
            <div class="text-h4">開発支援</div>
          </v-col>
        </v-row>
        <v-row class="pa-2">
          <v-divider></v-divider>
        </v-row>
        <v-row class="pa-2 mb-4">
          <v-col>
            <v-card variant="text">
              <v-card-text>
                <v-row>
                  <v-col>
                    <div class="pa-4">
                      <p>
                        vinsanetはユーザーの皆様に無料でご利用頂いております。広告も設置しておりません。
                        開発および運営にかかる費用は、管理者である
                        <a :href="'https://twitter.com/hnymA'" class="text-decoration-none">はにーま</a>
                        が全て負担しております。
                      </p>
                      <p>今後も安定したサービスを提供するため、金銭的支援を頂けますと幸いです。</p>
                    </div>
                    <div class="pa-4">
                      <p>
                        支援は、
                        <a :href="'https://vinsanet.fanbox.cc'" class="text-decoration-none">pixivFANBOX</a>
                        経由で受け付けております。 詳しい支援の方法は、リンク先をご覧ください。
                      </p>
                    </div>
                    <div class="pa-4">
                      <p>
                        開発の支援をご検討いただきまして、ありがとうございます。引き続き、vinsanetをよろしくお願いいたします。
                      </p>
                      <p>良いKutulu TRPGライフを！</p>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";

  onMounted(() => {
    document.title = "開発支援 | vinsanet";
  });
</script>

<style scoped>
  a {
    position: relative;
    border-bottom: solid 1px rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-body));
  }

  a::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 0;
    height: 2px;
    background-color: rgb(var(--v-theme-primary));
    transition: 0.5s;
  }

  a:hover::after {
    width: 100%;
  }
</style>

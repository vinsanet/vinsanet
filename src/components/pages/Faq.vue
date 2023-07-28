<template>
  <v-container class="d-flex fill-height">
    <v-row>
      <v-col>
        <v-row class="pa-2">
          <v-col>
            <div class="text-h4">よくある質問</div>
          </v-col>
        </v-row>
        <v-row class="pa-2">
          <v-divider></v-divider>
        </v-row>
        <div id="toc">
          <v-row class="pa-2">
            <v-col>
              <v-card class="px-8 py-4" variant="outlined">
                <ul>
                  <li v-for="content in tableOfContents" :key="content.title">
                    <a :href="'#' + content.href" class="text-decoration-none">{{ content.title }}</a>
                  </li>
                </ul>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div id="body">
          <v-row class="pa-2">
            <v-col>
              <v-card variant="text">
                <v-card-text>
                  <v-row class="mb-2">
                    <v-col>
                      <div id="q1" :class="['pa-2', 'question', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">Q</span>
                        <span class="font-weight-bold">Kutuluとは何ですか？</span>
                      </div>
                      <div :class="['pa-2', 'answer', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">A</span>
                        <div>
                          <p class="font-weight-bold">
                            クトゥルフ神話をベースにした、スウェーデン発のテーブルトークRPGです。
                          </p>
                          <p>
                            先行作品としてはクトゥルフ神話TRPG（クトゥルフの呼び声、Call of
                            Cthulhu）が有名ですが、そちらとはまた異なった体験を楽しめるシステムとなっています。
                            ミステリー小説を追体験するかのように楽しめる、シンプルでありながら奥深いシステムです。
                          </p>
                          <p>
                            クトゥルフ神話TRPGと比較すると、特に"狂気"に関するルールが特徴的です。
                            ゲームマスターはその空気感を引き立てるために、「信頼できない語り手」という手法を用いて、登場人物たちに起こった出来事を描写していきます。
                          </p>
                          <p>
                            詳しくは、
                            <a href="https://kutulu.jp/" class="text-decoration-none">Kutulu Japan公式サイト</a>
                            をご覧ください。
                          </p>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2">
                    <v-col>
                      <div id="q2" :class="['pa-2', 'question', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">Q</span>
                        <span class="font-weight-bold">本サービスの利用は無料ですか？</span>
                      </div>
                      <div :class="['pa-2', 'answer', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">A</span>
                        <div>
                          <p class="font-weight-bold">はい、無料です。</p>
                          <p>
                            ただし、サービスを安定し提供するため、ユーザーの皆様からの開発支援を受け付けております。詳しくは、
                            <a href="/support" class="text-decoration-none">開発支援のページ</a> をご覧ください。
                          </p>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2">
                    <v-col>
                      <div id="q3" :class="['pa-2', 'question', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">Q</span>
                        <span class="font-weight-bold">
                          タイトルに"Beta"と書いてありますが、これはどういう意味ですか？
                        </span>
                      </div>
                      <div :class="['pa-2', 'answer', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">A</span>
                        <div>
                          <p class="font-weight-bold">
                            本サービスがまだ正式リリース前のベータ版であることを意味しています。
                          </p>
                          <p>
                            ベータ版とは、正式版を公開する前にユーザーに試用してもらうサンプルのバージョンです。ベータ版期間中は、以下の点にご留意頂きますようお願いします。
                          </p>
                          <p class="my-2">
                            ・動作が不安定になる場合があります。<br />
                            ・仕様を予告なく変更する場合があります。<br />
                            ・正式版移行時にはデータを消去する場合があります。<br />
                            ・正式版移行時にはURLを変更する予定です。<br />
                          </p>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2">
                    <v-col>
                      <div id="q4" :class="['pa-2', 'question', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">Q</span>
                        <span class="font-weight-bold">サービスが正常に利用できません。</span>
                      </div>
                      <div :class="['pa-2', 'answer', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">A</span>
                        <div>
                          <p class="font-weight-bold">
                            ご迷惑をお掛けしており申し訳ありません。お手数ですが、管理者までご連絡いただければ幸いです。
                          </p>
                          <p>
                            お使いの環境や条件によっては、本サービスが正常に動作しない場合があります。
                            不具合のチェックには全力を尽くして取り組んでいますが、すべての環境を再現することは難しいため、管理者が見逃している不具合が存在する可能性があります。
                          </p>
                          <p>
                            お気づきの点がございましたら、管理者までご報告いただけると幸いです。
                            下記に記載のお問い合わせ先へご連絡ください。
                          </p>
                          <p>皆さまのご報告により、本サービスがより良いものになります。ぜひ、ご協力をお願いします。</p>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2">
                    <v-col>
                      <div id="q5" :class="['pa-2', 'question', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">Q</span>
                        <span class="font-weight-bold">お問い合わせ先を教えてください。</span>
                      </div>
                      <div :class="['pa-2', 'answer', 'd-flex', 'align-center']">
                        <span :class="['text-h4', 'text-lg-h3', 'mr-4']">A</span>
                        <div>
                          <p class="font-weight-bold">
                            下記いずれかのTwitterアカウントへのリプライ、およびダイレクトメッセージにて受け付けております。
                          </p>
                          <p>ご意見やご要望がございましたら、お気軽にお問い合わせください。</p>
                          <p class="my-2">
                            ・<a href="https://twitter.com/hnymA" class="text-decoration-none"
                              >管理者Twitterアカウント</a
                            ><br />
                            ・<a href="https://twitter.com/vinsanet_trpg" class="text-decoration-none"
                              >vinsanet公式Twitterアカウント</a
                            >
                          </p>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";

  const tableOfContents = ref([] as Array<{ title: string; href: string }>);

  onMounted(() => {
    const questions = document.getElementsByClassName("question");
    Array.from(questions).forEach((question) => {
      tableOfContents.value.push({
        title: (question as HTMLElement).innerText.replace("Q\n", ""),
        href: question.id,
      });
    });
  });
</script>

<style scoped>
  .question {
    border-left: 5px solid rgb(var(--v-theme-primary));
    background: rgba(var(--v-theme-primary), 0.05);
  }

  .answer {
    border-left: 5px solid rgb(var(--v-theme-secondary));
    background: rgba(var(--v-theme-secondary), 0.05);
  }

  #toc a {
    position: relative;
    color: rgb(var(--v-theme-body));
  }

  #body a {
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

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-row>
        <v-col>
          <v-card variant="outlined" class="pa-6 ma-2">
            <v-row>
              <v-col :cols="mobile ? '12' : '6'">
                <v-carousel v-model="imagePage" hide-delimiters show-arrows="hover">
                  <v-carousel-item v-for="imageUrl in imageUrls" :key="imageUrl" :src="imageUrl"></v-carousel-item>
                </v-carousel>
              </v-col>
              <v-col :cols="mobile ? '12' : '6'">
                <v-row>
                  <v-col>
                    <div :class="['text-body', 'text-lg-h6']">{{ information.kana }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div :class="['text-h5', 'text-lg-h4']">{{ information.name }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-chip v-if="!information.isPublishing" label class="mr-4" color="secondary">非公開</v-chip>
                    <v-chip v-if="information.isLost" label color="error">ロスト</v-chip>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card flat color="background">
                      <v-table style="background-color: transparent">
                        <tbody>
                          <tr>
                            <th :class="['text-body', 'text-lg-subtitle-1', 'font-weight-bold']">称号 / 肩書</th>
                            <td :class="['text-body', 'text-lg-subtitle-1']">{{ information.title }}</td>
                          </tr>
                          <tr>
                            <th :class="['text-body', 'text-lg-subtitle-1', 'font-weight-bold']">年齢</th>
                            <td :class="['text-body', 'text-lg-subtitle-1']">{{ information.age }}</td>
                          </tr>
                          <tr>
                            <th :class="['text-body', 'text-lg-subtitle-1', 'font-weight-bold']">性別</th>
                            <td :class="['text-body', 'text-lg-subtitle-1']">{{ information.gender }}</td>
                          </tr>
                          <tr>
                            <th :class="['text-body', 'text-lg-subtitle-1', 'font-weight-bold']">職業</th>
                            <td :class="['text-body', 'text-lg-subtitle-1']">{{ information.profession }}</td>
                          </tr>
                          <tr>
                            <th :class="['text-body', 'text-lg-subtitle-1', 'font-weight-bold']">出身</th>
                            <td :class="['text-body', 'text-lg-subtitle-1']">{{ information.home }}</td>
                          </tr>
                          <tr>
                            <th :class="['text-body', 'text-lg-subtitle-1', 'font-weight-bold']">階級</th>
                            <td :class="['text-body', 'text-lg-subtitle-1']">{{ information.rank }}</td>
                          </tr>
                          <tr>
                            <th :class="['text-body', 'text-lg-subtitle-1', 'font-weight-bold']">家柄</th>
                            <td :class="['text-body', 'text-lg-subtitle-1']">{{ information.family }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card variant="outlined" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col :cols="mobile ? '6' : '3'"><div :class="['text-h5', 'text-lg-h4']">能力値</div></v-col>
                  <v-col :cols="mobile ? '6' : '3'">
                    <div :class="['text-body', 'text-lg-h6', skillPoints > 13 ? 'text-red' : '']">
                      {{ skillPoints }}/13
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="mobile ? '12' : '6'">
                <v-row>
                  <v-col>
                    <div :class="['text-body', 'text-lg-h6', 'font-weight-bold']">アクティブ能力値</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <div v-for="(skill, index) in information.skills" :key="skill.name">
                  <div v-if="index <= 4">
                    <v-row class="px-2">
                      <v-col cols="4">
                        <div :class="'text-subtitle-1'">{{ skill.name }}</div>
                      </v-col>
                      <v-col cols="2">
                        <div :class="'text-subtitle-1'">{{ skill.value }}</div>
                      </v-col>
                      <v-col>
                        <v-rating
                          v-model="skill.value"
                          length="4"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="skill"
                          readonly
                        ></v-rating>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
              <v-col :cols="mobile ? '12' : '6'">
                <v-row>
                  <v-col>
                    <div :class="['text-body', 'text-lg-h6', 'font-weight-bold']">パッシブ能力値</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <div v-for="(skill, index) in information.skills" :key="skill.name">
                  <div v-if="index >= 5">
                    <v-row class="px-2">
                      <v-col cols="4">
                        <div :class="'text-subtitle-1'">{{ skill.name }}</div>
                      </v-col>
                      <v-col cols="2">
                        <div :class="'text-subtitle-1'">{{ skill.value }}</div>
                      </v-col>
                      <v-col>
                        <v-rating
                          v-model="skill.value"
                          length="4"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="skill"
                          readonly
                        ></v-rating>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card variant="outlined" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col :cols="mobile ? '6' : '3'"><div :class="['text-h5', 'text-lg-h4']">専門分野</div></v-col>
                  <v-col :cols="mobile ? '6' : '3'">
                    <div :class="['text-body', 'text-lg-h6', specialityPoints > 10 ? 'text-red' : '']">
                      {{ specialityPoints }}/10
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="mobile ? '12' : '6'">
                <div v-for="(speciality, index) in information.specialities" :key="speciality.name">
                  <div v-if="index <= 5">
                    <v-row class="px-2">
                      <v-col cols="4">
                        <div :class="'text-subtitle-1'">{{ speciality.name }}</div>
                      </v-col>
                      <v-col cols="2">
                        <div :class="'text-subtitle-1'">{{ speciality.value }}</div>
                      </v-col>
                      <v-col>
                        <v-rating
                          v-model="speciality.value"
                          length="3"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="speciality"
                          readonly
                        ></v-rating>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
              <v-col :cols="mobile ? '12' : '6'">
                <div v-for="(speciality, index) in information.specialities" :key="speciality.name">
                  <div v-if="index >= 6">
                    <v-row class="px-2">
                      <v-col cols="4">
                        <div :class="'text-subtitle-1'">{{ speciality.name }}</div>
                      </v-col>
                      <v-col cols="2">
                        <div :class="'text-subtitle-1'">{{ speciality.value }}</div>
                      </v-col>
                      <v-col>
                        <v-rating
                          v-model="speciality.value"
                          length="3"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="speciality"
                          readonly
                        ></v-rating>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="mobile ? '12' : '6'">
          <v-card variant="outlined" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row class="px-2">
                  <v-col><div :class="['text-h5', 'text-lg-h4']">負傷</div></v-col>
                  <v-col>
                    <div :class="['text-body', 'text-lg-h6']">{{ information.injury }}/3</div>
                  </v-col>
                  <v-col>
                    <v-rating
                      v-model="information.injury"
                      length="3"
                      density="compact"
                      full-icon="mdi-circle"
                      empty-icon="mdi-circle-outline"
                      color="injury"
                      readonly
                    ></v-rating>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col :cols="mobile ? '12' : '6'">
          <v-card variant="outlined" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col><div :class="['text-h5', 'text-lg-h4']">タグ</div></v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-chip-group :disabled="true" column>
                      <div v-if="information?.tags?.length === 0">設定なし</div>
                      <div v-for="tag in information.tags" v-else :key="tag">
                        <v-chip label :ripple="false">{{ tag }}</v-chip>
                      </div>
                    </v-chip-group>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card variant="outlined" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <div :class="['text-h5', 'text-lg-h4']">メモ</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-expansion-panels v-model="openedRemarks" variant="accordion" multiple>
                  <v-expansion-panel
                    v-for="(remark, index) in information.remarks"
                    :key="remark.title"
                    elevation="0"
                    bg-color="background"
                    :value="index"
                  >
                    <div v-if="remark.isPublic || hasCharacter">
                      <v-expansion-panel-title class="remarks-title">
                        <div class="mr-2">
                          <span v-if="!remark.isPublic">
                            <v-icon size="small">mdi-eye-off</v-icon>
                            <v-divider vertical></v-divider>
                          </span>
                          <span v-else-if="remark.answer !== ''">
                            <v-icon size="small">mdi-lock</v-icon>
                            <v-divider vertical></v-divider>
                          </span>
                        </div>
                        {{ remark.title }}
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <div v-if="!canShowRemarks[index]">
                          <v-row>
                            <v-col>このメモは限定公開です。</v-col>
                          </v-row>
                          <v-row class="d-flex align-center">
                            <v-col>
                              <v-text-field
                                :id="'remark-answer-' + index"
                                variant="outlined"
                                density="comfortable"
                                :label="remark.question"
                                hide-details="auto"
                                :error-messages="remarksAnswerErrorMessages[index]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-btn
                                color="secondary"
                                variant="flat"
                                class="my-2"
                                prepend-icon="mdi-lock-open-check"
                                @click.stop="onClickRemarksAnswer(index)"
                              >
                                確認
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>
                        <div v-if="canShowRemarks[index]">
                          <v-textarea v-model="remark.body" variant="plain" readonly hide-details></v-textarea>
                        </div>
                      </v-expansion-panel-text>
                    </div>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
  <v-dialog v-model="exportDialog" width="500px" max-width="90%">
    <v-card>
      <v-card-title>キャラクター出力</v-card-title>
      <v-card-text>
        <v-row v-if="alertMessage !== ''">
          <v-col>
            <v-alert type="warning" density="compact" :text="alertMessage"></v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-switch
              v-model="includeZeroValues"
              color="primary"
              label="0レベルの能力値を含める"
              density="comfortable"
              hide-details
            ></v-switch>
            <v-switch
              v-model="isCommandKutulu"
              color="primary"
              label="Kutuluコマンドを使用する"
              density="comfortable"
              hide-details
            ></v-switch>
            <v-textarea v-model="chatPallette" variant="outlined" no-resize readonly></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="secondary" block @click.stop="onClickCopyPalette">
              <v-icon>mdi-clipboard-text</v-icon> クリップボードにコピー
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="secondary" block @click.stop="onClickCopyCharacter">
              <v-icon>mdi-face-man</v-icon> CCFOLIA形式でコピー
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="secondary" variant="outlined" block @click.stop="onClickDownloadCharacter">
              <v-icon>mdi-download</v-icon> ファイルダウンロード
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="secondary" variant="outlined" block @click.stop="onClickPrint">
              <v-icon>mdi-printer</v-icon> 印刷用ページを表示
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click.stop="exportDialog = false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-layout-item v-if="xs" class="text-end" model-value position="bottom" size="80">
    <v-btn class="ma-4 text-white" color="primary" icon>
      <v-icon>mdi-dots-vertical</v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item v-if="hasCharacter" @click.stop="onClickEdit">
            <v-icon>mdi-pencil</v-icon> 編集画面
          </v-list-item>
          <v-divider v-if="hasCharacter"></v-divider>
          <v-list-item @click.stop="onClickExport"><v-icon>mdi-export-variant</v-icon> キャラクター出力</v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-layout-item>
  <v-footer v-if="smAndUp" app fixed color="background">
    <v-card flat tile width="100%" class="text-center" color="grey">
      <v-card-text>
        <v-row>
          <v-col v-if="hasCharacter">
            <v-btn color="primary" variant="flat" prepend-icon="mdi-pencil" @click.stop="onClickEdit">編集画面</v-btn>
          </v-col>
          <v-col>
            <v-btn color="secondary" variant="flat" prepend-icon="mdi-export-variant" @click.stop="onClickExport">
              キャラクター出力
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script setup lang="ts">
  import { firebaseAuth, firebaseDb, firebaseStorage } from "@/firebase/firebase";
  import { CharacterType, characterConverter } from "@/models/character";
  import { useAccountNameStore } from "@/store/account";
  import { useSnackbarStore } from "@/store/snackbar";
  import { collection, getDocs, query, where } from "@firebase/firestore";
  import { getDownloadURL, ref as storageRef } from "firebase/storage";
  import { storeToRefs } from "pinia";
  import { computed, onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useDisplay } from "vuetify";

  const route = useRoute();
  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();
  const { id } = route.params;
  const { mobile, xs, smAndUp } = useDisplay();
  const accountNamestore = useAccountNameStore();
  const { accountName } = storeToRefs(accountNamestore);

  const information = ref({} as CharacterType);
  const imageUrls = ref([] as Array<string>);
  const imagePage = ref(0);
  const openedRemarks = ref([0] as Array<number>);
  const canShowRemarks = ref([] as Array<boolean>);
  const remarksAnswerErrorMessages = ref([] as Array<string>);
  const exportDialog = ref(false);
  const includeZeroValues = ref(false);
  const isCommandKutulu = ref(false);

  onMounted(() => {
    const q = query(collection(firebaseDb, "characters"), where("id", "==", id)).withConverter(characterConverter);
    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          showSnackbar("キャラクターが存在しません", "error");
          return;
        }
        const character = querySnapshot.docs[0].data();
        if (!character.isPublishing && character.userId !== firebaseAuth.currentUser?.uid) {
          showSnackbar("キャラクターを表示できません", "error");
          return;
        }
        information.value = character;
        information.value.remarks.forEach((remark) => {
          const canShowRemark = remark.answer === "" || information.value.userId === firebaseAuth.currentUser?.uid;
          canShowRemarks.value.push(canShowRemark);
          remarksAnswerErrorMessages.value.push("");
        });
        document.title = `${character.name === "" ? "新規キャラクター" : character.name} | vinsanet`;
      })
      .then(() => {
        if (information.value.images.length === 0) {
          const imageRef = storageRef(firebaseStorage, "characters/undefined.png");
          getDownloadURL(imageRef).then((downloadUrl) => {
            imageUrls.value.push(downloadUrl);
          });
        } else {
          (async () => {
            for (const image of information.value.images) {
              const imageRef = storageRef(firebaseStorage, `characters/${image.id}.${image.extension}`);
              const downloadUrl = await getDownloadURL(imageRef);
              imageUrls.value.push(downloadUrl);
            }
          })();
        }
      });
  });

  const onClickRemarksAnswer = (index: number) => {
    const answer = document.getElementById(`remark-answer-${index}`) as HTMLInputElement;
    if (answer.value === "") {
      remarksAnswerErrorMessages.value[index] = "質問の答えを入力してください";
      return;
    }
    if (information.value.remarks[index].answer !== answer.value) {
      remarksAnswerErrorMessages.value[index] = "質問の答えが違います";
      return;
    }
    remarksAnswerErrorMessages.value[index] = "";
    canShowRemarks.value[index] = true;
  };
  const onClickEdit = () => {
    router.push(`/characters/${id}/edit`);
  };
  const onClickExport = () => {
    exportDialog.value = true;
  };
  const onClickCopyPalette = () => {
    navigator.clipboard.writeText(chatPallette.value);
    showSnackbar("チャットパレットをコピーしました", "success");
  };
  const onClickCopyCharacter = () => {
    const activeSkillLength = 5;
    const data = {
      kind: "character",
      data: {
        name: information.value.name,
        memo: "",
        externalUrl: "",
        initiative: 0,
        params: [] as Array<{ label: string; value: string }>,
        status: [] as Array<{ label: string; value: string; max: number }>,
        commands: "",
      },
    };
    information.value.skills.forEach((skill, index) => {
      if (skill.value !== 0 || includeZeroValues.value) {
        data.data.params.push({ label: `${skill.name}`, value: `${skill.value}` });
        if (index < activeSkillLength) {
          if (isCommandKutulu.value) {
            data.data.commands += `{${skill.name}}KU 【${skill.name}】\n`;
          } else {
            data.data.commands += `{${skill.name}}B6>=4 【${skill.name}】\n`;
          }
        }
      }
    });
    information.value.specialities.forEach((spaciality) => {
      if (spaciality.value !== 0 || includeZeroValues.value) {
        data.data.params.push({ label: `${spaciality.name}`, value: `${spaciality.value}` });
      }
    });
    data.data.commands = data.data.commands.trim();
    data.data.status.push({ label: "負傷", value: `${information.value.injury}`, max: 3 });
    data.data.externalUrl = location.href;
    navigator.clipboard.writeText(JSON.stringify(data));
    showSnackbar("キャラクターをコピーしました", "success");
  };
  const onClickDownloadCharacter = () => {
    const activeSkillLength = 5;
    const data = {
      kind: "character",
      data: {
        rule: information.value.rule,
        name: information.value.name,
        kana: information.value.kana,
        title: information.value.title,
        age: information.value.age,
        gender: information.value.gender,
        profession: information.value.profession,
        home: information.value.home,
        rank: information.value.rank,
        family: information.value.family,
        owner: accountName.value,
        tags: information.value.tags,
        remarks: information.value.remarks,
        memo: "",
        initiative: 0,
        params: new Array<{ label: string; value: number }>(),
        status: new Array<{ label: string; value: number; max?: number }>(),
        commands: "",
      },
    };
    information.value.skills.forEach((skill, index) => {
      if (skill.value > 0 || includeZeroValues.value) {
        data.data.params.push({
          label: skill.name,
          value: skill.value,
        });
        if (index < activeSkillLength) {
          data.data.commands += isCommandKutulu.value
            ? `{${skill.name}}KU 【${skill.name}】\n`
            : `{${skill.name}}B6>=4 【${skill.name}】\n`;
        }
      }
    });
    information.value.specialities.forEach((speciality) => {
      if (speciality.value > 0 || includeZeroValues.value) {
        data.data.params.push({
          label: speciality.name,
          value: speciality.value,
        });
      }
    });
    data.data.commands = data.data.commands.trim();
    data.data.status.push({
      label: "負傷",
      value: information.value.injury,
      max: 3,
    });
    const jsonValue = JSON.stringify(data);
    const blob = new Blob([jsonValue], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${information.value.name === "" ? "noname" : information.value.name}.json`;
    link.click();
  };
  const onClickPrint = () => {
    const route = router.resolve({ path: `/characters/${id}/print` });
    window.open(route.href);
  };

  const skillPoints = computed(() => {
    return information?.value?.skills?.reduce((sum, skill) => {
      return sum + skill.value;
    }, 0);
  });
  const specialityPoints = computed(() => {
    return information?.value?.specialities?.reduce((sum, speciality) => {
      return sum + speciality.value;
    }, 0);
  });
  const hasCharacter = computed(() => {
    if (information.value.userId !== firebaseAuth.currentUser?.uid) return false;
    return true;
  });
  const alertMessage = computed(() => {
    if (skillPoints.value > 13 && specialityPoints.value > 10) {
      return "能力値と専門分野が上限を越えています";
    } else if (skillPoints.value > 13) {
      return "能力値が上限を越えています";
    } else if (specialityPoints.value > 10) {
      return "専門分野が上限を越えています";
    } else {
      return "";
    }
  });
  const chatPallette = computed(() => {
    let palette = "";
    const activeSkillLength = 5;
    information.value.skills.forEach((skill, index) => {
      if ((skill.value !== 0 || includeZeroValues.value) && index < activeSkillLength) {
        if (isCommandKutulu.value) {
          palette += `${skill.value}KU 【${skill.name}】\n`;
        } else {
          palette += `${skill.value}B6>=4 【${skill.name}】\n`;
        }
      }
    });
    return palette.trim();
  });
</script>

<style scoped>
  .remarks-title {
    background-color: rgba(var(--v-theme-grey), 0.3);
  }
</style>

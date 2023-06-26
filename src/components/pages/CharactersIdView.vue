<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-row>
        <v-col>
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-carousel hide-delimiters show-arrows="hover">
                  <v-carousel-item v-for="imageUrl in imageUrls" :key="imageUrl" :src="imageUrl"></v-carousel-item>
                </v-carousel>
              </v-col>
              <v-col>
                <v-row>
                  <v-col>
                    <div :class="'text-h3'">{{ information.kana }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div :class="'text-h1'">{{ information.name }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-sheet elevation="2">
                      <v-table>
                        <tbody>
                          <tr>
                            <th>称号 / 肩書</th>
                            <td>{{ information.title }}</td>
                          </tr>
                          <tr>
                            <th>年齢</th>
                            <td>{{ information.age }}</td>
                          </tr>
                          <tr>
                            <th>性別</th>
                            <td>{{ information.gender }}</td>
                          </tr>
                          <tr>
                            <th>職業</th>
                            <td>{{ information.profession }}</td>
                          </tr>
                          <tr>
                            <th>出身</th>
                            <td>{{ information.home }}</td>
                          </tr>
                          <tr>
                            <th>階級</th>
                            <td>{{ information.rank }}</td>
                          </tr>
                          <tr>
                            <th>家柄</th>
                            <td>{{ information.family }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col cols="2"><div :class="'text-h4'">能力値</div></v-col>
                  <v-col cols="1"
                    ><div :class="['text-h6', skillPoints > 13 ? 'text-red' : '']">{{ skillPoints }}/13</div></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-row>
                  <v-col>
                    <div :class="'text-h6'">アクティブ能力値</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <div v-for="(skill, index) in information.skills" :key="skill.name">
                  <div v-if="index <= 4">
                    <v-row>
                      <v-col cols="1"></v-col>
                      <v-col cols="3">
                        <div :class="'text-subtitle-1'">{{ skill.name }}</div>
                      </v-col>
                      <v-col cols="2">
                        <div :class="'text-subtitle-1'">{{ skill.value }}</div>
                      </v-col>
                      <v-col cols="3">
                        <v-rating
                          v-model="skill.value"
                          length="4"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="teal"
                          readonly
                        ></v-rating>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
              <v-col>
                <v-row>
                  <v-col>
                    <div :class="'text-h6'">パッシブ能力値</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <div v-for="(skill, index) in information.skills" :key="skill.name">
                  <div v-if="index >= 5">
                    <v-row>
                      <v-col cols="1"></v-col>
                      <v-col cols="3">
                        <div :class="'text-subtitle-1'">{{ skill.name }}</div>
                      </v-col>
                      <v-col cols="2">
                        <div :class="'text-subtitle-1'">{{ skill.value }}</div>
                      </v-col>
                      <v-col cols="3">
                        <v-rating
                          v-model="skill.value"
                          length="4"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="teal"
                          readonly
                        ></v-rating>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col cols="2"><div :class="'text-h4'">専門分野</div></v-col>
                  <v-col cols="1"
                    ><div :class="['text-h6', specialityPoints > 10 ? 'text-red' : '']">
                      {{ specialityPoints }}/10
                    </div></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div v-for="(speciality, index) in information.specialities" :key="speciality.name">
                  <div v-if="index <= 5">
                    <v-row>
                      <v-col cols="1"></v-col>
                      <v-col cols="3">
                        <div :class="'text-subtitle-1'">{{ speciality.name }}</div>
                      </v-col>
                      <v-col cols="2">
                        <div :class="'text-subtitle-1'">{{ speciality.value }}</div>
                      </v-col>
                      <v-col cols="3">
                        <v-rating
                          v-model="speciality.value"
                          length="3"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="indigo"
                          readonly
                        ></v-rating>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
              <v-col>
                <div v-for="(speciality, index) in information.specialities" :key="speciality.name">
                  <div v-if="index >= 6">
                    <v-row>
                      <v-col cols="1"></v-col>
                      <v-col cols="3">
                        <div :class="'text-subtitle-1'">{{ speciality.name }}</div>
                      </v-col>
                      <v-col cols="2">
                        <div :class="'text-subtitle-1'">{{ speciality.value }}</div>
                      </v-col>
                      <v-col cols="3">
                        <v-rating
                          v-model="speciality.value"
                          length="3"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="indigo"
                          readonly
                        ></v-rating>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col><div :class="'text-h4'">負傷</div></v-col>
                  <v-col>
                    <div :class="'text-h6'">{{ information.damage }}/3</div>
                  </v-col>
                  <v-col
                    ><v-rating
                      v-model="information.damage"
                      length="3"
                      density="compact"
                      full-icon="mdi-circle"
                      empty-icon="mdi-circle-outline"
                      color="red"
                      readonly
                    ></v-rating
                  ></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col><div :class="'text-h4'">タグ</div> </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-chip-group :disabled="true">
                      <div v-if="information?.tags?.length === 0">設定なし</div>
                      <div v-for="tag in information.tags" v-else :key="tag">
                        <v-chip label :ripple="false">{{ tag }}</v-chip>
                      </div>
                    </v-chip-group>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col><div :class="'text-h4'">メモ</div> </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea v-model="information.memo" variant="outlined" auto-grow counter readonly></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
  <v-dialog v-model="exportDialog" width="30%" min-width="400px">
    <v-card class="overflow-y-hidden">
      <v-card-title>出力</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-switch
              v-model="includeZeroValues"
              color="primary"
              label="0レベルの能力値を含める"
              hide-details
            ></v-switch>
            <v-switch
              v-model="isCommandKutulu"
              color="primary"
              label="Kutuluコマンドを使用する"
              hide-details
            ></v-switch>
            <v-textarea v-model="chatPallette" variant="outlined" no-resize readonly></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" block @click="onClickCopyPalette"
              ><v-icon>mdi-clipboard-text</v-icon>クリップボードにコピー</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" variant="outlined" block @click="onClickCopyCharacter"
              ><v-icon>mdi-face-man</v-icon>CCFOLIA形式でコピー</v-btn
            ></v-col
          >
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col><v-btn color="primary" block @click="exportDialog = false">閉じる</v-btn></v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-footer app fixed>
    <v-card flat tile width="100%" class="text-center" color="grey-lighten-1">
      <v-card-text>
        <v-row>
          <v-col></v-col>
          <v-col>
            <v-btn color="primary" prepend-icon="mdi-account-edit" @click="onClickEdit">編集画面</v-btn>
          </v-col>
          <v-col>
            <v-btn color="primary" prepend-icon="mdi-export-variant" @click="onClickExport">出力</v-btn>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script setup lang="ts">
  import { firebaseAuth, firebaseDb, firebaseStorage } from "@/firebase/firebase";
  import { CharacterType, characterConverter } from "@/models/character";
  import { useSnackbarStore } from "@/store/snackbar";
  import { collection, getDocs, query, where } from "@firebase/firestore";
  import { getDownloadURL, ref as storageRef } from "firebase/storage";
  import { computed, onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();
  const { id } = route.params;

  const information = ref({} as CharacterType);
  const imageUrls = ref([] as Array<string>);
  const exportDialog = ref(false);
  const includeZeroValues = ref(false);
  const isCommandKutulu = ref(false);

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
    data.data.status.push({ label: "負傷", value: `${information.value.damage}`, max: 3 });
    data.data.memo = `${information.value.name}\n${information.value.memo}`.trim();
    data.data.externalUrl = location.href;
    navigator.clipboard.writeText(JSON.stringify(data));
    showSnackbar("キャラクターをコピーしました", "success");
  };

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
      })
      .then(() => {
        information.value.images.forEach((image) => {
          const imageRef = storageRef(firebaseStorage, `characters/${id}-${image.id}.png`);
          getDownloadURL(imageRef).then((downloadUrl) => {
            imageUrls.value.push(downloadUrl);
          });
        });
      });
  });

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

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-row>
        <v-col>
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col :cols="mobile ? '12' : '6'">
                <v-row>
                  <v-col>
                    <v-carousel v-model="imagePage" hide-delimiters show-arrows="hover">
                      <v-carousel-item
                        v-for="imageUrl in imageUrls"
                        :key="imageUrl.id"
                        :src="imageUrl.value"
                      ></v-carousel-item>
                    </v-carousel>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-center">
                    <v-btn color="indigo" prepend-icon="mdi-image-edit" @click="() => (imageDialog = true)">
                      画像編集
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col :cols="mobile ? '12' : '6'">
                <v-row>
                  <v-col>
                    <v-text-field v-model="information.name" variant="outlined" label="名前" clearable></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="information.kana"
                      variant="outlined"
                      label="読みがな"
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="information.title"
                      variant="outlined"
                      label="称号 / 肩書"
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="information.age" variant="outlined" label="年齢" clearable></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="information.gender" variant="outlined" label="性別" clearable></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="information.profession"
                      variant="outlined"
                      label="職業"
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="information.home" variant="outlined" label="出身" clearable></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="information.rank" variant="outlined" label="階級" clearable></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="information.family" variant="outlined" label="家柄" clearable></v-text-field>
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
                      <v-col cols="4">{{ skill.name }}</v-col>
                      <v-col cols="2">{{ skill.value }}</v-col>
                      <v-col>
                        <v-rating
                          v-model="skill.value"
                          length="4"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="green"
                          clearable
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
                      <v-col cols="4">{{ skill.name }}</v-col>
                      <v-col cols="2">{{ skill.value }}</v-col>
                      <v-col>
                        <v-rating
                          v-model="skill.value"
                          length="4"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="green"
                          clearable
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
                          color="blue"
                          clearable
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
                          color="blue"
                          clearable
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
        <v-col :cols="mobile ? '12' : '6'">
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row class="px-2">
                  <v-col cols="4"><div :class="['text-h5', 'text-lg-h4']">負傷</div></v-col>
                  <v-col cols="2">
                    <div :class="['text-body', 'text-lg-h6']">{{ information.damage }}/3</div>
                  </v-col>
                  <v-col>
                    <v-rating
                      v-model="information.damage"
                      length="3"
                      density="compact"
                      full-icon="mdi-circle"
                      empty-icon="mdi-circle-outline"
                      color="red"
                      clearable
                    ></v-rating>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col :cols="mobile ? '12' : '6'">
          <v-sheet elevation="2" class="pa-6 ma-2">
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
                    <v-chip-group column>
                      <div v-for="(tag, index) in information.tags" :key="tag">
                        <v-chip label :ripple="false" closable @click:close="onClickTagClose(index)">
                          {{ tag }}
                        </v-chip>
                      </div>
                    </v-chip-group>
                    <v-text-field v-model="newTag" variant="outlined" @keyup.enter="onEnterTag()"></v-text-field>
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
                  <v-col><div :class="['text-h5', 'text-lg-h4']">メモ</div></v-col>
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
                <v-textarea v-model="information.memo" variant="outlined" counter></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
  <v-dialog v-model="imageDialog" width="500px" max-width="90%" @click:outside="onClickImageClose">
    <v-card>
      <v-card-title>画像編集</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-table>
              <thead>
                <tr>
                  <th width="25%">画像</th>
                  <th width="60%">説明</th>
                  <th width="15%">削除</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(image, index) in information.images" :key="index">
                  <tr>
                    <td>
                      <v-img :src="imageUrls[index]?.value" max-width="150px" max-height="150px"></v-img>
                    </td>
                    <td>
                      <v-text-field v-model="image.description" variant="underlined"></v-text-field>
                    </td>
                    <td>
                      <v-btn icon color="error" variant="text" @click="deleteImage(image.id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-file-input
              v-model="newImage"
              label="新規画像"
              variant="underlined"
              accept="image/*"
              @change="uploadImage"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="onClickImageClose">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="publishingDialog" width="auto" @click:outside="onClickOutsidePublish">
    <v-card>
      <v-card-title>公開設定</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>あなた以外の方にこのキャラクターを公開しますか？</v-col>
        </v-row>
        <v-row>
          <v-col><v-select v-model="publish" :items="['公開', '非公開']" variant="outlined"></v-select></v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="onClickPublish">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="ruleDialog" width="auto" @click:outside="onClickOutsideRule">
    <v-card>
      <v-card-title>ルール設定</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            >キャラクター作成に使用するルールを選択してください。<br />
            ルールを変更すると、一部の情報がリセットされます。ご注意ください。
          </v-col>
        </v-row>
        <v-row>
          <v-col
            ><v-select v-model="rule" :items="['基本ルール', '現代日本ソースブック']" variant="outlined"></v-select
          ></v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="onClickRule">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-footer app fixed>
    <v-card flat tile width="100%" class="text-center" color="grey-lighten-1">
      <v-card-text>
        <v-row>
          <v-col>
            <v-btn color="primary" prepend-icon="mdi-account-eye" @click="onClickView">閲覧画面</v-btn>
          </v-col>
          <v-col>
            <v-btn color="indigo" prepend-icon="mdi-file-find" @click="() => (publishingDialog = true)">公開設定</v-btn>
          </v-col>
          <v-col>
            <v-btn color="indigo" prepend-icon="mdi-checkbox-multiple-marked" @click="() => (ruleDialog = true)"
              >ルール設定</v-btn
            >
          </v-col>
          <v-col>
            <v-btn color="success" prepend-icon="mdi-content-save" @click="onClickSave">保存</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script setup lang="ts">
  import { firebaseAuth, firebaseDb, firebaseStorage } from "@/firebase/firebase";
  import { CharacterType, characterConverter } from "@/models/character";
  import { useSnackbarStore } from "@/store/snackbar";
  import { collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "@firebase/firestore";
  import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
  import { computed, onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useDisplay } from "vuetify";

  const route = useRoute();
  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();
  const { id } = route.params;
  const { mobile } = useDisplay();
  let documentId = "";

  let information = ref({} as CharacterType);
  let imageUrls = ref([] as Array<{ id: string; value: string }>);
  const imagePage = ref(0);
  const newImage = ref([]);
  const newTag = ref("");
  const publish = ref<"公開" | "非公開">("公開");
  const rule = ref<"基本ルール" | "現代日本ソースブック">("基本ルール");
  const imageDialog = ref(false);
  const publishingDialog = ref(false);
  const ruleDialog = ref(false);

  const uploadImage = async () => {
    const newId = information.value.images.length === 0 ? 1 : information.value.images.slice(-1)[0].id + 1;
    const imageRef = storageRef(firebaseStorage, `characters/${id}-${newId}.png`);
    uploadBytes(imageRef, newImage.value[0])
      .then(() => {
        const imageRef = storageRef(firebaseStorage, `characters/${id}-${newId}.png`);
        getDownloadURL(imageRef).then((downloadUrl) => {
          imageUrls.value.push({ id: `${id}-${newId}`, value: downloadUrl });
          imagePage.value = imageUrls.value.length - 1;
        });
      })
      .then(() => {
        information.value.images.push({ id: newId, description: "" });
        const docRef = doc(collection(firebaseDb, "characters"), `${documentId}`).withConverter(characterConverter);
        updateDoc(docRef, { images: information.value.images });
        newImage.value = [];
      });
  };
  const deleteImage = (imageId: number) => {
    const imageRef = storageRef(firebaseStorage, `characters/${id}-${imageId}.png`);
    deleteObject(imageRef).then(() => {
      imageUrls.value = imageUrls.value.filter((imageUrl) => {
        return imageUrl.id !== `${id}-${imageId}`;
      });
      imagePage.value = Math.max(0, imageUrls.value.length - 1);
      information.value.images = information.value.images.filter((image) => {
        return image.id !== imageId;
      });
      const docRef = doc(collection(firebaseDb, "characters"), `${documentId}`).withConverter(characterConverter);
      updateDoc(docRef, { images: information.value.images });
    });
  };

  const onClickImageClose = () => {
    newImage.value = [];
    imageDialog.value = false;
  };
  const onEnterTag = () => {
    const trimedValue = newTag.value.trim();
    if (trimedValue === "") {
      newTag.value = "";
      return;
    }
    if (information.value.tags.includes(trimedValue)) {
      newTag.value = "";
      return;
    }
    if (information.value.tags.length >= 10) {
      information.value.tags.shift();
    }
    information.value.tags.push(trimedValue);
    newTag.value = "";
  };
  const onClickTagClose = (index: number) => {
    information.value.tags.splice(index, 1);
  };
  const onClickView = () => {
    router.push(`/characters/${id}/view`);
  };
  const onClickPublish = () => {
    information.value.isPublishing = publish.value === "公開";
    publishingDialog.value = false;
  };
  const onClickOutsidePublish = () => {
    publish.value = information.value.isPublishing ? "公開" : "非公開";
  };
  const onClickRule = () => {
    if (information.value.rule === rule.value) {
      ruleDialog.value = false;
      return;
    }
    information.value.rule = rule.value;
    switch (rule.value) {
      case "基本ルール":
        information.value.skills = [
          { name: "敏捷", value: information.value.skills[0].value },
          { name: "筋力", value: information.value.skills[1].value },
          { name: "隠密", value: information.value.skills[2].value },
          { name: "射撃", value: information.value.skills[3].value },
          { name: "白兵", value: information.value.skills[4].value },
          { name: "名声", value: 0 },
          { name: "弁舌", value: information.value.skills[6].value },
          { name: "家格", value: 0 },
          { name: "信用", value: 0 },
        ];
        information.value.specialities = [
          { name: "人類学＆民俗学", value: 0 },
          { name: "考古学＆歴史学", value: 0 },
          { name: "図書館＆古文書学", value: 0 },
          { name: "経済学＆法学", value: 0 },
          { name: "芸術＆工芸", value: 0 },
          { name: "犯罪学", value: information.value.specialities[6].value },
          { name: "医学", value: 0 },
          { name: "機械工学", value: 0 },
          { name: "自然科学", value: 0 },
          { name: "オカルト", value: 0 },
          { name: "心理学", value: 0 },
          { name: "言語学", value: information.value.specialities[3].value },
        ];
        break;
      case "現代日本ソースブック":
        information.value.skills = [
          { name: "敏捷", value: information.value.skills[0].value },
          { name: "筋力", value: information.value.skills[1].value },
          { name: "隠密", value: information.value.skills[2].value },
          { name: "射撃", value: information.value.skills[3].value },
          { name: "白兵", value: information.value.skills[4].value },
          { name: "知名度", value: 0 },
          { name: "弁舌", value: information.value.skills[6].value },
          { name: "資金力", value: 0 },
          { name: "第六感", value: 0 },
        ];
        information.value.specialities = [
          { name: "文化人類学＆考古学", value: 0 },
          { name: "歴史学＆古文書学", value: 0 },
          { name: "民俗学", value: 0 },
          { name: "言語学", value: information.value.specialities[11].value },
          { name: "芸術学", value: 0 },
          { name: "会計学＆法学", value: 0 },
          { name: "犯罪学", value: information.value.specialities[5].value },
          { name: "地球科学", value: 0 },
          { name: "宇宙科学", value: 0 },
          { name: "医学＆獣医学", value: 0 },
          { name: "機械工学＆電子工学", value: 0 },
          { name: "情報工学", value: 0 },
        ];
        break;
    }
    ruleDialog.value = false;
  };
  const onClickOutsideRule = () => {
    rule.value = information.value.rule;
  };
  const onClickSave = () => {
    information.value.updatedAt = serverTimestamp();
    const docRef = doc(collection(firebaseDb, "characters"), documentId).withConverter(characterConverter);
    updateDoc(docRef, { ...information.value }).then(() => {
      showSnackbar("キャラクターを更新しました", "success");
      router.push(`/characters/${id}/view`);
    });
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
        if (character.userId !== firebaseAuth.currentUser?.uid) {
          showSnackbar("自分のキャラクター以外は編集できません", "error");
          router.push(`/characters/${character.id}/view`);
          return;
        }
        information.value = character;
        documentId = querySnapshot.docs[0].id;
        publish.value = character.isPublishing ? "公開" : "非公開";
      })
      .then(() => {
        information.value.images.forEach((image) => {
          const imageRef = storageRef(firebaseStorage, `characters/${id}-${image.id}.png`);
          getDownloadURL(imageRef).then((downloadUrl) => {
            imageUrls.value.push({
              id: `${id}-${image.id}`,
              value: downloadUrl,
            });
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
</script>

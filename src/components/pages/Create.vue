<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-sheet elevation="2" class="pa-6 ma-2">
        <v-row>
          <v-col>
            <v-row>
              <v-carousel hide-delimiters show-arrows="hover">
                <v-carousel-item
                  v-for="imageUrl in imageUrls"
                  :key="imageUrl.id"
                  :src="imageUrl.value"
                ></v-carousel-item>
              </v-carousel>
            </v-row>
            <v-row class="d-flex align-center justify-center">
              <v-btn color="indigo" prepend-icon="mdi-image-edit-outline" @click="() => (imageDialog = true)"
                >画像編集</v-btn
              >
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-col>
                <v-text-field v-model="information.name" variant="outlined" label="名前" clearable></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                ><v-text-field v-model="information.kana" variant="outlined" label="読みがな" clearable></v-text-field
              ></v-col>
            </v-row>
            <v-row>
              <v-col
                ><v-text-field
                  v-model="information.title"
                  variant="outlined"
                  label="称号 / 肩書"
                  clearable
                ></v-text-field
              ></v-col>
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
                <v-text-field v-model="information.profession" variant="outlined" label="職業" clearable></v-text-field>
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
      <v-sheet elevation="2" class="pa-6 ma-2">
        <v-row>
          <v-col>
            <v-row>
              <v-col><div :class="'text-h4'">能力値</div></v-col>
              <v-col
                ><div :class="['text-h6', skillPoints > 13 ? 'text-red' : '']">{{ skillPoints }}/13</div></v-col
              >
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
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
                  <v-col>
                    <div :class="'text-subtitle-1'">{{ skill.name }}</div>
                  </v-col>
                  <v-col>
                    <div :class="'text-subtitle-1'">{{ skill.value }}</div>
                  </v-col>
                  <v-col>
                    <v-rating
                      v-model="skill.value"
                      length="4"
                      density="compact"
                      full-icon="mdi-circle"
                      empty-icon="mdi-circle-outline"
                      color="teal"
                      clearable
                    ></v-rating>
                  </v-col>
                  <v-spacer></v-spacer>
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
                  <v-col>
                    <div :class="'text-subtitle-1'">{{ skill.name }}</div>
                  </v-col>
                  <v-col>
                    <div :class="'text-subtitle-1'">{{ skill.value }}</div>
                  </v-col>
                  <v-col>
                    <v-rating
                      v-model="skill.value"
                      length="4"
                      density="compact"
                      full-icon="mdi-circle"
                      empty-icon="mdi-circle-outline"
                      color="teal"
                      clearable
                    ></v-rating>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet elevation="2" class="pa-6 ma-2">
        <v-row>
          <v-col>
            <v-row>
              <v-col><div :class="'text-h4'">専門分野</div></v-col>
              <v-col
                ><div :class="['text-h6', specialityPoints > 10 ? 'text-red' : '']">
                  {{ specialityPoints }}/10
                </div></v-col
              >
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
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
                  <v-col>
                    <div :class="'text-subtitle-1'">{{ speciality.name }}</div>
                  </v-col>
                  <v-col>
                    <div :class="'text-subtitle-1'">{{ speciality.value }}</div>
                  </v-col>
                  <v-col>
                    <v-rating
                      v-model="speciality.value"
                      length="3"
                      density="compact"
                      full-icon="mdi-circle"
                      empty-icon="mdi-circle-outline"
                      color="indigo"
                      clearable
                    ></v-rating>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col>
            <div v-for="(speciality, index) in information.specialities" :key="speciality.name">
              <div v-if="index >= 6">
                <v-row>
                  <v-col>
                    <div :class="'text-subtitle-1'">{{ speciality.name }}</div>
                  </v-col>
                  <v-col>
                    <div :class="'text-subtitle-1'">{{ speciality.value }}</div>
                  </v-col>
                  <v-col>
                    <v-rating
                      v-model="speciality.value"
                      length="3"
                      density="compact"
                      full-icon="mdi-circle"
                      empty-icon="mdi-circle-outline"
                      color="indigo"
                      clearable
                    ></v-rating>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
      <v-row>
        <v-col>
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col><div :class="'text-h4'">負傷</div></v-col>
                  <v-col
                    ><div :class="'text-h6'">{{ information.damage }}/3</div></v-col
                  >
                  <v-col
                    ><v-rating
                      v-model="information.damage"
                      length="3"
                      density="compact"
                      full-icon="mdi-circle"
                      empty-icon="mdi-circle-outline"
                      color="red"
                      clearable
                    ></v-rating
                  ></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
          <v-sheet elevation="2" class="pa-6 ma-2">
            <v-row>
              <v-col>
                <v-row>
                  <v-col><div :class="'text-h4'">タグ</div></v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="newTag" variant="outlined">
                      <v-chip-group>
                        <div v-for="(tag, index) in information.tags" :key="tag">
                          <v-chip label :ripple="false" closable @click:close="onClickTagClose(index)">{{
                            tag
                          }}</v-chip>
                        </div>
                      </v-chip-group>
                    </v-text-field>
                  </v-col>
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
                <v-textarea v-model="information.memo" variant="outlined" auto-grow counter></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
  <v-dialog v-model="imageDialog" width="40%">
    <v-card>
      <v-card-title>画像編集</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-table>
              <thead>
                <tr>
                  <th>画像</th>
                  <th>説明</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(image, index) in information.images" :key="index">
                  <tr>
                    <td>
                      <v-img :src="imageUrls[index].value" max-height="150"></v-img>
                    </td>
                    <td>
                      <v-text-field v-model="image.description" variant="underlined" clearable></v-text-field>
                    </td>
                    <td>
                      <v-btn color="error" prepend-icon="mdi-delete" variant="outlined" @click="deleteImage(image.id)">
                        削除
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
        <v-btn color="primary" block @click="imageDialog = false">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-footer app fixed>
    <v-card flat tile width="100%" class="text-center">
      <v-card-text>
        <v-row>
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
  import { metadataConverter } from "@/models/metadata";
  import { useSnackbarStore } from "@/store/snackbar";
  import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "@firebase/firestore";
  import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
  import { computed, onMounted, ref, watchEffect } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();
  let documentId = "";
  let characterId = -1;

  let information = ref({} as CharacterType);
  let imageUrls = ref([] as Array<{ id: string; value: string }>);
  const newImage = ref([]);
  const newTag = ref("");
  const imageDialog = ref(false);

  const uploadImage = async () => {
    const newId = information.value.images.length === 0 ? 1 : information.value.images.slice(-1)[0].id + 1;
    const imageRef = storageRef(firebaseStorage, `characters/${characterId}-${newId}.png`);
    uploadBytes(imageRef, newImage.value[0])
      .then(() => {
        const imageRef = storageRef(firebaseStorage, `characters/${characterId}-${newId}.png`);
        getDownloadURL(imageRef).then((downloadUrl) => {
          imageUrls.value.push({ id: `${characterId}-${newId}`, value: downloadUrl });
        });
      })
      .then(() => {
        information.value.images.push({ id: newId, description: "" });
        const docRef = doc(collection(firebaseDb, "characters"), `${documentId}`).withConverter(characterConverter);
        updateDoc(docRef, { images: information.value.images });
      });
  };
  const deleteImage = (imageId: number) => {
    const imageRef = storageRef(firebaseStorage, `characters/${characterId}-${imageId}.png`);
    deleteObject(imageRef).then(() => {
      imageUrls.value = imageUrls.value.filter((imageUrl) => {
        return imageUrl.id !== `${characterId}-${imageId}`;
      });
      information.value.images = information.value.images.filter((image) => {
        return image.id !== imageId;
      });
      const docRef = doc(collection(firebaseDb, "characters"), `${documentId}`).withConverter(characterConverter);
      updateDoc(docRef, { images: information.value.images });
    });
  };

  const onChangeTagValue = () => {
    if (newTag.value.match(/^\s+$/)) {
      newTag.value = "";
      return;
    }
    const found = newTag.value.match(/^(.*)\s+/);
    if (found === null) return;
    information.value.tags.push(found[0].trim());
    newTag.value = "";
  };
  const onClickTagClose = (index: number) => {
    information.value.tags.splice(index, 1);
  };
  const onClickSave = async () => {
    if (skillPoints.value > 13) {
      showSnackbar(`キャラクターを保存できません：能力値が上限を超えています`, "error");
      return;
    }
    if (specialityPoints.value > 10) {
      showSnackbar(`キャラクターを保存できません：専門分野が上限を超えています`, "error");
      return;
    }

    information.value.updatedAt = serverTimestamp();
    const docRef = doc(collection(firebaseDb, "characters"), documentId).withConverter(characterConverter);
    updateDoc(docRef, { ...information.value }).then(() => {
      showSnackbar("キャラクターを作成しました", "success");
      router.push(`/characters/${characterId}/view`);
    });
  };

  onMounted(async () => {
    // character id
    const metadataDocRef = doc(
      collection(firebaseDb, "metadata"),
      import.meta.env.VITE_METADATA_DOCUMENT_ID
    ).withConverter(metadataConverter);
    const metadataDocSnap = await getDoc(metadataDocRef);
    if (metadataDocSnap.exists()) {
      characterId = metadataDocSnap.data().characterId + 1;
      await setDoc(metadataDocRef, { characterId: characterId });
    } else {
      showSnackbar("メタデータの取得に失敗しました。管理者にお問い合わせください", "error");
      return;
    }
    // initialize
    const timeStamp = serverTimestamp();
    information.value.id = characterId;
    information.value.name = "";
    information.value.kana = "";
    information.value.title = "";
    information.value.age = "";
    information.value.gender = "";
    information.value.profession = "";
    information.value.home = "";
    information.value.rank = "";
    information.value.family = "";
    information.value.skills = [
      { name: "敏捷", value: 0 },
      { name: "筋力", value: 0 },
      { name: "隠密", value: 0 },
      { name: "射撃", value: 0 },
      { name: "白兵", value: 0 },
      { name: "名声", value: 0 },
      { name: "弁舌", value: 0 },
      { name: "家格", value: 0 },
      { name: "信用", value: 0 },
    ];
    information.value.specialities = [
      { name: "人類学＆民俗学", value: 0 },
      { name: "考古学＆歴史学", value: 0 },
      { name: "図書館＆古文書学", value: 0 },
      { name: "経済学＆法学", value: 0 },
      { name: "芸術＆工芸", value: 0 },
      { name: "犯罪学", value: 0 },
      { name: "医学", value: 0 },
      { name: "機械工学", value: 0 },
      { name: "自然科学", value: 0 },
      { name: "オカルト", value: 0 },
      { name: "心理学", value: 0 },
      { name: "言語学", value: 0 },
    ];
    information.value.damage = 0;
    information.value.memo = "";
    information.value.tags = [];
    information.value.userId = firebaseAuth.currentUser?.uid ?? "";
    information.value.images = [];
    information.value.isPublishing = true;
    information.value.createdAt = timeStamp;
    information.value.updatedAt = timeStamp;
    console.log(firebaseAuth.currentUser?.uid);
    // document
    const characterDocRef = doc(collection(firebaseDb, "characters")).withConverter(characterConverter);
    setDoc(characterDocRef, { ...information.value }).then(() => {
      documentId = characterDocRef.id;
    });
  });

  watchEffect(() => {
    onChangeTagValue();
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

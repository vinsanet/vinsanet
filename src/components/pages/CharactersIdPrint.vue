<template>
  <v-theme-provider theme="light" with-background>
    <v-container class="d-flex fill-height">
      <v-row class="justify-center">
        <v-col class="align-center">
          <v-card id="sheet" elevation="5">
            <v-row>
              <v-col>
                <v-card variant="outlined">
                  <v-img :src="imageUrl" height="320px"></v-img>
                </v-card>
              </v-col>
              <v-col>
                <v-table style="background-color: transparent" density="comfortable">
                  <tbody>
                    <tr>
                      <th :class="['text-subtitle-1', 'font-weight-bold']">名前</th>
                      <td :class="['text-subtitle-1']">{{ information.name }}</td>
                    </tr>
                    <tr>
                      <th :class="['text-subtitle-1', 'font-weight-bold']">称号 / 肩書</th>
                      <td :class="['text-subtitle-1']">{{ information.title }}</td>
                    </tr>
                    <tr>
                      <th :class="['text-subtitle-1', 'font-weight-bold']">年齢</th>
                      <td :class="['text-subtitle-1']">{{ information.age }}</td>
                    </tr>
                    <tr>
                      <th :class="['text-subtitle-1', 'font-weight-bold']">性別</th>
                      <td :class="['text-subtitle-1']">{{ information.gender }}</td>
                    </tr>
                    <tr>
                      <th :class="['text-subtitle-1', 'font-weight-bold']">職業</th>
                      <td :class="['text-subtitle-1']">{{ information.profession }}</td>
                    </tr>
                    <tr>
                      <th :class="['text-subtitle-1', 'font-weight-bold']">出身</th>
                      <td :class="['text-subtitle-1']">{{ information.home }}</td>
                    </tr>
                    <tr>
                      <th :class="['text-subtitle-1', 'font-weight-bold']">階級</th>
                      <td :class="['text-subtitle-1']">{{ information.rank }}</td>
                    </tr>
                    <tr>
                      <th :class="['text-subtitle-1', 'font-weight-bold']">家柄</th>
                      <td :class="['text-subtitle-1']">{{ information.family }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-row>
                  <v-col>
                    <div :class="['font-weight-bold', 'px-2', 'py-1', 'heading']">アクティブ能力値</div>
                  </v-col>
                </v-row>
                <div v-for="(skill, index) in information.skills" :key="skill.name">
                  <div v-if="index <= 4">
                    <v-row class="px-2">
                      <v-col>
                        <div :class="'text-subtitle-1'">{{ skill.name }}</div>
                      </v-col>
                      <v-col class="d-flex justify-end">
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
              <v-col>
                <v-row>
                  <v-col>
                    <div :class="['font-weight-bold', 'px-2', 'py-1', 'heading']">パッシブ能力値</div>
                  </v-col>
                </v-row>
                <div v-for="(skill, index) in information.skills" :key="skill.name">
                  <div v-if="index >= 5">
                    <v-row class="px-2">
                      <v-col>
                        <div :class="'text-subtitle-1'">{{ skill.name }}</div>
                      </v-col>
                      <v-col class="d-flex justify-end">
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
            <v-row>
              <v-col>
                <div :class="['font-weight-bold', 'px-2', 'py-1', 'heading']">専門分野</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div v-for="(speciality, index) in information.specialities" :key="speciality.name">
                  <div v-if="index <= 5">
                    <v-row class="px-2">
                      <v-col>
                        <div :class="'text-subtitle-1'">{{ speciality.name }}</div>
                      </v-col>
                      <v-col class="d-flex justify-end">
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
              <v-col>
                <div v-for="(speciality, index) in information.specialities" :key="speciality.name">
                  <div v-if="index >= 6">
                    <v-row class="px-2">
                      <v-col>
                        <div :class="'text-subtitle-1'">{{ speciality.name }}</div>
                      </v-col>
                      <v-col class="d-flex justify-end">
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
            <v-row>
              <v-col>
                <v-row>
                  <v-col>
                    <div :class="['font-weight-bold', 'px-2', 'py-1', 'heading']">負傷</div>
                  </v-col>
                </v-row>
                <v-row class="px-2">
                  <v-col class="d-flex justify-end">
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
              <v-col>
                <v-textarea no-resize variant="outlined" hide-details label="メモ" rows="4"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col><span class="text-caption">vinsanet - https://vinsanet.com</span></v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script setup lang="ts">
  import { firebaseAuth, firebaseDb, firebaseStorage } from "@/firebase/firebase";
  import { CharacterType, characterConverter } from "@/models/character";
  import { useSnackbarStore } from "@/store/snackbar";
  import { collection, getDocs, query, where } from "@firebase/firestore";
  import { getDownloadURL, ref as storageRef } from "firebase/storage";
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const { showSnackbar } = useSnackbarStore();
  const { id } = route.params;

  const information = ref({} as CharacterType);
  const imageUrl = ref("");
  const canShowRemarks = ref([] as Array<boolean>);
  const remarksAnswerErrorMessages = ref([] as Array<string>);

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
        if (information.value.images.length === 0) return;
        const image = information.value.images[0];
        const imageRef = storageRef(firebaseStorage, `characters/${image.id}.${image.extension}`);
        getDownloadURL(imageRef).then((downloadUrl) => {
          imageUrl.value = downloadUrl;
        });
      });
  });
</script>

<style scoped>
  #sheet {
    width: 210mm;
    height: 297mm;
    margin: auto;
    padding: 3rem;
  }

  @media print {
    @page {
      size: A4 portrait;
    }
    #sheet {
      position: fixed;
      inset: 0;
    }
  }

  .heading {
    color: white;
    background-color: black;
  }
</style>

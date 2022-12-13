<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
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
                      readonly
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
                      readonly
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
                      readonly
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
                      readonly
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
                      readonly
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
  <v-footer app fixed>
    <v-card flat tile width="100%" class="text-center">
      <v-card-text>
        <v-row>
          <v-col>
            <v-btn color="primary" prepend-icon="mdi-account-edit" @click="onClickEdit">編集画面</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script setup lang="ts">
  import { firebaseDb, firebaseStorage } from "@/firebase/firebase";
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

  const onClickEdit = () => {
    router.push(`/characters/${id}/edit`);
  };

  onMounted(() => {
    const q = query(collection(firebaseDb, "characters"), where("id", "==", parseInt(id as string))).withConverter(
      characterConverter
    );
    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const character = querySnapshot.docs[0].data();
          information.value = character;
        } else {
          showSnackbar("キャラクターが存在しません", "error");
        }
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
</script>

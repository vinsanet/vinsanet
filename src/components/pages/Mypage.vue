<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-row>
        <v-col>
          <v-expansion-panels>
            <v-expansion-panel elevation="0" bg-color="background" style="border: thin solid">
              <v-expansion-panel-title>表示設定</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row class="align-center">
                  <v-col :cols="xs ? '12' : '6'">
                    <v-text-field
                      v-model="searchText"
                      variant="underlined"
                      prepend-icon="mdi-account-search"
                      placeholder="検索"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex justify-end" :cols="xs ? '12' : '6'">
                    <v-btn-group divided variant="flat" density="comfortable">
                      <v-btn color="secondary" prepend-icon="mdi-swap-vertical" class="mr-2">
                        {{ displayOrder }}
                        <v-menu activator="parent" :close-on-content-click="false">
                          <v-card class="pa-2 pr-6">
                            <v-radio-group v-model="displayOrder" hide-details>
                              <v-radio label="更新順" value="更新順"></v-radio>
                              <v-radio label="作成順" value="作成順"></v-radio>
                              <v-radio label="名前順" value="名前順"></v-radio>
                            </v-radio-group>
                          </v-card>
                        </v-menu>
                      </v-btn>
                      <v-btn color="secondary" prepend-icon="mdi-filter">
                        {{ displayFilter }}
                        <v-menu activator="parent" :close-on-content-click="false">
                          <v-card class="pa-2 pr-6">
                            <v-radio-group v-model="displayFilter" hide-details>
                              <v-radio label="全て表示" value="全て表示"></v-radio>
                              <v-radio label="ロスト以外" value="ロスト以外"></v-radio>
                              <v-radio label="ロストのみ" value="ロストのみ"></v-radio>
                            </v-radio-group>
                          </v-card>
                        </v-menu>
                      </v-btn>
                    </v-btn-group>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card variant="outlined" class="pa-2">
            <div v-if="characterInformations.length === 0">
              <v-card-text color="background">
                キャラクターをまだ作成していません。「新規作成」よりキャラクターを作成できます。
              </v-card-text>
            </div>
            <div v-else-if="shapedCharacterInformations.length === 0">
              <v-card-text color="background">条件に一致するキャラクターが存在しません。</v-card-text>
            </div>
            <div v-else>
              <v-card-text class="pa-0">
                <v-list lines="one" bg-color="background" class="pa-0">
                  <div v-for="(character, index) in shapedCharacterInformations" :key="character.id" :index="index">
                    <v-list-item :key="character.id" class="my-2">
                      <template #prepend>
                        <v-avatar>
                          <v-img
                            :src="character.avatar"
                            style="cursor: pointer"
                            @click.stop="onClickView(character.id)"
                          ></v-img>
                        </v-avatar>
                      </template>
                      <v-list-item-title>
                        <span style="cursor: pointer" class="d-inline-block" @click.stop="onClickView(character.id)">
                          <span class="mr-4">
                            {{ character.name }}
                          </span>
                          <v-chip
                            v-if="!character.isPublishing && smAndUp"
                            label
                            size="x-small"
                            class="mr-2"
                            color="secondary"
                          >
                            非公開
                          </v-chip>
                          <v-chip v-if="character.isLost && smAndUp" label size="x-small" color="error">ロスト</v-chip>
                        </span>
                      </v-list-item-title>
                      <v-chip-group v-if="character.tags.length > 0" :disabled="true" class="mr-2">
                        <div v-for="tag in character.tags" :key="tag" :index="index">
                          <v-chip label :ripple="false" size="small">{{ tag }}</v-chip>
                        </div>
                      </v-chip-group>
                      <v-list-item-subtitle>
                        更新：{{ character.updatedAt.toDate().toLocaleString() }}
                      </v-list-item-subtitle>
                      <template #append>
                        <v-row v-if="smAndUp">
                          <v-col>
                            <v-btn-group divided variant="flat" density="comfortable">
                              <v-btn
                                color="primary"
                                prepend-icon="mdi-eye"
                                variant="flat"
                                class="mr-2"
                                @click.stop="onClickView(character.id)"
                              >
                                閲覧
                              </v-btn>
                              <v-btn
                                color="primary"
                                prepend-icon="mdi-pencil"
                                variant="flat"
                                class="mr-2"
                                @click.stop="onClickEdit(character.id)"
                              >
                                編集
                              </v-btn>
                              <v-btn
                                color="error"
                                prepend-icon="mdi-delete"
                                variant="flat"
                                @click.stop="onClickDelete(character.id)"
                              >
                                削除
                              </v-btn>
                            </v-btn-group>
                          </v-col>
                        </v-row>
                        <v-row v-if="xs">
                          <v-btn icon variant="plain">
                            <v-icon>mdi-dots-vertical</v-icon>
                            <v-menu activator="parent">
                              <v-list>
                                <v-list-item @click.stop="onClickView(character.id)">
                                  <v-icon>mdi-eye</v-icon> 閲覧
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item @click.stop="onClickEdit(character.id)">
                                  <v-icon>mdi-pencil</v-icon> 編集
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-divider></v-divider>
                                <v-list-item class="text-error" @click.stop="onClickDelete(character.id)">
                                  <v-icon>mdi-delete</v-icon> 削除
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </v-btn>
                        </v-row>
                      </template>
                    </v-list-item>
                    <v-divider v-if="index !== shapedCharacterInformations.length - 1"></v-divider>
                  </div>
                </v-list>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
  <v-dialog v-model="deleteDialog" width="auto">
    <v-card>
      <v-card-title>キャラクター削除</v-card-title>
      <v-card-text>
        <div>
          <span class="text-decoration-underline">{{ deleteCharacter.name }}</span>
          を削除しようとしています。
        </div>
        <div>一度削除すると、元に戻すことはできません。本当に削除しますか？</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="deleteDialog = false">キャンセル</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click.stop="onClickDeleteExecute">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { firebaseAuth, firebaseDb, firebaseStorage } from "@/firebase/firebase";
  import { CharacterType, characterConverter } from "@/models/character";
  import { useSnackbarStore } from "@/store/snackbar";
  import { Timestamp, collection, deleteDoc, doc, getDocs, query, where } from "@firebase/firestore";
  import { deleteObject, getDownloadURL } from "@firebase/storage";
  import { ref as storageRef } from "firebase/storage";
  import { computed, onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useDisplay } from "vuetify";

  type CharacterInformation = {
    name: string;
    kana: string;
    id: string;
    tags: Array<string>;
    isLost: boolean;
    avatar: string;
    images: Array<{ id: string; extension: string; description: string }>;
    isPublishing: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  };
  type DisplayOrder = "更新順" | "作成順" | "名前順";
  type DisplayFilter = "全て表示" | "ロスト以外" | "ロストのみ";

  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();
  const { xs, smAndUp } = useDisplay();

  const characterInformations = ref([] as Array<CharacterInformation>);
  const searchText = ref("");
  const deleteDialog = ref(false);
  const displayOrder = ref<DisplayOrder>("更新順");
  const displayFilter = ref<DisplayFilter>("全て表示");
  let deleteCharacter = {} as CharacterInformation;

  firebaseAuth.onAuthStateChanged((user) => {
    if (!user) {
      showSnackbar("ログインしてください", "error");
      router.push("/login");
      return;
    }
    const characterData = [] as Array<CharacterType>;
    const uid = user.uid;
    const q = query(collection(firebaseDb, "characters"), where("userId", "==", uid)).withConverter(characterConverter);
    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) return;
        querySnapshot.docs.forEach((doc) => {
          characterData.push(doc.data());
        });
      })
      .then(() => {
        characterData
          .sort((x, y) => {
            return x.updatedAt < y.updatedAt ? 1 : -1;
          })
          .forEach(async (character) => {
            const characterInformation = {} as CharacterInformation;
            characterInformation.id = character.id;
            characterInformation.name = character.name !== "" ? character.name : "（新規キャラクター）";
            characterInformation.kana = character.kana;
            characterInformation.tags = character.tags;
            characterInformation.isLost = character.isLost;
            characterInformation.images = character.images;
            characterInformation.isPublishing = character.isPublishing;
            characterInformation.createdAt = character.createdAt as Timestamp;
            characterInformation.updatedAt = character.updatedAt as Timestamp;
            const imagePath =
              character.images.length !== 0
                ? `characters/${character.images[0].id}.${character.images[0].extension}`
                : "characters/undefined.png";
            const imageRef = storageRef(firebaseStorage, imagePath);
            await getDownloadURL(imageRef)
              .then((downloadUrl) => {
                characterInformation.avatar = downloadUrl;
              })
              .catch(() => {
                characterInformation.avatar = "";
              });
            characterInformations.value.push(characterInformation);
          });
      });
  });
  onMounted(() => {
    document.title = "キャラクター一覧 | vinsanet";
  });

  const onClickView = (id: string) => {
    router.push(`/characters/${id}/view`);
    return;
  };
  const onClickEdit = (id: string) => {
    router.push(`/characters/${id}/edit`);
    return;
  };
  const onClickDelete = (id: string) => {
    deleteDialog.value = true;
    const selectedCharacter = characterInformations.value.find((characterInformation) => {
      return characterInformation.id === id;
    });
    if (selectedCharacter !== undefined) {
      deleteCharacter = { ...selectedCharacter };
    }
    return;
  };
  const onClickDeleteExecute = () => {
    // document
    {
      const q = query(collection(firebaseDb, "characters"), where("id", "==", deleteCharacter.id)).withConverter(
        characterConverter
      );
      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.empty) return;
        deleteDoc(doc(firebaseDb, "characters", querySnapshot.docs[0].id));
      });
    }
    // storage
    {
      deleteCharacter.images.forEach((image) => {
        const imageRef = storageRef(firebaseStorage, `characters/${image.id}.${image.extension}`);
        deleteObject(imageRef);
      });
    }
    // information
    {
      characterInformations.value = characterInformations.value.filter((element) => {
        return element.id !== deleteCharacter.id;
      });
    }
    deleteDialog.value = false;
    showSnackbar("キャラクターを削除しました", "success");
  };

  const shapedCharacterInformations = computed(() => {
    let returnInformations = characterInformations.value;
    if (searchText.value !== "") {
      returnInformations = returnInformations.filter((information) => {
        return (
          information.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
          information.kana.includes(searchText.value) ||
          information.tags.filter((tag) => {
            return tag.includes(searchText.value);
          }).length > 0
        );
      });
    }
    switch (displayFilter.value) {
      case "全て表示":
        break;
      case "ロスト以外":
        returnInformations = returnInformations.filter((information) => {
          return !information.isLost;
        });
        break;
      case "ロストのみ":
        returnInformations = returnInformations.filter((information) => {
          return information.isLost;
        });
        break;
    }
    switch (displayOrder.value) {
      case "更新順":
        returnInformations.sort((a, b) => {
          return a.updatedAt < b.updatedAt ? 1 : -1;
        });
        break;
      case "作成順":
        returnInformations.sort((a, b) => {
          return a.createdAt > b.createdAt ? 1 : -1;
        });
        break;
      case "名前順":
        returnInformations.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
        break;
    }
    return returnInformations;
  });
</script>

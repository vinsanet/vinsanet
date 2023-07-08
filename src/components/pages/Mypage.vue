<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-row>
        <v-col>
          <v-btn color="primary" variant="outlined" prepend-icon="mdi-swap-vertical">
            表示順：{{ displayOrder }}
            <v-menu activator="parent" :close-on-content-click="false">
              <v-card>
                <v-radio-group v-model="displayOrder" hide-details>
                  <v-radio label="更新順" value="更新順"></v-radio>
                  <v-radio label="作成順" value="作成順"></v-radio>
                  <v-radio label="名前順" value="名前順"></v-radio>
                </v-radio-group>
              </v-card>
            </v-menu>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="m-auto">
            <div v-if="characterInformations.length === 0">
              <v-card-text
                >キャラクターをまだ作成していません。「新規作成」よりキャラクターを作成できます。</v-card-text
              >
            </div>
            <div v-else>
              <v-card-text>
                <v-list lines="one">
                  <div v-for="(character, index) in sortedCharacterInformations" :key="character.id" :index="index">
                    <v-list-item :key="character.id" :prepend-avatar="character.avatar">
                      <v-list-item-title>
                        {{ character.name }}
                        <v-chip
                          v-if="!character.isPublishing"
                          label
                          variant="outlined"
                          size="x-small"
                          prepend-icon="mdi-eye-off"
                        >
                          非公開
                        </v-chip>
                      </v-list-item-title>
                      <v-chip-group v-if="smAndUp" :disabled="true" column>
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
                            <v-btn color="primary" prepend-icon="mdi-account-eye" @click="onClickView(character.id)">
                              閲覧
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn color="primary" prepend-icon="mdi-account-edit" @click="onClickEdit(character.id)">
                              編集
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              color="error"
                              prepend-icon="mdi-delete"
                              variant="outlined"
                              @click="onClickDelete(character.id)"
                            >
                              削除
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-row v-if="xs">
                          <v-btn icon variant="plain">
                            <v-icon>mdi-dots-vertical</v-icon>
                            <v-menu activator="parent">
                              <v-list>
                                <v-list-item title="閲覧" @click="onClickView(character.id)"></v-list-item>
                                <v-list-item title="編集" @click="onClickEdit(character.id)"></v-list-item>
                                <v-divider></v-divider>
                                <v-list-item
                                  title="削除"
                                  class="text-error"
                                  @click="onClickDelete(character.id)"
                                ></v-list-item>
                              </v-list>
                            </v-menu>
                          </v-btn>
                        </v-row>
                      </template>
                    </v-list-item>
                    <v-divider v-if="index !== characterInformations.length - 1"></v-divider>
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
        <v-btn color="primary" @click="deleteDialog = false"> キャンセル </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="onClickDeleteExecute">OK</v-btn>
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
  import { computed, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useDisplay } from "vuetify";

  type CharacterInformation = {
    name: string;
    id: string;
    tags: Array<string>;
    avatar: string;
    images: Array<{ id: number; description: string }>;
    isPublishing: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  };
  type DisplayOrder = "更新順" | "作成順" | "名前順";

  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();
  const { xs, smAndUp } = useDisplay();

  const characterInformations = ref([] as Array<CharacterInformation>);
  const deleteDialog = ref(false);
  const displayOrder = ref<DisplayOrder>("更新順");
  let deleteCharacter = {} as CharacterInformation;

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
        const imageRef = storageRef(firebaseStorage, `characters/${deleteCharacter.id}-${image.id}.png`);
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
            characterInformation.tags = character.tags;
            characterInformation.images = character.images;
            characterInformation.isPublishing = character.isPublishing;
            characterInformation.createdAt = character.createdAt as Timestamp;
            characterInformation.updatedAt = character.updatedAt as Timestamp;
            const imagePath =
              character.images.length !== 0
                ? `characters/${character.id}-${character.images[0].id}.png`
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

  const sortedCharacterInformations = computed(() => {
    const returnInformations = characterInformations.value;
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

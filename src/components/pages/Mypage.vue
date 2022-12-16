<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-card class="m-auto">
        <div v-if="characterInformations.length === 0">
          <v-card-text>キャラクターをまだ作成していません。「新規作成」よりキャラクターを作成できます。</v-card-text>
        </div>
        <div v-else>
          <v-card-text>
            <v-list lines="one">
              <div v-for="(character, index) in characterInformations" :key="character.id" :index="index">
                <v-list-item :key="character.id" :prepend-avatar="character.avatar">
                  <v-list-item-title>
                    {{ character.name }}
                    <v-chip
                      v-if="!character.isPublishing"
                      label
                      variant="outlined"
                      :ripple="false"
                      size="x-small"
                      prepend-icon="mdi-eye-off"
                    >
                      非公開
                    </v-chip>
                  </v-list-item-title>
                  <v-chip-group :disabled="true">
                    <div v-for="tag in character.tags" :key="tag" :index="index">
                      <v-chip label :ripple="false">{{ tag }}</v-chip>
                    </div>
                  </v-chip-group>
                  <template #append>
                    <v-row>
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
                  </template>
                </v-list-item>
                <v-divider v-if="index !== characterInformations.length - 1"></v-divider>
              </div>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
    </v-responsive>
  </v-container>
  <v-dialog v-model="deleteDialog" width="30%">
    <v-card>
      <v-card-title>キャラクター削除</v-card-title>
      <v-card-text>
        {{ deleteCharacter.name !== "" ? `キャラクター名：${deleteCharacter.name}` : "" }}<br />
        一度削除すると元に戻すことはできません。本当に削除しますか？
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
  import { collection, deleteDoc, doc, getDocs, query, where } from "@firebase/firestore";
  import { deleteObject, getDownloadURL } from "@firebase/storage";
  import { ref as storageRef } from "firebase/storage";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  type CharacterInformation = {
    name: string;
    id: number;
    tags: Array<string>;
    avatar: string;
    images: Array<{ id: number; description: string }>;
    isPublishing: boolean;
  };

  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();

  const characterInformations = ref([] as Array<CharacterInformation>);
  const deleteDialog = ref(false);
  let deleteCharacter = {} as CharacterInformation;

  const onClickView = (id: number) => {
    router.push(`/characters/${id}/view`);
    return;
  };
  const onClickEdit = (id: number) => {
    router.push(`/characters/${id}/edit`);
    return;
  };
  const onClickDelete = (id: number) => {
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
            if (character.images.length !== 0) {
              const imageRef = storageRef(firebaseStorage, `characters/${character.id}-${character.images[0].id}.png`);
              await getDownloadURL(imageRef).then((downloadUrl) => {
                characterInformation.avatar = downloadUrl;
              });
            } else {
              const imageRef = storageRef(firebaseStorage, "characters/undefined.png");
              await getDownloadURL(imageRef).then((downloadUrl) => {
                characterInformation.avatar = downloadUrl;
              });
            }
            characterInformations.value.push(characterInformation);
          });
      });
  });
</script>

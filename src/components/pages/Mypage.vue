<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-card class="m-auto">
        <v-list lines="one">
          <div
            v-for="(character, index) in characterInformations"
            :key="character.id"
            :index="index"
          >
            <v-list-item
              :key="character.id"
              :title="character.name"
              :prepend-avatar="character.avatar"
            >
              <v-chip-group :disabled="true">
                <div v-for="tag in character.tags" :key="tag" :index="index">
                  <v-chip label :ripple="false">{{ tag }}</v-chip>
                </div>
              </v-chip-group>
              <template #append>
                <v-row>
                  <v-col>
                    <v-btn
                      color="primary"
                      prepend-icon="mdi-account-eye"
                      @click="onClickView(character.id)"
                    >
                      閲覧
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="primary"
                      prepend-icon="mdi-account-edit"
                      @click="onClickEdit(character.id)"
                    >
                      編集
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="error"
                      prepend-icon="mdi-delete"
                      variant="outlined"
                    >
                      削除
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-list-item>
            <v-divider
              v-if="index !== characterInformations.length - 1"
            ></v-divider>
          </div>
        </v-list>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import {
    firebaseAuth,
    firebaseDb,
    firebaseStorage,
  } from "@/firebase/firebase";
  import { CharacterType, characterConverter } from "@/models/character";
  import { collection, getDocs, query, where } from "@firebase/firestore";
  import { getDownloadURL } from "@firebase/storage";
  import { ref as storageRef } from "firebase/storage";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  type CharacterInformation = {
    name: string;
    id: number;
    tags: Array<string>;
    avatar: string;
  };

  const router = useRouter();

  const characterData = [] as Array<CharacterType>;
  const characterInformations = ref([] as Array<CharacterInformation>);

  const onClickView = (id: number) => {
    router.push(`/characters/${id}/view`);
    return;
  };
  const onClickEdit = (id: number) => {
    router.push(`/characters/${id}/edit`);
    return;
  };

  firebaseAuth.onAuthStateChanged((user) => {
    if (!user) return;
    const uid = user.uid;
    const q = query(
      collection(firebaseDb, "characters"),
      where("userId", "==", uid)
    ).withConverter(characterConverter);
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
            return x.updated.seconds - y.updated.seconds;
          })
          .forEach((character) => {
            if (character.imageNumber === 0) return;
            const imageRef = storageRef(
              firebaseStorage,
              `characters/${character.id}-1.png`
            );
            getDownloadURL(imageRef).then((downloadUrl) => {
              const characterInformation = {} as CharacterInformation;
              characterInformation.id = character.id;
              characterInformation.name = character.name;
              characterInformation.avatar = downloadUrl;
              characterInformation.tags = character.tags;
              characterInformations.value.push(characterInformation);
            });
          });
      });
  });
</script>

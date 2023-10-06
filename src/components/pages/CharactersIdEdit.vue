<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
      <v-row>
        <v-col>
          <v-card variant="outlined" class="pa-6 ma-2">
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
                    <v-btn
                      color="secondary"
                      variant="flat"
                      prepend-icon="mdi-image-edit"
                      @click.stop="() => (imageDialog = true)"
                    >
                      画像追加・削除
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
                      <v-col cols="4">{{ skill.name }}</v-col>
                      <v-col cols="2">{{ skill.value }}</v-col>
                      <v-col>
                        <v-rating
                          v-model="skill.value"
                          length="4"
                          density="compact"
                          full-icon="mdi-circle"
                          empty-icon="mdi-circle-outline"
                          color="skill"
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
                          color="skill"
                          clearable
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
                          color="speciality"
                          clearable
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
                      clearable
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
                    <v-chip-group column>
                      <div v-for="(tag, index) in information.tags" :key="tag">
                        <v-chip label :ripple="false" closable @click:close="onClickTagClose(index)">
                          {{ tag }}
                        </v-chip>
                      </div>
                    </v-chip-group>
                    <v-text-field
                      v-model="newTag"
                      variant="outlined"
                      hide-details="auto"
                      :error-messages="tagErrorMessages"
                      @keyup.enter="onEnterTag()"
                    ></v-text-field>
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
                      <v-row>
                        <v-col>
                          <v-textarea v-model="remark.body" variant="outlined" counter hide-details></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-btn
                            color="secondary"
                            variant="flat"
                            prepend-icon="mdi-note-edit"
                            class="mr-2"
                            @click.stop="onClickRemarksSetting(index)"
                          >
                            設定
                          </v-btn>
                          <v-btn
                            color="error"
                            variant="flat"
                            :disabled="information.remarks.length === 1"
                            prepend-icon="mdi-note-remove"
                            @click.stop="onClickRemarksDelete(index)"
                          >
                            削除
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn color="secondary" variant="flat" prepend-icon="mdi-note-plus" @click.stop="onClickRemarksAdd">
                  追加
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
  <v-overlay v-model="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64" width="6"></v-progress-circular>
  </v-overlay>
  <v-dialog v-model="imageDialog" width="500px" max-width="90%" @click:outside="onClickImageClose">
    <v-card>
      <v-card-title>画像追加・削除</v-card-title>
      <v-card-subtitle>複数の画像を登録できます（10枚まで・各10MBまで）</v-card-subtitle>
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
                      <v-btn icon color="error" variant="text" @click.stop="deleteImage(image.id, image.extension)">
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
        <v-row v-if="mobile">
          <v-col>
            <v-btn
              color="primary"
              variant="outlined"
              width="100%"
              prepend-icon="mdi-image-plus"
              :disabled="information.images.length >= 10"
              @click.stop="onClickImageAdd"
            >
              画像追加
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="!mobile">
          <v-card
            width="100%"
            :color="imageDragging ? 'primary' : ''"
            class="ma-2"
            variant="tonal"
            style="user-select: none"
            :disabled="information.images.length >= 10"
            @drop.prevent="onDropImage"
            @dragover.prevent="imageDragging = true"
            @dragenter.prevent="imageDragging = true"
            @dragleave.prevent="imageDragging = false"
            @click.prevent="onClickImageAdd"
          >
            <v-card-text v-if="!imageDragging">
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">
                  <v-icon size="10vh">mdi-image-plus</v-icon>
                </v-col>
              </v-row>
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">ここに画像をドラッグするか、</v-col>
              </v-row>
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">クリックして画像をアップロード</v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="imageDragging">
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">
                  <v-icon size="10vh">mdi-image-plus</v-icon>
                </v-col>
              </v-row>
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">ここに画像をドロップして</v-col>
              </v-row>
              <v-row cclass="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">アップロード</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-row>
        <v-row class="d-none">
          <v-col>
            <v-file-input
              id="image-input"
              v-model="newImage"
              variant="underlined"
              accept="image/*"
              @change="uploadImage"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click.stop="onClickImageClose">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="remarkSettingDialog" width="500px" max-width="90%">
    <v-card>
      <v-card-title>メモ設定</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field v-model="newRemark.title" variant="outlined" label="タイトル" hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="newRemark.publicity"
              :items="['全体公開', '限定公開', '非公開']"
              label="公開設定"
              variant="outlined"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <div v-if="newRemark.publicity === '限定公開'">
          <v-row>
            <v-col>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="newRemark.question"
                variant="outlined"
                label="質問"
                hide-details="auto"
                :rules="[
                (value: string) => {
                  return !!value || '質問を入力してください';
                },
              ]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="newRemark.answer"
                variant="outlined"
                label="答え"
                hide-details="auto"
                :rules="[
                (value: string) => {
                  return !!value || '答えを入力してください';
                },
              ]"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click.stop="onClickRemarkSetting">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="remarkDeleteDialog" width="500px" max-width="90%">
    <v-card>
      <v-card-title>メモ削除</v-card-title>
      <v-card-text>
        <span class="text-decoration-underline">{{ information.remarks[deleteRemarkIndex]?.title ?? "" }}</span>
        を削除しようとしています。 本当に削除しますか？
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="remarkDeleteDialog = false">キャンセル</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click.stop="onClickRemarkDelete">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="sheetSettingsDialog" width="auto" @click:outside="onClickOutsideSheetSettings">
    <v-card>
      <v-card-title>キャラクターシート設定</v-card-title>
      <v-card-subtitle>ルール設定</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col>
            <span class="text-decoration-underline">ルールを変更すると、一部の情報がリセットされます。</span>
            ご注意ください。
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select v-model="rule" :items="['基本ルール', '現代日本ソースブック']" variant="outlined"></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-subtitle>公開設定</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col>このキャラクターをあなた以外の方に公開しますか？</v-col>
        </v-row>
        <v-row>
          <v-col><v-select v-model="publish" :items="['公開', '非公開']" variant="outlined"></v-select></v-col>
        </v-row>
      </v-card-text>
      <v-card-subtitle>ロスト設定</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col>
            このキャラクターにロストフラグを設定しますか？
            <v-checkbox v-model="isLost" label="設定する"></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click.stop="onClickSheetSettings">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="uploadDialog" width="auto">
    <v-card>
      <v-card-title>アップロード</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>出力済みのファイルをアップロードし、現在のキャラクターに反映させることができます。</v-col>
        </v-row>
        <v-row v-if="mobile">
          <v-col>
            <v-btn
              color="primary"
              variant="outlined"
              width="100%"
              prepend-icon="mdi-file-account"
              @click.stop="onClickFileUpload"
            >
              ファイル選択
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="!mobile">
          <v-card
            width="100%"
            :color="fileDragging ? 'primary' : ''"
            class="ma-2"
            variant="tonal"
            style="user-select: none"
            @drop.prevent="onDropFile"
            @dragover.prevent="fileDragging = true"
            @dragenter.prevent="fileDragging = true"
            @dragleave.prevent="fileDragging = false"
            @click.prevent="onClickFileUpload"
          >
            <v-card-text v-if="!fileDragging">
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">
                  <v-icon size="10vh">mdi-file-account</v-icon>
                </v-col>
              </v-row>
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">ここにファイルをドラッグするか、</v-col>
              </v-row>
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">クリックしてファイルをアップロード</v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="fileDragging">
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">
                  <v-icon size="10vh">mdi-file-account</v-icon>
                </v-col>
              </v-row>
              <v-row class="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">ここにファイルをドロップして</v-col>
              </v-row>
              <v-row cclass="d-flex flex-column" justify="center" dense>
                <v-col class="text-center">アップロード</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-row>
        <v-row class="d-none">
          <v-col>
            <v-file-input
              id="file-input"
              v-model="newFile"
              variant="underlined"
              accept="application/json"
              @change="uploadFile"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click.stop="() => (uploadDialog = false)">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="unsavedDialog" width="auto">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>未保存の変更があります。閲覧画面に移動しますか？</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="unsavedDialog = false">キャンセル</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click.stop="onClickView(true)">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-footer v-if="smAndUp" app fixed color="background">
    <v-card flat tile width="100%" class="text-center" color="grey">
      <v-card-text>
        <v-row>
          <v-col>
            <v-btn color="primary" variant="flat" prepend-icon="mdi-account-eye" @click.stop="onClickView(false)"
              >閲覧画面</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              color="secondary"
              variant="flat"
              prepend-icon="mdi-cog"
              @click.stop="() => (sheetSettingsDialog = true)"
            >
              キャラシ設定
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="secondary" variant="flat" prepend-icon="mdi-upload" @click.stop="() => (uploadDialog = true)"
              >アップロード
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="success" variant="flat" prepend-icon="mdi-content-save" @click.stop="onClickSave">保存</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
  <v-layout-item v-if="xs" class="text-end" model-value position="bottom" size="80">
    <v-btn class="ma-4 text-white" color="primary" icon>
      <v-icon>mdi-dots-vertical</v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item @click.stop="onClickView(false)"><v-icon>mdi-account-eye</v-icon> 閲覧画面 </v-list-item>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-list-item @click.stop="() => (sheetSettingsDialog = true)">
            <v-icon>mdi-cog</v-icon> キャラシ設定
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click.stop="() => (uploadDialog = true)"><v-icon>mdi-upload</v-icon> アップロード </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click.stop="onClickSave"><v-icon>mdi-content-save</v-icon> 保存</v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-layout-item>
</template>

<script setup lang="ts">
  import { firebaseAuth, firebaseDb, firebaseStorage } from "@/firebase/firebase";
  import { CharacterType, characterConverter } from "@/models/character";
  import { useSnackbarStore } from "@/store/snackbar";
  import { collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "@firebase/firestore";
  import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
  import { nanoid } from "nanoid";
  import { computed, onMounted, ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useDisplay } from "vuetify";

  const route = useRoute();
  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();
  const { id } = route.params;
  const { mobile, xs, smAndUp } = useDisplay();
  let documentId = "";
  let isDirty = false;
  let deleteRemarkIndex = -1;

  let information = ref({} as CharacterType);
  let imageUrls = ref([] as Array<{ id: string; value: string }>);
  const overlay = ref(false);
  const imagePage = ref(0);
  const imageDragging = ref(false);
  const fileDragging = ref(false);
  const newImage = ref([]);
  const newFile = ref([]);
  const newTag = ref("");
  const tagErrorMessages = ref("");
  const newRemark = ref(
    {} as {
      title: string;
      body: string;
      question: string;
      answer: string;
      publicity: "全体公開" | "限定公開" | "非公開";
      index: number;
    }
  );
  const publish = ref<"公開" | "非公開">("公開");
  const isLost = ref(false);
  const rule = ref<"基本ルール" | "現代日本ソースブック">("基本ルール");
  const imageDialog = ref(false);
  const openedRemarks = ref([0] as Array<number>);
  const remarkSettingDialog = ref(false);
  const remarkDeleteDialog = ref(false);
  const sheetSettingsDialog = ref(false);
  const uploadDialog = ref(false);
  const unsavedDialog = ref(false);

  const uploadImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const fileName = (target.files as FileList)[0].name;
    const fileExtension = fileName.match(/[^.]+$/)?.[0] ?? "png";
    const newId = nanoid();
    const imageRef = storageRef(firebaseStorage, `characters/${newId}.${fileExtension}`);
    uploadBytes(imageRef, newImage.value[0])
      .then(() => {
        const imageRef = storageRef(firebaseStorage, `characters/${newId}.${fileExtension}`);
        getDownloadURL(imageRef).then((downloadUrl) => {
          imageUrls.value.push({ id: `${newId}`, value: downloadUrl });
          imagePage.value = imageUrls.value.length - 1;
        });
      })
      .then(() => {
        information.value.images.push({ id: newId, extension: fileExtension, description: "" });
        const docRef = doc(collection(firebaseDb, "characters"), `${documentId}`).withConverter(characterConverter);
        updateDoc(docRef, { images: information.value.images });
        newImage.value = [];
      });
  };
  const deleteImage = (imageId: string, imageExtension: string) => {
    const imageRef = storageRef(firebaseStorage, `characters/${imageId}.${imageExtension}`);
    deleteObject(imageRef).then(() => {
      imageUrls.value = imageUrls.value.filter((imageUrl) => {
        return imageUrl.id !== `${imageId}`;
      });
      imagePage.value = Math.max(0, imageUrls.value.length - 1);
      information.value.images = information.value.images.filter((image) => {
        return image.id !== imageId;
      });
      const docRef = doc(collection(firebaseDb, "characters"), `${documentId}`).withConverter(characterConverter);
      updateDoc(docRef, { images: information.value.images });
    });
  };
  const onDropImage = (event: DragEvent) => {
    imageDragging.value = false;
    if (!event || !event.dataTransfer || event.dataTransfer.files.length === 0) {
      return;
    }
    const target = event.dataTransfer as DataTransfer;
    const fileName = (target.files as FileList)[0].name;
    const fileExtension = fileName.match(/[^.]+$/)?.[0] ?? "png";
    const newId = nanoid();
    const imageRef = storageRef(firebaseStorage, `characters/${newId}.${fileExtension}`);
    uploadBytes(imageRef, event.dataTransfer.files[0])
      .then(() => {
        const imageRef = storageRef(firebaseStorage, `characters/${newId}.${fileExtension}`);
        getDownloadURL(imageRef).then((downloadUrl) => {
          imageUrls.value.push({ id: `${newId}`, value: downloadUrl });
          imagePage.value = imageUrls.value.length - 1;
        });
      })
      .then(() => {
        information.value.images.push({ id: newId, extension: fileExtension, description: "" });
        const docRef = doc(collection(firebaseDb, "characters"), `${documentId}`).withConverter(characterConverter);
        updateDoc(docRef, { images: information.value.images });
        newImage.value = [];
      });
  };
  const uploadFile = () => {
    const fileReader = new FileReader();
    fileReader.readAsText(newFile.value[0]);
    fileReader.onload = () => {
      const data = JSON.parse(fileReader.result?.toString() ?? "");
      information.value.name = data.data.name ?? "";
      information.value.kana = data.data.kana ?? "";
      information.value.title = data.data.title ?? "";
      information.value.age = data.data.age ?? "";
      information.value.gender = data.data.gender ?? "";
      information.value.profession = data.data.profession ?? "";
      information.value.home = data.data.home ?? "";
      information.value.rank = data.data.rank ?? "";
      information.value.family = data.data.family ?? "";
      information.value.tags = data.data.tags ?? [];
      if (data.data.remarks === undefined) {
        information.value.remarks = [{ title: "", body: "", question: "", answer: "", isPublic: true }];
      } else if (typeof data.data.remarks === "string") {
        information.value.remarks = [
          { title: "メモ", body: data.data.remarks, question: "", answer: "", isPublic: true },
        ];
      } else {
        information.value.remarks = data.data.remarks;
      }
      information.value.skills.forEach((skill) => {
        const found = data.data.params.find(
          (element: { label: string; value: string }) => element.label.replace("&", "＆") === skill.name
        );
        if (found !== undefined) {
          skill.value = parseInt(found.value);
        } else {
          skill.value = 0;
        }
      });
      information.value.specialities.forEach((speciality) => {
        const found = data.data.params.find(
          (element: { label: string; value: string }) => element.label.replace("&", "＆") === speciality.name
        );
        if (found !== undefined) {
          speciality.value = parseInt(found.value);
        } else {
          speciality.value = 0;
        }
      });
      information.value.injury =
        data.data.status.find((item: { label: string; value: string; max: number }) => {
          return item.label === "負傷";
        }).value ?? 0;
      if (rule.value !== data.data.rule) {
        showSnackbar(
          "ファイルを読み込みましたが、アップロードされたキャラクターのルールと現在選択中のルールが異なるため、一部正しく反映できませんでした",
          "info"
        );
      } else {
        showSnackbar("ファイルを読み込みました", "success");
      }
    };
    newFile.value = [];
    uploadDialog.value = false;
  };
  const onDropFile = (event: DragEvent) => {
    fileDragging.value = false;
    if (!event || !event.dataTransfer || event.dataTransfer.files.length === 0) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(event.dataTransfer.files[0]);
    fileReader.onload = () => {
      const data = JSON.parse(fileReader.result?.toString() ?? "");
      information.value.name = data.data.name ?? "";
      information.value.kana = data.data.kana ?? "";
      information.value.title = data.data.title ?? "";
      information.value.age = data.data.age ?? "";
      information.value.gender = data.data.gender ?? "";
      information.value.profession = data.data.profession ?? "";
      information.value.home = data.data.home ?? "";
      information.value.rank = data.data.rank ?? "";
      information.value.family = data.data.family ?? "";
      information.value.tags = data.data.tags ?? [];
      if (data.data.remarks === undefined) {
        information.value.remarks = [{ title: "", body: "", question: "", answer: "", isPublic: true }];
      } else if (typeof data.data.remarks === "string") {
        information.value.remarks = [
          { title: "メモ", body: data.data.remarks, question: "", answer: "", isPublic: true },
        ];
      } else {
        information.value.remarks = data.data.remarks;
      }
      information.value.skills.forEach((skill) => {
        const found = data.data.params.find(
          (element: { label: string; value: string }) => element.label.replace("&", "＆") === skill.name
        );
        if (found !== undefined) {
          skill.value = parseInt(found.value);
        } else {
          skill.value = 0;
        }
      });
      information.value.specialities.forEach((speciality) => {
        const found = data.data.params.find(
          (element: { label: string; value: string }) => element.label.replace("&", "＆") === speciality.name
        );
        if (found !== undefined) {
          speciality.value = parseInt(found.value);
        } else {
          speciality.value = 0;
        }
      });
      information.value.injury =
        data.data.status.find((item: { label: string; value: string; max: number }) => {
          return item.label === "負傷";
        }).value ?? 0;
      if (rule.value !== data.data.rule) {
        showSnackbar(
          "ファイルを読み込みましたが、アップロードされたキャラクターのルールと現在選択中のルールが異なるため、一部正しく反映できませんでした",
          "info"
        );
      } else {
        showSnackbar("ファイルを読み込みました", "success");
      }
    };
    newFile.value = [];
    uploadDialog.value = false;
  };

  const onClickImageAdd = () => {
    const imageInput = document.getElementById("image-input");
    if (imageInput !== null) {
      imageInput.click();
    }
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
    if (information.value.tags.length >= 100) {
      tagErrorMessages.value = "タグが登録できるのは100個までです";
      newTag.value = "";
      return;
    }
    tagErrorMessages.value = "";
    information.value.tags.push(trimedValue);
    newTag.value = "";
  };
  const onClickTagClose = (index: number) => {
    information.value.tags.splice(index, 1);
  };
  const onClickRemarksSetting = (index: number) => {
    newRemark.value.title = information.value.remarks[index].title;
    newRemark.value.body = information.value.remarks[index].body;
    newRemark.value.question = information.value.remarks[index].question;
    newRemark.value.answer = information.value.remarks[index].answer;
    if (information.value.remarks[index].isPublic) {
      newRemark.value.publicity = information.value.remarks[index].answer === "" ? "全体公開" : "限定公開";
    } else {
      newRemark.value.publicity = "非公開";
    }
    newRemark.value.index = index;
    remarkSettingDialog.value = true;
  };
  const onClickRemarkSetting = () => {
    if (newRemark.value.publicity === "限定公開") {
      if (newRemark.value.question === null || newRemark.value.question.length === 0) {
        showSnackbar("質問を入力してください", "error");
        return;
      }
      if (newRemark.value.answer === null || newRemark.value.answer.length === 0) {
        showSnackbar("答えを入力してください", "error");
        return;
      }
    }
    information.value.remarks[newRemark.value.index] = {
      title: newRemark.value.title,
      body: newRemark.value.body,
      question: newRemark.value.publicity === "限定公開" ? newRemark.value.question : "",
      answer: newRemark.value.publicity === "限定公開" ? newRemark.value.answer : "",
      isPublic: ["全体公開", "限定公開"].includes(newRemark.value.publicity) ? true : false,
    };
    remarkSettingDialog.value = false;
  };
  const onClickRemarksDelete = (index: number) => {
    deleteRemarkIndex = index;
    remarkDeleteDialog.value = true;
  };
  const onClickRemarkDelete = () => {
    information.value.remarks.splice(deleteRemarkIndex, 1);
    openedRemarks.value = [
      ...openedRemarks.value.filter((openedRemarks) => {
        return openedRemarks < deleteRemarkIndex;
      }),
      ...openedRemarks.value
        .filter((openedRemarks) => {
          return openedRemarks > deleteRemarkIndex;
        })
        .map((openedRemarks) => {
          return openedRemarks - 1;
        }),
    ];
    deleteRemarkIndex = -1;
    remarkDeleteDialog.value = false;
    showSnackbar("メモを削除しました", "success");
  };
  const onClickRemarksAdd = () => {
    const remarksLength = information.value.remarks.length;
    if (remarksLength >= 50) {
      showSnackbar("メモが追加できるのは50個までです", "error");
      return;
    }
    information.value.remarks.push({
      title: `メモ${remarksLength + 1}`,
      body: "",
      question: "",
      answer: "",
      isPublic: true,
    });
  };
  const onClickView = (isForceMove: boolean) => {
    if (isDirty && !isForceMove) {
      unsavedDialog.value = true;
      router.push(`/characters/${id}/edit`);
    } else {
      router.push(`/characters/${id}/view`);
    }
  };
  const onClickSheetSettings = () => {
    information.value.isPublishing = publish.value === "公開";
    information.value.isLost = isLost.value;
    if (information.value.rule === rule.value) {
      sheetSettingsDialog.value = false;
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
    sheetSettingsDialog.value = false;
  };
  const onClickOutsideSheetSettings = () => {
    publish.value = information.value.isPublishing ? "公開" : "非公開";
    rule.value = information.value.rule;
    isLost.value = information.value.isLost;
  };
  const onClickFileUpload = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput !== null) {
      fileInput.click();
    }
  };
  const onClickSave = () => {
    overlay.value = true;
    information.value.updatedAt = serverTimestamp();
    const docRef = doc(collection(firebaseDb, "characters"), documentId).withConverter(characterConverter);
    updateDoc(docRef, { ...information.value })
      .then(() => {
        isDirty = false;
        showSnackbar("キャラクターを更新しました", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        showSnackbar(`キャラクターを更新できませんでした：${errorMessage}`, "error");
      })
      .finally(() => {
        overlay.value = false;
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
        rule.value = character.rule;
      })
      .then(() => {
        information.value.images.forEach((image) => {
          const imageRef = storageRef(firebaseStorage, `characters/${image.id}.${image.extension}`);
          getDownloadURL(imageRef).then((downloadUrl) => {
            imageUrls.value.push({
              id: `${id}-${image.id}`,
              value: downloadUrl,
            });
          });
        });
        watch(
          information,
          () => {
            isDirty = true;
          },
          { deep: true }
        );
      });
    window.onpopstate = () => {
      onClickView(false);
    };
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

<style scoped>
  .remarks-title {
    background-color: rgba(var(--v-theme-grey), 0.3);
  }
</style>

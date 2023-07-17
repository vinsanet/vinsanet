<template>
  <v-container class="d-flex fill-height">
    <v-row :align="'center'">
      <v-col>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            <div :class="['text-h4']">404 Page Not Found</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row :justify="'center'">
          <v-col class="text-center">
            お探しのページが見つかりませんでした。それは、本当に存在するページですか？
          </v-col>
        </v-row>
        <v-row :justify="'center'" class="pa-2">
          <v-col class="text-center">
            <router-link to="/" class="text-decoration-none">ホームに戻る</router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  //
</script>

<style scoped>
  a {
    position: relative;
    border-bottom: solid 1px rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-body));
  }

  a::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 0;
    height: 2px;
    background-color: rgb(var(--v-theme-primary));
    transition: 0.5s;
  }

  a:hover::after {
    width: 100%;
  }
</style>

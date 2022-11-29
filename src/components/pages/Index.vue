<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-container>
        <v-row>
          <v-col>
            <div :class="['text-h3']">Kutulu character sheet</div>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="">
        <v-row>
          <v-col></v-col>
          <v-col>
            <!-- <v-btn color="primary" @click="onClickLogin"> Login </v-btn> -->
            <v-btn color="primary" to="/login"> Login </v-btn>
          </v-col>
          <v-col>
            <v-btn color="success" to="/create"> Create </v-btn>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
</script>

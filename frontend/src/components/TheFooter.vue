<template>
  <v-footer v-if="!$route.meta.hideNavigation" app color="navbar" class="d-flex flex-column">
    <div class="d-flex w-100 align-center">
      <ThemeButton />
      <div class="text-center w-100">
        {{ new Date().getFullYear() }} — <strong>HYDROPROCESS-DB</strong>
      </div>
      <v-spacer></v-spacer>
      <!-- <v-switch v-model="switchValue" @click.stop="toggleSwitch" :label="`${switchValue ? 'Faking Data' : 'Using Real Data'}`"></v-switch> -->
    </div>
  </v-footer>
</template>

<script setup>
import ThemeButton from './ThemeButton.vue';
import { ref } from 'vue'

let switchValue = ref(false)

</script>

<style lang="scss" scoped></style>
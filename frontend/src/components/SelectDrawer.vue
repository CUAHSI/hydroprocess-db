<template>
  <v-navigation-drawer location="left" width="auto" v-model="show" temporary>
    <v-btn
      v-if="!show"
      size="large"
      color="primary"
      class="ma-0 pa-2 drawer-handle"
      @click="show = !show"
    >
      <v-icon :icon="mdiGlobeModel"></v-icon>
      <span>Select</span>
    </v-btn>
    <v-sheet class="mx-auto" elevation="8">
      <h2 class="ma-2 text-center">Selector</h2>
      <v-container fluid>
        <v-checkbox
          v-for="variable in variables"
          v-model="hydrologicStore.selectedVariables"
          :label="variable.name"
          :value="variable"
          :key="variable.abbreviation"
        ></v-checkbox>
      </v-container>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script setup>
import { mdiGlobeModel } from '@mdi/js'
import { ref } from 'vue'

const variables = [
  { name: 'Example Var', abbreviation: 'E' },
  { name: 'Example Var2', abbreviation: 'E2' }
]
let show = ref(false)
</script>

<style scoped>
.drawer-handle {
  position: absolute;
  bottom: 30%;
  left: 110%;
}
</style>

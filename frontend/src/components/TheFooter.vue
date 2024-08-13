<template>
  <v-footer v-if="!$route.meta.hideNavigation" app color="navbar" class="d-flex flex-column">
    <div class="d-flex w-100 align-center">
      <div class="text-center w-100">
        {{ new Date().getFullYear() }} — <strong>hydroprocess_db</strong>
      </div>
      <v-spacer></v-spacer>
      <a href="https://cuahsi.org" class="logo" target="_blank">
        <v-card height="10vh">
          <v-card-text>
            <div class="text-body-1">Powered by</div>
            <v-img :src="imgUrl" cover width="8rem"></v-img>
          </v-card-text>
        </v-card>
      </a>
    </div>
  </v-footer>
</template>

<script setup>
import imgUrl from '@/assets/logo.png'

</script>

<style lang="scss" scoped>
.logo {
  height: 10%;
  cursor: pointer;

  img {
    height: 10%;
  }
}
</style>
<template>
  <v-footer v-if="!$route.meta.hideNavigation" app color="navbar" class="d-flex flex-column">
    <div class="d-flex w-100 align-center">
      <div class="text-center w-100">
        <p class="footerdescription">The work is supported by the National Science Foundation (NSF) under award 2322510: “Synthesizing hydrologic process knowledge through a community database.”</p>
        {{ new Date().getFullYear() }} — <strong>hydroprocess_db</strong>
      </div>
      <v-spacer></v-spacer>
      <div class="nsfimagecontainer">
        <img :src="nfsImgUrl" cover  width="100" height="50" class="rounded">
      </div>
      <div class="sdsuimagecontainer">
        <v-img :src="sdsuImgUrl" cover width="8rem" class="rounded"></v-img>
      </div>
      <v-card href="https://cuahsi.org" class="mx-auto" rel="noopener" target="_blank" subtitle="Powered by" min-width="
        16rem">
        <template v-slot:append>
          <v-img :src="imgUrl" cover width="8rem"></v-img>          
        </template>
      </v-card>
    </div>
  </v-footer>
</template>

<script setup>
import imgUrl from '@/assets/logo.png';
import sdsuImgUrl from '@/assets/sdsu_logo.png';
import nfsImgUrl from '@/assets/nsf_logo.png';

</script>

<style lang="scss" scoped>
.logo {
  height: 10vh;
  cursor: pointer;

  img {
    height: 10vh;
  }
}

.sdsuimagecontainer{
    margin-right: 8px;
    height: 48px;
  }

.nsfimagecontainer{
  margin-right: -11px;
  height: 48px;
}

.footerdescription{
  font-size: 13px;
}
</style>
<template>
  <v-footer v-if="!$route.meta.hideNavigation" app color="navbar" class="d-flex flex-column">
    <div class="d-flex w-100 position-relative">
      <div class="nsfimagecontainer float-left">
        <img :src="nfsImgUrl" cover width="100" height="50" class="rounded" />
      </div>
      <div class="sdsuimagecontainer float-left">
        <v-img :src="sdsuImgUrl" cover width="8rem" class="rounded"></v-img>
      </div>
      <div class="poweredbycontainer">
        <v-card
          href="https://cuahsi.org"
          class="mx-auto float-left"
          rel="noopener"
          target="_blank"
          subtitle="Powered by"
          min-width="
          16rem"
        >
          <template v-slot:append>
            <v-img :src="imgUrl" cover width="8rem"></v-img>
          </template>
        </v-card>
      </div>
    </div>
  </v-footer>
</template>

<script setup>
import imgUrl from '@/assets/logo.png'
import sdsuImgUrl from '@/assets/sdsu_logo.png'
import nfsImgUrl from '@/assets/nsf_logo.png'
</script>

<style lang="scss" scoped>
.logo {
  height: 10vh;
  cursor: pointer;

  img {
    height: 10vh;
  }
}

.sdsuimagecontainer {
  margin-right: 8px;
  height: 48px;
}

.nsfimagecontainer {
  margin-right: -11px;
  height: 48px;
}

.footerdescription {
  font-size: 13px;
}

.footeryearmark {
  position: absolute;
  left: 43%;
}

.footerdescription {
  margin-top: -28px;
}

.poweredbycontainer {
  position: absolute;
  right: 0;
}
</style>

<template>
  <v-footer v-if="!$route.meta.hideNavigation" app color="navbar" class="d-flex flex-column">
    <div class="d-flex w-100 position-relative">
      <div class="nsfimagecontainer float-left">
        <img :src="nfsImgUrl" width="100" height="50" class="rounded nsf-logo" />
      </div>
      <div class="cirohimagecontainer float-left">
        <v-img :src="CIROHLogo" cover width="8rem" class="rounded"></v-img>
      </div>
      <div class="text">Hydrological Process Knowledge Hub</div>
      <div class="poweredbycontainer">
        <v-card
          href="https://cuahsi.org"
          class="mx-auto float-left"
          rel="noopener"
          target="_blank"
          subtitle="Powered by"
          color="transparent"
          elevation="0"
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
import nfsImgUrl from '@/assets/nsf_logo.png'
import CIROHLogo from '@/assets/CIROHLogo.png'
</script>

<style lang="scss" scoped>
.logo {
  height: 10vh;
  cursor: pointer;

  img {
    height: 10vh;
  }
}

.text {
  color: #7a7a7a;
  margin-top: 8px;
  margin-left: -50px;
  font-size: 1.2rem;
}

.cirohimagecontainer {
  margin-right: 8px;
  height: 48px;

  :deep(.v-img__img) {
    width: auto;
  }
}

.nsfimagecontainer {
  margin-right: -11px;
  height: 48px;
}

.nsf-logo {
  object-fit: contain;
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

  :deep(.v-card-subtitle) {
    color: #606060;
  }
}
</style>

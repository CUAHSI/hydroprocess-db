<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <!-- Header Panel -->
    <v-card
      class="pa-8 header-panel header-panel-white rounded-xl"
      elevation="8"
      style="margin-bottom: 0 !important"
    >
      <div class="d-flex flex-column align-start">
        <h6 class="header-panel-welcome">Welcome</h6>
      </div>
      <h1 class="mb-2 header-panel-black text-center">Hydrological Process Knowledge Hub</h1>
      <div class="text-h6 header-panel-black text-center">
        This platform connects two complementary efforts: a global database of perceptual models and
        a province-scale synthesis of hydrological landscapes in North America. Together they
        support process understanding across site and regional scales.
      </div>
    </v-card>

    <v-row
      class="d-flex justify-center align-center w-100"
      style="max-width: 1200px; margin: 0 auto; margin-top: -32px !important"
    >
      <!-- Map Link Panel -->
      <v-col cols="12" md="6">
        <router-link :to="{ name: 'map' }" class="panel-link" style="text-decoration: none">
          <v-card class="pa-4 text-center link-panel rounded-xl" elevation="4">
            <h2 class="mb-2">Hydrological Process Database</h2>
            <h6>Curated process evidence based perceptual models from published studies</h6>
            <p></p>
            <h5>
              The Database page provides searchable, filterable records for site-level hydrological
              processes and related perceptual model information.
            </h5>
          </v-card>
        </router-link>
      </v-col>
      <!-- World Map Link Panel -->
      <v-col cols="12" md="6">
        <router-link :to="{ name: 'world-map' }" class="panel-link" style="text-decoration: none">
          <v-card class="pa-4 text-center link-panel rounded-xl" elevation="4">
            <h2 class="mb-2">Hydrologic Provinces and Perceptual Models</h2>
            <h6>Thirty five North American provinces grouped by dominant processes and drivers</h6>
            <h5>
              The province page presents hydrological landscape regions each linked to distinct
              perceptual model informed by climate and geophysical conrols.
            </h5>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
.header-panel {
  min-width: 320px;
  max-width: 1200px;
}
.panel-link {
  display: block;
}
.panel-link .v-card {
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  cursor: pointer;
}
.panel-link:hover .v-card,
.panel-link:focus .v-card {
  box-shadow: 0 8px 32px rgba(33, 150, 243, 0.18);
  transform: translateY(-2px) scale(1.01);
}
.header-panel-white {
  background: #fff !important;
}
.header-panel-black {
  color: #222 !important;
}
.header-panel-welcome {
  color: #2196f3 !important;
  font-weight: 700 !important;
}
</style>

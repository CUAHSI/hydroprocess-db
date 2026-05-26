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

      <h1 class="mb-2 header-panel-black">Hydrological Process Knowledge Hub</h1>
      <div class="text-h6 header-panel-black">
        This platform connects two complementary efforts: a global database of perceptual models and
        a province-scale synthesis of hydrological landscapes in North America. Together they
        support process understanding across site and regional scales.
      </div>
    </v-card>

    <v-row
      class="d-flex justify-center align-center w-100"
      style="max-width: 1200px; margin: 0 auto; margin-top: 32px"
    >
      <!-- Map Link Panel -->
      <v-col cols="12" md="6">
        <router-link :to="{ name: 'map' }" class="panel-link" style="text-decoration: none">
          <v-card class="pa-2 link-panel rounded-xl" elevation="4">
            <p class="nsf-button">NSF Supported</p>
            <h3 class="mb-2">Hydrological Process Database</h3>
            <h6 class="panel-caption">
              Curated process evidence based perceptual models from published studies
            </h6>
            <p></p>
            <h6>
              The Database page provides searchable, filterable records for site-level hydrological
              processes and related perceptual model information.
            </h6>
          </v-card>
        </router-link>
      </v-col>
      <!-- Provinces Map Link Panel -->
      <v-col cols="12" md="6">
        <router-link
          :to="{ name: 'provinces-map' }"
          class="panel-link"
          style="text-decoration: none"
        >
          <v-card class="pa-2 text-center link-panel rounded-xl" elevation="4">
            <p class="nsf-button">CIROH Supported</p>
            <h3 class="mb-2">Hydrologic Provinces and Perceptual Models</h3>
            <h6 class="panel-caption">
              Thirty five North American provinces grouped by dominant processes and drivers
            </h6>
            <h6>
              The province page presents hydrological landscape regions each linked to distinct
              perceptual model informed by climate and geophysical conrols.
            </h6>
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
.gradient-bg {
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}
.panel-caption {
  font-size: 0.72rem;
  color: #444;
  font-weight: 400;
  margin-bottom: 2px;
  margin-top: -2px;
  letter-spacing: 0.1px;
}
.nsf-button {
  align-self: flex-start;
  display: inline-block;
  padding: 2px 10px;
  margin-bottom: 6px;
  background-color: #f3f4f6;
  color: #1976d2;
  border: none;
  border-radius: 14px;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.1);
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s;
  text-align: center;
}
.nsf-button:hover,
.nsf-button:focus {
  background-color: #e3e7ef;
  color: #1565c0;
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.18);
}
.fill-height {
  .header-panel h1,
  .header-panel h6,
  .header-panel .text-h6,
  .header-panel p {
    text-align: left !important;
  }
  min-height: 100vh;
}
.header-panel {
  min-width: 320px;
  max-width: 1200px;
}
.panel-link {
  display: block;
  height: 100%;
}
.panel-link .v-card {
  min-height: 140px;
  max-height: 220px;
  height: 250px;
  overflow: auto;
  min-width: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  cursor: pointer;
  overflow: auto;
  overflow-wrap: break-word;
  word-break: break-word;
  text-overflow: ellipsis;
}

.panel-link .v-card h2,
.panel-link .v-card h5,
.panel-link .v-card h6,
.panel-link .v-card p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-word;
  text-align: left;
}
.panel-link:hover .v-card,
.panel-link:focus .v-card {
  box-shadow: 0 8px 32px rgba(33, 150, 243, 0.18);
  transform: translateY(-2px) scale(1.01);
}
.v-row {
  align-items: stretch !important;
}
.header-panel-white {
  background: #fff !important;
}
.header-panel-black {
  color: #222 !important;
}
.header-panel-welcome {
  color: #1976d2 !important;
  font-weight: 700 !important;
}
</style>

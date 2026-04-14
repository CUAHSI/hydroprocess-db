<template>
  <div id="world-leaflet-map" style="height: 100vh; width: 100vw;"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  const map = L.map('world-leaflet-map').setView([20, 0], 2)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
})
</script>

<style scoped>
#world-leaflet-map {
  min-height: 100vh;
  min-width: 100vw;
}
</style>

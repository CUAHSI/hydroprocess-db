<template>
    <DataViewDrawer />
    <TheLeafletMap />
    <FilterDrawer v-if="mapStore.mapLoaded" />
</template>

<script setup>
import FilterDrawer from '@/components/FilterDrawer.vue';
import DataViewDrawer from '@/components/DataViewDrawer.vue';
import TheLeafletMap from '@/components/TheLeafletMap.vue';
import { useMapStore } from '@/stores/map';

const mapStore = useMapStore()

</script>

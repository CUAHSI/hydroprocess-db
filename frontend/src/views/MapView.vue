<template>
    <DataViewDrawer />
    <FilterDrawer v-if="mapStore.mapLoaded" />
</template>

<script setup>
import FilterDrawer from '@/components/FilterDrawer.vue';
import DataViewDrawer from '@/components/DataViewDrawer.vue';
import { useMapStore } from '@/stores/map';

const mapStore = useMapStore()

</script>

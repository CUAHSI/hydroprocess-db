<template>
    <v-overlay :model-value="!mapStore.mapLoaded" class="align-center justify-center">
        <v-progress-circular indeterminate :size="128"></v-progress-circular>
    </v-overlay>
    <v-container fluid>
        <v-row fill-height>
            <v-col :cols="mdAndDown ? 12 : 3" :order="mdAndDown ? 'last' : ''">
                <FilterDrawer />
            </v-col>
            <v-divider vertical></v-divider>
            <v-col :cols="mdAndDown ? 12 : 7">
                <TheLeafletMap />
            </v-col>
            <v-divider vertical></v-divider>
            <v-col :cols="mdAndDown ? 12 : 2">
                <DataViewDrawer />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import FilterDrawer from '@/components/FilterDrawer.vue';
import DataViewDrawer from '@/components/DataViewDrawer.vue';
import TheLeafletMap from '@/components/TheLeafletMap.vue';
import { useMapStore } from '@/stores/map';
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const mapStore = useMapStore()

</script>

<style scoped></style>
<template>
    <v-btn @click="showFilterDrawer = !showFilterDrawer" color="secondary" location="left" order="0"
        :style="{ transform: translateFilter(), position: 'absolute' }"
        :icon="showFilterDrawer ? mdiChevronLeft : mdiChevronRight" size="x-small">
    </v-btn>
    <v-btn @click="showDataDrawer = !showDataDrawer" color="red" location="right" order="0"
        :style="{ transform: translateData(), position: 'absolute' }"
        :icon="showDataDrawer ? mdiChevronRight : mdiChevronLeft" size="x-small">
    </v-btn>
    <v-overlay :model-value="!mapStore.mapLoaded" class="align-center justify-center">
        <v-progress-circular indeterminate :size="128"></v-progress-circular>
    </v-overlay>
    <v-container fluid>
        <v-row fill-height>
            <v-col v-if="showFilterDrawer" :cols="mdAndDown ? 12 : 3" :order="mdAndDown ? 'last' : ''">
                <FilterDrawer />
            </v-col>
            <v-divider vertical></v-divider>
            <v-col :cols="mdAndDown ? 12 : 7">
                <TheLeafletMap />
            </v-col>
            <v-divider vertical></v-divider>
            <v-col v-if="showDataDrawer" :cols="mdAndDown ? 12 : 2">
                <DataViewDrawer />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import FilterDrawer from '@/components/FilterDrawer.vue';
import DataViewDrawer from '@/components/DataViewDrawer.vue';
import TheLeafletMap from '@/components/TheLeafletMap.vue';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'
import { useMapStore } from '@/stores/map';
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const mapStore = useMapStore()

// TODO: cols need to be reactive to show/hide
const showFilterDrawer = ref(true)
const showDataDrawer = ref(true)

const translateFilter = () => {
    if (showFilterDrawer.value) {
        return 'translate(24vw, 0)'
    } else {
        return 'translate(0, 0)'
    }
}

const translateData = () => {
    if (showDataDrawer.value) {
        return 'translate(-16vw, 0)'
    } else {
        return 'translate(0, 0)'
    }
}


</script>

<style scoped></style>
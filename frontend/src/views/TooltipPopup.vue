<template>
  <div v-show="!isExpanded && region" class="tooltip-overlay">
    <div class="tooltip-panel">
      <button class="close-btn" type="button" @click="$emit('close')">&#x2715;</button>
      <h3 class="tooltip-title">
        {{ region.name }}<template v-if="LayerType === 'Domain'"> Domain</template>
      </h3>

      <p v-if="!isDiagramExpanded" class="description">
        {{ LayerType === 'Domain' ? region.summary : region.characteristics }}
      </p>
      <div v-if="LayerType === 'Province' && !isDiagramExpanded" class="tags">
        <span class="tag" v-for="(tag, index) in region.processes" :key="index">{{ tag }}</span>
      </div>

      <div class="content-panel">
        <button
          v-if="LayerType === 'Domain' && region.image"
          type="button"
          class="pill-btn full-diagram-btn"
          @click="isDiagramExpanded = !isDiagramExpanded"
        >
          <span class="icon-arrow" aria-hidden="true">{{
            isDiagramExpanded ? '&#x2197;' : '&#x26F6;'
          }}</span>
          {{ isDiagramExpanded ? 'Back' : 'View full diagram' }}
        </button>

        <img
          v-if="region.image"
          :src="region.image"
          :alt="region.name"
          :class="{
            'domain-image': LayerType === 'Domain',
            'province-image': LayerType === 'Province'
          }"
        />

        <button
          v-if="LayerType === 'Domain' && !isDiagramExpanded"
          type="button"
          class="details-btn"
          @click="isExpanded = true"
        >
          View details
          <span class="icon-arrow" aria-hidden="true">&#x2192;</span>
        </button>
      </div>

      <p v-if="LayerType === 'Domain'" class="citation">
        Diagram: {{ DIAGRAM_CITATION }}<br />
        <a :href="DIAGRAM_CITATION_URL" target="_blank" rel="noopener">{{
          DIAGRAM_CITATION_URL
        }}</a>
      </p>
    </div>
  </div>

  <!-- sidebar opens when the user selects View details from the domain tooltip -->
  <Teleport to="body">
    <Transition name="sidebar-fade">
      <div v-if="isExpanded" class="sidebar-overlay" @click.self="closeSidebar">
        <aside class="sidebar-panel" role="dialog" aria-modal="true" :aria-label="sidebarTitle">
          <header class="sidebar-header" :style="{ backgroundColor: region.color || '#1b2a6b' }">
            <div class="sidebar-header-actions">
              <button type="button" class="preview-download-btn" @click="showComingSoon = true">
                <v-icon :icon="mdiTrayArrowDown" size="20" />
                Preview &amp; Download Content
              </button>
              <button
                type="button"
                class="sidebar-close-btn"
                aria-label="Close"
                @click="closeSidebar"
              >
                &#x2715;
              </button>
            </div>
            <h2 class="sidebar-title">{{ sidebarTitle }}</h2>
            <p class="sidebar-description">{{ region.content }}</p>
          </header>

          <v-tabs
            v-model="activeTab"
            grow
            height="64"
            color="#1b2a6b"
            base-color="#b4b8bf"
            slider-color="#1b2a6b"
            class="sidebar-tabs"
          >
            <v-tab value="drivers" class="sidebar-tab">Domain Drivers</v-tab>
            <v-tab value="landscape" class="sidebar-tab">Hydrologic Landscape</v-tab>
          </v-tabs>

          <div class="sidebar-body">
            <v-window v-model="activeTab">
              <v-window-item value="drivers">
                <div v-if="region.image" class="sidebar-image-card">
                  <img :src="region.image" :alt="sidebarTitle" class="sidebar-image" />
                </div>
                <p class="citation">
                  Diagram: {{ DIAGRAM_CITATION }}<br />
                  <a :href="DIAGRAM_CITATION_URL" target="_blank" rel="noopener">{{
                    DIAGRAM_CITATION_URL
                  }}</a>
                </p>
              </v-window-item>

              <v-window-item value="landscape">
                <div class="rich-content">
                  <h4 class="section-heading">coming soon</h4>
                </div>
              </v-window-item>
            </v-window>
          </div>
        </aside>
      </div>
    </Transition>

    <v-snackbar v-model="showComingSoon" :timeout="3000" location="bottom right" :z-index="2100">
      Preview &amp; Download Content is coming soon.
    </v-snackbar>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { mdiTrayArrowDown } from '@mdi/js'

const props = defineProps({
  LayerType: { type: String, required: true },
  region: { type: Object, required: true }
})

const emit = defineEmits(['close'])

const DIAGRAM_CITATION =
  'Fan, Y. (2026). Hydrological Process Illustrations of the Five Domains of North America, HydroShare'
const DIAGRAM_CITATION_URL = 'http://www.hydroshare.org/resource/9c92f62ced274fa69ed19434447c8422'

const isExpanded = ref(false)
const isDiagramExpanded = ref(false)
const activeTab = ref('drivers')
const showComingSoon = ref(false)

const sidebarTitle = computed(() => props.region.title || `${props.region.name} Domain`)

function closeSidebar() {
  isExpanded.value = false
  emit('close')
}

function onKeydown(event) {
  if (event.key === 'Escape' && isExpanded.value) closeSidebar()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

watch(isExpanded, (expanded) => {
  if (expanded) activeTab.value = 'drivers'
})

watch(
  () => props.region,
  () => {
    isExpanded.value = false
    isDiagramExpanded.value = false
  }
)
</script>

<style scoped>
.tooltip-overlay {
  position: absolute;
  inset: 0;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.tooltip-panel {
  position: relative;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  width: 850px;
  height: 600px;
  max-width: 92vw;
  max-height: 88vh;
  background: #eff4f8;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.25);
  padding: 28px 32px;
  line-height: 1.4;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
  background: rgba(15, 23, 42, 0.55);
}

.sidebar-panel {
  display: flex;
  flex-direction: column;
  width: 640px;
  max-width: 100vw;
  height: 100%;
  background: #eff4f8;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.sidebar-header {
  flex-shrink: 0;
  padding: 16px 28px 28px;
  color: white;
}

.sidebar-header-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.sidebar-title {
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.sidebar-description {
  margin: 0;
  font-size: 17px;
  line-height: 1.45;
}

.preview-download-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border: 1px solid #c7d2e0;
  border-radius: 999px;
  background: #eff4f8;
  color: #1b2a6b;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.preview-download-btn:hover {
  background: #dfe8f2;
}

.sidebar-close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.sidebar-close-btn:hover {
  color: white;
}

.sidebar-tabs {
  flex: 0 0 auto;
  margin: 24px 24px 0;
  background: #e6e8eb;
  border-radius: 8px 8px 0 0;
}

.sidebar-tab {
  text-transform: none;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: normal;
}

.sidebar-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px 32px;
}

.sidebar-image-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
}

.sidebar-image {
  display: block;
  width: 100%;
  object-fit: contain;
}

.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: background-color 0.3s ease;
}

.sidebar-fade-enter-active .sidebar-panel,
.sidebar-fade-leave-active .sidebar-panel {
  transition: transform 0.3s ease-out;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  background-color: transparent;
}

.sidebar-fade-enter-from .sidebar-panel,
.sidebar-fade-leave-to .sidebar-panel {
  transform: translateX(100%);
}

@media (max-width: 600px) {
  .sidebar-header {
    padding: 12px 16px 20px;
  }

  .sidebar-header-actions {
    justify-content: space-between;
  }

  .preview-download-btn {
    font-size: 13px;
    padding: 6px 14px;
  }

  .sidebar-tabs {
    margin: 16px 16px 0;
  }

  .sidebar-tab {
    font-size: 14px;
  }

  .sidebar-body {
    padding: 16px;
  }
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.1em;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #222;
}

h3 {
  margin: 0 0 12px;
  font-weight: 600;
}

.tooltip-title {
  flex-shrink: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1b2a6b;
}

.tooltip-panel .description {
  flex-shrink: 0;
  max-height: 130px;
  overflow-y: auto;
  font-size: 14px;
  color: #4b5563;
}

.description {
  font-size: 12px;
  color: #222;
  overflow: hidden;
}

.content-panel {
  position: relative;
  flex: 1;
  min-height: 0;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
}

.pill-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #c7d2e0;
  background: #eff4f8;
  color: #1b2a6b;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.pill-btn:hover {
  background: #dfe8f2;
}

.details-btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: #1b2a6b;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.details-btn:hover {
  background: #16215a;
}

.icon-arrow {
  font-size: 14px;
  line-height: 1;
}

.citation {
  flex-shrink: 0;
  margin-top: 12px;
  font-size: 11px;
  line-height: 1.5;
  color: #6b7280;
}

.citation a {
  color: #6b7280;
  word-break: break-all;
}

.domain-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.province-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.tags {
  flex-shrink: 0;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.tag {
  background-color: #1a73e8;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
}

.rich-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-heading {
  margin: 12px 0 0;
  font-size: 18px;
  font-weight: 600;
}

.content-image-wrapper {
  margin: 0;
}

.content-image {
  width: 100%;
  border-radius: 8px;
  display: block;
}

figcaption {
  margin-top: 8px;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  text-align: center;
}
</style>

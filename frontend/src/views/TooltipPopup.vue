<template>
  <div v-show="!isExpanded && region" class="tooltip-overlay">
    <div class="tooltip-panel">
      <button class="close-btn" type="button" @click="$emit('close')">&#x2715;</button>
      <h3 class="tooltip-title">
        {{ region.name }}<template v-if="LayerType === 'Domain'"> Domain</template>
      </h3>

      <p ref="descriptionRef" class="description">
        {{ LayerType === 'Domain' ? region.summary : region.characteristics }}
      </p>
      <div v-if="LayerType === 'Province'" class="tags">
        <span class="tag" v-for="(tag, index) in region.processes" :key="index">{{ tag }}</span>
      </div>

      <div class="content-panel">
        <button
          v-if="LayerType === 'Domain' && region.image"
          type="button"
          class="pill-btn full-diagram-btn"
          @click="openFullDiagram"
        >
          View full diagram
          <span class="icon-arrow" aria-hidden="true">&#x2197;</span>
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
          v-if="LayerType === 'Domain'"
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

  <!-- pop up appears when user clicks to learn more about the region -->
  <Teleport to="body">
    <div v-show="isExpanded" class="popup-overlay" @click.self="$emit('close')">
      <div class="popup-panel">
        <button class="close-btn" type="button" @click="((isExpanded = false), $emit('close'))">
          &#x2715;
        </button>
        <h3>{{ region.name }} Domain</h3>

        <div class="rich-content">
          <template v-for="(block, index) in region.content" :key="index">
            <p v-if="block.type === 'text'" class="description expanded">
              {{ block.text }}
            </p>

            <h4 v-else-if="block.type === 'heading'" class="section-heading">
              {{ block.text }}
            </h4>

            <figure v-else-if="block.type === 'image'" class="content-image-wrapper">
              <img :src="block.src" class="content-image" />

              <figcaption v-if="block.caption">
                {{ block.caption }}
              </figcaption>
            </figure>
          </template>
          <div class="footer">
            <button @click="window.open(region.pdf, '_blank')" class="download-link">
              Download Content
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  LayerType: { type: String, required: true },
  region: { type: Object, required: true }
})

defineEmits(['close'])

const DIAGRAM_CITATION =
  'Fan, Y. (2026). Hydrological Process Illustrations of the Five Domains of North America, HydroShare'
const DIAGRAM_CITATION_URL = 'http://www.hydroshare.org/resource/9c92f62ced274fa69ed19434447c8422'

const descriptionRef = ref(null)
const isExpanded = ref(false)

watch(
  () => descriptionRef.value?.textContent,
  async () => {
    isExpanded.value = false
  }
)

const openFullDiagram = () => {
  if (props.region?.image) {
    //maximize image
  }
}
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

.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  animation: slideInFromRight 0.5s ease-out forwards;
}

.popup-panel {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 28px;
  width: 560px;
  max-width: 90vw;
  height: calc(100vh - 130px);
  overflow-y: auto;
  line-height: 1.4;
  position: relative;
}
@keyframes slideInFromRight {
  from {
    transform: translateX(100%); /* Start off-screen to the right */
  }
  to {
    transform: translateX(0); /* End off-screen to the left */
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

h3,
.popup-title {
  margin: 0 0 12px;
  font-weight: 600;
}

.popup-title {
  font-size: 24px;
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

.download-link {
  font-weight: 500;
  padding: 5px;
  background-color: darkgray;
  border-radius: 8px;
}

.rich-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.popup-text {
  font-size: 15px;
  line-height: 1.8;
  color: #222;
  margin: 0;
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

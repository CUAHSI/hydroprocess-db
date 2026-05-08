<template>
  <div
    v-show="!isExpanded && region"
    @click.self="((isExpanded = false), $emit('close'))"
    class="tooltip-panel"
    :style="panelStyle"
  >
    <button class="close-btn" type="button" @click="$emit('close')">&#x2715;</button>
    <h3>{{ region.name }} Domain</h3>

    <p ref="descriptionRef" class="description" :class="{ expanded: isExpanded }">
      {{ region.summary }}
    </p>

    <div class="footer">
      <img :src="region.image" :alt="region.name" class="image" />
      <button type="button" class="view-more" @click="isExpanded = !isExpanded">View more</button>
    </div>

    <!-- Triangle pointer -->
    <div class="triangle" />
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
import { ref, watch, computed } from 'vue'

const props = defineProps({
  region: { type: Object, required: true },
  position: { type: Object, required: true } // { x, y } in pixels of the click position on the map container
})

defineEmits(['close'])

const PANEL_WIDTH = 380
const PANEL_OFFSET = 16 // gap between triangle tip and click point

const panelStyle = computed(() => ({
  left: `${props.position.x - PANEL_WIDTH / 2}px`,
  top: `${props.position.y - PANEL_OFFSET}px`,
  transform: 'translateY(-100%)'
}))

const descriptionRef = ref(null)
const isExpanded = ref(false)

watch(
  () => descriptionRef.value?.textContent,
  async () => {
    isExpanded.value = false
  }
)
</script>

<style scoped>
.tooltip-panel {
  position: absolute;
  z-index: 1002;
  width: 380px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 20px;
  line-height: 1.4;
}

.triangle {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 16px solid white;
  /* Match the box shadow on the triangle */
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.2));
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

.description {
  font-size: 12px;
  color: #222;
  overflow: hidden;
}

.view-more {
  margin-top: 8px;
  border: 0;
  background: none;
  color: #1a73e8;
  cursor: pointer;
  padding: 0;
  font-size: 13px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.image {
  width: 160px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
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

/* h3 {
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 600;
  padding-right: 20px;
}

.description {
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
  color: #222;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.description.expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
}

.view-more {
  margin-top: 6px;
  padding: 0;
  border: 0;
  background: none;
  color: #1a73e8;
  cursor: pointer;
  font-size: 13px;
}

.footer {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 14px;
}

.image {
  width: 160px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.download-link {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #1a73e8;
  text-decoration: underline;
} */
</style>

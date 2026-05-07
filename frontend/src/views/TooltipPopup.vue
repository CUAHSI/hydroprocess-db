<template>
  <div v-show="!isExpanded" class="tooltip-panel" :style="panelStyle">
    <button class="close-btn" type="button" @click="$emit('close')">&#x2715;</button>
    <h3>{{ region.name }}</h3>

    <p ref="descriptionRef" class="description" :class="{ expanded: isExpanded }">
      {{ region.description }}
    </p>

    <button v-if="isTruncated" type="button" class="view-more" @click="isExpanded = !isExpanded">
      {{ isExpanded ? 'View less' : 'View more' }}
    </button>

    <div class="footer">
      <img :src="region.image" :alt="region.name" class="image" />
      <a :href="region.pdf" download target="_blank" class="download-link">Learn More</a>
    </div>

    <!-- Triangle pointer -->
    <div class="triangle" />
  </div>

  <!-- pop up appears when user clicks to learn more about the region -->
  <Teleport to="body">
    <div
      v-if="isExpanded"
      class="popup-overlay"
      @click.self="((isExpanded = false), $emit('close'))"
    >
      <div class="popup-panel">
        <button class="close-btn" type="button" @click="((isExpanded = false), $emit('close'))">
          &#x2715;
        </button>
        <h3>{{ region.name }}</h3>

        <p class="description expanded">
          {{ region.description }}
        </p>

        <div class="footer">
          <img :src="region.image" :alt="region.name" class="image" />
          <a :href="region.pdf" download target="_blank" class="download-link">Learn More</a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { nextTick, onMounted, ref, watch, computed } from 'vue'

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
const isTruncated = ref(false)
const isExpanded = ref(false)

const checkTruncation = async () => {
  await nextTick()
  if (!descriptionRef.value) {
    isTruncated.value = false
    return
  }
  isTruncated.value = descriptionRef.value.scrollHeight > descriptionRef.value.clientHeight
}

onMounted(() => {
  checkTruncation()
  console.log('received props:', props.region, props.position)
})

watch(
  () => descriptionRef.value?.textContent,
  async () => {
    isExpanded.value = false
    await checkTruncation()
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
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-panel {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 28px;
  width: 560px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  line-height: 1.4;
  position: relative;
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
}
</style>

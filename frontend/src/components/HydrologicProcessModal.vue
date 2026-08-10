<template>
  <v-dialog
    :model-value="modelValue"
    max-width="760"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="hydro-tooltip rounded-xl">
      <v-btn
        variant="text"
        size="small"
        density="compact"
        aria-label="Close"
        class="hydro-tooltip__close"
        @click="closeDialog"
      >
        <span class="hydro-tooltip__close-glyph">&times;</span>
      </v-btn>

      <v-card-text class="hydro-tooltip__body">
        <div class="hydro-tooltip__header d-flex align-center">
          <div class="d-flex align-center ga-3">
            <img :src="lightbulbTooltip" alt="Lightbulb" class="hydro-tooltip__bulb" />
            <span class="hydro-tooltip__title">Quick tooltip!</span>
          </div>
        </div>

        <p class="hydro-tooltip__text mb-0">
          Click a point to see its perceptual model, dominant processes, and source citation. Use the
          Filter Map to narrow down your search.
        </p>

        <div class="hydro-tooltip__footer d-flex justify-end align-center ga-2 mt-3">
          <v-icon icon="mdi-layers-triple-outline" size="16" color="blue-grey-lighten-1" />
          <span>{{ recordsCount }} records</span>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import lightbulbTooltip from '@/assets/lightbulb-clean.png'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  recordsCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

const closeDialog = () => {
  if (!props.modelValue) return
  emit('update:modelValue', false)
}
</script>

<style scoped>
.hydro-tooltip {
  position: relative;
  border: 1px solid #d8dee5;
  background: #fdfefe;
}

.hydro-tooltip__close {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 10;
  min-width: 24px;
  width: 24px;
  height: 24px;
  padding: 0;
}

.hydro-tooltip__close-glyph {
  font-size: 18px;
  line-height: 1;
  color: #4a5561;
  font-weight: 500;
}

.hydro-tooltip__body {
  padding: 24px 24px 18px;
}

.hydro-tooltip__title {
  font-size: 2rem;
  line-height: 1;
  color: #22a2a6;
  font-weight: 800;
}

.hydro-tooltip__bulb {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.hydro-tooltip__text {
  margin-top: 10px;
  color: #5c6670;
  font-size: 1.05rem;
  line-height: 1.45;
}

.hydro-tooltip__footer {
  color: #7a848f;
  font-size: 0.86rem;
}

@media (max-width: 600px) {
  .hydro-tooltip__title {
    font-size: 1.5rem;
  }

  .hydro-tooltip__text {
    font-size: 0.96rem;
  }
}
</style>

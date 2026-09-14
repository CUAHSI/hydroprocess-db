<template>
  <v-dialog :model-value="modelValue" max-width="760" @update:model-value="onModelValueUpdate">
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
            <span class="hydro-tooltip__title">{{ title }}</span>
          </div>
        </div>

        <p class="hydro-tooltip__text mb-0">
          {{ message }}
        </p>

        <v-checkbox
          v-if="showDoNotShowAgain"
          v-model="doNotShowAgain"
          density="compact"
          hide-details
          color="primary"
          class="hydro-tooltip__checkbox mt-2"
          label="Do not show this again"
        />

        <div
          v-if="resolvedFooterText"
          class="hydro-tooltip__footer d-flex justify-end align-center ga-2"
          :class="showDoNotShowAgain ? 'mt-1' : 'mt-1'"
        >
          <v-icon icon="mdi-layers-triple-outline" size="16" color="blue-grey-lighten-1" />
          <span>{{ resolvedFooterText }}</span>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import lightbulbTooltip from '@/assets/lightbulb-clean.png'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  recordsCount: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: 'Quick tooltip!'
  },
  message: {
    type: String,
    default:
      'Click a point to see its perceptual model, dominant processes, and source citation. Use the Filter Map to narrow down your search.'
  },
  footerText: {
    type: String,
    default: ''
  },
  showDoNotShowAgain: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'dismiss'])

const doNotShowAgain = ref(false)
const resolvedFooterText = computed(() => {
  if (props.footerText) return props.footerText
  return `${props.recordsCount} records`
})

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      doNotShowAgain.value = false
    }
  }
)

const closeDialog = () => {
  if (!props.modelValue) return
  emit('dismiss', doNotShowAgain.value)
  emit('update:modelValue', false)
}

const onModelValueUpdate = (nextValue) => {
  if (!nextValue && props.modelValue) {
    emit('dismiss', doNotShowAgain.value)
  }

  emit('update:modelValue', nextValue)
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
  padding: 18px 22px 6px;
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
  margin-top: 8px;
  color: #5c6670;
  font-size: 1.05rem;
  line-height: 1.45;
}

.hydro-tooltip__footer {
  color: #7a848f;
  font-size: 0.86rem;
}

.hydro-tooltip__checkbox {
  color: #5c6670;
}

.hydro-tooltip__checkbox :deep(.v-label) {
  font-size: 0.9rem;
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

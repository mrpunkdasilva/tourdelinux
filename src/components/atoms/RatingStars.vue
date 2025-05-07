<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 5
  },
  readonly: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update'])

const stars = computed(() => {
  return Array.from({ length: props.max }, (_, i) => {
    const value = i + 1
    const filled = value <= Math.floor(props.value)
    const half = !filled && value <= Math.ceil(props.value) && props.value % 1 !== 0
    
    return {
      value,
      filled,
      half
    }
  })
})

const handleClick = (value: number) => {
  if (!props.readonly) {
    emit('update', value)
  }
}

const getStarClass = (star: { filled: boolean, half: boolean }) => {
  if (star.filled) return 'star-filled'
  if (star.half) return 'star-half'
  return 'star-empty'
}
</script>

<template>
  <div class="rating-stars" :class="{ 'rating-interactive': !readonly }">
    <span 
      v-for="star in stars" 
      :key="star.value"
      :class="['star', getStarClass(star)]"
      @click="handleClick(star.value)"
    >
      ★
    </span>
    <span class="rating-value">{{ value.toFixed(1) }}</span>
  </div>
</template>

<style scoped>
.rating-stars {
  display: flex;
  align-items: center;
}

.star {
  font-size: 1.25rem;
  margin-right: 0.25rem;
  cursor: default;
}

.rating-interactive .star {
  cursor: pointer;
}

.star-filled {
  color: #f8ce0b;
}

.star-half {
  position: relative;
  color: #e0e0e0;
}

.star-half::before {
  content: '★';
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  overflow: hidden;
  color: #f8ce0b;
}

.star-empty {
  color: #e0e0e0;
}

.rating-value {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
}
</style>
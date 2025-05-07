<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'text', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<template>
  <button 
    class="base-button" 
    :class="[`variant-${variant}`, `size-${size}`, { disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.base-button:focus {
  outline: none;
}

/* Variants */
.variant-primary {
  background-color: #42b883;
  color: white;
}

.variant-primary:hover:not(.disabled) {
  background-color: #3aa876;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.variant-secondary {
  background-color: #35495e;
  color: white;
}

.variant-secondary:hover:not(.disabled) {
  background-color: #2c3e50;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.variant-outline {
  background-color: transparent;
  color: #42b883;
  border: 1px solid #42b883;
}

.variant-outline:hover:not(.disabled) {
  background-color: rgba(66, 184, 131, 0.05);
}

.variant-text {
  background-color: transparent;
  color: #42b883;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.variant-text:hover:not(.disabled) {
  background-color: rgba(66, 184, 131, 0.05);
}

/* Sizes */
.size-small {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
}

.size-medium {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}

.size-large {
  font-size: 1rem;
  padding: 0.625rem 1.25rem;
}

/* Disabled state */
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
<script setup lang="ts">
import { ref } from "vue";

// LOCAL state via ref() — Vue's minimal reactivity primitive.
const count = ref(0);
</script>

<template>
  <div style="display: flex; align-items: center; gap: 0.75rem">
    <button class="lab-btn" @click="count--">−</button>
    <span style="min-width: 2.5rem; text-align: center; font-size: 1.1rem; font-weight: 600">
      {{ count }}
    </span>
    <button class="lab-btn" @click="count++">+</button>
    <button class="lab-btn" @click="count = 0">reset</button>
    <span style="font-size: 0.75rem; color: var(--lab-muted)">ref() local state</span>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Counter from "./components/Counter.vue";
</script>

<template>
  <div class="lab-shell">
    <div class="lab-container">
      <header style="margin-bottom: 1.5rem">
        <p style="color: var(--fw-vue); font-weight: 600; letter-spacing: 0.02em">Vue demo</p>
        <h1 style="font-size: 1.75rem; margin: 0.25rem 0">Counter + Todo (Pinia)</h1>
        <p style="color: var(--lab-muted)">
          Same reference feature as the other four apps. Notice <code>v-model</code>
          (true two-way binding) and automatic reactivity.
        </p>
        <nav class="lab-nav" style="margin-top: 0.75rem">
          <RouterLink to="/all">Todos</RouterLink>
          <RouterLink to="/users">Users (CSR fetch)</RouterLink>
        </nav>
      </header>

      <section class="lab-card" style="margin-bottom: 1rem">
        <h2 style="font-size: 0.9rem; color: var(--lab-muted); margin-top: 0">
          Local state · Counter
        </h2>
        <Counter />
      </section>

      <RouterView />
    </div>
  </div>
</template>

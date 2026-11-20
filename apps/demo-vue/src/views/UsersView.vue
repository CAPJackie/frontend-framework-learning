<script setup lang="ts">
import { onMounted, ref } from "vue";
import { USERS_API_URL, type User } from "@lab/reference-spec";

// CSR data fetching: the request runs in the BROWSER after the component mounts.
// Contrast with the Next hub, which fetches the same endpoint on the server (SSR/ISR).
const users = ref<User[]>([]);
const loading = ref(true);

onMounted(async () => {
  users.value = await fetch(USERS_API_URL).then((r) => r.json());
  loading.value = false;
});
</script>

<template>
  <section class="lab-card">
    <h2 style="margin-top: 0">Users — fetched in the browser (CSR)</h2>
    <p style="color: var(--lab-muted); font-size: 0.9rem">
      This runs in <code>onMounted</code>, so the fetch happens client-side after hydration. Nuxt
      would let you move this to the server.
    </p>
    <p v-if="loading" style="color: var(--lab-muted)">Loading…</p>
    <table v-else style="width: 100%; border-collapse: collapse; font-size: 0.9rem">
      <thead>
        <tr style="text-align: left; color: var(--lab-muted)">
          <th style="padding: 0.4rem 0">Name</th>
          <th>Username</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id" style="border-top: 1px solid var(--lab-border)">
          <td style="padding: 0.4rem 0">{{ u.name }}</td>
          <td style="color: var(--lab-muted)">@{{ u.username }}</td>
          <td style="color: var(--lab-muted)">{{ u.company.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

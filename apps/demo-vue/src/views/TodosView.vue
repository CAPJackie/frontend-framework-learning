<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { filterTodos, remainingCount, TODO_FILTERS, type TodoFilter } from "@lab/reference-spec";
import { useTodosStore } from "../stores/todos";

// The :filter route param is passed in as a prop (props: true in router.ts).
const props = defineProps<{ filter: TodoFilter }>();

const store = useTodosStore();

// v-model target for the add input — real two-way binding.
const newTitle = ref("");

// computed() is cached derived state; recomputes only when deps change.
const visible = computed(() => filterTodos(store.todos, props.filter));
const remaining = computed(() => remainingCount(store.todos));

const editingId = ref<string | null>(null);
const draft = ref("");

function submit() {
  store.add(newTitle.value);
  newTitle.value = "";
}
function startEdit(id: string, title: string) {
  editingId.value = id;
  draft.value = title;
}
function commitEdit(id: string) {
  store.edit(id, draft.value.trim() || store.todos.find((t) => t.id === id)!.title);
  editingId.value = null;
}
</script>

<template>
  <section class="lab-card">
    <h2 style="font-size: 0.9rem; color: var(--lab-muted); margin-top: 0">
      Global state · Todo (Pinia, persisted, filtered by route)
    </h2>

    <!-- v-model = two-way binding; @submit.prevent handles the form -->
    <form style="display: flex; gap: 0.5rem; margin: 0.75rem 0" @submit.prevent="submit">
      <input v-model="newTitle" class="lab-input" placeholder="What needs doing?" />
      <button class="lab-btn" type="submit">Add</button>
    </form>

    <nav class="lab-nav" style="margin-bottom: 0.75rem">
      <RouterLink v-for="f in TODO_FILTERS" :key="f" :to="`/${f}`" style="text-transform: capitalize">
        {{ f }}
      </RouterLink>
    </nav>

    <ul style="list-style: none; padding: 0; margin: 0; border: 1px solid var(--lab-border); border-radius: 8px">
      <li v-if="visible.length === 0" style="padding: 1.25rem; text-align: center; color: var(--lab-muted)">
        Nothing here.
      </li>
      <li
        v-for="t in visible"
        :key="t.id"
        style="display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.75rem; border-top: 1px solid var(--lab-border)"
      >
        <input type="checkbox" :checked="t.done" @change="store.toggle(t.id)" />
        <input
          v-if="editingId === t.id"
          v-model="draft"
          class="lab-input"
          style="flex: 1"
          @blur="commitEdit(t.id)"
          @keydown.enter="commitEdit(t.id)"
        />
        <span
          v-else
          style="flex: 1; cursor: pointer"
          :style="t.done ? 'text-decoration: line-through; color: var(--lab-muted)' : ''"
          @dblclick="startEdit(t.id, t.title)"
          >{{ t.title }}</span
        >
        <button class="lab-btn" style="font-size: 0.75rem" @click="store.remove(t.id)">
          delete
        </button>
      </li>
    </ul>

    <div style="display: flex; justify-content: space-between; margin-top: 0.6rem; font-size: 0.75rem; color: var(--lab-muted)">
      <span>{{ remaining }} remaining</span>
      <button class="lab-btn" style="font-size: 0.75rem" @click="store.clearCompleted()">
        clear completed
      </button>
    </div>
  </section>
</template>

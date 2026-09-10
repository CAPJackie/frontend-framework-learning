import { createRouter, createWebHistory } from "vue-router";
import TodosView from "./views/TodosView.vue";
import UsersView from "./views/UsersView.vue";

/**
 * Vue Router — the official (but separately-installed) router. Routes are plain
 * config objects. The :filter param drives which todos show, mirroring the
 * /demo/[filter] file-system route in the Next hub.
 */
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/all" },
    {
      path: "/:filter(all|active|done)",
      name: "todos",
      component: TodosView,
      props: true,
    },
    { path: "/users", name: "users", component: UsersView },
  ],
});

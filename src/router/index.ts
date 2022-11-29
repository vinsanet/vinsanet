import Create from "@/components/pages/Create.vue";
import Home from "@/components/pages/Home.vue";
import Index from "@/components/pages/Index.vue";
import Login from "@/components/pages/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "index", component: Index },
  { path: "/create", name: "create", component: Create },
  { path: "/home", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

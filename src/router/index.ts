import Account from "@/components/pages/Account.vue";
import Create from "@/components/pages/Create.vue";
import Index from "@/components/pages/Index.vue";
import Lists from "@/components/pages/Lists.vue";
import Login from "@/components/pages/Login.vue";
import Register from "@/components/pages/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "index", component: Index },
  { path: "/account", name: "account", component: Account },
  { path: "/create", name: "create", component: Create },
  { path: "/lists", name: "lists", component: Lists },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

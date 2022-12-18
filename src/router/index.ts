import Account from "@/components/pages/Account.vue";
import CharactersIdEdit from "@/components/pages/CharactersIdEdit.vue";
import CharactersIdView from "@/components/pages/CharactersIdView.vue";
import Index from "@/components/pages/Index.vue";
import Login from "@/components/pages/Login.vue";
import Mypage from "@/components/pages/Mypage.vue";
import Register from "@/components/pages/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Index },
  { path: "/account", component: Account },
  { path: "/characters/:id/edit", component: CharactersIdEdit },
  { path: "/characters/:id/view", component: CharactersIdView },
  { path: "/login", component: Login },
  { path: "/mypage", component: Mypage },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import Account from "@/components/pages/Account.vue";
import CharactersIdEdit from "@/components/pages/CharactersIdEdit.vue";
import CharactersIdView from "@/components/pages/CharactersIdView.vue";
import Create from "@/components/pages/Create.vue";
import Index from "@/components/pages/Index.vue";
import Login from "@/components/pages/Login.vue";
import Mypage from "@/components/pages/Mypage.vue";
import Register from "@/components/pages/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "index", component: Index },
  { path: "/account", name: "account", component: Account },
  { path: "/create", name: "create", component: Create },
  { path: "/characters/:id/edit", name: "characters-id-edit", component: CharactersIdEdit },
  { path: "/characters/:id/view", name: "characters-id-view", component: CharactersIdView },
  { path: "/login", name: "login", component: Login },
  { path: "/mypage", name: "mypage", component: Mypage },
  { path: "/register", name: "register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

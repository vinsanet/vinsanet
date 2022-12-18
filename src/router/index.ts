import Main from "@/components/layouts/Main.vue";
import Simple from "@/components/layouts/Simple.vue";
import Account from "@/components/pages/Account.vue";
import CharactersIdEdit from "@/components/pages/CharactersIdEdit.vue";
import CharactersIdView from "@/components/pages/CharactersIdView.vue";
import Index from "@/components/pages/Index.vue";
import Login from "@/components/pages/Login.vue";
import Mypage from "@/components/pages/Mypage.vue";
import Register from "@/components/pages/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Simple, children: [{ path: "", component: Index }] },
  { path: "/login", component: Simple, children: [{ path: "", component: Login }] },
  { path: "/register", component: Simple, children: [{ path: "", component: Register }] },
  { path: "/account", component: Main, children: [{ path: "", component: Account }] },
  {
    path: "/characters/:id",
    component: Main,
    children: [
      { path: "edit", component: CharactersIdEdit },
      { path: "view", component: CharactersIdView },
    ],
  },
  { path: "/mypage", component: Main, children: [{ path: "", component: Mypage }] },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

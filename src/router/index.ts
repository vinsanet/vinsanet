import Document from "@/components/layouts/Document.vue";
import Main from "@/components/layouts/Main.vue";
import Simple from "@/components/layouts/Simple.vue";
import Account from "@/components/pages/Account.vue";
import CharactersIdEdit from "@/components/pages/CharactersIdEdit.vue";
import CharactersIdView from "@/components/pages/CharactersIdView.vue";
import Faq from "@/components/pages/Faq.vue";
import Index from "@/components/pages/Index.vue";
import Login from "@/components/pages/Login.vue";
import Mypage from "@/components/pages/Mypage.vue";
import Register from "@/components/pages/Register.vue";
import Terms from "@/components/pages/Terms.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Simple, children: [{ path: "", component: Index }] },
  { path: "/faq", component: Document, children: [{ path: "", component: Faq }] },
  { path: "/terms", component: Document, children: [{ path: "", component: Terms }] },
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

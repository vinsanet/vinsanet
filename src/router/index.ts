import DocumentLayout from "@/components/layouts/Document.vue";
import IndexLayout from "@/components/layouts/Index.vue";
import MainLayout from "@/components/layouts/Main.vue";
import SimpleLayout from "@/components/layouts/Simple.vue";
import Account from "@/components/pages/Account.vue";
import CharactersIdEdit from "@/components/pages/CharactersIdEdit.vue";
import CharactersIdView from "@/components/pages/CharactersIdView.vue";
import Faq from "@/components/pages/Faq.vue";
import Index from "@/components/pages/Index.vue";
import Login from "@/components/pages/Login.vue";
import Mypage from "@/components/pages/Mypage.vue";
import NotFound from "@/components/pages/NotFound.vue";
import Register from "@/components/pages/Register.vue";
import Terms from "@/components/pages/Terms.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: IndexLayout, children: [{ path: "", component: Index }] },
  { path: "/faq", component: DocumentLayout, children: [{ path: "", component: Faq }] },
  { path: "/terms", component: DocumentLayout, children: [{ path: "", component: Terms }] },
  { path: "/login", component: SimpleLayout, children: [{ path: "", component: Login }] },
  { path: "/register", component: SimpleLayout, children: [{ path: "", component: Register }] },
  { path: "/account", component: MainLayout, children: [{ path: "", component: Account }] },
  {
    path: "/characters/:id",
    component: MainLayout,
    children: [
      { path: "edit", component: CharactersIdEdit },
      { path: "view", component: CharactersIdView },
    ],
  },
  { path: "/mypage", component: MainLayout, children: [{ path: "", component: Mypage }] },
  { path: "/:catchAll(.*)", component: SimpleLayout, children: [{ path: "", component: NotFound }] },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

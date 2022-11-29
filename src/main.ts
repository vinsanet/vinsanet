import App from "@/App.vue";
import { registerPlugins } from "@/plugins";
import router from "@/router";
import { createPinia } from "pinia";
import { createApp } from "vue";

const pinia = createPinia();
const app = createApp(App);

registerPlugins(app);

app.use(router);
app.use(pinia);
app.mount("#app");

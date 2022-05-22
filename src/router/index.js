import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminPanel from "../views/AdminPanel.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import PageNotFound from "../views/404.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/admin/:id",
      name: "admin",
      component: AdminPanel,
      children: [
        {
          path: "dashboard",
          component: AdminDashboard,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
    },
  ],
});

export default router;

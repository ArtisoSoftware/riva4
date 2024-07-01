const routes = [
  {
    path: "/",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/welcome",
    component: () => import("pages/Welcome.vue"),
  },
  {
    path: "/staff",
    component: () => import("pages/Staff.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

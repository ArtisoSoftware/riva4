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
    path: "/year",
    component: () => import("src/pages/Year.vue"),
  },
  {
    path: "/economics",
    component: () => import("src/pages/Economics.vue"),
  },
  {
    path: "/economyGroup",
    component: () => import("src/pages/EconomyGroup.vue"),
  },
  {
    path: "/exporting",
    component: () => import("src/pages/ExportingSection.vue"),
  },
  {
    path: "/gvcrelationship",
    component: () => import("src/pages/GvcRelationship.vue"),
  },
  {
    path: "/structureofvalueadded",
    component: () => import("src/pages/StructureOfValueAdded.vue"),
  },
  {
    path: "/participationingvcs",
    component: () => import("src/pages/ParticipationInGVCs.vue"),
  },

  {
    path: "/exportingSub/:id",
    component: () => import("src/pages/ExportingSectionSub.vue"),
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

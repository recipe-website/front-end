import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";  // Strona główna z listą przepisów
import Recipe from "@/components/Recipe.vue"; // Zintegrowany komponent przepisu (dawniej RecipeDetail)

const routes = [
  { path: "/", component: MainPage },  // Strona główna
  { path: "/recipe/:recipeId", component: Recipe },  // Strona szczegółów przepisu
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;


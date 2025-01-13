import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";  // Strona główna z listą przepisów
import Recipe from "@/components/Recipe.vue"; // Zintegrowany komponent przepisu (RecipeDetail)
import RecipeList from "@/components/RecipeList.vue";

const routes = [
  { path: "/", component: MainPage,name: "Main" },  // Strona główna
  { path: "/RecipeList", component: RecipeList,name: "RecipeList",
    props: (route) => ({
      difficulty: route.query.difficulty,
      minTime: route.query.minTime,
      maxTime: route.query.maxTime,
      ingredients: route.query.ingredients,
    }),
  },
  { path: "/details/:recipeId", component: Recipe,}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;


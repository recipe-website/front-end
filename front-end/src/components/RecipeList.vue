<template>
  <div>
    <!-- Nagłówek -->
    <h1>StepwiseChef</h1>

    <!-- Komunikat ładowania -->
    <div v-if="isLoading" class="loading-message">Loading recipes...</div>

    <!-- Panel filtrów -->
    <div v-else class="filter-panel">
      <FilterPanel @filters-applied="applyFilters" />
    </div>

    <!-- Lista przepisów -->
    <div v-else class="recipe-list">
      <RecipeCard v-for="recipe in recipes" :key="recipe.recipeId" :recipe="recipe" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RecipeCard from "@/components/RecipeCard.vue";
import FilterPanel from "@/components/FilterPanel.vue";
import axios from "axios";

const recipes = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8080/recipe/allRecipes");
    recipes.value = response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  } finally {
    isLoading.value = false;
  }
});

// Funkcja do stosowania filtrów
const applyFilters = (filters) => {
  // Tutaj logika filtrowania przepisów (na razie mock)
  console.log("Filters applied:", filters);
};
</script>

<style scoped>
/* Styl nagłówka */
h1 {
  font-family: 'Arial', sans-serif;
  color: #528540; /* Ciemnozielony kolor czcionki */
  font-size: 2rem; /* Mniejszy rozmiar czcionki */
  margin: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #FFF5E3; /* Jasny beżowy tło za nagłówkiem */
  padding: 10px;
  border-radius: 8px;
}

/* Komunikat ładowania */
.loading-message {
  text-align: center;
  font-size: 1.5rem;
  color: #528540;
  margin-top: 100px;
}

/* Panel filtrów */
.filter-panel {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #FFDE8D; /* Żółty */
  padding: 20px;
  border-radius: 12px;
  width: 80%; /* Zwiększona szerokość */
  max-width: 900px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

/* Lista przepisów */
.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 100px 20px 20px; /* Dostosowanie do przestrzeni po filtrach */
  height: calc(100vh - 150px);
  overflow-y: auto;
}
</style>

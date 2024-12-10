<script setup> // wyswietla przefiltrowane przepisy w formie siatki (RecipeCard), przekazuje dane z api do RecipeCard
import RecipeCard from "@/components/RecipeCard.vue";
import FilterPanel from "@/components/FilterPanel.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const recipes = ref([]); // Stan dla przepisów
const filteredRecipes = ref([]); // Stan dla przefiltrowanych przepisów
const isLoading = ref(true); // Stan ładowania danych
const filters = ref({}); // Obiekt przechowujący aktualne filtry

// Pobieranie danych z API
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8080/recipe/allRecipes");
    recipes.value = response.data;
    filteredRecipes.value = response.data; // Domyślnie wyświetlamy wszystkie przepisy
  } catch (error) {
    console.error("Error fetching recipes:", error);
  } finally {
    isLoading.value = false;
  }
});

// Zastosowanie filtrów
const applyFilters = (newFilters) => {
  filters.value = newFilters;

  // Filtruj przepisy na podstawie wybranych kryteriów
  filteredRecipes.value = recipes.value.filter((recipe) => {
    const matchesDifficulty =
        !filters.value.difficulty || recipe.difficulty === filters.value.difficulty;
    const matchesIngredients =
        !filters.value.ingredients.length ||
        filters.value.ingredients.every((ingredient) =>
            recipe.componentList.some((component) =>
                component.rawText.toLowerCase().includes(ingredient.toLowerCase())
            )
        );
    const matchesTime =
        (!filters.value.time.min || recipe.totalTimeMinutes >= filters.value.time.min) &&
        (!filters.value.time.max || recipe.totalTimeMinutes <= filters.value.time.max);

    return matchesDifficulty && matchesIngredients && matchesTime;
  });
};
</script>

<template>
  <div class="recipe-list">
    <!-- Panel filtrów -->
    <FilterPanel @filters-applied="applyFilters"/>

    <!-- Wyświetlanie komunikatu ładowania -->
    <div v-if="isLoading">Loading recipes...</div>

    <!-- Wyświetlanie kafelków przepisów -->
    <div v-else class="grid">
      <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.recipeId"
          :recipe="recipe"
      />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.recipe-list {
  padding: 16px;
}
</style>

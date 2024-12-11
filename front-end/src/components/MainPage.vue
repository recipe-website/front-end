<script setup>
import { ref, onMounted } from "vue";
import RecipeList from "@/components/RecipeList.vue";
import FilterPanel from "@/components/FilterPanel.vue";
import axios from "axios";

// Stan do obsługi przepisów i filtrów
const recipes = ref([]);
const isLoading = ref(true);
const isFiltersApplied = ref(false);

const filters = ref({
  difficulty: "",
  minTime: "",
  maxTime: "",
  ingredients: [],
});

// Funkcja do załadowania przepisów
const fetchRecipes = async (appliedFilters = null) => {
  isLoading.value = true;
  try {
    const response = appliedFilters
        ? await axios.post("http://localhost:8080/recipe/allRecipes", {
          filters: appliedFilters,
        })
        : await axios.get("http://localhost:8080/recipe/allRecipes");
    recipes.value = response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }
};

// Na starcie pobieramy wszystkie przepisy
onMounted(() => {
  fetchRecipes();
});

// Funkcja do przetwarzania filtrów
const applyFilters = (selectedFilters) => {
  filters.value = selectedFilters;
  isFiltersApplied.value = true;
  fetchRecipes(selectedFilters); // Pobranie przepisów zgodnych z filtrami
};
</script>

<template>
  <div>
    <!-- Ekran ładowania -->
    <div v-if="isLoading" class="loading-screen">
      <h1 class="app-title">StepwiseChef</h1>
      <p class="loading-text">Loading recipes...</p>
    </div>

    <!-- Panel filtrowania -->
    <div v-else>
      <FilterPanel @filters-applied="applyFilters" v-if="!isFiltersApplied" />
      <RecipeList :recipes="recipes" :filters="filters" v-if="isFiltersApplied" />
    </div>
  </div>
</template>

<style scoped>
/* Stylowanie ekranu ładowania */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFF5E3;
}

.loading-text {
  color: #124B13;
  font-size: 1.5rem;
  margin-top: 10px;
}

.app-title {
  text-align: center;
  color: #124b13;
  font-size: 3rem;
  margin: 16px 0;
}
</style>

<template>
  <div>
    <!-- Nagłówek -->
    <h1 class="nav-header" @click="router.push('/')">StepwiseChef</h1>

    <!-- Ekran ładowania -->
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-animation">
        <div class="ingredient ingredient-1"></div>
        <div class="ingredient ingredient-2"></div>
        <div class="ingredient ingredient-3"></div>
      </div>
      <p>Loading recipes...</p>
    </div>

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
import { defineProps } from "vue";
import axios from "axios";
import router from "@/router/index.js";

// Define the prop to accept recipes from filterPanel by query
const props = defineProps({
  difficulty: Number,
  minTime: Number,
  maxTime: Number,
  ingredients: Array,
});

const recipes = ref([]);
const isLoading = ref(false);

const fetchRecipes = async (appliedFilters = null) => {
  isLoading.value = true;
  console.log(appliedFilters);

  try {
    const response = await axios.get(
        "http://localhost:8080/recipe/allRecipesFromDB",
        {params: appliedFilters}
    );
    // Opóźnienie dla celów demonstracyjnych (3 sekundy)
    await new Promise((resolve) => setTimeout(resolve, 3000));
    recipes.value = response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  fetchRecipes(props);
});

</script>

<style scoped>
/* Styl nagłówka */
h1 {
  font-family: "Arial", sans-serif;
  color: #124b13;
  font-weight: bold;
  font-size: 2rem;
  margin: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #fff5e3; /* Jasny beżowy */
  padding: 10px;
  border-radius: 8px;
}

/* Ekran ładowania */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff5e3; /* Jasny beżowy */
  color: #124b13; /* Ciemny zielony */
  font-family: "Arial", sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Animacja składników */
.loading-animation {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.ingredient {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: bounce 1s infinite ease-in-out;
}

.ingredient-1 {
  background-color: #124b13; /* Zielony */
  animation-delay: 0.2s;
}

.ingredient-2 {
  background-color: #e5771e; /* Pomarańczowy */
  animation-delay: 0.4s;
}

.ingredient-3 {
  background-color: #FFDE8D; /* Żółty */
  animation-delay: 0.6s;
}

/* Kluczowe klatki dla animacji */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Panel filtrów */
.filter-panel {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffde8d; /* Żółty */
  padding: 20px;
  border-radius: 12px;
  width: 80%;
  max-width: 900px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

/* Lista przepisów */
.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 100px 20px 20px;
  height: calc(100vh - 150px);
  overflow-y: auto;
}

.nav-header{
  cursor: pointer;
}
</style>

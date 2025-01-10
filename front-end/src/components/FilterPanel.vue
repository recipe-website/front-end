<script setup>

import {onMounted, ref} from "vue";
import Illustration from "@/assets/filter-illustration.png";
import axios from "axios";
import { useRouter } from "vue-router";
// Predefiniowane opcje filtrów
const difficultyLevels = [1, 2, 3, 4, 5];

const ingredients = ref([]);
// Refy dla wybranych filtrów
const selectedDifficulty = ref(0);
const selectedIngredients = ref([]);
const selectedTime = ref({ min: 0, max: 0 });
const isLoading = ref(true);

const router = useRouter();
// Emitowanie zdarzenia zastosowania filtrów
const applyFilters = () => {
  router.push(
      {
        name: "RecipeList",
        query: {
          difficulty: Number(selectedDifficulty.value) || null,
          minTime: Number(selectedTime.value.min) || null,
          maxTime: Number(selectedTime.value.max) || null,
          ingredients: selectedIngredients.value.length > 0 ? selectedIngredients.value.join(",") : null,
        },
      }
  );
  // Create the selectedFilters object dynamically

};
isLoading.value = false;
const fetchIngredients = async () => {
  try {
    console.log("Loading ingredients");
    const response = await axios.get("http://localhost:8080/recipe/allIngredients");
    ingredients.value = response.data;
    isLoading.value = false;
  }catch (error) {
    console.error("Error fetching ingredients:", error);
  }
}
onMounted(() => {
  fetchIngredients();
});
const onIngredientChange = (selectedIngredient) =>{
  selectedIngredients.value.push(selectedIngredient);
}
const deleteFromSelectedIngredients = (ingredient) =>{
    selectedIngredients.value =selectedIngredients.value.filter(
        (item) => item !== ingredient
    );
}
</script>

<template>
  <div v-if="isLoading" class="loading-screen">
    <h1 class="app-title">StepwiseChef</h1>
    <p class="loading-text">Loading filters...</p>
  </div>
  <div v-else class="filter-container">
    <!-- Wprowadzenie -->
    <div class="intro-section">
      <h2>Find Your Perfect Recipe</h2>
      <p>Use the filters below to find recipes that match your preferences. You can select difficulty, preparation time, and ingredients to customize your search.</p>
      <img :src="Illustration" alt="Cooking Illustration" />
    </div>

    <!-- Panel z filtrami -->
    <div class="filters">
      <!-- Filtr: Poziom trudności -->
      <label for="difficulty">Difficulty (1-5):</label>
      <select v-model="selectedDifficulty">
        <option value="">Select Difficulty</option>
        <option v-for="level in difficultyLevels" :key="level" :value="level">
          {{ level }}
        </option>
      </select>

      <!-- Filtr: Składniki -->
      <div class="ingredients">
        <label for="ingredient-select">Ingredients:</label>
        <select
            id="ingredient-select"
            v-model="selectedIngredient"
            @change="onIngredientChange(selectedIngredient)"
        >
          <option value="" disabled>Select an ingredient</option>
          <option
              v-for="ingredient in ingredients"
              :key="ingredient.ingredientName"
              :value="ingredient.ingredientName"
          >
            {{ ingredient.ingredientName }}
          </option>
        </select>
        <div  class="saved" v-if="selectedIngredients">
          <div v-for="ingredient in selectedIngredients" :key="ingredient">
            {{ ingredient }}
            <button @click="deleteFromSelectedIngredients(ingredient)" >x</button>

          </div>
        </div>
      </div>

      <!-- Filtr: Czas przygotowania -->
      <div class="time-filter">
        <label>Time (minutes):</label>
        <div class="time-inputs">
          <input
              type="number"
              placeholder="Min time"
              v-model="selectedTime.min"
              min="0"
          />
          <input
              type="number"
              placeholder="Max time"
              v-model="selectedTime.max"
              min="0"
          />
        </div>
      </div>

      <!-- Przycisk zastosowania filtrów -->
      <button @click="applyFilters">Apply Filters</button>
    </div>
  </div>
</template>

<style scoped>
/* Kontener całej sekcji */
.filter-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #DE7047, #FFDE8D);
  color: #124B13;
}

/* Sekcja wprowadzenia */
.intro-section {
  width: 50%;
  padding: 20px;
  text-align: left;
}

.intro-section h2 {
  font-size: 2.5rem;
  color: #124B13;
}

.intro-section p {
  font-size: 1.2rem;
  margin: 10px 0 20px;
}

.intro-section img {
  max-width: 100%;
  height: auto;
}

/* Sekcja filtrów */
.filters {
  width: 50%;
  padding: 20px;
  background-color: #FFF5E3;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.filters label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.filters input,
.filters select {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #528540;
}

/* Styl dla filtrów czasowych */
.time-inputs {
  display: flex;
  gap: 10px;
}

.time-inputs input {
  flex: 1;
}

/* Styl dla przycisku */
button {
  padding: 12px 24px;
  font-size: 1rem;
  color: #FFF5E3;
  background-color: #124B13;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.saved {
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap to the next line if needed */
  gap: 10px; /* Adds spacing between items */
}
/*odpowiada za  kązdy div pochodny*/
.saved > div {
  flex: 0 1 auto; /* Allows each item to grow and shrink while maintaining a minimal width */
  min-width: 1px; /* Set the minimal width for each item */
  padding: 3px; /* Add some padding for better appearance */
  border: 1px solid #ccc; /* Optional: border for separation */
  border-radius: 7px; /* Optional: rounded corners */
  text-align: center; /* Center-align the text */
  background-color: #f9f9f9; /* Optional: background color for better visibility */
}

.saved button{
  background-color: transparent; /* Remove the default button background */
  border: none; /* Remove the button border */
  color: red; /* Set the text color to red */
  font-size: 22px; /* Adjust the size of the "x" */
  cursor: pointer; /* Change the cursor to a pointer for better UX */
  padding: 0; /* Remove padding for minimal size */
  margin: 0; /* Remove margin for minimal size */
  line-height: 1; /* Ensure the "x" is centered vertically */
}

.saved button:hover{
  color:darkred;
  background-color: transparent;
}


button:hover {
  background-color: #0e3c0e;
}
</style>

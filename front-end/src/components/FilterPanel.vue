<script setup>

import {onMounted, ref} from "vue";
import Illustration1 from "@/assets/Tomato And Anchovy Pasta.jpg";
import Illustration2 from "@/assets/3 Ingredient Peanut Butter Cookies.jpg";
import Illustration3 from "@/assets/Low-Carb Avocado Chicken Salad.jpg";
import Illustration4 from "@/assets/3-Ingredient Teriyaki Chicken.jpg";
import Illustration5 from "@/assets/Honey Garlic Shrimp Stir-Fry.jpg";
import Illustration6 from "@/assets/Mac 'N' Cheese.jpg";
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
const selectedIngredient = ref(null);

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
    ingredients.value.sort((a, b) => a.localeCompare(b));
    console.log(ingredients.value);

  }catch (error) {
    console.error("Error fetching ingredients:", error);
  }
}
onMounted(() => {
  fetchIngredients();
});
function onIngredientChange(){
  console.log(selectedIngredient.value)
  selectedIngredients.value.push(selectedIngredient.value);
  ingredients.value = ingredients.value.filter(
      (item) => item !== selectedIngredient.value
  );
}
const deleteFromSelectedIngredients = (ingredient) =>{
    selectedIngredients.value =selectedIngredients.value.filter(
        (item) => item !== ingredient
    );
    ingredients.value.push(ingredient);
    console.log(ingredients.value.sort((a, b) => a.localeCompare(b)));
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
      <h1 class="app-title">StepwiseChef</h1>
      <h2>Find Your Perfect Recipe</h2>
      <p>Use the filters below to find recipes that match your preferences. You can select difficulty, preparation time, and ingredients to customize your search.</p>
      <!-- Obrazki 1 i 2 obok siebie -->
      <div class="image-row">
        <img :src="Illustration1" alt="Tomato And Anchovy Pasta" />
        <img :src="Illustration2" alt="3 Ingredient Peanut Butter Cookies" />
      </div>

      <!-- Obrazki 3, 4, 5 i 6 obok siebie -->
      <div class="image-row">
        <img :src="Illustration3" alt="Low-Carb Avocado Chicken Salad" />
        <img :src="Illustration4" alt="3-Ingredient Teriyaki Chicken" />
        <img :src="Illustration6" alt="Mac 'N' Cheese" />
        <img :src="Illustration5" alt="Honey Garlic Shrimp Stir-Fry" />
      </div>

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
            @change="onIngredientChange"
        >
          <option value="" disabled>Select an ingredient</option>
          <option
              v-for="ingredient in ingredients"
              :key="ingredient.ingredientName"
              :value="ingredient"
          >
            {{ ingredient }}
          </option>
        </select>
        <div  class="saved" v-if="selectedIngredients">
          <div v-for="ingredient in selectedIngredients" >
            {{ ingredient}}
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
  align-items: flex-start; /* Wyrównanie do góry */
  justify-content: space-between;
  height: 100vh;
  padding: 10px 20px;
  background: linear-gradient(140deg, #DE7047, #FFDE8D);
  color: #124B13;
}

/* StepwiseChef */
.app-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #124B13;
  margin-bottom: 10px;
  text-align: center;
}

.intro-section {
  width: 50%;
  padding: 20px;
  text-align: left;
}

.intro-section h2 {
  font-size: 2.5rem;
  color: #124B13;
  text-align: center;
}

.intro-section p {
  font-size: 1.3rem;
  margin: 20px 0 20px;
  margin-left: 15px;
  text-align: center;
}

/* Wiersz z obrazkami */
.image-row {
  display: flex;
  justify-content: space-between; /* Rozstawienie obrazków w wierszu */
  margin-bottom: 20px; /* Odstęp między wierszami */
}

/* Obrazki w wierszu */
.intro-section img {
  width: 48%; /* Dwa obrazki w jednym wierszu zajmują 48% szerokości */
  height: 250px;
  border-radius: 15px;
  margin-bottom: 10px; /* Odstęp między obrazkami */
  margin-left: 10px;
  margin-right: 25px;
}


/* Sekcja filtrów */
.filters {
  position: relative;
  top: 110px;
  right: 45px;
  width: 45%;
  height: 48%;
  padding: 20px;
  justify-content: center;
  background-color: #FFF5E3;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.filters label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
}

.filters input,
.filters select {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #124B13;
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
  padding: 12px 200px;
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
  flex-wrap: nowrap; /* Zamiast zawijania, wszystkie składniki będą na jednej linii */
  gap: 10px; /* Odstęp między składnikami */
  margin-top: 0px; /* Odstęp od góry */
  overflow-x: auto; /* Umożliwia poziome przewijanie, gdy składniki wykraczają poza szerokość */
  max-width: 100%; /* Aby kontener nie wychodził poza szerokość */
  margin-bottom: 15px;
}

.saved > div {
  //display: ;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 7px;
  background-color: #f9f9f9;
  text-align: center;
  width: fit-content;
  height: 40px; /* Ustawiamy stałą wysokość dla każdego składnika */
  box-sizing: border-box; /* Umożliwia uwzględnienie paddingu i obramowania w wymiarach */
  white-space: nowrap;
}

.saved button {
  background-color: transparent;
  border: none;
  color: red;
  font-size: 22px;
  cursor: pointer;
  padding: 0 5px;
  margin-left: 10px;
  margin-top: 1px;
  line-height: 1;
}

.saved button:hover {
  color: darkred;
}

button:hover {
}

</style>

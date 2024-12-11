<script setup>
import { ref } from "vue";
import Illustration from "@/assets/filter-illustration.png";

// Predefiniowane opcje filtrów
const difficultyLevels = [1, 2, 3, 4, 5];
const ingredients = ["Chicken", "Avocado", "Onion", "Tomato", "Cheese"];

// Refy dla wybranych filtrów
const selectedDifficulty = ref("");
const selectedIngredients = ref([]);
const selectedTime = ref({ min: "", max: "" });

// Emitowanie zdarzenia zastosowania filtrów
const emit = defineEmits(["filters-applied"]);
const applyFilters = () => {
  const selectedFilters = {
    difficulty: selectedDifficulty.value,
    minTime: selectedTime.value.min,
    maxTime: selectedTime.value.max,
    ingredients: selectedIngredients.value,
  };
  emit("filters-applied", selectedFilters);
};
</script>

<template>
  <div class="filter-container">
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
        <label>Ingredients:</label>
        <div v-for="ingredient in ingredients" :key="ingredient">
          <input
              type="checkbox"
              :value="ingredient"
              v-model="selectedIngredients"
          />
          {{ ingredient }}
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

button:hover {
  background-color: #0e3c0e;
}
</style>

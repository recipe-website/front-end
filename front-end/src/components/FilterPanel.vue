<script setup> // panel z opcjami filtrowania (poziom trudnosci, skladniki, czas wykonania)
import { ref, onMounted, emit } from "vue";
import axios from "axios";

const difficultyLevels = ['Easy', 'Medium', 'Hard']; // Poziomy trudności
const ingredients = ref([]); // Lista składników pobrana z API
const selectedDifficulty = ref('');
const selectedIngredients = ref([]);
const selectedTime = ref({ min: '', max: '' });

// Pobieranie składników z API
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8080/ingredients"); // API do pobierania składników
    ingredients.value = response.data;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
  }
});

// Funkcja do zastosowania filtrów
const applyFilters = () => {
  emit('filters-applied', {
    difficulty: selectedDifficulty.value,
    ingredients: selectedIngredients.value,
    time: {
      min: selectedTime.value.min ? parseInt(selectedTime.value.min) : null,
      max: selectedTime.value.max ? parseInt(selectedTime.value.max) : null,
    },
  });
};
</script>

<template>
  <div class="filter-panel">
    <!-- Poziom trudności -->
    <div class="filter-section">
      <label for="difficulty">Difficulty:</label>
      <select v-model="selectedDifficulty" id="difficulty">
        <option value="">All</option>
        <option v-for="level in difficultyLevels" :key="level" :value="level">
          {{ level }}
        </option>
      </select>
    </div>

    <!-- Składniki -->
    <div class="filter-section ingredients">
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

    <!-- Czas wykonania -->
    <div class="filter-section time-filter">
      <label>Time (minutes):</label>
      <div>
        <input
            type="number"
            placeholder="Min"
            v-model="selectedTime.min"
            min="0"
        />
        <input
            type="number"
            placeholder="Max"
            v-model="selectedTime.max"
            min="0"
        />
      </div>
    </div>

    <!-- Przycisk zastosuj filtry -->
    <button @click="applyFilters">Apply Filters</button>
  </div>
</template>

<style scoped>
.filter-panel {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-section {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
}

input[type="number"], select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
}

button:hover {
  background-color: #45a049;
}

.ingredients div {
  margin-bottom: 8px;
}

.time-filter input {
  width: calc(50% - 8px);
  margin-right: 8px;
}
</style>

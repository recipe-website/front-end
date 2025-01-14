<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const recipe = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  const recipeId = route.params.recipeId;
  try {
    const response = await axios.get(`http://localhost:8080/recipe/recipebyId/${recipeId}`);
    recipe.value = response.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading">Loading recipe...</div>
  <div v-else-if="recipe" class="recipe-detail">
    <img :src="recipe.thumbnailUrl" alt="Recipe image" class="recipe-thumbnail" />
    <h1>{{ recipe.title }}</h1>
    <p class="recipe-description">{{ recipe.description }}</p>

    <h4>Nutrition Facts:</h4>
    <ul class="nutrition-info">
      <li><strong>Calories:</strong> {{ recipe.nutrition.calories }}</li>
      <li><strong>Carbohydrates:</strong> {{ recipe.nutrition.carbohydrates }}g</li>
      <li><strong>Fat:</strong> {{ recipe.nutrition.fat }}g</li>
      <li><strong>Fiber:</strong> {{ recipe.nutrition.fiber }}g</li>
      <li><strong>Protein:</strong> {{ recipe.nutrition.protein }}g</li>
      <li><strong>Sugar:</strong> {{ recipe.nutrition.sugar }}g</li>
    </ul>

    <h4>Ingredients:</h4>
    <ul>
      <li v-for="ingredient in recipe.componentList" :key="ingredient.ingredientName">
        {{ ingredient.rawText }}
      </li>
    </ul>

    <h4>Instructions:</h4>
    <ol>
      <li v-for="instruction in recipe.instructionList" :key="instruction">
        {{ instruction }}
      </li>
    </ol>

    <p><strong>Total cooking time:</strong> {{ recipe.totalTimeMinutes }} minutes</p>

    <h4>Video Tutorial:</h4>
    <video :src="recipe.originalVideoUrl" controls class="recipe-video"></video>
  </div>
  <div v-else>
    <p>Recipe not found.</p>
  </div>
</template>

<style scoped>
.recipe-detail {
  color: #333;
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recipe-thumbnail {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
}

.recipe-description {
  font-size: 1.2em;
  margin: 10px 0;
  color: #555;
}

.nutrition-info {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

.nutrition-info li {
  margin-bottom: 5px;
}

.recipe-video {
  width: 100%;
  border-radius: 8px;
  margin-top: 16px;
}
</style>

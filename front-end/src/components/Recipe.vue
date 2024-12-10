<script setup> // ladowanie i wyswietlanie szczegolow przepisu, obsuga ladowania i bledow (nieznalezione id przepisu)
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const recipe = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  const recipeId = route.params.recipeId;
  try {
    const response = await axios.get(`http://localhost:8080/recipe/${recipeId}`);
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
    <h1>{{ recipe.title }}</h1>
    <p>{{ recipe.description }}</p>
    <p><strong>Authors:</strong></p>
    <ul>
      <li v-for="author in recipe.creditList" :key="author">{{ author }}</li>
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
  </div>
  <div v-else>
    <p>Recipe not found.</p>
  </div>
</template>

<style scoped>
.recipe-detail {
  padding: 16px;
}

.recipe-detail h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

.recipe-detail ul, .recipe-detail ol {
  margin: 10px 0;
  padding-left: 20px;
}
</style>

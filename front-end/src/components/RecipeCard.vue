<script setup> // wyswietla pojedynczy kafelek z miniatura przepisu i linkiem do jego szczegółów
defineProps(["recipe"]);
</script>

<template>
  <div class="recipe-card">
    <router-link :to="`/recipe/${recipe.recipeId}`">
      <img :src="recipe.imageUrl" alt="Recipe Image" class="recipe-image" />
      <h3>{{ recipe.title }}</h3>
    </router-link>
    <p>{{ recipe.description }}</p>
    <p><strong>Time:</strong> {{ recipe.totalTimeMinutes }} min</p>
  </div>
</template>

<style scoped>
.recipe-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.2s ease-in-out;
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px;
}
</style>



<script setup>
defineProps(["recipe"]);
</script>

<template>
  <div class="recipe-card">
    <img :src="recipe.imageUrl" alt="Recipe image" />
    <h3>{{ recipe.title }}</h3>
    <p>{{ recipe.description }}</p>
  </div>
</template>

<style scoped>
.recipe-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

.recipe-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.recipe-card h3 {
  font-size: 1.2em;
  margin: 8px 0;
}
</style>

<script setup>
import { useRouter } from "vue-router";

defineProps(["recipe"]);
const router = useRouter();
const details = (id) => {
  router.push(`/details/${id}`);
};
</script>

<template>
  <div class="recipe-card" v-on:click="details(recipe.recipeId.recipeId)">
    <img :src="recipe.thumbnailUrl" alt="Recipe image" />
    <h3 class="recipe-title">{{ recipe.title }}</h3>
    <p class="recipe-description">{{ recipe.description }}</p>
  </div>
</template>

<style scoped>
.recipe-card {
  color: black;
  background-color: #e5771e;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.recipe-card:hover {
  color: #124B13;
  background-color: #F4BB44;
  transform: scale(1.05);
}
.recipe-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Nazwa potrawy - pogrubiona */
.recipe-title {
  font-size: 1.2em;
  margin: 8px 0;
  font-weight: bold;
}

/* Opis potrawy - bez pogrubienia */
.recipe-description {
  font-size: 1em;
  margin: 8px 0;
  font-weight: normal;
}
</style>

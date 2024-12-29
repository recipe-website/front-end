<script setup>
import {useRouter} from "vue-router";

defineProps(["recipe"]);
const router = useRouter()
const details = (id) =>{
  router.push(`/details/${id}`)
}
</script>

<template>
  <div class="recipe-card" v-on:click="details(recipe.recipeId.recipeId)" >
    <img :src="recipe.imageUrl" alt="Recipe image" />
    <h3>{{ recipe.title }}</h3>
    <p>{{ recipe.description }}</p>

  </div>
</template>

<style scoped>
.recipe-card {
  color: black ;
  background-color: #528540;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}
.recipe-card:hover {
  background-color: #6cdb2f;
  transform: scale(1.05);
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

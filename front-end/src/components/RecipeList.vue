<script setup>
import Recipe from "@/components/Recipe.vue";
import axios from "axios";

const data = ref()

console.log(data)

import {onMounted, ref} from 'vue'
onMounted(() => {
  axios.get("http://localhost:8080/recipe/allRecipes").then(response => (
      data.value = response.data
  ))
})

</script>

<template>
  <div v-for="recipe in data" >
    <Recipe :recipe="recipe"></Recipe>
  </div>
</template>

<style scoped>

</style>
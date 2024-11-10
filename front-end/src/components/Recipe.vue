<script setup>
defineProps(["recipe"])

</script>

<template>
  <br/>
  <div class = "recipe-wrapper">
    <h3>{{recipe.title}}</h3>
    <h5>{{recipe.description}}</h5>
    <p>Authors:</p>
    <h6 v-for="author in recipe.creditList">{{author}}</h6>
    <h4>Ingredients</h4>
    <ul>
      <li v-for="ingredient in recipe.componentList">{{ingredient.rawText}}</li>
    </ul>
    <h4>Instructions:</h4>
    <ul>
      <li v-for="instruction in recipe.instructionList">{{instruction}}</li>
    </ul>
    <p>Total cooking time: {{recipe.totalTimeMinutes}} minutes </p>

  </div>
</template>

<style scoped>

</style>
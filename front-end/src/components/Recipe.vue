<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

// Import obrazów
import Illustration1 from "@/assets/Low-Carb Avocado Chicken Salad.jpg";
import Illustration1_2 from "@/assets/Low-Carb Avocado Chicken Salad2.jpg";
import Illustration1_3 from "@/assets/Low-Carb Avocado Chicken Salad3.jpg";

import Illustration2 from "@/assets/Tomato And Anchovy Pasta.jpg";
import Illustration2_2 from "@/assets/Tomato And Anchovy Pasta2.jpg";
import Illustration2_3 from "@/assets/Tomato And Anchovy Pasta3.jpg";

import Illustration3 from "@/assets/Healthy Banana Pancakes.jpg";
import Illustration3_2 from "@/assets/Healthy Banana Pancakes2.jpg";
import Illustration3_3 from "@/assets/Healthy Banana Pancakes3.jpg";

import Illustration4 from "@/assets/Garlic Shrimp Scampi.jpg";
import Illustration4_2 from "@/assets/Garlic Shrimp Scampi2.jpg";
import Illustration4_3 from "@/assets/Garlic Shrimp Scampi3.jpg";

import Illustration5 from "@/assets/Birthday Cake Mug Cake.jpg";
import Illustration5_2 from "@/assets/Birthday Cake Mug Cake2.jpg";
import Illustration5_3 from "@/assets/Birthday Cake Mug Cake3.jpg";

import Illustration6 from "@/assets/Creamy Cajun Pasta.jpg";
import Illustration6_2 from "@/assets/Creamy Cajun Pasta2.jpg";
import Illustration6_3 from "@/assets/Creamy Cajun Pasta3.jpg";

import Illustration7 from "@/assets/One-Pot Lemon Garlic Shrimp Pasta.jpg";
import Illustration7_2 from "@/assets/One-Pot Lemon Garlic Shrimp Pasta2.jpg";
import Illustration7_3 from "@/assets/One-Pot Lemon Garlic Shrimp Pasta3.jpg";

import Illustration8 from "@/assets/3-Ingredient Teriyaki Chicken.jpg";
import Illustration8_2 from "@/assets/3-Ingredient Teriyaki Chicken2.jpg";
import Illustration8_3 from "@/assets/3-Ingredient Teriyaki Chicken3.jpg";

import Illustration9 from "@/assets/Chocolate Mug Cake.jpg";
import Illustration9_2 from "@/assets/Chocolate Mug Cake2.jpg";
import Illustration9_3 from "@/assets/Chocolate Mug Cake3.jpg";

import Illustration10 from "@/assets/3-ingredient Mac & Cheese.jpg";
import Illustration10_2 from "@/assets/3-ingredient Mac & Cheese2.jpg";
import Illustration10_3 from "@/assets/3-ingredient Mac & Cheese3.jpg";

import Illustration11 from "@/assets/3 Ingredient Peanut Butter Cookies.jpg";
import Illustration11_2 from "@/assets/3 Ingredient Peanut Butter Cookies2.jpg";
import Illustration11_3 from "@/assets/3 Ingredient Peanut Butter Cookies3.jpg";

import Illustration12 from "@/assets/Whipped Coffee.jpg";
import Illustration12_2 from "@/assets/Whipped Coffee2.jpg";
import Illustration12_3 from "@/assets/Whipped Coffee3.jpg";

import Illustration13 from "@/assets/Creamy Chicken Penne Pasta.jpg";
import Illustration13_2 from "@/assets/Creamy Chicken Penne Pasta2.jpg";
import Illustration13_3 from "@/assets/Creamy Chicken Penne Pasta3.jpg";

import Illustration14 from "@/assets/Garlic Shrimp Bacon Alfredo.jpg";
import Illustration14_2 from "@/assets/Garlic Shrimp Bacon Alfredo2.jpg";
import Illustration14_3 from "@/assets/Garlic Shrimp Bacon Alfredo3.jpg";

import Illustration15 from "@/assets/Easy One-Pot Mac ‘n’ Cheese.jpg";
import Illustration15_2 from "@/assets/Easy One-Pot Mac ‘n’ Cheese2.jpg";
import Illustration15_3 from "@/assets/Easy One-Pot Mac ‘n’ Cheese3.jpg";

import Illustration16 from "@/assets/Honey Garlic Shrimp Stir-Fry.jpg";
import Illustration16_2 from "@/assets/Honey Garlic Shrimp Stir-Fry2.jpg";
import Illustration16_3 from "@/assets/Honey Garlic Shrimp Stir-Fry3.jpg";

import Illustration17 from "@/assets/Microwave 5-Minute Mac 'N' Cheese.jpg";
import Illustration17_2 from "@/assets/Microwave 5-Minute Mac 'N' Cheese2.jpg";
import Illustration17_3 from "@/assets/Microwave 5-Minute Mac 'N' Cheese3.jpg";

import Illustration18 from "@/assets/Weekday Meal-Prep Pesto Chicken & Veggies.jpg";
import Illustration18_2 from "@/assets/Weekday Meal-Prep Pesto Chicken & Veggies2.jpg";
import Illustration18_3 from "@/assets/Weekday Meal-Prep Pesto Chicken & Veggies3.jpg";

import Illustration19 from "@/assets/Weekday Meal-prep Chicken Teriyaki Stir-fry.jpg";
import Illustration19_2 from "@/assets/Weekday Meal-prep Chicken Teriyaki Stir-fry2.jpg";
import Illustration19_3 from "@/assets/Weekday Meal-prep Chicken Teriyaki Stir-fry3.jpg";

import Illustration20 from "@/assets/Spaghetti With Garlic And Oil.jpg";
import Illustration20_2 from "@/assets/Spaghetti With Garlic And Oil2.png";
import Illustration20_3 from "@/assets/Spaghetti With Garlic And Oil3.jpg";

// Mapowanie obrazów na podstawie `canonicalId`
const recipeImages = {
  "recipe:4704": [Illustration1_2, Illustration1, Illustration1_3],
  "recipe:5466": [Illustration2, Illustration2_2, Illustration2_3],
  "recipe:1655": [Illustration3, Illustration3_2, Illustration3_3],
  "recipe:1299": [Illustration4, Illustration4_2, Illustration4_3],
  "recipe:1686": [Illustration5, Illustration5_2, Illustration5_3],
  "recipe:4870": [Illustration6, Illustration6_2, Illustration6_3],
  "recipe:47": [Illustration7, Illustration7_2, Illustration7_3],
  "recipe:1508": [Illustration8, Illustration8_2, Illustration8_3],
  "recipe:1685": [Illustration9, Illustration9_2, Illustration9_3],
  "recipe:1509": [Illustration10, Illustration10_2, Illustration10_3],
  "recipe:788": [Illustration11, Illustration11_2, Illustration11_3],
  "recipe:6124": [Illustration12, Illustration12_2, Illustration12_3],
  "recipe:48": [Illustration13, Illustration13_2, Illustration13_3],
  "recipe:1565": [Illustration14, Illustration14_2, Illustration14_3],
  "recipe:3066": [Illustration15, Illustration15_2, Illustration15_3],
  "recipe:1029": [Illustration16, Illustration16_2, Illustration16_3],
  "recipe:2663": [Illustration17, Illustration17_2, Illustration17_3],
  "recipe:1008": [Illustration18, Illustration18_2, Illustration18_3],
  "recipe:539": [Illustration19, Illustration19_2, Illustration19_3],
  "recipe:4040": [Illustration20, Illustration20_2, Illustration20_3],

};

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

const getThumbnails = (canonicalId) => {
  return recipeImages[canonicalId] || [];
};
</script>

<template>
  <div v-if="isLoading" class="loading">Loading recipe...</div>
  <div v-else-if="recipe" class="recipe-detail">

    <!-- Recipe Thumbnails -->
    <div class="recipe-thumbnails">
      <img
          v-for="(thumbnail, index) in getThumbnails(recipe.canonicalId)"
          :key="index"
          :src="thumbnail"
          alt="Recipe image"
          class="recipe-thumbnail"
      />
    </div>

    <!-- Recipe Title -->
    <h1 class="recipe-title">{{ recipe.title }}</h1>
    <p class="recipe-description">{{ recipe.description }}</p>

    <!-- Ingredients and Nutrition Facts -->
    <div class="recipe-details-grid">
      <div class="ingredients">
        <h4>Ingredients:</h4>
        <ul>
          <li v-for="ingredient in recipe.componentList" :key="ingredient.ingredientName">
            {{ ingredient.rawText }}
          </li>
        </ul>
      </div>
      <div class="nutrition-facts">
        <!-- Total Cooking Time -->
          <h4>Total Cooking Time:</h4> {{ recipe.totalTimeMinutes }} minutes
        <div class="cooking-time">
        </div>
        <!-- Nutrition Info -->
        <h4>Nutrition Facts:</h4>
        <ul class="nutrition-info">
          <li><strong>Calories:</strong> {{ recipe.nutrition.calories }}</li>
          <li><strong>Carbohydrates:</strong> {{ recipe.nutrition.carbohydrates }}g</li>
          <li><strong>Fat:</strong> {{ recipe.nutrition.fat }}g</li>
          <li><strong>Fiber:</strong> {{ recipe.nutrition.fiber }}g</li>
          <li><strong>Protein:</strong> {{ recipe.nutrition.protein }}g</li>
          <li><strong>Sugar:</strong> {{ recipe.nutrition.sugar }}g</li>
        </ul>
      </div>
    </div>

    <!-- Instructions -->
    <h4 class="section-title instructions">Instructions:</h4>
    <ol>
      <li v-for="instruction in recipe.instructionList" :key="instruction">
        {{ instruction }}
      </li>
    </ol>

    <h4 class="section-title video-tutorial">Video Tutorial:</h4>
    <video :src="recipe.originalVideoUrl" controls class="recipe-video"></video>
  </div>
  <div v-else class="not-found">
    <p>Recipe not found.</p>
  </div>
</template>


<style scoped>
/* Main container styling */
.recipe-detail {
  color: #333;
  font-family: Arial, sans-serif;
  max-width: 1050px;
  margin: 20px auto;
  padding: 32px;
  background: linear-gradient(140deg, #de7047, #ffde8d);
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}

.recipe-detail h4 {
  color: #124B13;
  font-size: 1.35em;
  margin-bottom: 10px;
  font-weight: bold;
}

/* Zwiększenie rozmiaru tylko dla Instructions i Video Tutorial */
.recipe-detail h4:nth-child(7), /* Instructions */
.recipe-detail h4:nth-child(9) { /* Video Tutorial */
  font-size: 1.8em; /* Zwiększany rozmiar */
}


.time-details h4 {
  color: #124B13;
  font-size: 1.5em;
  margin-bottom: 8px;
}

.time-details p {
  font-size: 1.2em;
  color: #333;
}

/* Thumbnails styling */
.recipe-thumbnails {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px;
  margin-bottom: 20px;
}

.recipe-thumbnail {
  flex: 1 1 calc(33% - 16px);
  max-width: calc(33% - 16px);
  border-radius: 8px;
  object-fit: cover;
  height: 320px;
  transition: transform 0.3s;
}

.recipe-thumbnail:hover {
  transform: scale(1.05);
}

.recipe-title {
  text-align: center;
  margin-top: 35px;
  font-size: 2.5em;
  color: #124B13;
  font-weight: bold;
}

.recipe-description {
  font-size: 1.3em;
  margin: 10px 0;
  color: #222;
  text-align: center;
}

.recipe-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.ingredients,
.nutrition-facts {
  background: #FFF5E3;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  margin-top: 30px;
  font-size: 1.25em;
}

.ingredients h4,
.nutrition-facts h4,
.recipe-details-grid h4,
.recipe-detail h4 {
  color: #124B13;
  font-size: 1.35em;
  margin-bottom: 10px;
  font-weight: bold;
}


.cooking-time {
  font-size: 1.2em;
  color: #222;
  margin-bottom: 10px;
}

.ingredients ul,
.nutrition-info {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredients li,
.nutrition-info li {
  margin-bottom: 8px;
  font-size: 1em;
  color: #333;
}

ol {
  list-style-type: none;
  padding: 18px;
  font-size: 1.3em;
  line-height: 1.5;
  text-align: justify;
}

ol li {
  margin-bottom: 20px;
  color: #222;
}

.section-title.instructions,
.section-title.video-tutorial {
  font-size: 1.8em;
  color: #124B13;
  font-weight: bold;
  text-align: center;
}


.recipe-video {
  display: block; /* Blokowy element umożliwia użycie marginesów */
  margin: 20px auto; /* Wyśrodkowanie na osi poziomej */
  width: 100%; /* Szerokość wideo dostosowana do rodzica */
  max-width: 600px; /* Maksymalna szerokość */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loading,
.not-found {
  text-align: center;
  font-size: 1.5em;
  color: #666;
  margin-top: 20px;
}
</style>


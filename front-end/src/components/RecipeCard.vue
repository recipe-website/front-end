<script setup>
import { useRouter } from 'vue-router';

// Import obrazów
import Illustration1 from "@/assets/Low-Carb Avocado Chicken Salad.jpg";
import Illustration2 from "@/assets/Tomato And Anchovy Pasta.jpg";
import Illustration3 from "@/assets/Healthy Banana Pancakes.jpg";
import Illustration4 from "@/assets/Garlic Shrimp Scampi.jpg";
import Illustration5 from "@/assets/Birthday Cake Mug Cake.jpg";
import Illustration6 from "@/assets/Creamy Cajun Pasta.jpg";
import Illustration7 from "@/assets/One-Pot Lemon Garlic Shrimp Pasta.jpg";
import Illustration8 from "@/assets/3-Ingredient Teriyaki Chicken.jpg";
import Illustration9 from "@/assets/Chocolate Mug Cake.jpg";
import Illustration10 from "@/assets/3-ingredient Mac & Cheese.jpg";
import Illustration11 from "@/assets/3 Ingredient Peanut Butter Cookies.jpg";
import Illustration12 from "@/assets/Whipped Coffee.jpg";
import Illustration13 from "@/assets/Creamy Chicken Penne Pasta.jpg";
import Illustration14 from "@/assets/Garlic Shrimp Bacon Alfredo.jpg";
import Illustration15 from "@/assets/Easy One-Pot Mac ‘n’ Cheese.jpg";
import Illustration16 from "@/assets/Honey Garlic Shrimp Stir-Fry.jpg";
import Illustration17 from "@/assets/Microwave 5-Minute Mac 'N' Cheese.jpg";
import Illustration18 from "@/assets/Weekday Meal-Prep Pesto Chicken & Veggies.jpg";
import Illustration19 from "@/assets/Weekday Meal-prep Chicken Teriyaki Stir-fry.jpg";
import Illustration20 from "@/assets/Spaghetti With Garlic And Oil.jpg";

// Mapowanie obrazków na podstawie `canonicalId`
const recipeImages = {
  "recipe:4704": Illustration1,
  "recipe:5466": Illustration2,
  "recipe:1655": Illustration3,
  "recipe:1299": Illustration4,
  "recipe:1686": Illustration5,
  "recipe:4870": Illustration6,
  "recipe:47": Illustration7,
  "recipe:1508": Illustration8,
  "recipe:1685": Illustration9,
  "recipe:1509": Illustration10,
  "recipe:788": Illustration11,
  "recipe:6124": Illustration12,
  "recipe:48": Illustration13,
  "recipe:1565": Illustration14,
  "recipe:3066": Illustration15,
  "recipe:1029": Illustration16,
  "recipe:2663": Illustration17,
  "recipe:1008": Illustration18,
  "recipe:539": Illustration19,
  "recipe:4040": Illustration20,
};

// Mapowanie opisów na podstawie `canonicalId`
const recipeDescriptions = {
  "recipe:4704": "A delicious low-carb chicken salad with avocado, celery, and a creamy yogurt dressing.",
  "recipe:5466": "A classic tomato and anchovy pasta that's both savory and satisfying.",
  "recipe:1655": "Fluffy and healthy banana pancakes, perfect for a nutritious breakfast.",
  "recipe:1299": "Garlic shrimp scampi with a buttery and flavorful sauce, ready in minutes.",
  "recipe:1686": "A fun and quick birthday cake mug cake for a personal celebration.",
  "recipe:4870": "Creamy Cajun pasta with chicken and spices for a bold flavor.",
  "recipe:47": "One-pot lemon garlic shrimp pasta that's zesty and easy to prepare.",
  "recipe:1508": "3-ingredient teriyaki chicken for a simple and delicious meal.",
  "recipe:1685": "Rich and chocolatey mug cake easy to make in just a few minutes.",
  "recipe:1509": "Creamy and comforting mac and cheese with just three ingredients.",
  "recipe:788": "Simple peanut butter cookies made with only three ingredients.",
  "recipe:6124": "Whipped coffee that's creamy, smooth, and perfect for coffee lovers.",
  "recipe:48": "Creamy chicken penne pasta with a savory and rich sauce.",
  "recipe:1565": "Garlic shrimp bacon alfredo with a decadent creamy sauce.",
  "recipe:3066": "Easy one-pot mac and cheese, perfect for a quick dinner.",
  "recipe:1029": "Honey garlic shrimp stir-fry with veggies for a quick and healthy meal.",
  "recipe:2663": "Microwave mac and cheese ready in five minutes, creamy and delicious.",
  "recipe:1008": "Pesto chicken with veggies, great for meal-prep during the week.",
  "recipe:539": "Chicken teriyaki stir-fry, a flavorful and balanced weeknight meal.",
  "recipe:4040": "Classic spaghetti with garlic and oil, quick and easy to make, yet delicious.",
};

defineProps(["recipe"]);
const router = useRouter();

// Funkcja do przekierowania na stronę szczegółów przepisu
const details = (id) => {
  router.push(`/details/${id}`);
};

// Funkcja zwracająca obrazek na podstawie `canonicalId`
const getThumbnail = (canonicalId) => {
  return recipeImages[canonicalId] || ""; // Domyślnie pusty string, jeśli obrazka brak
};

// Funkcja zwracająca opis na podstawie `canonicalId`
const getDescription = (canonicalId) => {
  return recipeDescriptions[canonicalId] || "Delicious recipe, try it now!"; // Domyślny opis, jeśli brak
};
</script>

<template>
  <div class="recipe-grid">
    <div class="recipe-card" v-on:click="details(recipe.recipeId.recipeId)">
    <!-- Dynamiczne przypisanie obrazka -->
      <img :src="getThumbnail(recipe.canonicalId)" alt="Recipe image" />
      <h3 class="recipe-title">{{ recipe.title }}</h3>
      <h5 class="recipe-title">Difficulty: {{ recipe.difficulty }}</h5>
      <p class="recipe-description">{{ getDescription(recipe.canonicalId) }}</p>
    </div>
  </div>
</template>

<style scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr)); /* 4 kolumny */
  gap: 15px; /* Odstęp między kafelkami */
  padding: 10px; /* Zmniejszony odstęp wewnątrz kontenera */
}

.recipe-card {
  background-color: #e5771e;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px; /* Mniejszy padding */
  text-align: center;
  color: black;
  cursor: pointer; /* Kursor wskazuje na interaktywność */

  /* Stałe wymiary */
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.recipe-card:hover {
  color: #124B13;
  background-color: #F4BB44;
  transform: scale(1.03); /* Delikatniejsza animacja */
}

.recipe-card img {
  width: 100%;
  height: 220px; /* Stała wysokość obrazka */
  object-fit: cover;
  border-radius: 8px;
}

.recipe-title {
  font-size: 1.1em;
  font-weight: bold;
  margin: 5px 0;
}

.recipe-description {
  font-size: 0.95em;
  font-weight: normal;
  margin: 5px 0;
  text-align: center;
}
</style>

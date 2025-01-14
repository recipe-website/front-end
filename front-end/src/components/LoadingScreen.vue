<template>
  <div class="loading-screen">
    <div class="spinner"></div>
    <p>Loading recipes...</p>
  </div>
</template>

<script setup>
// Komponent czysto wizualny, nie wymaga logiki
</script>

<style scoped>
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid white;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

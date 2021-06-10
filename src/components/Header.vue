<template>
  <header class="text-center bg-blue-800 text-white p-4 mb-10">
    <div class="text-3xl md:text-5xl font-bold mb-3">Covid-19 Tracker</div>
    <div class="text-center text-2xl">
      <router-link to="/" class="px-2">Home</router-link>
      <router-link to="/France" class="px-2">France</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

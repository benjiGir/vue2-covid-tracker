<template>
  <div>
    <Header />
    <div class="container mx-auto px-8">
      <keep-alive include="Home"> 
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header,
  },
};
</script>